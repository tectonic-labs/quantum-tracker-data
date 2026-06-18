# StarkNet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | StarkNet |
| **Ticker** | STRK |
| **Website** | https://starknet.io |
| **GitHub** | https://github.com/starkware-libs |
| **Stack** | StarkNet (StarkWare) |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) / Volition (optional off-chain DA) |
| **Proof type** | ZK-STARK (Stwo prover, Circle STARKs over M31; hash-based, no EC pairings) |
| **Sequencer model** | Centralized (StarkWare-operated; decentralization in progress) |
| **On-chain environment** | Cairo VM (not EVM) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | B | 🔧 | In Development |
| Data Availability | C | 🗺️ | Roadmapped |
| Proof / Verification | D | ⚠️ | Discussed |
| Transaction Signatures | D | ⚠️ | Discussed |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | D | ⚠️ | Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Overview

StarkNet is the most PQC-differentiated major Layer 2 in active production. Its proof system is built on ZK-STARKs — Fast Reed-Solomon IOP proofs that rely entirely on hash function collision-resistance, not on elliptic-curve discrete-log hardness. The Stwo prover (launched November 2025) uses Circle STARKs over the Mersenne-31 field, further refining the hash-based design. A cryptographically relevant quantum computer running Shor's algorithm cannot forge a StarkNet STARK proof; breaking these proofs would require breaking SHA-3 or comparable hash functions, which requires Grover's algorithm — a far more manageable threat addressed by increasing hash output length.

This structural advantage sets StarkNet apart from all major SNARK-based L2s (zkSync Era, Scroll, Linea, Polygon zkEVM), whose L1 verifiers rely on BN254 elliptic-curve pairings and are directly vulnerable to Shor's algorithm.

However, StarkNet's EC exposure is real and distributed across multiple layers. Transaction signatures use ECDSA on the Stark curve (a Weierstrass elliptic curve, equally vulnerable to Shor's). Full-node networking uses libp2p with EC-based node identity and Diffie-Hellman key exchange. The Cairo VM includes EC builtins and Pedersen hash (EC-based) in addition to the quantum-safe Poseidon hash. StarkWare operates the L1 verifier contract upgrade keys via EC-keyed multisig. The Pedersen-to-Poseidon hash migration, actively underway in Cairo 1.x, is a concrete positive trend removing one EC dependency from the proving layer.

Most notably, a community project (s2morrow) has deployed Falcon-512 account contracts on StarkNet mainnet, taking advantage of StarkNet's native account abstraction architecture. Falcon-512 signature verification has been implemented in pure Cairo and tested on-chain. This is live, community-deployed PQC — no other major L2 can make an equivalent claim. It is not a protocol-level default, and StarkWare has not published a formal roadmap to make it one, but the architectural openness that enables it is a genuine structural advantage.

## Proposed and Implemented PQC Algorithms

**Falcon-512** — implemented in pure Cairo by the s2morrow community project; Falcon-512 account contracts are live on StarkNet mainnet. StarkNet's native account abstraction allows any account to use custom signature verification without protocol changes. This is a community-driven deployment, not an official StarkWare initiative.

**Stwo / Circle STARKs** — StarkWare's Stwo prover (live November 2025) generates STARK proofs over the Mersenne-31 prime field using Circle STARKs and FRI. The proof system is hash-based throughout, with no EC pairings at any layer of proof generation or L1 verification.

**Poseidon hash** — Cairo 1.x defaults to Poseidon (an algebraic sponge construction over a prime field, no EC) for new contract storage slots and address derivation, actively replacing Pedersen hash (which uses Stark-curve EC point additions) throughout the Cairo VM and state trie.

## Settlement Layer

**Grade: B 🔧**

StarkNet settles to Ethereum via the SHARP (Shared Prover) service, which submits aggregated STARK proofs to a Solidity verifier contract on Ethereum L1. The L1 verifier validates hash-based STARK proofs — the verification logic itself is quantum-resistant, with no EC pairings required.

However, the verifier contract is upgradeable via a StarkWare security council multisig using EC keys. A CRQC capable of breaking EC discrete log could compromise upgrade authority and modify or disable the verifier contract. This is an administrative risk orthogonal to proof soundness: the proofs are hash-based and unforgeable, but the governance envelope around the verifier is EC-keyed.

