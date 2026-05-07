# Aptos (APT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Aptos |
| **Ticker** | APT |
| **Website** | https://aptoslabs.com/ |
| **GitHub** | https://github.com/aptos-labs |
| **Twitter / X** | https://x.com/aptoslabs |
| **On-chain environment** | Move |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Aptos has integrated **SLH-DSA-SHA2-128s** (FIPS 205) deeply into its mainline crypto code: 43+ files across `aptos-core`'s core crypto, API, SDK, and testsuite reference the algorithm, including key generation, signing, verification, serialization, smoke tests, and gas accounting. A draft pull request adds SLH-DSA support to the [TypeScript SDK](https://github.com/aptos-labs/aptos-ts-sdk/pull/802). Native account abstraction and key rotation are structurally ready to support new signature schemes.

However, no Aptos Improvement Proposal for PQC has been filed, and the consensus layer (BLS12-381 aggregated validator signing), P2P node identity (secp256k1), and Move VM signature-verification modules remain EC-based. The codebase tells a clearer story than the public communication does today.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **SLH-DSA-SHA2-128s** (FIPS 205 / SPHINCS+) | Ed25519 | Tx Signatures | In Development (mainline integration; no AIP filed; SDK PR draft) |

## 1. Transaction Signatures

**Grade: B 🔧**

Aptos accounts use Ed25519 (primary), secp256k1, or MultiEd25519 (a threshold variant of Ed25519). Native account abstraction lets any module act as a signer, and key rotation lets users change signing keys without changing their account address — a structural feature that enables migration to new signature schemes once they are wired into the protocol.

The Aptos crypto crate includes deep integration of [**SLH-DSA-SHA2-128s**](https://github.com/aptos-labs/aptos-core), with full signing-key, verifying-key, and signature implementations under `crates/aptos-crypto/src/slh_dsa_sha2_128s/`. A draft [TypeScript SDK PR](https://github.com/aptos-labs/aptos-ts-sdk/pull/802) opened December 2025 adds SLH-DSA to client-side tooling. The chosen variant is stateless and purely hash-based — the most conservative PQC signature choice — but carries a performance cost (~7,856-byte signatures, slower signing than lattice alternatives).

No [Aptos Improvement Proposal](https://github.com/aptos-labs/AIPs) announcing a user-facing PQC signature has been filed; the work is visible in code rather than in governance.

**Current state.** Ed25519, secp256k1, and MultiEd25519 are the user signature schemes today. **SLH-DSA-SHA2-128s** is integrated into `aptos-core` mainline (43+ files) and gas accounting plumbing references it (`SLH_DSA_SHA2_128S_BASE_COST`), but it is not yet exposed as a user-selectable transaction signature on mainnet.

**Planned future work.** Enabling SLH-DSA as a user-facing signature would require an AIP and a coordinated network upgrade. The TypeScript SDK PR is in draft.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Aptos in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Aptos in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Aptos in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

Aptos does not support any special features.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Aptos's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

No public PQC roadmap has been announced. Code integration of **SLH-DSA-SHA2-128s** sits ahead of any announcement: the algorithm is well-staged in `aptos-core` and the TypeScript SDK has a draft PR. There is no AIP, no announced timeline for Ed25519 / BLS12-381 / secp256k1 deprecation, and no public discussion of consensus, P2P, or Move VM PQC migration.

**Current state.** All consensus and networking remain EC-based. No EC retirement schedule.

**Planned future work.** None publicly announced.

## Governance

Protocol changes flow through [Aptos Improvement Proposals](https://github.com/aptos-labs/AIPs) maintained by the Aptos Foundation and core developers. As of this report, no AIP for PQC adoption is in flight on the public record. The [aptos-core](https://github.com/aptos-labs/aptos-core) repository carries the SLH-DSA mainline code; PQC-relevant context is currently available there rather than through the AIPs venue.

---

_Generated on 06 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
