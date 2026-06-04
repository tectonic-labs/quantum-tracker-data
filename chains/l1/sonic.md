# Sonic (S) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Sonic |
| **Ticker** | S |
| **Website** | https://soniclabs.com |
| **GitHub** | https://github.com/Fantom-foundation/Sonic |
| **Derived from** | Fantom (consensus + tooling); Ethereum (EVM execution) |
| **On-chain environment** | FVM (Fantom Virtual Machine — optimized EVM) |
| **Mainnet genesis** | 2025-01-07 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Sonic is the rebranded continuation of Fantom. Sonic Labs launched the new mainnet on January 7, 2025, with a full FTM-to-S token migration completed by May 10, 2025. The chain uses the Lachesis asynchronous Byzantine fault tolerant (aBFT) DAG consensus protocol with approximately 720 ms time-to-finality, running EVM-compatible execution via the FVM (Fantom Virtual Machine, which uses instruction fusion for lower gas and higher throughput), and Carmen DB for efficient state storage. Theoretical throughput is approximately 10,000 ERC-20 transactions per second.

No post-quantum cryptography roadmap, proposal, or public research has been identified for Sonic across any category. Sonic Labs's public development focus is on throughput optimization and DeFi infrastructure.

## Proposed and Implemented PQC Algorithms

> Sonic does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Sonic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Sonic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Sonic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

> We have found no public information indicating migration activity for Sonic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

### Cross-chain bridge to Ethereum

**Current state.** Sonic operates an EC-based bridge for asset movement between Sonic and Ethereum. The bridge relies on elliptic-curve validator signatures.

**Planned future work.** No post-quantum alternative has been proposed for the bridge.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for Sonic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Sonic Labs coordinates protocol upgrades directly through validator outreach and scheduled binary updates. No formal on-chain governance or numbered improvement proposal process has been published as of the information date; on-chain governance improvements were flagged for the 2026 roadmap. Upgrades activate at epoch boundaries via coordinated binary upgrade.

No PQC proposals or governance discussions targeting Sonic have been identified.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
