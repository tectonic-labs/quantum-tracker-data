# Immutable X (IMX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Immutable X |
| **Ticker** | IMX |
| **Website** | https://immutable.com |
| **GitHub** | https://github.com/immutable |
| **Stack** | StarkEx (StarkWare) |
| **Settlement layer** | Ethereum |
| **Data availability** | Validium — off-chain DA with 5-of-7 DAC |
| **Proof type** | ZK-STARK — FRI via Stone prover through SHARP; no SNARK wrapper |
| **Sequencer model** | Centralized — Immutable-operated |
| **On-chain environment** | None — StarkEx application-specific engine |

**Important: Immutable X was archived on March 5, 2026.** The platform migrated to Immutable zkEVM (Polygon CDK-based). This report documents the PQC posture of the StarkEx-based system as it existed at archival. The residual L1 contracts remain deployed on Ethereum.

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | B | 🔧 | In Development |
| Data Availability | F | ❌ | Not Discussed |
| Proof / Verification | A | ✅ | Shipped |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | -- | ➖ | Not Applicable |
| On-Chain Environment | -- | ➖ | Not Applicable |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Overview

Immutable X used StarkWare's StarkEx engine with pure STARK proofs submitted to Ethereum L1 via SHARP (Shared Prover) — the same L1 verifier infrastructure used by StarkNet. The proof system is hash-based end-to-end with no SNARK wrapper, making it quantum-resistant. This earns the Proof / Verification category a top-tier rating and distinguishes Immutable X from SNARK-based ZK L2s (zkSync, Scroll, Linea, Polygon zkEVM) whose proofs rely on EC pairings vulnerable to Shor's algorithm.

However, all other cryptographic layers were EC-dependent with no migration path. The Validium Data Availability Committee used ECDSA attestations with all 5-of-7 committee member keys permanently exposed on-chain — a harvest-now-decrypt-later target. Transaction signatures used a dual-key system: ECDSA on the Stark curve (L2) and secp256k1 ECDSA (L1). Unlike StarkNet, StarkEx has no account abstraction, meaning PQC signatures could not be adopted without protocol-level changes. Bridge admin keys, SHARP operator keys, and forced withdrawal mechanisms all depended on EC signatures.

The system was archived on March 5, 2026, following migration to Immutable zkEVM (Polygon CDK-based). No further development is expected. Notably, the successor Immutable zkEVM uses SNARK proofs with EC pairings — a PQC regression on the proof axis compared to StarkEx's pure STARK architecture.

## Proposed and Implemented PQC Algorithms

Immutable X itself did not implement any PQC algorithms. However, its STARK proof system (Stone prover, FRI, SHARP shared proving service) is hash-based and quantum-resistant. The proof pipeline relies entirely on hash function collision-resistance — no EC pairings or discrete-log hardness at any layer of proof generation, recursive aggregation (STARK-in-STARK), or L1 verification. A CRQC running Shor's algorithm cannot forge a StarkEx proof.

## Settlement Layer

**Grade: B 🔧**

Immutable X settled to Ethereum via SHARP (Shared Prover), which submitted aggregated STARK proofs to the GpsStatementVerifier contract on Ethereum L1. The StarkEx contract registered state transitions against verified SHARP facts. The L1 verifier validated hash-based STARK proofs — the verification logic itself is quantum-resistant, with no EC pairings required.

The StarkEx operator contract was upgradeable via admin keys using standard Ethereum EC signatures (secp256k1). A CRQC capable of breaking EC discrete log could compromise the upgrade authority and operator role.

Settlement security is bounded by Ethereum's overall posture. Ethereum has active PQC research underway, earning it an in-development rating that Immutable X inherits.

## Data Availability

**Grade: F ❌**

We have found no public information indicating migration activity for Immutable X in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Immutable X used Validium-mode data availability: transaction data was held off-chain by a Data Availability Committee (DAC) rather than published on Ethereum. The DAC operated with a 5-of-7 quorum threshold. Committee members signed state update attestations using ECDSA (secp256k1), verified on Ethereum L1.

All 7 committee member public keys are permanently exposed on-chain from historical attestation transactions. A future CRQC could retroactively derive all private keys without real-time network access (harvest-now-decrypt-later). With all keys compromised, an adversary could forge any 5-of-7 attestation quorum, certifying availability of data that was never published. Since Immutable X is archived, this risk applies to any residual funds or state still referenced by the L1 contracts.

Unlike some Validium implementations, StarkEx Validium does not automatically fall back to on-chain DA if the DAC is unresponsive. A forged attestation would look valid to the L1 contract.

## Proof / Verification

**Grade: A ✅**

Immutable X's proof system is quantum-resistant — the strongest component of this evaluation.

