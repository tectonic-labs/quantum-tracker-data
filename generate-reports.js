#!/usr/bin/env node
/**
 * Quantum Tracker — Static Report Page Generator
 *
 * Fetches all CSV data + markdown reports from the GitHub data repo,
 * converts each report to a standalone HTML page, and generates sitemap.xml.
 *
 * Usage:
 *   node generate-reports.js
 *
 * Output:
 *   ./reports/{tab}/{slug}.html   — one page per report
 *   ./sitemap.xml                 — sitemap listing all report URLs
 *
 * Environment:
 *   SITE_URL (optional) — base URL, defaults to https://quantumtracker.org
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.SITE_URL || 'https://quantumtracker.org';

const GITHUB_BASE = 'https://raw.githubusercontent.com/tectonic-labs/quantum-tracker-data/refs/heads/main';

const TABS = {
  blockchains: { csv: '/chains.csv', reportBase: '/chains/l1/', nameKey: 'project' },
  coins:       { csv: '/coins.csv',  reportBase: '/coins/',      nameKey: 'project' },
  wallets:     { csv: '/wallets.csv', reportBase: '/wallets/',    nameKey: 'wallet' },
  nfts:        { csv: '/nfts.csv',   reportBase: '/nfts/',       nameKey: 'project' },
};

const EMOJI_TO_FILE = {
  '✅':'a-done.svg','🔧':'b-dev.svg','🗺️':'c-planned.svg','🗺':'c-planned.svg',
  '⚠️':'d-discussed.svg','⚠':'d-discussed.svg','❌':'f-nothing.svg','➖':'n-not-applicable.svg',
};

// ── Helpers ──

function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'QuantumTracker-Generator/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return resolve(null);
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function parseCSV(text) {
  const tokens = []; let cur = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') { if (inQ && text[i+1] === '"') { cur += '"'; i++; } else inQ = !inQ; }
    else if (c === ',' && !inQ) { tokens.push(cur); cur = ''; }
    else if ((c === '\n' || c === '\r') && !inQ) { if (c === '\r' && text[i+1] === '\n') i++; tokens.push(cur); cur = ''; tokens.push('\n'); }
    else cur += c;
  }
  if (cur) tokens.push(cur);
  const rows = []; let row = [];
  for (const tk of tokens) { if (tk === '\n') { if (row.length) rows.push(row); row = []; } else row.push(tk); }
  if (row.length) rows.push(row);
  if (rows.length < 2) return [];
  const hdr = rows[0].map(h => h.trim());
  return rows.slice(1).map(r => {
    const o = {};
    hdr.forEach((h, j) => o[h] = (r[j] || '').trim());
    return o;
  });
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderMarkdown(md) {
  // Angle bracket links first
  let h = md.replace(/<(https?:\/\/[^>]+)>/g, '[$1]($1)');
  h = h
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, l, c) => `<pre><code>${escapeHtml(c)}</code></pre>`)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/^_(.+)_$/gm, '<em>$1</em>')
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:!?]|$)/gm, '$1<em>$2</em>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,.1);margin:16px 0">')
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>');

  // Tables
  h = h.replace(/(^\|.+\|$\n?)+/gm, function(block) {
    const rows = block.trim().split('\n').filter(r => r.trim());
    const parsed = rows.map(r => {
      const cells = r.split('|').slice(1, -1);
      if (!cells.length) { const alt = r.split('|').filter(c => c.trim()); return { cells: alt, isSep: alt.every(c => /^[\s\-:]+$/.test(c)) }; }
      return { cells, isSep: cells.every(c => /^[\s\-:]+$/.test(c)) };
    });
    const sepIdx = parsed.findIndex(r => r.isSep);
    let html = '<table>';
    if (sepIdx > 0) {
      html += '<thead>';
      for (let i = 0; i < sepIdx; i++) html += '<tr>' + parsed[i].cells.map(c => `<th>${c.trim()}</th>`).join('') + '</tr>';
      html += '</thead><tbody>';
      for (let i = sepIdx + 1; i < parsed.length; i++) if (!parsed[i].isSep) html += '<tr>' + parsed[i].cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
      html += '</tbody>';
    } else {
      html += '<tbody>';
      parsed.forEach(r => { if (!r.isSep) html += '<tr>' + r.cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>'; });
      html += '</tbody>';
    }
    return html + '</table>';
  });

  h = h.replace(/((<li>.*<\/li>\s*)+)/g, '<ul>$1</ul>');

  // Auto-link bare URLs
  h = h.split(/(<a\s[^>]*>[\s\S]*?<\/a>|href="[^"]*")/g).map((part, i) => {
    if (i % 2 === 1) return part;
    return part.replace(/(https?:\/\/[^\s<"')\]]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  }).join('');

  // Paragraphs
  h = h.split('\n').map(l => {
    const t = l.trim();
    if (!t) return '';
    if (t.startsWith('<')) return l;
    return `<p>${l}</p>`;
  }).join('\n');

  // Emoji to SVG
  for (const [emoji, file] of Object.entries(EMOJI_TO_FILE)) {
    h = h.replaceAll(emoji, `<img class="emoji-icon" src="${SITE_URL}/${file}" alt="" width="18" height="18">`);
  }

  return h;
}

function buildReportPage(project, tab, slug, contentHtml) {
  const title = `${project} — Quantum Exposure Report | Quantum Tracker`;
  const canonical = `${SITE_URL}/reports/${tab}/${slug}.html`;
  const trackerUrl = `${SITE_URL}/#report/${tab}/${slug}`;
  const description = `Post-quantum cryptography readiness assessment for ${project}. Tracking quantum exposure across Web3.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/svg+xml" href="${SITE_URL}/quantum-tracker-icon.svg">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Quantum Tracker">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<script type="application/ld+json">
${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": `${project} — Quantum Exposure Report`,
  "description": description,
  "author": { "@type": "Organization", "name": "Tectonic Labs", "url": "https://tectonic.xyz" },
  "publisher": { "@type": "Organization", "name": "Quantum Tracker", "url": SITE_URL },
  "url": canonical,
  "mainEntityOfPage": canonical,
  "about": `Post-quantum cryptography readiness assessment for ${project}`
}, null, 2)}
</script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-D7HD03S86W"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-D7HD03S86W');
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--primary:#011F56;--secondary:#01040F;--light:#FFFFFF;--dark:#000000;--font:'Geist',system-ui,sans-serif}
body{font-family:var(--font);color:var(--light);background:var(--dark);min-height:100vh}
.bg-gradient{position:fixed;inset:0;z-index:-1;background:radial-gradient(ellipse 120% 80% at 20% 10%,rgba(1,31,86,.7) 0%,transparent 60%),radial-gradient(ellipse 100% 60% at 80% 90%,rgba(1,31,89,.5) 0%,transparent 55%),linear-gradient(160deg,#01040F 0%,#011F56 40%,#01040F 70%,#011F59 100%)}
header{display:flex;align-items:center;justify-content:space-between;padding:18px 40px;background:rgba(1,31,86,.45);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.08)}
.logo img{height:32px;width:auto}
.header-right{display:flex;align-items:center;gap:20px}
.btn{font-family:var(--font);font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;padding:10px 22px;cursor:pointer;border:1px solid rgba(255,255,255,.2);background:transparent;color:var(--light);text-decoration:none;transition:all .2s}
.btn:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.4)}
.btn-primary{background:var(--primary);border-color:rgba(255,255,255,.25)}.btn-primary:hover{background:#01306e}
main{max-width:760px;margin:0 auto;padding:40px}
.report-header{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:28px}
.report-header h1{font-size:22px;font-weight:700}
.report-header .book-audit{font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;padding:7px 18px;border:1px solid rgba(255,255,255,.25);background:var(--primary);color:var(--light);text-decoration:none;transition:all .2s}
.report-header .book-audit:hover{background:#01306e}
.back-link{display:inline-block;margin-bottom:20px;color:rgba(255,255,255,.5);text-decoration:none;font-size:13px;transition:color .2s}
.back-link:hover{color:var(--light)}
.report-content{font-size:14px;line-height:1.7;color:rgba(255,255,255,.75);overflow-wrap:break-word;word-break:break-word}
.report-content h1,.report-content h2,.report-content h3{color:var(--light);margin:20px 0 8px}
.report-content h1{font-size:20px}.report-content h2{font-size:17px}.report-content h3{font-size:15px}
.report-content p{margin-bottom:10px}.report-content ul,.report-content ol{margin:8px 0 12px 20px}.report-content li{margin-bottom:4px}
.report-content code{background:rgba(255,255,255,.06);padding:2px 6px;font-size:12px}
.report-content pre{background:rgba(255,255,255,.04);padding:14px;overflow-x:auto;margin:10px 0;font-size:12px;white-space:pre-wrap;word-break:break-word}
.report-content a{color:#4fc3f7;text-decoration:underline;word-break:break-all}
.report-content table{width:100%;border-collapse:collapse;margin:10px 0}
.report-content table th,.report-content table td{padding:8px 12px;border:1px solid rgba(255,255,255,.1);font-size:12px;text-align:left;white-space:normal;word-break:break-word}
.report-content table th{font-weight:600;color:rgba(255,255,255,.7);background:rgba(255,255,255,.03)}
.report-content img.emoji-icon{width:18px;height:18px;vertical-align:middle}
.report-content blockquote{border-left:3px solid rgba(255,255,255,.15);padding:8px 16px;margin:12px 0;color:rgba(255,255,255,.6);font-style:italic}
footer{text-align:center;padding:30px 40px;border-top:1px solid rgba(255,255,255,.06);font-size:12px;color:rgba(255,255,255,.25);margin-top:60px}
footer a{color:rgba(255,255,255,.4);text-decoration:none}footer a:hover{color:rgba(255,255,255,.6)}
@media(max-width:768px){header{padding:14px 18px;flex-wrap:wrap;gap:10px}main{padding:24px 18px}}
</style>
</head>
<body>
<div class="bg-gradient"></div>
<header>
  <a class="logo" href="${SITE_URL}"><img src="${SITE_URL}/quantum-tracker-logo.svg" alt="Quantum Tracker"></a>
  <div class="header-right">
    <a class="btn" href="${trackerUrl}">View in Tracker</a>
    <a class="btn btn-primary" href="mailto:hello@tectonic.xyz">Book A PQ Audit</a>
  </div>
</header>
<main>
  <a class="back-link" href="${SITE_URL}">&larr; Back to Quantum Tracker</a>
  <div class="report-header">
    <h1>${escapeHtml(project)} — Quantum Exposure Report</h1>
    <a class="book-audit" href="mailto:hello@tectonic.xyz">Book Audit</a>
  </div>
  <div class="report-content">
    ${contentHtml}
  </div>
</main>
<footer>&copy; 2026 <a href="https://tectonic.xyz" target="_blank">Tectonic Labs</a> | <a href="${SITE_URL}">quantumtracker.org</a> | <a href="https://www.tectonic.xyz/privacy-policy" target="_blank">Privacy Policy</a></footer>
</body>
</html>`;
}

// ── Main ──

async function main() {
  const allReports = []; // {tab, slug, project, url}

  for (const [tab, config] of Object.entries(TABS)) {
    console.log(`\n📋 Fetching ${tab} CSV...`);
    const csv = await fetch(GITHUB_BASE + config.csv);
    if (!csv) { console.log(`  ⚠️  No CSV data for ${tab}`); continue; }

    const rows = parseCSV(csv);
    if (!rows.length) { console.log(`  ⚠️  Empty CSV for ${tab}`); continue; }
    console.log(`  Found ${rows.length} projects`);

    const outDir = path.join('reports', tab);
    fs.mkdirSync(outDir, { recursive: true });

    for (const row of rows) {
      const project = (row[config.nameKey] || '').trim();
      if (!project) continue;
      const slug = project.replace(/\s+/g, '-').toLowerCase();
      const mdUrl = GITHUB_BASE + config.reportBase + slug + '.md';

      process.stdout.write(`  ${project}... `);
      const md = await fetch(mdUrl);
      if (!md) { console.log('no report'); continue; }

      const contentHtml = renderMarkdown(md);
      const pageHtml = buildReportPage(project, tab, slug, contentHtml);
      const outPath = path.join(outDir, slug + '.html');
      fs.writeFileSync(outPath, pageHtml, 'utf-8');
      allReports.push({ tab, slug, project });
      console.log('✅');
    }
  }

  // Generate sitemap.xml
  console.log(`\n🗺️  Generating sitemap.xml (${allReports.length} reports)...`);
  const now = new Date().toISOString().split('T')[0];
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;
  for (const r of allReports) {
    sitemap += `  <url>
    <loc>${SITE_URL}/reports/${r.tab}/${r.slug}.html</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }
  sitemap += '</urlset>';
  fs.writeFileSync('sitemap.xml', sitemap, 'utf-8');

  console.log(`\n✅ Done! Generated ${allReports.length} report pages + sitemap.xml`);
}

main().catch(err => { console.error('Fatal error:', err); process.exit(1); });
