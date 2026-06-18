# zkSync Era (ZK) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | zkSync Era |
| **Ticker** | ZK |
| **Website** | https://era.zksync.io |
| **GitHub** | https://github.com/matter-labs |
| **Stack** | ZK Stack |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | ZK-SNARK — STARK/FRI inner prover (Boojum) wrapped in PLONK + KZG over BN254 for L1 verification |
| **Sequencer model** | Centralized (Matter Labs) |
| **On-chain environment** | EVM-equivalent (zkEVM) with native account abstraction |

---

## PQC Readiness Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | C | 🗺️ | Roadmapped |
| Data Availability | C | 🗺️ | Roadmapped |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

---

## Summary

zkSync Era is Matter Labs' flagship deployment of the ZK Stack, a ZK-SNARK rollup framework built on top of Ethereum. The chain settles on Ethereum, inheriting whatever PQC migration progress Ethereum makes — but a Layer 2 cannot exceed the security of its settlement layer, and Ethereum's own migration is still in progress.

zkSync Era's most distinctive cryptographic surface is its Boojum proof system. Boojum is a two-layer architecture: the inner prover uses STARK/FRI over the Goldilocks field (a hash-based, quantum-favorable approach), but the outer proof that is actually submitted to Ethereum for L1 verification is wrapped in PLONK + KZG over the BN254 curve — an EC-pairing-based scheme that is quantum-vulnerable. The hash-based inner layer offers no practical protection so long as the L1-verified outer wrapper remains BN254. Across transaction signatures, networking, on-chain primitives, and governance tooling, the chain relies entirely on EC cryptography with no migration activity publicly identified from Matter Labs.

---

## Proposed and Implemented PQC Algorithms

zkSync Era does not currently propose or implement any post-quantum cryptographic algorithms.

---

## Settlement Layer

**Grade: C 🗺️**

zkSync Era settles on Ethereum. Ethereum is actively working on PQC migration — EIP-7696, EIP-7702, and the broader verkle/PQC roadmap represent in-progress work — so the settlement layer carries a "roadmapped" status rather than a flat failure. However, the upgrade contracts that govern zkSync Era on Ethereum are controlled by EC multisig keys (held by the ZK Nation Security Council). A cryptographically relevant quantum computer (CRQC) that can break secp256k1 could compromise those upgrade keys and authorize malicious changes to the settlement contracts independently of any proof forgery. Until those upgrade keys are migrated, the effective settlement security is constrained by EC key security.

---

## Data Availability

**Grade: C 🗺️**

zkSync Era publishes transaction data to Ethereum as EIP-4844 blobs. The blob attestation mechanism relies on Ethereum's BLS signature scheme over BLS12-381, which is on Ethereum's migration roadmap. Accordingly, the DA rating inherits Ethereum's roadmapped status. zkSync Era does not use Validium mode (off-chain DAC), which avoids the additional EC-signed attestation exposure that would apply if it did. If a ZK Stack deployment does use Validium mode, that deployment faces an independent ❌ DA rating since DAC attestation keys have no published migration plan.

---

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for zkSync Era in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

zkSync Era uses the Boojum prover — a two-layer system. The inner prover implements the Redshift protocol: PLONK IOP with FRI-based polynomial commitments over the Goldilocks field (p = 2⁶⁴ − 2³² + 1). This inner proof is transparent (no trusted setup), hash-based, and is considered quantum-favorable. The outer proof wraps the inner result in PLONK or Fflonk with KZG commitments over BN254. It is this outer, BN254-based proof that the Ethereum L1 verifier contract checks. BN254 KZG relies on elliptic curve pairings and is quantum-vulnerable. A CRQC could forge the outer KZG proof and cause Ethereum's verifier to accept an invalid state transition. The inner STARK layer provides no protection against this attack because Ethereum never sees the inner proof. No roadmap exists from Matter Labs to replace BN254 with a quantum-resistant commitment scheme.

---

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for zkSync Era in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

zkSync Era uses ECDSA over secp256k1 for transaction signing, matching Ethereum's standard. Address derivation follows the same path as Ethereum (Keccak-256 of the secp256k1 public key, last 20 bytes). zkSync Era features native account abstraction — every account is a smart contract by default — and custom account contracts can theoretically implement alternative signature verification logic, including PQC algorithms. However, Matter Labs has not defined a standard PQC account interface, no PQC signature scheme has been proposed at the protocol level, and native AA alone does not constitute a migration path under the evaluation rubric.

---

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for zkSync Era in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

zkSync Era operates a centralized sequencer run by Matter Labs. There is no permissionless peer-to-peer consensus network; ZK Stack nodes can sync state but do not participate in ordering. RPC endpoints use standard HTTPS/TLS 1.3 with classical ECDHE key exchange. No hybrid post-quantum TLS ciphers have been identified. The centralized sequencer's EC signing key for batch submissions to Ethereum L1 is a notable target: compromise of that key enables batch submission manipulation, though it does not by itself allow forging the validity proof.

---

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for zkSync Era in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

zkSync Era's zkEVM is EVM-equivalent and exposes the standard Ethereum precompile set: `ecrecover` (0x01), `ecAdd`/`ecMul`/`ecPairing` over BN254 (0x06–0x08), `modexp` (0x05), SHA-256 (0x02), and Keccak-256. No PQC signature verification precompile or system contract exists. There is no roadmap to add one. The presence of EC precompiles (`ecrecover`, BN254 operations) is noted as an EC Sunset concern; the ❌ here reflects the absence of any PQC verification primitive.

---

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for zkSync Era in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Several ZK Stack-specific features have meaningful cryptographic exposure:

**Shared Bridge**: The ZK Stack shared bridge allows multiple ZK Stack deployments to share a single L1 bridge contract on Ethereum, enabling cross-chain asset transfers within the ecosystem. Bridge deposits and withdrawals are EC-signed (secp256k1), and bridge security ultimately depends on both the BN254 KZG proof system and the EC upgrade admin keys. A CRQC that breaks either secp256k1 or BN254 could enable theft of bridged assets across all connected chains simultaneously, amplifying the blast radius compared to a single-chain bridge.

**Native Account Abstraction**: Every account is a smart contract, with the default implementation using secp256k1 ECDSA. Custom accounts can override signature verification, but no PQC account standard exists and no interoperability tooling has been proposed.

**ZK Nation Security Council**: The Security Council holds emergency upgrade authority over zkSync Era's settlement contracts on Ethereum. All Security Council actions use EC multisig (secp256k1). These keys are a high-value target: compromise allows malicious upgrade of the settlement contracts, bypassing the proof system entirely.

---

## EC Sunset

**Grade: F ❌**

We have found no public information indicating migration activity for zkSync Era in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Matter Labs has published no roadmap to retire EC from any layer of zkSync Era or the ZK Stack. No ZKsync Improvement Proposals (ZIPs) and no ZK Nation governance discussions related to EC sunset have been identified.

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Settlement 🗺️, DA 🗺️, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

---

## Governance

Protocol upgrades for zkSync Era are governed through a combination of ZK Nation DAO (ZK token-weighted voting) and a Security Council. The Security Council holds emergency upgrade authority and its actions are executed via EC multisig on Ethereum. Time-delayed execution applies to normal governance proposals; emergency changes bypass the delay. The proposal system uses ZKsync Improvement Proposals (ZIPs) and the ZK Nation governance forum. No ZIP or forum discussion related to PQC migration has been identified. ZK Stack chain operators govern their own deployments but inherit the core proving stack from Matter Labs.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
