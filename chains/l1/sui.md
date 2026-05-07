# Sui (SUI) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Sui |
| **Ticker** | SUI |
| **Website** | <https://www.sui.io/> |
| **GitHub** | <https://github.com/MystenLabs> |
| **Twitter / X** | <https://x.com/suinetwork> |
| **Derived from** | Diem (Meta), heavily modified |
| **On-chain environment** | Move (Sui Move variant) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Sui is the most active chain in this batch on the post-quantum signature side. The crypto library that `sui-core` consumes for signature verification — [fastcrypto](https://github.com/MystenLabs/fastcrypto) — has been steadily landing a native FIPS 205 (SLH-DSA) implementation behind an `experimental` Cargo feature flag through April 2026. WOTS+ landed in [PR #947](https://github.com/MystenLabs/fastcrypto/pull/947) on 2026-04-21; FORS, single-tree XMSS, and Hypertree landed together in [PR #950](https://github.com/MystenLabs/fastcrypto/pull/950) on 2026-04-28. The remaining piece — the top-level `slh_keygen` / `slh_sign` / `slh_verify` API — is open in draft as [PR #951](https://github.com/MystenLabs/fastcrypto/pull/951). Once #951 lands, the FIPS 205 building blocks will be complete in `fastcrypto`; the work is not yet wired into Sui's transaction-signature path and remains library-level.

The rest of the stack is elliptic-curve-based: [Ed25519, secp256k1, and secp256r1](https://docs.sui.io/concepts/cryptography/transaction-auth/keys-and-addresses) for transaction signatures, BLS12-381 aggregated signatures for [Mysticeti BFT consensus](https://docs.sui.io/concepts/how-sui-works/consensus), secp256k1 keys for validator and full-node identity in the P2P layer, and Ed25519 / secp256k1 / secp256r1 verification primitives in Move. The user-facing [zkLogin](https://docs.sui.io/concepts/cryptography/transaction-auth/zklogin) feature uses Groth16 SNARKs over BN254 pairings; a quantum break of the underlying curve would let an attacker forge zkLogin proofs and retroactively reveal which social accounts were used.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **SLH-DSA-SHA2-128{s,f}** (FIPS 205, SPHINCS+ family) | Ed25519, secp256k1, secp256r1 (transaction signature path) | Tx Signatures | In Development (`fastcrypto` library; WOTS+ + FORS + XMSS + Hypertree merged behind `experimental` Cargo feature; top-level sign/verify API in draft as [PR #951](https://github.com/MystenLabs/fastcrypto/pull/951); not yet wired into `sui-core` transaction path) |

## 1. Transaction Signatures

**Grade: B 🔧**

Mainnet Sui transactions are signed with [Ed25519, secp256k1, or secp256r1](https://docs.sui.io/concepts/cryptography/transaction-auth/keys-and-addresses), composable through MultiSig threshold accounts. None of these is post-quantum.

The active post-quantum work is at the cryptographic-library layer. [fastcrypto](https://github.com/MystenLabs/fastcrypto) is the Rust crypto library consumed by `sui-core` for signature verification, and it has been progressively gaining a native FIPS 205 (SLH-DSA) implementation behind an `experimental` Cargo feature flag. WOTS+ (the underlying one-time signature) landed in [PR #947](https://github.com/MystenLabs/fastcrypto/pull/947) on 2026-04-21. The FORS, single-tree XMSS (FIPS 205 §6), and Hypertree (FIPS 205 §7) building blocks landed together in [PR #950](https://github.com/MystenLabs/fastcrypto/pull/950) on 2026-04-28 (commit `76891b9`, merged by Deepak Maram). The remaining work — the top-level `slh_keygen` / `slh_sign` / `slh_verify` wrapper, MGF1-SHA-256 helpers, and NIST ACVP known-answer-test fixtures for SLH-DSA-SHA2-128s — is open in draft as [PR #951](https://github.com/MystenLabs/fastcrypto/pull/951). The SHAKE family and larger SLH-DSA parameter sets are tracked TODOs.

**Current state.** Mainnet uses Ed25519 / secp256k1 / secp256r1. SLH-DSA building blocks are in `fastcrypto` `main` behind the `experimental` Cargo feature; the top-level sign/verify API is in draft. The library is not yet wired into Sui's transaction-signature verification path.

**Planned future work.** Land [PR #951](https://github.com/MystenLabs/fastcrypto/pull/951) to complete the FIPS 205 top-level API. No public Sui Improvement Proposal (SIP) describes promotion out of the `experimental` feature flag or wiring into `sui-core` transaction verification.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Sui in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Sui in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Sui in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### zkLogin

**Current state.** [zkLogin](https://docs.sui.io/concepts/cryptography/transaction-auth/zklogin) lets users authenticate to Sui through a social provider (Google, Twitch, etc.) by proving control of an OpenID account in zero knowledge, removing the need to manage a blockchain private key directly. The proof system is Groth16 over BN254 elliptic-curve pairings. A quantum break of the underlying curve would let an attacker forge zkLogin proofs (impersonating any user) and retroactively recover which social-provider accounts were associated with on-chain activity. Migration to a STARK-style hash-based ZK construction or another quantum-safe proof system would change the proof system, the trusted-setup status, and the user authentication flow.

**Planned future work.** No public SIP proposes migrating zkLogin to a post-quantum proof system.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Sui in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Sui protocol changes flow through the [Sui Improvement Proposal (SIP)](https://github.com/MystenLabs/sui-improvement-proposals) process, with the [Sui Foundation](https://www.sui.io/) coordinating governance and Mysten Labs leading core protocol development. Releases are on a roughly monthly cadence with planned hard forks.

PQ-relevant work currently visible:

- [MystenLabs/fastcrypto #947 — SLH-DSA WOTS+](https://github.com/MystenLabs/fastcrypto/pull/947). Status: Merged 2026-04-21. Behind `experimental` Cargo feature.
- [MystenLabs/fastcrypto #950 — SLH-DSA FORS + XMSS + Hypertree](https://github.com/MystenLabs/fastcrypto/pull/950). Status: Merged 2026-04-28 (commit `76891b9`, merged by Deepak Maram). Behind `experimental` Cargo feature.
- [MystenLabs/fastcrypto #951 — SLH-DSA top-level sign/verify](https://github.com/MystenLabs/fastcrypto/pull/951). Status: Open / Draft (last activity 2026-04-29).
- No SIP proposing wiring SLH-DSA into Sui's transaction-signature path has been filed.
- No SIP proposing post-quantum cryptography for Mysticeti consensus, P2P transport, Move on-chain primitives, or zkLogin has been filed.

No fork has been scheduled or signaled for any PQ migration.

---

_Generated on 06 May 2026 based on information as of 01 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
