# Sei (SEI) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Sei |
| **Ticker** | SEI |
| **Website** | https://www.sei.io |
| **GitHub** | https://github.com/sei-protocol |
| **On-chain environment** | Parallelized EVM (Sei v2) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Sei is a parallelized EVM chain built on a Cosmos SDK foundation with CometBFT (Tendermint fork) consensus. The Sei v2 release introduced native EVM execution with parallelized transaction processing, delivering significantly higher throughput than standard EVM chains. Under [SIP-3](https://docs.sei.io/), Sei is transitioning to an EVM-only architecture, removing CosmWasm and native Cosmos transaction handling through staged releases in 2026. The current mainnet version is v6.4, with the Giga upgrade (Autobahn consensus + async execution targeting over 200,000 TPS) in development.

No post-quantum cryptography roadmap, proposal, or public research has been identified for Sei across any category. Sei's development focus is on performance scaling and DeFi infrastructure, not cryptographic migration.

## Proposed and Implemented PQC Algorithms

> Sei does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Sei in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Sei in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Sei in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

> We have found no public information indicating migration activity for Sei in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

Sei does not support any special features in scope for this analysis. The chain has no KZG blobs, randomness beacons, privacy technology, or cross-chain proof systems beyond standard EVM precompiles. Sei's parallelized EVM execution is a performance optimization that does not change the cryptographic attack surface relative to a standard EVM.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

> We have found no public information indicating migration activity for Sei in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Sei protocol changes are governed by Sei Improvement Proposals (SIPs). A proposal passes with more than 50% yes votes of staked SEI (with a 33.4% quorum). Upgrades are activated via Cosmos SDK upgrade handlers at a scheduled block height.

No PQC-relevant SIPs or governance discussions have been identified as of the information date.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
