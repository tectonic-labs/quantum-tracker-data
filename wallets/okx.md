# OKX Web3 — Public PQC Readiness Report

| | |
|---|---|
| **Name** | OKX Web3 Wallet |
| **Vendor** | OKX |
| **Category** | Software |
| **Custody model** | EOA (BIP-39 seed phrase) by default, plus an opt-in Keyless Wallet (MPC-TSS, 2-of-3) and an opt-in Smart Account (ERC-4337). |
| **Website** | https://web3.okx.com/ |
| **GitHub** | https://github.com/okx |
| **Platforms** | Browser extension (Chrome, Firefox, Edge, Brave), mobile (iOS, Android), and a hosted web app. No standalone desktop binary. |
| **Open source** | Mixed. The user-facing browser extension and mobile client are proprietary; OKX has open-sourced its multi-chain signature SDKs and its threshold-signature library separately. |
| **First release** | 2022 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

The OKX Web3 Wallet is a non-custodial, multi-chain wallet covering Ethereum, BNB Chain, Bitcoin, Solana, TON, and a broad set of EVM L2s and non-EVM chains. It ships three custody styles in one product — a classic seed-phrase EOA, a 2-of-3 MPC "Keyless Wallet," and an opt-in [ERC-4337 Smart Account](https://web3.okx.com/learn/everything-you-need-to-know-about-okx-wallets-smart-account). All three terminate in classical ECDSA secp256k1 or Ed25519 signatures on chain.

As of the date below, no OKX-authored product roadmap or position statement on post-quantum cryptography for the wallet was found. OKX's learn library publishes educational articles on quantum threats to blockchains, but these are explainers, not product commitments. The wallet's most relevant post-quantum lever today is its production Smart Account: an ERC-4337 account verifies signatures in on-chain bytecode and could in principle host a post-quantum verifier, though OKX has not announced or shipped one.

## Proposed and Implemented PQC Algorithms

OKX Web3 does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

OKX has not published a post-quantum roadmap or position statement for the OKX Web3 Wallet, and the wallet ships no post-quantum signing path today. OKX's [learn library](https://www.okx.com/en-us/learn/blockchain-quantum-a16z-future-cryptography) carries educational pieces on quantum threats to blockchain, including a [second article on quantum risk to Bitcoin cryptography](https://www.okx.com/en-us/learn/quantum-bitcoin-cryptography-threats), but these are explainer content rather than product commitments — they announce no PQC plans for the wallet. Because there is neither a published commitment nor an explicit on-record deprioritization to point at, this column is recorded as not applicable rather than as engagement or non-engagement.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for OKX Web3 in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

The wallet ships a fixed set of signature schemes. New chain or signer support is added in-house by OKX engineering through its multi-chain SDKs ([js-wallet-sdk](https://github.com/okx/js-wallet-sdk), [go-wallet-sdk](https://github.com/okx/go-wallet-sdk)) and then shipped in a new client release; there is no third-party plugin path that would let an outside team add a new signature scheme without a vendor release. The user-facing client is closed source, and the open-sourced [threshold-lib](https://github.com/okx/threshold-lib) MPC library — which is specific to ECDSA and Ed25519 — was archived to read-only in November 2024.

## Protocol PQC

**Rating: N/A** ➖

OKX Web3 supports a wide range of chains, but none of them expose a protocol-level post-quantum signature scheme for user transactions. The wallet signs user transactions on every supported chain with classical schemes (ECDSA secp256k1, Ed25519, and Schnorr/BIP-340 for Bitcoin Taproot). With no supported chain offering an in-protocol post-quantum signing path, this column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

OKX Web3 ships a production [ERC-4337 Smart Account](https://web3.okx.com/learn/everything-you-need-to-know-about-okx-wallets-smart-account), an opt-in smart-contract account available on Ethereum and major EVM L2s, with features such as gas payment in stablecoins via paymaster, social recovery, and batched transactions. OKX has positioned itself as the first major crypto wallet to make use of ERC-4337.

**Current state.** The ERC-4337 architecture means signature verification for a Smart Account runs in on-chain contract bytecode, and that bytecode could in principle delegate signature checking to a post-quantum verifier. That architectural path exists in production, but OKX has not shipped or announced a post-quantum verifier contract — the smart-account plumbing is present, the post-quantum verification is not. OKX has also published an explainer on [ERC-7579 modular smart accounts](https://web3.okx.com/learn/how-erc-7579-works), and an [account abstraction / EIP-4337 overview](https://web3.okx.com/learn/a-quick-and-simple-guide-to-account-abstraction-and-eip-4337). On Solana, where a hash-based on-chain primitive (Winternitz Vault) exists, OKX Web3 does not surface any UI or ceremony for it.

**Planned future work.** No dated, on-record milestone for a contract-level post-quantum verifier was found. The rating reflects shipped smart-account architecture that is capable of hosting on-chain post-quantum verification, not a delivered post-quantum integration.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for OKX Web3 in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

The Keyless Wallet's 2-of-3 MPC threshold signing is a custody design rather than a new cryptographic scheme: it produces standard ECDSA secp256k1 or Ed25519 signatures, and the threshold protocol and cloud-share encryption use classical primitives (see [threshold-lib](https://github.com/okx/threshold-lib)). Transport security to RPC and vendor backends relies on standard browser TLS, and the iCloud / Google Drive share backup relies on those services' classical encryption. No off-chain post-quantum mechanism was identified.

## Vendor & Governance

OKX Web3 is developed by OKX (OK Group), a private company; the wallet roadmap and chain integrations are decided by OKX management rather than by a DAO or token-weighted governance. OKB is the OKX exchange utility token and is not a wallet-governance token.

Product announcements and explainer content are published through OKX's web3 site and learn library, which is where a wallet-level PQC commitment would be expected to surface. Security disclosures are handled through bug bounty programs on [HackerOne](https://hackerone.com/okg) and [HackenProof](https://hackenproof.com/programs/okx). OKX lists third-party security partners — including CertiK, SlowMist, BlockSec, Elliptic, and Etherscan — on its [Web3 security page](https://web3.okx.com/security); dated individual audit reports are not aggregated on a single canonical page.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
