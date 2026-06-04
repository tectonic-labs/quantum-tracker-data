# MegaETH (MEGA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | MegaETH |
| **Ticker** | MEGA |
| **Website** | https://www.megaeth.com/ |
| **GitHub** | https://github.com/megaeth-labs |
| **On-chain environment** | EVM |
| **Mainnet genesis** | 2026-02-09 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

MegaETH is a real-time EVM chain that launched mainnet in February 2026. It uses a centralized sequencer architecture (OP Stack-based) with high-frequency mini-blocks (~10 ms) and standard EVM blocks (~1 s), settling finality to Ethereum L1 via [EigenDA](https://www.eigenlayer.xyz/) for data availability. MegaETH's pre-mainnet testnet demonstrated throughput of 35,000 TPS and processed 10.7 billion transactions.

MegaETH inherits the full Ethereum EVM cryptographic stack — secp256k1 ECDSA for user transactions, secp256k1 node identity for P2P, and standard EVM precompiles. Its use of EigenDA adds a dependency on BLS12-381 aggregated signatures for data availability operator attestations, which are pairing-based and quantum-vulnerable. No PQC migration activity has been identified for MegaETH in any category.

## Proposed and Implemented PQC Algorithms

> MegaETH does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for MegaETH in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

MegaETH does not run its own independent consensus mechanism. A centralized sequencer (operated by the MegaETH team) orders and executes transactions; Ethereum L1 provides finality for settled state. The chain inherits Ethereum's BLS12-381-based validator block validation for the settlement layer. On-chain governance and validator staking were described at launch as features to be added up to 18 months post-launch; until then, upgrade authority remains with the core team.

**Current state.** Sequencer-controlled; inherits Ethereum's BLS12-381 settlement. No post-quantum consensus mechanism.

**Planned future work.** None published.

## 3. P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for MegaETH in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

> We have found no public information indicating migration activity for MegaETH in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

**Grade: F ❌**

### EigenDA Data Availability

MegaETH uses [EigenDA](https://www.eigenlayer.xyz/) — Eigenlayer's data availability service — to post DA certificates to Ethereum via the OP Stack batcher. EigenDA is secured by restaked ETH and uses BLS12-381 aggregated signatures for operator attestations that certify data availability. BLS12-381 is a pairing-friendly elliptic curve; its discrete-log hardness is broken by Shor's algorithm. A quantum adversary capable of forging EigenDA operator attestations could falsely certify unavailable data, undermining the data availability guarantees that MegaETH's settlement relies on.

**Current state.** EigenDA DA proofs are BLS12-381-based. No post-quantum alternative is planned.

**Planned future work.** None published for MegaETH or EigenDA.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No PQC migration plan or EC retirement schedule has been published by the MegaETH team. The chain launched in February 2026 and its stated roadmap focuses on decentralization, on-chain governance, and staking — none of which address quantum cryptography.

**Current state.** EC cryptography is present in every layer of MegaETH, including the EigenDA dependency.

**Planned future work.** None published.

## Governance

MegaETH is currently governed by the core team; the chain's permissioned sequencer architecture means protocol upgrades are deployed by the team without a miner or validator vote. Standard OP Stack upgrade proxy contracts govern on-chain bridge and dispute-resolution components; the MegaETH team holds the admin key. On-chain governance is planned for introduction up to 18 months post-launch (i.e., by approximately August 2027). No formal proposal process equivalent to EIPs exists at this stage.

No PQC-relevant governance activity has been identified.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
