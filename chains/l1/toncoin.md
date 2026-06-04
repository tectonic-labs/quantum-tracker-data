# Toncoin (TON) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Toncoin |
| **Ticker** | TON |
| **Website** | https://ton.org |
| **GitHub** | https://github.com/ton-blockchain |
| **Twitter / X** | https://x.com/ton_blockchain |
| **On-chain environment** | TVM (TON Virtual Machine) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

TON is a multi-chain BFT PoS blockchain originally designed by Telegram engineers and now governed independently by the TON Foundation following Telegram's 2020 withdrawal. It uses a MasterChain anchored by up to 100 validators, with ShardChains each validated by 23 validators. Transaction signing is Ed25519 only. The P2P transport layer (ADNL) uses Curve25519 Diffie–Hellman for session key negotiation. A recent TVM update added extensive EC precompiles (secp256k1, secp256r1, Ristretto, BLS12-381) with no PQC additions. As of the most recent research pass, no TON Enhancement Proposals (TEPs) or TON Foundation announcements covering post-quantum migration have been published.

## Proposed and Implemented PQC Algorithms

Toncoin does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Toncoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Toncoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Toncoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

TON's smart contracts are written in FunC or Tact and execute in the [TVM (TON Virtual Machine)](https://docs.ton.org/v3/concepts/dive-into-ton/go-from-ethereum/tvm-vs-evm). A recent TVM Extended Cryptography update added native support for Curve25519, secp256k1, secp256r1, Ristretto, and BLS12-381 — all elliptic-curve schemes. No post-quantum signature verification primitives were included.

TON uses smart-contract wallets for account logic. The w5 wallet contract supports arbitrary extensions, which means a post-quantum signature verifier could in principle be deployed as a w5 extension without a protocol change. No such extension has been published.

**Current state.** TVM has broad EC precompile support; no post-quantum opcodes exist.

**Planned future work.** No proposals for post-quantum TVM precompiles have been identified.

## 5. Other Features

### TON DNS and TON Storage

**Current state.** [TON DNS](https://docs.ton.org/) provides decentralized `.ton` domain naming, and TON Storage provides distributed file storage. Both use Ed25519 signatures for domain ownership and access control, verified through smart-contract logic. They share the same quantum exposure as the base transaction-signature layer.

**Planned future work.** No post-quantum migration plans for TON DNS or TON Storage have been published.

### Jettons (TRC-20 Equivalent)

**Current state.** The [Jetton standard (TEP-74)](https://github.com/ton-blockchain/TEPs/blob/master/text/0074-jettons-standard.md) is TON's fungible token protocol. Jetton issuance and transfers are authorized by Ed25519 transaction signatures at the base layer. Mintless jetton airdrops use SHA256-based Merkle trees for distribution. The Jetton protocol does not introduce additional quantum-sensitive cryptography beyond the base-layer signature exposure.

**Planned future work.** None published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Toncoin's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Toncoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

TON protocol changes follow two paths: config proposals (parameter changes, requiring ≥75% validator stake weight across multiple consecutive validator rounds), and software hard forks (for consensus-breaking changes, coordinated by the TON Core team). Formal protocol specification changes are submitted as [TON Enhancement Proposals (TEPs)](https://github.com/ton-blockchain/TEPs) on GitHub.

No PQC-related TEPs have been identified as of the most recent research pass.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
