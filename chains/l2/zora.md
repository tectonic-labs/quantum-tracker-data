# Zora (ZORA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Zora |
| **Ticker** | ZORA |
| **Website** | https://zora.co |
| **GitHub** | https://github.com/ourzora |
| **Stack** | OP Stack |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | Fraud proofs (Cannon / MIPS-RISC-V bisection game) |
| **Sequencer model** | Centralized (Zora team) |
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

Zora is an NFT-focused L2 built on the OP Stack and a member of the Optimism Superchain. As a standard OP Stack deployment with no cryptographic customizations, Zora inherits all of its cryptographic properties — and therefore its PQC posture — directly from the OP Stack.

Settlement is provided by Ethereum, and Zora's PQC outlook in that category rises and falls with Ethereum's own migration progress. Ethereum has active PQC work underway, which earns the Settlement category a B (in-development). Data availability uses Ethereum blobs with KZG commitments over BLS12-381 (quantum-vulnerable); Ethereum's roadmap includes replacing BLS12-381 with quantum-resistant alternatives, landing DA at C (roadmapped).

As a Superchain member, Zora inherits OP Labs' published post-quantum roadmap (January 2026), which commits to deprecating ECDSA-signed EOA transactions within a 10-year window (by January 2036) via EIP-7702 smart wallet migration. This earns Transaction Signatures and EC Sunset each a C (roadmapped). However, the roadmap covers transaction signatures only — no EC sunset plan exists for consensus, networking, on-chain precompiles, or bridge governance. Every other category remains unaddressed: the Cannon fault proof system relies on EC-signed output roots, the op-node P2P layer uses secp256k1 node identity, and the Superchain Security Council multisig and bridge withdrawal mechanism are fully EC-dependent.

## Proposed and Implemented PQC Algorithms

| Algorithm | Category | Status | Notes |
|-----------|----------|--------|-------|
| TBD (NIST PQC candidate) | Transaction Signatures | Roadmapped | OP Labs' PQ roadmap acknowledges uncertainty about which algorithm to adopt; EIP-7702 smart wallet migration is the planned delivery mechanism |

OP Labs has published a commitment to deprecate ECDSA EOA transactions by January 2036 but has not yet selected a specific post-quantum algorithm. As stated in the roadmap: "We don't yet know whether the NIST-standardized lattice-based signatures are the best long-term choice."

## Settlement Layer

**Grade: B 🔧**

Zora settles to Ethereum. Output roots are proposed on Ethereum L1 via the `DisputeGameFactory` and `FaultDisputeGame` contracts; withdrawals finalize after a 7-day challenge window. Zora's settlement security is therefore bounded by Ethereum's own security.

Ethereum has active PQC work in progress — consensus-layer validator signatures, blob attestations, and transaction signatures are all subjects of ongoing research and implementation. That activity earns Ethereum a B (in-development) rating, and Zora inherits this directly. The settlement-layer contracts themselves (upgrade admin keys, output root proposer keys) are EC-keyed and have no independent PQC retirement plan, but the upstream Ethereum effort provides active development momentum.

The Superchain Security Council 2-of-2 multisig (Optimism Foundation + Security Council) controls contract upgrades and is entirely EC-based. A sufficiently capable quantum attacker holding either signer's key could unilaterally upgrade or drain Superchain bridge contracts, including Zora's.

## Data Availability

**Grade: C 🗺️**

Zora publishes transaction data to Ethereum as EIP-4844 blobs. Blob commitments use KZG over BLS12-381, which relies on elliptic-curve pairings and is quantum-vulnerable. Ethereum's roadmap includes replacing BLS12-381 with quantum-resistant alternatives, but the replacement algorithm and timeline are not yet defined.

Because Zora uses only Ethereum blobs (no AltDA), it inherits the blob DA rating directly from Ethereum. If Ethereum completes its KZG replacement, Zora picks it up for free.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Zora in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Zora uses the OP Stack Cannon fault proof system. Cannon's internal execution trace is MIPS/RISC-V based and the bisection game itself is hash-based (Keccak), which is quantum-resistant in isolation. However, output roots — the commitments that anchor the entire withdrawal system — are proposed by EC-keyed accounts on Ethereum L1. A cryptographically relevant quantum computer could forge a proposer signature, submit a fraudulent output root, and drain bridge funds after the challenge window expires. There is no published plan from the Zora team or OP Labs to replace EC-signed output roots or add PQC-keyed proposers.

## Transaction Signatures

**Grade: C 🗺️**

