# Dash (DASH) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Dash |
| **Ticker** | DASH |
| **Website** | https://dash.org |
| **GitHub** | https://github.com/dashpay/dash |
| **Twitter / X** | https://x.com/dashpay |
| **Derived from** | Bitcoin |
| **On-chain environment** | Bitcoin Script (variant) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | B | 🔧 | In Development |
| EC Sunset | F | ❌ | Not Discussed |

Dash is a Bitcoin-derived network with [masternodes](https://docs.dash.org/en/stable/masternodes/understanding.html) providing InstantSend, [CoinJoin privacy mixing](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-coinjoin.html), and on-chain governance. Its X11 Proof-of-Work consensus chains 11 hash functions and is quantum-resistant. All other cryptographic components — transaction signatures, masternode identity, CoinJoin coordination, and P2P networking — use secp256k1 ECDSA with no post-quantum migration plan.

The most notable PQC activity is an [open pull request](https://github.com/dashpay/orchard/pull/3) adding hybrid **ML-KEM-768** + ECDH key encapsulation to Dash's adoption of Zcash's Orchard shielded transaction protocol, specifically protecting note encryption against harvest-now-decrypt-later attacks.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-KEM-768** (FIPS 203) | ECDH | Other (Orchard note encryption) | In Development |

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Dash in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: A ✅**

Dash uses X11 Proof-of-Work, which chains 11 cryptographic hash functions (BLAKE, BMW, GROESTL, SKEIN, JH, KECCAK, LUFFA, CUBEHASH, SHAVITE, SIMD, ECHO) in sequence. Hash-based mining is quantum-safe — quantum computers cannot meaningfully speed up proof-of-work hashing. Grover's algorithm provides at most a quadratic speedup, which is absorbed by difficulty adjustment.

**Current state.** Mining and block validation are entirely hash-based. No EC cryptography is involved in the consensus mechanism itself.

**Planned future work.** None needed for the consensus layer specifically.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Dash in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Dash uses a Bitcoin Script variant with standard signature verification opcodes (secp256k1 ECDSA). No post-quantum opcodes exist. The scripting environment exposes signature verification primitives but none support post-quantum schemes.

**Current state.** Script validation supports only secp256k1 ECDSA. No PQC opcodes exist.

**Planned future work.** No DIP (Dash Improvement Proposal) for PQC opcodes has been filed.

## 5. Other Features

**Grade: B 🔧**

### Orchard Shielded Transactions (Hybrid KEM)

Dash is adopting Zcash's Orchard protocol for shielded transactions. An [open pull request](https://github.com/dashpay/orchard/pull/3) adds **ML-KEM-768** (FIPS 203) alongside classical ECDH using an X-Wing-style hybrid KDF that binds both shared secrets, the PQ ciphertext, and the ephemeral public key. The feature is gated behind a `hybrid-kem` flag. This specifically defends against harvest-now-decrypt-later attacks on shielded transaction content.

**Current state.** The hybrid KEM PR has code written and is feature-gated. Not yet merged to production.

**Planned future work.** Completion and activation of the Orchard hybrid KEM integration. No broader PQC roadmap beyond this feature has been published.

### CoinJoin Privacy Mixing

[CoinJoin](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-coinjoin.html) provides transaction-graph obfuscation through [masternode](https://www.dash.org/masternodes/)-coordinated mixing rounds using standard denominations. Round coordination uses secp256k1 ECDSA signatures.

**Current state.** CoinJoin coordination is EC-based. Unlike zero-knowledge proof systems, CoinJoin mixing is ephemeral and does not store encrypted transactions on-chain, limiting the harvest-now-decrypt-later risk.

**Planned future work.** None documented for CoinJoin PQC migration.

### Masternode Network

[Masternodes](https://docs.dash.org/en/stable/masternodes/understanding.html) use secp256k1 public keys for identity and sign InstantSend locks, CoinJoin coordination, and governance votes using secp256k1 ECDSA.

**Current state.** All masternode signing is EC-based.

**Planned future work.** None documented.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ✅, P2P ❌, On-Chain ❌, Other 🔧.

No published DIP addresses broad post-quantum migration. The Orchard hybrid KEM work shows PQC awareness at the implementation level, but it is a targeted defense for shielded note encryption rather than a comprehensive EC retirement plan.

**Current state.** secp256k1 ECDSA is embedded in every protocol layer except PoW mining. No EC deprecation plan exists.

**Planned future work.** None beyond the Orchard hybrid KEM feature.

## Governance

Dash governance operates through [masternode voting](https://docs.dash.org/en/stable/masternodes/understanding.html) on treasury proposals and protocol upgrades. DIPs (Dash Improvement Proposals) are the mechanism for consensus changes.

No PQC-related DIPs have been filed. No formal community discourse on broad PQC migration has been documented.

---

_Generated on 07 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
