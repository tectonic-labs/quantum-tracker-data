# Enjin Blockchain (ENJ) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Enjin Blockchain |
| **Ticker** | ENJ |
| **Website** | https://enjin.io/technology/blockchain/ |
| **GitHub** | https://github.com/enjin |
| **On-chain environment** | Substrate / WASM (FRAME runtime; no EVM) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Enjin Blockchain is a Substrate-based L1 specialised for NFTs and gaming. Built by Enjin Pte. Ltd. on the Polkadot SDK, it runs two complementary chains: the Enjin Relaychain (NPoS security) and the Enjin Matrixchain (PoA collators hosting native MultiTokens, FuelTanks, and Marketplace pallets). The chain completed a major token consolidation in September 2023, making native ENJ the gas, staking, and governance token.

Every cryptographic layer — transaction signing, consensus, P2P networking, and on-chain primitives — uses the standard Substrate elliptic-curve stack: Sr25519 (Schnorr over Ristretto25519), Ed25519, and ECDSA secp256k1. No PQC research, codebase experiment, vendor proof-of-concept, or governance proposal attributable to Enjin has been identified. Because Enjin inherits the shared Substrate/Polkadot-SDK cryptographic stack, any upstream PQC work in Polkadot would flow downstream; none is currently in production.

## Proposed and Implemented PQC Algorithms

> Enjin Blockchain does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Enjin Blockchain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Enjin Blockchain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Enjin Blockchain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Enjin Blockchain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### Native NFT Pallets (MultiTokens, FuelTanks, Marketplace)

The [Enjin Matrixchain](https://docs.enjin.io/enjin-blockchain/enjin-matrixchain) provides NFTs and multi-unit tokens natively through the [MultiToken pallet](https://docs.enjin.io/docs/multitoken-pallet). [FuelTanks](https://docs.enjin.io/enjin-blockchain/enjin-matrixchain/fuel-tank-pallet) sponsor transaction fees for users, and the Marketplace pallet supports listings and auctions. All authorization for these operations uses the same Substrate EC account signatures (Sr25519 / Ed25519 / ECDSA) covered under Transaction Signatures. A quantum adversary forging those keys could transfer or mint tokens freely.

**Current state.** EC-dependent. No chain-attributable PQC migration work exists.

**Planned future work.** None. Any future PQC migration of these features would require that the underlying Substrate account model first adopt a PQC signature scheme.

### One-Way ERC-20 to Native ENJ Migration (Claims Pallet)

An [on-chain claims mechanism](https://enjin.io/blog/enjin-blockchain-migration-successful-51-complete-in-first-60-days) allows holders of Ethereum ERC-20 ENJ (or ERC-20 EFI) to burn tokens on the Ethereum side and mint native ENJ at 1:1 (EFI at 4:1). The address-link proof is a standard Ethereum secp256k1 ECDSA signature. This is a one-way path — there is no native-to-ERC-20 return route. A quantum adversary able to forge secp256k1 signatures for unclaimed Ethereum addresses could submit fraudulent claims for native ENJ.

**Current state.** ECDSA-linked. No PQC migration announced for the claims pallet.

**Planned future work.** None.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

Enjin Blockchain is built on EC primitives end-to-end: Sr25519/Ed25519/ECDSA accounts, BABE VRF, GRANDPA finality, PoA authority keys, libp2p Noise on Curve25519, and the ECDSA-linked claims pallet. No Enjin governance proposal, documentation page, or blog post addresses EC retirement. Any removal of EC cryptography would require a coordinated runtime upgrade across both the Relaychain and the Matrixchain.

**Current state.** No EC retirement plan on any layer.

**Planned future work.** None identified.

## Governance

Enjin Blockchain uses [on-chain governance](https://enjin.io/blog/enjin-governance-and-250m-enj-early-governance-rewards-pool) anchored to the NPoS Relaychain. ENJ holders participate via nomination pools; conviction voting governs runtime upgrade proposals. Protocol changes are shipped as named chain upgrades (for example, "Bugis," "Kallang") staged on the [Canary network](https://faucet.canary.enjin.io/) before mainnet activation. The Kallang upgrade (activated on Relaychain ~May 18 2026, block ~15,543,000) removed the `sudo` emergency key in favour of an emergency-origin pallet. Upgrades are forkless: a new WASM runtime blob is enacted on-chain.

No PQC-relevant proposals have been filed in the Enjin governance system. No PQC-related governance event has been located.

---

_Generated on 03 Jun 2026 based on information as of 16 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
