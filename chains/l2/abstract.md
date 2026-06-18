# Abstract (ABS) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Abstract |
| **Ticker** | ABS |
| **Website** | https://abs.xyz |
| **Stack** | ZK Stack (Matter Labs) |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | ZK-SNARK (Boojum: STARK inner / KZG+BN254 L1 verifier) |
| **Sequencer model** | Centralized (Abstract team / Matter Labs infrastructure) |
| **On-chain environment** | EVM (EVM-equivalent, native AA) |

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

Abstract is a consumer-focused Layer 2 built on the ZK Stack, the same proving infrastructure that powers zkSync Era. It is operated by the Abstract team using Matter Labs infrastructure. As a standard ZK Stack deployment with no protocol-level modifications, Abstract inherits its entire cryptographic posture from the ZK Stack — there are no Abstract-specific deviations in proof system, transaction format, networking, or on-chain environment.

Settlement is provided by Ethereum, which has active PQC research underway, earning Settlement a B (in development) rating. Data Availability inherits the Ethereum blob rating. Every other category is unaddressed: the Boojum prover wraps an inner hash-based STARK in a BN254 KZG SNARK for L1 verification, transaction signatures are secp256k1 ECDSA, the sequencer is centralized with no PQC transport, and neither the Abstract team nor Matter Labs has published any PQC roadmap. Native AA on ZK Stack does not add PQC at the protocol level — the default account type uses ECDSA.

## Proposed and Implemented PQC Algorithms

Abstract does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: B 🔧**

Abstract settles to Ethereum. Batch proofs are submitted to an L1 verifier contract on Ethereum, and state roots are finalized on-chain. Abstract's settlement security is bounded by Ethereum's own security.

Ethereum has active PQC work in progress across consensus, transaction signatures, and related components, earning it an in-development rating. Abstract inherits this as its settlement layer. The L1 contract upgrade keys — controlled by the Abstract team and Matter Labs via an EC-keyed multisig — are an additional trust surface with no PQC hardening plan.

## Data Availability

**Grade: C 🗺️**

Abstract publishes transaction data to Ethereum as EIP-4844 blobs. The chain does not use Validium mode, so there is no additional off-chain DA committee with EC-signed attestations. DA trust is entirely inherited from Ethereum: blob KZG commitments use BLS12-381 EC pairings, which are quantum-vulnerable, and Ethereum's roadmap includes replacing this scheme without a defined replacement algorithm or timeline. Abstract picks up any Ethereum DA improvement for free.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Abstract in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Abstract uses the ZK Stack Boojum prover. Boojum's inner proving layer is a STARK over the Goldilocks field using FRI — hash-based and quantum-favorable in isolation. However, the inner STARK proof is wrapped in a PLONK+KZG proof over BN254 elliptic-curve pairings for efficient L1 verification. The L1 verifier contract on Ethereum checks only the outer BN254 proof. A cryptographically relevant quantum computer could forge the outer KZG proof, bypassing the quantum-resistant inner layer and finalizing an invalid state root. There is no published roadmap from the Abstract team or Matter Labs to replace the BN254 final verifier.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Abstract in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Abstract is EVM-equivalent. All accounts use secp256k1 ECDSA. ZK Stack includes native account abstraction at the protocol level, which means custom account contracts can implement alternative signature verification — but no PQC account contract standard has been developed or deployed, and the default account type remains ECDSA. No PQC transaction type exists in the protocol.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Abstract in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

The Abstract sequencer is centralized and run on Matter Labs infrastructure. There is no p2p consensus network; nodes sync via standard RPC. Batch submissions to Ethereum are EC-signed Ethereum transactions (secp256k1). RPC endpoints use classical TLS 1.3 with ECDHE key exchange. No PQC handshake or hybrid ML-KEM transport has been identified for any component.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Abstract in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Abstract is EVM-equivalent and exposes the standard Ethereum precompile set: `ecrecover`, BN254 elliptic-curve operations, SHA-256, and others. No PQC signature verification precompile exists. Smart contracts on Abstract cannot natively verify ML-DSA, Falcon, SPHINCS+, or any other NIST PQC signature. Abstract would inherit any PQC precompile additions that Ethereum standardizes, but none are on Ethereum's near-term roadmap.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Abstract in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Abstract participates in the ZK Stack shared bridge, which is administered via an EC-keyed multisig. Upgrade authority over Abstract's L1 contracts sits with the Abstract team and Matter Labs, both using standard secp256k1 Ethereum keys. A CRQC capable of breaking EC discrete log could compromise bridge governance, drain bridge funds, or authorize malicious contract upgrades. Native AA defaults to ECDSA; no PQC account type is deployed.

## EC Sunset

**Grade: F ❌**

No public information has been found from the Abstract team or Matter Labs regarding retirement of EC-based cryptography from any Abstract or ZK Stack component.

Adding PQC alongside EC is not the same as retiring EC. For reference, Abstract's PQC-adoption ratings per category are: Settlement B 🔧, DA C 🗺️, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

EC is present in every layer of Abstract: transaction signatures, batch submission keys, bridge governance multisigs, RPC transport, and the final BN254 proof. No component has a published plan for EC removal.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
