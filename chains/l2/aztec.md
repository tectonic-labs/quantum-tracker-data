# Aztec (AZTEC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Aztec |
| **Ticker** | AZTEC |
| **Website** | https://aztec.network |
| **GitHub** | https://github.com/AztecProtocol/aztec-packages |
| **Stack** | Aztec / Honk proving |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs |
| **Proof type** | ZK-SNARK — Honk/UltraPlonk over BN254 |
| **Sequencer model** | Decentralized — Fernet protocol |
| **On-chain environment** | Noir / ACIR / Barretenberg — not EVM |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | B | 🔧 | In Development |
| Data Availability | B | 🔧 | In Development |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Overview

Aztec is a privacy-focused ZK-SNARK Layer 2 settling to Ethereum. Its Honk proving system uses BN254 elliptic-curve pairings end-to-end — unlike STARK-based L2s such as StarkNet, there is no hash-based component anywhere in the proof pipeline. Transaction signatures use Schnorr on the Grumpkin curve (BN254's cycle partner). The entire architecture — proofs, signatures, privacy layer, note encryption, sequencer VRF — is built on the BN254/Grumpkin curve cycle.

The most critical quantum exposure is in Aztec's privacy layer. Because private transaction data is protected by BN254 SNARK proofs, quantum breaks are retroactive: a cryptographically relevant quantum computer (CRQC) could deanonymize the entire historical ledger — every private transaction ever made on Aztec. Past privacy is not preserved by any future migration. Even if Aztec migrates to quantum-safe cryptography, all historical private transactions recorded on Ethereum L1 remain permanently vulnerable to retroactive deanonymization.

Aztec does have structural assets for eventual migration. ACIR (Abstract Circuit Intermediate Representation) is backend-agnostic by design — a PQC-capable proving backend could theoretically replace Barretenberg without rewriting application-level Noir code. Native account abstraction (every Aztec account is a smart contract) provides a structural migration path for transaction signatures, similar to StarkNet's approach. However, no PQC backend exists, no PQC account contract has been deployed, and no PQC roadmap has been published by Aztec Labs.

## Proposed and Implemented PQC Algorithms

Aztec has no proposed or implemented PQC algorithms. No PQC governance proposals, forum discussions, blog posts, or code contributions addressing quantum migration have been identified as of the date of this report.

## Settlement Layer

**Grade: B 🔧 In Development**

Aztec settles to Ethereum via Honk validity proofs submitted to an L1 verifier contract. Settlement security is bounded by Ethereum's overall PQC posture, which is rated in-development (B-tier) as Ethereum has active PQC research underway across multiple categories.

The L1 verifier contract is upgradeable via a governance multisig using EC keys (secp256k1 via Ethereum). A CRQC capable of breaking EC discrete-log could compromise upgrade authority and modify or disable the verifier contract, independently of whether the proofs themselves are sound.

Additionally, even if Ethereum adds PQC settlement primitives, the Aztec L1 verifier contract would still need replacement because the proof it verifies is itself EC-dependent (BN254 pairings).

## Data Availability

**Grade: B 🔧 In Development**

Aztec publishes transaction data to Ethereum as EIP-4844 blobs. Blob availability depends on Ethereum consensus signatures (BLS12-381, EC-based), which are part of Ethereum's active PQC migration work.

Aztec publishes encrypted transaction data to blobs as part of its privacy model. The encryption of blob contents is application-level privacy; the DA layer itself does not add additional EC exposure beyond Ethereum's consensus.

## Proof / Verification

**Grade: F ❌ Not Discussed**

We have found no public information indicating migration activity for Aztec in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Aztec's Honk proving system is a PLONK-variant ZK-SNARK over BN254 with Kate (KZG) polynomial commitments based on EC pairings. Applications written in Noir are compiled to ACIR and proved by Barretenberg (Aztec's C++ proving backend). The entire proof pipeline — prover, recursive aggregation, and L1 verifier — depends on BN254 EC pairings. There is no STARK component or hash-based alternative at any layer.

