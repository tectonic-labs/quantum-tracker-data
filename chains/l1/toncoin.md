# Toncoin (TON) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Toncoin |
| **Ticker** | TON |
| **Website** | <https://ton.org> |
| **GitHub** | <https://github.com/ton-blockchain> |
| **Twitter / X** | <https://x.com/ton_blockchain> |
| **On-chain environment** | TVM (TON Virtual Machine; FunC / Tact) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Toncoin's protocol stack is Ed25519 for [user transaction signing](https://docs.ton.org/contract-dev/signing) and validator block signing, Curve25519 Diffie–Hellman with AES-256-CTR for the [ADNL P2P transport](https://docs.ton.org/learn/networking/low-level-adnl), and a wide [set of EC primitives in the TVM](https://blog.ton.org/the-most-significant-tvm-update-so-far-extended-cryptography-arbitrary-precision-arithmetic-and-new-instructions) (Curve25519/Ed25519, secp256k1, secp256r1, Ristretto, BLS12-381 pairings) for on-chain verification. The recent TVM Extended Cryptography update broadened the available EC primitive set rather than introducing post-quantum alternatives.

No post-quantum proposal, draft, or working-group thread has been identified in the [TON Enhancement Proposal (TEP)](https://github.com/ton-blockchain/TEPs) repository, in TON Foundation announcements, or in TON Core development plans.

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

We have found no public information indicating migration activity for Toncoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### Jettons (fungible tokens)

**Current state.** [Jettons](https://github.com/ton-blockchain/TEPs/blob/master/text/0074-jettons-standard.md) (TEP-74) are TON's fungible-token standard, comparable to ERC-20 on Ethereum. The Jetton protocol uses SHA-256 hashing for metadata dictionaries and [Merkle trees with SHA-256 for "mintless" airdrops](https://docs.ton.org/standard/tokens/jettons/mintless/overview). Token issuance, transfer, and admin operations are authorized by Ed25519 signatures at the transaction layer; the Jetton standard adds no cryptography beyond the chain-level signature scheme.

**Planned future work.** No Jetton-specific PQ proposal is currently published. Token-issuance security tracks the chain-level signature scheme.

### TON DNS and TON Storage

**Current state.** [TON DNS](https://docs.ton.org/) (`.ton` domains) and TON Storage (distributed file storage) authenticate domain ownership and access control through Ed25519 signatures and smart-contract logic. They inherit the chain-level signature scheme.

**Planned future work.** No TON DNS or TON Storage–specific PQ proposal is currently published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Toncoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Protocol changes flow through the [TON Enhancement Proposals (TEPs)](https://github.com/ton-blockchain/TEPs) process, with implementation by TON Core and coordination through the [TON Foundation](https://docs.ton.org/foundations/whitepapers/overview).

PQ-relevant work currently visible:

- No PQ-related TEP, draft, mailing-list thread, or implementation effort has been identified in the TEP repository or in TON Foundation / TON Core public communications.

The most recent significant cryptographic upgrade — the [TVM Extended Cryptography update](https://blog.ton.org/the-most-significant-tvm-update-so-far-extended-cryptography-arbitrary-precision-arithmetic-and-new-instructions) — added secp256k1, secp256r1, Ristretto, and BLS12-381 support to the TVM but did not include any post-quantum primitives.

---

_Generated on 06 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
