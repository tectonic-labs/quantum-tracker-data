# OP Mainnet (OP) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | OP Mainnet |
| **Ticker** | OP |
| **Website** | https://www.optimism.io |
| **GitHub** | https://github.com/ethereum-optimism |
| **Stack** | OP Stack |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | Fraud proofs (Cannon / MIPS-RISC-V bisection game) |
| **Sequencer model** | Centralized (OP Labs) |
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

OP Mainnet is the canonical OP Stack deployment, operated by OP Labs and the reference implementation for the Optimism Superchain. As the reference chain, OP Mainnet's architecture is identical to the OP Stack itself — there are no OP-Mainnet-specific deviations in proof system, transaction format, networking, or on-chain environment. Its PQC posture is therefore the OP Stack's PQC posture.

Settlement is provided by Ethereum, and OP Mainnet's most favorable ratings come from Ethereum's active PQC migration effort. Ethereum's consensus-layer and blob-attestation work — catalogued at pq.ethereum.org — earns the settlement category a B and data availability a C. Transaction signatures and EC Sunset both earn a C, based on OP Labs' published "A Post-Quantum Roadmap for the Superchain" (January 2026), which commits to deprecating ECDSA-signed EOA transactions within a 10-year window (by January 2036) via EIP-7702 smart wallet migration. The specific PQC algorithm has not yet been chosen, and implementation has not started.

Every other category is unaddressed: the Cannon fault proof system relies on EC-signed output roots proposed by EC-keyed accounts, the op-node P2P layer uses secp256k1 node identity, and no PQC verification primitive exists on-chain. The Superchain Security Council 2-of-2 multisig, Guardian role, and all bridge governance keys are fully EC-dependent.

## Proposed and Implemented PQC Algorithms

No specific PQC algorithm has been selected. OP Labs' January 2026 PQ roadmap acknowledges that "we don't yet know whether the NIST-standardized lattice-based signatures are the best long-term choice." The migration strategy relies on EIP-7702 smart wallet delegation, deferring algorithm selection to a future phase.

## Settlement Layer

**Grade: B 🔧**

OP Mainnet settles to Ethereum. Output roots are proposed on Ethereum L1 via the `DisputeGameFactory` and `FaultDisputeGame` contracts; withdrawals finalize after a 7-day challenge window. OP Mainnet's settlement security is therefore bounded by Ethereum's own security.

Ethereum has active PQC work in progress — consensus-layer validator signatures, blob attestations, and transaction signatures are all subjects of ongoing research at pq.ethereum.org — earning an in-development (B) rating. The settlement-layer contracts themselves (upgrade admin keys, output root proposer keys) are EC-keyed and have no independent PQC retirement plan, but the upstream Ethereum effort provides active forward progress.

The Superchain Security Council 2-of-2 multisig (Optimism Foundation + Security Council) controls contract upgrades and is entirely EC-based. A sufficiently capable quantum attacker holding either signer's key could unilaterally upgrade or drain Superchain bridge contracts, including OP Mainnet's.

## Data Availability

**Grade: C 🗺️**

OP Mainnet publishes transaction data to Ethereum as EIP-4844 blobs. Blob commitments use KZG over BLS12-381, which relies on elliptic-curve pairings and is quantum-vulnerable. Ethereum's roadmap includes replacing BLS12-381 with quantum-resistant alternatives, but the replacement algorithm and timeline are not yet defined.

Because OP Mainnet uses only Ethereum blobs with no alternative DA layer, it inherits the blob DA rating directly from Ethereum. If Ethereum completes its KZG replacement, OP Mainnet picks it up for free.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for OP Mainnet in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

OP Mainnet uses the OP Stack Cannon fault proof system. Cannon's internal execution trace is MIPS/RISC-V based and the bisection game is hash-based (Keccak), which is quantum-resistant in isolation. However, output roots — the commitments that anchor the entire withdrawal system — are proposed by EC-keyed accounts on Ethereum L1. A cryptographically relevant quantum computer could forge a proposer signature, submit a fraudulent output root, and drain bridge funds after the challenge window expires. There is no published plan from OP Labs to replace EC-signed output roots or add PQC-keyed proposers.

## Transaction Signatures

**Grade: C 🗺️**

