# Blast (BLAST) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Blast |
| **Ticker** | BLAST |
| **Website** | https://blast.io |
| **GitHub** | https://github.com/blast-io |
| **Stack** | OP Stack |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | Fraud proofs (Cannon / MIPS-RISC-V bisection game) |
| **Sequencer model** | Centralized (Blast team) |
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

Blast is an OP Stack optimistic rollup and a member of the Optimism Superchain, operated by the Blast team. Its defining product feature — native yield for ETH and stablecoins via automatic rebasing through L1 LST and T-bill yield routing — is an application-layer mechanism that does not introduce any new cryptographic primitive or alter the chain's underlying PQC exposure.

As a standard Superchain deployment, Blast inherits virtually all of its PQC posture directly from the OP Stack and, through it, from Ethereum. Settlement earns a B because Ethereum has active PQC research underway (the pq.ethereum.org initiative), and Data Availability earns a C because Ethereum's KZG blob scheme is on a replacement roadmap. Transaction Signatures and EC Sunset each earn a C: OP Labs published a post-quantum roadmap for the Superchain in January 2026 committing to deprecate ECDSA-signed EOA transactions within a 10-year window (by January 2036), with EIP-7702 smart wallet delegation as the migration path. Blast inherits this roadmap as a Superchain member. Every other category is unaddressed: Cannon fault proofs rely on EC-signed output roots, the op-node P2P layer uses secp256k1 node identity, and no PQC plans cover proof, networking, on-chain, or bridge components. The Superchain Security Council multisig, bridge withdrawal mechanism, and native yield contracts are all fully EC-dependent.

## Proposed and Implemented PQC Algorithms

Blast does not currently propose or implement any post-quantum cryptographic algorithms. The inherited OP Labs PQ roadmap commits to deprecating ECDSA EOA transactions by January 2036 via EIP-7702 smart wallet migration, but the specific PQC algorithm has not yet been chosen.

## Settlement Layer

**Grade: B 🔧**

Blast settles to Ethereum. Output roots are proposed via the `DisputeGameFactory` and `FaultDisputeGame` contracts on Ethereum L1; withdrawals finalize after a 7-day challenge window. Blast's settlement security is bounded by Ethereum's own security.

Ethereum has active PQC work in progress — consensus-layer validator signatures, blob attestations, and transaction signatures are all subjects of ongoing research — earning an in-development (B) rating. The Superchain Security Council 2-of-2 multisig (Optimism Foundation + Security Council) controls contract upgrades and is entirely EC-based. A sufficiently capable quantum attacker holding either signer's key could unilaterally upgrade or drain Superchain bridge contracts, including Blast's.

## Data Availability

**Grade: C 🗺️**

Blast publishes transaction data to Ethereum as EIP-4844 blobs. Blob commitments use KZG over BLS12-381, which relies on elliptic-curve pairings and is quantum-vulnerable. Ethereum's roadmap includes replacing BLS12-381 with quantum-resistant alternatives, but the replacement algorithm and timeline are not yet defined.

Because Blast uses only Ethereum blobs (no AltDA), it inherits the blob DA rating directly from Ethereum. If Ethereum completes its KZG replacement, Blast picks it up for free.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Blast in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Blast uses the OP Stack Cannon fault proof system. Cannon's internal execution trace is MIPS/RISC-V based and the bisection game itself is hash-based (Keccak), which is quantum-resistant in isolation. However, output roots — the commitments that anchor the entire withdrawal system — are proposed by EC-keyed accounts on Ethereum L1. A cryptographically relevant quantum computer could forge a proposer signature, submit a fraudulent output root, and drain bridge funds after the challenge window expires. There is no published plan from the Blast team or OP Labs to replace EC-signed output roots or add PQC-keyed proposers.

## Transaction Signatures

**Grade: C 🗺️**

