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
| P2P Networking | F | ❌ | Exposed |
| On-Chain Logic | A | ✅ | Shipped |
| Other Features | A | ✅ | Shipped |
| EC Sunset | F | ❌ | Exposed |

Neptune Cash is a privacy-focused layer-1 whose **ledger** has been post-quantum since its mainnet genesis. Transaction validity and privacy are enforced with **zk-STARK proofs** produced by **Triton VM**, block production runs on a **memory-hard, hash-based proof-of-work**, and spending is authorized by hash-based post-quantum lock scripts. Because those layers rest on hash-function assumptions and transparent proofs rather than the algebraic structures broken by Shor's algorithm, its signature, consensus, and on-chain categories are post-quantum from day one.

A distinguishing property for a privacy chain: because Neptune's confidentiality is built on hash-based commitments and STARKs — not on elliptic-curve discrete-log hardness — a future quantum computer does **not** retroactively deanonymize its historical ledger. This is a structural advantage over elliptic-curve-based privacy designs, whose past confidential transactions become exposed once the underlying curve is broken.

The gap is the **peer transport**. Neptune has the most complete peer networking of any post-quantum-native chain — libp2p over TCP+QUIC with an authenticated, encrypted, multiplexed Noise transport — but its Noise handshake uses **classical X25519** key exchange and **Ed25519** node identity, both of which a quantum computer breaks. No post-quantum key-establishment is used on the wire. Under the readiness rubric an encrypted-but-classical transport with no post-quantum handshake grades ❌: it protects confidentiality and integrity against classical adversaries today, but a quantum-capable active attacker could decrypt peer traffic and — the point worth stressing — defeat **message integrity and peer authentication** (impersonate peers, forge gossip, intercept the topology). This classical transport crypto is also the only elliptic-curve cryptography left in the protocol, so EC Sunset is likewise ❌ (no stated plan to migrate or remove it). Encouragingly, the libp2p/Noise design is the easiest place to add a hybrid post-quantum key exchange, so the fix is well-scoped.

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

**Grade: F ❌**

The reference client, neptune-core, has the most complete peer transport of any post-quantum-native chain surveyed: **libp2p over TCP and QUIC**, with a **Noise** security transport (encrypted and authenticated) and **Yamux** multiplexing, carrying JSON-framed peer messages. Node identity is a libp2p `PeerId` derived from an **Ed25519** public key.

The problem is that this transport is **classical**. The Noise handshake performs an **X25519** elliptic-curve Diffie-Hellman key exchange (with ChaCha20/AES-GCM authenticated encryption), and node identity is Ed25519 — both are broken by a sufficiently large quantum computer. No post-quantum key-encapsulation mechanism (such as ML-KEM/Kyber, in hybrid or pure form) is used for the peer handshake.

So while the link is confidential and authenticated against classical adversaries today, it is quantum-vulnerable at the handshake. A quantum-capable active attacker could not only decrypt captured traffic but also defeat **message integrity and peer authentication** — impersonating peers, forging gossip, and intercepting the network topology. For a chain built and marketed as post-quantum, an EC-based transport is a real gap, so the category grades exposed.

**Current state.** Encrypted and authenticated peer transport (libp2p + Noise + Yamux), but the handshake is classical X25519 with Ed25519 identity; no post-quantum key exchange on the wire.

**Planned future work.** The libp2p/Noise architecture is the natural place to add a hybrid post-quantum key exchange (Noise has established PQC-hybrid patterns), which would bring the transport in line with the chain's post-quantum ledger. No specific public roadmap commitment for this work has been identified.

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

**Grade: F ❌**

Neptune's **ledger** uses no elliptic-curve cryptography — hash-based lock scripts, hash-based proof-of-work, and STARK-based on-chain verification mean there are no EC keys, precompiles, or builtins on-chain to retire. The **peer transport, however, retains classical elliptic-curve cryptography**: X25519 for the Noise key exchange and Ed25519 for node identity. A quantum-vulnerable elliptic-curve primitive therefore remains in the protocol (in networking), and there is no stated plan to migrate it to a post-quantum scheme or remove it — so this category is exposed.

**Current state.** No EC on-chain, but classical X25519/Ed25519 remains in the peer transport with no announced migration or removal plan.

**Planned future work.** Migrating the Noise handshake to a hybrid post-quantum KEM would both fix P2P and clear this category. No public commitment identified.

## Governance

Neptune Cash is developed as an open-source project (Neptune Crypto) around a single Rust reference implementation, neptune-core. The white paper is authored by Alan Szepieniec — a post-quantum cryptography researcher — and Thorkil Værge. Protocol changes are coordinated by the core maintainers; the detailed activation and versioning mechanics are not fully documented in public materials and would benefit from clarification.

---

_Generated on 25 Jul 2026 based on information as of 25 Jul 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
