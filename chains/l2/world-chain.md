# World Chain (WLD) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | World Chain |
| **Ticker** | WLD |
| **Website** | https://world.org |
| **GitHub** | https://github.com/worldcoin |
| **Stack** | OP Stack |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | Fraud proofs (Cannon / MIPS-RISC-V bisection game) |
| **Sequencer model** | Centralized (Tools for Humanity / Worldcoin) |
| **On-chain environment** | EVM (EVM-equivalent) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | B | 🔧 | In Development |
| Data Availability | C | 🗺️ | Roadmapped |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | C | 🗺️ | Roadmapped |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | C | 🗺️ | Roadmapped |

## Overview

World Chain is an OP Stack optimistic rollup operated by Tools for Humanity (the company behind Worldcoin) and a member of the Optimism Superchain. It is designed to give priority blockspace to World ID-verified humans, but this prioritization is an application-layer sequencer policy — it does not alter any cryptographic primitive or PQC exposure. All of World Chain's PQC ratings are inherited directly from the OP Stack baseline.

As a Superchain member, World Chain inherits OP Labs' published post-quantum roadmap (January 2026), which commits to deprecating ECDSA-signed EOA transactions within a 10-year window (by January 2036) via EIP-7702 smart wallet migration. This earns the Transaction Signatures and EC Sunset categories a C (Roadmapped) rating. Settlement earns a B because Ethereum has active PQC research underway (pq.ethereum.org), and Data Availability earns a C because Ethereum's KZG blob scheme is on a replacement roadmap. Every other category is unaddressed: the Cannon fault proof system relies on EC-signed output roots, the op-node P2P layer uses secp256k1 node identity, and no PQC precompile exists on-chain.

World ID itself uses Groth16 ZK proofs over the BN254 curve for identity commitments — an EC-pairing-based construction that is quantum-vulnerable — but this is an application-layer identity system, not a chain-level protocol concern for this evaluation.

## Proposed and Implemented PQC Algorithms

World Chain does not currently propose or implement any post-quantum cryptographic algorithms. The OP Labs PQ roadmap acknowledges that the specific PQC algorithm for transaction signatures has not yet been chosen.

## Settlement Layer

**Grade: B 🔧**

World Chain settles to Ethereum. Output roots are proposed on Ethereum L1 via the `DisputeGameFactory` and `FaultDisputeGame` contracts; withdrawals finalize after a 7-day challenge window. World Chain's settlement security is bounded by Ethereum's own security.

Ethereum has active PQC work in progress — consensus-layer validator signatures, blob attestations, and transaction signatures are all subjects of ongoing research — earning an in-development (B) rating. The Superchain Security Council 2-of-2 multisig controls upgrade authority over World Chain's bridge contracts; both signers use standard EC (secp256k1) keys. A quantum attacker holding either signer's key could unilaterally upgrade or drain the bridge.

## Data Availability

**Grade: C 🗺️**

World Chain publishes transaction data to Ethereum as EIP-4844 blobs. Blob commitments use KZG over BLS12-381, which relies on elliptic-curve pairings and is quantum-vulnerable. Ethereum's roadmap includes replacing BLS12-381 with quantum-resistant alternatives, but the replacement algorithm and timeline are not yet defined.

Because World Chain uses only Ethereum blobs with no alternative DA layer, it inherits the blob DA rating directly from Ethereum. If Ethereum completes its KZG replacement, World Chain picks it up for free.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for World Chain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

World Chain uses the OP Stack Cannon fault proof system. Cannon's internal bisection game is hash-based (Keccak), which is quantum-resistant in isolation. However, output roots are proposed by EC-keyed accounts on Ethereum L1. A cryptographically relevant quantum computer could forge a proposer signature, submit a fraudulent output root, and drain bridge funds after the challenge window expires. No published plan exists to replace EC-signed output roots or add PQC-keyed proposers.

## Transaction Signatures

**Grade: C 🗺️**

World Chain is EVM-equivalent. Every user account is a secp256k1 ECDSA address today; there is no PQC transaction type in the OP Stack protocol.

As a Superchain member, World Chain inherits OP Labs' "A Post-Quantum Roadmap for the Superchain" (January 14, 2026), which commits to deprecating raw ECDSA-signed EOA transactions within a 10-year window (by January 2036). The migration path is EIP-7702 smart wallet delegation: EOAs delegate key management to PQ-aware smart contract accounts. The specific PQC algorithm is not yet chosen — OP Labs has stated "We don't yet know whether the NIST-standardized lattice-based signatures are the best long-term choice." No implementation has started.

World ID-gated priority blockspace reserves transaction ordering capacity for verified humans but does not alter the signature scheme used to authorize those transactions.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for World Chain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

World Chain's sequencer is centralized and operated by Tools for Humanity. The op-node runs a libp2p gossip network to propagate unsafe blocks; node identity uses secp256k1 keys. RPC endpoints use classical TLS 1.3 with ECDHE key exchange. No PQC hybrid key exchange or ML-KEM handshake has been published for any OP Stack networking component.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for World Chain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

World Chain is EVM-equivalent and ships the standard Ethereum precompile set: `ecrecover` (secp256k1), BN254 elliptic-curve operations, SHA-256, and others. There is no PQC signature verification precompile. Smart contracts on World Chain cannot currently verify post-quantum signatures natively. World Chain would inherit any PQC precompile additions that Ethereum standardizes in a future fork, but none are currently on Ethereum's near-term EIP roadmap.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for World Chain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

World Chain's primary additional cryptographic surface is its bridge and governance infrastructure, inherited from the OP Stack. L2-to-L1 withdrawals depend on Merkle proofs anchored to EC-signed output roots. The Superchain Security Council 2-of-2 multisig controls upgrade authority; the Guardian role can pause the bridge — both are EC-keyed with no PQC retirement plan.

World ID, the chain's distinctive identity feature, uses Groth16 ZK proofs (over BN254) for Semaphore-based identity commitments. This construction is EC-pairing-based and quantum-vulnerable. A future quantum attacker could in principle break the unlinkability guarantees of World ID commitments. This is an application-layer concern for the World ID system; it is noted here for completeness but is not a chain-level PQC migration item tracked in the category ratings above.

## EC Sunset

**Grade: C 🗺️**

As a Superchain member, World Chain inherits the OP Labs post-quantum roadmap (January 2026), which commits to deprecating ECDSA-signed EOA transactions within a 10-year window (by January 2036) via EIP-7702 smart wallet delegation. This constitutes a published EC retirement plan for transaction signatures.

Adding PQC alongside EC is not the same as retiring EC. For reference, World Chain's PQC-adoption ratings per category are: Settlement 🔧, DA 🗺️, Proof ❌, Tx Sigs 🗺️, Networking ❌, On-Chain ❌, Other ❌.

The EC sunset commitment covers transaction signatures only. No EC sunset plan exists for consensus, networking, on-chain precompiles, bridge governance, or the Security Council multisig. EC remains present across all other layers of the stack.

## Governance

World Chain operates under the Optimism Collective governance model as a Superchain member. Protocol upgrades to the OP Stack require Token House approval and are subject to Security Council veto. The 2-of-2 multisig (Optimism Foundation + Security Council) can act unilaterally in emergencies. Tools for Humanity operates the World Chain sequencer and output root proposer under this shared governance framework.

OP Labs published "A Post-Quantum Roadmap for the Superchain" on January 14, 2026, committing to a 10-year ECDSA EOA deprecation window. No World Chain-specific or Tools for Humanity PQC governance proposals have been submitted.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
