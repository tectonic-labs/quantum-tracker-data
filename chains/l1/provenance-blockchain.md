# Provenance Blockchain (HASH) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Provenance Blockchain |
| **Ticker** | HASH |
| **Website** | https://provenance.io/ |
| **GitHub** | https://github.com/provenance-io/provenance |
| **On-chain environment** | CosmWasm (Rust smart contracts) + native Provenance financial-services modules |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Provenance Blockchain is a public, permissionless, proof-of-stake Layer 1 built specifically for financial-services use cases. Built on Cosmos SDK and CometBFT, it adds a set of native modules for financial-asset primitives: Marker (tokenized asset issuance), Metadata (structured asset metadata and scopes), Name (naming service), and Attribute (account attribute tagging). These modules are application logic with no new cryptographic primitives. Figure Technologies Solutions originates loans and other financial instruments through Provenance. The chain runs secp256k1 ECDSA for user transactions (the Cosmos SDK default) and Ed25519 for CometBFT validator block-signing keys.

Provenance's PQC posture is the standard Cosmos SDK posture. No post-quantum migration plan or roadmap has been published by the Provenance Blockchain Foundation as of May 2026.

## Proposed and Implemented PQC Algorithms

> Provenance Blockchain does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Provenance Blockchain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Provenance Blockchain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Provenance Blockchain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

> We have found no public information indicating migration activity for Provenance Blockchain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

### IBC (Inter-Blockchain Communication)

**Current state.** Provenance Blockchain maintains IBC connections to other chains. IBC packet security relies on CometBFT light-client proofs authenticated by Ed25519 validator signatures on counterparty chains. A quantum break of Ed25519 would allow forged light-client proofs. Provenance runs IBC v10 as of v1.28.0.

**Planned future work.** No PQC-aware IBC implementation has been announced by the Provenance Blockchain Foundation or the ibc-go maintainers as of May 2026.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for Provenance Blockchain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Provenance Blockchain uses the Cosmos SDK on-chain governance module. HASH token holders submit and vote on upgrade proposals; if a proposal passes, the chain halts at the specified block height, applies the migration handler, and resumes — with Cosmovisor automating the binary swap on validators. Smart contract deployments became permissionless as of v1.28.0. No PQC-relevant governance proposals have been identified in the [Provenance GitHub repository](https://github.com/provenance-io/provenance) or on-chain governance as of May 2026.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
