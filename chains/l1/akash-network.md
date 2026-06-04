# Akash Network (AKT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Akash Network |
| **Ticker** | AKT |
| **Website** | [akash.network](https://akash.network/) |
| **GitHub** | [akash-network](https://github.com/akash-network/node) |
| **On-chain environment** | App-specific (decentralized compute marketplace; no general smart-contract VM) |
| **Derived from** | Cosmos SDK / CometBFT |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Summary

Akash Network is a decentralized cloud-compute marketplace built as an application-specific Cosmos SDK chain. The chain orchestrates provider bids, deployment orders, and AKT payment settlement; actual compute workloads run off-chain on provider hardware. Its cryptographic surface is the standard Cosmos SDK / CometBFT stack — secp256k1 ECDSA for user transactions and Ed25519 for validator block-signing — and no post-quantum cryptography work has been announced by Akash Network or Overclock Labs as of May 2026.

Because Akash is an application-specific chain with no general-purpose smart-contract VM, the On-Chain Logic category does not apply: there are no protocol-provided PQC verification primitives to evaluate, and no precompile or host-function surface.

## Proposed and Implemented PQC Algorithms

> Akash Network does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Akash Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Akash Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Akash Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: ➖ Not Applicable**

Akash is an application-specific chain whose on-chain modules implement a deployment marketplace (Deployment, Order, Bid, Lease) rather than a general-purpose VM. No protocol-provided cryptographic precompile or host function exists for the rubric to evaluate. While the chain has CosmWasm modules (introduced in Mainnet 17 / v2.0.0), these are marketplace-focused and do not expose PQC signature-verification primitives.

## Other Features

**Grade: F ❌**

**Current state**: Akash's notable protocol features include IBC interconnects for cross-chain settlement and the [AEP-79 shared security](https://akash.network/roadmap/aep-79/) exploration. IBC light-client proofs use partner-chain CometBFT signatures (typically Ed25519 or BLS aggregates), inheriting any EC exposure from counterparties. The AEP-79 shared-security model, if implemented, would import partner-chain validator signatures without changing Akash's own posture. Provider attestations (uptime claims, hardware specs) are signed off-chain with provider-side keys, outside the chain protocol's quantum surface, but relevant for marketplace integrity.

**Planned future work**: No PQC migration for any of these features has been announced.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ➖, Other ❌.

**Current state**: No PQC migration plan or EC retirement schedule has been published by Akash Network or Overclock Labs as of May 2026.

**Planned future work**: None identified.

## Governance

Akash Network uses [Cosmos SDK on-chain governance](https://github.com/akash-network/node/releases). AKT stakers vote on AEPs (Akash Enhancement Proposals) that have first been reviewed by the community; approved proposals activate at a specified block height, with a quorum-plus-supermajority requirement. CosmWasm module upgrades can proceed through governance without a full binary release. No PQC-relevant proposals have appeared in the governance record. The [Akash blog](https://akash.network/blog/) carries upgrade announcements, and the network configuration is tracked at [akash-network/net](https://github.com/akash-network/net).

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
