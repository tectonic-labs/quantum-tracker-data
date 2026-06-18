# Arbitrum Nova — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Arbitrum Nova |
| **Ticker** | — |
| **Website** | https://nova.arbitrum.io |
| **GitHub** | https://github.com/OffchainLabs |
| **Stack** | Arbitrum Nitro (AnyTrust configuration) |
| **Settlement layer** | Ethereum |
| **Data availability** | AnyTrust DAC (primary); Ethereum blobs (fallback) |
| **Proof type** | Fraud proofs (BoLD — Bounded Liquidity Delay; WASM/RISC-V bisection game) |
| **Sequencer model** | Centralized (Offchain Labs) |
| **On-chain environment** | EVM (EVM-equivalent) + Stylus (WASM co-processor) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | D | ⚠️ | Discussed |
| Data Availability | F | ❌ | Not Discussed |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Overview

Arbitrum Nova is an Arbitrum Nitro deployment configured for the AnyTrust Data Availability Committee (DAC) model, targeting gaming and social applications where low transaction costs are the priority. The AnyTrust DAC is the defining architectural difference from Arbitrum One and is the most acute quantum-specific risk in the Arbitrum ecosystem.

Under AnyTrust, transaction data is not published to Ethereum blobs. Instead, a 6-member committee of designated organizations signs DA certificates using ECDSA secp256k1 keys, attesting that the data is available off-chain. The Nitro node accepts a certificate meeting the 5-of-6 threshold as proof of availability; only the certificate (not the full data) is posted to Ethereum L1.

This architecture has a structural property that is especially dangerous in a post-quantum threat model: every DA certificate posted on-chain includes each signing member's public key. A cryptographically relevant quantum computer can derive all 6 private keys from this permanently accessible on-chain history.

## Proposed and Implemented PQC Algorithms

Arbitrum Nova does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: D ⚠️**

Arbitrum Nova settles to Ethereum. The RollupCore and Outbox contracts on Ethereum L1 adjudicate fraud-proof challenges; state roots are posted by the sequencer. Nova's settlement security is bounded by Ethereum's own security.

Ethereum has PQC research underway (the pq.ethereum.org initiative), but no formal roadmap commitment. The settlement layer for Nitro chains therefore sits at ⚠️ (discussed, not roadmapped). The ArbitrumDAO Security Council — a 12-member Gnosis Safe on Ethereum L1 — holds upgrade authority over the RollupCore contracts via a 9-of-12 emergency threshold. All 12 council member keys are ECDSA secp256k1. A cryptographically relevant quantum computer could harvest council keys from on-chain data and push a malicious protocol upgrade within the 3-day emergency timelock.

## Data Availability

**Grade: F ❌**

We have found no public information indicating migration activity for Arbitrum Nova in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Arbitrum Nova's AnyTrust DAC is the most quantum-exposed DA mechanism in wide production use among EVM-compatible chains.

**Committee composition** (6 members, 5-of-6 signature threshold):
- Arbitrum Foundation
- Consensys
- Google Cloud
- Offchain Labs
- P2P
- QuickNode

**How the quantum attack works:**

Every DA certificate posted to Ethereum L1 includes each signing member's public key. Because these public keys are permanently on-chain for every certificate in Nova's history, a cryptographically relevant quantum computer can run Shor's algorithm against each public key to recover the corresponding private key. All 6 keys can be harvested from existing on-chain data without any real-time network access. Once all 6 private keys are in hand:

1. **Certificate forgery**: An adversary can construct a valid 5-of-6 DA certificate attesting that transaction data is available off-chain when it has never been published. The Nitro node has no way to distinguish a forged certificate from a legitimate one. The 5-of-6 threshold provides no protection once all keys are compromised.

2. **Data-withholding attack**: With a forged certificate accepted by the Nitro protocol, L2 state advances on Ethereum L1 based on data that does not exist. No party can reconstruct L2 state or generate fraud proofs against the invalid state transition because the underlying transaction data is unavailable.

3. **Harvest-now-decrypt-later**: Committee member public keys are permanently on-chain from every historical certificate. A future quantum adversary with access to today's certificate history can retroactively compromise all past and future certificates (if keys are reused) without requiring any real-time network access.

