# Movement Network (MOVE) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Movement Network |
| **Ticker** | MOVE |
| **Website** | https://www.movementnetwork.xyz/ |
| **GitHub** | https://github.com/movementlabsxyz |
| **On-chain environment** | MoveVM (BlockSTM parallel execution) + EVM |
| **Mainnet genesis** | 2025-03-01 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Movement Network is a modular network of Move-VM rollups whose flagship deployment — M2 mainnet — entered public beta in March 2025. The architecture layers [MoveVM execution](https://www.movementnetwork.xyz/learn) with BlockSTM parallel processing, a Decentralized Shared Sequencer (DSS) running Avalanche's Snowman consensus for transaction ordering, [Celestia](https://medium.com/movementlabsxyz/movement-celestia-an-open-protocol-to-build-modular-move-l2s-on-ethereum-b20ee7ca6edf) for data availability, and eventual settlement to Ethereum. Every signing surface across this stack — Move-style account signatures (Ed25519), EVM account signatures (secp256k1 ECDSA), DSS validator keys, and staked-attestation signatures — relies on elliptic-curve cryptography. No post-quantum migration work has been identified in Movement Labs' documentation, blog, or GitHub as of mid-2026.

## Proposed and Implemented PQC Algorithms

Movement Network does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Movement Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Movement Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Movement Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Movement Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

**Grade: F ❌**

### Data Availability (Celestia)

Movement uses [Celestia](https://medium.com/movementlabsxyz/movement-celestia-an-open-protocol-to-build-modular-move-l2s-on-ethereum-b20ee7ca6edf) by default for data availability. Celestia's DA layer uses hash-based Namespaced Merkle Trees, which are quantum-resistant. However, the validator-set signatures attesting to data on Celestia use Ed25519 (CometBFT-derived), which remains elliptic-curve based.

**Current state.** The DA storage layer's hash-based NMT structure is PQC-friendly, but the attesting signature layer is EC. No post-quantum alternative for validator attestations has been announced.

**Planned future work.** No PQC migration roadmap for the attestation or DA-signature layers has been published.

### Settlement on Ethereum

Movement rollup state roots settle to Ethereum L1, inheriting Ethereum's EC posture on the settlement side.

**Current state.** Ethereum settlement is EC-based. No change is in scope from Movement Labs.

**Planned future work.** EC sunset on the settlement layer would follow Ethereum's roadmap, which is separate from Movement Labs' control.

### Fast Staked Attestations

The DSS sequencer-validator set produces pre-confirmation signatures over transactions. These are EC-based.

**Current state.** No post-quantum alternative for fast staked attestations has been announced.

**Planned future work.** None documented.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Movement Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Movement Labs controls protocol development directly. The DSS validator set coordinates sequencer upgrades; no on-chain governance mechanism for feature activation has been documented publicly. Community-facing information is available via the [Movement Network site](https://www.movementnetwork.xyz/learn) and [Movement Labs blog](https://blog.movementlabs.xyz/article/what-is-movement-move-blockchain). No post-quantum proposal has been identified in any of these venues.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
