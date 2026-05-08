# Celestia (TIA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Celestia |
| **Ticker** | TIA |
| **GitHub** | https://github.com/celestiaorg |
| **On-chain environment** | N/A (DA-only, no execution layer) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | A | ✅ | Shipped |
| EC Sunset | F | ❌ | Not Discussed |

Celestia is a minimalist [data availability (DA) and consensus-only L1](https://docs.celestia.org/learn/celestia-101/data-availability/) designed as a substrate for execution-layer rollups. It runs a [fork of CometBFT](https://github.com/celestiaorg/celestia-core) (`celestia-core`) with Cosmos SDK. The chain has no general smart-contract execution layer — rollups provide their own execution environments and settle data to Celestia.

Celestia's chain-specific feature — [Data Availability Sampling (DAS)](https://blog.celestia.org/celestia-mvp-release-data-availability-sampling-light-clients/) — uses [Namespaced Merkle Trees (NMTs)](https://celestia.org/glossary/namespaced-merkle-tree/) and 2D Reed-Solomon erasure coding, both entirely hash-based. This is a key [differentiator from other DA approaches](https://medium.com/@swapspace-co/modular-da-layers-celestia-avail-and-the-fragmentation-of-consensus-50dd2a4dbb80) that use KZG polynomial commitments (pairing-based, EC-dependent). Celestia's DA commitment scheme is post-quantum-safe. All other protocol layers — transaction signatures (secp256k1), consensus (Ed25519), and P2P networking (Ed25519) — remain EC-based with no migration plan.

Celestia does not currently propose or implement any post-quantum cryptographic algorithms. Its DA scheme achieves post-quantum safety as an inherent property of hash-based design, not through an intentional PQC migration.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Celestia in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

Celestia runs a [forked CometBFT](https://github.com/celestiaorg/celestia-core) where validator block-signing keys are Ed25519. The fork modifies `DataHash` to be the Merkle root over the row/column NMT roots of the erasure-coded data square, but the signature over `DataHash` remains Ed25519 — quantum-vulnerable.

**Current state.** All validator block signing uses Ed25519. No post-quantum alternative has been proposed.

**Planned future work.** None documented.

## 3. P2P Networking

**Grade: F ❌**

Celestia uses CometBFT p2p (Ed25519, Noise-style handshake) for consensus messages and [libp2p](https://github.com/celestiaorg/celestia-core) for DA gossip, sampling, and bridge-node communication. Standard libp2p Noise handshake on Ed25519 node keys. No post-quantum handshake.

**Current state.** Node identity and handshake authentication use Ed25519 across both networking layers.

**Planned future work.** None documented.

## 4. On-Chain Logic

Celestia is intentionally a DA-and-consensus-only chain with no general execution layer. This category is not applicable.

## 5. Other Features

**Grade: A ✅**

### Data Availability Sampling (DAS)

Celestia's DAS enables light nodes to verify that block data has been published without downloading it, by sampling random coordinates of an erasure-coded data square and verifying Merkle inclusion proofs. The system uses two primitives:

1. **2D Reed-Solomon erasure coding** of block data into a `k × k` data square extended to `2k × 2k`.
2. **[Namespaced Merkle Trees (NMTs)](https://celestia.org/glossary/namespaced-merkle-tree/)** ([implementation](https://github.com/celestiaorg/nmt)) committing to the rows and columns of the data square, where every internal node carries namespace range metadata.

Both primitives are hash-based. The underlying hash functions (SHA-256 / Blake3) are post-quantum-secure — Grover's algorithm provides at most a quadratic speedup, halving the security level but leaving it well within safe bounds at 256-bit output.

**Current state.** DA commitments are hash-based and post-quantum-safe. Validator signatures over the data root are Ed25519 (rated under Consensus).

**Planned future work.** None needed for the DA commitment scheme specifically.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ➖, Other ✅.

No PQC migration plan or EC retirement schedule exists from Celestia Labs. Validator-signature posture would have to migrate via [celestia-core](https://github.com/celestiaorg/celestia-core) / CometBFT upgrades.

**Current state.** secp256k1 (transactions) and Ed25519 (consensus, P2P) are embedded in all non-DA protocol layers. No EC deprecation plan exists.

**Planned future work.** None documented.

## Governance

Celestia governance operates through Cosmos SDK on-chain voting via the [celestia-app](https://github.com/celestiaorg/celestia-app) governance module. No PQC-related proposals have been filed. No formal community discourse on PQC migration has been documented.

---

_Generated on 07 May 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
