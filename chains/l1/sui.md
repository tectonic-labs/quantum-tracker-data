# Sui (SUI) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Sui |
| **Ticker** | SUI |
| **Website** | https://sui.io |
| **GitHub** | https://github.com/MystenLabs/sui |
| **On-chain environment** | Move VM (Sui Move variant) |
| **Mainnet genesis** | 2023-05-03 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | C | 🗺️ | Roadmapped |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Sui's PQC posture is early-stage. The only concrete work is happening in [fastcrypto](https://github.com/MystenLabs/fastcrypto), Mysten Labs' cryptographic library: FIPS 205 (SLH-DSA) building blocks — WOTS+, FORS, XMSS, and Hypertree — were merged on `main` in April 2026 behind an `experimental` feature flag. However, a PR implementing the top-level sign/verify API was closed without merge on 2026-05-06, leaving no callable SLH-DSA interface. No Sui Improvement Proposals (SIPs) for PQC integration have been filed. The remaining categories — consensus, networking, on-chain logic, and zkLogin — have no disclosed PQC plans.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **SLH-DSA-SHA2-128** (SPHINCS+ / FIPS 205) | Ed25519, secp256k1 | Tx Signatures | Library building blocks merged; top-level API not yet available |

## 1. Transaction Signatures

**Grade: C 🗺️**

Sui transactions are signed with Ed25519 (primary), secp256k1 (secondary), or secp256r1 / NIST P-256 (used by zkLogin social-login authentication). MultiSig support allows threshold signatures using any combination of these schemes. All three are broken by Shor's algorithm.

Sui's signature architecture is extensible — new signature schemes can be added by registering a new scheme identifier and verification logic. This is a structural advantage for eventual PQC adoption.

The most concrete PQC work is in [fastcrypto](https://github.com/MystenLabs/fastcrypto), the Rust cryptographic library consumed by Sui for signature verification. In April 2026, FIPS 205 (SLH-DSA) building blocks were merged on `main` behind the `experimental` Cargo feature flag:

- [fastcrypto#947](https://github.com/MystenLabs/fastcrypto/pull/947) — WOTS+ one-time signature scheme (merged 2026-04-21)
- [fastcrypto#950](https://github.com/MystenLabs/fastcrypto/pull/950) — FORS, single-tree XMSS, Hypertree (merged 2026-04-28)

A follow-up PR ([fastcrypto#951](https://github.com/MystenLabs/fastcrypto/pull/951)) implementing the top-level `slh_keygen` / `slh_sign` / `slh_verify` functions and NIST ACVP test vectors was **closed without merge on 2026-05-06** with no public explanation. As a result, the library contains SLH-DSA primitives but no callable signing or verification API.

No SIPs have been filed for PQC transaction signatures. The library-level work indicates research intent but has stalled before producing a usable primitive. There is no published timeline for wiring PQC signatures into the transaction-verification path.

**Current state.** Mainnet transactions are exclusively Ed25519/secp256k1/secp256r1. No test network runs PQC transactions.

**Planned future work.** Monitor fastcrypto for a successor PR to #951. No SIP or protocol-level integration plan has been disclosed.

## 2. Consensus

**Grade: F ❌**

Sui uses [Mysticeti](https://docs.sui.io/concepts/how-sui-works/consensus), a low-latency BFT consensus protocol evolved from Narwhal/Bullshark. Validators sign blocks using BLS12-381 aggregated signatures. BLS12-381 is a pairing-based elliptic curve scheme broken by Shor's algorithm.

No PQC alternative for consensus signing has been proposed, discussed, or disclosed.

**Current state.** BLS12-381 aggregated signatures for all validator operations.

**Planned future work.** None disclosed.

## 3. P2P Networking

**Grade: F ❌**

Sui runs a custom peer-to-peer networking layer. Node identity is based on secp256k1 keys. Handshake and transport encryption use secp256k1-based protocols. Both are vulnerable to quantum attack via Shor's algorithm.

No PQC alternative for node identity or transport has been proposed or disclosed.

**Current state.** secp256k1-based node identity and handshake.

**Planned future work.** None disclosed.

## 4. On-Chain Logic

**Grade: F ❌**

Sui uses the Move programming language (Sui Move variant) for smart contracts. Built-in cryptographic modules provide Ed25519, secp256k1, and secp256r1 signature verification, plus SHA3-256, SHA3-512, and Blake2b-256 hashing.

No PQC signature verification is available on-chain, either as a built-in module or as a precompile. While a pure-Move implementation of hash-based signature verification is theoretically possible, it would be prohibitively expensive without native support.

**Current state.** EC-only signature verification modules. No PQC on-chain verification.

**Planned future work.** No proposals for PQC precompiles or Move modules have been filed.

## 5. Other Features

**Grade: F ❌**

**zkLogin** is Sui's social-login authentication system, enabling users to authenticate using Google, Twitch, and other OpenID providers via zero-knowledge proofs. zkLogin uses [Groth16 SNARKs](https://docs.sui.io/concepts/cryptography/transaction-auth/zklogin) with BN254 elliptic-curve pairings. BN254 is broken by Shor's algorithm.

A quantum adversary could forge Groth16 proofs, impersonating any zkLogin-authenticated user. This break is **retroactive**: historical zkLogin proofs become forgeable, potentially revealing which social accounts were linked to on-chain identities.

Replacing Groth16 with a quantum-safe proof system (e.g., STARK-based) would require significant protocol changes and user re-authentication.

**Current state.** zkLogin is an active, user-facing feature using Groth16/BN254. No PQC alternative disclosed.

**Planned future work.** No SIPs or public plans for migrating zkLogin to quantum-safe proofs.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Sui's PQC-adoption ratings per category are: Tx Signatures 🗺️, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

Sui has no published roadmap or timeline for retiring elliptic-curve cryptography from any layer. The extensible signature architecture provides a structural path forward for transaction signatures, but no concrete EC deprecation plan exists.

zkLogin introduces a novel EC dependency (Groth16/BN254) that complicates future migration — it is a user-facing feature tightly coupled to EC-pairing-based proofs and cannot be rotated without protocol changes and re-authentication.

A full EC sunset would require: (1) adding PQC transaction signature schemes, (2) replacing BLS12-381 in consensus, (3) migrating node identity to PQC, (4) replacing zkLogin's proof system, and (5) adding PQC on-chain verification modules.

**Current state.** No EC removal plans disclosed for any category.

**Planned future work.** None disclosed.

## Governance

Sui's protocol changes follow the [SIP (Sui Improvement Proposal)](https://github.com/MystenLabs/sui-improvement-proposals) process on GitHub. Core development is led by [Mysten Labs](https://mystenlabs.com), the original team behind the Diem-derived protocol, with oversight from the Sui Foundation.

No PQC-related SIPs have been filed.

The fastcrypto library, where SLH-DSA work has appeared, is maintained by Mysten Labs and is consumed directly by the Sui node software for cryptographic operations.

### References

- [Sui documentation — Signature schemes](https://docs.sui.io/concepts/cryptography/transaction-auth/keys-and-addresses)
- [Sui documentation — zkLogin](https://docs.sui.io/concepts/cryptography/transaction-auth/zklogin)
- [Sui documentation — Mysticeti consensus](https://docs.sui.io/concepts/how-sui-works/consensus)
- [fastcrypto repository](https://github.com/MystenLabs/fastcrypto)
- [Sui Improvement Proposals](https://github.com/MystenLabs/sui-improvement-proposals)

---

_Generated on 03 Jun 2026 based on information as of 25 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
