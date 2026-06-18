# Ink (INK) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Ink |
| **Ticker** | INK |
| **Website** | https://inkonchain.com |
| **GitHub** | https://github.com/inkonchain |
| **Stack** | OP Stack |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | Fraud proofs (Cannon / MIPS-RISC-V bisection game) |
| **Sequencer model** | Centralized (Kraken) |
| **On-chain environment** | EVM (EVM-equivalent) |

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

Ink is a standard OP Stack optimistic rollup operated by Kraken and a member of the Optimism Superchain. It introduces no deviations from the OP Stack base in proof system, transaction format, networking, or on-chain environment — its PQC posture is therefore the OP Stack's PQC posture with Kraken as the sequencer operator.

The most favorable ratings come from Ethereum's active PQC migration effort. Settlement earns a B because Ethereum has active PQC research underway (pq.ethereum.org), and Data Availability earns a C because Ethereum's KZG blob scheme is on a replacement roadmap. Every other category is unaddressed: transaction signatures are ECDSA secp256k1, the Cannon fault proof system relies on EC-signed output roots, the op-node P2P layer uses secp256k1 node identity, and no PQC roadmap has been published for any Ink-specific or OP Stack component by Kraken or the Ink team. Bridge governance operates under the Superchain Security Council 2-of-2 multisig, which is fully EC-dependent.

## Proposed and Implemented PQC Algorithms

Ink does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: B 🔧**

Ink settles to Ethereum. Output roots are proposed on Ethereum L1 via the `DisputeGameFactory` and `FaultDisputeGame` contracts; withdrawals finalize after a 7-day challenge window. Ink's settlement security is therefore bounded by Ethereum's own security.

Ethereum has active PQC work in progress — consensus-layer validator signatures, blob attestations, and transaction signatures are all subjects of ongoing research — earning an in-development (B) rating. The Superchain Security Council 2-of-2 multisig (Optimism Foundation + Security Council) controls contract upgrades and is entirely EC-based. A quantum attacker holding either signer's key could unilaterally upgrade or drain Superchain bridge contracts, including Ink's.

## Data Availability

**Grade: C 🗺️**

Ink publishes transaction data to Ethereum as EIP-4844 blobs. Blob commitments use KZG over BLS12-381, which relies on elliptic-curve pairings and is quantum-vulnerable. Ethereum's roadmap includes replacing BLS12-381 with quantum-resistant alternatives, but the replacement algorithm and timeline are not yet defined.

Because Ink uses only Ethereum blobs with no alternative DA layer, it inherits the blob DA rating directly from Ethereum. If Ethereum completes its KZG replacement, Ink picks it up for free.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Ink in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Ink uses the OP Stack Cannon fault proof system. Cannon's internal bisection game is hash-based (Keccak), which is quantum-resistant in isolation. However, output roots are proposed by EC-keyed accounts on Ethereum L1. A cryptographically relevant quantum computer could forge a proposer signature, submit a fraudulent output root, and drain bridge funds after the challenge window expires. There is no published plan from Kraken or the Ink team to replace EC-signed output roots or add PQC-keyed proposers.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Ink in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Ink is EVM-equivalent. Every user account is a secp256k1 ECDSA address; there is no PQC transaction type in the OP Stack protocol. EIP-7702 (available from the Isthmus upgrade onward) allows delegation to smart contract wallets, which could in principle implement PQC signature verification at the application layer, but no Ink-specific PQC wallet migration plan has been published, and application-layer workarounds do not change the protocol-level exposure.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Ink in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Ink's sequencer is centralized and operated by Kraken. The op-node runs a libp2p gossip network to propagate unsafe blocks from the sequencer to other nodes; node identity in this network uses secp256k1 keys. RPC endpoints use classical TLS 1.3 with ECDHE key exchange. No PQC hybrid key exchange, no ML-KEM handshake, and no OP Stack networking PQC work has been published.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Ink in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Ink is EVM-equivalent and ships the standard Ethereum precompile set: `ecrecover` (secp256k1), BN254 elliptic-curve operations, SHA-256, and others. There is no PQC signature verification precompile — no ML-DSA, Falcon, SPHINCS+, or equivalent. Smart contracts on Ink cannot currently verify post-quantum signatures natively. Ink would inherit any PQC precompile additions that Ethereum standardizes in a future fork, but none are currently on Ethereum's near-term EIP roadmap.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Ink in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Ink's primary additional cryptographic surface is its bridge and governance infrastructure, shared with the Superchain. L2-to-L1 withdrawals depend on Merkle proofs anchored to EC-signed output roots (see Proof / Verification). The Superchain Security Council 2-of-2 multisig controls upgrade authority over Ink's contracts; both signers use standard EC (secp256k1) Ethereum keys. A Guardian role can pause the bridge in emergencies and is also EC-keyed. None of these have PQC retirement plans.

## EC Sunset

**Grade: F ❌**

No PQC discussions have been found from Kraken or the Ink team regarding retirement of EC-based cryptography from any Ink component.

Adding PQC alongside EC is not the same as retiring EC. For reference, Ink's PQC-adoption ratings per category are: Settlement 🔧, DA 🗺️, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

EC is present in every layer of Ink: transaction signatures, output root proposals, bridge governance multisigs, the Guardian role, op-node peer identity, and RPC transport. No component has a published plan for EC removal.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
