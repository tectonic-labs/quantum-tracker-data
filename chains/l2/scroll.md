# Scroll — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Scroll |
| **Website** | https://scroll.io |
| **GitHub** | https://github.com/scroll-tech |
| **Stack** | Scroll zkEVM (proprietary) |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | ZK-SNARK (OpenVM STARK inner / Halo2+KZG+BN254 L1 verifier) |
| **Sequencer model** | Centralized (Scroll team) |
| **On-chain environment** | EVM (Type-2 zkEVM, EVM-equivalent) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | B | 🔧 | In Development |
| Data Availability | C | 🗺️ | Roadmapped |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Overview

Scroll is a Type-2 zkEVM rollup that targets full EVM-equivalence. Its Euclid upgrade (April 2025) introduced a two-layer proving architecture: an OpenVM STARK inner prover using FRI over BabyBear generates proofs that are then compressed into a Halo2/KZG proof over BN254 for L1 verification. The inner proving layer is hash-based and quantum-favorable in isolation; the outer layer that settles to Ethereum is EC-pairing-based and quantum-vulnerable.

Settlement is provided by Ethereum, which has active PQC work in progress. Every other category is unaddressed. Unlike optimistic rollups, Scroll has no challenge period: ZK proof verification is the only mechanism between a submitted proof and finalized state. A forged outer BN254 proof would immediately finalize an invalid state root with no withdrawal window available to users. The Scroll team has published no PQC roadmap for any component.

## Proposed and Implemented PQC Algorithms

Scroll does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: B 🔧**

Scroll settles to Ethereum via the `ScrollChain` contract on L1, which finalizes batches upon successful ZK proof verification. Settlement security is bounded by Ethereum's. Ethereum has active PQC research underway, earning it an in-development rating that Scroll inherits. The `ScrollChain` upgrade admin keys — held by the Scroll team in an EC-keyed multisig — are an additional trust surface beyond Ethereum's own EC exposure.

## Data Availability

**Grade: C 🗺️**

Scroll publishes full transaction data to Ethereum as EIP-4844 blobs. There is no Validium mode and no off-chain DA committee. DA trust is entirely inherited from Ethereum: blob KZG commitments use BLS12-381 EC pairings, quantum-vulnerable, and Ethereum's roadmap includes replacing this without a defined algorithm or timeline. Scroll picks up any Ethereum DA improvement automatically.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Scroll in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

The Euclid upgrade introduced OpenVM as Scroll's inner prover — a STARK system using FRI over BabyBear with Plonky3 and LogUp lookup arguments. FRI is hash-based and quantum-favorable. However, the inner STARK proof is wrapped in a Halo2/KZG proof over BN254 for cheap L1 verification. The `ScrollChain` contract on Ethereum verifies only the outer BN254 proof.

A cryptographically relevant quantum computer could forge the outer KZG proof using Shor's algorithm against the BN254 discrete log, producing a valid-looking proof for an invalid state transition. Because there is no optimistic challenge window, a forged proof immediately finalizes invalid state — users cannot exit after the fact. The inner OpenVM STARK layer provides no protection while the outer BN254 wrapper remains in place.

No roadmap has been published by the Scroll team to replace the Halo2/BN254 outer verifier with a quantum-resistant proof system.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Scroll in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Scroll is a Type-2 zkEVM and is fully compatible with Ethereum's transaction format. All accounts use secp256k1 ECDSA. ERC-4337 account abstraction is available at the application layer, which could in principle support a PQC wallet implementation, but this is application-layer and does not change the protocol-level exposure. No PQC transaction type exists in the Scroll protocol, and the Scroll team has published no PQC signature work.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Scroll in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

The Scroll sequencer is centralized and operated by the Scroll team. Batch submissions to Ethereum are EC-signed transactions (secp256k1). There is no p2p consensus network; Scroll full nodes sync state via standard execution-layer p2p. RPC endpoints use classical TLS 1.3 with ECDHE key exchange. No PQC handshake or hybrid ML-KEM transport has been identified.

The centralized sequencer means sequencer key compromise enables censorship and reordering, though not direct state theft without also forging the ZK proof.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Scroll in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Scroll is Type-2 EVM-equivalent and exposes the full Ethereum precompile set: `ecrecover`, BN254 elliptic-curve operations (`ecAdd`, `ecMul`, `ecPairing`), SHA-256, and others. No PQC signature verification precompile exists. Smart contracts on Scroll cannot natively verify ML-DSA, Falcon, SPHINCS+, or any other NIST PQC signature. Scroll would inherit any PQC precompile added by Ethereum in a future fork, but none are on Ethereum's near-term roadmap.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Scroll in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Scroll's canonical bridge allows ETH and ERC-20 transfers between Ethereum L1 and Scroll L2. Withdrawals finalize only after the containing batch's ZK proof is verified on Ethereum. Bridge finality therefore depends entirely on the soundness of the Halo2/BN254 proof system. A forged proof could immediately finalize a fraudulent withdrawal; there is no challenge period during which honest parties can respond. Bridge upgrade authority and L1/L2 transaction signing are both EC-keyed, with no PQC retirement plan.

## EC Sunset

**Grade: F ❌**

No public information has been found from the Scroll team regarding retirement of EC-based cryptography from any Scroll component.

Adding PQC alongside EC is not the same as retiring EC. For reference, Scroll's PQC-adoption ratings per category are: Settlement B 🔧, DA C 🗺️, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

EC is present in every externally-facing layer: transaction signatures, batch submission keys, bridge governance, RPC transport, and the final BN254 L1 proof verifier. No component has a published plan for EC removal.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
