# Soneium (SONEIUM) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Soneium |
| **Ticker** | SONEIUM |
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
| Settlement Layer | B | 🔧 | In Development |
| Data Availability | C | 🗺️ | Roadmapped |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | C | 🗺️ | Roadmapped |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | C | 🗺️ | Roadmapped |

## Overview

Soneium is an OP Stack optimistic rollup operated by Sony and a member of the Optimism Superchain. As a standard OP Stack deployment with no meaningful protocol-level deviations, Soneium inherits virtually all of its cryptographic properties — and therefore its PQC posture — directly from the OP Stack and, through it, from Ethereum.

Settlement earns a B because Ethereum has active PQC research and implementation underway (pq.ethereum.org). Data Availability earns a C because Ethereum's KZG blob scheme is on a replacement roadmap, though the timeline is undefined. Transaction Signatures earn a C because OP Labs published a post-quantum roadmap for the Superchain (January 2026) committing to deprecate ECDSA-signed EOA transactions within a 10-year window (by January 2036), with EIP-7702 smart wallet delegation as the migration path; Soneium inherits this roadmap as a Superchain member. EC Sunset also earns a C for the same reason — the published ECDSA deprecation commitment covers transaction signatures, though no sunset plan exists for consensus, networking, or on-chain EC primitives.

Every other category is unaddressed: Cannon fault proofs rely on EC-signed output roots, the op-node P2P layer uses secp256k1 node identity, there is no PQC verification precompile, and the Superchain Security Council multisig and bridge governance are fully EC-dependent.

## Proposed and Implemented PQC Algorithms

No specific PQC algorithm has been selected. The OP Labs post-quantum roadmap acknowledges uncertainty about whether NIST-standardized lattice-based signatures are the right long-term choice. The roadmap commits to a migration framework (EIP-7702 smart wallet delegation) rather than a specific algorithm.

| Algorithm | Use Case | Status |
|-----------|----------|--------|
| TBD | Transaction signatures (via smart wallet delegation) | Roadmapped — no algorithm selected; 10-year migration window to Jan 2036 |

## Settlement Layer

**Grade: B 🔧**

Soneium settles to Ethereum. Output roots are proposed on Ethereum L1 via the `DisputeGameFactory` and `FaultDisputeGame` contracts; withdrawals finalize after a 7-day challenge window. Soneium's settlement security is bounded by Ethereum's own security.

Ethereum has active PQC work in progress — consensus-layer validator signatures, blob attestations, and transaction signatures are all subjects of ongoing research and implementation at pq.ethereum.org — earning an in-development (B) rating. The Superchain Security Council 2-of-2 multisig (Optimism Foundation + Security Council) controls contract upgrades and is entirely EC-based. A sufficiently capable quantum attacker holding either signer's key could unilaterally upgrade or drain Superchain bridge contracts, including Soneium's.

## Data Availability

**Grade: C 🗺️**

Soneium publishes transaction data to Ethereum as EIP-4844 blobs. Blob commitments use KZG over BLS12-381, which relies on elliptic-curve pairings and is quantum-vulnerable. Ethereum's roadmap includes replacing BLS12-381 with quantum-resistant alternatives, but the replacement algorithm and timeline are not yet defined.

Because Soneium uses only Ethereum blobs (no AltDA), it inherits the blob DA rating directly from Ethereum. If Ethereum completes its KZG replacement, Soneium picks it up for free.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Soneium in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Soneium uses the OP Stack Cannon fault proof system. Cannon's internal execution trace is MIPS/RISC-V based and the bisection game itself is hash-based (Keccak), which is quantum-resistant in isolation. However, output roots — the commitments that anchor the entire withdrawal system — are proposed by EC-keyed accounts on Ethereum L1. A cryptographically relevant quantum computer could forge a proposer signature, submit a fraudulent output root, and drain bridge funds after the challenge window expires. There is no published plan from Sony, the Soneium team, or OP Labs to replace EC-signed output roots or add PQC-keyed proposers.

## Transaction Signatures

**Grade: C 🗺️**

Soneium is EVM-equivalent. Every user account today is a secp256k1 ECDSA address; there is no PQC transaction type in the OP Stack protocol. However, as a Superchain member, Soneium inherits the OP Labs post-quantum roadmap published in January 2026 ("A Post-Quantum Roadmap for the Superchain"). That roadmap commits to deprecating raw ECDSA-signed EOA transactions within a 10-year window (by January 2036).

The migration path is EIP-7702 smart wallet delegation: EOAs delegate key management to PQ-aware smart contract accounts during the transition window. EIP-7702 is available from the Isthmus upgrade onward. The specific PQC algorithm has not been chosen — OP Labs has stated that it is not yet clear whether NIST-standardized lattice-based signatures are the best long-term choice.

No implementation work has started. The rating reflects a published roadmap with a credible plan but no code in flight.

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

**Grade: C 🗺️**

As a Superchain member, Soneium inherits the OP Labs post-quantum roadmap (January 2026), which includes an explicit commitment to deprecate ECDSA-signed EOA transactions by January 2036. This is one of the first published EC sunset commitments from any L2 stack.

Adding PQC alongside EC is not the same as retiring EC. For reference, Soneium's PQC-adoption ratings per category are: Settlement 🔧, DA 🗺️, Proof ❌, Tx Sigs 🗺️, Networking ❌, On-Chain ❌, Other ❌.

The ECDSA deprecation commitment covers transaction signatures only. No EC sunset plan exists for:

- **Proof / Verification**: EC-signed output roots, EC-keyed proposers and challengers
- **Networking**: secp256k1 op-node peer identity, classical TLS
- **On-Chain Environment**: `ecrecover`, BN254 precompiles (Isthmus adds BLS12-381, expanding the EC surface)
- **Other Features**: Security Council 2-of-2 multisig, Guardian role, bridge governance keys

## Governance

Soneium operates within the Optimism Collective governance structure as a Superchain member. Protocol upgrades to the OP Stack go through Optimism Improvement Proposals (OIPs) voted on by the Token House (OP holders) and are subject to Security Council veto. Emergency actions require the 2-of-2 Security Council multisig. Soneium-specific operational decisions (sequencer operation, output root proposals) are made by Sony.

The OP Labs post-quantum roadmap was published as a blog post in January 2026, establishing the 10-year ECDSA deprecation framework. No formal OIP governance proposal has been submitted for PQC migration yet.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
