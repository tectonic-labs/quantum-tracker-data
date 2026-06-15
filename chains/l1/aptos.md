# Aptos (APT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Aptos |
| **Ticker** | APT |
| **Website** | https://aptoslabs.com/ |
| **GitHub** | https://github.com/aptos-labs |
| **Twitter / X** | https://x.com/aptoslabs |
| **On-chain environment** | Move VM |
| **Current mainnet version** | aptos-node v1.45.5 (released 2026-05-27) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Aptos is a Move-based L1 using [AptosBFT consensus](https://aptos.dev/protocol/blockchain/consensus) (HotStuff-derived) with Ed25519 as the primary [transaction signature scheme](https://aptos.dev/guides/transactions/signatures) and BLS12-381 for aggregated validator signatures. The most significant PQC work is **SLH-DSA-SHA2-128s** (FIPS 205 / SPHINCS+), which is [deeply integrated into aptos-core mainline](https://github.com/aptos-labs/aptos-core) across 43+ files — covering key generation, signing, verification, serialization, smoke tests, API tests, gas accounting, and benchmarks. A [TypeScript SDK PR](https://github.com/aptos-labs/aptos-ts-sdk/pull/802) extends SLH-DSA support to client-side tooling. A separate [hybrid post-quantum public-key encryption PR](https://github.com/aptos-labs/ace/pull/137) (opened June 2026) adds a hybrid PQ PKE scheme to the Aptos `ace` crypto repository, complementing the SLH-DSA signature track.

Critically, the SLH-DSA integration is gated behind feature flag 107 (`SLH_DSA_SHA2_128S_SIGNATURE`), which has **not been activated on any network** — mainnet, testnet, or devnet. As of June 2026, no governance proposal has been submitted to enable it. Users cannot create SLH-DSA accounts today. Aptos's native key rotation and extensible signature verification architecture provide a structural migration path: when the flag is activated, users will be able to rotate to SLH-DSA keys without changing their account address. The official Aptos Stack diagram (May 2026) lists "post-quantum signatures" as an L1 Infrastructure feature, signaling intent.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **SLH-DSA-SHA2-128s** (FIPS 205) | Ed25519 | Tx Signatures | In Development |
| **SLH-DSA-SHA2-128s** (FIPS 205) | Ed25519 | On-Chain | In Development |
| **Hybrid PQ PKE** | EC-based encryption | Tx Signatures | In Development |

## 1. Transaction Signatures

**Grade: B 🔧**

Aptos currently supports [Ed25519 (primary), secp256k1 (secondary), and MultiEd25519](https://aptos.dev/guides/transactions/signatures) for transaction signing. The AuthenticationKey derivation includes a signature scheme identifier, enabling multi-scheme addresses. Native key rotation allows users to change keys without changing their account address.

**SLH-DSA-SHA2-128s** (FIPS 205 / SPHINCS+) is [integrated into aptos-core mainline](https://github.com/aptos-labs/aptos-core) across 43+ files with full signing key, verifying key, and signature implementation, plus gas accounting (`SLH_DSA_SHA2_128S_BASE_COST`). A [TypeScript SDK PR](https://github.com/aptos-labs/aptos-ts-sdk/pull/802) (draft, 19 comments) extends PQC support to client-side tooling. SLH-DSA-SHA2-128s is stateless and purely hash-based (no lattice assumptions) — the most conservative PQC signature choice, though it carries larger signatures (~7,856 bytes) and slower signing compared to lattice alternatives. Additionally, a [hybrid post-quantum public-key encryption PR](https://github.com/aptos-labs/ace/pull/137) (opened June 2026) adds a **hybrid PQ PKE** scheme to the Aptos `ace` crypto repository, complementing the signature track with an encryption primitive.

**Current state.** Ed25519 is the primary transaction signature scheme. SLH-DSA-SHA2-128s code is merged in mainline and actively maintained (feature-flag gating refactored as recently as May 2026), but the feature flag (flag 107) has not been activated via governance. No governance proposal to enable it has been submitted. A search of all 132 mainnet governance proposals found none referencing flag 107.

**Planned future work.** AIP-137, authored by the Aptos Labs Head of Cryptography and accepted December 2025, covers SLH-DSA signing accounts. Activation requires a single governance vote — the code is production-ready and waiting for that vote. The TS SDK PR remains in draft. The hybrid PQ PKE PR is open and under active development.

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

Aptos runs the [Move VM](https://aptos.dev/move/book/overview) with built-in signature verification modules for Ed25519, secp256k1, and MultiEd25519, plus hash modules (SHA3-256, SHA3-512, BLAKE2b-256).

**SLH-DSA-SHA2-128s** verification code exists in the Move framework, gated behind feature flag 107. When activated, the framework will natively verify SLH-DSA signatures as part of the account signing flow. As of June 2026, the flag is not enabled on any network, so the verification primitive cannot be used.

**Current state.** On-chain signature verification is EC-only in practice. The SLH-DSA verification code is merged but inactive.

**Planned future work.** AIP-137 (accepted December 2025) covers SLH-DSA signing accounts, which includes on-chain verification. Activation is a single governance vote away, but no proposal has been filed.

## 5. Other Features

Aptos does not support any special features with EC dependencies (no privacy tech, no KZG blobs, no pairing-based proofs).

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

No public PQC roadmap has been formally announced, but the [codebase](https://github.com/aptos-labs/aptos-core) tells a different story: **SLH-DSA-SHA2-128s** is deeply integrated across 43+ files with gas accounting, benchmarks, and API tests. The account-metadata public key design (addresses are not derived from ECDSA keys) combined with native key rotation provides a migration-friendly architecture that does not require users to change addresses when rotating to PQC keys.

**Current state.** SLH-DSA is integrated in code but not activated. No formal EC deprecation schedule exists. Ed25519 and BLS12-381 remain the active schemes across all categories.

**Planned future work.** AIP-137 (accepted December 2025) establishes the SLH-DSA account framework. Active code maintenance is ongoing. No formal timeline for activation or EC retirement has been disclosed.

## Governance

Aptos governance operates through [AIPs (Aptos Improvement Proposals)](https://github.com/aptos-labs/AIPs) on GitHub, with the Aptos Foundation core team as maintainers. Framework upgrades are executed via [on-chain governance proposals](https://github.com/aptos-foundation/mainnet-proposals).

AIP-137 (SLH-DSA-SHA2-128s signing accounts) was accepted in December 2025. SLH-DSA integration has proceeded through direct code contributions to [aptos-core](https://github.com/aptos-labs/aptos-core) rather than the formal governance activation process — the feature flag enabling it on-chain has not yet been proposed for a vote.

---

_Generated on 15 Jun 2026 based on information as of 15 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