This is a critical distinction from STARK-based L2s. StarkNet's STARK proofs, for example, rely on hash function collision-resistance rather than EC discrete-log hardness and are quantum-safe. Aztec's Honk proofs are EC-based end-to-end. A CRQC running Shor's algorithm could solve the discrete-log problem on BN254, enabling proof forgery. A forged proof could finalize invalid state transitions on L1, including theft of bridged assets.

ACIR's backend-agnostic design theoretically allows plugging in a PQC-capable backend (e.g., a hash-based proof system), but no such backend exists and no work toward one has been published.

## Transaction Signatures

**Grade: F ❌ Not Discussed**

We have found no public information indicating migration activity for Aztec in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Aztec's default transaction signature scheme is Schnorr on the Grumpkin curve — a twisted Edwards curve whose scalar field equals BN254's base field. Schnorr is used because it is more efficient to verify inside BN254 circuits than ECDSA. ECDSA on secp256k1 is also available for Ethereum-compatible operations. Both schemes are EC-based and quantum-vulnerable.

Aztec uses a privacy-preserving address scheme where addresses are derived from viewing keys and spending keys, not directly from a single public key. The spending key is a Grumpkin point (EC-based), and the address derivation scheme would need redesign for PQC migration.

Aztec has native account abstraction — every Aztec account is a smart contract, and signature verification logic lives in the account contract, not hardcoded in the protocol. This provides a structural PQC migration path: a PQC account contract could theoretically be deployed without a protocol-level hard fork. However, all current account contract implementations use EC-based schemes (Schnorr/Grumpkin or ECDSA), and no PQC account contract exists. Furthermore, the in-circuit verification cost of PQC signatures in BN254 arithmetic would be prohibitive without a proof system migration.

## Networking

**Grade: F ❌ Not Discussed**

We have found no public information indicating migration activity for Aztec in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Aztec uses a decentralized sequencer model via the Fernet protocol (Fair Election Randomized Natively on Ethereum Trustlessly). Sequencers are assigned random secret scores via VRF (EC-based), ranked, and selected for block proposal. The Fernet protocol has been live since the Alpha Network launch in March 2026. Running a sequencer requires 200,000+ AZTEC tokens.

The P2P network is libp2p-based with standard EC node identity (Ed25519 or secp256k1 peer IDs) and Noise protocol handshake (X25519 ECDH). RPC endpoints use classical TLS with ECDHE key exchange.

A CRQC could predict or manipulate VRF outputs in the Fernet sequencer selection, enabling censorship or MEV extraction. No PQC hybrid key exchange, ML-KEM handshake, or PQC transport work has been published.

## On-Chain Environment

**Grade: F ❌ Not Discussed**

We have found no public information indicating migration activity for Aztec in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Aztec does not use a traditional VM. Applications are written in Noir, compiled to ACIR, and executed inside ZK circuits proved by Barretenberg over BN254. Private functions execute client-side (proving locally), while public functions execute on the sequencer.

Barretenberg provides native support for Grumpkin EC point operations (add, scalar multiply), Schnorr signature verification, ECDSA verification (secp256k1 and secp256r1), and BN254 operations — all EC-based and quantum-vulnerable. Hash builtins include Pedersen hash (over Grumpkin, EC-based), Poseidon2 (algebraic, non-EC), Blake2s, Blake3, Keccak256, and SHA-256.

There is no ACIR black-box function for ML-DSA, Falcon, SPHINCS+, or any other PQC signature scheme. Pure-Noir implementation is theoretically possible but would be extraordinarily expensive in BN254 circuit constraints. Pedersen hash is used extensively for note commitments and nullifier computation in the privacy layer, deeply embedding EC operations into the execution model.

## Other Features

**Grade: F ❌ Not Discussed**

