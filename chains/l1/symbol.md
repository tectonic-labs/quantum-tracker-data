# Symbol (XYM) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Symbol |
| **Ticker** | XYM |
| **Website** | https://symbol-community.com/ |
| **On-chain environment** | Native Symbol asset model (no general smart-contract VM) |
| **Mainnet genesis** | 2021-03-17 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Symbol (formerly NEM2) is a PoS+ blockchain launched in March 2021, built around native asset issuance, namespaces, and multi-layer on-chain multi-signature. All transaction signing and block-signing keys use an Ed25519 variant with SHA3-512 hashing over Curve25519. Symbol does not provide a general smart-contract VM; its aggregate-transaction scripting has no signature-verification primitive available to application code. As of the most recent research pass, NEM Group / Symbol Foundation has published no post-quantum cryptography roadmap.

## Proposed and Implemented PQC Algorithms

Symbol does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Symbol in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Symbol in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Symbol in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: ➖**

Symbol does not support any general smart-contract VM. The aggregate-transaction system allows atomic multi-step transactions but does not expose a signature-verification API to application code. This category is not applicable.

## 5. Other Features

**Grade: ➖**

Symbol does not support any special features with independent quantum exposure (no zk-SNARKs, no ring signatures, no privacy tech, no randomness beacon using EC pairings). Mosaics, namespaces, and multi-layer multi-sig are application-layer accounting primitives that rely on the base-layer Ed25519 signatures already covered under Transaction Signatures.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Symbol's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ➖, Other ➖.

We have found no public information indicating migration activity for Symbol in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Symbol protocol changes are coordinated via social consensus through the NEM Group / Symbol Foundation using community channels, the [Symbol Community](https://symbol-community.com/) site, and NEM social media. There is no on-chain governance voting module; hard forks require a supermajority of nodes to upgrade before a scheduled activation block.

No PQC-related proposals have been identified in Symbol governance as of the most recent research pass.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
