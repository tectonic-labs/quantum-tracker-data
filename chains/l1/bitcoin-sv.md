# Bitcoin SV (BSV) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Bitcoin SV |
| **Ticker** | BSV |
| **Website** | <https://bitcoinsv.io> |
| **GitHub** | <https://github.com/bitcoin-sv> |
| **Twitter / X** | <https://x.com/_BitcoinSV> |
| **Derived from** | Bitcoin Cash (2018 fork) |
| **On-chain environment** | Bitcoin Script (BSV-extended) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | ➖ | ➖ | Not Applicable |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Bitcoin SV is a "Satoshi Vision" fork of Bitcoin Cash that explicitly rejected the SegWit and Taproot direction taken by Bitcoin Core, prioritizing fidelity to the original Bitcoin protocol with larger blocks (4 GB+) and a restored set of original opcodes. As a result the chain's cryptographic surface is the legacy Bitcoin surface: secp256k1 ECDSA for all transaction signatures, no Schnorr, no Taproot, and no [BIP-324](https://bips.dev/324/) v2 transport.

We have not identified any published BSV-specific post-quantum migration proposal. There is no BSV equivalent of Bitcoin Core's [BIP-360 / BIP-361](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin) process, no draft against the BSV node software, and no governance vote scheduled. nChain (which oversees BSV development alongside the BSV Association) has published quantum-related patents and research, but no concrete adoption path for BSV mainnet has been articulated.

## Proposed and Implemented PQC Algorithms

Bitcoin SV does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Bitcoin SV in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

Not rated — hash-based proof-of-work is quantum-resistant since genesis. This tracker covers PQC migrations.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Bitcoin SV in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Bitcoin SV in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

Bitcoin SV does not support any special features.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Bitcoin SV's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ➖, P2P ❌, On-Chain ❌, Other ➖.

We have found no public information indicating migration activity for Bitcoin SV in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Bitcoin SV protocol changes are coordinated by [nChain](https://bitcoinsv.io/) and the [BSV Association](https://www.bsvblockchain.org/), with development hosted in the [Bitcoin SV GitHub organization](https://github.com/bitcoin-sv). Community discussion takes place on the [BSV Skills Center / community resources](https://docs.bsvblockchain.org/resources/community).

We have not identified a BSV-specific post-quantum proposal currently in flight in any of these venues. Third-party surveys of post-quantum proposals for the broader Bitcoin family are tracked by [Project Eleven](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin), and a general overview of PQ options for elliptic-curve cryptocurrencies appears in [arXiv:2603.28846](https://arxiv.org/pdf/2603.28846); neither describes a BSV-specific implementation path.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
