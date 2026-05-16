# Coinbase Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Coinbase Wallet |
| **Vendor** | Coinbase |
| **Category** | Smart Contract |
| **Custody model** | Two products under one brand: Coinbase Wallet (legacy non-custodial, EOA with a 12-word BIP-39 seed phrase) and Coinbase Smart Wallet (an ERC-4337 smart-contract account secured by a passkey, no seed phrase). |
| **Website** | https://www.coinbase.com/wallet (Coinbase Wallet); https://keys.coinbase.com/ (Coinbase Smart Wallet) |
| **GitHub** | https://github.com/coinbase |
| **Platforms** | Browser extension (Chrome, Brave) and iOS / Android mobile app for legacy Coinbase Wallet; a web app at keys.coinbase.com plus an SDK-embeddable surface for Coinbase Smart Wallet. No standalone desktop client and no hardware device. |
| **Open source** | Mixed. The Coinbase Smart Wallet contracts are open source (MIT) and the wallet SDKs are open source (Apache-2.0); the consumer extension and mobile app binaries are proprietary. |
| **First release** | Coinbase Wallet launched 2017 (originally "Toshi"); the standalone browser extension launched April 2022; Coinbase Smart Wallet launched mainnet June 5, 2024. |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | Yes | ✅ | Shipped |
| Crypto Agility | Yes | ✅ | Shipped |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | No | ❌ | Not Engaged |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Coinbase is the most publicly vocal wallet vendor on post-quantum cryptography. In April 2026 its Quantum Advisory Council [published a position paper](https://www.coinbase.com/blog/coinbase-quantum-advisory-council-publishes-position-paper-on-quantum-computing-and-blockchain) concluding that a quantum computer capable of breaking blockchain cryptography will eventually be built and that the industry should begin migrating now, and Coinbase CEO Brian Armstrong has [publicly backed an industry effort](https://thequantuminsider.com/2026/04/03/coinbase-ceo-addresses-quantum-threat-to-cryptocurrencies/) to accelerate Bitcoin's transition to quantum-resistant cryptography. Coinbase has also stated it is building systems flexible enough to adopt new cryptographic standards quickly.

That said, the public posture and the shipping product are out of phase. As of the information underlying this report, no post-quantum signature scheme ships in either Coinbase Wallet or Coinbase Smart Wallet user flow. The Smart Wallet's existing P-256 / passkey signer — verified entirely in EVM bytecode — is a concrete architectural precedent for a future post-quantum verifier, but no such verifier has been deployed.

## Proposed and Implemented PQC Algorithms

Coinbase Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: Yes** ✅

Coinbase has made post-quantum cryptography an on-the-record corporate priority. In April 2026 the Coinbase Quantum Advisory Council [published a position paper](https://www.coinbase.com/blog/coinbase-quantum-advisory-council-publishes-position-paper-on-quantum-computing-and-blockchain) stating that a quantum computer powerful enough to break blockchain cryptography will eventually be built and that the industry must begin migrating to quantum-resistant security now; the paper also describes Coinbase building systems flexible enough to adopt new cryptographic standards quickly and working with hardware and infrastructure partners on upgrade readiness. Separately, CEO Brian Armstrong has [publicly led an industry coalition](https://thequantuminsider.com/2026/04/03/coinbase-ceo-addresses-quantum-threat-to-cryptocurrencies/) to accelerate Bitcoin's transition to quantum-resistant cryptography, with a focus on hash-based **Winternitz** signatures and a dual-signature model for gradual migration.

**Current state.** Coinbase has multiple dated, public statements about post-quantum readiness. These are vendor-level commitments rather than shipped wallet features, and a separately announced "quantum-proof" custody offering targeted for late 2026 belongs to Coinbase's institutional custody product, not to the Coinbase Wallet or Coinbase Smart Wallet consumer products.

**Planned future work.** No specific quarter or version target has been published for post-quantum work in the consumer Coinbase Wallet or Coinbase Smart Wallet products.

## Crypto Agility

**Rating: Yes** ✅

Coinbase Smart Wallet is built on an ERC-4337 smart-contract account whose `MultiOwnable` design accepts heterogeneous owner types per account. It already ships with a non-secp256k1 signer: a **P-256 / WebAuthn passkey** that is verified entirely in EVM bytecode (via the RIP-7212 precompile where a chain supports it natively, or a FreshCryptoLib fallback verifier otherwise). The Smart Wallet contract also implements the EIP-1271 `isValidSignature` interface per account. Sources: [Smart Wallet contracts](https://github.com/coinbase/smart-wallet); [Smart Wallet mainnet launch](https://www.coinbase.com/blog/a-new-era-in-crypto-wallets-smart-wallet-is-here).

**Current state.** The Smart Wallet has shipped, audited, and operated a non-secp256k1 signature verifier in EVM bytecode at production scale since June 2024. Adding a new owner-type backed by a different signature scheme is, architecturally, the same kind of change that adding the existing passkey owner-type was — a new signature-wrapper variant plus a Solidity verifier plus a `MultiOwnable` owner-type entry. The contracts are MIT-licensed and therefore forkable. The legacy Coinbase Wallet, by contrast, is a conventional EOA wallet fixed to BIP-39 with secp256k1 and Ed25519 signing, and is not user-configurable.

**Planned future work.** No post-quantum owner-type or verifier has been deployed by Coinbase, and no roadmap line item announcing one for the consumer wallet products was found.

## Protocol PQC

**Rating: N/A** ➖

Protocol PQC measures whether a wallet signs user transactions with a chain's protocol-level post-quantum scheme on a PQC-native chain it supports. Coinbase Wallet's chain set is EVM-centric plus a small fixed non-EVM group — Solana, Bitcoin, Dogecoin, Litecoin — and none of these chains provides a protocol-level post-quantum signature scheme for user transactions. Because no chain Coinbase Wallet supports exposes such a scheme, this column does not apply.

## Contract PQC Support

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Coinbase Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Coinbase Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Coinbase Wallet and Coinbase Smart Wallet are products of Coinbase Global, Inc., a public company traded on NASDAQ under the ticker COIN since April 2021. Governance follows standard public-company structures (board of directors, shareholders); there is no DAO and no token-based governance over either wallet product.

Product and post-quantum commitments from Coinbase surface through its corporate blog and, where applicable, the obligations that attach to a public company. Dated, on-record post-quantum milestones published by the vendor itself include the Coinbase Quantum Advisory Council position paper (April 2026) and the CEO's public BIP-360 / Winternitz advocacy (April 2026).

Security issues are handled through Coinbase's HackerOne bug bounty program at https://hackerone.com/coinbase. The Coinbase Smart Wallet contracts have been audited; a canonical, dated audit list was not established from available sources and is omitted here.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
