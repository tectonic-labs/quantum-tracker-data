# Arc (ARC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Arc |
| **Ticker** | ARC |
| **Website** | https://www.arc.network/ |
| **GitHub** | https://github.com/circlefin/arc-node |
| **Twitter / X** | https://x.com/Arc |
| **On-chain environment** | EVM |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | A | ✅ | Shipped |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | C | 🗺️ | Roadmapped |

Arc is a [Circle-developed stablecoin-native L1](https://www.circle.com/blog/introducing-arc-an-open-layer-1-blockchain-purpose-built-for-stablecoin-finance) (USDC as native gas) that is EVM-compatible. Circle has published a [4-phase quantum-resistant roadmap](https://www.arc.network/blog/arcs-quantum-resistant-design-and-roadmap-why-it-matters) for the chain. Phase 1, scheduled to ship at mainnet launch, provides opt-in quantum-resistant wallets and an **SLH-DSA-SHA2-128s** EVM precompile for on-chain post-quantum signature verification. The precompile is implemented in the [arc-node](https://github.com/circlefin/arc-node) source under `crates/precompiles/src/pq.rs`. Phases 2 (private state encryption), 3 (validator security), and 4 (offchain infrastructure) target the remaining surfaces.

Arc has no on-chain governance and Circle-led decision-making, so the roadmap is a corporate commitment rather than a community vote. Phase 1 is opt-in: ECDSA remains the default at launch.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **SLH-DSA-SHA2-128s** (FIPS 205 / SPHINCS+) | ECDSA secp256k1 | Tx Signatures, On-Chain | Implemented (Phase 1: opt-in PQC wallets and EVM precompile) |

## 1. Transaction Signatures

**Grade: B 🔧**

Arc's mainnet ships with optional quantum-resistant wallets. Default accounts use ECDSA secp256k1 (Ethereum-compatible), and users can opt into PQC-protected accounts that use **SLH-DSA-SHA2-128s** — the NIST-standardized version of SPHINCS+ (FIPS 205). This is a stateless hash-based scheme; it carries significant size cost (~7,856-byte signatures) and slower signing relative to lattice-based alternatives, but avoids lattice assumptions entirely.

Some news aggregators initially [reported ML-DSA (Dilithium) and Falcon](https://cryptonews.com/news/circle-quantum-resistant-roadmap-arc-blockchain/) for Arc; the [actual Arc documentation](https://www.arc.network/blog/arcs-quantum-resistant-design-and-roadmap-why-it-matters) and the [arc-node source](https://github.com/circlefin/arc-node) specify SLH-DSA. NIST acknowledges that lattice-based PQ schemes produce signatures 2–10× larger than ECDSA, putting throughput pressure on the consensus layer; Circle cites algorithm optimization and hardware acceleration as the mitigation path.

**Current state.** ECDSA remains the default. **SLH-DSA-SHA2-128s** wallets are an opt-in path at mainnet launch (Phase 1 of the published roadmap).

**Planned future work.** Phase 1 covers user wallets. Phases 2–4 do not directly address user-facing transaction signing, focusing on private state encryption (Phase 2), validator security (Phase 3), and offchain infrastructure (Phase 4).

## 2. Consensus

**Grade: D ⚠️**

[Phase 3 of Circle's published roadmap](https://www.arc.network/blog/arcs-quantum-resistant-design-and-roadmap-why-it-matters) targets "validator security" and explicitly anticipates securing Arc's consensus layer with PQC. No specific algorithm, draft, or activation timeline for Phase 3 has been published. Mainnet consensus is expected to launch with EC-based validator signing.

**Current state.** No confirmed PQ for validator signing at mainnet. Phase 3 is the future stage that targets it.

**Planned future work.** Phase 3 of the roadmap. No specific algorithm or schedule has been published.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Arc in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: A ✅**

The [Arc node source](https://github.com/circlefin/arc-node) includes an EVM precompile for **SLH-DSA-SHA2-128s** signature verification (`crates/precompiles/src/pq.rs`). Smart contracts on Arc can call this precompile to verify post-quantum signatures on-chain without writing custom crypto code. Test vector generation and test vectors are also in the codebase. The same `slh-dsa` Rust crate version is used by other PQC-active L1 codebases.

**Current state.** The **SLH-DSA-SHA2-128s** EVM precompile is implemented in the Arc node source. At mainnet launch, on-chain post-quantum signature verification is available to any smart contract via this precompile.

**Planned future work.** Mainnet activation. As additional FIPS standards mature and Phase 2+ rolls out, additional precompiles could be added by future protocol upgrade.

## 5. Other Features

Arc does not support any special features.

## 6. EC Sunset

**Grade: C 🗺️**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Arc's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus ⚠️, P2P ❌, On-Chain ✅, Other ➖.

[Circle's 4-phase roadmap](https://www.arc.network/blog/arcs-quantum-resistant-design-and-roadmap-why-it-matters) describes PQC across the wallet, state, validator, and offchain surfaces, and Circle frames PQC as ["a baseline requirement"](https://www.theblock.co/post/396378/circle-layer-1-arc-quantum-resistant) for the chain. Phase 1 at mainnet, however, is opt-in rather than mandatory PQC: ECDSA remains the default at launch. The roadmap describes additions in Phases 2–4 (private state encryption, validator security, offchain infrastructure) but does not currently include a scheduled deprecation date for EC signatures or curve removal.

**Current state.** Phase 1 at mainnet (opt-in PQC wallets + SLH-DSA EVM precompile). ECDSA remains the default.

**Planned future work.** Phases 2–4 are scheduled but unspecific in published materials. No EC deprecation milestones have been announced.

## Governance

Arc has no on-chain governance at launch; protocol direction is set by Circle Inc. PQC roadmap status updates appear through:

- [Circle press releases and blog posts](https://www.circle.com/pressroom/circle-launches-arc-public-testnet) — official announcements about chain readiness, testnet activations, and roadmap progress.
- [Arc Blog](https://www.arc.network/blog/arcs-quantum-resistant-design-and-roadmap-why-it-matters) — the canonical source for the 4-phase quantum-resistant roadmap.
- [arc-node GitHub](https://github.com/circlefin/arc-node) — open-source implementation including the SLH-DSA-SHA2-128s EVM precompile.

---

_Generated on 06 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
