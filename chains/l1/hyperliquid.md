# Hyperliquid (HYPE) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Hyperliquid |
| **Ticker** | HYPE |
| **Website** | <https://hyperliquid.xyz> |
| **GitHub** | <https://github.com/hyperliquid-dex> |
| **On-chain environment** | EVM (HyperEVM) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Hyperliquid's core team has not published a base-layer post-quantum migration plan. HyperBFT consensus signing, HyperEVM precompiles, and the chain's gossip-based P2P layer all rely on ECDSA secp256k1 (with Ed25519 available in some SDK paths). The chain's PQ-adjacent activity is concentrated in a third-party project: [01 Quantum's qONE protocol](https://01quantum.com), launched on HyperEVM in February 2026. qONE is a smart-contract overlay using IronCAP — a proprietary NIST-aligned post-quantum signature and encryption family — wrapped in Quantum Crypto Wrapper (QCW) and Quantum DeFi Wrapper (QDW) contracts. Phase 1 (token economic framework) launched on 2026-02-11; Phase 2 (cryptographic integration) targets late March 2026 per [The Quantum Insider](https://thequantuminsider.com/2026/02/03/01-quantum-quantum-resistant-blockchain-migration-toolkit/), with a Phase 3 roadmap combining IronCAP with zero-knowledge proofs.

The qONE work is application-layer rather than base-layer: it does not modify HyperBFT, HyperEVM precompiles, or P2P transport. Hyperliquid's published roadmap focuses on throughput and DEX functionality and does not name PQ as a base-layer priority.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **IronCAP** (proprietary NIST-aligned PQ scheme) | ECDSA secp256k1, Ed25519 | Other (qONE smart-contract overlay) | Discussed (Phase 1 token live; Phase 2 integration not yet shipped) |

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Hyperliquid in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Hyperliquid in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Hyperliquid in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Hyperliquid in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### qONE Quantum-Resistant Layer (smart-contract overlay)

**Current state.** [qONE](https://www.newsfilecorp.com/release/271519/01-Quantum-and-qLABS-Provide-Further-Details-of-the-qLABS-Token---The-Foundation-of-Quantum-Safe-Web3-Infrastructure-on-Hyperliquid) launched on HyperEVM on 2026-02-11 with Phase 1 (token economic framework) live. The roadmap describes Phase 2 as integrating **IronCAP** post-quantum signatures and encryption inside Quantum Crypto Wrapper (QCW) and Quantum DeFi Wrapper (QDW) smart contracts for wallet, asset, and protocol transaction authorization, and Phase 3 as combining IronCAP with zero-knowledge proofs. The integration runs as a smart-contract overlay; it does not modify HyperBFT consensus signing, HyperEVM precompiles, or P2P transport.

**Planned future work.** Phase 2 ("end of March 2026" per published material) introduces a Layer 1 Migration Toolkit that targets multiple chains beyond Hyperliquid; activation on Hyperliquid would be voluntary at the wallet / contract level. Phase 3 timing is not pinned. The post-quantum scheme is the proprietary IronCAP family rather than a NIST-finalized algorithm such as **ML-DSA**, **SLH-DSA**, or **Falcon**.

### Oracle system, HyperEVM DEX precompiles, and perpetuals

**Current state.** Hyperliquid validators publish [weighted-median spot prices](https://hyperliquid.gitbook.io/hyperliquid-docs/hypercore/oracle) every three seconds, used for funding, mark price, margining, liquidations, and TP/SL triggers. Oracle data authenticity rides on HyperBFT block signatures (ECDSA secp256k1). [Custom HyperEVM precompiles](https://medium.com/@ambitlabs/demystifying-the-hyperliquid-precompiles-and-corewriter-ef4507eb17ef) expose HyperCore trading primitives (oracle prices, vault asset values, position queries, order-book depth) to smart contracts; data integrity again derives from consensus block signatures. Cross-margin perpetuals account management uses ECDSA via EIP-712 structured signing.

**Planned future work.** No DEX-specific or oracle-specific PQ proposal is currently published. These features inherit whatever signature scheme HyperBFT uses; a base-layer migration would propagate, but no base-layer migration is on Hyperliquid's roadmap.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Hyperliquid's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ⚠️.

We have found no public information indicating migration activity for Hyperliquid in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Hyperliquid governance is centralized around the Hyperliquid Foundation / core development team, with validator-level coordination among the 21+ permissionless mainnet nodes. There is no formal Improvement Proposal process equivalent to EIPs / BIPs / SIMDs at the time of writing; protocol changes are driven by core team releases.

PQ-relevant work currently visible:

- qONE (01 Quantum / qLABS) — quantum-resistant smart-contract overlay on HyperEVM. Phase 1 token launched 2026-02-11. Phase 2 (IronCAP integration into QCW / QDW contracts) targets end of March 2026 per [01 Quantum's published roadmap](https://01quantum.com); Phase 3 (IronCAP + ZK) timing not pinned.
- Base-layer PQC for HyperBFT consensus, HyperEVM precompiles, or P2P — no proposal identified.

No fork or governance vote relating to base-layer PQ migration has been scheduled.

---

_Generated on 5 May 2026 based on information as of 30 Apr 2026._

_Corrections and additions: contact channel pending launch._

_Editorial policy: none currently published._
