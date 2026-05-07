# Aptos (APT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Aptos |
| **Ticker** | APT |
| **Website** | https://aptoslabs.com |
| **GitHub** | https://github.com/aptos-labs |
| **On-chain environment** | Move VM |
| **Mainnet genesis** | 2022-10-17 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Aptos is among the most active L1s in PQC transaction-signature work. SLH-DSA-SHA2-128s (FIPS 205 / SPHINCS+) is deeply integrated in [aptos-core](https://github.com/aptos-labs/aptos-core) mainline across 43+ files, covering key generation, signing, verification, serialization, gas accounting, API tests, and benchmarks. A companion [TypeScript SDK pull request](https://github.com/aptos-labs/aptos-ts-sdk/pull/802) extends PQC to client-side tooling. However, consensus (BLS12-381), P2P networking (secp256k1), and on-chain verification remain entirely EC-based with no disclosed PQC plans, and no public roadmap addresses EC retirement. A Coinbase Advisory Board paper (April 2026) named Aptos and Algorand the "most quantum-ready" major L1s.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **SLH-DSA-SHA2-128s** (SPHINCS+ / FIPS 205) | Ed25519 | Tx Signatures | In Development (mainline integration, 43+ files) |

## 1. Transaction Signatures

**Grade: B 🔧**

Aptos transactions are currently signed with Ed25519 (primary), secp256k1 (secondary), or MultiEd25519 (threshold multi-sig). All three are broken by Shor's algorithm. Aptos has a structural advantage over many chains: native key rotation allows users to change their signing keys without changing their account address, and an extensible signature-verification module architecture supports adding new schemes without address migration.

SLH-DSA-SHA2-128s (FIPS 205 / SPHINCS+) is integrated into the [aptos-core](https://github.com/aptos-labs/aptos-core) mainline codebase. The implementation spans 43+ files across the core crypto library, API layer, SDK, and test suite, including key generation, signing, verification, serialization, smoke tests, API tests, and benchmarks. Gas accounting for SLH-DSA is already plumbed in (`SLH_DSA_SHA2_128S_BASE_COST` and related constants), with a recent commit (April 2026) confirming ongoing maintenance of the gas infrastructure. A [TypeScript SDK pull request](https://github.com/aptos-labs/aptos-ts-sdk/pull/802) (draft, opened December 2025) extends SLH-DSA support to client-side tooling.

SLH-DSA-SHA2-128s is stateless and purely hash-based (no lattice assumptions), making it the most conservative PQC signature choice. The trade-off is performance: signatures are approximately 7,856 bytes and signing is slower than lattice-based alternatives like ML-DSA.

**Current state.** Ed25519/secp256k1 on mainnet. SLH-DSA-SHA2-128s is integrated in the core codebase but not yet activated on mainnet or a public testnet.

**Planned future work.** No Aptos Improvement Proposal (AIP) has been published for PQC transaction signatures. The key rotation mechanism and modular signature architecture are structurally ready to support new schemes, contingent on community consensus and an AIP.

## 2. Consensus

**Grade: F ❌**

Aptos uses AptosBFT, a HotStuff-derived BFT consensus protocol (DiemBFT v4 variant). Validators sign block proposals using BLS12-381 aggregated signatures, and validator identity is based on BLS12-381 public keys. Finality is instant after 2/3+ validator signature aggregation.

BLS12-381 relies on EC pairings and is broken by Shor's algorithm. No PQC alternative or migration plan for consensus has been disclosed.

**Current state.** BLS12-381 aggregated signatures for all validator operations. No PQC alternatives in development.

**Planned future work.** None disclosed.

## 3. P2P Networking

**Grade: F ❌**

Aptos uses a custom P2P networking protocol with secp256k1-based node identity for validator authentication. Peer discovery uses gossip-based propagation for transactions, with validator membership derived from consensus.

The secp256k1 node identity keys are broken by Shor's algorithm. No PQC transport or identity proposals have been published.

**Current state.** secp256k1-based node identity. No PQC alternatives drafted.

**Planned future work.** None disclosed.

## 4. On-Chain Logic

**Grade: F ❌**

Move VM provides built-in signature verification modules for Ed25519, secp256k1, and MultiEd25519, along with hash modules (SHA3-256, SHA3-512, BLAKE2b-256). No built-in or precompiled module supports PQC signature verification.

Theoretically, a PQC verification function could be implemented as a Move module, but without native support the gas cost for verifying large PQC signatures (e.g., 7,856-byte SLH-DSA signatures) would be prohibitive. No AIP proposes PQC signature precompiles for the Move VM.

**Current state.** No PQC verification capability on-chain. EC-only signature modules.

**Planned future work.** None disclosed.

## 5. Other Features

Aptos does not have special features with EC or RSA dependencies (no privacy technology, KZG commitments, or advanced cryptographic proofs).

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Aptos's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

No public roadmap addresses EC retirement on Aptos. The SLH-DSA integration in the core codebase demonstrates active PQC development for transaction signatures, but it is positioned as an additional signature scheme alongside Ed25519 and secp256k1, not a replacement. No AIP or governance discussion proposes deprecating or removing EC-based signature schemes.

The account-metadata public key design (addresses are derived from authentication keys, not directly from EC public keys) and native key rotation provide a structurally favorable migration path should EC retirement be pursued. Users could rotate to PQC keys without changing their account addresses -- a significant advantage over chains with EC-derived addresses.

BLS12-381 in consensus, secp256k1 in P2P, and EC-based on-chain modules have no disclosed retirement plans.

**Current state.** No EC removal plans. PQC work is additive only.

**Planned future work.** None disclosed.

## Governance

Aptos protocol changes follow the [AIP (Aptos Improvement Proposal) process](https://github.com/aptos-labs/AIPs) on GitHub. The Aptos Foundation core team and maintainers hold merge authority. The chain follows a managed upgrade model with regular releases.

No PQC-relevant AIPs have been filed. The closest governance-relevant event is the April 2026 Coinbase Advisory Board paper (authors include Aaronson, Boneh, Drake, Kannan, Lindell, and Malkhi) that named Aptos and Algorand the "most quantum-ready" among major L1s, highlighting Aptos's account-metadata public key design and PACTs (user-opt-in migration model alongside AIP-137 SLH-DSA) as migration-friendly architecture.

---

_Generated on 07 May 2026 based on information as of 07 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
