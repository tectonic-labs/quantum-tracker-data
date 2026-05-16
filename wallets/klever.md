# Klever — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Klever Wallet |
| **Vendor** | Klever (Brazil) |
| **Category** | Software |
| **Custody model** | Self-custody EOA with a single BIP-39 seed phrase; an optional KleverSafe hardware device stores keys in a CC EAL5+ certified secure element. |
| **Website** | [klever.io](https://klever.io/) |
| **GitHub** | [github.com/klever-io](https://github.com/klever-io) |
| **Platforms** | Mobile app (iOS, Android), browser extension (Chrome and other Chromium browsers), and a companion KleverSafe hardware device. |
| **Open source** | Wallet client is proprietary in distribution; the underlying cross-chain primitives library (`kos-rs`) is open source under Apache-2.0 / MIT. |
| **First release** | Klever launched in August 2020 as a rebrand of the earlier TronWallet (circa 2017). |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | No | ❌ | Not Engaged |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Klever is a multi-chain, self-custody wallet from a Brazil-headquartered company, paired with an optional KleverSafe hardware device. It supports a broad set of chains — Bitcoin, Ethereum, TRON, BNB Chain, Solana, Polygon, the in-house KleverChain L1, and roughly a dozen more — all signed from a single BIP-39 seed using classical signature schemes (ECDSA on secp256k1 and EdDSA on Ed25519). As of the most recent review, no public Klever post-quantum roadmap, blog post, or position statement could be located, and the wallet ships no post-quantum signing path on any chain it supports.

The Klever stack does have one notable structural detail: the cross-chain primitives library `kos-rs` is open source under Apache-2.0 / MIT, so a third party could in principle fork it to add a new signing algorithm. Doing so would still require Klever to ship a wallet release picking up that change, since the wallet binary itself is proprietary and exposes a fixed signer set with no third-party plugin platform.

## Proposed and Implemented PQC Algorithms

Klever does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

No public statements from Klever, KleverChain, or Klever Electronics on post-quantum cryptography could be located as of this review. Searches for a quantum-migration roadmap, blog post, or position paper returned nothing, and the wallet's published audit work — CertiK's review of the Klever "KOS" wallet code, which validated mnemonic generation, entropy strength, and signing implementations — is scoped entirely to classical cryptography. With neither a published commitment nor an explicit deprioritization on record, there is no vendor posture to assess in this column.

## Crypto Agility

**Rating: No** ❌

The Klever Wallet binary ships a fixed signer catalog mediated by the `kos-rs` Rust library, with no runtime mechanism for accepting a new signature scheme. There is no sandboxed plugin platform for third-party signers, and no first-party API for users or dapps to register custom account or key types. Adding a new signing algorithm requires a vendor-shipped wallet release.

The one mitigating factor is licensing: `kos-rs` is open source ([Apache-2.0 / MIT](https://github.com/klever-io/kos-rs)), so a third party could publish a fork of the library that adds a new signer. That fork would still have to be picked up and shipped by Klever in a wallet release before any end user could use it — the open-source library lowers the barrier to *proposing* a change but does not give users a self-service path.

The wallet's keystore is also fixed to the BIP-39 mnemonic plus BIP-32 HD derivation model, with no documented extensibility for alternative key formats.

## Protocol PQC

**Rating: N/A** ➖

No chain that Klever supports has a protocol-level post-quantum signature scheme available for user transactions, so this column does not apply. Klever's supported chains — including Bitcoin, Ethereum, TRON, BNB Chain, Solana, Polygon, Cardano, Polkadot, and the in-house KleverChain — all settle user transactions with classical ECDSA or Ed25519 signatures.

## Contract PQC Support

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Klever in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Klever in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Klever is a private, Brazil-headquartered company. Product decisions and the wallet client codebase remain under company control; the wallet binary is proprietary, while the `kos-rs` cross-chain primitives library and several other components are published openly at [github.com/klever-io](https://github.com/klever-io).

KleverChain, the company's in-house Layer-1, has its own governance: the KFI token enables on-chain voting over KleverChain protocol parameters and new-application approvals via the [klever.org](https://klever.org/) governance surface. That governance covers the chain's protocol parameters, not the Klever Wallet client codebase or the direction of the `kos-rs` library.

For security disclosure, the vendor's published path runs through CertiK — including [CertiK Skynet monitoring](https://skynet.certik.com/projects/klever) and a CertiK-led bug bounty program. On audit history, CertiK has reviewed the [Klever Wallet KOS code](https://klever.io/blog/klever-wallet-kos-certified-by-certik/) and [KleverChain](https://klever.org/blog/klever-blockchain-earns-100-certik-certification/); all of these audits are scoped to classical cryptography and do not address quantum-attack scenarios. No dated, on-record post-quantum milestone published by the vendor was found.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
