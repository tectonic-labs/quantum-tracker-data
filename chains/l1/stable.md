# Stable (STABLE) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Stable (StableChain) |
| **Ticker** | STABLE |
| **Website** | https://stable.io |
| **On-chain environment** | EVM-compatible |
| **Mainnet genesis** | 2025-12-08 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Stable (also called StableChain) is a USDT-native EVM Layer 1 backed by Bitfinex and Tether. Mainnet launched on December 8, 2025; a pre-deposit campaign drew approximately $2 billion from over 24,000 wallets. The chain's distinguishing feature is that USDT is the native gas token, and basic USDT transfers are free at the protocol level via a paymaster-like fee subsidy. The consensus mechanism is StableBFT, a customized DPoS protocol with sub-second deterministic finality and one-third Byzantine fault tolerance. A DAG-based consensus upgrade and the StableVM++ (C++ EVM) are on the future roadmap, though no PQC commitment is associated with either.

No post-quantum cryptography roadmap, proposal, or public research has been identified for Stable across any category.

## Proposed and Implemented PQC Algorithms

> Stable does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Stable in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Stable in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Stable in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

> We have found no public information indicating migration activity for Stable in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

### Free USDT transfers and institutional blockspace

**Current state.** The protocol-level fee subsidy for USDT transfers and the planned institutional dedicated blockspace are application-layer and throughput features, respectively. Neither introduces cryptographic primitives beyond the standard EVM precompile set. The StablePay consumer wallet (planned 2026) is an application-layer product.

**Planned future work.** No PQC-specific work has been identified for any of these features.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for Stable in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Protocol upgrades are governed by STABLE token holder voting via the Stable Foundation governance process. On-chain governance is described as partially live as of the information date, with full tokenholder participation described as forthcoming; voting thresholds and quorum requirements have not been publicly specified in detail.

No PQC governance proposals have been identified.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
