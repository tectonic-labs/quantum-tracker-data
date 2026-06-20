# Casper Network (CSPR) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Casper Network |
| **Ticker** | CSPR |
| **Website** | [casper.network](https://www.casper.network/) |
| **GitHub** | [casper-network](https://github.com/casper-network) |
| **Twitter / X** | [@Casper_Network](https://x.com/Casper_Network) |
| **On-chain environment** | WASM |
| **Current mainnet version** | v2.2.0 (activated 2026-03-23) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | C | 🗺️ | Roadmapped |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Casper Network is a Proof-of-Stake Layer 1 built around the Zug consensus protocol (which replaced Highway in Casper 2.0), offering deterministic BFT with instant finality. In May 2026, the Casper Association published the [Casper Manifest](https://www.casper.network/news/manifest), a multi-year technical roadmap that includes quantum-safe transaction signing as a named protocol initiative. The Manifest commits to adding **ML-DSA-44** (FIPS 204) as a new supported signature scheme, shipping hybrid accounts that carry both classical and post-quantum keys during a transition period, and providing migration tooling for existing accounts. This work is classified as Tier 3 (2027 and beyond) in the Manifest's sequencing.

Casper's existing multi-algorithm account model — which already supports both Ed25519 and secp256k1 ECDSA — was [designed to accommodate new signature types](https://www.casper.network/news/manifest) without consensus-breaking changes. The PQC commitment currently covers transaction signatures only; consensus, P2P networking, and on-chain logic are not addressed in the Manifest's PQC roadmap.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA-44** | Ed25519, ECDSA secp256k1 | Tx Signatures | On Roadmap |

## Transaction Signatures

**Grade: C 🗺️**

Casper accounts currently support two signing schemes: Ed25519 (default) and secp256k1 ECDSA. Both are elliptic-curve-based and quantum-vulnerable. Standard Casper key derivation uses Blake2b hashing of the public key for the AccountHash.

**Current state.** No post-quantum signature scheme is available on mainnet or testnet. All transaction authorization relies on classical elliptic-curve signatures.

**Planned future work.** The [Casper Manifest](https://www.casper.network/news/manifest) (published May 2026) commits to adding **ML-DSA-44** (FIPS 204) as a new supported cryptographic scheme. The plan includes hybrid accounts carrying both classical and post-quantum keys during a transition period, with migration tooling for existing accounts. The Manifest positions this as a Tier 3 initiative (2027+), noting that "no major smart contract platform has shipped post-quantum transaction signing" and citing the "harvest now, decrypt later" threat as motivation for enterprise deployments. Casper's cryptographic key system was described as having been "designed for exactly this kind of extension."

## Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Casper Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Casper Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Casper Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

Casper Network does not support any special features.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures 🗺️, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

The Casper Manifest describes hybrid accounts with "both classical and post-quantum keys during a transition period," which implies eventual deprecation of classical keys. However, no explicit EC removal schedule, deprecation timeline, or fork milestone has been published. The roadmap commits to adding PQC as a new option alongside existing EC schemes but does not address when EC signature acceptance would end.

## Governance

Casper Network upgrades are governed through the **Casper Validator Voting (CVV)** process. Protocol changes are proposed by the Casper Association or its development grantees, ratified via off-chain CVV governance votes, and activated at pre-announced era boundaries through chainspec-driven upgrades. Validators must upgrade before the activation era; non-upgraded validators are forked off.

- The [Casper Manifest](https://www.casper.network/news/manifest) (published May 2026) is the current multi-year technical roadmap. Quantum-safe transaction signing is listed as a Tier 3 initiative (2027+). The Manifest was also announced via [press release](https://chainwire.org/2026/05/12/casper-network-publishes-the-casper-manifest-a-multi-year-roadmap-to-power-regulated-real-world-assets-and-the-machine-economy/).
- No CVV proposal specific to PQC has been published as of this report.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
