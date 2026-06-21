# Base (BASE) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Base |
| **Ticker** | BASE |
| **Website** | https://base.org |
| **GitHub** | https://github.com/base-org |
| **Stack** | OP Stack |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | Fraud proofs (Cannon / MIPS-RISC-V bisection game) |
| **Sequencer model** | Centralized (Coinbase) |
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

Base is an OP Stack optimistic rollup operated by Coinbase and the largest OP Stack deployment by throughput. Base has departed the Optimism Superchain, meaning it does **not** inherit OP Labs' "Post-Quantum Roadmap for the Superchain" (Jan 2026). Bridge governance is Coinbase-controlled rather than managed through the Superchain Security Council. While Base still uses the OP Stack codebase, PQC roadmap commitments that apply to Superchain members do not apply to Base unless Coinbase independently adopts them.

Settlement is provided by Ethereum, whose active PQC migration work (pq.ethereum.org, leanSig, leanVM) earns the Settlement category a B (in-development) rating. Data Availability inherits from Ethereum's blob KZG replacement roadmap at C (roadmapped). Every other category is unaddressed: transaction signatures are ECDSA secp256k1, the Cannon fault proof system relies on EC-signed output roots, the op-node P2P layer uses secp256k1 node identity, and neither Coinbase nor the Base team has published any PQC roadmap. The Coinbase-controlled bridge governance, output-root-based withdrawal mechanism, and all operational keys are fully EC-dependent.

## Proposed and Implemented PQC Algorithms

Base does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: B 🔧**

Base settles to Ethereum. Output roots are proposed on Ethereum L1 via the `DisputeGameFactory` and `FaultDisputeGame` contracts; withdrawals finalize after a 7-day challenge window. Base's settlement security is therefore bounded by Ethereum's own security.

Ethereum has active PQC work in progress — consensus-layer validator signatures, blob attestations, and transaction signatures are all subjects of ongoing research and implementation at pq.ethereum.org — earning an in-development (B) rating. Base inherits this rating through the OP Stack's dependency on Ethereum for final settlement. The settlement-layer contracts themselves (upgrade admin keys, output root proposer keys) are EC-keyed and have no independent PQC retirement plan, but the upstream Ethereum effort provides active forward progress.

Bridge governance for Base is Coinbase-controlled, not managed through the Superchain Security Council. The upgrade authority over Base's bridge contracts is held by Coinbase-operated EC keys.

## Data Availability

**Grade: C 🗺️**

Base publishes transaction data to Ethereum as EIP-4844 blobs. Blob commitments use KZG over BLS12-381, which relies on elliptic-curve pairings and is quantum-vulnerable. Ethereum's roadmap includes replacing BLS12-381 with quantum-resistant alternatives, but the replacement algorithm and timeline are not yet defined.

Because Base uses only Ethereum blobs (no AltDA), it inherits the blob DA rating directly from Ethereum. If Ethereum completes its KZG replacement, Base picks it up for free. If Base were to switch to EigenDA or Celestia for DA, it would take on those chains' independent EC dependencies, currently rated F.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Base in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Base uses the OP Stack Cannon fault proof system. Cannon's internal execution trace is MIPS/RISC-V based and the bisection game itself is hash-based (Keccak), which is quantum-resistant in isolation. However, output roots — the commitments that anchor the entire withdrawal system — are proposed by EC-keyed accounts on Ethereum L1. A cryptographically relevant quantum computer could forge a proposer signature, submit a fraudulent output root, and drain bridge funds after the challenge window expires. There is no published plan from Coinbase or OP Labs to replace EC-signed output roots or add PQC-keyed proposers.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Base in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Base is EVM-equivalent. Every user account is a secp256k1 ECDSA address; there is no PQC transaction type in the OP Stack protocol. OP Labs published a 10-year ECDSA deprecation roadmap for the Superchain in January 2026, but Base has departed the Superchain and does not inherit this commitment. No PQC transaction signature roadmap has been published by Coinbase or the Base team independently. EIP-7702 (available from the Isthmus upgrade onward) allows delegation to smart contract wallets, which could in principle implement PQC signature verification at the application layer, but application-layer workarounds do not change the protocol-level exposure.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Base in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Base's sequencer is centralized and operated by Coinbase. The op-node runs a libp2p gossip network to propagate unsafe blocks from the sequencer to other nodes; node identity in this network uses secp256k1 keys. RPC endpoints use classical TLS 1.3 with ECDHE key exchange. No PQC hybrid key exchange, no ML-KEM handshake, and no networking PQC work has been published by Coinbase or the Base team.

The centralized sequencer means P2P gossip is a propagation convenience rather than a consensus requirement, but the EC key material in the gossip network remains quantum-vulnerable for node impersonation and traffic analysis.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Base in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Base is EVM-equivalent and ships the standard Ethereum precompile set: `ecrecover` (secp256k1), BN254 elliptic-curve operations, SHA-256, and others. There is no PQC signature verification precompile — no ML-DSA, Falcon, SPHINCS+, or equivalent. Smart contracts on Base cannot currently verify post-quantum signatures natively. Base would inherit any PQC precompile additions that Ethereum standardizes in a future fork, but none are currently on Ethereum's near-term EIP roadmap.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Base in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Base's primary additional cryptographic surface is its bridge and governance infrastructure. L2-to-L1 withdrawals depend on Merkle proofs anchored to EC-signed output roots (see Proof / Verification). Bridge governance is Coinbase-controlled — unlike Superchain member chains, Base's bridge is not managed through the Superchain Security Council. All bridge governance keys are standard EC (secp256k1) Ethereum keys. A Guardian role can pause the bridge in emergencies and is also EC-keyed. None of these have PQC retirement plans.

## EC Sunset

**Grade: F ❌**

No PQC discussions have been found from Coinbase or the Base team regarding retirement of EC-based cryptography from any Base component.

Adding PQC alongside EC is not the same as retiring EC. For reference, Base's PQC-adoption ratings per category are: Settlement 🔧, DA 🗺️, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

OP Labs published a 10-year ECDSA deprecation roadmap for the Superchain in January 2026, but Base has departed the Superchain and does not inherit this commitment. There is no independent EC sunset plan from Coinbase or the Base team. EC is present in every layer of Base: transaction signatures, output root proposals, bridge governance keys, the Guardian role, op-node peer identity, and RPC transport. The Isthmus upgrade adds BLS12-381 precompiles to the EVM, increasing rather than decreasing the EC surface. No component has a published plan for EC removal.

## Governance

Base operates outside the Optimism Superchain governance structure. While Base still uses the OP Stack codebase, its bridge governance and operational decisions are controlled by Coinbase. Base-specific operational decisions — sequencer operation, output root proposals, bridge upgrades — are made by Coinbase independently. Protocol upgrades to the OP Stack codebase that Base adopts are at Coinbase's discretion.

No PQC-related proposals have been identified in Base's governance communications. The OP Labs "Post-Quantum Roadmap for the Superchain" (Jan 2026) does not apply to Base following its departure from the Superchain.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
