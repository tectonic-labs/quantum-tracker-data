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
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | A | ✅ | Shipped |
| EC Sunset | F | ❌ | Not Discussed |

Decred operates a [hybrid Proof-of-Work / Proof-of-Stake consensus](https://docs.decred.org/advanced/consensus/) with distinct quantum exposure profiles across its components. On the quantum-resistant side, its PoW mining uses Blake2b (entirely hash-based), and its [CoinShuffle++ (CSPP) privacy mixing protocol](https://docs.decred.org/) uses **sntrup4591761** (Streamlined NTRU Prime) for post-quantum key exchange — one of the few production deployments of PQC in any blockchain. On the quantum-vulnerable side, all transaction signatures (secp256k1 ECDSA, Ed25519), PoS ticket voting (Ed25519), and Politeia governance signing (Ed25519) remain EC-based with no published migration plan.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **sntrup4591761** (Streamlined NTRU Prime) | ECDH | Other (CSPP mixing) | Implemented |

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Decred in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: A ✅**

Decred's [hybrid consensus](https://docs.decred.org/advanced/consensus/) combines Proof-of-Work mining with Proof-of-Stake ticket voting. The PoW component uses Blake2b hashing, which is entirely hash-based and not vulnerable to Shor's algorithm. Grover's algorithm provides at most a quadratic speedup against hash functions, reducing effective security but leaving it well within safe bounds.

The PoS component uses Ed25519 for ticket voting signatures, which is an elliptic-curve scheme vulnerable to Shor's algorithm. Stakeholders lock DCR to buy tickets and vote on block validity and governance proposals using Ed25519 signatures. A quantum adversary capable of breaking Ed25519 could forge validator votes.

The blended grade reflects the PoW component: miners select blocks via a hash-based PoW race that is quantum-resistant. While the PoS voting layer is EC-dependent, the PoW foundation provides a quantum-safe anchor for block production.

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

Decred's CoinShuffle++ privacy mixing protocol uses **sntrup4591761** (Streamlined NTRU Prime), a post-quantum key encapsulation mechanism, for key agreement between mix participants. The library defines PQPublicKey, PQSecretKey, and PQCiphertext type aliases from sntrup types and is used for quantum-resistant key agreement providing forward secrecy against quantum adversaries. This is in production — Decred's CSPP mixing has used NTRU Prime since the feature shipped.

**Current state.** CSPP mixing uses **sntrup4591761** for post-quantum key exchange in production. This is one of the few live PQC deployments in any blockchain.

**Planned future work.** No additional PQC features beyond the existing CSPP implementation have been announced.

### Politeia Governance

Politeia, Decred's on-chain governance system, records votes using Ed25519 signatures from ticket holders. A quantum adversary could forge governance votes. Governance signatures remain EC-based.

**Current state.** Politeia voting uses Ed25519 signatures. No PQC alternative exists.

**Planned future work.** None documented.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ✅, P2P ❌, On-Chain ❌, Other ✅.

No published roadmap or formal proposal exists for migrating Decred away from EC-based cryptography. While the CSPP mixing protocol already uses PQC for key exchange and PoW consensus is hash-based, all other cryptographic components — transaction signatures (secp256k1, Ed25519), PoS ticket voting (Ed25519), P2P identity (secp256k1), on-chain script verification, and Politeia governance (Ed25519) — remain EC-dependent with no deprecation plan.

Decred's dual-signature support (secp256k1 and Ed25519) demonstrates engineering flexibility for adding new signature algorithms, but neither current scheme is post-quantum.

**Current state.** No DCP (Decred Change Proposal) for quantum readiness has been filed. EC cryptography remains in all layers except CSPP mixing and PoW.

**Planned future work.** None documented.

## Governance

Decred governance operates through [Politeia](https://docs.decred.org/), an on-chain proposal system where ticket holders vote on protocol changes and treasury spending. Proposals require a super-majority for approval. The Decred Change Proposal (DCP) process is used for consensus rule changes.

No PQC-related proposals or DCPs have been filed. No formal community discourse on PQC migration has been documented on Politeia or the Decred governance forums.

---

_Generated on 07 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
