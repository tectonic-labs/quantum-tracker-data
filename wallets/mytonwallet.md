# MyTonWallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | MyTonWallet |
| **Vendor** | Anyway Labs |
| **Category** | Software |
| **Custody model** | EOA self-custody — a BIP-39 / 24-word TON mnemonic held by the user; on TON the on-chain address is itself a wallet smart contract (v3/v4/w5) seeded from that key. Optional Ledger hardware co-sign for TON. No native MPC/TSS, no social recovery. |
| **Website** | https://mytonwallet.io/ |
| **GitHub** | https://github.com/mytonwallet-org/mytonwallet |
| **Platforms** | Browser extension (Chrome, Firefox, Edge, Brave, Opera), mobile (iOS, Android), desktop (macOS, Windows, Linux), web app, and a Telegram Mini App. Hardware signing via third-party Ledger integration for TON. |
| **Open source** | Open source — a single GPL-3.0 monorepo holding all clients. |
| **First release** | 2023 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

MyTonWallet is a community-built, TON-primary software wallet from Anyway Labs, shipped across browser extension, mobile, desktop, web, and a Telegram Mini App. It supports TON, TRON, Solana, and a set of EVM chains added in early 2026 (Ethereum, Base, BNB Chain, Polygon, Arbitrum, Monad, Avalanche, Hyperliquid), with Bitcoin announced but not yet shipped. Signing today is entirely classical: Ed25519 for TON and Solana, ECDSA over secp256k1 for TRON and the EVM chains.

No published Anyway Labs or MyTonWallet statement on post-quantum cryptography was found, and the wallet ships no post-quantum signing path on any supported chain. The one structural opening is on TON: every TON account is already a smart contract, and the w5 wallet-contract standard supports arbitrary on-chain extensions, so a post-quantum verifier could in principle be deployed there without a TON protocol change. MyTonWallet currently ships only the standard v3/v4/w5 contracts, with no such extension in production.

## Proposed and Implemented PQC Algorithms

MyTonWallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

This column does not apply. The intel review found no published Anyway Labs or MyTonWallet material on post-quantum cryptography — no roadmap item, security white paper, blog post, or social thread on quantum migration. The wallet's public security materials (its [CertiK Skynet listing](https://skynet.certik.com/projects/mytonwallet), audit, and SkyShield bug bounty) all address classical smart-contract and operational risk. With no public statement either committing to or deprioritizing PQC, there is no stated stance to rate.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for MyTonWallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

**Current state.** MyTonWallet ships a fixed signer set — Ed25519 for TON and Solana, ECDSA over secp256k1 for TRON and the EVM chains — chosen per chain. There is no documented plugin API for third parties to add new account types or signing schemes, and no Snap-style runtime extension surface. The keystore is a BIP-39 mnemonic with per-chain HD derivation. Because the wallet is published as a [GPL-3.0 monorepo](https://github.com/mytonwallet-org/mytonwallet), a community fork could in principle add a new signer to the build, but that would require a vendor pull request rather than a runtime configuration change.

## Protocol PQC

**Rating: N/A** ➖

This column does not apply. MyTonWallet supports TON, TRON, Solana, and a set of EVM chains, and announces Bitcoin support; none of these chains exposes a protocol-level post-quantum signature scheme that the wallet could sign user transactions with. With no supported chain offering a protocol-native post-quantum path, there is nothing for this column to measure.

## Contract PQC Support

**Rating: Yes-but** *️⃣

**Current state.** MyTonWallet does not yet route any transaction through smart-contract bytecode that verifies a post-quantum signature. On TON it ships the standard v3/v4/w5 wallet contracts as-is; on the EVM chains added in early 2026 it treats accounts as plain EOAs, with no ERC-4337 or EIP-7702 integration documented.

**Planned future work.** The structural lever sits on TON. Every TON account is itself a smart contract, and the w5 wallet-contract standard supports arbitrary on-chain extensions delivered via internal messages — see the [TON wallet contract specification](https://docs.ton.org/v3/documentation/smart-contracts/contracts-specs/wallet-contracts) and the [w5 reference implementation](https://github.com/ton-blockchain/wallet-contract-v5). That extension mechanism could host an on-chain post-quantum verifier without a TON protocol change. MyTonWallet inherits this w5 design from upstream TON wallet-contract work rather than authoring it, and tracks that upstream rather than leading it. No post-quantum verifier extension is in production in the wallet today.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for MyTonWallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

**Current state.** The wallet uses standard browser TLS to reach RPC endpoints and vendor backends. It has no native MPC, so there is no MPC handshake, and no passkey/WebAuthn signer is documented in the signing flow. No post-quantum-protected transport, handshake, or backup path was found anywhere in the wallet.

## Vendor & Governance

MyTonWallet is developed by Anyway Labs, a company-led project with a community-facing development surface via its [GPL-3.0 monorepo](https://github.com/mytonwallet-org/mytonwallet). There is no DAO and no on-chain governance over the wallet itself. Anyway Labs operates independently of the TON Foundation.

Product direction and any future post-quantum commitments would most likely surface in the project's [GitHub repository](https://github.com/mytonwallet-org/mytonwallet) or its [help center](https://help.mytonwallet.io/).

For security disclosure, MyTonWallet runs a CertiK SkyShield bug bounty (active since March 2024) with reserved funds and per-disclosure rewards, and has undergone a CertiK audit; details are published on its [CertiK Skynet project page](https://skynet.certik.com/projects/mytonwallet). No on-record, dated post-quantum milestone published by the vendor was found.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
