# Conflux (CFX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Conflux |
| **Ticker** | CFX |
| **Website** | [confluxnetwork.org](https://doc.confluxnetwork.org) |
| **GitHub** | [Conflux-Chain](https://github.com/Conflux-Chain/conflux-rust) |
| **On-chain environment** | EVM (eSpace) / Conflux-native (Core Space) |
| **Current mainnet version** | conflux-rust v3.0.x (Apr 2026 hardfork) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Conflux is a high-throughput L1 using a [Tree-Graph ledger structure with the GHAST algorithm](https://medium.com/conflux-network/understanding-the-conflux-tree-graph-consensus-algorithm-e1b57d5c3da9) for Proof-of-Work block ordering. Since v2.0.0 (the Hydra upgrade, described in a [PRNewswire announcement](https://www.prnewswire.com/news-releases/conflux-network-adds-pos-consensus-and-deploys-ethereum-native-development-space-301499219.html)), it has paired that PoW base with a [PoS finality chain](https://doc.confluxnetwork.org/docs/general/conflux-basics/consensus-mechanisms/proof-of-stake/pos_overview) that votes on confirmed pivot blocks using BLS12-381 aggregate signatures. Once the PoS chain finalizes a pivot, PoW miners are forced to follow it, making the PoS layer the binding finality mechanism.

Conflux also runs a dual execution space: **Core Space** (Conflux-native addressing, CIP-style built-in contracts) and **eSpace** (EVM-equivalent, with standard Ethereum precompiles including `ecrecover` and BN254). No post-quantum cryptographic work has been located in the Conflux Foundation's publications, the [conflux-rust repository](https://github.com/Conflux-Chain/conflux-rust), or the [CIPs governance repo](https://github.com/Conflux-Chain/CIPs).

## Proposed and Implemented PQC Algorithms

Conflux does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Conflux in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

Conflux's [consensus mechanism](https://doc.confluxnetwork.org/docs/general/conflux-basics/consensus-mechanisms) is a hybrid of two layers. The base layer is Proof-of-Work using the Tree-Graph / GHAST algorithm — hash-based mining that is not threatened by Shor's algorithm. The finality layer is a [PoS chain](https://doc.confluxnetwork.org/docs/general/conflux-basics/consensus-mechanisms/proof-of-stake/pos_overview) introduced in the Hydra upgrade, where validators vote on confirmed PoW pivot blocks using BLS12-381 aggregate signatures. Once the PoS chain issues a finality vote, PoW miners cannot reverse it; the PoS layer therefore binds the canonical chain.

BLS12-381 aggregate signatures are quantum-vulnerable. A sufficiently capable quantum adversary could forge PoS finality votes and direct PoW miners to follow an attacker-chosen pivot, effectively controlling canonical-chain selection. The PoW base layer's hash security does not protect against this.

**Current state.** Tree-Graph PoW for block ordering; BLS12-381 PoS finality chain for irreversibility. The binding layer is EC-based.

**Planned future work.** No post-quantum consensus proposal has been published. The [CIPs repository](https://github.com/Conflux-Chain/CIPs) contains no PQC-related improvement proposal.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Conflux in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

Conflux eSpace is EVM-equivalent and exposes the full standard Ethereum precompile set, including `ecrecover` (secp256k1 signature recovery) and BN254 precompiles (elliptic-curve addition, scalar multiplication, and pairing). Core Space exposes Conflux-specific built-in contracts but no post-quantum verification primitive. No CIP proposing a PQC precompile or built-in has been identified.

**Current state.** eSpace precompile set mirrors Ethereum, including EC signature-verification primitives. No PQC verification primitive is available.

**Planned future work.** None located.

## Other Features

Conflux does not support any special features.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

We have found no public information indicating migration activity for Conflux in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Conflux protocol upgrades are coordinated by the Conflux Foundation through numbered [CIPs (Conflux Improvement Proposals)](https://github.com/Conflux-Chain/CIPs), with activation epoch and block number thresholds embedded in the node binary. No on-chain governance vote is required; the Foundation announces upgrade timing and node operators update their binaries before the activation epoch.

No CIP addressing post-quantum cryptography, signature-scheme migration, or elliptic-curve retirement has been identified. Readers wanting to track current state should monitor the CIPs repository and the [Conflux documentation](https://doc.confluxnetwork.org) directly.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