Settlement security is bounded by Ethereum's overall posture. Ethereum has active PQC research underway, earning it an in-development rating that StarkNet inherits.

## Data Availability

**Grade: C 🗺️**

StarkNet publishes transaction data to Ethereum as EIP-4844 blobs by default. Volition mode allows per-transaction selection of on-chain (Ethereum) or off-chain (StarkWare-operated) DA. Off-chain DA under Volition relies on StarkWare-operated infrastructure with EC-signed Ethereum attestations, which adds an additional EC trust surface beyond Ethereum's own.

Ethereum's blob DA uses KZG commitments over BLS12-381 EC pairings, which are quantum-vulnerable. Ethereum's roadmap includes replacing this, without a defined algorithm or timeline. Chains using only on-chain DA inherit this trajectory. Volition users additionally accept StarkWare's EC-keyed off-chain attestations.

## Proof / Verification

**Grade: D ⚠️**

StarkNet's proof system is the strongest quantum-resistant argument of any major L2. The Stwo prover (deployed November 2025) generates Circle STARK proofs over the Mersenne-31 prime field using FRI. The entire proving pipeline — from execution trace to L1 verification — depends on hash function collision-resistance, not on elliptic-curve hardness. The Solidity STARK verifier contract on Ethereum L1 performs hash-based verification only; it requires no EC pairings.

In concrete terms: a CRQC running Shor's algorithm cannot break StarkNet STARK proofs, because there is no discrete-log problem to solve. A quantum attacker would instead need Grover's algorithm to attack the underlying hash functions, which at best halves the effective security bits — a manageable threat addressed by using hash outputs of sufficient length (which STARK proof systems already do).

The residual concern is the **Pedersen hash builtin** in the Cairo VM. Pedersen hash is computed via Stark-curve EC point additions and is used in the Merkle-Patricia trie for state commitment and in legacy Cairo 0 contracts. If a CRQC could break the Stark-curve discrete log, it could potentially construct colliding Pedersen hash inputs and forge state root values — an attack on state integrity, not proof soundness. The Poseidon migration in Cairo 1.x is actively replacing Pedersen for new storage and contract addresses, but legacy Pedersen usage persists in existing contracts and the trie until the migration is complete.

The rating reflects the genuine quantum-resistant design of the STARK proof system, tempered by the incomplete Pedersen retirement: stronger than any SNARK-based L2, but not fully clean while EC-based Pedersen remains in legacy use.

## Transaction Signatures

**Grade: D ⚠️**

StarkNet's default transaction signature scheme is ECDSA on the Stark curve — a Weierstrass elliptic curve defined over a ~252-bit prime field. Like secp256k1 and all other Weierstrass curves, the Stark curve is vulnerable to Shor's algorithm: a CRQC could recover private keys from public keys and forge arbitrary transaction signatures.

The critical architectural distinction is StarkNet's **native account abstraction**: every StarkNet account is a smart contract, and signature verification is part of account contract logic, not hardcoded into the protocol. This means a PQC signature scheme can be deployed as an account contract class without a protocol-level hard fork, as long as verification is implementable in Cairo.

This potential has been realized in practice. The **s2morrow community project** has implemented Falcon-512 (a NIST-selected lattice-based signature scheme) in pure Cairo and deployed Falcon-512 account contracts on StarkNet mainnet. Users can create Falcon-512 accounts and sign transactions with Falcon-512 keys. This is not a protocol-level default — the standard OpenZeppelin account contract uses Stark-curve ECDSA, and there is no StarkWare-backed migration roadmap to make PQC the default — but live Falcon-512 accounts on mainnet is a materially different situation from the zero PQC activity found in comparable SNARK-based L2s.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for StarkNet in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

StarkNet full nodes (Papyrus by StarkWare, Pathfinder by Equilibrium, Juno by NethermindEth) sync via libp2p. The p2p layer uses standard libp2p transports with the Noise protocol for encryption. Node identity and key exchange rely on EC keys (Ed25519 or secp256k1 for node IDs; X25519 ECDH for the Noise handshake). RPC endpoints use classical TLS 1.3 with ECDHE key exchange.

No PQC hybrid key exchange, no ML-KEM handshake, and no p2p networking PQC work has been published by any StarkNet client team. The centralized sequencer means the p2p network is currently used for full-node sync and state propagation, not BFT consensus. Once sequencer decentralization proceeds, a consensus-layer p2p network will be introduced, adding additional EC-keyed components.