StarkEx used the Stone prover (StarkWare's original prover, predating the Stwo Circle STARKs prover) to generate STARK proofs submitted through SHARP (Shared Prover). The proof pipeline is hash-based throughout:

- **Prover**: Stone prover generating FRI (Fast Reed-Solomon IOP) proofs with Keccak Merkle commitments and Keccak Fiat-Shamir channel for L1 verification.
- **Recursive aggregation**: SHARP uses recursive STARKs (STARK-in-STARK) — no Groth16 or PLONK SNARK wrapper at any stage.
- **L1 verifier**: The Solidity SHARP verifier contracts (GpsStatementVerifier, FriStatementContract, MerkleStatementContract) use only Keccak256 hashing and modexp for field arithmetic. Zero EC precompile calls — no ecrecover, ecAdd, ecMul, or ecPairing.

A CRQC running Shor's algorithm cannot forge StarkEx proofs, because there is no discrete-log problem to solve. This is the same SHARP verifier infrastructure shared with StarkNet, and the quantum-resistance assessment is identical.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Immutable X in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Immutable X used a dual-key system, both EC-based and quantum-vulnerable:

1. **L1 key**: Standard Ethereum secp256k1 ECDSA — used for onboarding, deposits, forced withdrawals, and all L1 interactions.
2. **L2 Stark key**: ECDSA over the Stark curve — a Weierstrass elliptic curve. Used for all L2 operations (trades, transfers, mints). The Stark key was derived from the user's Ethereum wallet via an EIP-712 signature.

The name "Stark curve" refers to proof-system efficiency (efficient in Cairo AIR constraints), not quantum resistance. The Stark curve is still an elliptic curve, and Shor's algorithm breaks Stark-curve ECDSA just as it breaks secp256k1 ECDSA.

Critically, StarkEx has no account abstraction. Unlike StarkNet (where every account is a smart contract and signature verification can be customized), StarkEx has fixed signature verification logic. There was no permissionless path to PQC signatures without modifying the StarkEx protocol itself — and since the system is archived, this will not happen.

## Networking

**Grade: -- ➖**

Not applicable. Immutable X had no peer-to-peer network. StarkEx is a centralized operator model: there are no full nodes, no peer-to-peer gossip, and no consensus protocol among validators. Users interacted solely through the operator's API. The API used standard HTTPS/TLS transport.

## On-Chain Environment

**Grade: -- ➖**

Not applicable. StarkEx is not a general-purpose smart contract platform. It supports a fixed set of operations defined by the application (trade, transfer, mint NFTs, deposit, withdraw). There is no user-deployable code, no VM, and no cryptographic precompiles available to users. This is the fundamental architectural difference between StarkEx and StarkNet — StarkNet has a Cairo VM where users can deploy arbitrary contracts (including PQC signature verifiers), while StarkEx is a closed application engine.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Immutable X in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

**Forced withdrawal / escape hatch:** If the StarkEx operator was unresponsive, users could invoke a forced withdrawal on the L1 StarkEx contract. After a timeout, the escape hatch allowed direct L1 exit using vault Merkle proofs. The forced withdrawal and escape mechanisms are Ethereum L1 transactions signed by the user's EC key (secp256k1 ECDSA). If an adversary compromises the key via CRQC, they could front-run the forced withdrawal. The Merkle proof itself is hash-based and quantum-safe.

**Bridge (deposits/withdrawals):** Deposits and withdrawal claims used L1 EC signatures. Withdrawal proof verification was hash-based via STARK. StarkEx operator/admin keys for contract upgrades are EC.

**SHARP (Shared Prover):** StarkWare's centralized proving service aggregated proofs from multiple StarkEx deployments and StarkNet. The proof content is hash-based and quantum-resistant. SHARP's L1 transaction submission key is a standard EC-signed Ethereum account — a residual EC surface in the proof submission path, though not in the proof itself.

**Migration to Immutable zkEVM:** On March 5, 2026, Immutable migrated from StarkEx to Immutable zkEVM (Polygon CDK-based). The migration used standard Ethereum EC signatures and Axelar cross-chain messaging (EC-based validator signatures). The successor system uses SNARK proofs with EC pairings — a PQC regression on the proof axis compared to StarkEx's pure STARK proofs. The residual StarkEx L1 contracts remain deployed with EC admin keys.

## EC Sunset

**Grade: F ❌**

No EC removal plan exists. The system is archived with no further development expected. All EC dependencies will persist indefinitely in the deployed L1 contracts and historical state.

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Settlement B 🔧, DA F ❌, Proof A ✅, Tx Sigs F ❌, Networking -- ➖, On-Chain -- ➖, Other F ❌.

Per-category EC status:

- **Settlement**: EC admin keys on StarkEx operator contract; inherited from Ethereum.
- **Data Availability**: DAC attestations are EC (secp256k1 ECDSA); no retirement plan.
- **Proof / Verification**: Already EC-free. STARK proof system is hash-based end-to-end (Stone prover, STARK-in-STARK recursion via SHARP, L1 verifier). No EC in the verification path.
- **Transaction Signatures**: Stark-curve ECDSA and secp256k1; no migration possible (no account abstraction, system archived).
- **Networking**: Not applicable — no P2P network.
- **On-Chain Environment**: Not applicable — no on-chain environment.
- **Other Features**: Bridge admin keys, forced withdrawal keys, SHARP operator keys all EC; no retirement plan.

## Governance

Immutable (the company) controlled the StarkEx deployment. The IMX token provides governance rights over the broader Immutable ecosystem, but the StarkEx instance was operator-controlled. Immutable Improvement Proposals (IIPs) existed for the broader ecosystem; no PQC-related proposals were ever submitted. StarkWare controlled the SHARP prover infrastructure.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
