# Mantle (MNT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Mantle |
| **Ticker** | MNT |
| **Website** | https://www.mantle.xyz |
| **GitHub** | https://github.com/mantlenetworkio |
| **Stack** | OP Stack (modified fork) |
| **Settlement layer** | Ethereum |
| **DA** | MantleDA (EigenDA-based) |
| **Proof type** | Fraud proofs (Cannon / MIPS bisection game) |
| **Sequencer model** | Centralized (Mantle team) |
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

Mantle is an optimistic rollup built on a modified fork of the OP Stack. It differs from standard Superchain deployments in two significant ways: it uses MantleDA — a customized deployment of EigenDA — rather than Ethereum blobs for data availability, and it is not a Superchain member, meaning its bridge governance is controlled independently by Mantle's own organization (formerly BitDAO) rather than the Optimism Security Council.

These architectural choices have a direct and unfavorable impact on Mantle's PQC posture. Standard OP Stack deployments that use Ethereum blobs inherit a C (Roadmapped) rating for DA because Ethereum's KZG replacement is on its research roadmap. Mantle's MantleDA layer uses EigenDA, which relies on BLS signatures over the BN254 elliptic curve for operator attestations — an independently quantum-vulnerable system with no published PQC roadmap. As a result, Mantle's DA rating falls to F rather than the C a standard Superchain deployment would receive.

Settlement is the one category where Mantle benefits from upstream work: it still settles to Ethereum, and Ethereum's active PQC research earns the settlement layer a B. Every other category is unaddressed. Mantle also maintains a fork of the OP Stack codebase rather than tracking the canonical Superchain spec, which means future upstream PQC improvements — if any were introduced — would need to be separately ported to Mantle's fork.

## Proposed and Implemented PQC Algorithms

Mantle does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: B 🔧**

Mantle settles to Ethereum. Output roots are proposed on Ethereum L1 via `DisputeGameFactory` and `FaultDisputeGame` contracts; withdrawals finalize after a 7-day challenge window. Mantle's settlement security is therefore bounded by Ethereum's own security.

Ethereum has active PQC work in progress — consensus-layer validator signatures, blob attestations, and transaction signatures are all subjects of ongoing research — earning an in-development (B) rating. The bridge upgrade keys are controlled by Mantle governance (not the Optimism Security Council), implemented as a standard Ethereum Safe multisig with EC keys. A quantum attacker holding sufficient signing keys could upgrade or drain the bridge contracts.

## Data Availability

**Grade: F ❌**

We have found no public information indicating migration activity for Mantle's data availability layer. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Mantle uses MantleDA, a customized deployment of EigenDA, rather than Ethereum blobs. EigenDA operators attest to data availability using BLS signatures over BN254 — an elliptic-curve pairing construction that is quantum-vulnerable. This is an independent EC dependency from Ethereum's BLS12-381 consensus attestation, and it is not covered by Ethereum's PQC roadmap.

This is the most significant PQC deviation from standard OP Stack deployments. A standard Superchain chain using Ethereum blobs would inherit a C (Roadmapped) rating for DA from Ethereum's KZG replacement effort. MantleDA provides no such inheritance: EigenDA has no published PQC roadmap for its operator keys or attestation scheme, so the DA layer is independently quantum-exposed. If EigenDA's operator attestations were forged by a quantum attacker, the availability guarantee for Mantle's transaction data could be compromised.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Mantle in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Mantle uses the OP Stack Cannon fault proof system. Cannon's internal bisection game is hash-based (Keccak), which is quantum-resistant in isolation. However, output roots are proposed by EC-keyed accounts on Ethereum L1. A cryptographically relevant quantum computer could forge a proposer signature, submit a fraudulent output root, and drain bridge funds after the challenge window expires. No published plan exists to replace EC-signed output roots or add PQC-keyed proposers.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Mantle in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Mantle is EVM-equivalent. Every user account is a secp256k1 ECDSA address; there is no PQC transaction type in the protocol. No Mantle-specific PQC wallet migration plan has been published.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Mantle in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Mantle's sequencer is centralized and operated by the Mantle team. The op-node runs a libp2p gossip network with secp256k1 node identity. RPC endpoints use classical TLS 1.3 with ECDHE key exchange. No PQC hybrid key exchange or OP Stack networking PQC work has been published that would apply to Mantle's fork.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Mantle in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Mantle is EVM-equivalent and ships the standard Ethereum precompile set: `ecrecover` (secp256k1), BN254 elliptic-curve operations, SHA-256, and others. There is no PQC signature verification precompile. Smart contracts on Mantle cannot currently verify post-quantum signatures natively.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Mantle in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Mantle's bridge and governance infrastructure is independently controlled — not shared with the Optimism Security Council. Upgrade keys are held by Mantle governance (formerly BitDAO), implemented as a standard Ethereum Safe multisig with EC keys. L2-to-L1 withdrawals depend on Merkle proofs anchored to EC-signed output roots. The EigenDA attestation layer introduces an additional layer of EC exposure beyond what standard OP Stack deployments carry: EigenDA operator identities and attestation signatures are BN254-based and independently vulnerable.

Because Mantle maintains a fork of the OP Stack codebase rather than tracking the canonical Superchain spec, it does not automatically receive upstream OP Stack security or protocol updates. Any future PQC improvements introduced into the upstream OP Stack would need to be separately evaluated and ported to Mantle's fork.

## EC Sunset

**Grade: F ❌**

No PQC discussions have been found from the Mantle team or Mantle governance regarding retirement of EC-based cryptography from any Mantle component.

Adding PQC alongside EC is not the same as retiring EC. For reference, Mantle's PQC-adoption ratings per category are: Settlement 🔧, DA ❌, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

EC is present in every layer of Mantle: transaction signatures, output root proposals, bridge governance multisigs, op-node peer identity, RPC transport, and — uniquely among common OP Stack deployments — the EigenDA-based DA attestation layer (BLS over BN254). No component has a published plan for EC removal. The EigenDA DA dependency means Mantle carries more total EC surface than a standard Ethereum-blob-based Superchain deployment.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
