# Leo Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Leo Wallet |
| **Vendor** | Provable Inc. (formerly Demox Labs) |
| **Category** | Software |
| **Custody model** | Single-party self-custody (EOA-style Aleo private key) |
| **Website** | https://www.leo.app/ |
| **GitHub** | https://github.com/ProvableHQ |
| **Platforms** | Browser extension (Chrome / Brave), iOS, Android |
| **Open source** | Source-available in part: the Aleo wallet adapter SDK is MIT-licensed; the production wallet client's source status is not publicly established |
| **First release** | 2023 |

## Summary Table

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | No | ❌ | Not Engaged |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

## Summary

Leo Wallet is a privacy-focused self-custody wallet for the Aleo blockchain, originally built by Demox Labs and now owned by Provable Inc., which [announced its acquisition of the wallet on 17 November 2025](https://provable.com/blog/provable-acquires-leo-wallet). Provable has positioned a successor product, Shield, as the home for all forward development; Leo Wallet itself is in maintenance mode per the migration banner on [its product site](https://www.leo.app/). Across both Leo and the Shield successor line, no post-quantum cryptography ships today.

The wallet signs Aleo transactions with the chain's native Schnorr scheme over the Edwards BLS12 curve, and the Shield successor adds Ed25519 (Solana) and secp256k1 (Bitcoin) signing — all of them classical elliptic-curve schemes. No public post-quantum roadmap or statement from the vendor was found, and no post-quantum signing path is available in production. Because Aleo is a privacy chain, a future quantum break carries a structural consequence beyond key theft: the cryptographic material protecting the ledger could be broken retroactively, exposing historical transaction content that the chain was designed to keep private — a [retroactive-decryption risk that a later migration does not undo](https://news.bitcoin.com/the-retroactive-decryption-trap-why-post-quantum-upgrades-cant-save-your-past-privacy/).

## Proposed and Implemented PQC Algorithms

Leo Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

Provable owns both Leo Wallet and its successor Shield, and product and security decisions are made at the company level. No Leo Wallet, Demox Labs, Provable, or Shield public statement on post-quantum cryptography was located. Searches across the vendor's blog channels, the [Shield launch announcement](https://aleo.org/post/introducing-shield-the-private-crypto-wallet/), the [Shield launch press release](https://www.businesswire.com/news/home/20260217073721/en/Provable-and-Aleo-Launch-Shield-Wallet-as-Privacy-Hits-a-Tipping-Point-Delivering-the-First-Complete-Infrastructure-for-Private-Stablecoins), and the vendor's GitHub organizations returned no vendor-authored content on the quantum threat. Third-party commentary has described the broader Aleo ecosystem as "exploring" post-quantum work, but those are community framings rather than vendor announcements with timelines or code.

Because the vendor has neither published a post-quantum commitment nor an explicit deprioritization, there is no posture on record to evaluate, so this column does not apply.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Leo Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

The wallet hard-codes the Aleo Schnorr-over-Edwards-BLS12 signing scheme, and the Shield successor adds fixed Ed25519 and secp256k1 paths for Solana and Bitcoin. Neither product ships a plugin or extension API that would let a new signing algorithm be added without the vendor shipping a new release, and the Aleo native account format is tied to its elliptic-curve key group. Adding a new scheme would require vendor changes to key derivation, the account format, and on-chain encoding.

## Protocol PQC

**Rating: N/A** ➖

Leo Wallet supports only the Aleo blockchain, and the Shield successor adds Solana and Bitcoin. None of these chains provides a protocol-level post-quantum signature scheme that the wallet could sign user transactions with, so this column does not apply.

## Contract PQC Support

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Leo Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Aleo programs are circuit-style smart contracts that could, in principle, host a custom signature verifier, but no deployed Aleo post-quantum verifier program has been located, and neither Leo nor the Shield successor exposes any UI for one. The Shield successor's Solana support does not engage with Solana's on-chain hash-based vault primitive, and no other supported chain has a live deployed post-quantum contract.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Leo Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

The wallet uses standard browser TLS for transport to RPC and backend endpoints, has no native multi-party computation handshake, and does not expose a passkey or WebAuthn ceremony. No post-quantum mechanism was identified anywhere in the off-chain wallet flow.

## Vendor & Governance

Leo Wallet is developed by Provable Inc., a private company, which set the product direction after [acquiring the wallet from Demox Labs](https://www.leo.app/blog/provable-acquires-leo-wallet) in a transaction announced on 17 November 2025. Product and security decisions for Leo and its Shield successor are made by Provable; there is no DAO or token-holder vote over wallet decisions. Aleo chain governance is handled separately by the Aleo Network Foundation.

Product commitments are disclosed through the vendor's blog channels and launch announcements; any post-quantum commitment would be expected to surface there first. A canonical security disclosure venue and a wallet-specific audit history page were not located at the time of this report. The underlying Aleo chain stack has [completed multiple security audits](https://aleo.org/post/aleo-completes-security-audits-of-snarkos-and-snarkvm/), but those cover the chain software rather than the wallet client. No dated, on-record post-quantum milestone published by the vendor was found.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
