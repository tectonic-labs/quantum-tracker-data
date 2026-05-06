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
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | F | ❌ | Not Discussed |
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

**Grade: D ⚠️**

[HyperEVM](https://hyperliquid.gitbook.io/hyperliquid-docs/hyperevm) (launched February 2025) is EVM-compatible and exposes the standard Ethereum precompile set: ecrecover (secp256k1), ecAdd / ecMul / ecPairing (BN254), and BLS12-381 ops where inherited. Hash precompiles cover SHA-256 and Keccak-256. Custom [HyperCore precompiles](https://medium.com/@ambitlabs/demystifying-the-hyperliquid-precompiles-and-corewriter-ef4507eb17ef) expose trading primitives (oracle prices at 0x0800+, vault asset values, position queries, order-book depth) — these are data primitives authenticated by HyperBFT consensus rather than new cryptographic schemes. No PQC verification precompile is shipped, on testnet, or proposed for HyperEVM itself.

PQC availability on-chain comes through [qONE](https://www.newsfilecorp.com/release/271519/01-Quantum-and-qLABS-Provide-Further-Details-of-the-qLABS-Token---The-Foundation-of-Quantum-Safe-Web3-Infrastructure-on-Hyperliquid), 01 Quantum's smart-contract overlay deployed on HyperEVM. qONE is a smart-contract construct rather than a HyperEVM precompile or HyperBFT change. Phase 1 (token economic framework) launched 2026-02-11. Phase 2 — integrating **IronCAP**, a proprietary NIST-aligned post-quantum signature and encryption family, into Quantum Crypto Wrapper (QCW) and Quantum DeFi Wrapper (QDW) contracts for wallet, asset, and protocol authorization — targets late March 2026 per [The Quantum Insider](https://thequantuminsider.com/2026/02/03/01-quantum-quantum-resistant-blockchain-migration-toolkit/). Phase 3 combines IronCAP with zero-knowledge proofs.

**Current state.** Standard EVM precompiles (all EC-based) plus HyperCore-specific data primitives. qONE Phase 1 (token only) is live on HyperEVM; no IronCAP code is deployed yet.

**Planned future work.** qONE Phase 2 (IronCAP integration into QCW / QDW smart contracts) targets end of March 2026. Activation would be voluntary at the wallet / contract level rather than a HyperEVM precompile or HyperBFT change. No PQC precompile or syscall has been proposed for HyperEVM itself. The post-quantum scheme used is the proprietary IronCAP family rather than a NIST-finalized algorithm such as **ML-DSA**, **SLH-DSA**, or **Falcon**.

## 5. Other Features

### Oracle System

**Current state.** Validators publish [weighted-median spot prices](https://hyperliquid.gitbook.io/hyperliquid-docs/hypercore/oracle) every three seconds, used for funding rates, mark price, margining, liquidations, and TP/SL triggers. Oracle-data authenticity rides on HyperBFT block signatures (ECDSA secp256k1) rather than oracle-specific cryptography.

**Planned future work.** No oracle-specific PQ proposal is currently published. Oracle security tracks the consensus-layer signature scheme.

### Cross-Margin Perpetuals

**Current state.** Account management and order signing use ECDSA secp256k1 via EIP-712 structured data signing. The perpetuals layer adds no cryptography beyond the chain-level signature scheme.

**Planned future work.** No perpetuals-specific PQ proposal is currently published. Security tracks the transaction-layer signature scheme.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Hyperliquid's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ⚠️, Other ❌.

We have found no public information indicating migration activity for Hyperliquid in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Hyperliquid governance is centralized around the Hyperliquid Foundation / core development team, with validator-level coordination among the 21+ permissionless mainnet nodes. There is no formal Improvement Proposal process equivalent to EIPs / BIPs / SIMDs at the time of writing; protocol changes are driven by core team releases.

PQ-relevant work currently visible:

- qONE (01 Quantum / qLABS) — quantum-resistant smart-contract overlay on HyperEVM. Phase 1 token launched 2026-02-11. Phase 2 (IronCAP integration into QCW / QDW contracts) targets end of March 2026 per [01 Quantum's published roadmap](https://01quantum.com); Phase 3 (IronCAP + ZK) timing not pinned.
- Base-layer PQC for HyperBFT consensus, HyperEVM precompiles, or P2P — no proposal identified.

No fork or governance vote relating to base-layer PQ migration has been scheduled.

---

_Generated on 5 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
