# Algorand (ALGO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Algorand |
| **Ticker** | ALGO |
| **Website** | https://algorand.co/ |
| **GitHub** | https://github.com/algorandfoundation |
| **Twitter / X** | https://x.com/AlgoFoundation |
| **On-chain environment** | AVM (TEAL) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | B | 🔧 | In Development |
| Other Features | A | ✅ | Shipped |
| EC Sunset | F | ❌ | Not Discussed |

Algorand executed [the first post-quantum transaction on a public blockchain mainnet](https://algorand.co/blog/technical-brief-quantum-resistant-transactions-on-algorand-with-falcon-signatures) on November 3, 2025, signed with Falcon-1024. Opt-in Falcon-1024 keys are now available for user accounts via CLI, and Algorand's State Proofs — compact certificates of ledger state generated every 256 blocks — have been Falcon-1024-signed since 2022. An experimental AVM opcode for Falcon verification is in development, which would let smart contracts verify post-quantum signatures directly. The chain's [published post-quantum roadmap](https://algorand.co/technology/post-quantum) sequences accounts first, then on-chain verification, then consensus.

The remaining gap is consensus and EC retirement. Algorand's Pure Proof-of-Stake uses an elliptic-curve Verifiable Random Function for cryptographic sortition; lattice-based VRF replacements are under research, but no concrete proposal or schedule is published. Ed25519 remains the default account signature scheme and is not slated for removal.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **Falcon-1024** | Ed25519 | Tx Signatures, On-Chain, Other | Implemented (opt-in user accounts since Nov 2025; State Proofs since 2022); In Development (`falcon_verify` AVM opcode) |

## 1. Transaction Signatures

**Grade: B 🔧**

Algorand transactions today are signed with Ed25519 (Curve25519). On November 3, 2025, the network executed the [first post-quantum transaction on a public blockchain mainnet](https://algorand.co/blog/technical-brief-quantum-resistant-transactions-on-algorand-with-falcon-signatures) using **Falcon-1024**. Falcon-1024 keys are now available as an opt-in for new accounts via CLI. Signatures are roughly 1,280 bytes with ~1,793-byte public keys, with verification typically under 100 microseconds. Account holders can voluntarily migrate Ed25519 accounts to Falcon keys via Algorand's native key-rotation mechanism without changing the account address.

**Current state.** Mainnet supports both Ed25519 (default) and **Falcon-1024** (opt-in) account types. New accounts choose at creation; existing accounts can rotate.

**Planned future work.** [Algorand's post-quantum roadmap](https://algorand.co/technology/post-quantum) sequences PQC adoption: State Proofs (2022, done), opt-in user accounts (Nov 2025, live), AVM opcode for Falcon verification (in development), and consensus VRF replacement (planned, no schedule).

## 2. Consensus

**Grade: D ⚠️**

Algorand uses [Pure Proof-of-Stake (PPoS)](https://algorand.co/technology/pure-proof-of-stake) with Verifiable Random Functions: each node independently runs a VRF over its secret key to determine committee membership for block proposal, soft vote, and certify vote phases. The VRF is built on Curve25519 — the same elliptic curve as Ed25519 transaction signatures. A quantum break against the VRF would let an attacker predict block proposers and disrupt consensus, even though Falcon-locked funds remain protected.

The Algorand Foundation has stated that quantum-safe VRF replacements are under active research, including lattice-based VRFs in the NTRU family. The [published roadmap](https://algorand.co/technology/post-quantum) sequences consensus-layer migration as the final phase, after the in-development AVM Falcon-verify opcode. No concrete draft, specification, or testnet activity has been published yet.

**Current state.** All consensus cryptography (sortition, committee selection, vote signing) is EC-based.

**Planned future work.** Foundation-led research on a quantum-safe VRF replacement is in progress. Consensus replacement requires a coordinated protocol upgrade rather than opt-in migration; no ETA, draft specification, or testnet has been published.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Algorand in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: B 🔧**

The [Algorand Virtual Machine (AVM)](https://developer.algorand.org/docs/get-details/dapps/avm/) supports `ed25519verify` natively (opcode cost 1900) for in-contract Ed25519 signature verification. There is no PQC verification opcode on mainnet today. An experimental `falcon_verify` opcode is under development, which would let smart contracts and Logic Signatures verify **Falcon-1024** signatures directly.

**Current state.** Smart contracts can verify Ed25519 signatures on-chain. **Falcon-1024** verification is not yet shipped as an opcode.

**Planned future work.** The `falcon_verify` opcode is experimental and not yet on mainnet. Once shipped, it would enable PQC-aware smart-contract logic — multi-sig, threshold schemes, and dApps gating actions on Falcon signatures.

## 5. Other Features

### State Proofs

**Current state.** [State Proofs](https://algorand.co/blog/technical-brief-quantum-resistant-transactions-on-algorand-with-falcon-signatures) are compact certificates of ledger state, generated every 256 blocks (~18 minutes on mainnet) and signed by a supermajority of stake using **Falcon-1024**. They have been live in production since 2022. ~1,280 bytes per signature; designed for light clients, bridges, and cross-chain verification.

**Planned future work.** None disclosed for the State Proofs primitive itself.

### Algorand Standard Assets (ASA)

**Current state.** [ASAs](https://developer.algorand.org/docs/get-details/asa/) are native token primitives whose security inherits from the account-level signature scheme. Tokens held by Falcon-locked accounts are post-quantum protected; tokens in Ed25519-only accounts remain EC-vulnerable.

**Planned future work.** Migration occurs at the account layer (key rotation) rather than the asset layer. As accounts adopt Falcon, their ASA holdings inherit PQC security automatically.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Algorand's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus ⚠️, P2P ❌, On-Chain 🔧, Other ✅.

The Algorand Foundation has positioned quantum resilience as a strategic priority, and the Falcon opt-in path at the account layer is intentional. However, Ed25519 is not slated for removal — it remains the default for new accounts and will be supported indefinitely for backward compatibility. Per the [published roadmap](https://algorand.co/technology/post-quantum), the migration model is opt-in rather than scheduled deprecation.

**Current state.** No timeline for Ed25519 deprecation. Curve25519 remains in active use for transaction signatures, VRF sortition, and consensus signing. New Ed25519 accounts can still be created.

**Planned future work.** A consensus VRF replacement is planned but has no schedule. No protocol amendment has been published targeting Ed25519 retirement from the user signature path.

## Governance

Algorand's protocol roadmap and PQC sequencing are published by the Algorand Foundation. The [post-quantum technology page](https://algorand.co/technology/post-quantum) and the [2025 roadmap progress](https://algorand.co/blog/2025-on-algorand-roadmap-progress) and [2025+ roadmap](https://algorand.co/blog/algorands-2025-roadmap-building-for-real-world-use) blog posts are the principal venues for status updates. The [Algorand Developer Portal](https://developer.algorand.org/) hosts the AVM and TEAL specifications that gate the on-chain Falcon-verify opcode work.

Specific consensus-layer or signature-layer Algorand Improvement Proposals (AIPs) targeting PQC are not currently in flight on the public record beyond the Foundation roadmap commitments listed above.

---

_Generated on 06 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