We have found no public information indicating migration activity for Aztec in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

### Privacy Layer (Critical Exposure)

Aztec is a privacy-first L2. Private transactions use ZK proofs (Honk/BN254) to hide sender, receiver, and transaction amounts. The privacy model uses UTXO-style "notes" with encrypted note commitments, nullifiers, and viewing keys. Users prove they own notes and can spend them without revealing the notes' contents. The cryptographic foundation is BN254 SNARK proofs for privacy guarantees, Pedersen hash (over Grumpkin) for note commitments and nullifier derivation, Schnorr/Grumpkin for spending authorization, and EC-derived keys for note encryption.

Quantum breaks on SNARK-based privacy are retroactive. A future CRQC could break BN254 discrete-log, enabling reconstruction of proof witnesses (transaction details), derive private keys from public keys observed in note commitments and nullifiers, and deanonymize the entire historical ledger. Every private transaction ever made on Aztec would be exposed. Past privacy is not preserved by any future migration — even if Aztec migrates to quantum-safe cryptography, all historical private transactions recorded on Ethereum L1 remain permanently vulnerable to retroactive deanonymization once a CRQC exists.

### Bridge / L1-L2 Messaging

Aztec's L1-L2 message passing enables deposits from Ethereum into private Aztec notes and withdrawals back to L1. L1 deposit signatures use Ethereum secp256k1 ECDSA. L2 withdrawal proofs are verified by the L1 verifier (Honk, BN254 pairings). Bridge contract governance uses EC keys. A CRQC could forge withdrawal proofs (via BN254 break), enabling theft of bridged assets.

### Note Encryption / Viewing Keys

Aztec's privacy model includes viewing keys that allow designated parties to decrypt transaction data without spending authority. Notes are encrypted to recipients' viewing keys using EC Diffie-Hellman (Grumpkin curve) for key exchange and shared secret derivation. A CRQC could derive viewing keys from public keys, enabling decryption of all encrypted note data — part of the retroactive deanonymization risk.

### Fernet Sequencer Selection

Decentralized sequencer selection uses verifiable random functions (VRF, EC-based) to assign secret scores to sequencer candidates. A CRQC could predict VRF outputs and manipulate sequencer selection, enabling censorship or MEV extraction.

## EC Sunset

**Grade: F ❌ Not Discussed**

No PQC roadmap has been published by Aztec Labs. The entire architecture — proof system, signatures, privacy layer, note encryption, VRF — is built on the BN254/Grumpkin curve cycle. EC is not merely an add-on; it is structurally foundational.

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Settlement B 🔧, DA B 🔧, Proof F ❌, Tx Sigs F ❌, Networking F ❌, On-Chain F ❌, Other F ❌.

EC is present in:
- **Proof system**: Honk/Barretenberg over BN254 — the entire proof pipeline.
- **Transaction signatures**: Schnorr on Grumpkin.
- **Privacy layer**: BN254 SNARK proofs, Pedersen hash, EC-derived encryption keys.
- **Networking**: libp2p EC node identity, Noise/X25519 ECDH, Fernet VRF.
- **On-chain environment**: Grumpkin EC builtins, Pedersen hash, Schnorr/ECDSA verification.
- **Governance**: L1 verifier contract multisig (EC keys).

The BN254/Grumpkin curve cycle is deeply embedded: replacing one curve requires replacing both, plus all hash functions and circuit constructions built on them. ACIR's backend agnosticism is the most promising structural asset for eventual migration, but no work toward a PQC-compatible backend has begun.

## Governance

AZTEC token holders (TGE: February 12, 2026; total supply: 10.35B) vote on protocol upgrades. Core team and investors abstain from governance for 12 months post-TGE. The L1 verifier contract is upgradeable via a governance multisig using EC keys. No formalized improvement proposal standard has been widely adopted yet. No PQC governance proposals, forum discussions, or improvement proposals addressing quantum migration have been identified.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
