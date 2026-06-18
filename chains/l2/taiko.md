# Taiko (TKO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Taiko |
| **Ticker** | TKO |
| **Website** | https://taiko.xyz |
| **GitHub** | https://github.com/taikoxyz |
| **Stack** | Based rollup (Type-1 zkEVM) |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | ZK-SNARK (Groth16/PLONK over BN254) with STARK inner provers (SP1, RISC Zero) and SGX TEE attestation; optimistic fallback |
| **Sequencer model** | Based (L1-sequenced — Ethereum proposers) |
| **On-chain environment** | EVM (Type-1, fully Ethereum-equivalent) |
| **Mainnet launch** | 2024-05 |

## Summary Table

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | B | 🔧 | In Development |
| Data Availability | C | 🗺️ | Roadmapped |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | ➖ | ➖ | Not Applicable |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Summary

Taiko is a Type-1 zkEVM built as a based rollup on Ethereum, meaning Ethereum L1 validators (block proposers) also sequence L2 transactions directly. This tight coupling with Ethereum means Taiko inherits Ethereum's PQC posture for settlement and data availability — a double-edged situation where Taiko benefits from Ethereum's in-progress PQC work but cannot outpace it. Taiko's settlement grade reflects Ethereum's in-development PQC trajectory (🔧), and its DA grade reflects that Ethereum blob commitments use KZG over BLS12-381 pairings with replacement crypto on the Ethereum roadmap but not yet shipped (🗺️).

Taiko's own proof system is its most significant quantum vulnerability. Taiko uses a multi-prover framework (Raiko) combining SP1, RISC Zero, and SGX TEE attestation. While SP1 and RISC Zero use STARK-based inner provers (hash-based and quantum-favorable), both converge on Groth16 or PLONK over BN254 EC pairings for final on-chain verification at the Ethereum L1 contract. This means the quantum-favorable inner layers provide no protection against a cryptographically relevant quantum computer — the BN254 outer wrapper remains the verification bottleneck, and it is quantum-vulnerable. The SGX attestation path uses ECDSA P-256, adding a second EC-based vulnerability. Transaction signatures and the on-chain environment are standard EVM (secp256k1 ECDSA, `ecrecover`, BN254 precompiles) with no PQC primitives. Taiko Labs has published no PQC roadmap or migration discussions across any category.

## Proposed and Implemented PQC Algorithms

Taiko does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: B 🔧**

Taiko settles to Ethereum via the TaikoL1 smart contract, which accepts ZK validity proofs (or optimistic fallback assertions) attesting to correct L2 execution. Because Taiko uses based sequencing, Ethereum L1 validators directly propose L2 blocks as part of normal L1 block production — tying L2 finality even more tightly to L1 validator key security than a typical rollup. This means any compromise of Ethereum's validator key infrastructure would directly affect Taiko's ordering integrity.

Ethereum's PQC migration is actively in progress (EIP-7696 and related efforts for account abstraction, Ethereum Foundation PQC working group), placing the settlement grade at 🔧 In Development — though no PQC migration has shipped to mainnet yet. The upgrade-admin multisig that controls TaikoL1 and bridge contracts on Ethereum is EC-keyed; a cryptographically relevant quantum computer forging those keys could drain the bridge or modify the rollup contract logic.

## Data Availability

**Grade: C 🗺️**

Taiko posts transaction data to Ethereum as blobs (EIP-4844). There is no separate DA committee — availability is fully Ethereum-native. Blob commitments use KZG polynomial commitments over BLS12-381, which is an EC-pairing-based scheme and quantum-vulnerable. Ethereum's roadmap includes replacing KZG with a quantum-safe alternative, but this work has not been finalized or shipped. The DA grade therefore inherits Ethereum's roadmap status: a credible plan exists upstream, but implementation has not started at the Ethereum layer.

## Proof / Verification

**Grade: F ❌**

Taiko's proof system is the chain's most complex and most quantum-exposed surface. The Raiko prover framework requires multiple proof types in combination:

- **SP1 (Succinct Labs)**: A zkVM that executes Taiko's block builder. The inner proof is STARK-based (hash-based, quantum-favorable), but the final proof submitted to Ethereum is compressed to Groth16 or PLONK over BN254 EC pairings via gnark.
- **RISC Zero**: Another STARK-based zkVM using FRI-based inner proofs (hash-based, quantum-favorable), similarly translated to Groth16 over BN254 for on-chain verification.
- **SGX TEE (Intel TDX)**: Hardware-based trusted execution attestation. SGX remote attestation uses ECDSA P-256 keys rooted in Intel's provisioning infrastructure.