Zora is EVM-equivalent. Every user account today is a secp256k1 ECDSA address; there is no PQC transaction type in the OP Stack protocol. However, as a Superchain member, Zora inherits OP Labs' published post-quantum roadmap (January 14, 2026), which commits to deprecating ECDSA-signed EOA transactions within a 10-year window (by January 2036).

The migration path is EIP-7702 smart wallet delegation: EOAs delegate key management to PQ-aware smart contract accounts during the transition window. After the window closes, raw ECDSA EOA transactions are expected to be deprecated across Superchain chains. The specific PQC algorithm has not yet been chosen — OP Labs has acknowledged uncertainty about whether NIST-standardized lattice-based signatures are the best long-term option.

EIP-7702 is available on OP Stack chains since the Isthmus upgrade, providing the infrastructure for the migration. However, no implementation of PQC-aware smart wallet contracts has started, and no concrete timeline for intermediate milestones has been published beyond the 2036 endpoint.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Zora in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Zora's sequencer is centralized and operated by the Zora team. The op-node runs a libp2p gossip network to propagate unsafe blocks from the sequencer to other nodes; node identity in this network uses secp256k1 keys. RPC endpoints use classical TLS 1.3 with ECDHE key exchange. No PQC hybrid key exchange, no ML-KEM handshake, and no OP Stack networking PQC work has been published.

The centralized sequencer means P2P gossip is a propagation convenience rather than a consensus requirement, but the EC key material in the gossip network remains quantum-vulnerable for node impersonation and traffic analysis.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Zora in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Zora is EVM-equivalent and ships the standard Ethereum precompile set: `ecrecover` (secp256k1), BN254 elliptic-curve operations, SHA-256, and others. There is no PQC signature verification precompile — no ML-DSA, Falcon, SPHINCS+, or equivalent. Smart contracts on Zora cannot currently verify post-quantum signatures natively. Zora would inherit any PQC precompile additions that Ethereum standardizes in a future fork, but none are currently on Ethereum's near-term EIP roadmap.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Zora in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Zora's primary additional cryptographic surface is its bridge and governance infrastructure. L2-to-L1 withdrawals depend on Merkle proofs anchored to EC-signed output roots (see Proof / Verification). The Superchain Security Council 2-of-2 multisig controls upgrade authority over Zora's contracts; both signers use standard EC (secp256k1) Ethereum keys. A Guardian role can pause the bridge in emergencies and is also EC-keyed. None of these have PQC retirement plans.

The planned Superchain shared sequencing feature, when it arrives, will introduce a sequencer consensus layer with its own key material. No PQC requirements have been specified for that component.

## EC Sunset

**Grade: C 🗺️**

OP Labs published "A Post-Quantum Roadmap for the Superchain" (January 14, 2026) with an explicit 10-year ECDSA deprecation window. As a Superchain member, Zora inherits this commitment: ECDSA-signed EOA transactions are expected to be deprecated by January 2036, with EIP-7702 smart wallet delegation as the migration path.

Adding PQC alongside EC is not the same as retiring EC. For reference, Zora's PQC-adoption ratings per category are: Settlement 🔧, DA 🗺️, Proof ❌, Tx Sigs 🗺️, Networking ❌, On-Chain ❌, Other ❌.

The published EC sunset plan covers transaction signatures only. No EC sunset plan exists for:
- **Proof / Verification**: EC-signed output roots and EC-keyed proposers/challengers
- **Networking**: secp256k1 node identity in op-node P2P and classical TLS for RPC
- **On-Chain Environment**: `ecrecover` and BN254 precompiles (the Isthmus upgrade adds BLS12-381 precompiles, increasing the EC surface)
- **Other Features**: Security Council 2-of-2 multisig, Guardian role, and bridge governance keys

## Governance

Zora operates within the Optimism Collective governance structure. Protocol upgrades to the OP Stack — including any that would affect Zora — go through Optimism Improvement Proposals (OIPs) voted on by the Token House (OP holders) and are subject to Security Council veto. Emergency or unilateral actions require the 2-of-2 Security Council multisig. Zora-specific operational decisions (sequencer operation, output root proposals) are made by the Zora team.

The key PQC-relevant governance action to date is the OP Labs post-quantum roadmap published January 14, 2026, committing to a 10-year ECDSA deprecation window for transaction signatures across the Superchain. No formal OIP has been filed to implement this roadmap, and no PQC-specific proposals have been identified in the Optimism Collective governance forum or in Zora's own governance communications.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
