# Plasma (XPL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Plasma |
| **Ticker** | XPL |
| **Website** | https://www.plasma.to/ |
| **On-chain environment** | EVM (full EVM compatibility via Reth-based execution layer) |
| **Mainnet genesis** | 2025-09-25 (mainnet beta) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

[Plasma](https://www.plasma.to/) is a Bitcoin-anchored EVM Layer 1 launched in September 2025, designed specifically for USDT (USD₮) payments at global scale with zero fees on simple stablecoin transfers. It runs a dual-client architecture: PlasmaBFT (a Rust implementation of Fast HotStuff BFT consensus) for validator coordination and a Reth-based EVM execution layer for transaction processing. The chain raised $373M in an oversubscribed token sale in July 2025 and held approximately $1B in stablecoins at launch.

Plasma's full cryptographic stack is elliptic curve: secp256k1 ECDSA for EVM transactions, EC-based signatures for BFT validator votes, and secp256k1 for Bitcoin anchor transactions and the BTC bridge's ECDSA multisig custody. A quantum break of secp256k1 would simultaneously affect all of these layers. No post-quantum migration plan or roadmap has been published by Plasma Labs as of May 2026.

## Proposed and Implemented PQC Algorithms

> Plasma does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Plasma in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Plasma in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Plasma in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

> We have found no public information indicating migration activity for Plasma in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

### Bitcoin anchoring

**Current state.** Plasma periodically posts state commitments to Bitcoin, using Bitcoin keys (secp256k1) for the anchor transactions. This is intended to inherit Bitcoin's proof-of-work security for Plasma's state history. The anchor transactions are quantum-vulnerable in the same way as Bitcoin itself: secp256k1 keys can be broken by a sufficiently powerful quantum computer.

**Planned future work.** No PQC alternative for Bitcoin anchoring has been announced by Plasma Labs.

### Bitcoin bridge (XPL ↔ BTC)

**Current state.** The bridge between Plasma and Bitcoin relies on ECDSA multisig or a federated custody model, with a signer set holding the BTC peg. This custody layer is the chain's economic root of trust for the BTC peg. A quantum break of secp256k1 would allow an attacker to forge bridge messages and potentially drain the custody holding the BTC-side assets.

**Planned future work.** No PQC-hardened bridge design has been announced by Plasma Labs.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for Plasma in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Plasma Labs controls the upgrade path directly. The network launched in mainnet beta in September 2025 with a team-operated validator set and a stated plan for progressive decentralization, but no on-chain governance or community referendum mechanism has been publicly documented. Hard forks require coordinated upgrades across the validator set. No PQC-relevant proposals or public discussions have been identified in any Plasma Labs venue as of May 2026.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
