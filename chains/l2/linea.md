# Linea — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Linea |
| **Website** | https://linea.build |
| **GitHub** | https://github.com/Consensys/linea-monorepo |
| **Stack** | Linea zkEVM (ConsenSys) |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844, with compression) |
| **Proof type** | ZK-SNARK (Vortex: lattice-based inner proofs / BN254 SNARK L1 verifier) |
| **Sequencer model** | Centralized (ConsenSys) |
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

Linea is a Type-2 zkEVM rollup developed and operated by ConsenSys. Its most technically distinctive feature is the Vortex prover: an internally multi-round proving system whose inner rounds use lattice-based polynomial commitments — a construction related to Learning With Errors (LWE) hardness, which is considered quantum-resistant. However, the final output of the Vortex prover is a SNARK over BN254 elliptic-curve pairings, which is the proof verified by Linea's L1 contract on Ethereum.

The lattice-based inner proofs are an architecturally interesting research direction, and ConsenSys Research has done genuine work in this space. But the L1 verifier sees only the outer BN254 SNARK. The chain of trust collapses at that boundary: a cryptographically relevant quantum computer (CRQC) capable of breaking the BN254 discrete log could forge the final proof, regardless of the quantum-resistance properties of the inner lattice rounds. The inner lattice work does not improve Linea's on-chain security posture until the final L1 verifier is also migrated to a quantum-resistant scheme.

Settlement inherits Ethereum's in-development PQC rating. No other category has a published PQC migration plan.

## Proposed and Implemented PQC Algorithms

Linea does not currently deploy any post-quantum cryptographic algorithms for on-chain security. ConsenSys Research has published academic work on lattice-based SNARKs, and the Vortex prover's inner proof layer applies lattice-based constructions internally. These do not change Linea's on-chain security posture while the final L1-facing verifier remains BN254.

## Settlement Layer

**Grade: B 🔧**

Linea settles to Ethereum. The Linea verifier contract on Ethereum L1 finalizes batch state roots after verifying the final BN254 SNARK. Settlement security is bounded by Ethereum's. Ethereum has active PQC research underway across several components, earning it an in-development rating that Linea inherits as its settlement foundation.

ConsenSys holds all upgrade keys for Linea's L1 contracts via an EC-keyed multisig, with no external security council or timelock confirmed at the time of this evaluation. This represents an additional trust surface beyond the proof system itself: key compromise is a direct path to settlement contract manipulation, independent of the quantum security of the proofs.

## Data Availability

**Grade: C 🗺️**

Linea publishes transaction data to Ethereum as EIP-4844 blobs, with lossless compression applied before posting to reduce DA costs. The compression layer is cryptographically transparent and introduces no new EC surface. Linea operates in rollup mode only — no Validium or off-chain DA option is offered. DA trust is entirely inherited from Ethereum.

Ethereum's blob DA uses KZG commitments over BLS12-381 EC pairings, which are quantum-vulnerable. Ethereum's roadmap includes replacing this scheme, though the replacement algorithm and timeline are not yet defined. Linea picks up any Ethereum DA improvement automatically.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating a commitment to migrate the Linea L1 verifier to a quantum-resistant proof system. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Linea's Vortex prover uses a multi-round proving architecture. Internal rounds use lattice-based polynomial commitments (based on LWE/SIS hardness assumptions, considered quantum-resistant). These are compressed into a final SNARK over BN254 elliptic-curve pairings for L1 verification.

The L1 verifier contract on Ethereum checks only the outer BN254 SNARK. A CRQC capable of breaking BN254 discrete log could forge this final proof, invalidating the entire chain of trust regardless of the quantum resistance of the inner rounds. The lattice-based inner layer is entirely off-chain and invisible to the L1 verifier.

This architecture is notable: if ConsenSys were to replace the BN254 outer wrapper with a hash-based or fully lattice-based final proof verifiable on L1, Linea could be among the first major zkEVMs with a quantum-resistant proof path. That path exists conceptually, given the inner lattice work already in production. No engineering commitment to completing this migration has been announced.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Linea in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Linea is a Type-2 zkEVM and is fully compatible with Ethereum's transaction format. All accounts use secp256k1 ECDSA. ERC-4337 account abstraction is supported at the application layer but does not change the protocol-level signature exposure. No PQC transaction type exists in the Linea protocol.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Linea in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

The Linea sequencer is centralized and operated by ConsenSys. Batch submissions to Ethereum are standard EC-signed Ethereum transactions. Full nodes sync state via standard execution-layer p2p; there is no p2p consensus network. RPC endpoints use classical TLS 1.3 with ECDHE key exchange. No PQC handshake or hybrid ML-KEM transport has been identified.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Linea in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Linea is Type-2 EVM-equivalent and exposes the standard Ethereum precompile set: `ecrecover`, BN254 elliptic-curve operations, SHA-256, and others. No PQC signature verification precompile exists. Smart contracts on Linea cannot natively verify ML-DSA, Falcon, SPHINCS+, or any other NIST PQC signature. Linea would inherit any PQC precompile added by Ethereum in a future fork, but none are on Ethereum's near-term roadmap.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Linea in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Linea's canonical bridge allows ETH and ERC-20 transfers between Ethereum L1 and Linea L2. Withdrawals finalize after the containing batch's ZK proof is verified on Ethereum. Bridge finality depends on the outer BN254 SNARK: a forged proof could immediately finalize a fraudulent withdrawal, since the inner lattice proofs are not what the L1 verifier checks. Bridge upgrade authority and transaction signing are EC-keyed with no retirement plan.

ConsenSys Research's published work on lattice-based SNARKs is a genuine positive signal — it is applied in production in the Vortex inner prover layer. However, the security boundary for all users remains the final BN254 verifier on L1.

## EC Sunset

**Grade: F ❌**

No public commitment has been found from ConsenSys or the Linea team to retire EC-based cryptography from any Linea component.

Adding PQC alongside EC is not the same as retiring EC. For reference, Linea's PQC-adoption ratings per category are: Settlement B 🔧, DA C 🗺️, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

EC is present in every externally-facing layer: transaction signatures, sequencer batch submission, bridge governance, RPC transport, and the final BN254 L1 proof verifier. The lattice-based Vortex inner proofs are an internal component without on-chain security consequences while the BN254 outer layer remains. No component has a published plan for EC removal.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
