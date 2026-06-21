# Derive (DRV) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Derive |
| **Ticker** | DRV |
| **Website** | https://www.derive.xyz |
| **Formerly known as** | Lyra |
| **Stack** | OP Stack |
| **Settlement layer** | Ethereum |
| **Data availability** | Celestia |
| **Proof type** | Fraud proofs (Cannon / MIPS-RISC-V bisection game) |
| **Sequencer model** | Centralized (Derive team) |
| **Superchain member** | Yes |
| **On-chain environment** | EVM (EVM-equivalent) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | B | 🔧 | In Development |
| Data Availability | F | ❌ | Not Discussed |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Overview

Derive (formerly Lyra) is an OP Stack optimistic rollup and member of the Optimism Superchain, focused on options and perpetuals DeFi. As a standard OP Stack deployment, Derive inherits the vast majority of its cryptographic properties — and therefore its PQC posture — directly from the OP Stack. Its proof system, transaction format, networking, and on-chain environment are identical to other OP Stack chains like Base and OP Mainnet.

Settlement is provided by Ethereum. Ethereum has active PQC research underway (the pq.ethereum.org effort, leanSig, leanVM), and Derive inherits that in-development posture for its settlement layer. Every other category is unaddressed.

**Key deviation from the OP Stack baseline: Derive uses Celestia for data availability instead of Ethereum blobs.** Most OP Stack chains post transaction data to Ethereum as EIP-4844 blobs and inherit Ethereum's DA rating. Derive instead publishes data to Celestia, whose CometBFT consensus uses Ed25519 validator signatures — a quantum-vulnerable elliptic curve scheme with no PQC migration roadmap. Furthermore, Derive does not use Celestia's Blobstream bridge for on-chain DA verification; sequencer transaction roots are not checked against Blobstream data roots on L1. This means Derive's DA is rated ❌ rather than the 🗺️ that standard blob-based OP Stack chains receive. If Celestia becomes unavailable, the sequencer can fall back to Ethereum, but funds may be at risk if the sequencer posts an unavailable transaction root before fallback occurs.

Bridge governance also deviates: Derive uses a 4/13 multisig (rather than the Superchain Security Council 2-of-2 pattern used by Base and OP Mainnet), which can update the preconfer address, batch submitter address, and gas configuration.

## Proposed and Implemented PQC Algorithms

Derive does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: B 🔧**

Derive settles to Ethereum. Output roots are proposed on Ethereum L1 via the `DisputeGameFactory` and `FaultDisputeGame` contracts; withdrawals finalize after a 7-day challenge window. Derive's settlement security is therefore bounded by Ethereum's own security.

Ethereum has active PQC work in progress — consensus-layer validator signatures, blob attestations, and transaction signatures are all subjects of ongoing research and development. That activity earns Ethereum an in-development rating in affected categories, and Derive inherits this. The settlement-layer contracts themselves (upgrade admin keys, output root proposer keys) are EC-keyed and have no independent PQC retirement plan, but the upstream Ethereum effort provides a credible trajectory.

## Data Availability

**Grade: F ❌**

This is the most significant deviation from the OP Stack baseline. While most OP Stack chains publish transaction data to Ethereum as EIP-4844 blobs and inherit Ethereum's DA posture, Derive uses Celestia for data availability.

Celestia's CometBFT consensus relies on Ed25519 validator signatures, which are quantum-vulnerable elliptic curve cryptography. Celestia has no published PQC migration roadmap for its consensus signatures. This drops Derive's DA rating from the 🗺️ that standard blob-based OP Stack chains receive to ❌.

