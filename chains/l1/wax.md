# WAX (WAXP) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | WAX (Worldwide Asset eXchange) |
| **Ticker** | WAXP |
| **Website** | <https://on.wax.io/wax-io/> |
| **GitHub** | <https://github.com/worldwide-asset-exchange> |
| **On-chain environment** | WASM (Antelope `nodeos` fork) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

WAX (Worldwide Asset eXchange) is an [EOSIO-derived Antelope Layer 1](https://github.com/worldwide-asset-exchange/wax-blockchain) specialised for NFTs and gaming. Block production rotates among WAX Guilds (DPoS block producers elected by WAXP stake-weighted vote). WAX is a member of the [Antelope Coalition](https://docs.antelope.io/docs/latest/eosio-blockchain-networks/) alongside EOS (now Vaulta), Telos, and UX Network, sharing the Antelope codebase. WAX completed the Antelope 3.1 core protocol hard fork and merged the Spring Community Edition in December 2025. User transactions are authorized with secp256k1 (`K1`) or secp256r1 (`R1`) ECDSA keys — the same Antelope-standard account model used by Vaulta.

No post-quantum migration work has been published by WAX or the Antelope Coalition as of the date of this report.

## Proposed and Implemented PQC Algorithms

WAX does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for WAX in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

WAX uses Antelope DPoS with WAX Guilds (top-21 by stake-weighted vote) producing blocks. WAX completed the [Antelope 3.1 hard fork](https://medium.com/wax-io/antelope-upgrade-accelerates-wax-blockchains-journey-to-mainstream-e691f708f895) and merged the Spring Community Edition in December 2025. The further step to Spring 1.0 / Savanna consensus — which adds BLS12-381 finalizer keys for sub-second instant finality — was completed on EOS/Vaulta in September 2024; whether WAX has activated Savanna on its own mainnet has not been confirmed in publicly reviewed sources. Under either the legacy DPoS or a future Savanna activation, block signing and finalizer keys are elliptic-curve based.

**Current state.** Antelope block production keys are secp256k1 ECDSA. A Savanna activation would add BLS12-381 finalizer keys, which are also elliptic-curve based.

**Planned future work.** No post-quantum consensus signature scheme has been announced. The Antelope Coalition shared roadmap drives Spring CE adoption across coalition chains but contains no PQC component.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for WAX in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

WAX runs Antelope WASM smart contracts with the same host-function set as the parent codebase: `recover_key` for secp256k1/secp256r1 ECDSA recovery, SHA-256, RIPEMD-160, and Keccak-256 hash intrinsics. If WAX activates Savanna (Spring 1.0), the BLS12-381 host-function suite (`bls_g1_add`, `bls_g2_add`, `bls_pairing`, etc.) would also become available. No post-quantum verification primitive is available in either configuration.

**Current state.** All smart-contract cryptographic primitives are elliptic-curve based. No PQC verify host function has been proposed.

**Planned future work.** None published.

## 5. Other Features

### AtomicAssets NFT Standard

**Current state.** [AtomicAssets](https://github.com/worldwide-asset-exchange/wax-system-contracts) is WAX's native NFT format. NFT creation, transfer, and ownership proofs are carried by standard transaction-layer ECDSA signatures; no additional cryptographic envelope is layered on top.

**Planned future work.** No post-quantum alternative for the NFT or gaming-asset layer has been proposed.

### Antelope IBC

**Current state.** If WAX activates Savanna, the Antelope IBC protocol (cross-chain messaging) will ride on BLS12-381 aggregate signatures as the finality proof — an elliptic-curve dependency. No STARK-based or post-quantum IBC alternative is on the roadmap.

**Planned future work.** None published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, WAX's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for WAX in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

WAX protocol upgrades follow the Antelope coalition model: on-chain privileged multi-sig proposals (MSIGs) signed by the top-21 Guild block producers. BPs must upgrade node software first, then collectively co-sign the MSIG to activate each named protocol feature. Coordination with the broader [Antelope Coalition](https://docs.antelope.io/docs/latest/eosio-blockchain-networks/) shapes the shared codebase roadmap, but each chain activates upgrades independently via its own Guild set.

No PQC-relevant proposals have been identified in the WAX or Antelope Coalition governance record.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
