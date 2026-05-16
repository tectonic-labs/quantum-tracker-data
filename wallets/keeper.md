# Keeper Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Keeper Wallet |
| **Vendor** | Keeper Wallet |
| **Category** | Software |
| **Custody model** | EOA (single-party self-custody, seed phrase). Keys are generated and held client-side; no MPC, no smart-contract account, no first-party hardware device. |
| **Website** | https://keeper-wallet.app/ |
| **GitHub** | https://github.com/Keeper-Wallet |
| **Platforms** | Browser extension (Chrome / Chromium / Firefox), mobile (iOS, Android), and a hosted web client. No standalone desktop app and no first-party hardware device. |
| **Open source** | The browser extension and its supporting JavaScript/TypeScript crypto libraries are MIT-licensed. |
| **First release** | The browser extension (originally branded "Waves Keeper") first shipped around 2018. |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Keeper Wallet is the de facto wallet of the Waves blockchain ecosystem — a single-ecosystem, single-party self-custody wallet that signs Waves transactions and orders with Waves' Curve25519 signature scheme. As of the information cutoff for this report, no Keeper- or Waves-authored public material on post-quantum migration could be located, and the wallet ships no post-quantum signing path today. The one area with movement is contract-level support, where an upstream cryptographic-agility research line exists in the Waves ecosystem; that work has not produced a shipping integration in the wallet.

## Proposed and Implemented PQC Algorithms

Keeper Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

A meaningful "stance" reading would require the vendor to have either published something about post-quantum cryptography or to have made a position discoverable. No Keeper- or Waves-authored material on post-quantum migration could be located across the [marketing site](https://keeper-wallet.app/), the [user documentation](https://docs.keeper-wallet.app), or the [GitHub organization](https://github.com/Keeper-Wallet). Because the wallet operates entirely within the Waves ecosystem and that ecosystem has produced no published post-quantum roadmap of its own, there is no posture to evaluate here.

## Crypto Agility

**Rating: No** ❌

Keeper ships a fixed signer scoped to Waves. All transaction, order, and authentication signing uses Waves' Curve25519 scheme, implemented in the vendor's [`waves-crypto`](https://github.com/Keeper-Wallet/waves-crypto) library, and that signer is hard-coded. There is no plugin architecture, no swappable signer interface, and no extensible keystore format. The [`provider-keeper`](https://github.com/Keeper-Wallet) connector libraries are dApp-side bridges, not in-wallet hosts for a new account type or signing scheme.

**Current state.** Adding a new signature algorithm would require a vendor code change to the wallet itself, and — because Waves verifies signatures at the protocol layer — a corresponding change to the Waves protocol so the chain would accept the new scheme. The wallet cannot adopt a new signature scheme on its own.

## Protocol PQC

**Rating: N/A** ➖

Protocol PQC measures whether a wallet signs user transactions with a chain's protocol-level post-quantum scheme. Keeper is a Waves-only wallet, and Waves' protocol does not define a post-quantum signature scheme for user transactions — its transaction signing uses the Curve25519 scheme. With no supported chain offering a protocol-level post-quantum signature path, this column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

Contract PQC Support measures whether a wallet can route through smart-contract bytecode that verifies a post-quantum signature on-chain, or whether such an integration is publicly in flight. Keeper's only supported chain is Waves, whose Ride smart-contract language lets an account attach a script that gates its outgoing transactions — an account-script model conceptually similar to account abstraction.

**Current state.** Ride's built-in cryptographic operations cover Curve25519 and secp256k1 signature verification, RSA-PSS verification, BLS12-381 / BN256 pairings, and standard hash functions; there is no post-quantum signature verifier among them, and no deployed community contract providing one could be located. The account-script mechanism exists, but it has no post-quantum verifier to call.

**Planned future work.** An upstream cryptographic-agility research line exists within the Waves ecosystem, and there is wallet-side tracking of that work. It has not produced a shipping integration: no post-quantum on-chain verifier is deployed and none is wired into the wallet today.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Keeper Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Keeper Wallet is a vendor-led product of the Keeper Wallet team within the Waves ecosystem; it launched as "Waves Keeper" from the Waves Platform team and is the de facto official wallet of the Waves blockchain. No DAO governs the wallet's codebase. Waves protocol governance is separate from the wallet and runs through on-chain feature voting.

The browser extension and its supporting crypto libraries are developed in the open on the [Keeper-Wallet GitHub organization](https://github.com/Keeper-Wallet) under an MIT license, with the primary client being the [Keeper-Wallet-Extension](https://github.com/Keeper-Wallet/Keeper-Wallet-Extension) repository. Note that the [`provider-keeper-mobile`](https://github.com/Keeper-Wallet/provider-keeper-mobile) dApp-integration library for mobile was archived in August 2025. Because the wallet is open source, its repositories and release history are the most direct place a reader can watch for any future post-quantum work to surface.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
