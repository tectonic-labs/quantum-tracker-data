# Leather — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Leather |
| **Vendor** | Trust Machines |
| **Category** | Software |
| **Custody model** | Single-party self-custody EOA (BIP-39 seed phrase); optional Ledger hardware co-sign on the browser extension. |
| **Website** | https://leather.io/ |
| **GitHub** | https://github.com/leather-io |
| **Platforms** | Browser extension (Chrome, Brave, Edge, Opera, Firefox), desktop (macOS, Windows, Linux), and mobile (iOS, Android). |
| **Open source** | Open source — the active monorepo is MIT-licensed. |
| **First release** | 2023 (rebranded from Hiro Wallet on 31 August 2023; the codebase originated as the Stacks-era web wallet first released in 2018). |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Leather is a Bitcoin and Stacks self-custody wallet from Trust Machines, available as a browser extension, a desktop client, and a mobile app. Today it signs Bitcoin and Stacks transactions exclusively with classical elliptic-curve cryptography — ECDSA and Schnorr over secp256k1 — and ships no post-quantum signing path. No public statement on post-quantum cryptography from Leather or Trust Machines has been located.

Where Leather is notable is the architectural surface it sits on. As a wallet for both Bitcoin and Stacks — Stacks being a Bitcoin layer with the Clarity smart-contract environment — Leather sits next to two of the few Bitcoin-anchored places where contract-verified post-quantum signatures could eventually be hosted: Bitcoin's [BIP-360 (P2QRH)](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki) proposal and a hypothetical Clarity verifier contract. Neither is live, and Leather ships no UI for either, so this remains a watch-list item rather than a shipped feature.

## Proposed and Implemented PQC Algorithms

Leather does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

No chain Leather supports has a live protocol-level post-quantum signature scheme, and the wallet's posture column tracks vendor engagement against the surfaces that apply to it. No public statement on post-quantum cryptography from Leather or its parent has been located: the official [security guide](https://app.leather.io/support/guide/security) covers self-custody, an audit, the bug bounty, and a vulnerability-disclosure timeline, but contains no references to post-quantum or quantum-resistant cryptography. Leather has likewise not appeared in public [BIP-360](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki) discussion or on the [BIP-360 community site](https://bip360.org/).

## Crypto Agility

**Rating: No** ❌

Leather ships a fixed signer. Bitcoin signing is hard-coded to ECDSA and Schnorr over secp256k1, and Stacks transaction signing uses secp256k1 ECDSA; there is no plugin, Snap, or keyring API that would let a third party add a new signature scheme without the vendor shipping a release. The dapp-facing `LeatherProvider` interface exposes a fixed catalog of chain-specific methods with no generic custom-signer entry point.

One mitigating factor is the licence. The active Leather monorepo is MIT-licensed, which means a third party could fork the codebase and add a new signing path without negotiating commercial terms — a fork-friendly posture. No post-quantum-relevant fork of Leather has been located. The keystore is a standard BIP-39 plus per-chain HD derivation, and stateful signature schemes would require keystore semantics the wallet does not currently model.

## Protocol PQC

**Rating: N/A** ➖

Leather supports only Bitcoin and Stacks. Neither chain has a protocol-level post-quantum signature scheme that the wallet could sign user transactions with, so this column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

This column tracks whether a wallet signs with a post-quantum signature verified by on-chain contract bytecode, or has such integration publicly in flight. Leather has no shipped integration here, but it sits on two Bitcoin-anchored architectural surfaces worth tracking.

**Current state.** On Bitcoin, the relevant analog is [BIP-360 (P2QRH)](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki), a quantum-resistant address-type proposal that was merged into the BIP repository in early 2026 but is not active on the network. A working BIP-360 implementation exists on a separate test network — [BTQ Technologies' Bitcoin Quantum testnet](https://thequantuminsider.com/2026/03/20/btq-technologies-implements-bip-360-quantum-resistant-bitcoin-transactions-testnet/) — but not on Bitcoin mainnet, and Leather is not among its listed collaborators. Leather ships no UI for BIP-360 addresses. On Stacks, the Clarity smart-contract environment can host arbitrary verifier code and exposes hashing primitives, so a Clarity-based post-quantum verifier contract is architecturally possible, but no such verifier has been located on Stacks mainnet and Leather exposes no UI for one. Stacks accounts themselves remain elliptic-curve EOAs; the closest account-style features are [post-conditions](https://docs.stacks.co/concepts/transactions/post-conditions), which Leather renders in human-readable form as a transaction-safety surface — not a post-quantum mechanism.

**Planned future work.** No post-quantum verifier integration has been announced by Leather. The [Stacks 2026 roadmap](https://www.benzinga.com/pressreleases/26/04/52186964/stacks-announces-2026-roadmap-targeting-bitcoin-native-finance-for-institutions-and-retail) names Leather as a gateway product and lists multi-signature functionality and Bitcoin staking among its in-flight items, but contains no post-quantum line items. Both BIP-360 on Bitcoin and a Clarity verifier on Stacks remain watch-list items rather than committed work.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Leather in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Leather is developed by Leather Wallet LLC, a subsidiary of Trust Machines, Inc. It is company-led: product roadmap, feature decisions, and security posture are set by the Leather and Trust Machines team. There is no DAO and no on-chain governance over the wallet, and there is no native Leather or Trust Machines token. The wallet's codebase was acquired from Hiro Systems PBC and rebranded from "Hiro Wallet" to "Leather" on 31 August 2023.

Product and roadmap commitments surface through Leather's own site and posts and through coverage of the broader [Stacks 2026 roadmap](https://www.benzinga.com/pressreleases/26/04/52186964/stacks-announces-2026-roadmap-targeting-bitcoin-native-finance-for-institutions-and-retail); Stacks ecosystem-level standards evolve through the public SIP process, where Leather participates as an implementer rather than a governance authority.

For security disclosure, Leather runs a public bug bounty program on [HackerOne](https://hackerone.com/leather_wallet), and its [security guide](https://app.leather.io/support/guide/security) publishes a chronological vulnerability-disclosure timeline. On audit history, Least Authority audited the wallet (then named Hiro Wallet) in 2021. No dated, on-record post-quantum milestone has been published by the vendor.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
