# Story (IP) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Story |
| **Ticker** | IP |
| **Website** | https://docs.story.foundation/ |
| **On-chain environment** | EVM (custom Geth fork) + Cosmos SDK modules |
| **Mainnet genesis** | 2025-02-13 |
| **Current mainnet version** | Horace (activated 2026-02-06) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Story is a sovereign L1 designed for intellectual property tokenization, licensing, and royalty enforcement. It launched mainnet ("Homer") on February 13, 2025, combining a Cosmos SDK / CometBFT consensus layer with a custom Geth-fork EVM execution layer. As of the latest research pass, Story Foundation has published no post-quantum cryptography roadmap and no EC retirement schedule across any of its cryptographic layers.

## Proposed and Implemented PQC Algorithms

Story does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Story in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Story in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Story in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Story in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### IP NFTs (ERC-721 + ERC-6551) and IBC

**Current state.** Story's programmable IP layer is built on ERC-721 NFTs extended by ERC-6551 token-bound accounts, which allow IP assets to act as autonomous entities that hold assets and execute royalty distributions. This is application-layer smart-contract logic without additional cryptographic primitives beyond the underlying ECDSA signatures. IBC interconnect uses standard CometBFT light-client proofs.

**Planned future work.** No post-quantum alternative has been proposed for the IP module layer or IBC integration.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Story's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Story in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Story uses the Cosmos SDK `x/gov` module for on-chain governance. Protocol upgrades are proposed via governance votes that set a target block height for a coordinated chain halt; validators must install the new binaries before that height. A Story Security Council (up to 11 members, multisig) handles emergency interventions outside the normal governance cycle, with the stated intent to transition toward full token-holder-elected governance.

No PQC-related proposals have been identified in Story governance as of the most recent research pass.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
