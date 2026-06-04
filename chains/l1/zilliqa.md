# Zilliqa (ZIL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Zilliqa |
| **Ticker** | ZIL |
| **Website** | <https://www.zilliqa.com/> |
| **GitHub** | <https://github.com/Zilliqa> |
| **On-chain environment** | EVM + Scilla (dual VM; ZQ2 Rust node) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Zilliqa is a sharded Layer 1 that has recently completed a major generational upgrade. The original Zilliqa 1.x used a hybrid approach: Proof of Work as a Sybil-resistance identity gate, with practical Byzantine Fault Tolerant (pBFT) consensus for block production. [Zilliqa 2.0](https://blog.zilliqa.com/evm-and-the-road-to-zilliqa-2-0-upgrading-network-efficiency/), now live on mainnet, replaces that design with a Pipelined Fast-HotStuff consensus under full Proof of Stake, while retaining network-level sharding. The new node software, ZQ2, is a [ground-up Rust rewrite](https://github.com/Zilliqa/zq2). Zilliqa 2.0 also adds EVM compatibility alongside the original Scilla smart-contract VM, with Cancun-level EVM active as of February 2026.

Both the native Scilla transaction path (Schnorr signatures over secp256k1) and the EVM-compatible path (secp256k1 ECDSA) are elliptic-curve based. No post-quantum migration work has been published by Zilliqa Research as of the date of this report.

## Proposed and Implemented PQC Algorithms

Zilliqa does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Zilliqa in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Zilliqa in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Zilliqa in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Zilliqa 2.0 exposes two smart-contract environments:

**Scilla** — Zilliqa's original functional smart-contract language, designed for safety and formal verification. Scilla provides standard hash and signature verification primitives (secp256k1 Schnorr); no post-quantum verification primitive is available.

**EVM** — the standard Ethereum Virtual Machine, operating at Cancun level as of February 2026. The EVM precompile set includes `ecrecover` (secp256k1 ECDSA recovery) and the BN254 pairing precompiles (`ecAdd`, `ecMul`, `ecPairing`). No post-quantum verification precompile has been added.

**Current state.** Neither VM exposes a post-quantum signature verification primitive. Smart contracts cannot verify post-quantum signatures natively on either execution path.

**Planned future work.** None published.

## 5. Other Features

### Network Sharding

**Current state.** Zilliqa was an early pioneer of [network-level sharding](https://blog.zilliqa.com/the-zilliqa-design-story-piece-by-piece-part-2-consensus-protocol-e38f6bf566e3/). In Zilliqa 2.0, sharding is retained with support for customisable shards, where each shard can be tuned for finality speed and security parameters. The sharding protocol itself relies on the base-layer consensus and signature schemes — validator shard assignments and cross-shard coordination are authenticated with the same EC-based keys used throughout the protocol.

**Planned future work.** No post-quantum adaptation for the sharding layer has been published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Zilliqa's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Zilliqa in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Zilliqa protocol upgrades are deployed as coordinated hard forks activated at a specific block number, announced in advance by Zilliqa Research. Validators must upgrade their ZQ2 binary before the activation block. The process is coordinated through official announcements on social channels and the [Zilliqa developer portal](https://roadmap.zilliqa.com/). There is no on-chain governance token vote or automatic forkless upgrade path.

No PQC-relevant governance proposals have been identified in the public record.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
