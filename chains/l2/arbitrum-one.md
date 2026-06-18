# Arbitrum One (ARB) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Arbitrum One |
| **Ticker** | ARB |
| **Website** | https://arbitrum.io |
| **GitHub** | https://github.com/OffchainLabs |
| **Stack** | Arbitrum Nitro |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | Fraud proofs (BoLD — Bounded Liquidity Delay; WASM/RISC-V bisection game) |
| **Sequencer model** | Centralized (Offchain Labs) |
| **On-chain environment** | EVM (EVM-equivalent) + Stylus (WASM co-processor) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | B | 🔧 | In Development |
| Data Availability | C | 🗺️ | Roadmapped |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Overview

Arbitrum One is the flagship deployment of Arbitrum Nitro — an optimistic rollup operated by Offchain Labs. It is the largest Arbitrum chain by TVL and volume, governed by ArbitrumDAO via a 12-member Security Council. As of February 2025, Arbitrum One uses the BoLD (Bounded Liquidity Delay) dispute protocol for fraud proofs, enabling permissionless validation.

Arbitrum One's PQC posture is substantially determined by its stack and its settlement chain. Settlement and Data Availability inherit ratings from Ethereum's active PQC research effort. All other categories are unaddressed: transaction signatures are ECDSA secp256k1, BoLD assertions are EC-signed, the sequencer feed uses classical TLS, and neither Offchain Labs nor ArbitrumDAO has published any PQC roadmap for any Nitro component.

Importantly, Arbitrum One uses Ethereum blobs for DA — not the AnyTrust DAC used by Arbitrum Nova. This avoids the more acute quantum exposure of DAC certificate key harvesting (see the Arbitrum Nova report for details on that risk).

## Proposed and Implemented PQC Algorithms

Arbitrum One does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: B 🔧**

Arbitrum One settles to Ethereum. Sequencer batch postings and fraud-proof challenges are adjudicated by the RollupCore and Outbox contracts on Ethereum L1. Arbitrum One's settlement security is bounded by Ethereum's security.

Ethereum has active PQC work in progress across consensus-layer validator signatures, blob attestations, and transaction signatures (the pq.ethereum.org initiative, leanSig, leanVM). That earns Ethereum a 🔧 in-development rating in affected categories, which Arbitrum One inherits at the settlement layer.

The ArbitrumDAO Security Council — a 12-member Gnosis Safe multisig on Ethereum L1 — controls upgrade authority over the RollupCore contracts, with a 9-of-12 threshold for emergency actions and 7-of-12 for non-emergency proposals. All 12 council member keys are ECDSA secp256k1. A cryptographically relevant quantum computer could harvest council member keys from on-chain data and push a malicious protocol upgrade within the 3-day emergency timelock window, bypassing the BoLD challenge period entirely.

## Data Availability

**Grade: C 🗺️**

Arbitrum One publishes transaction data to Ethereum as EIP-4844 blobs. Blob commitments use KZG over BLS12-381, which relies on elliptic-curve pairings and is quantum-vulnerable. Ethereum's roadmap includes replacing BLS12-381 with a quantum-resistant alternative, but the replacement algorithm and timeline are not yet defined.

Because Arbitrum One uses only Ethereum blobs (no AnyTrust DAC, no AltDA), it inherits the blob DA rating directly from Ethereum. If Ethereum completes its KZG replacement, Arbitrum One picks it up for free. This is a materially better posture than Arbitrum Nova's AnyTrust DAC path, which is rated ❌ — see that chain's report for details.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Arbitrum One in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Arbitrum One uses the BoLD dispute protocol (live on mainnet since February 2025). BoLD's multi-round interactive bisection game narrows disputes down to a single WASM instruction, which is verified on-chain against a hash — a hash-based step that is quantum-resistant in isolation. However, the assertions that guide the entire bisection are posted to Ethereum L1 by validator nodes using ECDSA secp256k1 keys. A cryptographically relevant quantum computer could forge a validator's assertion signature, post a fraudulent state root unchallenged, and drain bridge funds. Bond management is also secp256k1-based. The RISC-V transition underway via Stylus is a performance and portability change, not a PQC change.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Arbitrum One in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Arbitrum One is EVM-equivalent. Every user account is a secp256k1 ECDSA address; there is no PQC transaction type in the Arbitrum Nitro protocol. Stylus allows WASM contracts — which could in principle host a PQC signature verifier — but no such deployment has been published and Stylus transactions themselves are still secp256k1-signed. ERC-4337 PQC wallets are application-layer only and do not change this rating.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Arbitrum One in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Arbitrum One's sequencer is centralized and operated by Offchain Labs. The sequencer broadcasts its transaction feed to subscribers over WebSocket/TLS using classical ECDHE key exchange. Validator nodes do not form a peer-to-peer consensus network; they watch Ethereum L1 directly and post assertions using their secp256k1 Ethereum account keys. RPC endpoints use HTTPS/TLS 1.3 with classical ECDHE. No PQC hybrid key exchange or ML-KEM handshake has been deployed or published.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Arbitrum One in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Arbitrum One is EVM-equivalent and ships the standard Ethereum precompile set: `ecrecover` (secp256k1), BN254 elliptic-curve operations (`ecAdd`, `ecMul`, `ecPairing`), SHA-256, and others. Stylus (WASM co-processor) allows arbitrary computation in smart contracts but provides no protocol-level PQC verification primitive. There is no ML-DSA, Falcon, SPHINCS+, or equivalent precompile. Offchain Labs has not published proposals for PQC precompiles analogous to Ethereum EIPs.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Arbitrum One in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Arbitrum One's primary additional cryptographic surface is its bridge and governance infrastructure.

**Canonical bridge (Inbox / Outbox)**: L2-to-L1 withdrawals execute a Merkle proof against a confirmed state root in the Outbox contract. The Merkle proof itself is hash-based and quantum-resistant, but the state root it anchors to was posted by an EC-signed assertion. A CRQC forging assertion signatures could authorize fraudulent state roots, enabling invalid Outbox withdrawals.

**ArbitrumDAO Security Council**: The 12-member Gnosis Safe multisig governs protocol upgrades (9-of-12 emergency / 7-of-12 non-emergency). All member keys are ECDSA secp256k1. Member addresses are publicly known, making targeted key harvesting straightforward for a quantum adversary.

**Batch poster**: The sequencer registers a secp256k1 key to post transaction batches to L1. Compromising this key could allow an adversary to post malformed batches.

## EC Sunset

**Grade: F ❌**

No PQC discussions have been found from Offchain Labs or ArbitrumDAO regarding retirement of EC-based cryptography from any Arbitrum One component.

Adding PQC alongside EC is not the same as retiring EC. For reference, Arbitrum One's PQC-adoption ratings per category are: Settlement 🔧, DA 🗺️, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

EC is present in every layer of Arbitrum One: transaction signatures, BoLD assertion posting, bridge governance multisigs, batch poster key, sequencer feed transport, and RPC endpoints. No component has a published plan for EC removal.

## Governance

Arbitrum One is governed by ArbitrumDAO (ARB token holders) via Arbitrum Improvement Proposals (AIPs) submitted to the governance forum and voted on through Tally. The Security Council (12 elected members) can execute emergency actions via a 9-of-12 multisig threshold. Offchain Labs is the primary protocol developer and holds significant influence as the reference implementation maintainer.

No PQC-related AIPs or Offchain Labs research posts have been identified.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
