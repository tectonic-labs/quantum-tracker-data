# Polygon CDK (POL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Polygon CDK / AggLayer |
| **Ticker** | POL |
| **Website** | https://docs.polygon.technology/cdk/ |
| **GitHub** | https://github.com/0xPolygon/cdk |
| **Stack** | Polygon CDK |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (rollup) / DAC (validium) / pluggable |
| **Proof type** | ZK-SNARK — eSTARK inner / FFLONK over BN254 outer |
| **Sequencer model** | Centralized per-chain operator |
| **On-chain environment** | Type-2 zkEVM |

## Summary Table

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

## Summary

Polygon CDK is a ZK-SNARK rollup/validium framework for deploying Ethereum L2 chains. Its proof system uses a two-layer architecture: an inner **eSTARK** prover (hash-based, quantum-favorable) wrapped in an outer **FFLONK** SNARK over **BN254** elliptic-curve pairings for cheap L1 verification. The inner STARK layer is genuinely quantum-favorable, but the mandatory BN254 outer wrapper is the proof that Ethereum actually verifies — and it is quantum-vulnerable. This is the same STARK-inner/SNARK-outer pattern found in zkSync (Boojum), Scroll (OpenVM), and Linea.

The AggLayer, which aggregates validity proofs from multiple connected chains and enforces cross-chain balance safety via pessimistic proofs, follows the same pattern: SP1 zkVM / Plonky3 (STARK inner) compressed to Groth16/BN254 (SNARK outer) for on-chain verification.

Polygon zkEVM Mainnet Beta, Polygon Labs' flagship CDK deployment, is sunsetting on July 1, 2026. This shutdown is operational and strategic — not PQC-motivated. The CDK continues as an open-source framework for third-party chain deployments, and ZK proving research is spinning off into a dedicated entity called Polygon ZisK.

No PQC migration activity has been identified for any layer of the Polygon CDK stack.

## Proposed and Implemented PQC Algorithms

Polygon CDK does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: B 🔧 In Development**

Polygon CDK chains settle to Ethereum: the aggregator submits FFLONK validity proofs to an L1 verifier contract, and state root updates are accepted after proof verification. Ethereum has PQC migration actively in progress (EIP-based signature work, verkle/PQC roadmap), giving the settlement layer a B-tier inherited rating.

The upgrade authority over CDK core contracts is held by the Polygon Protocol Council, a 13-member EC multisig. Standard upgrades require 7/13 signatures with a 10-day timelock; emergency upgrades require 10/13 with no timelock. Council members use secp256k1 EC keys. PIP-50 provides POL token staker oversight. These EC multisig keys are a high-value target: compromise would enable malicious upgrades to settlement and bridge contracts on Ethereum, bypassing the proof system entirely.

## Data Availability

**Grade: C 🗺️ Roadmapped**

CDK chains can be configured in rollup mode or validium mode. In rollup mode, transaction data is published as Ethereum blobs (EIP-4844), so DA security inherits from Ethereum's consensus and blob commitment scheme. Blob commitments use KZG polynomial commitments over BLS12-381 pairings — quantum-vulnerable, but Ethereum's roadmap includes replacing KZG with a quantum-safe scheme. This gives rollup-mode DA a roadmapped rating.

In validium mode, a Data Availability Committee (DAC) signs availability attestations with EC keys via the `datacommittee.sol` contract on Ethereum. This is independently quantum-vulnerable (F-rated) and is not covered by Ethereum's PQC migration plans. CDK also supports pluggable DA backends (Avail, Celestia, Near DA), none of which are known to have PQC-hardened attestation.

The default rollup mode rating applies to this evaluation.

## Proof / Verification

**Grade: F ❌ Not Discussed**

The Polygon CDK prover generates eSTARK proofs internally using FRI-based polynomial commitments — these inner proofs are hash-based, transparent (no trusted setup), and quantum-favorable. However, the inner STARK proofs are then recursively compressed through multiple stages into a final constant-size FFLONK proof over BN254 elliptic-curve pairings for L1 verification. FFLONK is a KZG-style SNARK construction — quantum-vulnerable via Shor's algorithm. The L1 verifier contract checks the outer BN254 proof only, using EVM BN254 precompiles (ecAdd, ecMul, ecPairing at addresses 0x06-0x08).

The inner eSTARK/FRI layer is a genuine quantum-favorable component. If Ethereum eventually supports efficient STARK verification on L1 (e.g., via a hash-based precompile), CDK chains could in theory drop the SNARK wrapper. This is a potential migration path but not a current plan.

No published roadmap from Polygon Labs or Polygon ZisK exists to migrate the CDK prover away from BN254/FFLONK to a quantum-resistant final proof.

> We have found no public information indicating migration activity for Polygon CDK in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Transaction Signatures

**Grade: F ❌ Not Discussed**

