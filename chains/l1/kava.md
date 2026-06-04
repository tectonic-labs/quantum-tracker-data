# Kava (KAVA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Kava |
| **Ticker** | KAVA |
| **Website** | https://kava.io/ |
| **GitHub** | https://github.com/Kava-Labs/kava |
| **On-chain environment** | Cosmos SDK (native modules) + EVM (Ethermint co-chain) |
| **Current mainnet version** | Kava 15 (activated Q4 2024) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Kava is a Cosmos SDK + CometBFT proof-of-stake L1 with an unusual dual-VM architecture: a Cosmos co-chain running native DeFi modules (USDX CDPs, Hard Money Market, Kava Earn) alongside an Ethermint EVM co-chain for Solidity dApps. Both co-chains share the same consensus layer and block production. Kava also participates in the Cosmos IBC ecosystem, connecting EVM dApps to the broader Cosmos network.

No PQC migration activity has been identified for Kava in any category. Every cryptographic surface — user transaction signing on both co-chains, CometBFT validator key signing, P2P node identity, on-chain EC precompiles, and IBC light-client proofs — remains entirely dependent on elliptic curve cryptography with no published plan to change.

## Proposed and Implemented PQC Algorithms

> Kava does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Kava in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Kava in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Kava in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

> We have found no public information indicating migration activity for Kava in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

**Grade: F ❌**

Kava's notable chain-specific features are its native DeFi modules and IBC connectivity.

### IBC (Inter-Blockchain Communication)

Kava participates in the Cosmos IBC protocol, which relies on CometBFT light-client proofs to verify cross-chain state. IBC light clients depend on the same Ed25519 validator signatures used in CometBFT consensus. A quantum break of Ed25519 would allow forged IBC proofs, enabling fraudulent cross-chain transfers.

**Current state.** IBC light-client proofs are Ed25519-based. No post-quantum IBC proposal has been published.

**Planned future work.** None published by Kava Labs.

### Native DeFi Modules

Kava's application-level modules (USDX, Hard, Earn, Liquid, Strategic Vault, Kava Lend) are Cosmos SDK modules implementing financial logic. They do not introduce additional cryptographic primitives beyond what the underlying Cosmos stack already provides.

**Current state.** No chain-specific cryptographic exposure beyond standard Cosmos + EVM.

**Planned future work.** None relevant.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No PQC migration plan or EC retirement schedule has been published by Kava Labs. The Kava 15 upgrade (Q4 2024) introduced a zero-inflation economic model and was unrelated to cryptography. No subsequent upgrade has addressed quantum readiness.

**Current state.** EC cryptography is embedded in every layer of the Kava stack.

**Planned future work.** None published.

## Governance

Kava uses the standard Cosmos SDK governance process. Software upgrade proposals are submitted on-chain; token holders vote during a deposit and voting period; if quorum and threshold are met, the upgrade is scheduled at a target block height. The KavaDAO operates an expert committee delegation model for governance decisions.

No PQC-relevant proposals have been identified in Kava's on-chain governance history.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
