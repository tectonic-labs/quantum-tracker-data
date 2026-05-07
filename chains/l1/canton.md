# Canton (CC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Canton |
| **Ticker** | CC |
| **Website** | <https://www.canton.network/> |
| **GitHub** | <https://github.com/digital-asset/canton> |
| **Twitter / X** | <https://x.com/CantonNetwork> |
| **On-chain environment** | Daml (extended UTXO; not EVM, not WASM) |
| **Mainnet genesis** | 2024-06-07 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Canton is an enterprise distributed ledger built on the Daml smart-contract language and operated by a federation of Super Validators ([45+ entities](https://www.canton.network/global-synchronizer) including Goldman Sachs, Broadridge, and JP Morgan) coordinated by the [Canton Foundation](https://canton.foundation/) and developed by [Digital Asset](https://github.com/digital-asset/canton). The Global Synchronizer mainnet went live on 2024-06-07. Canton's [supported cryptographic schemes](https://docs.digitalasset.com/operate/3.4/reference/crypto_schemes.html) are Ed25519 and ECDSA over NIST curves for signing, AES for symmetric encryption, and SHA-256 for hashing.

No public post-quantum proposal, working-group thread, or migration plan has been published by Digital Asset or the Canton Foundation. The chain's defining feature — sub-transaction privacy via [Merkle commitments and selective disclosure](https://www.canton.network/blog/how-canton-network-delivers-institutional-grade-privacy) — uses hash-based commitments and symmetric encryption that are themselves not directly threatened by quantum computers, but the authorization layer that decides who sees what is Ed25519-based.

## Proposed and Implemented PQC Algorithms

Canton does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Canton in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Canton in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Canton in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: ➖ ➖**

[Daml smart contracts](https://docs.daml.com/canton/usermanual/security.html) on Canton focus on business logic and authorization rules and do not expose any signature-verification or hashing primitives to contract code. Signature verification happens in the protocol layer rather than inside Daml. With no on-chain signature primitive to upgrade, this category does not apply.

## 5. Other Features

### Sub-transaction privacy (Merkle commitments and selective disclosure)

**Current state.** Canton's defining feature is [sub-transaction privacy](https://www.canton.network/blog/how-canton-network-delivers-institutional-grade-privacy): in a multi-party transaction, each party only sees the parts that apply to them. The privacy construction uses [Merkle-tree commitments](https://www.canton.io/publications/canton-whitepaper.pdf) (hash-based, SHA-256), AES-128-GCM for confidential payload encryption, and Ed25519 signatures to authorize who can see which sub-trees. The hash-and-symmetric-cipher core is not directly broken by a quantum computer in the sense of compromising payloads at rest. However, because access to confidential views is gated by Ed25519 signatures, a quantum attacker capable of forging those signatures could grant themselves visibility into historical confidential data — a retroactive deanonymization risk for the privacy guarantees the design was built to provide. No PQ alternative for the authorization layer is published.

**Planned future work.** None published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ➖, Other ❌.

We have found no public information indicating migration activity for Canton in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Protocol direction is set by [Digital Asset](https://github.com/digital-asset/canton) (the company that develops the Canton protocol and Daml). [Super Validators](https://www.canton.network/global-synchronizer) operate the Global Synchronizer and vote on governance changes via a 2/3 BFT majority; the [Canton Foundation](https://canton.foundation/) (Linux Foundation–backed) coordinates the Super Validator set. There is no formal EIP-equivalent proposal repository; protocol changes are driven by Digital Asset releases and Foundation-coordinated upgrades.

PQ-relevant work currently visible:

- No public post-quantum proposal, draft, working-group thread, or implementation effort has been identified in Digital Asset's repositories, Canton Foundation announcements, or Super Validator coordination channels.

No fork or governance vote relating to PQ migration has been scheduled.

---

_Generated on 06 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
