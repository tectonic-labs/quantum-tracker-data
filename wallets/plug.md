# Plug — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Plug |
| **Vendor** | Psychedelic |
| **Category** | Software |
| **Custody model** | EOA — single-party self-custody; user holds a BIP-39 seed phrase, and a secp256k1 keypair derives the Internet Computer Principal ID. |
| **Website** | https://plugwallet.ooo/ |
| **GitHub** | https://github.com/Psychedelic/plug |
| **Platforms** | Browser extension (Chrome, Firefox, Edge, Opera, Brave) and mobile (iOS, Android). No standalone desktop app, no hosted web wallet, no first-party hardware device. |
| **Open source** | Open — GPL-3.0 across the extension, the `plug-controller` key-management library, and the mobile app. |
| **First release** | 2021 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

## Overview

Plug is an open-source (GPL-3.0) wallet and identity provider for the Internet Computer, built by the DAO studio Psychedelic and originally incubated by the Fleek team. It ships as a browser extension and a mobile app, and it operates as a single-party self-custody wallet: the user holds a BIP-39 seed phrase, and a secp256k1 keypair derives the Internet Computer Principal ID used both to hold tokens and to authenticate into IC dapps. Plug reaches Bitcoin, Ethereum, and Solana balances through the Internet Computer's Chain Fusion mechanism rather than by holding native keys for those chains.

Every signing path in Plug today is classical. User-side transaction signing, Principal ID derivation, and dapp authentication run on secp256k1 ECDSA (the wallet migrated from Ed25519 to secp256k1 in v0.2.1). The Chain Fusion flows that move Bitcoin, Ethereum, and Solana value are signed by the Internet Computer's threshold keys, which are themselves classical (BLS12-381 finality with secp256k1, Schnorr, and Ed25519 threshold signatures). No post-quantum signing surface exists anywhere in the wallet, and no Plug- or Psychedelic-authored statement on post-quantum cryptography was located.

## Proposed and Implemented PQC Algorithms

Plug does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

No public Plug- or Psychedelic-authored statement on post-quantum cryptography was located. The [marketing site](https://plugwallet.ooo/), the [official documentation](https://docs.plugwallet.ooo/), and the project's [GitHub org](https://github.com/Psychedelic/plug) contain no references to post-quantum, quantum-resistant, lattice-based, or hash-based signatures.

Plug's post-quantum future is, in practice, gated upstream. The wallet runs only on the Internet Computer, whose protocol-side cryptography is maintained separately by DFINITY. DFINITY has a [post-quantum canister-developer RFP](https://forum.dfinity.org/t/building-post-quantum-cryptography-on-icp-seeking-experienced-canister-developers/61101) describing a 12-month canister-side PQC verification and policy engine, alongside other [hybrid post-quantum research](https://forum.dfinity.org/t/r-d-hybrid-post-quantum-solutions/57287). None of that DFINITY work has shipped to the Internet Computer mainnet, and Plug is not named as a participant in it. Because the wallet has issued no statement of its own and the meaningful post-quantum activity sits with the protocol rather than the wallet vendor, this column does not apply to Plug.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Plug in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Protocol PQC

**Rating: N/A** ➖

Plug supports only the Internet Computer, which is not post-quantum at the protocol layer — its chain-key cryptography relies on BLS12-381 together with secp256k1 and Ed25519 threshold signatures. Plug supports no chain that offers a protocol-level post-quantum signature scheme for user transactions, so this column does not apply.

## Contract PQC Support

**Rating: N/A** ➖

Plug's only first-class chain is the Internet Computer, where it exposes the EOA-style Principal ID to users and does not surface canister-account creation or custom signing-policy modules in its UI. Its reach to Bitcoin, Ethereum, and Solana is brokered through [Internet Computer Chain Fusion](https://internetcomputer.org/chainfusion) canister calls rather than through generalized smart-contract account flows such as ERC-4337 or EIP-7702. No on-chain post-quantum verifier is wired into the Plug experience, and the wallet does not target a smart-contract signing surface that would host one, so this column does not apply.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Plug in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Plug is maintained by Psychedelic, a self-described DAO studio building products on the Internet Computer; the wallet was originally incubated by the Fleek team and is independent of DFINITY. No on-chain governance process specific to the Plug wallet is documented, and there is no native Plug-wallet token. Development happens in the open across the public GPL-3.0 repositories under the [Psychedelic GitHub org](https://github.com/Psychedelic/plug).

Security issues are handled through public GitHub Issues on the [Plug repository](https://github.com/Psychedelic/plug). No named bug-bounty program (such as HackerOne or Immunefi) and no public, named third-party security audit of the extension, the `plug-controller` library, or the mobile app were located. Any future post-quantum commitment would most plausibly surface either in the project's public repositories or downstream of DFINITY's protocol-side post-quantum work; readers tracking this should watch both.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
