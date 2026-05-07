# Zcash (ZEC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Zcash |
| **Ticker** | ZEC |
| **Website** | <https://z.cash> |
| **GitHub** | <https://github.com/zcash> |
| **Twitter / X** | <https://x.com/zcash> |
| **Derived from** | Bitcoin-inspired (not a direct fork) |
| **On-chain environment** | Bitcoin-style script (no general smart contracts) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | B | 🔧 | In Development |
| EC Sunset | C | 🗺️ | Roadmapped |

Zcash carries the largest coordinated post-quantum specification effort of any chain in this survey, organized around the [NU7 network upgrade](https://zips.z.cash/zip-2005). The work is concentrated on what Zcash calls "quantum recoverability" — a set of seven open ZIPs intended to let users recover funds in the event elliptic-curve cryptography breaks, rather than replacing the underlying proof system. The most prominent components are [ZIP 2005 (Quantum Recoverability deployment plan)](https://zips.z.cash/zip-2005), [ZIP 248 (forward-compatible, extensible transaction format)](https://zips.z.cash/zip-0248) — a structural enabler for future quantum-safe transaction types — and [ZIP 312 (key generation, randomizer handling)](https://zips.z.cash/zip-0312), labelled `Post-quantum`.

The active cryptographic primitives — secp256k1 ECDSA on transparent addresses, Ed25519 (Sapling and Orchard spend authorization), the Groth16 SNARK over [BN254 in the Sapling shielded pool](https://zips.z.cash/zip-0224), and the Halo 2 PLONK proof system over the Pallas/Vesta curve cycle in the Orchard shielded pool — are all elliptic-curve-based and quantum-vulnerable. NU7 is in the specification phase: no node code changes have landed and no activation height is announced.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| Quantum Recoverability ZIP cluster (algorithm not yet selected) | ECDSA secp256k1, Ed25519, Groth16 / Halo 2 commitments | Other Features (NU7), EC Sunset | In Development (7 open ZIPs; ZIP 2005 is the deployment plan, ZIP 248 the forward-compatible tx format) |

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Zcash in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: A ✅**

Zcash uses [Equihash](https://www.getmonero.org/resources/moneropedia/randomx.html), a memory-hard proof-of-work algorithm. Equihash is hash-based; mining is unaffected by Shor's algorithm and Grover's algorithm at most halves preimage strength. There is no validator key material in the consensus layer.

**Current state.** Equihash PoW. Hash-based.

**Planned future work.** None needed for the consensus layer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Zcash in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Zcash in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### Shielded transactions (Sapling and Orchard)

**Current state.** Zcash's defining feature is its shielded pools, which use zero-knowledge proofs to hide sender, recipient, and amount. The Sapling pool uses [Groth16 SNARKs over BN254 pairings](https://zips.z.cash/zip-0224); the Orchard pool uses [Halo 2](https://zips.z.cash/zip-0224) over the Pallas/Vesta curve cycle. Both proof systems are elliptic-curve-based. A quantum break of the underlying curve would let an attacker forge proofs and, more critically, retroactively decrypt the historical shielded ledger — recovering amounts, memo fields, and the sender/recipient relationships that the shielded design was built to protect. Statute-of-limitations exposure starts at discovery, not commission, so transactions made today carry forward the post-quantum risk.

The active mitigation is the [NU7 quantum-recoverability ZIP cluster](https://zips.z.cash/zip-2005), seven open ZIPs whose stated goal is to let users recover funds if EC breaks, rather than to replace the proof system itself. [ZIP 248](https://zips.z.cash/zip-0248) introduces a forward-compatible, extensible transaction format that would carry future quantum-safe transaction types, and [ZIP 312](https://zips.z.cash/zip-0312) is labelled `Post-quantum` and addresses key generation and randomizer handling. Public material describes the Sapling/Orchard proof systems as candidates for eventual replacement by hash-based ZK (e.g., a STARK-style construction using collision-resistant hashing rather than EC), but this proof-system replacement is not part of the current ZIP set.

**Planned future work.** [NU7](https://zips.z.cash/zip-2005) is in specification phase. No node code changes have landed; no activation height is announced. The seven ZIPs include ZIP 2005 (deployment plan), ZIP 248 (forward-compat tx format), ZIP 307 (light client protocol update), ZIP 312 (key generation), and three additional drafts (Orchard Proof-of-Balance, Private Information Retrieval for Nullifier Exclusion Proofs, and quantum-recoverability fixes).

## 6. EC Sunset

**Grade: C 🗺️**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ✅, P2P ❌, On-Chain ❌, Other 🔧.

[NU7](https://zips.z.cash/zip-2005) is the closest any chain in this survey comes to a scheduled EC sunset path. [ZIP 248](https://zips.z.cash/zip-0248) defines a forward-compatible, extensible transaction format intended to carry future quantum-safe transaction types, and [ZIP 2005](https://zips.z.cash/zip-2005) is the deployment plan tying the cluster together. The framing is "quantum recoverability" — making sure users can move funds out of EC-bound addresses if the underlying curves break — rather than a full algorithmic substitution; the underlying signature schemes (ECDSA, Ed25519) and proof systems (Groth16, Halo 2) remain in place pending later work.

**Current state.** No EC retirement scheduled. The forward-compatible transaction format and key-handling work in NU7 lay groundwork for a future migration without committing to one.

**Planned future work.** The seven NU7 ZIPs are open; no activation height is announced.

## Governance

Zcash protocol changes flow through the [ZIP (Zcash Improvement Proposal)](https://zips.z.cash/) process. Discussion happens on the [Zcash Community Forum](https://forum.zcashcommunity.com) and in the [Electric Coin Company](https://x.com/ElectricCoinCo) and Zcash Foundation channels.

Active PQ-relevant ZIPs in flight (NU7 cluster):

- [ZIP 2005 — Quantum Recoverability deployment plan](https://zips.z.cash/zip-2005). Status: Open (NU7).
- [ZIP 248 — Forward-compatible, extensible transaction format](https://zips.z.cash/zip-0248). Status: Open (NU7), waiting on review.
- [ZIP 307 — Light client protocol update](https://zips.z.cash/zip-0307). Status: Open.
- [ZIP 312 — Key generation, randomizer handling](https://zips.z.cash/zip-0312). Status: Open, labelled `Post-quantum`.
- Three additional open ZIPs in the cluster: Orchard Proof-of-Balance, Private Information Retrieval for Nullifier Exclusion Proofs, and quantum-recoverability fixes (ZIP numbers TBD).

No node code changes have landed and no activation height is on the public record.

---

_Generated on 06 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
