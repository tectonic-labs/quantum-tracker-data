# Algorand (ALGO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Algorand |
| **Ticker** | ALGO |
| **Website** | https://algorand.co |
| **GitHub** | https://github.com/algorand and https://github.com/algorandfoundation |
| **Twitter / X** | https://x.com/AlgoFoundation and https://x.com/Algorand |
| **On-chain environment** | AVM (Algorand Virtual Machine) / TEAL |
| **Current mainnet version** | go-algorand 4.7.0 / consensus v41 (Sept 2025) |
| **Mainnet genesis** | 2019-06-11 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | C | 🗺️ | Roadmapped |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | A | ✅ | Shipped |
| Other Features | A | ✅ | Shipped |
| EC Sunset | D | ⚠️ | Discussed |

Algorand is one of the most PQC-advanced major blockchains. [State Proofs](https://algorand.co/technology/post-quantum) — compact attestations of ledger state generated every 256 blocks — have been signed with **Falcon-1024** since 2022, making them post-quantum secure in production. On November 3, 2025, Algorand executed the [first post-quantum transaction on a public blockchain mainnet](https://algorand.co/blog/technical-brief-quantum-resistant-transactions-on-algorand-with-falcon-signatures) using opt-in **Falcon-1024** account keys via CLI. The `falcon_verify` AVM opcode for Falcon signature verification is [live on mainnet](https://dev.algorand.co/reference/algorand-teal/opcodes/) since AVM v12 (September 2024), enabling PQC verification in smart contracts.

Transaction Signatures is rated C (Roadmapped) rather than higher because, while Falcon-1024 signing is available via CLI and LogicSig, no typical-user wallet (notably Pera Wallet) ships PQC signing today. The protocol-level PQC achievements — `falcon_verify` on-chain and Falcon-1024 State Proofs — are credited under On-Chain Logic and Other Features respectively. A [native PQ account type](https://github.com/algorand/go-algorand/pull/6639) using deterministic Falcon-1024 is in active development. PR #6639 (+4,818/-1,521 across 42 files) introduces a new `f1` signature scheme with PQ addresses derived via `SHA512_256(domain || scheme[2] || explicit_salt[1] || pk)`. The 1-byte explicit salt prevents Ed25519 point decompression, closing Shor key-recovery against legacy address formats. The feature is gated behind an `EnablePQSchemeFalcon1024` consensus flag (currently `ConsensusFuture`) and supports rekeying between Ed25519 and PQ authorizers.

The principal remaining exposure is the consensus layer. Algorand's [Pure Proof-of-Stake](https://algorand.co/technology/pure-proof-of-stake) uses a Verifiable Random Function (VRF) based on Curve25519 for cryptographic sortition — the process by which validators are randomly selected. That VRF is elliptic-curve-based and quantum-vulnerable. Replacing it requires a lattice-based or hash-based alternative with equivalent security guarantees, and no specification or testnet activity has been announced. The Algorand Foundation has committed to quantum resilience and is researching lattice-based VRF replacements, but no schedule has been set.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **Falcon-1024 / FN-DSA** | Ed25519 (Curve25519) | Tx Signatures | Roadmapped (opt-in live on mainnet since Nov 2025 via CLI; native PQ account PR #6639 open; no retail wallet ships PQC signing) |
| **Falcon-1024 / FN-DSA** | Ed25519 (Curve25519) | On-Chain | Shipped (`falcon_verify` opcode live on mainnet since AVM v12 / consensus v41, Sept 2024) |
| **Falcon-1024 / FN-DSA** | Ed25519 (Curve25519) | Other (State Proofs) | Shipped (live since 2022) |

## 1. Transaction Signatures

**Grade: C 🗺️**

Algorand transactions are signed with Ed25519 (Curve25519) by default. Since November 2025, accounts can opt in to **Falcon-1024** signatures via CLI, making Algorand the first major L1 to support post-quantum transaction signing on a public mainnet. Signatures are approximately 1,280 bytes with approximately 1,793-byte public keys, and verification is fast (typically under 100 microseconds).

The [technical brief](https://algorand.co/blog/technical-brief-quantum-resistant-transactions-on-algorand-with-falcon-signatures) describes the integration: core accounts remain Ed25519 by default, but account holders can voluntarily rotate to Falcon keys. Addresses remain compatible, and the protocol supports key rotation natively.

**Current state.** Ed25519 is the default signing scheme. Falcon-1024 is available as an opt-in alternative via CLI and LogicSig. The AVM `falcon_verify` opcode is live on mainnet (Sept 2024). Accounts that have rotated to Falcon keys are post-quantum secure for transaction signing; accounts on Ed25519 remain exposed. However, no typical-user wallet — notably Pera Wallet, the dominant Algorand wallet — ships PQC signing, which limits real-world adoption. A native PQ account type ([PR #6639](https://github.com/algorand/go-algorand/pull/6639)) with deterministic Falcon-1024 and a quantum-hardened address derivation scheme is in active development, gated behind a consensus flag.

**Planned future work.** The [2025+ roadmap](https://algorand.co/blog/algorands-2025-roadmap-building-for-real-world-use) positions the phased rollout as: State Proofs (complete), user account Falcon keys (live), AVM `falcon_verify` opcode (complete), native PQ account type (in progress), and consensus upgrade (planned, dependent on post-quantum VRF). Additional related work includes [go-algorand#6637](https://github.com/algorand/go-algorand/pull/6637) (large LogicSig per-byte size pricing, a PQ-enabling infrastructure change since PQ signatures are large), the merged [go-algorand#6592](https://github.com/algorand/go-algorand/pull/6592) (quantum-hardened LogicSig address derivation via auto-salting of TEAL v13 programs, merged June 2026), and [algorand/falcon#15](https://github.com/algorand/falcon/pull/15) (vectorized Falcon verification speedup).

## 2. Consensus

**Grade: D ⚠️**

Algorand's [Pure Proof-of-Stake](https://developer.algorand.org/docs/get-details/algorand_consensus/) consensus uses Verifiable Random Functions (VRFs) on Curve25519 for cryptographic sortition. All nodes independently run the VRF to determine committee membership for block proposal, soft vote, and certify vote phases. The VRF is elliptic-curve-based: a quantum adversary capable of breaking Curve25519 could predict block proposers and committee members, disrupting consensus — though this would not enable spending of Falcon-locked funds.

**Falcon-1024** signatures, which protect transaction signing and State Proofs, do not secure the consensus layer because consensus relies on VRF output, not signature verification.

**Current state.** The VRF uses Curve25519. No post-quantum VRF has been specified, prototyped, or tested. The Algorand Foundation is researching lattice-based (NTRU family) VRF replacements.

**Planned future work.** A VRF replacement cannot be opt-in — consensus rules must align network-wide, requiring a protocol hard fork with formal safety proofs. The Foundation has committed to quantum resilience and is researching replacements, but no ETA has been announced.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Algorand in this category. Algorand's [peer-to-peer networking](https://algorand.co/blog/algorand-goes-peer-to-peer-a-new-era-for-the-network) uses libp2p with GossipSub and a custom WebSocket protocol (`/algorand-ws/1.0.0`). No quantum-resistant transport layer has been announced.

If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: A ✅**

Algorand's [AVM](https://developer.algorand.org/docs/get-details/dapps/avm/) is a stack-based bytecode interpreter running on every node, with smart contracts written in [TEAL](https://developer.algorand.org/docs/get-details/dapps/avm/teal/) (Transaction Execution Approval Language) or higher-level languages that compile to TEAL. The existing `ed25519verify` opcode (cost 1900) enables on-chain Ed25519 signature verification.

The `falcon_verify` opcode (cost 1700) for **Falcon-1024** signature verification has been [live on mainnet since AVM v12 / consensus v41](https://dev.algorand.co/reference/algorand-teal/opcodes/) (go-algorand 4.3.0, activated September 2024). Smart contracts can verify Falcon-1024 signatures natively via this opcode, enabling post-quantum-aware dApp logic such as PQC multi-sig schemes and on-chain attestation verification. The November 2025 first post-quantum transaction on a public mainnet used Falcon-signed Logic Signatures with this opcode.

**Current state.** On-chain signature verification supports both Ed25519 (`ed25519verify`) and Falcon-1024 (`falcon_verify`). This capability is shipped and live on mainnet.

**Planned future work.** No further work needed for on-chain PQC verification; this capability is shipped.

## 5. Other Features

**Grade: A ✅**

### State Proofs

State Proofs are compact certificates of [Algorand ledger state](https://algorand.co/technology/post-quantum) generated every 256 blocks (approximately 18 minutes). They are signed by a supermajority of stake using **Falcon-1024** via a Merkle signature scheme. Each signature is approximately 1,280 bytes. State Proofs enable light clients, bridges, and cross-chain verification with post-quantum confidence.

**Current state.** State Proofs have been live and **Falcon-1024**-signed on mainnet since 2022.

**Planned future work.** No changes needed; the mechanism is already post-quantum secure.

### Algorand Standard Assets (ASA)

[ASAs](https://developer.algorand.org/docs/get-details/asa/) are native token primitives (not smart-contract-based) that use account-level signatures for transfers. ASA transfers from Falcon-locked accounts are post-quantum secure; transfers from Ed25519 accounts remain exposed. ASAs inherit the PQC status of the underlying account.

## 6. EC Sunset

**Grade: D ⚠️**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures 🗺️, Consensus ⚠️, P2P ❌, On-Chain ✅, Other ✅.

Algorand's approach is additive: **Falcon-1024** has been added as an alternative to Ed25519, but Ed25519 is not being removed. The protocol guarantees indefinite backward compatibility with Ed25519 accounts. The phased rollout prioritizes adding PQC support — accounts first, then consensus — rather than deprecating EC. The Algorand Foundation has committed to quantum resilience and the VRF replacement is planned but not scheduled.

The phased transition is:
1. **Complete** (2022): State Proofs migrated to Falcon-1024.
2. **Complete** (Sept 2024): AVM `falcon_verify` opcode live on mainnet.
3. **Live** (Nov 2025): User account opt-in Falcon keys.
4. **In Progress**: Native PQ account type ([PR #6639](https://github.com/algorand/go-algorand/pull/6639)).
5. **Planned**: VRF replacement for consensus (no ETA).
6. **No sundown**: Ed25519 remains usable indefinitely.

**Current state.** Ed25519 remains the default and is not scheduled for removal. Falcon is opt-in alongside it. The consensus layer's VRF replacement is the gating item for any eventual EC retirement: until a post-quantum VRF is deployed, Ed25519 remains structurally required for consensus participation.

**Planned future work.** No EC deprecation roadmap has been published.

## Governance

Algorand protocol upgrades are coordinated by the Algorand Foundation, which funds research and development. Protocol changes follow a foundation-led model where the core development team proposes and implements upgrades; the broader community participates through [ARC](https://arc.algorand.foundation/ARCs/arc-0003) (Algorand Request for Comments) proposals and GitHub issue discussion on the [go-algorand](https://github.com/algorand/go-algorand) repository. On-chain consensus upgrade votes activate new protocol versions once a supermajority threshold is reached.

PQC-relevant governance activity:

- **Falcon-1024 for State Proofs**: Deployed 2022; core protocol change.
- **`falcon_verify` opcode**: Live on mainnet since AVM v12 / consensus v41 (Sept 2024). Merged via [PR #5599](https://github.com/algorand/go-algorand/pull/5599).
- **Falcon-1024 for user accounts**: [Launched November 2025](https://algorand.co/blog/technical-brief-quantum-resistant-transactions-on-algorand-with-falcon-signatures); opt-in via CLI.
- **[go-algorand#6639](https://github.com/algorand/go-algorand/pull/6639)**: Open PR (2026-06-04, updated 2026-06-07) for native PQ account type with deterministic Falcon-1024 signatures. +4,818/-1,521 across 42 files.
- **[go-algorand#6637](https://github.com/algorand/go-algorand/pull/6637)**: Open PR (2026-05-30) for large LogicSig per-byte size pricing, enabling PQ-sized signatures in LogicSigs.
- **[go-algorand#6592](https://github.com/algorand/go-algorand/pull/6592)**: Merged (2026-06-25); auto-salts TEAL v13 programs so LogicSig hashes avoid valid on-curve points, hardening address derivation against quantum address-grinding. Supersedes the closed [#6573](https://github.com/algorand/go-algorand/pull/6573).
- **[algorand/falcon#15](https://github.com/algorand/falcon/pull/15)**: Open PR (2026-02-17) for vectorized Falcon verification speedup.
- **Post-quantum VRF**: Research stage; no ARC or specification published.

---

_Generated on 26 Jun 2026 based on information as of 26 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
