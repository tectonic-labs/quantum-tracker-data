# L1 Chain PQC Readiness Reports

Long-form public reports on the post-quantum cryptography readiness of individual L1 blockchains. One markdown file per chain, named in lowercase with hyphens (e.g. `bitcoin.md`, `bnb-chain.md`, `bitcoin-cash.md`).

## Report structure

Each report follows the same layout:

1. **Chain info table** — name, ticker, official website, GitHub organization (foundation / governance preferred), social handles, on-chain environment, mainnet genesis, and any "derived from" / "parent chain" relationship.
2. **Summary table** — six rows (Transaction Signatures, Consensus, P2P Networking, On-Chain Logic, Other Features, EC Sunset) with letter grade, stoplight icon, and plain-language status text.
3. **Summary paragraphs** — broad overview of migration efforts and the chain's current position; links to any general PQ migration hub or roadmap the chain publishes.
4. **Proposed and Implemented PQC Algorithms** — table of distinct PQ algorithms named in publicly cited material, what they replace, the category they live in, and their status.
5. **Per-category sections** — Transaction Signatures, Consensus, P2P Networking, On-Chain Logic, Other Features, EC Sunset. Each gives a grade, conversational prose with annotated evidence links, a current-state paragraph, and a planned-future-work paragraph. The EC Sunset section also carries a per-category cross-walk showing PQC adoption alongside the headline retirement rating.
6. **Governance** — venues where decisions get made (BIPs, EIPs, CIPs, SIMDs, mailing lists, governance forums) and the proposals currently in flight, with verbatim lifecycle status as the venue records it. Plus links so the reader can verify and follow current state.
7. **Footer** — generation date, the date the underlying source was current, a contact line for corrections, and a link to the editorial policy.

## Stoplight legend

| Icon | Status |
|------|--------|
| ✅ | Shipped |
| 🔧 | In Development |
| 🗺️ | Roadmapped |
| ⚠️ | Discussed |
| ❌ | Not Discussed |
| ➖ | Not Applicable |

The same legend is used in summary tables, in the EC Sunset cross-walk, and inline in prose.

## Linkage with `chains.csv`

Reports are referenced from [`../../chains.csv`](../../chains.csv) via the `report` column. A row whose target file does not exist in this directory leaves the column empty, and the website renders a lock icon. The summary-table icons in each report match the corresponding `*_exposure` and `ec_sunset` columns in the CSV — both come from the same upstream rating.
