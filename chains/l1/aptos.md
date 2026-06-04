# Aptos (APT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Aptos |
| **Ticker** | APT |
| **Website** | https://aptoslabs.com/ |
| **GitHub** | https://github.com/aptos-labs |
| **Twitter / X** | https://x.com/aptoslabs |
| **On-chain environment** | Move VM |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Aptos is a Move-based L1 using [AptosBFT consensus](https://aptos.dev/protocol/blockchain/consensus) (HotStuff-derived) with Ed25519 as the primary [transaction signature scheme](https://aptos.dev/guides/transactions/signatures) and BLS12-381 for aggregated validator signatures. The most significant PQC work is **SLH-DSA-SHA2-128s** (FIPS 205 / SPHINCS+), which is [deeply integrated into aptos-core mainline](https://github.com/aptos-labs/aptos-core) across 43+ files — covering key generation, signing, verification, serialization, smoke tests, API tests, and benchmarks. A [TypeScript SDK PR](https://github.com/aptos-labs/aptos-ts-sdk/pull/802) extends SLH-DSA support to client-side tooling.

Aptos's native key rotation and extensible signature verification architecture provide a structural migration path: users can rotate to SLH-DSA keys without changing their account address. The official Aptos Stack diagram (May 2026) lists "post-quantum signatures" as an L1 Infrastructure feature. SLH-DSA-SHA2-128s is stateless and purely hash-based (no lattice assumptions) — the most conservative PQC signature choice, though it carries larger signatures (~7,856 bytes) and slower signing compared to lattice alternatives. Recent mainline work includes ongoing maintenance of the `SLH_DSA_SHA2_128S_SIGNATURE` feature-flag gating in the aptos-vm error-handling path (commit 2026-05-12), confirming active upkeep of the SLH-DSA integration.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **SLH-DSA-SHA2-128s** (FIPS 205) | Ed25519 | Tx Signatures | In Development |

## 1. Transaction Signatures

**Grade: B 🔧**

Aptos currently supports [Ed25519 (primary), secp256k1 (secondary), and MultiEd25519](https://aptos.dev/guides/transactions/signatures) for transaction signing. The AuthenticationKey derivation includes a signature scheme identifier, enabling multi-scheme addresses. Native key rotation allows users to change keys without changing their account address.

**SLH-DSA-SHA2-128s** (FIPS 205 / SPHINCS+) is [integrated into aptos-core mainline](https://github.com/aptos-labs/aptos-core) across 43+ files with full signing key, verifying key, and signature implementation, plus gas accounting (`SLH_DSA_SHA2_128S_BASE_COST`). A [TypeScript SDK PR](https://github.com/aptos-labs/aptos-ts-sdk/pull/802) (draft, 19 comments) extends PQC support to client-side tooling. This is not experimental — it is integrated into the mainline codebase with benchmarks and API tests.

**Current state.** Ed25519 is the primary transaction signature scheme. SLH-DSA-SHA2-128s is integrated in mainline code but not yet the default or widely adopted by wallets.

**Planned future work.** The key rotation mechanism is structurally ready to support migration to SLH-DSA. The TS SDK PR is in progress. No formal AIP (Aptos Improvement Proposal) for PQC has been published.

## 2. Consensus

**Grade: F ❌**

Aptos uses [AptosBFT](https://aptos.dev/protocol/blockchain/consensus), a HotStuff-derived BFT consensus where validators sign commits with BLS12-381 aggregated signatures. BLS12-381 is EC-pairing-based and quantum-vulnerable. Blocks reach instant finality after two-thirds of validators sign.

**Current state.** All validator signing uses BLS12-381. No post-quantum alternative has been disclosed.

**Planned future work.** None documented for consensus-layer PQC.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Aptos in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Aptos runs the [Move VM](https://aptos.dev/move/book/overview) with built-in signature verification modules for Ed25519, secp256k1, and MultiEd25519, plus hash modules (SHA3-256, SHA3-512, BLAKE2b-256). No PQC signature verification precompile or module exists in the Move standard library.

**Current state.** On-chain signature verification is EC-only. Move modules could implement custom PQC verification logic, but no precompiled modules exist.

**Planned future work.** No public proposals for PQC signature precompiles in Move.

## 5. Other Features

Aptos does not support any special features with EC dependencies (no privacy tech, no KZG blobs, no pairing-based proofs).

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

No public PQC roadmap has been formally announced, but the [codebase](https://github.com/aptos-labs/aptos-core) tells a different story: **SLH-DSA-SHA2-128s** is deeply integrated across 43+ files with gas accounting, benchmarks, and API tests. The account-metadata public key design (addresses are not derived from ECDSA keys) combined with native key rotation provides a migration-friendly architecture that does not require users to change addresses when rotating to PQC keys.

**Current state.** SLH-DSA is integrated in code but no formal EC deprecation schedule exists. Ed25519 and BLS12-381 remain the active schemes.

**Planned future work.** Active code development evidenced by mainline integration and SDK PR. No formal timeline disclosed.

## Governance

Aptos governance operates through [AIPs (Aptos Improvement Proposals)](https://github.com/aptos-labs/AIPs) on GitHub, with the Aptos Foundation core team as maintainers.

No PQC-specific AIPs have been filed. SLH-DSA integration has proceeded through direct code contributions to [aptos-core](https://github.com/aptos-labs/aptos-core) rather than the formal AIP process.

---

_Generated on 03 Jun 2026 based on information as of 18 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
