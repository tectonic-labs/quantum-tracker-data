# Soneium (SONE) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Soneium |
| **Ticker** | SONE |
| **Website** | https://soneium.org |
| **GitHub** | https://github.com/soneium |
| **Stack** | OP Stack |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | Fraud proofs (Cannon / MIPS-RISC-V bisection game) |
| **Sequencer model** | Centralized (Sony) |
| **On-chain environment** | EVM (EVM-equivalent) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | C | 🗺️ | Roadmapped |
| Data Availability | C | 🗺️ | Roadmapped |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Overview

Soneium is an OP Stack optimistic rollup operated by Sony and a member of the Optimism Superchain. As a standard OP Stack deployment with no meaningful protocol-level deviations, Soneium inherits virtually all of its cryptographic properties — and therefore its PQC posture — directly from the OP Stack and, through it, from Ethereum.

Settlement and Data Availability land at 🗺️ because Ethereum has active PQC research underway (the pq.ethereum.org initiative, leanSig, leanVM). Every other category is unaddressed: transaction signatures are ECDSA secp256k1, Cannon fault proofs rely on EC-signed output roots, the op-node P2P layer uses secp256k1 node identity, and neither Sony, the Soneium team, nor OP Labs has published any PQC roadmap for Soneium-specific components. The Superchain Security Council multisig and the bridge's output-root-based withdrawal mechanism are both fully EC-dependent.

## Proposed and Implemented PQC Algorithms

Soneium does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: C 🗺️**

Soneium settles to Ethereum. Output roots are proposed via the `DisputeGameFactory` and `FaultDisputeGame` contracts on Ethereum L1; withdrawals finalize after a 7-day challenge window. Soneium's settlement security is bounded by Ethereum's own security.

Ethereum has active PQC work underway across consensus-layer validator signatures, blob attestations, and transaction signatures. That activity earns Ethereum a 🔧 in-development rating in affected categories; Soneium inherits this trajectory at the settlement layer. The Superchain Security Council 2-of-2 multisig (Optimism Foundation + Security Council) controls contract upgrades and is entirely EC-based. A sufficiently capable quantum attacker holding either signer's key could unilaterally upgrade or drain Superchain bridge contracts, including Soneium's.

## Data Availability

**Grade: C 🗺️**

Soneium publishes transaction data to Ethereum as EIP-4844 blobs. Blob commitments use KZG over BLS12-381, which relies on elliptic-curve pairings and is quantum-vulnerable. Ethereum's roadmap includes replacing BLS12-381 with quantum-resistant alternatives, but the replacement algorithm and timeline are not yet defined.

Because Soneium uses only Ethereum blobs (no AltDA), it inherits the blob DA rating directly from Ethereum. If Ethereum completes its KZG replacement, Soneium picks it up for free.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Soneium in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Soneium uses the OP Stack Cannon fault proof system. Cannon's internal execution trace is MIPS/RISC-V based and the bisection game itself is hash-based (Keccak), which is quantum-resistant in isolation. However, output roots — the commitments that anchor the entire withdrawal system — are proposed by EC-keyed accounts on Ethereum L1. A cryptographically relevant quantum computer could forge a proposer signature, submit a fraudulent output root, and drain bridge funds after the challenge window expires. There is no published plan from Sony, the Soneium team, or OP Labs to replace EC-signed output roots or add PQC-keyed proposers.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Soneium in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Soneium is EVM-equivalent. Every user account is a secp256k1 ECDSA address; there is no PQC transaction type in the OP Stack protocol. EIP-7702 (available from the Isthmus upgrade onward) allows delegation to smart contract wallets, which could in principle implement PQC signature verification at the application layer, but no Soneium-specific PQC wallet migration plan has been published, and application-layer workarounds do not change the protocol-level exposure.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Soneium in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Soneium's sequencer is centralized and operated by Sony. The op-node runs a libp2p gossip network to propagate unsafe blocks from the sequencer to other nodes; node identity in this network uses secp256k1 keys. RPC endpoints use classical TLS 1.3 with ECDHE key exchange. No PQC hybrid key exchange, no ML-KEM handshake, and no OP Stack networking PQC work has been published.

The centralized sequencer means P2P gossip is a propagation convenience rather than a consensus requirement, but the EC key material in the gossip network remains quantum-vulnerable for node impersonation and traffic analysis.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Soneium in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Soneium is EVM-equivalent and ships the standard Ethereum precompile set: `ecrecover` (secp256k1), BN254 elliptic-curve operations, SHA-256, and others. There is no PQC signature verification precompile — no ML-DSA, Falcon, SPHINCS+, or equivalent. Smart contracts on Soneium cannot currently verify post-quantum signatures natively. Soneium would inherit any PQC precompile additions that Ethereum standardizes in a future fork, but none are currently on Ethereum's near-term EIP roadmap.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Soneium in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Soneium's primary additional cryptographic surface is its bridge and governance infrastructure. L2-to-L1 withdrawals depend on Merkle proofs anchored to EC-signed output roots (see Proof / Verification). The Superchain Security Council 2-of-2 multisig controls upgrade authority over Soneium's contracts; both signers use standard EC (secp256k1) Ethereum keys. A Guardian role can pause the bridge in emergencies and is also EC-keyed. None of these have PQC retirement plans.

The planned Superchain shared sequencing feature, when it arrives, will introduce a sequencer consensus layer with its own key material. No PQC requirements have been specified for that component.

## EC Sunset

**Grade: F ❌**

No PQC discussions have been found from Sony or the Soneium team regarding retirement of EC-based cryptography from any Soneium component.

Adding PQC alongside EC is not the same as retiring EC. For reference, Soneium's PQC-adoption ratings per category are: Settlement 🗺️, DA 🗺️, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

EC is present in every layer of Soneium: transaction signatures, output root proposals, bridge governance multisigs, the Guardian role, op-node peer identity, and RPC transport. No component has a published plan for EC removal.

## Governance

Soneium operates within the Optimism Collective governance structure as a Superchain member. Protocol upgrades to the OP Stack go through Optimism Improvement Proposals (OIPs) voted on by the Token House (OP holders) and are subject to Security Council veto. Emergency actions require the 2-of-2 Security Council multisig. Soneium-specific operational decisions (sequencer operation, output root proposals) are made by Sony.

No PQC-related proposals have been identified in the Optimism Collective governance forum or in Soneium's own communications.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
