# Typhon — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Typhon Wallet |
| **Vendor** | Strica Pte Ltd |
| **Category** | Software |
| **Custody model** | Self-custody EOA — user holds a BIP-39 mnemonic with Cardano CIP-1852 / Ed25519-BIP32 derivation; optional Ledger or Trezor hardware co-sign. No native MPC. |
| **Website** | https://typhonwallet.io/ |
| **GitHub** | https://github.com/StricaHQ |
| **Twitter / X** | https://x.com/typhonwallet |
| **Platforms** | Chromium browser extension (Chrome, Edge, Brave) and a hosted web app. No native mobile or desktop app. |
| **Open source** | Mixed. The underlying Strica library stack is open source (Apache-2.0); the wallet application itself appears closed-source, distributed only as the deployed extension bundle. |
| **First release** | Circa 2021. |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Typhon Wallet is a Cardano-focused, non-custodial wallet built by Strica, distributed as a Chromium browser extension and a hosted web app. It is single-ecosystem: Cardano mainnet plus the standard Cardano testnets, with no Bitcoin, EVM, or other non-Cardano support. Every user transaction is signed with Ed25519-BIP32 (Cardano's "BIP32-Ed25519" extended-key scheme) via Strica's open-source library stack, and Typhon ships no post-quantum signing path today.

No Typhon- or Strica-authored public statement on post-quantum cryptography was located. The post-quantum discussion in the Cardano ecosystem is currently happening at the chain-protocol level — the CIP-1144 and CIP-1175 governance proposals survey post-quantum signature approaches and a quantum-secure settlement layer for Cardano — but those are chain-side proposals in the CIP discussion stage, not features in any Typhon product roadmap. One structural note worth flagging: Strica's library stack (Apache-2.0) is the same code that Ledger Live's Cardano integration consumes, so it is an unusually load-bearing piece of Cardano infrastructure for a third-party wallet team.

## Proposed and Implemented PQC Algorithms

Typhon does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

Typhon supports only Cardano, and Cardano has no protocol-level post-quantum signature scheme available for a wallet to engage with today. Post-quantum approaches for Cardano exist only as governance proposals ([CIP-1144](https://github.com/cardano-foundation/CIPs/pull/1144), [CIP-1175](https://github.com/cardano-foundation/CIPs/pull/1175)) in the CIP discussion stage. With no live post-quantum target on the wallet's only supported chain, this posture column does not apply. No Typhon- or Strica-authored public statement on post-quantum cryptography was located.

## Crypto Agility

**Rating: No** ❌

Typhon ships a fixed Cardano Ed25519-BIP32 signer with no plugin or extension API for adding a new signing algorithm. The wallet's [CIP-30 dApp connector](https://github.com/StricaHQ) exposes Typhon as a wallet provider to Cardano dApps, but that is an outbound integration surface — it does not let third parties add chains, accounts, or signing schemes to Typhon itself. Adding a new signature scheme would require a vendor-authored change to the wallet application.

**Current state.** The wallet application is distributed as a closed binary, so the orchestration layer that wires signing into the UI is not publicly forkable. The underlying library stack — [`@stricahq/typhonjs`](https://github.com/StricaHQ/typhonjs), [`@stricahq/bip32ed25519`](https://github.com/StricaHQ/bip32ed25519), [`@stricahq/cbors`](https://github.com/StricaHQ/cbors), and [`@stricahq/cip08`](https://github.com/StricaHQ/cip08) — is open source under Apache-2.0, so a new signing path could in principle be contributed to the libraries by the community; the wallet application that consumes them would still need a vendor change to expose it. No swappable-signer architecture exists in the shipped wallet.

## Protocol PQC

**Rating: N/A** ➖

Typhon is a single-chain Cardano wallet, and none of the post-quantum-native chains tracked for protocol-level signing are among the chains it supports. Cardano itself has no protocol-level post-quantum signature scheme that a wallet can sign user transactions with today. Because there is no chain in Typhon's scope that provides a protocol-level post-quantum signing path, this column does not apply.

## Contract PQC Support

**Rating: N/A** ➖

Typhon's only supported chain is Cardano. Cardano has Plutus / Aiken smart contracts but no generalized account abstraction in the EVM ERC-4337 sense; its account-abstraction-like patterns are native scripts (multi-sig, time-locks) and Plutus validators. No on-chain post-quantum verifier has been deployed on Cardano or wired into Typhon, and there is no smart-contract post-quantum signing path for the wallet to route through. With no such on-chain primitive available on the chain Typhon supports, this column does not apply.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Typhon in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Typhon is built by Strica (Strica Pte Ltd), a Cardano-focused developer studio whose other flagship product is the Cardanoscan block explorer. Strica is a private company; Typhon's product decisions, feature roadmap, and security posture are set internally, with no DAO or on-chain governance over the wallet.

There is no Typhon-specific proposal process. The Cardano chain itself is governed through the CIP process at [github.com/cardano-foundation/CIPs](https://github.com/cardano-foundation/CIPs), where the post-quantum proposals [CIP-1144](https://github.com/cardano-foundation/CIPs/pull/1144) and [CIP-1175](https://github.com/cardano-foundation/CIPs/pull/1175) are under discussion; any future post-quantum migration affecting Cardano wallets would surface there first. Strica has historically engaged with Cardano Catalyst for funding — a [Typhon mobile-app proposal](https://projectcatalyst.io/funds/9/dapps-products-and-integrations/typhon-wallet-mobile-app) (Fund 9, 2022) and a [Keystone hardware-integration proposal](https://projectcatalyst.io/funds/11/cardano-use-cases-product/integrate-keystone-hardware-wallet-into-typhon) (Fund 11, 2021) are both on record as not approved.

No publicly named bug-bounty platform and no publicly disclosed independent audit of the Typhon wallet codebase or the Strica library stack were located. Readers wanting to track Strica's posture can follow the [StricaHQ GitHub org](https://github.com/StricaHQ), the [official site](https://strica.io/), and the [Typhon Wallet X account](https://x.com/typhonwallet). No dated, on-record post-quantum milestone has been published by the vendor.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
