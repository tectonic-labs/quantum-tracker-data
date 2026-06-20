# Sonic (S) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Sonic |
| **Ticker** | S |
| **Website** | [soniclabs.com](https://www.soniclabs.com/) |
| **GitHub** | [Fantom-foundation](https://github.com/Fantom-foundation) |
| **Derived from** | Fantom (consensus + tooling); Ethereum (EVM execution) |
| **On-chain environment** | EVM (FVM — instruction-fused) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Sonic is the rebranded continuation of Fantom, launched on January 7, 2025, with a full FTM-to-S token migration completed by May 10, 2025. The chain uses Lachesis, an asynchronous Byzantine fault tolerant (aBFT) DAG consensus protocol, achieving approximately 720 ms time to finality. In April 2026, the Sonic research team published a [blog post](https://blog.soniclabs.com/sonics-road-to-quantum-resistance/) analyzing quantum threats and arguing that Sonic's DAG-based architecture is structurally well-suited for PQC migration because it uses per-event individual signatures rather than BLS aggregation.

The blog names **Dilithium** and **Falcon** (lattice-based) and **XMSS** / **SPHINCS+** (hash-based) as candidate replacement signature schemes. The team describes the migration as straightforward: "swap the signature scheme, update the hash output size, and ship" — with the consensus logic, DAG structure, and liveness guarantees remaining unchanged. However, no timeline or formal commitment has been made; the post states the Sonic tech team will "keep up to date with Ethereum Foundation's approach."

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **Dilithium / ML-DSA** | ECDSA secp256k1 | Tx Signatures, Consensus | Discussed |
| **Falcon / FN-DSA** | ECDSA secp256k1 | Tx Signatures, Consensus | Discussed |
| **XMSS** | ECDSA secp256k1 | Tx Signatures, Consensus | Discussed |
| **SPHINCS+** | ECDSA secp256k1 | Tx Signatures, Consensus | Discussed |

## Transaction Signatures

**Grade: D ⚠️**

Sonic uses secp256k1 ECDSA for all transaction signatures, consistent with its EVM-compatible design.

**Current state.** No post-quantum signature scheme is available on mainnet or testnet. All transaction authorization relies on ECDSA.

**Planned future work.** The [April 2026 blog post](https://blog.soniclabs.com/sonics-road-to-quantum-resistance/) identifies **Dilithium**, **Falcon**, **XMSS**, and **SPHINCS+** as candidate PQC replacements and describes the swap as architecturally straightforward. No implementation timeline or formal commitment has been published. The team states it will track the Ethereum Foundation's PQC research.

## Consensus

**Grade: D ⚠️**

Sonic runs the Lachesis aBFT DAG consensus protocol. Validators gossip events asynchronously and reach finality through two-thirds stake-weighted voting. Block and vote signatures are secp256k1 ECDSA.

**Current state.** All validator signing uses classical elliptic-curve cryptography. No PQC alternative is deployed.

**Planned future work.** The [blog post](https://blog.soniclabs.com/sonics-road-to-quantum-resistance/) argues that SonicCS's use of per-event individual signatures (rather than BLS aggregation or threshold signatures) avoids the "aggregation trap" that makes PQC migration difficult for other PoS chains. The post states: "the consensus logic, the DAG structure, and the liveness guarantees all stay the same" after a signature scheme swap. No timeline or commitment has been published.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Sonic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Sonic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

**Grade: F ❌**

### Cross-chain Bridge

**Current state.** Sonic operates an EC-based cross-chain bridge to Ethereum.

**Planned future work.** The PQC blog post does not address bridge security or other special features.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ⚠️, P2P ❌, On-Chain ❌, Other ❌.

The blog post focuses on adding PQC signatures; it does not discuss removing elliptic-curve cryptography. No EC retirement schedule or sunset plan has been published by Sonic Labs.

## Governance

Protocol upgrades on Sonic are coordinated by Sonic Labs through validator outreach and scheduled binary updates, activated at epoch boundaries. No formal on-chain governance or numbered improvement proposal process has been published. On-chain governance improvements are flagged for a future update.

- The [Sonic PQC blog post](https://blog.soniclabs.com/sonics-road-to-quantum-resistance/) (April 20, 2026) is the only PQC-related publication from Sonic Labs. It is a research and architectural analysis, not a governance proposal or formal roadmap commitment.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
