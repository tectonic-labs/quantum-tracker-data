# Xverse Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Xverse Wallet |
| **Vendor** | Secret Key Labs |
| **Category** | Software |
| **Custody model** | Self-custody EOA with a BIP-39 seed phrase; optional hardware co-sign via Ledger or Keystone, and multisig through the third-party Asigna integration. |
| **Website** | [xverse.app](https://www.xverse.app/) |
| **GitHub** | [github.com/secretkeylabs](https://github.com/secretkeylabs) |
| **Platforms** | Browser extension (Chromium), iOS, Android, and a read-only web portfolio. No standalone desktop app. |
| **Open source** | Mixed. The `sats-connect` dapp SDK is MIT-licensed; the browser-extension client ships under a custom proprietary source-available license that caps non-commercial derivative works at 1,000 monthly active users. |
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

Xverse is a Bitcoin-ecosystem wallet covering Bitcoin, Stacks, Starknet, Spark, Bitlayer, and the Lightning Network, with a PSBT-native signing flow built around the Sats Connect dapp connector. Today it signs exclusively with classical elliptic-curve cryptography — ECDSA and Schnorr on secp256k1 for Bitcoin, secp256k1 ECDSA for Stacks, and Stark-curve ECDSA for Starknet — and ships no post-quantum signing path. No published Xverse or Secret Key Labs statement, roadmap, or security document on post-quantum migration was found as of the information date of this report.

The most architecturally interesting aspect of Xverse's PQC outlook comes from the chains it supports rather than from anything the wallet ships. Stacks runs the Clarity smart-contract VM, which exposes hashing primitives suitable for on-chain verification of hash-based signatures, and Bitcoin has the merged-but-not-active [BIP-360 (P2QRH)](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki) proposal. Neither path is wired into the wallet today.

## Proposed and Implemented PQC Algorithms

Xverse does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

No chain Xverse supports has an active protocol-level post-quantum signature scheme, and no on-chain post-quantum primitive that the wallet could route through is deployed today. With no live post-quantum surface in Xverse's chain set to take a position on, this column does not apply.

## Crypto Agility

**Rating: No** ❌

Xverse hard-codes a fixed signer set — secp256k1 ECDSA and Schnorr for Bitcoin, secp256k1 ECDSA for Stacks, and Stark-curve ECDSA for Starknet — with no plugin, Snap, or keyring API. The dapp-facing [Sats Connect](https://docs.xverse.app/) provider exposes a fixed catalog of chain-specific methods and has no surface for signing with an arbitrary scheme. Adding a new signing algorithm therefore requires a vendor code change rather than a third-party extension.

The wallet client's proprietary source-available license, which caps non-commercial derivative works at 1,000 monthly active users, also forecloses the community-fork path: a widely distributed independent fork that adds a new signing scheme would need negotiated commercial terms with the vendor. The MIT-licensed `sats-connect` SDK is unaffected, so dapp-side integration work is not gated by the license. The keystore is a standard BIP-39 plus per-chain HD derivation and is not extended for alternative key formats.

## Protocol PQC

**Rating: N/A** ➖

Xverse supports Bitcoin, Stacks, Starknet, Spark, Bitlayer, and the Lightning Network. None of these chains enforces a post-quantum signature scheme at the protocol layer for user transactions, so there is no protocol-level post-quantum scheme for the wallet to sign with. This column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

This is the column where Xverse's chain set creates a real, if not-yet-realized, path. Two of the chains Xverse supports have a credible route to verifying a post-quantum signature in on-chain code:

- **Bitcoin** — [BIP-360 (P2QRH)](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki) defines a quantum-resistant address type. It was merged into the BIP repository but is not active on Bitcoin mainnet, and Xverse ships no UI for P2QRH addresses. A working BIP-360 implementation has been demonstrated on a [separate test network](https://thequantuminsider.com/2026/03/20/btq-technologies-implements-bip-360-quantum-resistant-bitcoin-transactions-testnet/), not on Bitcoin mainnet.
- **Stacks** — the Clarity smart-contract VM exposes hashing primitives (`sha256`, `sha512/256`, `keccak256`) that could support an on-chain verifier for a hash-based signature. Combined with sBTC, a Bitcoin-backed asset that Clarity contracts can gate, this is in principle a route to post-quantum-gated Bitcoin-equivalent custody. No such verifier contract is deployed on Stacks mainnet, and Xverse exposes none.

Xverse's [PSBT-native](https://docs.xverse.app/) signing flow is a structural fit for a future BIP-360 input or output type. As of the information date, no on-chain post-quantum verifier is deployed on any chain Xverse supports, and no vendor integration work is publicly committed — the rating reflects the architectural path on the watch list, not a shipped or in-flight integration.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Xverse in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Xverse is developed by Secret Key Labs, a private company; product decisions, the feature roadmap, and security posture are set by the company team. There is no DAO, no on-chain governance over the wallet, and no native Xverse or Secret Key Labs token.

Product announcements are published on the [Xverse blog](https://www.xverse.app/), and security information — covering self-custody, encrypted device storage, audits, biometric authentication, and the Ledger and Asigna integrations — is collected on the [security page](https://www.xverse.app/security), which carries no post-quantum references. A post-quantum commitment, were one made, would most plausibly surface on the blog, the security page, or a published roadmap. Audits have been referenced via Least Authority; no formal public bug-bounty program was located at a canonical Xverse URL as of the information date.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
