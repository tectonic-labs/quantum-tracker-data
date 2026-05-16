# BitMask — Public PQC Readiness Report

| | |
|---|---|
| **Name** | BitMask |
| **Vendor** | DIBA |
| **Category** | Software |
| **Custody model** | Single-party self-custody — the user holds a BIP-39 seed phrase; the vendor never holds or shards the key. RGB asset state is held locally and optionally replicated to the Carbonado encrypted storage layer. |
| **Website** | https://bitmask.app/ |
| **GitHub** | https://github.com/diba-io and https://github.com/bitmask-stack |
| **Platforms** | Chromium browser extension, hosted web app, and an Android companion (Iris Wallet by Bitfinex Labs). Also distributed as a MetaMask Snap. No first-party hardware-wallet integration is documented. |
| **Open source** | Open source — the core wallet library `bitmask-core` is dual-licensed MIT + Apache-2.0; the MetaMask Snap is Apache-2.0; Carbonado and most stack libraries are MIT. |
| **First release** | DIBA's RGB asset marketplace launched on mainnet in 2023; BitMask's RGB20 / RGB21 mainnet release shipped in November 2025. |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | N/A | ➖ | Not Applicable |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

BitMask is a Bitcoin-focused wallet from DIBA built around the RGB client-side-validation protocol. It supports Bitcoin (Taproot only), the Lightning Network, and RGB assets (the RGB20 fungible and RGB21 collectible standards), and ships as a Chromium browser extension, a hosted web app, an Android companion, and a MetaMask Snap. Every Bitcoin spend it produces — including the spend that anchors an RGB state transition — is a Schnorr secp256k1 signature over a Taproot output.

No public statements on post-quantum cryptography from DIBA or the BitMask product were located, and no post-quantum signing path ships in the wallet, the MetaMask Snap, or the `bitmask-core` library today. Because none of the chains BitMask supports currently offers a protocol-level or contract-level post-quantum signature path, four of the five rubric columns do not apply to this wallet; the remaining column tracks post-quantum protection in the wallet's off-chain data flows, where none was found.

## Proposed and Implemented PQC Algorithms

BitMask does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

This column tracks whether a vendor has a meaningful posture on post-quantum migration in a context where one would apply. BitMask supports only Bitcoin, the Lightning Network, and RGB — none of which exposes a protocol-level or contract-level post-quantum signature path that the wallet could engage with — so the stance column has no production surface to measure against and does not apply here. For completeness: no DIBA-authored blog post, roadmap item, security paper, or press release on quantum migration was located, and the [DIBA blog](https://diba.io/blog/) contains no posts on the topic.

## Crypto Agility

**Rating: N/A** ➖

Crypto agility measures whether a wallet's code can accept a new signature scheme without a vendor release, in a setting where a post-quantum scheme is available to swap in. BitMask uses a fixed Bitcoin Taproot signer built on the [Bitcoin Development Kit](https://github.com/diba-io/bitmask-core), and none of its supported chains offers an alternative signature scheme to switch to, so there is no live agility surface to evaluate and the column does not apply. As a factual note, the wallet's Taproot-only design and standard BIP-39 / BIP-86 keystore would each need new code paths to model a different output or key type.

## Protocol PQC

**Rating: N/A** ➖

This column applies only when a wallet supports a chain whose own consensus rules accept post-quantum transaction signatures. BitMask supports Bitcoin, the Lightning Network, and RGB; none of these has a protocol-level post-quantum signature scheme that users can sign with today. With no such chain in the wallet's supported set, this column does not apply.

## Contract PQC Support

**Rating: N/A** ➖

This column applies when a wallet can route a transaction through on-chain contract logic that verifies a post-quantum signature. On Bitcoin the closest analog is [BIP-360 (P2QRH)](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki), which defines a new quantum-safe output type but is not active on mainnet; the Lightning Network has no comparable primitive defined; and while RGB schemas are programmable client-side validators that could in principle encode a post-quantum check, no such schema has been deployed. With no on-chain post-quantum verification path available on any chain BitMask supports, this column does not apply.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for BitMask in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
