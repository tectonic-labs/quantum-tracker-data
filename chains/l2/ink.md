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
| Transaction Signatures | C | 🗺️ | Roadmapped |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | C | 🗺️ | Roadmapped |

## Overview

Ink is a standard OP Stack optimistic rollup operated by Kraken and a member of the Optimism Superchain. It introduces no deviations from the OP Stack base in proof system, transaction format, networking, or on-chain environment -- its PQC posture is therefore the OP Stack's PQC posture with Kraken as the sequencer operator.

The most favorable ratings come from Ethereum's active PQC migration effort and from OP Labs' published post-quantum roadmap. Settlement earns a B because Ethereum has active PQC research underway (pq.ethereum.org), and Data Availability earns a C because Ethereum's KZG blob scheme is on a replacement roadmap. Transaction Signatures earn a C because OP Labs published "A Post-Quantum Roadmap for the Superchain" (January 2026) committing to deprecate ECDSA-signed EOA transactions within a 10-year window (by January 2036) via EIP-7702 smart wallet migration, though no implementation has started and the PQC algorithm is not yet chosen. EC Sunset earns a C for the same reason -- the roadmap explicitly calls for ECDSA EOA deprecation, though it covers transaction signatures only and does not address EC removal in consensus, networking, or on-chain precompiles. Every other category is unaddressed: the Cannon fault proof system relies on EC-signed output roots, the op-node P2P layer uses secp256k1 node identity, and bridge governance operates under the Superchain Security Council 2-of-2 multisig, which is fully EC-dependent.

## Proposed and Implemented PQC Algorithms

Ink does not currently propose or implement any post-quantum cryptographic algorithms. The OP Labs PQ roadmap commits to adding a post-quantum signature scheme for transaction signing but the specific algorithm has not been chosen. OP Labs has stated: "We don't yet know whether the NIST-standardized lattice-based signatures are the best long-term choice."

## Settlement Layer

**Grade: B 🔧**

Ink settles to Ethereum. Output roots are proposed on Ethereum L1 via the `DisputeGameFactory` and `FaultDisputeGame` contracts; withdrawals finalize after a 7-day challenge window. Ink's settlement security is therefore bounded by Ethereum's own security.

Ethereum has active PQC work in progress -- consensus-layer validator signatures, blob attestations, and transaction signatures are all subjects of ongoing research -- earning an in-development (B) rating. The Superchain Security Council 2-of-2 multisig (Optimism Foundation + Security Council) controls contract upgrades and is entirely EC-based. A quantum attacker holding either signer's key could unilaterally upgrade or drain Superchain bridge contracts, including Ink's.

## Data Availability

**Grade: C 🗺️**

Ink publishes transaction data to Ethereum as EIP-4844 blobs. Blob commitments use KZG over BLS12-381, which relies on elliptic-curve pairings and is quantum-vulnerable. Ethereum's roadmap includes replacing BLS12-381 with quantum-resistant alternatives, but the replacement algorithm and timeline are not yet defined.

Because Ink uses only Ethereum blobs with no alternative DA layer, it inherits the blob DA rating directly from Ethereum. If Ethereum completes its KZG replacement, Ink picks it up for free.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Ink in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it -- see the contact link in the footer.

Ink uses the OP Stack Cannon fault proof system. Cannon's internal bisection game is hash-based (Keccak), which is quantum-resistant in isolation. However, output roots are proposed by EC-keyed accounts on Ethereum L1. A cryptographically relevant quantum computer could forge a proposer signature, submit a fraudulent output root, and drain bridge funds after the challenge window expires. There is no published plan from Kraken or OP Labs to replace EC-signed output roots or add PQC-keyed proposers.

## Transaction Signatures

**Grade: C 🗺️**

Ink is EVM-equivalent. Every user account today is a secp256k1 ECDSA address; there is no PQC transaction type in the OP Stack protocol.

As a Superchain member, Ink inherits the OP Labs post-quantum roadmap published in January 2026. That roadmap commits to deprecating raw ECDSA-signed EOA transactions within a 10-year window (by January 2036). The migration path is EIP-7702 smart wallet delegation: EOAs delegate key management to PQ-aware smart contract accounts. EIP-7702 is available from the Isthmus upgrade onward, providing the mechanism for the transition. The specific PQC algorithm has not been chosen -- OP Labs has acknowledged uncertainty about whether NIST lattice-based signatures are the best long-term choice.

No implementation has started. The rating reflects a published roadmap with a credible plan but no code in flight.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Ink in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it -- see the contact link in the footer.

Ink's sequencer is centralized and operated by Kraken. The op-node runs a libp2p gossip network to propagate unsafe blocks from the sequencer to other nodes; node identity in this network uses secp256k1 keys. RPC endpoints use classical TLS 1.3 with ECDHE key exchange. No PQC hybrid key exchange, no ML-KEM handshake, and no OP Stack networking PQC work has been published.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Ink in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it -- see the contact link in the footer.

Ink is EVM-equivalent and ships the standard Ethereum precompile set: `ecrecover` (secp256k1), BN254 elliptic-curve operations, SHA-256, and others. There is no PQC signature verification precompile -- no ML-DSA, Falcon, SPHINCS+, or equivalent. Smart contracts on Ink cannot currently verify post-quantum signatures natively. Ink would inherit any PQC precompile additions that Ethereum standardizes in a future fork, but none are currently on Ethereum's near-term EIP roadmap.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Ink in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it -- see the contact link in the footer.

Ink's primary additional cryptographic surface is its bridge and governance infrastructure, shared with the Superchain. L2-to-L1 withdrawals depend on Merkle proofs anchored to EC-signed output roots (see Proof / Verification). The Superchain Security Council 2-of-2 multisig controls upgrade authority over Ink's contracts; both signers use standard EC (secp256k1) Ethereum keys. A Guardian role can pause the bridge in emergencies and is also EC-keyed. None of these have PQC retirement plans.

## EC Sunset

**Grade: C 🗺️**

As a Superchain member, Ink inherits the OP Labs post-quantum roadmap (January 2026) which explicitly commits to deprecating ECDSA EOA transactions by January 2036. This is a published EC retirement plan with a concrete timeline, earning a 🗺️ rating.

Adding PQC alongside EC is not the same as retiring EC. For reference, Ink's PQC-adoption ratings per category are: Settlement 🔧, DA 🗺️, Proof ❌, Tx Sigs 🗺️, Networking ❌, On-Chain ❌, Other ❌.

The ECDSA deprecation roadmap covers transaction signatures only. There is no published plan to retire EC from:

- **Proof / Verification**: EC-signed output roots and EC-keyed proposers/challengers
- **Networking**: secp256k1 op-node peer identity and classical TLS
- **On-Chain**: `ecrecover` and BN254 precompiles
- **Other**: Security Council multisig, Guardian role, and bridge governance keys

The Isthmus upgrade adds BLS12-381 precompiles to the EVM, increasing rather than decreasing the EC surface in the on-chain environment.

## Governance

Ink operates within the Optimism Collective governance structure as a Superchain member. Protocol upgrades to the OP Stack go through Optimism Improvement Proposals (OIPs) voted on by the Token House (OP holders) and are subject to Security Council veto. Emergency actions require the 2-of-2 Security Council multisig. Ink-specific operational decisions -- sequencer operation and output root proposals -- are made by Kraken.

The PQ-relevant governance action for Ink is the OP Labs post-quantum roadmap (January 2026), which commits to a 10-year ECDSA EOA deprecation window. This roadmap applies to all Superchain members, including Ink. No Ink-specific or Kraken-specific PQC proposals have been identified.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