The quantum-favorable STARK inner layers are irrelevant from a security standpoint while the BN254 outer wrapper remains in place — a cryptographically relevant quantum computer could forge BN254 proofs and finalize invalid L2 state on Ethereum. SGX attestation provides an additional attack surface via P-256. Taiko achieved 100% ZK proof coverage in December 2025, but all three proof modes converge on EC cryptography at the L1 verification boundary.

No PQC proof system migration has been announced or discussed publicly.

> We have found no public information indicating migration activity for Taiko in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Transaction Signatures

**Grade: F ❌**

Taiko is a Type-1 zkEVM — fully Ethereum-equivalent — so transaction signing is identical to Ethereum: ECDSA over secp256k1, with address derivation as the last 20 bytes of the keccak-256 hash of the public key. ERC-4337 account abstraction is supported at the application layer, and EIP-7702 support tracks Ethereum's EVM version. However, application-layer PQC wallets via ERC-4337 do not constitute a protocol-level migration.

No PQC transaction type has been proposed or is in development.

> We have found no public information indicating migration activity for Taiko in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Networking

**Grade: ➖**

Taiko uses based sequencing: there is no dedicated L2 sequencer or sequencer gossip network. Ethereum L1 validators propose L2 blocks as part of normal L1 block production, so L2 ordering derives entirely from L1. Full nodes sync from Ethereum L1 rather than a separate L2 p2p network. The absence of a dedicated L2 sequencer p2p layer eliminates one attack surface relative to typical rollups. RPC transport is standard JSON-RPC over TLS (classical ECDHE), which is infrastructure-layer rather than protocol-layer. There is no dedicated L2 p2p network to evaluate for PQC.

## On-Chain Environment

**Grade: F ❌**

Taiko is Type-1 EVM-equivalent, supporting Ethereum's full precompile set: `ecrecover` (0x01), `ecAdd`/`ecMul`/`ecPairing` over BN254 (0x06–0x08), `modexp` (0x05), SHA-256 (0x02), RIPEMD-160 (0x03), and `blake2f` (0x09). No PQC signature verification primitive (ML-DSA, Falcon, SPHINCS+, or similar) is available on-chain. Taiko would inherit any future Ethereum EIP that adds PQC precompiles, but none have been finalized at the Ethereum layer.

> We have found no public information indicating migration activity for Taiko in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

**Grade: F ❌**

**Signal-based bridge**: Taiko uses a signal-based cross-layer messaging system for L1↔L2 communication. Messages are verified via Merkle proofs against the respective chain's state root, with state root integrity guaranteed by Ethereum consensus (EC-signed validators). The bridge contracts on Ethereum are controlled by an EC-keyed Taiko Labs admin multisig; forging those keys via a quantum attack would allow arbitrary bridge contract upgrades or fund extraction.

**SGX TEE attestation**: The Raiko prover optionally uses Intel SGX TEE to attest that proofs were computed in a trusted execution environment. Intel's remote attestation chain uses ECDSA P-256 or RSA-2048 (Intel-issued quote signing keys). A quantum computer breaking P-256 could forge SGX attestations, allowing a malicious prover to pass fraudulent proofs through the SGX verification path. Intel's attestation root-of-trust has not been PQC-hardened.

> We have found no public information indicating migration activity for Taiko in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## EC Sunset

**Grade: F ❌**

No PQC discussions have been found in Taiko governance, documentation, or public communications. There is no plan to retire EC cryptography in any category.

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Settlement 🔧, DA 🗺️, Proof ❌, Tx Sigs ❌, Networking ➖, On-Chain ❌, Other ❌.

## Governance

Taiko Labs controls protocol development. The TKO token enables governance for ecosystem grants and future protocol parameter changes. Protocol upgrade proposals are published informally via blog, GitHub, and forum posts — there is no formal on-chain governance for protocol upgrades. Taiko Labs holds multisig upgrade authority over TaikoL1 and bridge contracts on Ethereum mainnet. No PQC-related governance proposals have been filed.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
