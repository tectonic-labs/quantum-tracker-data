# Decred (DCR) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Decred |
| **Ticker** | DCR |
| **Website** | https://decred.org |
| **GitHub** | https://github.com/decred |
| **Twitter / X** | https://x.com/decredproject |
| **Derived from** | Bitcoin (inspired, not a direct fork) |
| **On-chain environment** | Decred Script |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Exposed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | A | ✅ | Shipped |
| EC Sunset | F | ❌ | Not Discussed |

Decred operates a [hybrid Proof-of-Work / Proof-of-Stake consensus](https://docs.decred.org/advanced/consensus/) with distinct quantum exposure profiles across its components. On the quantum-resistant side, its PoW mining uses Blake2b (entirely hash-based), and its [CoinShuffle++ (CSPP) privacy mixing protocol](https://docs.decred.org/) migrated its key exchange from EC-only (2019) to a hybrid X25519 + **sntrup4591761** (Streamlined NTRU Prime) scheme (2021) — one of the earliest production EC→PQC migrations in any blockchain. On the quantum-vulnerable side, all transaction signatures (secp256k1 ECDSA, Ed25519), PoS ticket voting (Ed25519), and Politeia governance signing (Ed25519) remain EC-based with no published migration plan.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **sntrup4591761** (Streamlined NTRU Prime) | ECDH | Other (CSPP mixing) | Implemented |

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Decred in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

Decred's [hybrid consensus](https://docs.decred.org/advanced/consensus/) combines Proof-of-Work mining with Proof-of-Stake ticket voting. PoW (Blake-256) is hash-based and not rated (quantum-resistant since genesis). PoS ticket voting uses Ed25519 — quantum-vulnerable with no PQC migration.

Stakeholders lock DCR to buy tickets and vote on block validity and governance proposals using Ed25519 signatures. A quantum adversary capable of breaking Ed25519 could forge validator votes.

**Current state.** PoW mining is hash-based (Blake2b) and quantum-resistant. PoS ticket signing uses Ed25519.

**Planned future work.** No proposals exist to migrate PoS ticket signing to a post-quantum scheme.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Decred in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Decred Script supports standard signature verification opcodes for secp256k1 ECDSA and Ed25519, along with hash opcodes. No opcode currently verifies any post-quantum signature scheme. Decred's scripting environment is more limited than a general-purpose smart contract VM, but it does expose signature verification primitives, making this category applicable.

**Current state.** Script validation supports only EC-based signature verification. No PQC opcodes exist.

**Planned future work.** No DCP (Decred Change Proposal) for PQC opcodes has been filed.

## 5. Other Features

**Grade: A ✅**

### CoinShuffle++ (CSPP) Mixing

Decred's CoinShuffle++ privacy mixing protocol uses **sntrup4591761** (Streamlined NTRU Prime), a post-quantum key encapsulation mechanism, for key agreement between mix participants. CSPP mixing launched in August 2019 with an elliptic-curve-only key exchange; in [December 2021](https://medium.com/decred/decred-journal-december-2021-376a27e7cc4e) Streamlined NTRU Prime was added alongside X25519 as a **hybrid** key agreement, so the shared secret holds if either primitive survives. This is a genuine migration of a production privacy feature from EC to post-quantum cryptography — one of the earliest such migrations in any blockchain — providing forward secrecy against quantum adversaries.

**Current state.** CSPP mixing uses a hybrid X25519 + **sntrup4591761** key exchange in production. This is one of the few live PQC deployments in any blockchain.

**Planned future work.** No additional PQC features beyond the existing CSPP implementation have been announced.

### Politeia Governance

Politeia, Decred's on-chain governance system, records votes using Ed25519 signatures from ticket holders. A quantum adversary could forge governance votes. Governance signatures remain EC-based.

**Current state.** Politeia voting uses Ed25519 signatures. No PQC alternative exists.

**Planned future work.** None documented.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ✅.

No published roadmap or formal proposal exists for migrating Decred away from EC-based cryptography. While the CSPP mixing protocol already uses PQC for key exchange and PoW consensus is hash-based, all other cryptographic components — transaction signatures (secp256k1, Ed25519), PoS ticket voting (Ed25519), P2P identity (secp256k1), on-chain script verification, and Politeia governance (Ed25519) — remain EC-dependent with no deprecation plan.

Decred's dual-signature support (secp256k1 and Ed25519) demonstrates engineering flexibility for adding new signature algorithms, but neither current scheme is post-quantum.

**Current state.** No DCP (Decred Change Proposal) for quantum readiness has been filed. EC cryptography remains in all layers except CSPP mixing and PoW.

**Planned future work.** None documented.

## Governance

Decred governance operates through [Politeia](https://docs.decred.org/), an on-chain proposal system where ticket holders vote on protocol changes and treasury spending. Proposals require a super-majority for approval. The Decred Change Proposal (DCP) process is used for consensus rule changes.

No PQC-related proposals or DCPs have been filed. No formal community discourse on PQC migration has been documented on Politeia or the Decred governance forums.

---

_Generated on 06 Jul 2026 based on information as of 06 Jul 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
