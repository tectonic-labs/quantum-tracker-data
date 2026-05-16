# UniSat Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | UniSat Wallet |
| **Vendor** | UniSat Labs |
| **Category** | Software |
| **Custody model** | EOA — single-party self-custody from a BIP-39 seed phrase, with optional hardware co-sign via a connected Keystone device. |
| **Website** | https://unisat.io/ |
| **GitHub** | https://github.com/unisat-wallet |
| **Platforms** | Browser extension (Chromium), iOS, Android, plus web-hosted marketplace and tooling. No standalone desktop app. |
| **Open source** | Open — the wallet client is published under the MIT license. |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | N/A | ➖ | Not Applicable |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

UniSat is a Bitcoin-ecosystem wallet — it supports Bitcoin mainnet and the UniSat-sponsored Fractal Bitcoin chain, and nothing else. It is purpose-built for Ordinals, Inscriptions, BRC-20, Runes, and Alkanes, with a signing flow built around PSBTs (Partially Signed Bitcoin Transactions). Today it signs with classical Bitcoin cryptography: ECDSA over secp256k1 for legacy and SegWit addresses, and Schnorr (BIP-340) for Taproot. No post-quantum signing path ships in the product.

No public UniSat statement, roadmap item, or security write-up on post-quantum cryptography was located, and the [developer and user documentation](https://docs.unisat.io/) contains no quantum-related terms. Because Bitcoin and Fractal Bitcoin do not currently expose any protocol-level or contract-level post-quantum signature mechanism, several of the rubric columns below are not applicable rather than failing — there is nothing on those chains today for a wallet to integrate. The wallet client is [MIT-licensed](https://github.com/unisat-wallet/wallet), which is the one structural detail that materially affects how a future post-quantum signing path could be added.

## Proposed and Implemented PQC Algorithms

UniSat Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

UniSat supports only Bitcoin and Fractal Bitcoin. Neither chain currently has a protocol-level or contract-level post-quantum signature scheme active on mainnet, so there is no live post-quantum capability for the vendor to take a stance on shipping. For context: no UniSat-authored blog post, roadmap entry, security white paper, or social thread on post-quantum migration was located, and the [UniSat documentation](https://docs.unisat.io/) does not reference quantum topics anywhere. The Bitcoin proposal most relevant to a future post-quantum address type, [BIP-360 (Pay-to-Merkle-Root / P2QRH)](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki), was merged into the Bitcoin BIPs repository in early 2026 but is not active on Bitcoin mainnet, and UniSat has not appeared in [BIP-360 community](https://bip360.org/) discussion.

## Crypto Agility

**Rating: N/A** ➖

UniSat ships a fixed signer — ECDSA secp256k1 and Schnorr secp256k1 over Bitcoin transactions and PSBTs — with no plugin, Snap-style, or keyring API for adding a new signing algorithm. The dapp-facing `window.unisat` provider exposes a fixed method catalog assuming Bitcoin and Fractal semantics. Because the chains UniSat supports offer no alternative protocol-level signature scheme to plug in, there is no in-product agility surface to exercise. One structural detail worth noting: the wallet client is [MIT-licensed](https://github.com/unisat-wallet/wallet), and existing third-party forks ([Exodus](https://github.com/ExodusMovement/unisat-browser), [Keystone](https://github.com/KeystoneHQ/unisat-wallet-extension)) show the license is being used in practice — so a fork-based path to add a new signing scheme faces no license obstacle, though no in-tree extension point exists.

## Protocol PQC

**Rating: N/A** ➖

This column measures whether a wallet signs user transactions with a chain's protocol-level post-quantum scheme. UniSat supports only Bitcoin and Fractal Bitcoin, and neither chain has a protocol-level post-quantum signature scheme that user transactions can use today. No chain UniSat supports provides such a mechanism, so this column does not apply.

## Contract PQC Support

**Rating: N/A** ➖

This column measures whether a wallet signs with a post-quantum signature verified by on-chain contract bytecode. Bitcoin's programmable surface is Script and Taproot script-path leaves rather than generalized smart-contract account abstraction, and there is no deployed on-chain post-quantum verification primitive on Bitcoin or Fractal Bitcoin mainnet. [BIP-360 (P2QRH)](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki) describes a future output type rather than a contract verifier, and is not active. With no on-chain post-quantum primitive available on a supported chain, this column does not apply.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for UniSat Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

UniSat Wallet is developed by UniSat Labs, a private company; product decisions, the feature roadmap, and security posture are set by the company team. There is no DAO or on-chain governance over the wallet, and UniSat has not issued its own token. Product and roadmap direction is communicated through the vendor's [main site](https://unisat.io/) and [documentation](https://docs.unisat.io/); any future post-quantum commitment would most plausibly surface there.

The wallet client is open source under the MIT license, and its source is reviewable in place in the [public monorepo](https://github.com/unisat-wallet/wallet). Bitcoin-side post-quantum work for the wider ecosystem is tracked through [BIP-360](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki) and its [community site](https://bip360.org/); UniSat has not yet participated in that discussion.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
