# Monero (XMR) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Monero |
| **Ticker** | XMR |
| **Website** | <https://getmonero.org> |
| **GitHub** | <https://github.com/monero-project> |
| **Twitter / X** | <https://x.com/monero> |
| **On-chain environment** | None (no general smart contracts) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Monero's protocol is built end-to-end on elliptic-curve cryptography. [Ed25519 spend authorization](https://www.moneroinflation.com/ring_signatures_clsag), [CLSAG ring signatures](https://www.moneroinflation.com/ring_signatures_clsag), [stealth addresses via ECDH](https://eprint.iacr.org/2020/548.pdf) on Curve25519, [Pedersen commitments](https://web.getmonero.org/library/Zero-to-Monero-2-0-0.pdf), and [Bulletproofs+ range proofs](https://www.getmonero.org/2020/12/24/Bulletproofs+-in-Monero.html) on Ristretto are all curve-based. A quantum break against the underlying discrete-log problem would be retroactive: recorded ring signatures, encrypted note ciphertexts, and Pedersen commitments stored on chain today could be re-analyzed to identify true signers, link stealth addresses, and recover hidden amounts across the historical ledger. Past privacy is not preserved by any future migration; transactions made today carry forward the post-quantum risk.

The most consequential recent protocol change is [FCMP++ (Full-Chain Membership Proofs++)](https://www.getmonero.org/2024/04/27/fcmps.html), activated Q1 2026, which replaces ring signatures with a zero-knowledge membership proof over an EC curve-tree structure. FCMP++ improves privacy and scalability but does not change the elliptic-curve foundation; the [Veridise audit](https://ccs.getmonero.org/proposals/fcmp++-development.html) confirms the EC dependency. Several research directions toward a post-quantum stack — CSIDH-based key exchange in [Jamtis](https://gist.github.com/tevador/50160d160d24cfc6c52ae02eb3d17024), the GLYPH hash-based ring signature scheme, and the MatRiCT confidential-transaction protocol — are present in the research record but have not produced a deployment plan, and the [Monero Research Lab thread on post-quantum cryptography](https://github.com/monero-project/research-lab/issues/151) summarizes the consensus as "no complete, production-ready plan to make every component PQC-safe."

## Proposed and Implemented PQC Algorithms

Monero does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Monero in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: A ✅**

Monero uses [RandomX](https://www.getmonero.org/resources/moneropedia/randomx.html), a CPU-optimized proof-of-work algorithm based on memory-hard random code execution and standard hash primitives. PoW security is hash-based; mining is unaffected by Shor's algorithm and Grover's algorithm at most halves preimage strength. Validator identity is not part of the consensus layer.

**Current state.** RandomX PoW. Hash-based.

**Planned future work.** None needed for the consensus layer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Monero in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: ➖ ➖**

Monero is not a smart-contract platform. There is no on-chain VM, no signature-verification primitive exposed to user code, and no surface to which a post-quantum signature scheme would apply. This category does not apply.

## 5. Other Features

### Privacy stack (ring signatures, stealth addresses, Pedersen commitments, Bulletproofs+)

**Current state.** Monero's privacy guarantees rest on a stack of EC primitives. [CLSAG ring signatures](https://www.moneroinflation.com/ring_signatures_clsag) (deployed October 2020) hide the sender by mixing the spending key with decoys and prove that one of N keys signed without revealing which. [Stealth addresses](https://eprint.iacr.org/2020/548.pdf) use [ECDH on Curve25519](https://www.monero.how/tutorial-monero-privacy-ring-signatures-stealth-addresses-ringct) so each transaction is sent to a unique one-time output. [Pedersen commitments](https://web.getmonero.org/library/Zero-to-Monero-2-0-0.pdf) hide amounts while preserving balance verification. [Bulletproofs+](https://www.getmonero.org/2020/12/24/Bulletproofs+-in-Monero.html) provide compact range proofs over Ristretto. Each primitive's security reduces to the discrete-log problem on its underlying curve. A quantum break would be retroactive: stored signatures, ciphertexts, and commitments could be reprocessed years later to identify true signers, link stealth outputs, and recover the transaction amounts the privacy stack was designed to hide.

The [FCMP++ upgrade](https://www.getmonero.org/2024/04/27/fcmps.html) (activated Q1 2026) replaces the ring-signature membership proof with a zero-knowledge proof over an EC curve-tree structure. It enlarges the anonymity set and improves performance but, per the [Veridise audit summary](https://ccs.getmonero.org/proposals/fcmp++-development.html), does not change the EC foundation.

**Planned future work.** Several post-quantum research directions are on the public record without a deployment plan. The [Jamtis addressing scheme](https://gist.github.com/tevador/50160d160d24cfc6c52ae02eb3d17024), originally envisioned with CSIDH (isogeny-based key exchange), is described in public material as deprioritized after FCMP++ because of CSIDH's performance overhead. GLYPH (a hash-based ring-signature scheme) and MatRiCT (an alternative confidential-transaction protocol) appear in research write-ups without an implementation timeline. The [Monero Research Lab post-quantum thread](https://github.com/monero-project/research-lab/issues/151) summarises the position as no complete, production-ready PQ plan.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ✅, P2P ❌, On-Chain ➖, Other ❌.

Monero has no published plan to retire elliptic-curve cryptography. The most recent protocol upgrade ([FCMP++](https://www.getmonero.org/2024/04/27/fcmps.html), Q1 2026) prioritized scalability and privacy-set size and remains EC-based.

**Current state.** No EC retirement scheduled.

**Planned future work.** None published.

## Governance

Monero protocol changes are coordinated by the [Monero core team](https://github.com/monero-project/monero) with cryptographic research led by the [Monero Research Lab (MRL)](https://github.com/monero-project/research-lab). Funding for protocol work flows through the [Community Crowdfunding System (CCS)](https://ccs.getmonero.org/), and discussion happens on the [research-lab GitHub repository](https://github.com/monero-project/research-lab) and the broader Monero forums.

PQ-relevant work currently visible:

- [FCMP++ (Full-Chain Membership Proofs++)](https://www.getmonero.org/2024/04/27/fcmps.html) — activated Q1 2026; ring-signature replacement, EC-based, not a PQ migration. Funded via [CCS](https://ccs.getmonero.org/proposals/fcmp++-development.html); audited by Veridise.
- [Monero Research Lab issue #151 — Post-Quantum Cryptography Discussion](https://github.com/monero-project/research-lab/issues/151) — open discussion thread.
- [Monero Research Lab issue #131 — Post-Quantum Security & Ethics](https://github.com/monero-project/research-lab/issues/131) — open discussion thread.
- [Jamtis addressing scheme (gist)](https://gist.github.com/tevador/50160d160d24cfc6c52ae02eb3d17024) — proposal authored by Tevador (also the RandomX designer); originally included CSIDH key exchange.
- [CCS proposal to research post-quantum strategies for Monero](https://ccs.getmonero.org/proposals/research-post-quantum-monero.html) — funding proposal for research work.

No fork has been scheduled or signaled for any PQ migration.

---

_Generated on 06 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
