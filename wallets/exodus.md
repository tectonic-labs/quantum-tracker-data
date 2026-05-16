# Exodus — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Exodus |
| **Vendor** | Exodus Movement (NYSE: EXOD) |
| **Category** | Software |
| **Custody model** | EOA seed phrase (BIP-39); optional hardware co-sign via Trezor |
| **Website** | https://www.exodus.com/ |
| **GitHub** | https://github.com/ExodusMovement |
| **Platforms** | Desktop (macOS, Windows, Linux), mobile (iOS, Android), and a browser extension ("Exodus Web3 Wallet") for Chrome, Brave, and Edge |
| **Open source** | Proprietary — the wallet application core is closed source; auxiliary "Hydra SDK" libraries are published separately |
| **First release** | 2015 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | Yes-but | *️⃣ | In Progress |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | No | ❌ | Not Engaged |
| Contract PQC Support | No | ❌ | Not Engaged |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Exodus is one of the oldest continuously operating multi-currency software wallets, shipping on desktop, mobile, and a browser extension since 2015. Every signature it produces today is classical: ECDSA over secp256k1 for Bitcoin and EVM chains, Schnorr (BIP-340) for Bitcoin Taproot, and EdDSA over Ed25519 for Solana, Cosmos-family chains, Algorand, Aptos, Tezos, and Cardano. No post-quantum signing path ships on any Exodus surface.

Exodus has touched the topic of post-quantum cryptography publicly, which sets it apart from many wallet vendors who have said nothing at all. Its 2022 explainer post, ["Quantum Computers and the Future of Cryptocurrency"](https://www.exodus.com/blog/quantum-computers-cryptocurrency/), surveys the threat and candidate algorithms as user education, and — as a publicly traded company — Exodus carries quantum computing as a generic risk factor in its [SEC filings](https://www.exodus.com/investors/sec-filings/all-sec-filings). Neither of those is a migration plan: there is no published roadmap, no algorithm selection for the wallet, and no engineering commitment to a timeline.

## Proposed and Implemented PQC Algorithms

Exodus does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: Yes-but** *️⃣

Exodus has spoken about post-quantum cryptography in public, but only at the level of awareness rather than commitment. Its 2022 blog post, ["Quantum Computers and the Future of Cryptocurrency"](https://www.exodus.com/blog/quantum-computers-cryptocurrency/), is an educational explainer that walks through the quantum threat and surveys candidate post-quantum schemes; it is positioned as user education, not an engineering disclosure. As a public company, Exodus also names quantum computing as a generic risk factor in its [SEC filings](https://www.exodus.com/investors/sec-filings/all-sec-filings) — boilerplate risk-register language with no migration plan attached.

**Current state.** The 2022 explainer and the SEC risk-factor language are the only standing public statements on PQC. Both acknowledge the threat; neither commits Exodus to a wallet migration, an algorithm choice, or a date. The blog post is now several years old and predates the finalization of NIST's post-quantum standards.

**Planned future work.** No PQC-specific roadmap or engineering disclosure has been found. The risk-factor language in Exodus's filings is the only forward-looking reference, and it stops at acknowledging risk.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Exodus in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Protocol PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Exodus in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Contract PQC Support

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Exodus in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Exodus in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Exodus is operated by Exodus Movement, Inc., a public corporation listed on NYSE American under the ticker EXOD since December 2024. Governance follows a standard public-company structure (Board of Directors, Audit Committee, executive officers); there is no DAO and no governance token. Product direction is set internally and disclosed through SEC filings (10-K, 10-Q, 8-K) and investor-relations communications — the [SEC filing index](https://www.exodus.com/investors/sec-filings/all-sec-filings) is where a material PQC commitment would surface for a company with public-reporting obligations.

Security issues are handled through a public [HackerOne bug bounty](https://hackerone.com/exodus) and an [Immunefi bug bounty](https://immunefi.com/bug-bounty/exodus/scope/). Exodus's [security page](https://www.exodus.com/security) describes manual auditing of open-source dependencies before shipping. No single canonical public third-party audit report for the wallet application has been located.

The wallet application core is closed source: independent verification by [WalletScrutiny](https://walletscrutiny.com/android/exodusmovement.exodus/) lists the Android binary as "not verifiable" because the source is not published. The published [Hydra SDK](https://docs.exodus.com/open-source) libraries are utility components, not a buildable wallet, so any change to the wallet's cryptography would have to come from Exodus engineering itself. Exodus is also the canonical desktop companion software for Trezor hardware devices, which keeps signing keys in the device's secure element when paired.

No dated, on-record PQC milestone published by the vendor has been found.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
