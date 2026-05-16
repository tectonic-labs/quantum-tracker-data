# Rabby Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Rabby Wallet |
| **Vendor** | DeBank |
| **Category** | Software |
| **Custody model** | EOA seed phrase (BIP-39 / BIP-32) by default; optional Gnosis Safe co-signer; limited EIP-7702 delegation |
| **Website** | https://rabby.io/ |
| **GitHub** | https://github.com/RabbyHub |
| **Twitter / X** | https://x.com/Rabby_io |
| **Platforms** | Browser extension (Chrome, Firefox, Edge, Brave), mobile (iOS, Android), and desktop native (macOS, Windows) |
| **Open source** | Open source — the browser extension is published under the MIT License, with the "Rabby" name and logo reserved |
| **First release** | 2021 (browser extension) |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Rabby Wallet is an EVM-only software wallet built by DeBank, the DeFi portfolio-tracker and data platform. It ships as a browser extension, a mobile app, and a desktop application, and supports Ethereum alongside more than 100 EVM-compatible chains. Every signature Rabby produces today is classical: ECDSA over secp256k1 for transactions, typed-data signing, and EIP-7702 authorization tuples. No post-quantum signing path ships on any Rabby surface.

Because Rabby is EVM-only, its signing footprint is narrow — effectively a single algorithm — and it has no exposure to chains that enforce a post-quantum signature at the protocol layer. Where it does have a relevant lever is the smart-account plumbing of the Ethereum ecosystem: Rabby supports EIP-1271 contract-signature validation through Gnosis Safe and ships limited EIP-7702 delegation. Those are the architectural paths through which on-chain post-quantum verification could one day be reached, though no such integration ships today.

## Proposed and Implemented PQC Algorithms

Rabby Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

No PQC-native chain falls within Rabby's supported set, and the wallet has no published post-quantum statement on record. As an EVM-only wallet with no protocol-level post-quantum surface to engage, there is no posture column to rate here in the way there would be for a wallet that operates on a chain with a quantum-resistant signature scheme. Rabby's public product communications — across its [site](https://rabby.io/), its [GitHub organization](https://github.com/RabbyHub), and its [X account](https://x.com/Rabby_io) — focus on transaction simulation, risk warnings, automatic chain switching, Gnosis Safe integration, and EIP-7702 ergonomics.

## Crypto Agility

**Rating: No** ❌

Rabby ships a fixed signer, and adding a new signature scheme is not something the wallet's own code can absorb without a vendor release. The signing path assumes BIP-44 derivation over secp256k1 throughout, and there is no plugin layer, keyring API, or third-party signer registration through which an alternative scheme could be added.

**Current state.** The [extension source](https://github.com/RabbyHub/Rabby) is open under the MIT License, so a fork that adds a different signing scheme is technically permitted — but distribution of such a fork under the "Rabby" name is not, since the name and logo are reserved in the [license](https://github.com/RabbyHub/Rabby/blob/master/LICENSE). The keystore follows the standard BIP-39 seed to BIP-32 HD derivation flow with no documented extensibility. Hardware-wallet integrations defer key custody to the device but do not change the signature scheme on the wire.

**Planned future work.** No roadmap mention of a pluggable signer or alternative signature scheme has been found in Rabby's public release signals.

## Protocol PQC

**Rating: N/A** ➖

Rabby is EVM-only by design — it supports no Solana, Bitcoin, Cosmos, Polkadot, or StarkNet chains. None of the chains Rabby supports has a protocol-level post-quantum signature scheme that users sign transactions with, so this column does not apply. The EVM-compatible chains that do pursue post-quantum cryptography are not in Rabby's integration set, and even if such a chain were added through Rabby's custom-RPC feature, Rabby would still sign with ECDSA over secp256k1.

## Contract PQC Support

**Rating: Yes-but** *️⃣

Rabby supports the smart-account building blocks through which an on-chain post-quantum verifier could be reached, even though no such verifier is wired up today. It supports [EIP-1271 contract-signature validation through the Gnosis Safe co-signer flow](https://leastauthority.com/blog/audit-of-rabby-wallet-wallet-extension-2nd-review/), where signature validity is checked by deployed contract bytecode rather than by a plain ECDSA recovery. It also ships [limited EIP-7702 delegation](https://x.com/Rabby_io/status/1948010164608495646), letting an EOA be delegated to a smart-account implementation and that delegation later revoked.

**Current state.** EIP-1271 validation via Gnosis Safe and limited EIP-7702 delegation were both reviewed in the September 2025 [Least Authority extension audit](https://leastauthority.com/blog/audit-of-rabby-wallet-wallet-extension-2nd-review/). Rabby does not ship its own ERC-4337 SDK, bundler, or paymaster integration, and it does not ship its own delegate-target smart-account contract — users delegating via EIP-7702 point at third-party implementations. No deployed on-chain post-quantum primitive is engaged on any EVM chain Rabby supports.

**Planned future work.** No committed post-quantum integration through the contract path has been published. The contract route exists as architecture; whether a post-quantum verifier ever sits behind it depends on dapp-side and contract-side work that is not a Rabby product feature today.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Rabby Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Rabby Wallet is a wholly-owned product of DeBank, a private corporation. Governance is company-led; there is no DAO and no on-chain governance process, and no native Rabby or DeBank token is confirmed. Product direction is set internally and surfaces through DeBank's and Rabby's public channels — the [Rabby site](https://rabby.io/), the [GitHub organization](https://github.com/RabbyHub), and the [X account](https://x.com/Rabby_io) — which is where a post-quantum commitment would appear.

Security issues are handled through a public [bug bounty listing](https://bugrap.io/bounties/Rabby%20Wallet), with disclosures also routed through the [support center](https://support.rabby.io/). The browser extension has been audited multiple times by Least Authority: a [December 2024 extension audit](https://leastauthority.com/wp-content/uploads/2024/12/Least-Authority-DeBank-Rabby-Wallet-Extension-Final-Audit-Report.pdf), an [October 2024 mobile application audit](https://leastauthority.com/wp-content/uploads/2025/09/Rabby_Wallet_Mobile_Application_Final_Audit_Report.pdf), and a [September 2025 second extension review](https://leastauthority.com/blog/audit-of-rabby-wallet-wallet-extension-2nd-review/) that covered the Gnosis Safe and EIP-7702 features.

No dated, on-record PQC milestone published by the vendor has been found.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
