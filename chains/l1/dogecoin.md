# Dogecoin (DOGE) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Dogecoin |
| **Ticker** | DOGE |
| **Website** | https://dogecoin.com |
| **GitHub** | https://github.com/dogecoin |
| **On-chain environment** | Bitcoin Script (limited) |
| **Mainnet genesis** | 2013-12-06 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | ➖ | ➖ | Not Applicable |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Dogecoin's PQC posture is largely inherited from Bitcoin pre-2021. The chain uses ECDSA secp256k1 for all transaction signatures with no Schnorr / Taproot upgrade adopted, and the codebase has remained on Bitcoin-derived plaintext v1 P2P transport without [BIP-324](https://bips.dev/324/) v2 encryption.

Three PQC-relevant items exist in the ecosystem. [DIP-2241 ("Update Dogecoin to be Post Quantum Resistant")](https://github.com/dogecoin/dogecoin/issues/2241) proposes adoption of NIST PQC schemes but remains in informal discussion with no champion or accepted timeline. The first commit-level PQC artifact appeared in April 2026: [dogecoinfoundation/libdogecoin#294](https://github.com/dogecoinfoundation/libdogecoin/pull/294) adds a generic PQC carrier to the Dogecoin Foundation's SDK with backends for **Falcon**, **ML-DSA-44** (Dilithium2), and Raccoon-G, along with a BIP-style specification document. A companion pull request, [dogecoinfoundation/dogecoin#8](https://github.com/dogecoinfoundation/libdogecoin/pull/294) ("src, test, pqc: integrate in-tree Raccoon-G-44 port", opened May 2026), adds an in-tree port of the Raccoon-G-44 algorithm directly to the Foundation's sibling fork repository. Both sit in Foundation-maintained repos rather than the canonical [dogecoin/dogecoin](https://github.com/dogecoin/dogecoin) core node; neither changes the protocol stoplight but together signal expanding exploratory work.

The closest concrete on-chain proposal is [OP_CHECKZKP](https://www.coindesk.com/tech/2025/07/23/dogecoin-could-soon-verify-zk-proofs-natively-thanks-to-dogeos-push) from the DogeOS / MyDoge team to verify Groth16 zero-knowledge proofs on-chain. Groth16 is EC-pairing-based and not quantum-safe, so this is a smart-contract enabler rather than a PQ migration step.

Consensus uses Scrypt PoW, hash-based and unaffected by Shor's algorithm. Dogecoin has been merge-mined with Litecoin via AuxPoW since August 2014; the security model is hash-based throughout the consensus layer.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **Falcon** (FN-DSA) | ECDSA secp256k1 | Tx Signatures | SDK-layer only ([libdogecoin#294](https://github.com/dogecoinfoundation/libdogecoin/pull/294), open) |
| **ML-DSA-44** (Dilithium2 / FIPS 204) | ECDSA secp256k1 | Tx Signatures | SDK-layer only ([libdogecoin#294](https://github.com/dogecoinfoundation/libdogecoin/pull/294), open) |
| **Raccoon-G** | ECDSA secp256k1 | Tx Signatures | SDK-layer only ([libdogecoin#294](https://github.com/dogecoinfoundation/libdogecoin/pull/294), open) |

No post-quantum algorithm has been proposed or implemented at the core protocol level. [DIP-2241](https://github.com/dogecoin/dogecoin/issues/2241) gestures at the NIST PQC family (**ML-KEM**, **ML-DSA**, **XMSS**) as candidates but the proposal is informal and no specific algorithm has been selected for the protocol. The [libdogecoin#294](https://github.com/dogecoinfoundation/libdogecoin/pull/294) SDK PR names **Falcon**, **ML-DSA-44**, and Raccoon-G as backends with a BIP-style specification, but this is SDK-layer infrastructure and has not been wired into the core node or consensus rules.

## 1. Transaction Signatures

**Grade: D ⚠️**

Dogecoin transactions use ECDSA secp256k1 — identical to early Bitcoin. Address derivation is SHA-256 + RIPEMD-160 of the public key. Multi-sig is provided through native Bitcoin Script opcodes (OP_CHECKMULTISIG). The signature scheme has not changed since the chain's 2013 launch; Dogecoin Core 1.14.9 (March 2026) shipped performance and node-sync improvements without touching the signature path.

A [community discussion of Taproot adoption](https://github.com/dogecoin/dogecoin/discussions/3684) exists, with some commenters proposing Taproot and Schnorr as prerequisites for any later PQ migration. The discussion is informal; no proposal has been accepted and no timeline has been set.

The Dogecoin Foundation's [libdogecoin#294](https://github.com/dogecoinfoundation/libdogecoin/pull/294) (open, April 2026) is the first commit-level PQC artifact in the ecosystem. The PR adds a `pqc_carrier` generic PQC commitment infrastructure to the Foundation's C SDK with three signature backends: Falcon, ML-DSA-44 (Dilithium2), and Raccoon-G, integrated via liboqs. A BIP-style specification document (`bip-post-quantum-signature-commitments.mediawiki`) is included. A companion pull request opened May 2026 in the Foundation's sibling fork repository adds an in-tree port of the Raccoon-G-44 algorithm directly. Both are SDK-layer work and do not change the core node or protocol consensus rules.

**Current state.** ECDSA secp256k1 only. No Schnorr or Taproot. SDK-layer PQC exploration underway in the Dogecoin Foundation repositories.

**Planned future work.** [DIP-2241](https://github.com/dogecoin/dogecoin/issues/2241) is the only PQ-named proposal at the protocol level; it is in discussion / draft state, has no assigned champion, and has not progressed to a specification.

## 2. Consensus

Not rated — hash-based proof-of-work is quantum-resistant since genesis. This tracker covers PQC migrations.

## 3. P2P Networking

**Grade: F ❌**

Dogecoin's P2P layer is inherited from early Bitcoin. Nodes communicate over plaintext v1 P2P (no default transport encryption); peer discovery uses DNS seeds and Bitcoin-style gossip; node identity is derived from secp256k1 keys. [BIP-324](https://bips.dev/324/) v2 transport — Bitcoin Core's opportunistic encryption layer using ElligatorSwift ECDH — has not been adopted by Dogecoin and is not on a published roadmap. Even if it were, ECDH is itself quantum-vulnerable.

**Current state.** Plaintext v1 P2P, secp256k1 node identity, no transport encryption.

**Planned future work.** No specification, working-group thread, or release note describes a PQ transport plan for Dogecoin's P2P layer.

## 4. On-Chain Logic

**Grade: F ❌**

Dogecoin's on-chain logic is Bitcoin Script — a stack-based, non-Turing-complete language used to gate spends. The available signature opcodes verify ECDSA secp256k1 only: OP_CHECKSIG / OP_CHECKSIGVERIFY (ECDSA) and OP_CHECKMULTISIG (legacy ECDSA). Hash opcodes include OP_SHA256 and OP_HASH160 (SHA-256 + RIPEMD-160). There is no PQC verification opcode and no proposal in the [dogecoin/dogecoin](https://github.com/dogecoin/dogecoin) repository for one.

The closest concrete on-chain proposal is [OP_CHECKZKP](https://blog.nexus.xyz/groth16-powered-smart-contracts-on-dogecoin/) from the DogeOS / MyDoge team, which would verify Groth16 zero-knowledge proofs natively on-chain. Groth16 uses BN254 elliptic-curve pairings and is itself not a post-quantum scheme. The PQC-named proposal [DIP-2241](https://github.com/dogecoin/dogecoin/issues/2241) gestures at NIST PQC schemes (**ML-KEM**, **ML-DSA**, **XMSS**) but is in informal discussion and is chain-wide rather than on-chain-opcode-specific.

**Current state.** Bitcoin Script with ECDSA-only signature verification opcodes. No PQ verification opcode.

**Planned future work.** No on-chain-specific PQ opcode has been proposed.

## 5. Other Features

Dogecoin does not support any special features.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Dogecoin's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ➖, P2P ❌, On-Chain ❌, Other ➖.

We have found no public information indicating migration activity for Dogecoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Dogecoin operates under off-chain rough consensus among Dogecoin Core maintainers with stewardship from the Dogecoin Foundation. Proposals are tracked informally as GitHub issues / discussions; the chain has no formalised process equivalent to Bitcoin's BIP system. Hard forks have been infrequent and conservative; merge-mining (2014) is the largest historical example.

PQ-relevant items currently in discussion:

- [DIP-2241](https://github.com/dogecoin/dogecoin/issues/2241) — "Update Dogecoin to be Post Quantum Resistant." Status: discussion / draft. No accepted timeline, no assigned champion, no specific algorithm selection.
- [GitHub Discussion #3684](https://github.com/dogecoin/dogecoin/discussions/3684) — community thread on Taproot / Schnorr support, sometimes framed as a prerequisite for PQ migration. Informal discussion, no proposal advanced.

PQ-adjacent SDK work:

- [dogecoinfoundation/libdogecoin#294](https://github.com/dogecoinfoundation/libdogecoin/pull/294) — PQC carrier + **Falcon** + **ML-DSA-44** (Dilithium2) + Raccoon-G + BIP-style spec (open, 2026-04-10). SDK-layer only; does not change the core protocol.
- dogecoinfoundation/dogecoin#8 — in-tree Raccoon-G-44 port ("src, test, pqc: integrate in-tree Raccoon-G-44 port", opened 2026-05-18). Companion to libdogecoin#294; SDK-layer, does not change the core protocol.

PQ-adjacent on-chain work:

- OP_CHECKZKP (DogeOS / MyDoge) — Groth16 ZK-proof verification opcode. Under community review. Not a PQ scheme.

No hard fork has been scheduled or signaled relating to PQ migration on Dogecoin.

---

_Generated on 03 Jun 2026 based on information as of 25 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
