# Zeal — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Zeal |
| **Vendor** | GRWTH LBS LTD |
| **Category** | Smart Contract |
| **Custody model** | Smart-contract account (Safe 1.4.1) with an on-chain passkey validator and a local-key co-owner; non-EOA by default. |
| **Website** | https://www.zeal.app/ |
| **GitHub** | https://github.com/zealwallet |
| **Platforms** | Browser extension (Chrome, Brave, Edge) and mobile (iOS, Android). No standalone desktop app, no first-party hardware device. |
| **Open source** | Proprietary — the `zealwallet` GitHub organization currently has no public repositories. |
| **First release** | 2023 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | Yes | ✅ | Shipped |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Zeal is an EVM-only wallet built by GRWTH LBS LTD, a UK company founded by an ex-Revolut growth executive and backed in part by a strategic investment from Gnosis. Its defining trait is that every Zeal wallet is a deployed Safe 1.4.1 smart-contract account from day one — there is no plain externally-owned-account mode. Each Safe carries at least two owners: a per-user on-chain passkey validator contract that authenticates a WebAuthn/P-256 signature from the device's secure enclave, and a local private key on the device that adds a second confirmation. Gas is sponsored by Zeal so users do not need to hold a chain's native token.

No public statement from Zeal about post-quantum cryptography was located — no roadmap, no quantum-resistance positioning, and no committed migration work. The signature schemes in production today (P-256 passkeys, secp256k1 for the local key, and EIP-712 typed data over secp256k1) are all classical elliptic-curve cryptography. What stands out is the architecture rather than any shipped post-quantum feature: because Zeal already deploys a custom on-chain validator contract for each user, the same contract slot is, by construction, able to host a different signature scheme without re-architecting the product.

## Proposed and Implemented PQC Algorithms

Zeal does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

This column does not apply to Zeal in a way that produces a Yes/No verdict: no public statement on post-quantum cryptography from the vendor was located. Searches across Zeal's website, documentation, blog, GitHub organization, and social channels returned no post-quantum roadmap, no named post-quantum algorithm, and no quantum-resistance positioning. Zeal's product communications focus on stablecoin yield, the Gnosis Pay card integration, passkey-based onboarding, and removing seed phrases and gas — there are no post-quantum line items to assess.

## Crypto Agility

**Rating: Yes** ✅

Zeal's smart-account architecture gives it a production-grade path for changing how a transaction is authorized without re-architecting the wallet. Every Zeal wallet is a Safe 1.4.1 smart-contract account, and on-chain owner-signature validation runs through Safe's `checkSignatures` flow. Zeal already exploits this: rather than relying on a fixed signer, it deploys a custom on-chain validator contract per user — the WebAuthn/P-256 passkey verifier — and registers it as a Safe owner. Adding or substituting a signature scheme is therefore a swap-the-Safe-owner operation against an existing production pattern, not a new product line ([Zeal docs — using a smart wallet without Zeal](https://docs.zeal.app/expert-guides/using-a-smart-wallet-without-zeal); [Zeal smart-wallet page](https://www.zeal.app/fr/smart-wallet)).

**Current state.** The pluggable on-chain validator slot is live in production today for every Zeal user, hosting a P-256 passkey verifier. The same slot is the architectural place an alternative verifier would occupy. Zeal does not currently expose a user-facing control to swap the validator, and the local-key path is a fixed secp256k1 derivation; the agility is at the smart-account-architecture level rather than a configurable wallet setting.

## Protocol PQC

**Rating: N/A** ➖

Zeal is EVM-only and supports a small set of EVM chains (Ethereum, Gnosis, Polygon, Arbitrum, Optimism, with Base implied by its EVM coverage). None of these chains has a protocol-level post-quantum signature scheme that a wallet could sign user transactions with, so this column does not apply to Zeal.

## Contract PQC Support

**Rating: N/A** ➖

This column measures whether a wallet signs with a post-quantum signature that is verified by deployed on-chain smart-contract bytecode. As of the information date, no EVM chain that Zeal supports has a deployed on-chain post-quantum verification primitive for a wallet to route through. Zeal's smart-account substrate — Safe `checkSignatures` with custom per-user validator contracts — is the kind of plumbing such a primitive would use, but no post-quantum verifier has been deployed for Zeal users to engage with, so the column does not apply today.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Zeal in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Zeal is a company-led product. The operating entity is GRWTH LBS LTD, a UK company; there is no DAO and no on-chain governance, and there is no native Zeal token. Product decisions, and any future post-quantum commitments, would surface through Zeal's own website and documentation rather than a governance forum.

Zeal markets a stated commitment to a minimum of two security audits per year. Specific audit firms and published audit reports were not located, and a canonical public security-disclosure venue was not confirmed. The Safe 1.4.1 contracts that Zeal builds on are audited independently through Safe's own audit process.

Authentication, wallet creation, and recovery infrastructure for Zeal run through Privy, a third-party provider. Any change to that provider's cryptographic posture would carry through to Zeal.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