**On the fallback path**: Nova falls back to Ethereum blobs if fewer than 5 DAC members are responsive. Under a quantum attack, this fallback does not automatically trigger — a forged certificate passes the threshold check and appears fully valid to the Nitro node. The fallback only activates when the DAC is genuinely offline, not when it is quietly compromised.

This attack surface does not exist for Arbitrum One, which uses Ethereum blobs and exposes no DAC public keys on-chain.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Arbitrum Nova in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Arbitrum Nova uses the BoLD dispute protocol. BoLD's bisection game narrows disputes down to a single WASM instruction verified on-chain by hash comparison — a step that is quantum-resistant in isolation. However, the assertions that guide the entire bisection are posted to Ethereum L1 by validator nodes using ECDSA secp256k1 keys. A cryptographically relevant quantum computer could forge assertion signatures, post a fraudulent state root, and drain bridge funds. Bond management is also secp256k1-based.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Arbitrum Nova in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Arbitrum Nova is EVM-equivalent. Every user account is a secp256k1 ECDSA address; there is no PQC transaction type in the Arbitrum Nitro protocol. Stylus allows WASM contracts — which could in principle host a PQC signature verifier — but no such deployment has been published and Stylus transactions themselves are still secp256k1-signed.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Arbitrum Nova in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Arbitrum Nova's sequencer is centralized and operated by Offchain Labs. The sequencer broadcasts its transaction feed to subscribers over WebSocket/TLS using classical ECDHE key exchange. Validator nodes do not form a peer-to-peer consensus network; they watch Ethereum L1 directly and post assertions using their secp256k1 Ethereum account keys. RPC endpoints use HTTPS/TLS 1.3 with classical ECDHE. No PQC hybrid key exchange or ML-KEM handshake has been deployed or published.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Arbitrum Nova in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Arbitrum Nova is EVM-equivalent and ships the standard Ethereum precompile set: `ecrecover` (secp256k1), BN254 elliptic-curve operations (`ecAdd`, `ecMul`, `ecPairing`), SHA-256, and others. Stylus (WASM co-processor) allows arbitrary computation in smart contracts but provides no protocol-level PQC verification primitive. There is no ML-DSA, Falcon, SPHINCS+, or equivalent precompile. Offchain Labs has not published proposals for PQC precompiles.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Arbitrum Nova in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

**Canonical bridge (Inbox / Outbox)**: L2-to-L1 withdrawals execute a Merkle proof against a confirmed state root in the Outbox contract. The Merkle proof itself is hash-based and quantum-resistant, but the state root it anchors to was posted by an EC-signed assertion. A CRQC forging assertion signatures could authorize fraudulent state roots.

**ArbitrumDAO Security Council**: The 12-member Gnosis Safe multisig governs protocol upgrades (9-of-12 emergency / 7-of-12 non-emergency). All member keys are ECDSA secp256k1. Member addresses are publicly known, making targeted key harvesting straightforward for a quantum adversary.

**AnyTrust DAC**: As described in the Data Availability section, the DAC represents the most acute quantum-specific risk on Nova. The combination of static long-lived committee keys, permanent on-chain key exposure, and the protocol's reliance on the honest-minority assumption creates a compounded attack surface that a quantum adversary could exploit using only historical on-chain data — without any real-time access to the network.

## EC Sunset

**Grade: F ❌**

No PQC discussions have been found from Offchain Labs or ArbitrumDAO regarding retirement of EC-based cryptography from any Arbitrum Nova component.

Adding PQC alongside EC is not the same as retiring EC. For reference, Arbitrum Nova's PQC-adoption ratings per category are: Settlement ⚠️, DA ❌, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

EC is present in every layer of Arbitrum Nova: transaction signatures, BoLD assertion posting, AnyTrust DAC certificate signing (the primary quantum risk), bridge governance multisigs, batch poster key, sequencer feed transport, and RPC endpoints. No component has a published plan for EC removal.

## Governance

Arbitrum Nova is governed by ArbitrumDAO (ARB token holders) via Arbitrum Improvement Proposals (AIPs) submitted to the governance forum and voted on through Tally. The Security Council (12 elected members) can execute emergency actions via a 9-of-12 multisig threshold. Offchain Labs is the primary protocol developer. DAC member composition changes require a governance process; no mechanism for rotating DAC keys to quantum-resistant alternatives has been proposed.

No PQC-related AIPs or Offchain Labs research posts have been identified.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
