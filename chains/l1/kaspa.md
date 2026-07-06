# Kaspa (KAS) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Kaspa |
| **Ticker** | KAS |
| **Website** | https://kaspa.org |
| **GitHub** | https://github.com/kaspanet |
| **On-chain environment** | UTXO (Covenants++ pending) |
| **Mainnet genesis** | 2021-11-07 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Kaspa's PQC migration is at the early proposal stage. The chain uses Schnorr signatures over secp256k1 for transactions, which are vulnerable to Shor's algorithm. Two community proposals target quantum resistance: [KIP-22](https://github.com/kaspanet/kips/pull/37) (Pay-to-Merkle-Root ScriptPublicKey) introduces a new versioned output type enabling quantum-resistant spending conditions with MAST, and the [P2PKH-Blake2b community proposal](https://github.com/bitcoinsSG/Kaspa-Post-Quantum-Improvement-Proposal) hides public keys behind hash commitments until spend time, deferring — but not eliminating — quantum exposure. An implementation draft ([rusty-kaspa#761](https://github.com/kaspanet/rusty-kaspa/pull/761)) adds Falcon-512 signature support to the transaction script engine, but the PR has been stale since December 2025 with an unresolved wasm build blocker.

On the positive side, Kaspa's kHeavyHash PoW consensus is entirely hash-based and quantum-safe, and the GHOSTDAG blockDAG protocol has no EC dependencies. The Covenant Hardfork (May 5, 2026) introduces smart contract capabilities via Covenants++ but has not committed to PQC signature verification in the initial rollout.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **Falcon-512** (Padded) | Schnorr secp256k1 | Tx Signatures | Discussed (open draft PR [rusty-kaspa#761](https://github.com/kaspanet/rusty-kaspa/pull/761), stale since Dec 2025) |
| **P2MR / MAST** (KIP-22) | secp256k1 key exposure | Tx Signatures | Discussed (KIP proposal [kips#37](https://github.com/kaspanet/kips/pull/37)) |
| **Blake2b-256 hash commitment** | Direct pubkey exposure | Tx Signatures (defense-in-depth) | Discussed (community proposal, wallet-layer, no consensus change) |

## 1. Transaction Signatures

**Grade: D ⚠️**

Kaspa transactions are signed with Schnorr signatures over secp256k1, which are broken by Shor's algorithm. Like Bitcoin, Kaspa's UTXO model provides a partial natural defense: funds in hash-based addresses do not reveal the public key until first spend. However, once a public key is exposed on-chain (via spending or address reuse), a quantum attacker could derive the private key and steal funds from any remaining outputs tied to that key.

Two proposals address this vulnerability. [KIP-22](https://github.com/kaspanet/kips/pull/37) (March 2026) proposes a Pay-to-Merkle-Root ScriptPublicKey version that commits to a tapleaf merkle root rather than a key, enabling quantum-resistant spending conditions with MAST. The design is structurally similar to Bitcoin's BIP-360 (P2MR), adapted for Kaspa's transaction model. The implementation companion, [rusty-kaspa#761](https://github.com/kaspanet/rusty-kaspa/pull/761) (opened November 2025), adds **Falcon-512** (Padded) signature verification to the transaction script engine, but the PR has been stale since December 2025 due to an unresolved wasm build issue in the upstream `pqcrypto` crate.

Separately, the [P2PKH-Blake2b-256-via-P2SH community proposal](https://github.com/bitcoinsSG/Kaspa-Post-Quantum-Improvement-Proposal) hides public keys behind Blake2b-256 hash commitments until spend time. This is deployable at the wallet layer without a hard fork and narrows the quantum-attack window, but it does not replace EC signatures — it only defers public key exposure.

**Current state.** Mainnet transactions are exclusively Schnorr secp256k1. No PQC signature scheme has been merged, feature-flagged, or deployed on any Kaspa test network.

**Planned future work.** KIP-22 and rusty-kaspa#761 remain open proposals with no activation timeline. The Covenant Hardfork (May 5, 2026) does not include PQC signature support in its scope.

## 2. Consensus

**Grade: A ✅**

Kaspa secures consensus with kHeavyHash proof-of-work over a GHOSTDAG blockDAG. Proof-of-work is hash-based, so it is not exposed to Shor's algorithm the way elliptic-curve signature schemes are — the consensus layer is quantum-resistant by construction and requires no migration.

**Current state.** kHeavyHash proof-of-work on a GHOSTDAG blockDAG; no elliptic-curve dependency in the consensus mechanism.

**Planned future work.** None required for quantum resistance at the consensus layer.

## 3. P2P Networking

**Grade: F ❌**

Kaspa uses a gRPC-based P2P networking layer (implemented in the [rusty-kaspa](https://github.com/kaspanet/rusty-kaspa) Rust codebase). The node identity scheme (exposed via the `p2pId` field in `GetInfoResponseMessage`) and the transport encryption protocol are not publicly documented. Without explicit documentation, node identity and handshake are assumed to depend on EC keys, making them vulnerable to quantum impersonation and session-key derivation attacks.

**Current state.** No PQC transport or identity mechanism is documented or implemented.

**Planned future work.** No PQC roadmap items have been identified for P2P networking.

## 4. On-Chain Logic

**Grade: ➖ Not Applicable**

Kaspa does not currently support smart contracts on L1. The chain operates on a UTXO model with no general-purpose VM. The Covenant Hardfork (May 5, 2026) introduces Covenants++ and a scripting language (SilverScript) for advanced transaction rules, but the initial rollout has not committed to PQC signature verification precompiles or opcodes.

KRC-20 tokens exist via the Kasplex Layer 2 ecosystem, but L1 on-chain logic for cryptographic verification does not yet exist.

**Current state.** No smart contracts or on-chain cryptographic verification on L1.

**Planned future work.** Covenants++ will enable new transaction logic; PQC verification support is not confirmed for initial scope.

## 5. Other Features

Kaspa does not have special features with additional quantum exposure beyond what is covered in other categories. The GHOSTDAG blockDAG structure and kHeavyHash PoW mining are hash-based and quantum-safe.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Kaspa's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ✅, P2P ❌, On-Chain ➖, Other ➖.

No published proposal addresses the retirement of EC-based cryptography from Kaspa. The P2PKH-Blake2b community proposal hides public keys behind hash commitments but does not replace Schnorr/secp256k1 signatures. KIP-22 and the Falcon-512 draft would add a PQC signature path alongside EC but do not schedule EC removal. There is no timeline or roadmap for disabling legacy Schnorr/secp256k1 transaction signing.

Consensus is already EC-free (kHeavyHash PoW). P2P networking has no PQC migration plan and no EC retirement plan. On-chain logic does not yet exist, so there is nothing to sunset.

**Current state.** Kaspa remains fully EC-dependent for transaction signatures. No EC retirement proposal exists.

**Planned future work.** None published. A full PQC replacement of Schnorr/secp256k1 would require a coordinated hard fork and community consensus.

## Governance

Kaspa is a community-driven project with no foundation, central authority, or on-chain voting mechanism. DAGLabs (the original R&D company) was dissolved at the fair launch in November 2021. Protocol changes are proposed and discussed informally via GitHub, Discord, and community forums. Hard fork adoption requires network-wide consensus among nodes and miners.

PQ-relevant proposals:

- [KIP-22 (kips#37)](https://github.com/kaspanet/kips/pull/37) — P2MR ScriptPublicKey for quantum-resistant spending conditions with MAST. Status: Open KIP proposal.
- [rusty-kaspa#761](https://github.com/kaspanet/rusty-kaspa/pull/761) — Add Falcon-512 (Padded) signature scheme support to txscript. Status: Open draft PR (stale since December 2025).
- [P2PKH-Blake2b-256-via-P2SH](https://github.com/bitcoinsSG/Kaspa-Post-Quantum-Improvement-Proposal) — Community proposal for hash-committed public keys at wallet layer. Status: Community proposal, no formal KIP.
- [Covenant Hardfork](https://www.gate.com/news/detail/18949599) — May 5, 2026 hard fork enabling Covenants++ and smart contract capabilities. PQC is not in scope for initial rollout.

---

_Generated on 07 May 2026 based on information as of 07 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
