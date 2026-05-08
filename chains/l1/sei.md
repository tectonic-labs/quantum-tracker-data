# Sei (SEI) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Sei |
| **Ticker** | SEI |
| **Website** | https://www.sei.io/ |
| **GitHub** | https://github.com/sei-protocol |
| **Twitter / X** | https://x.com/SeiNetwork |
| **On-chain environment** | EVM (parallelized) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Sei is a [Cosmos SDK-based](https://docs.sei.io/) L1 running [CometBFT](https://github.com/cometbft/cometbft) consensus with a parallelized EVM execution layer (Sei v2). All cryptographic components — ECDSA secp256k1 for EVM transactions, secp256k1 for Cosmos SDK transactions, Ed25519 for CometBFT validator signing, and Ed25519 for libp2p node identity — are elliptic-curve based. No PQC community activity, proposals, or research has been identified. Sei's development focus is on parallelization and DeFi performance, not cryptographic migration.

Sei does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Sei in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

Sei uses [CometBFT](https://github.com/cometbft/cometbft) (formerly Tendermint) for Byzantine Fault Tolerant consensus. Validator signing uses Ed25519. Blocks reach instant finality when more than two-thirds of validators sign precommits. Ed25519 is an elliptic-curve scheme vulnerable to Shor's algorithm. No post-quantum alternative has been proposed.

**Current state.** All validator block signing uses Ed25519. Consensus randomness is deterministic (no RANDAO).

**Planned future work.** None documented. No PQC migration roadmap exists for CometBFT consensus on Sei.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Sei in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Sei v2 introduces parallelized EVM execution with standard Ethereum precompiles (ecrecover, BN254 operations). Parallel execution does not change the cryptographic attack surface. No post-quantum verification primitives are available on-chain.

**Current state.** Standard EVM EC precompiles only.

**Planned future work.** None documented.

## 5. Other Features

Sei does not support any special features. Sei diverged before EIP-4844 and has no KZG blob commitments, privacy tech, or other EC-dependent special features.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

No public roadmap exists for EC retirement on Sei. EC cryptography (secp256k1 for transactions, Ed25519 for consensus and P2P) is embedded in every protocol layer.

**Current state.** No EC deprecation plan exists.

**Planned future work.** None documented.

## Governance

Sei governance uses Cosmos SDK on-chain voting. No PQC-related proposals have been filed. No formal community discourse on PQC migration has been documented.

---

_Generated on 07 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
