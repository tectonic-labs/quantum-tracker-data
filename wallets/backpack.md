# Backpack Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Backpack Wallet |
| **Vendor** | Coral |
| **Category** | Software |
| **Custody model** | Self-custody EOA — single-party, BIP-39 seed phrase. Optional Ledger hardware co-sign. No native MPC. |
| **Website** | https://backpack.app/ |
| **GitHub** | https://github.com/coral-xyz/backpack |
| **Platforms** | Browser extension (Chrome and Chromium-based browsers); iOS and Android mobile apps. No standalone desktop app. |
| **Open source** | Open source — GPL-3.0. |
| **First release** | 2022 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | No | ❌ | Not Engaged |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Backpack is a Solana-first, multi-chain self-custodial wallet from Coral — the team behind the Anchor smart-contract framework — shipping as a browser extension and on iOS and Android. It signs Solana and Sui transactions with Ed25519 and EVM transactions with secp256k1 ECDSA across Ethereum, Polygon, Base, Optimism, Arbitrum, Monad, Sonic, and Berachain, with Bitcoin support as well. Its defining architectural feature is xNFTs — sandboxed applications that run inside the wallet — but those are applications layered over the wallet's existing accounts, not a mechanism for adding new signing schemes.

As of this report, Backpack ships no post-quantum cryptography in any production path, and no public Backpack- or Coral-authored statement, roadmap item, or security white paper on quantum migration was found. The wallet's code is open source under GPL-3.0, which leaves the door open for third-party experimentation, but no PQC integration work — first-party or community — has been identified.

## Proposed and Implemented PQC Algorithms

Backpack Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

PQC Stance does not apply here because no Backpack- or Coral-published statement on post-quantum cryptography could be located. The vendor's public material — its [main site](https://backpack.app/) and the [Backpack learn portal](https://learn.backpack.exchange/articles/best-evm-wallets) — emphasizes multi-chain breadth and self-custody and does not reference quantum-resistant, lattice-based, or hash-based signatures. With neither a commitment nor an explicit deprioritization on the record, there is no published stance to characterize.

## Crypto Agility

**Rating: No** ❌

Backpack hard-codes its signing schemes — Ed25519 for Solana and Sui, secp256k1 ECDSA for its EVM chains — and provides no way to load an alternative signature scheme without the vendor shipping a new release. The wallet's headline extensibility surface, [xNFTs](https://docs.xnfts.dev), is an application layer rather than a signer layer: an xNFT runs inside the wallet sandbox and consumes the wallet's existing accounts, but it cannot register a new keyring, custody model, or signing algorithm. The keystore is BIP-39 plus per-chain HD derivation and does not model alternative or stateful signing schemes.

**Current state.** Adding a new signature scheme to Backpack today would require a vendor change to the wallet's own code in the [`coral-xyz/backpack`](https://github.com/coral-xyz/backpack) repository — there is no pluggable-signer path that an external party or a configuration change could exercise.

## Protocol PQC

**Rating: N/A** ➖

Protocol PQC does not apply because none of the chains Backpack supports exposes a protocol-level post-quantum signature scheme that the wallet could sign user transactions with. Backpack's supported set — Solana, Sui, Bitcoin, and a cluster of EVM chains — relies on Ed25519 and secp256k1 ECDSA at the protocol layer, and Backpack supports no PQC-native chain. With no protocol-level PQC signing path available on any supported chain, there is nothing for this column to measure.

## Contract PQC Support

**Rating: No** ❌

Contract PQC Support measures whether the wallet signs through on-chain smart-contract bytecode that verifies a post-quantum signature, or has such integration publicly in flight. Backpack's home chain, Solana, has a live, hash-based on-chain primitive — the [Solana Winternitz Vault](https://github.com/deanmlittle/solana-winternitz-vault) — but Backpack ships no user interface for it. No other chain Backpack supports has a live deployed on-chain PQC primitive, and no first-party smart-account product comparable to a dedicated account-abstraction kit was located on the EVM side.

**Current state.** As an EOA wallet, Backpack produces classical signatures and can connect to account-abstraction-driven dapps that construct their own payloads, but the wallet itself ships no on-chain PQC verification path. No Backpack-side Winternitz Vault interface, and no community xNFT delivering that interface, was found.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Backpack Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Backpack Wallet is published by Coral, a private company; product decisions, the feature roadmap, and security posture are set by the company team, and there is no DAO or on-chain governance over the wallet. Any PQC commitment would surface through the vendor's own channels — its [main site](https://backpack.app/), the [Backpack learn portal](https://learn.backpack.exchange/articles/best-evm-wallets), and the public [`coral-xyz/backpack`](https://github.com/coral-xyz/backpack) repository.

The wallet is open source under GPL-3.0. A `SECURITY.md` file exists in the repository for vulnerability disclosure. The repository's README states the code is unaudited, and no public wallet-software audit reports were located.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