OP Mainnet is EVM-equivalent. Every user account today is a secp256k1 ECDSA address. However, OP Labs published "A Post-Quantum Roadmap for the Superchain" in January 2026, committing to a 10-year ECDSA deprecation window. Under this roadmap, raw ECDSA-signed EOA transactions are expected to be deprecated by January 2036.

The migration strategy centers on EIP-7702, available since the Isthmus upgrade. EIP-7702 allows EOAs to delegate transaction validation to smart contract wallets, which could implement PQC signature verification. OP Labs envisions a phased approach: smart wallet migration first, protocol-level enforcement second, and pluggable post-quantum signature schemes third. The specific PQC algorithm has not been selected — OP Labs has publicly stated uncertainty about whether NIST lattice-based signatures are the right long-term choice.

Implementation has not started. Rated C (roadmap published with credible plan and timeline, but no code in flight).

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for OP Mainnet in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

OP Mainnet's sequencer is centralized and operated by OP Labs. The op-node runs a libp2p gossip network to propagate unsafe blocks from the sequencer to other nodes; node identity in this network uses secp256k1 keys. RPC endpoints use classical TLS 1.3 with ECDHE key exchange. No PQC hybrid key exchange, no ML-KEM handshake, and no OP Stack networking PQC work has been published.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for OP Mainnet in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

OP Mainnet is EVM-equivalent and ships the standard Ethereum precompile set: `ecrecover` (secp256k1), BN254 elliptic-curve operations, SHA-256, and others. There is no PQC signature verification precompile — no ML-DSA, Falcon, SPHINCS+, or equivalent. Smart contracts on OP Mainnet cannot currently verify post-quantum signatures natively. OP Mainnet would inherit any PQC precompile additions that Ethereum standardizes in a future fork, but none are currently on Ethereum's near-term EIP roadmap.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for OP Mainnet in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

OP Mainnet's primary additional cryptographic surface is its bridge and governance infrastructure. L2-to-L1 withdrawals depend on Merkle proofs anchored to EC-signed output roots (see Proof / Verification). The Superchain Security Council 2-of-2 multisig controls upgrade authority over OP Mainnet's contracts; both signers use standard EC (secp256k1) Ethereum keys. A Guardian role can pause the bridge in emergencies and is also EC-keyed. None of these have PQC retirement plans.

The planned Superchain shared sequencing feature will introduce a sequencer consensus layer with its own key material. No PQC requirements have been specified for that component.

## EC Sunset

**Grade: C 🗺️**

OP Labs published "A Post-Quantum Roadmap for the Superchain" in January 2026, making the OP Stack the first major L2 stack with a published EC deprecation commitment. The roadmap commits to deprecating ECDSA-signed EOA transactions by January 2036 via EIP-7702 smart wallet delegation. This is a concrete, time-bound plan — albeit one that covers transaction signatures only.

Adding PQC alongside EC is not the same as retiring EC. For reference, OP Mainnet's PQC-adoption ratings per category are: Settlement B 🔧, DA C 🗺️, Proof F ❌, Tx Sigs C 🗺️, Networking F ❌, On-Chain F ❌, Other F ❌.

The roadmap's scope is limited to transaction signature EC retirement. EC remains in every other layer of OP Mainnet with no published retirement plan: output root proposer keys (Proof), op-node peer identity and RPC transport (Networking), EVM EC precompiles including ecrecover, BN254, and BLS12-381 (On-Chain), the Security Council 2-of-2 multisig, the Guardian role, and bridge governance keys (Other). The Isthmus upgrade adds BLS12-381 precompiles to the EVM, increasing the EC on-chain surface.

## Governance

The Optimism Collective governs OP Mainnet through two chambers: the Token House (OP token holders vote on protocol upgrades and treasury) and the Citizens' House (non-transferable Citizen badges vote on public goods funding). Protocol changes require Token House approval and are subject to Security Council veto. Technical specifications flow through the OP Stack specs repository via pull requests.

The 2-of-2 multisig (Optimism Foundation + Security Council) retains emergency upgrade authority. Standard upgrades require Token House vote. During the current "Stage 1" rollup maturity phase, the Optimism Foundation retains significant operational control.

The January 2026 PQ roadmap was published as a blog post by OP Labs, not as a formal governance proposal. No Optimism Improvement Proposals (OIPs) addressing PQC migration have been identified.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
