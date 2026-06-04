# Theta Network (THETA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Theta Network |
| **Ticker** | THETA |
| **Website** | https://www.thetatoken.org/ |
| **GitHub** | https://github.com/thetatoken/theta-protocol-ledger |
| **On-chain environment** | EVM (Theta EVM, mirrors Ethereum) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Theta Network is a dual-architecture blockchain platform combining a PoS L1 with an Edge Network for distributed video delivery and AI compute. Its multi-level BFT consensus uses a small committee of 20–30 Enterprise Validators (including Google, Sony, Samsung, and Deutsche Telekom) alongside thousands of Guardian Nodes that finalize blocks via an Aggregated Signature Gossip Scheme. THETA is the staking and governance token; TFUEL is the operational gas token. As of the most recent research pass, Theta Labs has published no post-quantum cryptography roadmap.

## Proposed and Implemented PQC Algorithms

Theta Network does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Theta Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Theta Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Theta Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Theta Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### Resource-Oriented Micropayment Pool

**Current state.** Theta's [Resource-Oriented Micropayment Pool](https://docs.thetatoken.org/docs/what-is-theta-network) is an off-chain double-spend-resistant payment mechanism purpose-built for video streaming. Viewers stream pre-signed micropayment receipts to relay nodes, which relay bandwidth in exchange. The payment pool uses standard EC transaction signatures for the pre-signed receipts.

**Planned future work.** No post-quantum migration plan for the micropayment pool has been published.

### EdgeCloud (Distributed AI/Video Compute)

**Current state.** Theta EdgeCloud, launched May 1, 2024, provides hybrid cloud-edge distributed compute and video delivery. Provider attestations proving task completion are EC-signed using standard ECDSA. A quantum break of the underlying EC scheme would allow forged attestations.

**Planned future work.** No post-quantum migration plan for EdgeCloud attestations has been published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Theta Network's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Theta Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Theta Network protocol upgrades are determined by Theta Labs and deployed as hard forks at pre-announced block heights. Enterprise Validators (Google, Sony, Samsung, Deutsche Telekom, and others) and Guardian Node operators must update their software before the cutover block. There is no on-chain governance vote; Theta Labs communicates upgrade schedules directly to Enterprise Validators.

No PQC-related proposals have been identified as of the most recent research pass.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