Blast is EVM-equivalent. Every user account today is a secp256k1 ECDSA address; there is no PQC transaction type in the OP Stack protocol. However, as a Superchain member, Blast inherits OP Labs' post-quantum roadmap published in January 2026. That roadmap commits to deprecating ECDSA-signed EOA transactions within a 10-year window (by January 2036), using EIP-7702 smart wallet delegation as the migration path. Under this plan, EOAs delegate key management to PQ-aware smart contract accounts, allowing a gradual transition away from raw ECDSA signing at the protocol level.

The specific PQC algorithm has not yet been chosen — OP Labs has noted uncertainty about whether NIST-standardized lattice-based signatures are the best long-term option. No implementation has started. EIP-7702 is available on OP Stack chains from the Isthmus upgrade onward, providing the application-layer mechanism that the roadmap builds on.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Blast in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Blast's sequencer is centralized and operated by the Blast team. The op-node runs a libp2p gossip network to propagate unsafe blocks from the sequencer to other nodes; node identity in this network uses secp256k1 keys. RPC endpoints use classical TLS 1.3 with ECDHE key exchange. No PQC hybrid key exchange, no ML-KEM handshake, and no OP Stack networking PQC work has been published.

The centralized sequencer means P2P gossip is a propagation convenience rather than a consensus requirement, but the EC key material in the gossip network remains quantum-vulnerable for node impersonation and traffic analysis.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Blast in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Blast is EVM-equivalent and ships the standard Ethereum precompile set: `ecrecover` (secp256k1), BN254 elliptic-curve operations, SHA-256, and others. There is no PQC signature verification precompile — no ML-DSA, Falcon, SPHINCS+, or equivalent. Smart contracts on Blast cannot currently verify post-quantum signatures natively. Blast would inherit any PQC precompile additions that Ethereum standardizes in a future fork, but none are currently on Ethereum's near-term EIP roadmap.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Blast in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Blast's primary additional cryptographic surface is its bridge, governance infrastructure, and native yield contracts. L2-to-L1 withdrawals depend on Merkle proofs anchored to EC-signed output roots (see Proof / Verification). The Superchain Security Council 2-of-2 multisig controls upgrade authority over Blast's contracts; both signers use standard EC (secp256k1) Ethereum keys. A Guardian role can pause the bridge in emergencies and is also EC-keyed.

Blast's native yield feature routes L1 LST and T-bill yield back to rebasing ETH and stablecoin balances via Blast bridge contracts on Ethereum L1. These contracts are EC-keyed and represent an additional pool of EC-secured value. The yield feature is application-layer and does not introduce new cryptographic primitives, but it increases the economic stakes of a bridge key compromise. None of these components have PQC retirement plans.

## EC Sunset

**Grade: C 🗺️**

As a Superchain member, Blast inherits OP Labs' post-quantum roadmap published in January 2026. That roadmap establishes a 10-year window to deprecate ECDSA-signed EOA transactions by January 2036, using EIP-7702 smart wallet delegation as the migration path. This covers transaction signatures only.

Adding PQC alongside EC is not the same as retiring EC. For reference, Blast's PQC-adoption ratings per category are: Settlement 🔧, DA 🗺️, Proof ❌, Tx Sigs 🗺️, Networking ❌, On-Chain ❌, Other ❌.

The published sunset plan addresses transaction signatures but does not cover consensus, networking, on-chain precompiles, bridge governance, or proof system components. EC is present across Blast's full stack: output root proposals, bridge governance multisigs, the Guardian role, op-node peer identity, RPC transport, and the native yield bridge contracts. Only EOA transaction signatures have a published removal timeline.

## Governance

Blast operates within the Optimism Collective governance structure as a Superchain member. Protocol upgrades to the OP Stack go through Optimism Improvement Proposals (OIPs) voted on by the Token House (OP holders) and are subject to Security Council veto. Emergency actions require the 2-of-2 Security Council multisig. Blast-specific operational decisions — sequencer operation, output root proposals, and native yield contract management — are made by the Blast team.

The PQ roadmap for the Superchain was published by OP Labs in January 2026. No Blast-specific PQC proposals have been identified in Blast's own communications or in the Optimism Collective governance forum.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
