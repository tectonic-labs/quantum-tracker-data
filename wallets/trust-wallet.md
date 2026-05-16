# Trust Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Trust Wallet |
| **Vendor** | Binance subsidiary |
| **Category** | Software |
| **Custody model** | EOA seed phrase by default (BIP-39), with an opt-in ERC-4337 smart-contract account (SWIFT, built on the Barz contracts). |
| **Website** | https://trustwallet.com/ |
| **GitHub** | https://github.com/trustwallet |
| **Platforms** | Mobile (iOS, Android) as the flagship product, plus a browser extension (Chrome, Firefox, Edge, Brave, Opera). No standalone desktop app. |
| **Open source** | Source-available: the cryptographic core (Wallet Core) and the smart-account contracts (Barz) are Apache-2.0; the mobile app distribution binary is proprietary. |
| **First release** | 2017 |

## Summary Ratings

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | Yes | ✅ | Shipped |
| Crypto Agility | Yes | ✅ | Shipped |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

## Summary

Trust Wallet is a mobile-first software wallet that covers a very broad chain base — Wallet Core, its open-source cross-chain library, supports 130+ blockchains. Today the wallet signs user transactions with classical cryptography across all of them: ECDSA on secp256k1 for EVM and Bitcoin, Ed25519 for Solana, Cosmos, TON and others, plus Schnorr and Sr25519 for specific chains. No post-quantum signing path ships in either Wallet Core or the smart-account contracts as of this report.

What sets Trust Wallet apart is its smart-account architecture. Trust Wallet SWIFT, the opt-in ERC-4337 account, is built on the open-source [Barz contracts](https://github.com/trustwallet/barz), which use the EIP-2535 Diamond proxy pattern with swappable signature-validator facets. Barz's developer documentation explicitly names "BLS & PQC" among the future signature schemes it intends to add as new facets, though no timeline or chosen primitive has been published. That makes the smart-account side the part of the stack with a concrete architectural path toward post-quantum signing.

## Proposed and Implemented PQC Algorithms

Trust Wallet does not currently ship or commit to any specific post-quantum cryptographic algorithm. Its smart-account developer documentation names "PQC" generally as a planned future signature-scheme addition, but no particular algorithm has been selected or committed to publicly.

## PQC Stance

**Rating: Yes** ✅

Trust Wallet has signalled intent at the architecture-documentation level. The [Barz smart-wallet developer documentation](https://developer.trustwallet.com/developer/barz-smart-wallet/introducing-barz-trustwallet-smart-wallet-solution) explicitly names "BLS & PQC" among the signature schemes it plans to add, stating that while Barz currently supports ECDSA on the secp256k1 and secp256r1 curves, support will continue to expand to additional schemes. This is the clearest on-record indication that post-quantum signing is in the vendor's stated forward plans.

**Current state.** The PQC mention is confined to the Barz developer documentation. No standalone post-quantum statement, blog post, or roadmap item from Trust Wallet was located. Trust Wallet's broader [2026 product roadmap](https://decrypt.co/340164/trust-wallet-unveils-bold-new-roadmap-to-onboard-the-next-billion-users-powered-by-twt) emphasizes onboarding, token governance, multi-chain expansion, and stablecoin earn, and does not include post-quantum line items.

**Planned future work.** The developer documentation names "BLS & PQC" as future signature-validator facet additions for the Barz smart account, but gives no timeline, no selected primitive, and no published milestone.

## Crypto Agility

**Rating: Yes** ✅

The Barz smart-contract account is built for swappable signing. It uses the EIP-2535 Diamond proxy pattern, where the signature scheme is decided by an attached validator facet. A new validator facet can be added to a deployed Barz account without redeploying the account, and Barz already ships more than one validation scheme in production — ECDSA on secp256k1 and ECDSA on secp256r1 (passkey/WebAuthn). Source: [Barz announcement](https://trustwallet.com/blog/developer/introducing-barz-smart-contract-wallet-solution) and the [Barz contracts](https://github.com/trustwallet/barz).

**Current state.** Agility is real on the smart-account side: the facet model is the architectural lever by which a deployed Barz account could gain an additional signature scheme contract-side. On the default EOA path, signing schemes are fixed per chain in Wallet Core; adding a new scheme there requires an upstream code change and a follow-on app release. Both [Wallet Core](https://github.com/trustwallet/wallet-core) and Barz are Apache-2.0, which keeps the contribution path open.

**Planned future work.** The Barz developer documentation names "BLS & PQC" as intended future facet additions; no timeline is given.

## Protocol PQC

**Rating: N/A** ➖

None of the chains Trust Wallet supports exposes a protocol-level post-quantum signature scheme that the wallet could sign user transactions with, so this column does not apply. Among the supported chains, Algorand uses post-quantum cryptography only inside its in-protocol State Proofs — a validator-side mechanism — while ordinary Algorand user transactions use Ed25519, which is what Trust Wallet signs.

## Contract PQC Support

**Rating: Yes-but** *️⃣

Trust Wallet's smart-account stack provides the on-chain plumbing that a post-quantum verifier could plug into, but no post-quantum verifier is deployed yet. Trust Wallet SWIFT, announced as a public beta in February 2024, is an ERC-4337 smart-contract wallet built on the [Barz contracts](https://github.com/trustwallet/barz), deployed across eight EVM mainnets (Ethereum, BNB Chain, opBNB, Polygon, Avalanche, Base, Optimism, and Arbitrum). Barz's EIP-2535 Diamond proxy uses per-feature facets, including a signature-validation facet, and a [January 2025 Etherspot integration](https://chainwire.org/2025/01/28/trust-wallet-integrates-etherspots-erc-4337-solutions-to-enhance-barz-smart-accounts/) added bundler and paymaster support.

**Current state.** The architecture is in production and the signature-validator facet is the same surface a future post-quantum validator would attach to. What is shipped today verifies classical schemes only — ECDSA on secp256k1 and the secp256r1 passkey path. No on-chain post-quantum verifier facet has been published.

**Planned future work.** The [Barz developer documentation](https://developer.trustwallet.com/developer/barz-smart-wallet/introducing-barz-trustwallet-smart-wallet-solution) explicitly names "BLS & PQC" as planned future signature-validator facet additions. No shipping date has been published.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Trust Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Trust Wallet is a wholly-owned subsidiary of Binance, which acquired it in July 2018 ([TechCrunch](https://techcrunch.com/2018/07/31/crypto-exchange-binance-buys-trust-wallet-in-first-acquisition-deal/), [Fortune](https://fortune.com/2018/07/31/binance-trust-wallet-acquistion/)). It operates as an independent product brand under the Binance umbrella, distinct from the separate Binance Web3 Wallet ([CoinDesk](https://www.coindesk.com/business/2023/11/08/trustwallets-twt-falls-as-parent-company-binance-releases-web3-wallet)).

Product direction is communicated through Trust Wallet's own blog and developer site, and through general coverage of its published roadmaps. The Barz developer documentation is where signature-scheme plans, including the "BLS & PQC" mention, currently surface. Trust Wallet has also announced a DAO governance layer for its TWT token covering certain product and community decisions.

The Barz contracts have an audit folder in the public [`trustwallet/barz`](https://github.com/trustwallet/barz) repository referencing a Halborn audit. Wallet Core and Barz are both published under Apache-2.0, which leaves a clean license path for external contribution of new chain modules or validator facets.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
