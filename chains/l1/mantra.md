# Mantra (OM) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Mantra |
| **Ticker** | OM |
| **Website** | https://mantrachain.io/ |
| **GitHub** | https://github.com/MANTRA-Chain |
| **On-chain environment** | CosmWasm + EVM (Cosmos-EVM module) |
| **Mainnet genesis** | 2024-01-01 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

MANTRA Chain is a Cosmos SDK + CometBFT proof-of-stake L1 designed for real-world asset (RWA) tokenization with protocol-level jurisdictional compliance. Its distinctive feature is a native Token Service Module that lets issuers mint, freeze, seize, and govern tokenized RWAs (securities, commodities, real estate) at the chain level. MANTRA runs a MultiVM architecture supporting both native CosmWasm smart contracts and EVM (via the Interchain Labs Cosmos-EVM module), making it compatible with both Cosmos and Solidity tooling.

No PQC migration activity has been identified for MANTRA in any category. The chain's cryptographic stack — secp256k1 ECDSA for user transactions, Ed25519 for CometBFT validator keys, Ed25519-based P2P identity, standard EVM precompiles, and IBC light-client proofs — is entirely EC-dependent with no published plan to change.

## Proposed and Implemented PQC Algorithms

> Mantra does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Mantra in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Mantra in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Mantra in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

> We have found no public information indicating migration activity for Mantra in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

**Grade: F ❌**

### IBC (Inter-Blockchain Communication)

MANTRA participates in the Cosmos IBC protocol for cross-chain interoperability. IBC light clients depend on CometBFT validator signatures (Ed25519) to verify cross-chain state transitions. A quantum break of Ed25519 would allow forged IBC proofs, enabling fraudulent cross-chain transfers.

**Current state.** IBC light-client proofs are Ed25519-based. No post-quantum IBC alternative has been published.

**Planned future work.** None published by MANTRA Chain.

### Token Service Module

MANTRA's Token Service Module is a chain-level compliance primitive that allows issuers to mint, freeze, seize, and assign governance roles to tokenized RWA positions (securities, commodities, real estate). Cryptographically, it operates through standard Cosmos SDK message signing — secp256k1 ECDSA — and does not introduce any additional cryptographic schemes.

**Current state.** Compliance operations are authorized via standard EC-signed Cosmos messages. No chain-specific cryptographic exposure beyond the base Cosmos + EVM stack.

**Planned future work.** None relevant to PQC.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No PQC migration plan or EC retirement schedule has been published by MANTRA Chain. The March 2026 chain-level upgrade (OM ticker redenomination, 1:4 ratio) was an economic and governance change, not a cryptographic one. No subsequent upgrade has addressed quantum readiness.

**Current state.** EC cryptography is embedded in every layer of the MANTRA stack.

**Planned future work.** None published.

## Governance

MANTRA uses the standard Cosmos SDK governance workflow via the `x/upgrade` module. Software upgrade proposals are submitted on-chain; validators vote; if approved, the chain halts at the target block height while operators swap binaries. Emergency upgrades can be coordinated off-chain via validator social consensus.

The Dukong testnet served as a staging environment for the MultiVM (CosmWasm + EVM) upgrade before the mainnet governance vote. The Mantra Testnet (`mantra-hongbai-1`) is available for general developer testing.

No PQC-relevant governance proposals have been filed in the MANTRA Chain ecosystem.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
