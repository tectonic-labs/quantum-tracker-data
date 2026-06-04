# Algorand (ALGO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Algorand |
| **Ticker** | ALGO |
| **Website** | https://algorand.co |
| **GitHub** | https://github.com/algorandfoundation |
| **Twitter / X** | https://x.com/Algorand |
| **On-chain environment** | AVM (Algorand Virtual Machine) |
| **Mainnet genesis** | 2019-06-11 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | A | ✅ | Shipped |
| Other Features | A | ✅ | Shipped |
| EC Sunset | F | ❌ | Not Discussed |

Algorand is one of the most PQC-advanced major blockchains. [State Proofs](https://algorand.co/technology/post-quantum) — compact attestations of ledger state generated every 256 blocks — have been signed with **Falcon-1024** since 2022, making them post-quantum secure in production. On November 3, 2025, Algorand executed the [first post-quantum transaction on a public blockchain mainnet](https://algorand.co/blog/technical-brief-quantum-resistant-transactions-on-algorand-with-falcon-signatures) using opt-in **Falcon-1024** account keys. An experimental AVM opcode for Falcon signature verification is under development, which would bring PQC verification to smart contracts.

The principal remaining exposure is the consensus layer. Algorand's [Pure Proof-of-Stake](https://algorand.co/technology/pure-proof-of-stake) uses a Verifiable Random Function (VRF) based on Curve25519 for cryptographic sortition — the process by which validators are randomly selected. That VRF is elliptic-curve-based and quantum-vulnerable. Replacing it requires a lattice-based or hash-based alternative with equivalent security guarantees, and no specification or testnet activity has been announced.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **Falcon-1024 / FN-DSA** | Ed25519 (Curve25519) | Tx Signatures | In Development (opt-in live on mainnet since Nov 2025) |
| **Falcon-1024 / FN-DSA** | Ed25519 (Curve25519) | Other (State Proofs) | Implemented (live since 2022) |
| **Falcon-1024 / FN-DSA** | Ed25519 (Curve25519) | On-Chain | Implemented (`falcon_verify` opcode live on mainnet since AVM v12 / consensus v41, Sept 2024) |

## 1. Transaction Signatures

**Grade: B 🔧**

Algorand transactions are signed with Ed25519 (Curve25519) by default. Since November 2025, accounts can opt in to **Falcon-1024** signatures via CLI, making Algorand the first major L1 to support post-quantum transaction signing on a public mainnet. Signatures are approximately 1,280 bytes with approximately 1,793-byte public keys, and verification is fast (typically under 100 microseconds).

The [technical brief](https://algorand.co/blog/technical-brief-quantum-resistant-transactions-on-algorand-with-falcon-signatures) describes the integration: core accounts remain Ed25519 by default, but account holders can voluntarily rotate to Falcon keys. Addresses remain compatible, and the protocol supports key rotation natively.

**Current state.** Ed25519 is the default signing scheme. Falcon-1024 is available as an opt-in alternative. Accounts that have rotated to Falcon keys are post-quantum secure for transaction signing; accounts on Ed25519 remain exposed.

**Planned future work.** The [2025+ roadmap](https://algorand.co/blog/algorands-2025-roadmap-building-for-real-world-use) positions the phased rollout as: State Proofs (complete), user account Falcon keys (live), AVM Falcon opcode (in progress), and consensus upgrade (planned, dependent on post-quantum VRF). Open pull requests include [go-algorand#6573](https://github.com/algorand/go-algorand/pull/6573) (quantum-hardened LogicSig address derivation) and [algorand/falcon#15](https://github.com/algorand/falcon/pull/15) (vectorized Falcon verification speedup).

## 2. Consensus

**Grade: F ❌**

Algorand's [Pure Proof-of-Stake](https://developer.algorand.org/docs/get-details/algorand_consensus/) consensus uses Verifiable Random Functions (VRFs) on Curve25519 for cryptographic sortition. All nodes independently run the VRF to determine committee membership for block proposal, soft vote, and certify vote phases. The VRF is elliptic-curve-based: a quantum adversary capable of breaking Curve25519 could predict block proposers and committee members, disrupting consensus — though this would not enable spending of Falcon-locked funds.

**Falcon-1024** signatures, which protect transaction signing and State Proofs, do not secure the consensus layer because consensus relies on VRF output, not signature verification.

**Current state.** The VRF uses Curve25519. No post-quantum VRF has been specified, prototyped, or tested.

**Planned future work.** The Algorand Foundation is researching lattice-based VRF replacements (NTRU family), but no ETA has been announced. A VRF replacement cannot be opt-in — consensus rules must align network-wide, requiring a protocol hard fork with formal safety proofs.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Algorand in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: A ✅**

Algorand's [AVM](https://developer.algorand.org/docs/get-details/dapps/avm/) is a stack-based bytecode interpreter running on every node, with smart contracts written in [TEAL](https://developer.algorand.org/docs/get-details/dapps/avm/teal/) (Transaction Execution Approval Language) or higher-level languages that compile to TEAL. The existing `ed25519verify` opcode (cost 1900) enables on-chain Ed25519 signature verification.

The `falcon_verify` opcode (cost 1700) for **Falcon-1024** signature verification has been [live on mainnet since AVM v12 / consensus v41](https://dev.algorand.co/reference/algorand-teal/opcodes/) (go-algorand 4.3.0, activated September 2024). Smart contracts can verify Falcon-1024 signatures natively via this opcode, enabling post-quantum-aware dApp logic such as PQC multi-sig schemes and on-chain attestation verification.

**Current state.** On-chain signature verification supports both Ed25519 (`ed25519verify`) and Falcon-1024 (`falcon_verify`). The `falcon_verify` opcode is live on mainnet. The November 2025 first post-quantum transaction on a public mainnet used Falcon-signed Logic Signatures with this opcode.

**Planned future work.** No further work needed for on-chain PQC verification; this capability is shipped.

## 5. Other Features

### State Proofs

State Proofs are compact certificates of [Algorand ledger state](https://algorand.co/technology/post-quantum) generated every 256 blocks (approximately 18 minutes). They are signed by a supermajority of stake using **Falcon-1024** via a Merkle signature scheme. Each signature is approximately 1,280 bytes. State Proofs enable light clients, bridges, and cross-chain verification with post-quantum confidence.

**Current state.** State Proofs have been live and **Falcon-1024**-signed on mainnet since 2022.

**Planned future work.** No changes needed; the mechanism is already post-quantum secure.

### Algorand Standard Assets (ASA)

[ASAs](https://developer.algorand.org/docs/get-details/asa/) are native token primitives (not smart-contract-based) that use account-level signatures for transfers. ASA transfers from Falcon-locked accounts are post-quantum secure; transfers from Ed25519 accounts remain exposed. ASAs inherit the PQC status of the underlying account.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus ❌, P2P ❌, On-Chain ✅, Other ✅.

Algorand's approach is additive: **Falcon-1024** has been added as an alternative to Ed25519, but Ed25519 is not being removed. The protocol guarantees indefinite backward compatibility with Ed25519 accounts. The phased rollout prioritizes adding PQC support — accounts first, then consensus — rather than deprecating EC.

No deprecation timeline for Ed25519, Curve25519 VRF, or any EC primitive has been announced. The consensus layer's VRF replacement is the gating item for any eventual EC retirement: until a post-quantum VRF is deployed, Ed25519 remains structurally required for consensus participation.

**Current state.** Ed25519 remains the default and is not scheduled for removal. Falcon is opt-in alongside it.

**Planned future work.** No EC deprecation roadmap has been published.

## Governance

Algorand protocol upgrades are coordinated by the Algorand Foundation, which funds research and development. Protocol changes follow a foundation-led model where the core development team proposes and implements upgrades; the broader community participates through [ARC](https://arc.algorand.foundation/ARCs/arc-0003) (Algorand Request for Comments) proposals and GitHub issue discussion on the [go-algorand](https://github.com/algorand/go-algorand) repository.

PQC-relevant governance activity:

- **Falcon-1024 for State Proofs**: Deployed 2022; no formal ARC required (core protocol change).
- **Falcon-1024 for user accounts**: [Launched November 2025](https://algorand.co/blog/technical-brief-quantum-resistant-transactions-on-algorand-with-falcon-signatures); opt-in via CLI.
- **[go-algorand#6573](https://github.com/algorand/go-algorand/pull/6573)**: Open PR (2026-03-05) for quantum-hardened LogicSig address derivation via iterative hashing.
- **[algorand/falcon#15](https://github.com/algorand/falcon/pull/15)**: Open PR (2026-02-17) for vectorized Falcon verification speedup.
- **Post-quantum VRF**: Research stage; no ARC or specification published.

---

_Generated on 03 Jun 2026 based on information as of 03 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
