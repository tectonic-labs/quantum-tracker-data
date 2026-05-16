# VESPR — Public PQC Readiness Report

| | |
|---|---|
| **Name** | VESPR |
| **Vendor** | DigitalBlock Labs (UK) |
| **Category** | Software |
| **Custody model** | EOA self-custody — BIP-39 mnemonic with Cardano CIP-1852 / Ed25519-BIP32 derivation; optional Ledger or Keystone hardware co-sign. |
| **Website** | https://vespr.xyz/ |
| **GitHub** | https://github.com/vespr-wallet |
| **Platforms** | iOS, Android, and a Chromium browser extension (Chrome, Brave, Edge). |
| **Open source** | Mixed — the Dart/Flutter SDKs are MIT-licensed; the wallet application itself is source-available under a non-commercial personal-use license. |
| **First release** | 2022 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

VESPR is a Cardano wallet from DigitalBlock Labs, a bootstrapped UK company, shipping on iOS, Android, and a Chromium browser extension. It is built on a Flutter/Dart stack — distinctively, it ships its own [MIT-licensed Cardano Dart SDK](https://github.com/vespr-wallet/cardano_dart_sdk) rather than reusing the Rust-to-WASM library that most other Cardano wallets share. Every user transaction is signed with Ed25519-BIP32 keys derived per Cardano's CIP-1852 standard, with optional hardware co-signing through Ledger or Keystone.

No post-quantum cryptography ships in VESPR today, and no public post-quantum statement or roadmap from VESPR or DigitalBlock Labs was found. Cardano's own post-quantum work is at the proposal stage upstream of any wallet — [CIP-1144](https://github.com/cardano-foundation/CIPs/pull/1144) surveys post-quantum signature approaches and [CIP-1175](https://github.com/cardano-foundation/CIPs/pull/1175) describes a quantum-secure settlement layer — but neither has been activated on the network.

## Proposed and Implemented PQC Algorithms

VESPR does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

VESPR is a single-ecosystem Cardano wallet, and Cardano has no activated protocol-level post-quantum signature scheme. The post-quantum direction for the chain is being defined upstream through the Cardano Improvement Proposal process — [CIP-1144](https://github.com/cardano-foundation/CIPs/pull/1144) and [CIP-1175](https://github.com/cardano-foundation/CIPs/pull/1175) — rather than at the wallet layer. Because there is no activated chain-level scheme for a wallet to adopt or reject, this column does not apply to VESPR as it ships today. No VESPR- or DigitalBlock-Labs-authored public statement on post-quantum migration was located, and the [VESPR documentation](https://docs.vespr.xyz/vespr) does not reference post-quantum or quantum-resistant cryptography.

## Crypto Agility

**Rating: No** ❌

VESPR ships a fixed Cardano Ed25519-BIP32 signer with no plugin or extension API for adding new signing schemes. Signing runs through the wallet's own [`cardano_dart_sdk`](https://github.com/vespr-wallet/cardano_dart_sdk), and there is no third-party path to introduce an alternative algorithm into the application. Adopting a new signature scheme would require a vendor code change by DigitalBlock Labs in both the Flutter app and its SDK.

The licensing picture shapes what a community effort could do. The Dart SDKs are MIT-licensed and freely forkable, but the wallet application itself is source-available under a non-commercial personal-use license — so the SDKs could be forked into a new signing variant, while the app shell could not be commercially redistributed without DigitalBlock Labs's permission. VESPR's choice to maintain its own Dart Cardano codebase, independent of the shared Rust-to-WASM library used elsewhere in the Cardano wallet ecosystem, also means any future chain-side signing change would have to be implemented separately in VESPR's SDK rather than inherited.

## Protocol PQC

**Rating: N/A** ➖

VESPR's only shipped chain is Cardano (Bitcoin is marketed as "coming soon" but is not shipped). Cardano has no activated protocol-level post-quantum signature scheme, and none of the post-quantum-native chains tracked elsewhere are supported by VESPR. With no chain-level post-quantum signing path available to it, this column does not apply.

## Contract PQC Support

**Rating: N/A** ➖

Cardano uses Plutus/Aiken smart contracts but has no generalized account-abstraction model in the EVM ERC-4337 sense, and Plutus V3's cryptographic primitives cover Ed25519, secp256k1 (ECDSA and Schnorr), BLS12-381, and hash functions only — no post-quantum primitive. No on-chain post-quantum verifier exists for VESPR to route signatures through, so this column does not apply.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for VESPR in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

VESPR is developed by DigitalBlock Labs, a bootstrapped private company based in the UK. It is an independent third-party developer and is not affiliated with the principal Cardano ecosystem organizations. There is no VESPR token and no DAO; product decisions, feature roadmap, and security posture are set internally by the vendor.

The vendor has used Cardano's community-treasury funding mechanism, Project Catalyst, for two Fund 13 proposals — one to [open-source VESPR](https://projectcatalyst.io/funds/13/cardano-use-cases-product/open-sourcing-vespr-or-vespr-turbo) and one for a [YubiKey hardware-wallet SDK](https://projectcatalyst.io/funds/13/cardano-open-developers/vespr-open-source-yubikey-hardware-wallet-sdk-or-affordable-security-for-cardano-users) — but Catalyst is a Cardano-wide funding venue, not a VESPR governance process. Neither proposal references post-quantum cryptography. Cardano's own post-quantum direction surfaces in the public Cardano Improvement Proposal repository ([CIP-1144](https://github.com/cardano-foundation/CIPs/pull/1144), [CIP-1175](https://github.com/cardano-foundation/CIPs/pull/1175)). VESPR product changes are published through the vendor's site and documentation and the [GitHub organization](https://github.com/vespr-wallet); a post-quantum commitment, if one is made, would surface there.

Security disclosures are directed to an `all@vespr.xyz` address listed in the [GitHub org profile](https://github.com/vespr-wallet/.github). No publicly named bug-bounty platform and no publicly disclosed independent audit of the VESPR wallet codebase were located.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