All user transactions on CDK zkEVM chains use ECDSA over secp256k1, identical to the standard EVM transaction format. Address derivation follows the Ethereum standard (last 20 bytes of Keccak-256 of the secp256k1 public key). ERC-4337 account abstraction is supported at the application layer, but application-layer PQC wallets do not constitute a protocol-level migration per our evaluation rubric. No PQC transaction type has been published by Polygon Labs or the CDK project.

> We have found no public information indicating migration activity for Polygon CDK in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Networking

**Grade: F ❌ Not Discussed**

Each CDK chain operates a single centralized sequencer controlled by the chain deployer. There is no shared sequencer or decentralized sequencing protocol. CDK uses libp2p for node synchronization and state propagation; the sequencer is the sole transaction orderer. GRPC is used for internal service communication. RPC endpoints use standard HTTPS/TLS 1.3 with classical ECDHE key exchange. Node identity uses EC keys (Ed25519 or secp256k1 via libp2p). No PQC-hardened transport or node identity work has been published.

The centralized sequencer model means the sequencer's EC signing key for batch submissions to L1 is a single point of cryptographic failure.

> We have found no public information indicating migration activity for Polygon CDK in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Environment

**Grade: F ❌ Not Discussed**

Polygon CDK runs a Type-2 zkEVM with the standard Ethereum precompile set: `ecrecover` (0x01), `ecAdd`/`ecMul`/`ecPairing` over BN254 (0x06-0x08), `modexp` (0x05), SHA-256 (0x02), RIPEMD-160 (0x03), `identity` (0x04), and `blake2f` (0x09). No PQC signature verification primitive (ML-DSA, Falcon, SPHINCS+, or similar) is available on-chain. CDK chains would inherit any future Ethereum EVM precompile additions if the CDK tracks upstream EVM versions, but no PQC precompile work is in progress.

> We have found no public information indicating migration activity for Polygon CDK in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

**Grade: F ❌ Not Discussed**

**AggLayer pessimistic proofs**: The AggLayer aggregates validity proofs from multiple connected chains (CDK and non-CDK) and enforces cross-chain balance safety. Pessimistic proofs went live on mainnet February 3, 2025 (AggLayer v0.2). These proofs are written in Rust and proven using the SP1 zkVM (Succinct Labs) with Plonky3 as the proving backend. Plonky3 uses STARK/FRI over BabyBear field (hash-based inner proof). For on-chain verification, SP1 wraps the final proof into a Groth16 or PLONK SNARK over BN254 — the same EC-pairing-based outer wrapper pattern. A CRQC forging the BN254 SNARK wrapper could enable cross-chain theft across the entire AggLayer-connected set.

**Unified LxLy bridge**: The unified bridge enables cross-chain asset transfers between all AggLayer-connected chains using Merkle trees (local exit trees per chain, global exit tree). Bridge security depends on the pessimistic proof (BN254 SNARK) and the Protocol Council upgrade keys (EC multisig). The unified bridge amplifies quantum blast radius — it is a single shared contract securing assets from multiple chains.

**Protocol Council multisig**: The 13-member Protocol Council supervises smart contract upgrades. Standard upgrades require 7/13 with a 10-day timelock; emergency upgrades require 10/13 with no timelock. Council members use secp256k1 EC keys.

> We have found no public information indicating migration activity for Polygon CDK in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## EC Sunset

**Grade: F ❌ Not Discussed**

No Polygon Labs or CDK plan to retire EC from any layer has been published. The Polygon zkEVM Mainnet Beta sunset (July 1, 2026) is operational and strategic — not PQC-motivated.

Adding PQC alongside EC is not the same as retiring EC. For reference, this stack's PQC-adoption ratings per category are:

| Category | PQC Adoption | EC Sunset |
|----------|:------------:|:---------:|
| Settlement Layer | 🔧 | 🔧 (inherited from Ethereum) |
| Data Availability | 🗺️ | 🗺️ for blob mode (inherited); ❌ for Validium DAC |
| Proof / Verification | ❌ | ❌ |
| Transaction Signatures | ❌ | ❌ |
| Networking | ❌ | ❌ |
| On-Chain Environment | ❌ | ❌ |
| Other Features | ❌ | ❌ |

## Governance

Polygon CDK governance is foundation-led (Polygon Labs). The Protocol Council (13 members, established via [PIP-29](https://github.com/maticnetwork/Polygon-Improvement-Proposals/blob/main/PIPs/PIP-29.md)) supervises smart contract upgrades on Ethereum. POL token stakers have oversight via PIP-50. CDK chain operators govern their own deployments but inherit the core proving stack from Polygon Labs / Polygon ZisK.

Protocol changes are proposed via PIPs (Polygon Improvement Proposals) and discussed on the Polygon Community Forum. No PIP covering PQC migration has been identified.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