Additionally, the Blobstream bridge is not used for on-chain DA verification — sequencer transaction roots are not checked against Blobstream data roots on Ethereum L1. L2 nodes can verify data availability by running a Celestia light client, but there is no on-chain enforcement of DA commitments. If Celestia becomes unavailable, the sequencer falls back to Ethereum, but funds can be lost if the sequencer posts an unavailable transaction root before fallback.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Derive in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Derive uses the OP Stack Cannon fault proof system. Cannon's internal execution trace is MIPS/RISC-V based and the bisection game itself is hash-based (Keccak), which is quantum-resistant in isolation. However, output roots — the commitments that anchor the entire withdrawal system — are proposed by EC-keyed accounts on Ethereum L1. A cryptographically relevant quantum computer could forge a sequencer or proposer signature, submit a fraudulent output root, and drain bridge funds after the challenge window expires. There is no published plan from the Derive team or OP Labs to replace EC-signed output roots or add PQC-keyed proposers.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Derive in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Derive is EVM-equivalent. Every user account is a secp256k1 ECDSA address; there is no PQC transaction type in the OP Stack protocol. EIP-7702 (available from the Isthmus upgrade onward) allows delegation to smart contract wallets, which could in principle implement PQC signature verification at the application layer, but no Derive-specific PQC wallet migration plan has been published, and application-layer workarounds do not change the protocol-level exposure.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Derive in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Derive's sequencer is centralized and operated by the Derive team. The op-node runs a libp2p gossip network to propagate unsafe blocks from the sequencer to other nodes; node identity in this network uses secp256k1 keys. RPC endpoints use classical TLS 1.3 with ECDHE key exchange. No PQC hybrid key exchange, no ML-KEM handshake, and no OP Stack networking PQC work has been published.

The centralized sequencer means P2P gossip is a propagation convenience rather than a consensus requirement, but the EC key material in the gossip network remains quantum-vulnerable for node impersonation and traffic analysis.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Derive in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Derive is EVM-equivalent and ships the standard Ethereum precompile set: `ecrecover` (secp256k1), BN254 elliptic-curve operations, SHA-256, and others. There is no PQC signature verification precompile — no ML-DSA, Falcon, SPHINCS+, or equivalent. Smart contracts on Derive cannot currently verify post-quantum signatures natively. Derive would inherit any PQC precompile additions that Ethereum standardizes in a future fork, but none are currently on Ethereum's near-term EIP roadmap.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Derive in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Derive's primary additional cryptographic surface is its bridge and governance infrastructure. L2-to-L1 withdrawals depend on Merkle proofs anchored to EC-signed output roots (see Proof / Verification). Bridge governance is controlled by a 4/13 multisig that can update the preconfer, batch submitter, and gas configuration — all signers use standard EC (secp256k1) Ethereum keys. None of these have PQC retirement plans.

The planned Superchain shared sequencing feature, when it arrives, will introduce a sequencer consensus layer with its own key material. No PQC requirements have been specified for that component.

## EC Sunset

**Grade: F ❌**

No PQC discussions have been found from the Derive team regarding retirement of EC-based cryptography from any Derive component.

Adding PQC alongside EC is not the same as retiring EC. For reference, Derive's PQC-adoption ratings per category are: Settlement 🔧, DA ❌, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

EC is present in every layer of Derive: transaction signatures, output root proposals, bridge governance multisig, op-node peer identity, and RPC transport. The Celestia DA layer adds Ed25519 as an additional EC dependency beyond what standard OP Stack chains carry. The Isthmus upgrade adds BLS12-381 precompiles to the EVM, increasing rather than decreasing the EC surface. No component has a published plan for EC removal.

## Governance

Derive operates within the Optimism Collective governance structure. Protocol upgrades to the OP Stack — including any that would affect Derive — go through Optimism Improvement Proposals (OIPs) voted on by the Token House (OP holders) and are subject to Security Council veto. Emergency or unilateral actions require the 2-of-2 Security Council multisig. Derive-specific operational decisions (sequencer operation, DA configuration, output root proposals) are made by the Derive team. Bridge governance is controlled by a 4/13 multisig separate from the Superchain Security Council.

No PQC-related proposals have been identified in the Optimism Collective governance forum or in Derive's own governance communications.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
