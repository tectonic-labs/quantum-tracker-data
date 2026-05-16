# Martian Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Martian Wallet |
| **Vendor** | Pontem Network |
| **Category** | Software |
| **Custody model** | EOA — single-key self-custody; the user holds a BIP-39 seed phrase, with per-chain Ed25519 accounts derived for Aptos and Sui. |
| **Website** | https://martianwallet.xyz/ |
| **GitHub** | https://github.com/martian-dao |
| **Platforms** | Browser extension (Chrome, Edge, Brave, and other Chromium browsers). Mobile is listed as "coming soon" on the official site. |
| **Open source** | Proprietary wallet client. The `martian-dao` org publishes only auxiliary SDKs and dapp adapters under mixed licenses; the browser-extension client code is closed. |
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

Martian Wallet is a browser-extension wallet for the Aptos and Sui blockchains, originally built by Martian Labs (founded 2022) and acquired by Pontem Network in May 2025. It is a seed-phrase self-custody wallet: the user holds a BIP-39 mnemonic, and the extension derives an Ed25519 key for each chain from that seed. As of this report, Martian ships no post-quantum signing path on either chain, and no Martian- or Pontem-branded public statement on post-quantum cryptography has been found across the wallet's site, FAQ, blogs, or the Pontem acquisition announcement.

The two chains Martian supports do not currently provide an activated protocol-level post-quantum signature scheme for user transactions. Aptos has a formally Accepted protocol proposal — [AIP-137](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-137.md), which specifies post-quantum signing accounts and explicitly notes that wallets may choose to implement support — but it has not been activated on Aptos mainnet, and no Martian implementation work has surfaced. Sui has no comparable in-flight post-quantum proposal. Both chains' transaction signing remains classical Ed25519 today.

## Proposed and Implemented PQC Algorithms

Martian Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

No Martian- or Pontem-branded public statement on post-quantum cryptography has been located. Searches across the [official site](https://martianwallet.xyz/), the [FAQ](https://martianwallet.xyz/faq/), the wallet's blogs, and the [Pontem acquisition announcement](https://pontem.network/posts/lightspeed-backed-pontem-acquires-martian-a-popular-aptos-wallet-with-over-2m-installs) returned no references to post-quantum, quantum-resistant, lattice-based, or hash-based signatures, and the acquisition press release names no cryptographic roadmap item. The relevant forward-looking development is chain-side rather than wallet-side: Aptos's [AIP-137](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-137.md) is an Accepted protocol proposal for post-quantum signing accounts that explicitly states wallets may choose to implement support. No engagement by Martian with that proposal has been found.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Martian Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Protocol PQC

**Rating: N/A** ➖

Martian supports two chains — Aptos and Sui — and neither currently exposes an activated protocol-level post-quantum signature scheme for user transactions. Aptos's [AIP-137](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-137.md) post-quantum signing proposal is Accepted but not yet activated on mainnet, and Sui has no comparable proposal in flight. Because no chain Martian supports offers a protocol-level post-quantum signature for users to sign with today, this column does not apply.

## Contract PQC Support

**Rating: N/A** ➖

Both Aptos and Sui provide native, Move-based account-abstraction mechanisms, but neither chain has a deployed on-chain post-quantum signature verifier that a wallet could route through, and no published Move post-quantum verifier has been located on either chain. With no deployed contract-level post-quantum primitive available on a chain Martian supports, this column does not apply.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Martian Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Martian Wallet is governed as a company product. It was built by Martian Labs (founded 2022) and acquired by [Pontem Network](https://pontem.network/posts/lightspeed-backed-pontem-acquires-martian-a-popular-aptos-wallet-with-over-2m-installs) on 21 May 2025; Pontem is a privately held, venture-backed development studio, and it stated that Martian would continue as a separate product. There is no DAO or token governing the wallet itself. The Aptos and Sui chains are governed through their own public improvement-proposal processes — the [Aptos AIP repository](https://github.com/aptos-foundation/AIPs) and the [Sui SIP repository](https://github.com/sui-foundation/sips) — which is where chain-level post-quantum commitments such as AIP-137 are tracked.

No public security-disclosure venue (a bug-bounty page or canonical security contact) and no named, dated audit history were located on Martian's primary sources. A future post-quantum commitment, if Pontem makes one, would most plausibly surface on the wallet's site or blog, or follow the activation of a chain-side proposal like AIP-137.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