## On-Chain Environment

**Grade: D ⚠️**

StarkNet runs the Cairo VM, not the EVM. The Cairo VM includes several cryptographic primitives:

**EC-based builtins:** The EC operations builtin supports Stark-curve EC point addition and scalar multiplication. The Pedersen hash builtin computes hashes using Stark-curve EC operations (see Proof / Verification). Additionally, `secp256k1_*` and `secp256r1_*` syscalls are available in Cairo 1.x for Ethereum-compatible signature verification. All of these are EC-based and quantum-vulnerable.

**Quantum-safe builtins:** The Poseidon hash builtin computes hashes using a prime-field permutation with no EC operations — quantum-safe. The Keccak and bitwise builtins are also quantum-safe.

**PQC signature verification:** No Cairo VM builtin or system call for ML-DSA, Falcon, SPHINCS+, or any other NIST PQC scheme exists at the protocol level. However, Cairo is Turing-complete, and Falcon-512 signature verification has been implemented in pure Cairo by the s2morrow project. On-chain Falcon-512 verification is live on mainnet, albeit at high Cairo step cost (~9.5M steps per verification). A dedicated PQC verification builtin would dramatically reduce this cost and is the natural next step if StarkWare were to formalize PQC support.

The rating reflects the coexistence of EC-vulnerable builtins and live community-deployed PQC verification, with ongoing Poseidon adoption reducing the EC hash dependency over time.

## Other Features

**Grade: D ⚠️**

**StarkGate bridge:** The official StarkNet L1↔L2 bridge. L1 deposit transactions are signed with user secp256k1 ECDSA. L1-to-L2 message passing is triggered by Ethereum events. L2-to-L1 withdrawal proofs are verified via the hash-based STARK verifier — the withdrawal verification path is quantum-resistant. Bridge governance (upgrade authority) uses an EC-keyed StarkWare multisig on L1. The split between hash-based withdrawal verification and EC-keyed governance represents a mixed posture.

**Pedersen-to-Poseidon migration:** The ongoing migration of Cairo's state commitment hashing from Pedersen (Stark-curve EC point addition) to Poseidon (prime-field permutation, no EC) is the most concrete active PQC-positive development in StarkNet's history. Cairo 1.x defaults to Poseidon for new contract storage slots and addresses. Legacy contracts and existing trie entries still use Pedersen; the migration is ongoing. Completing this migration would remove the primary EC dependency from StarkNet's internal hash layer.

**SHARP prover:** StarkWare's centralized Shared Prover aggregates proofs from StarkNet and StarkEx, submitting batched STARK proofs to Ethereum L1. The proof content is hash-based and quantum-resistant. SHARP's L1 transaction submission key is a standard EC-signed Ethereum account — a residual EC surface in the proof submission path, though not in the proof itself.

## EC Sunset

**Grade: F ❌**

StarkWare has publicly emphasized the quantum resistance of the STARK proof system while not publishing a formal plan to remove EC-based cryptography from transaction signatures, networking, or the Cairo VM's EC builtins. The Pedersen-to-Poseidon migration is the only active EC-displacement effort, and it addresses the internal hash layer rather than signatures or key management.

The practical stance appears to be: the proof system is safe; transaction signatures are fixable via account abstraction when needed; no formal timeline has been set for any of this. No SNIPs (StarkNet Improvement Proposals) addressing PQC migration have been identified.

For reference, StarkNet's PQC-adoption ratings per category are: Settlement B 🔧, DA C 🗺️, Proof D ⚠️, Tx Sigs D ⚠️, Networking ❌, On-Chain D ⚠️, Other D ⚠️.

EC is present in transaction signatures (Stark-curve ECDSA), networking (libp2p X25519/Ed25519), the Cairo VM (EC ops builtin, Pedersen hash builtin, secp256k1/r1 syscalls), and governance multisigs. The Poseidon migration addresses one EC-based hash function. No other EC component has a published retirement plan.

## Governance

StarkNet improvement proposals (SNIPs) are the protocol's RFC process. The StarkNet Foundation governs the protocol; StarkWare retains effective technical control over the Cairo VM, SHARP, and the sequencer. No SNIPs addressing PQC migration have been identified. The STARK proof system's quantum resistance has been acknowledged publicly by StarkWare, but signature vulnerability has not been formally addressed in governance.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
