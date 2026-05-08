# Ethereum Classic (ETC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Ethereum Classic |
| **Ticker** | ETC |
| **Website** | https://ethereumclassic.org/ |
| **GitHub** | https://github.com/ethereumclassic |
| **Twitter / X** | https://x.com/eth_classic |
| **Derived from** | Ethereum |
| **On-chain environment** | EVM |
| **Mainnet genesis** | 2015-07-30 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Ethereum Classic is the original Ethereum chain that continued after the 2016 DAO fork, using Etchash Proof-of-Work consensus. ETC shares Ethereum's ECDSA secp256k1 transaction signatures and devp2p networking stack, but diverged before EIP-4844 (blobs/KZG commitments), eliminating that particular EC exposure. The chain's PoW mining is hash-based and quantum-resistant.

The most notable PQC activity is [ECIP-1122](https://github.com/ethereumclassic/ECIPs/pull/557), a work-in-progress proposal to add an **ML-DSA** (FIPS 204 / CRYSTALS-Dilithium) signature verification precompile, with a [companion implementation PR](https://github.com/etclabscore/core-geth/pull/5) containing actual code. This is an independent ETC PQC effort, not inherited from Ethereum.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** (FIPS 204) | ECDSA secp256k1 | On-Chain | Discussed |

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Ethereum Classic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: A ✅**

Ethereum Classic uses Etchash, a modified version of Ethereum's original Ethash Proof-of-Work algorithm. Hash-based mining is intrinsically quantum-safe — quantum computers cannot meaningfully speed up proof-of-work hashing. Grover's algorithm provides at most a quadratic speedup, reducing 256-bit security to roughly 128-bit, which remains secure. Difficulty adjustment would absorb any marginal quantum mining advantage.

ETC remains committed to PoW indefinitely, having not followed Ethereum's Proof-of-Stake merge. This eliminates BLS12-381 validator signature exposure but retains ECDSA secp256k1 for block identity signing (an EC Sunset concern, not a consensus mechanism concern).

**Current state.** Mining and block validation are entirely hash-based. No EC cryptography is involved in the consensus mechanism itself.

**Planned future work.** None needed for the consensus layer specifically.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Ethereum Classic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: D ⚠️**

Ethereum Classic runs a full EVM with standard Ethereum precompiles (ecrecover, ecAdd, ecMul, ecPairing). [ECIP-1122](https://github.com/ethereumclassic/ECIPs/pull/557) proposes adding an **ML-DSA** (FIPS 204 / CRYSTALS-Dilithium) signature verification precompile to the EVM. A [companion implementation PR](https://github.com/etclabscore/core-geth/pull/5) exists in the core-geth client with actual code. This is an independent ETC PQC effort — not inherited from Ethereum's PQC work — and represents a concrete step toward on-chain PQC verification capability.

**Current state.** Standard EVM EC precompiles only. ECIP-1122 is in WIP/Draft status with no hard fork commitment.

**Planned future work.** ECIP-1122 proposes **ML-DSA** verification as a precompile. Activation would require community consensus and a hard fork.

## 5. Other Features

Ethereum Classic does not support any special features. ETC diverged from Ethereum before EIP-4844, so it has no KZG blob commitments or other pairing-based features.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ✅, P2P ❌, On-Chain ⚠️, Other ➖.

No roadmap or community momentum exists toward EC retirement on Ethereum Classic. ECIP-1122 would add PQC verification capability alongside existing EC precompiles but does not propose deprecating ECDSA.

**Current state.** ECDSA secp256k1 is the sole transaction signature scheme. No EC deprecation plan exists.

**Planned future work.** None documented beyond the on-chain **ML-DSA** precompile proposal.

## Governance

Ethereum Classic governance operates through the [ECIP (Ethereum Classic Improvement Proposal)](https://github.com/ethereumclassic/ECIPs) process, with proposals submitted as pull requests to the [ECIPs repository](https://etcis.org/).

PQC-related governance activity:

- **ECIP-1122** — [Pull request #557](https://github.com/ethereumclassic/ECIPs/pull/557) proposing an ML-DSA (FIPS 204) signature verification precompile. Status: WIP/Draft. Companion implementation: [core-geth #5](https://github.com/etclabscore/core-geth/pull/5).

---

_Generated on 07 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
