# Neptune Cash (NPT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Neptune Cash |
| **Ticker** | NPT |
| **Website** | https://neptune.cash/ |
| **GitHub** | https://github.com/Neptune-Crypto/neptune-core |
| **Explorer** | https://explorer.neptune.cash/ |
| **On-chain environment** | zk-STARK-verified value transfer (Triton VM); no general smart-contract EVM |
| **Mainnet genesis** | 2026-02-11 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | A | ✅ | Shipped |
| Other Features | A | ✅ | Shipped |
| EC Sunset | ➖ | ➖ | Not Applicable |

Neptune Cash is a privacy-focused layer-1 that has been post-quantum since its mainnet genesis. Rather than migrating away from elliptic-curve cryptography, it never used it: transaction validity and privacy are enforced with **zk-STARK proofs** produced by **Triton VM**, block production runs on a **memory-hard, hash-based proof-of-work**, and spending is authorized by hash-based post-quantum lock scripts. Because the chain's security rests on hash-function assumptions and transparent proofs rather than the algebraic structures broken by Shor's algorithm, its signature, consensus, and on-chain layers are post-quantum from day one.

A distinguishing property for a privacy chain: because Neptune's confidentiality is built on hash-based commitments and STARKs — not on elliptic-curve discrete-log hardness — a future quantum computer does **not** retroactively deanonymize its historical ledger. This is a structural advantage over elliptic-curve-based privacy designs, whose past confidential transactions become exposed once the underlying curve is broken.

The one open area is P2P networking: peer connections use plain TCP/IP with no documented transport encryption or post-quantum handshake, so that category cannot yet be rated a pass. Elliptic-curve sunset does not apply — there is no elliptic-curve cryptography anywhere in the protocol to retire.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **zk-STARK / Triton VM** (hash-based transparent proofs) | n/a — used from genesis, never replaced EC pairings | On-Chain / validity | Shipped |
| **Memory-hard hash-based PoW** | n/a — used from genesis, never EC-signed | Consensus | Shipped |
| **Hash-based PQC lock scripts** (exact scheme pending confirmation) | n/a — used from genesis, never replaced ECDSA | Tx Signatures | Shipped |
| **Mutator set** (AOCL + SWBF, hash-based) | n/a — hash-based privacy from genesis | Other (privacy) | Shipped |

## 1. Transaction Signatures

**Grade: A ✅**

Spending on Neptune Cash is authorized by **lock scripts** whose ownership check is verified inside the STARK proof. All primitives are hash-based and post-quantum secure; there is no ECDSA, secp256k1, or other elliptic-curve signing anywhere in the protocol. Security rests on hash-function properties rather than algebraic structures vulnerable to Shor's algorithm.

**Current state.** Post-quantum lock scripts have been in production since mainnet genesis on 11 February 2026. The precise signature construction bound into the lock script (a lattice scheme versus a hash-based one-time signature) is not pinned down in the public materials reviewed and would benefit from confirmation against the reference implementation.

**Planned future work.** None identified; post-quantum signing is intrinsic to the protocol design.

## 2. Consensus

**Grade: A ✅**

Consensus runs on a **memory-hard, hash-based proof-of-work** with adaptive block sizes to maximize throughput. Block production depends on hash computations rather than any signature scheme, so there is no elliptic-curve cryptography in mining or block validation. A quantum computer offers only Grover's quadratic speed-up against the hash puzzle, not a structural break.

**Current state.** Hash-based proof-of-work has run since mainnet genesis on 11 February 2026.

**Planned future work.** None identified.

## 3. P2P Networking

**Grade: D ⚠️**

The reference client, neptune-core, connects to peers over **plain TCP/IP**, with its RPC server exposed via `tarpc` using JSON over a serde transport, and peer discovery driven by a distance-based scheme. Public documentation notes that the RPC interface lacks encryption. No post-quantum-secured handshake, authenticated key exchange, or encrypted transport is documented for peer connections.

Node identity is not elliptic-curve-based, so there is no *classical* key exchange to be broken — but the absence of any documented transport-security layer means this category cannot be rated a pass.

**Current state.** Peer transport is unencrypted plain TCP/IP; no post-quantum transport layer is documented.

**Planned future work.** A public specification and audit of the peer transport — cipher suites and key-establishment — would clarify this category. If an encrypted transport is added, a post-quantum key-establishment scheme would keep it aligned with the rest of the protocol. No specific public roadmap commitment for this work has been identified.

## 4. On-Chain Logic

**Grade: A ✅**

On-chain validity is expressed and verified as **zk-STARK proofs generated by Triton VM**, a custom STARK engine. STARKs are transparent — no trusted setup — and hash-based, so on-chain verification carries no elliptic-curve or pairing assumptions and is post-quantum secure. Provers run client-side.

**Current state.** STARK-based validity has been part of the protocol since mainnet genesis. A published audit of the Triton VM code is available.

**Planned future work.** Ongoing proving-performance optimization; no PQC-relevant gap identified.

## 5. Other Features

**Grade: A ✅**

Neptune Cash is privacy-focused. Confidentiality is provided by a **mutator set**: an **Append-Only Commitment List (AOCL)** records new outputs, and a **Sliding-Window Bloom Filter (SWBF)** records removals without revealing which item was spent. Combined with client-side STARK proving and recipient-decryptable public announcements, this hides amounts and spent-item linkage. All of these mechanisms are built on hash-based commitments and STARKs.

Crucially, because the privacy guarantees do not depend on elliptic-curve discrete-log hardness, a future quantum computer does **not** retroactively deanonymize the historical shielded ledger — a structural advantage over elliptic-curve-based privacy chains.

**Current state.** Mutator-set privacy has been active since mainnet genesis.

**Planned future work.** None PQC-relevant identified.

## 6. EC Sunset

**Grade: ➖ Not Applicable**

Neptune Cash never used elliptic-curve cryptography. It launched as a post-quantum chain in February 2026 with hash-based lock scripts, hash-based proof-of-work, and STARK-based on-chain verification, so there is nothing to retire — no EC keys, precompiles, or builtins exist anywhere in the protocol. The concept of sunsetting elliptic-curve cryptography therefore does not apply.

**Current state.** No elliptic-curve cryptography is present in the protocol.

**Planned future work.** None required.

## Governance

Neptune Cash is developed as an open-source project (Neptune Crypto) around a single Rust reference implementation, neptune-core. The white paper is authored by Alan Szepieniec — a post-quantum cryptography researcher — and Thorkil Værge. Protocol changes are coordinated by the core maintainers; the detailed activation and versioning mechanics are not fully documented in public materials and would benefit from clarification.

---

_Generated on 25 Jul 2026 based on information as of 25 Jul 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
