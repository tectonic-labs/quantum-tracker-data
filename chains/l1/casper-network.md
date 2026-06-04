# Casper Network (CSPR) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Casper Network |
| **Ticker** | CSPR |
| **Website** | <https://www.casper.network/> |
| **GitHub** | <https://github.com/casper-network> |
| **On-chain environment** | WASM (Casper VM 2.0) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Casper Network is a Proof-of-Stake L1 originally built around the CBC-Casper correctness-by-construction consensus research lineage. It launched with the Highway consensus protocol and migrated to [Zug consensus](https://www.casper.network/news/zug-consensus) in [Casper 2.0](https://www.casper.network/unboxing-casper-2-0-casper-network), a deterministic BFT protocol with instant finality. Casper 2.0 also introduced a multi-VM architecture, with the production VM being a WASM-based execution engine.

No post-quantum migration plans have been identified from the Casper Association or its development grantee. Transaction signing, consensus block signing, P2P transport, and on-chain signature verification are all elliptic-curve based. The chain does not implement KZG blobs, ring signatures, ZK-SNARK circuits, or other chain-specific cryptographic features beyond the core signature and consensus stack.

## Proposed and Implemented PQC Algorithms

Casper Network does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Casper Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Casper Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Casper Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Casper Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

Casper Network does not support any special features.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Casper Network's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

We have found no public information indicating migration activity for Casper Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Casper Network protocol changes flow through the [Casper Validator Voting (CVV) process](https://www.casper.network/news/zug-consensus), with proposals coordinated by the Casper Association and its protocol development grantee. Once a CVV vote passes, the Association publishes a new `casper-node` release with an updated chainspec; validators must upgrade before the activation era boundary. The governance process is described in the [Casper documentation](https://docs.casper.network/next/concepts/about).

No post-quantum-related proposals, CVV votes, or community discussions have been identified in any of these venues.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
