# Zerion — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Zerion Wallet |
| **Vendor** | Zerion (SF) |
| **Category** | Software |
| **Custody model** | EOA seed phrase (single-party), with EIP-7702 batched transactions via the Zerion API; Ledger hardware-wallet custody supported. |
| **Website** | [zerion.io](https://zerion.io/) |
| **GitHub** | [github.com/zeriontech](https://github.com/zeriontech) |
| **Platforms** | Browser extension (Chrome, Brave, Edge), iOS, Android, and a web portfolio app. |
| **Open source** | Open source — GPL-3.0 for the browser extension, Apache-2.0 for the iOS and Android wallet-core libraries, LGPL-3.0 for the DeFi SDK. |
| **First release** | 2022 (self-custodial mobile wallet). |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Zerion is an EVM-focused multi-chain software wallet — a browser extension plus iOS and Android apps — that grew out of Zerion's DeFi portfolio tracker. It supports Ethereum and a large set of EVM L1s and L2s, plus Solana and TRON. Transaction signing uses ECDSA on secp256k1 for EVM chains and Ed25519 for Solana; there is no post-quantum signing path anywhere in the product today.

The one place Zerion is doing structural work that bears on a future post-quantum path is account abstraction. The Zerion API ships EIP-7702 batched-transaction support, which the wallet uses for atomic flows such as approve-and-swap, and which third-party wallets also consume. That smart-account plumbing is the route through which an on-chain post-quantum verifier could eventually be reached, which is why Contract PQC Support is rated as in progress rather than absent. The remaining columns reflect that Zerion has no published PQC roadmap, no pluggable signer, no post-quantum-native chain in its supported set, and no off-chain post-quantum mechanism.

## Proposed and Implemented PQC Algorithms

Zerion does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

Zerion's supported networks are EVM chains plus Solana and TRON, and the wallet ships a fixed signer. As of the information date, no public PQC roadmap, commitment, or quantum-resistance positioning was located across the [main site](https://zerion.io/), [GitHub organization](https://github.com/zeriontech), or [developer docs](https://developers.zerion.io/). Because the wallet has no surface on which a protocol-level post-quantum stance would apply, this column is treated as not applicable rather than as a missing commitment.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Zerion in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Protocol PQC

**Rating: N/A** ➖

Zerion's supported networks are EVM chains plus Solana and TRON. None of these chains has a protocol-level post-quantum signature scheme that a wallet would sign user transactions with, so this column does not apply. The [supported-networks list](https://help.zerion.io/en/articles/8186606-supported-networks-on-zerion) does not include any post-quantum-native chain.

## Contract PQC Support

**Rating: Yes-but** *️⃣

Zerion ships EIP-7702 batched-transaction support through the [Zerion API](https://zerion.io/api). The wallet uses this to bundle multiple actions — for example an approval and a swap — into a single signed flow, and the same API plumbing is consumed by third-party wallets. EIP-7702 lets an externally owned account delegate to smart-contract code, which is the architectural route through which an on-chain post-quantum signature verifier could eventually be reached.

**Current state.** The capability today is account-abstraction plumbing, not a post-quantum integration. Zerion does not ship its own ERC-4337 SDK, bundler, paymaster, or smart-account-from-scratch creation flow as a developer- or user-facing product, and it does not expose a deployed on-chain post-quantum primitive in its UI. The EVM chains Zerion supports have no deployed on-chain post-quantum verification primitive as of the information date, so the architectural support is present but unused for post-quantum purposes. Broader EIP-7702 adoption context is summarized in [ZeroDev's 7702 adoption write-up](https://docs.zerodev.app/blog/7702-adoption), which notes Zerion's participation in that cycle.

**Planned future work.** No specific post-quantum integration on top of the EIP-7702 path has been publicly announced.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Zerion in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Zerion is a privately held company; the wallet, portfolio app, and Zerion API are company-led products with no DAO or on-chain governance. Product direction is communicated through Zerion's [main site](https://zerion.io/) and [developer documentation](https://developers.zerion.io/), which are where a PQC commitment would be expected to surface if one were made.

The browser extension is open source under GPL-3.0 ([license](https://github.com/zeriontech/zerion-wallet-extension/blob/main/LICENSE)), and the [iOS](https://github.com/zeriontech/wallet-core-ios) and [Android](https://github.com/zeriontech/wallet-core-android) wallet-core libraries are open source under Apache-2.0, so the signing code is publicly inspectable. No canonical public audit page for the wallet was located, and the specific security-disclosure venue could not be confirmed from public sources.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
