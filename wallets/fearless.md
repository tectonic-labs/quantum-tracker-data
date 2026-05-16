# Fearless Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Fearless Wallet |
| **Vendor** | Soramitsu (Soramitsu Co., Ltd.) |
| **Category** | Software |
| **Custody model** | Self-custody EOA — single user-held BIP-39 mnemonic per account, no native MPC. |
| **Website** | https://fearlesswallet.io/ |
| **GitHub** | https://github.com/soramitsu |
| **Platforms** | Mobile (iOS, Android) and a companion Chrome browser extension. |
| **Open source** | Open source — Apache License 2.0 for the iOS and Android codebases. |
| **First release** | 2020 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Fearless Wallet is a mobile-first, self-custody wallet built by Soramitsu for the Polkadot ecosystem, with a companion Chrome browser extension. It signs user transactions across Polkadot, Kusama, the SORA Network, a long tail of Substrate parachains, Ethereum and EVM chains, and TON — all using classical elliptic-curve schemes (Schnorrkel/sr25519, Ed25519, and ECDSA secp256k1). No post-quantum signing path ships in the wallet today, and no public Fearless or Soramitsu statement, roadmap, or repository activity on post-quantum migration of the wallet was found.

The one forward-looking signal is structural rather than wallet-specific: the broader Polkadot ecosystem has a published path toward a protocol-level post-quantum signature scheme, and a wallet of this type would inherit support if and when a chain it serves ships one. As of this report no such integration work is in flight in Fearless's own codebase.

## Proposed and Implemented PQC Algorithms

Fearless Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

This column tracks whether the vendor has publicly engaged with post-quantum cryptography for the wallet. No public statement on PQC from Fearless Wallet or Soramitsu was located — no roadmap, blog post, conference talk, or position paper addressing quantum migration of the wallet. Soramitsu is best known beyond consumer wallets as an enterprise blockchain engineering firm, and that enterprise work is a separate codebase from Fearless. Because there is no published wallet-level posture to characterize either way, this column does not apply.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Fearless Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Fearless ships a fixed signer set — Schnorrkel/sr25519, Ed25519, and ECDSA secp256k1 — and has no plugin or sandbox model that would let an outside party deliver a new signature scheme into the wallet without a vendor release. Adding a new keypair type would require coordinated code changes across the iOS (Swift), Android (Kotlin), and browser-extension (TypeScript) builds, and the wallet's [public repositories](https://github.com/soramitsu) and release history show no such work.

## Protocol PQC

**Rating: N/A** ➖

This column measures whether the wallet signs user transactions with a chain's protocol-level post-quantum scheme. None of the chains in Fearless's marketed set provides a protocol-level post-quantum signature scheme for user transactions today, so there is nothing for the wallet to sign with in this category and the column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

This column covers post-quantum signatures verified by on-chain contract or runtime logic, including integration work that is publicly in flight. Fearless has a strong chain-native account-abstraction surface on the Substrate side — it signs against `pallet-multisig`, `pallet-proxy`, and Pure Proxy ([anonymous](https://wiki.polkadot.network/docs/learn-proxies-pure)) account flows on the [Polkadot relay chain, Kusama, the SORA Network, and parachains](https://wiki.polkadot.network/docs/learn-proxies). These primitives are the structural place a post-quantum verifier could eventually be hosted.

**Current state.** No deployed post-quantum verifier is present on any chain Fearless supports, and the wallet does not route through one today. Its EVM provider is EOA-shaped, with no first-party ERC-4337 or paymaster plumbing.

**Planned future work.** The Polkadot ecosystem has a published path toward an on-chain post-quantum signature pallet; a wallet of this type would inherit support once such a pallet lands on a chain it serves. No in-flight Fearless-side integration pull request for that work has been located.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Fearless Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Fearless's off-chain surface — transport to RPC endpoints, key storage, recovery — uses standard classical cryptography. There is no first-party MPC product and no passkey/WebAuthn signing flow. No post-quantum-protected transport, handshake, or backup mechanism was identified.

## Vendor & Governance

Fearless Wallet is developed under the stewardship of Soramitsu Co., Ltd., a Japan-headquartered fintech engineering firm. Development is maintainer-led: the [`soramitsu` GitHub organization](https://github.com/soramitsu) is the canonical home, hosting the [iOS](https://github.com/soramitsu/fearless-iOS) and [Android](https://github.com/soramitsu/fearless-Android) codebases, both under Apache License 2.0. There is no DAO governing the wallet codebase and no native Fearless token. Code changes surface as issues and pull requests on those repositories.

Funding for Fearless features has been pursued through chain-governance channels rather than wallet-internal governance — for example, a [Kusama Treasury proposal](https://kusama.polkassembly.io/post/1817) covering the browser-extension and desktop-application work. Product commitments, when made, would most plausibly surface on the [Soramitsu site](https://soramitsu.co.jp/fearless-wallet-release) or the [user wiki](https://wiki.fearlesswallet.io/).

A dedicated public security-disclosure venue and an indexed audit history for Fearless Wallet were not located in the material reviewed; readers wanting current details on disclosure scope or audit coverage should consult the vendor directly.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
