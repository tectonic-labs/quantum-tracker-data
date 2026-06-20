# Zilliqa (ZIL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Zilliqa |
| **Ticker** | ZIL |
| **Website** | [zilliqa.com](https://www.zilliqa.com/) |
| **GitHub** | [Zilliqa](https://github.com/Zilliqa) |
| **Twitter / X** | [@zilliqa](https://x.com/zilliqa) |
| **On-chain environment** | EVM + Scilla (dual VM) |
| **Current mainnet version** | ZQ2 / Zilliqa 2.0 (May 2026 hard fork) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Zilliqa is a sharded Layer 1 blockchain that pioneered network-level sharding at launch in 2019. The Zilliqa 2.0 upgrade (live since mid-2025) transitioned the network to full Proof-of-Stake with Pipelined Fast-HotStuff consensus and added EVM compatibility alongside the original Scilla smart contract VM. A [community governance proposal](https://gov.zilliqa.com/t/introduction-of-post-quantum-digital-signatures-via-pluggable-cryptography/1989) submitted in November 2025 proposes pluggable post-quantum cryptography with **ML-DSA** (Dilithium) as the primary signature scheme and **FN-DSA** (Falcon) as a secondary option, along with a hybrid transition mode. The proposal also discusses PQC verification opcodes for both the Scilla and EVM execution environments.

The proposal has not been accepted or committed to by Zilliqa Research. It represents community-level discussion rather than a formal roadmap commitment. Consensus, P2P networking, and sharding are not addressed in the proposal.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** | Schnorr secp256k1, ECDSA secp256k1 | Tx Signatures, On-Chain | Discussed |
| **FN-DSA** | Schnorr secp256k1, ECDSA secp256k1 | Tx Signatures, On-Chain | Discussed |

## Transaction Signatures

**Grade: D ⚠️**

Zilliqa supports two transaction signing schemes: Schnorr signatures over secp256k1 for native Zilliqa accounts (legacy from 1.x) and secp256k1 ECDSA for EVM-compatible accounts introduced in Zilliqa 2.0. Both are elliptic-curve-based and quantum-vulnerable.

**Current state.** No post-quantum signature scheme is available on mainnet or testnet. All transaction authorization relies on classical elliptic-curve signatures.

**Planned future work.** A [governance proposal](https://gov.zilliqa.com/t/introduction-of-post-quantum-digital-signatures-via-pluggable-cryptography/1989) (November 2025) proposes pluggable cryptography to support **ML-DSA** (Dilithium) as the primary quantum-resistant scheme and **FN-DSA** (Falcon) as a secondary option. The proposal describes a phased rollout: a hybrid mode (classic EC-Schnorr + post-quantum signature) would be introduced first, followed by an optional pure post-quantum mode. Existing secp256k1 keys would remain valid indefinitely with no forced migration. The upgrade would be activated as a soft fork. One community response notes that the ZilPay wallet "already can support post quantum cryptography." The proposal has not been accepted by Zilliqa Research.

## Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Zilliqa in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Zilliqa in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: D ⚠️**

Zilliqa runs a dual VM environment: the original [Scilla](https://blog.zilliqa.com/the-zilliqa-design-story-piece-by-piece-part-2-consensus-protocol-e38f6bf566e3/) VM (a functional, formally-verifiable smart contract language) and a standard EVM (Cancun-level as of February 2026). Both expose signature verification primitives using classical EC cryptography; neither currently supports PQC verification.

**Current state.** Scilla exposes standard hash and signature verification primitives. The EVM provides the standard precompile set (`ecrecover`, BN254). No PQC verification primitive exists in either VM.

**Planned future work.** The [governance proposal](https://gov.zilliqa.com/t/introduction-of-post-quantum-digital-signatures-via-pluggable-cryptography/1989) mentions new PQC signature verification opcodes for both the Scilla and EVM execution environments. This has not been implemented and has not been committed to by Zilliqa Research.

## Other Features

**Grade: F ❌**

### Network Sharding

**Current state.** Zilliqa pioneered network-level sharding, with multiple parallel shards reaching consensus independently. Zilliqa 2.0 adds customizable shards (x-Shards) where each shard can be tuned for finality speed and security parameters. Sharding does not introduce additional quantum-vulnerable cryptographic primitives beyond those already covered in the consensus and signature categories.

**Planned future work.** The PQC governance proposal does not address sharding-specific concerns.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ❌, P2P ❌, On-Chain ⚠️, Other ❌.

The governance proposal explicitly states that existing EC keys would "remain valid indefinitely" and describes pure EC deprecation as "years away." No EC removal schedule, deprecation timeline, or fork milestone has been published by Zilliqa Research.

## Governance

Zilliqa protocol upgrades are deployed as coordinated hard forks activated at specific block numbers announced by Zilliqa Research. There is no on-chain governance vote mechanism; the [Zilliqa Governance Forum](https://gov.zilliqa.com/) serves as the primary venue for community proposals.

- A [proposal for post-quantum digital signatures via pluggable cryptography](https://gov.zilliqa.com/t/introduction-of-post-quantum-digital-signatures-via-pluggable-cryptography/1989) was posted on November 20, 2025 by community member "jactheman." The proposal has received 4 likes and 1 community response as of this report. No formal acceptance or rejection by Zilliqa Research has been recorded.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
