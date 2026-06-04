# Agoric (BLD) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Agoric |
| **Ticker** | BLD |
| **Website** | [agoric.com](https://agoric.com/) |
| **GitHub** | [Agoric](https://github.com/Agoric/agoric-sdk) |
| **On-chain environment** | SwingSet (Hardened JavaScript / object-capability VM) |
| **Derived from** | Cosmos SDK / CometBFT |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Summary

Agoric is a Cosmos SDK / CometBFT Layer 1 chain running a Hardened JavaScript smart-contract VM called SwingSet. Its value proposition is cross-chain orchestration and programmable finance via IBC, using an object-capability security model. From a post-quantum cryptography standpoint, Agoric uses the standard Cosmos SDK stack throughout — secp256k1 ECDSA for user transactions and Ed25519 for validator block-signing — and no PQC migration work has been published or announced as of May 2026.

The chain's public [roadmap](https://agoric.com/roadmap/) focuses on orchestration, AI agents, and developer tooling. No PQC-related proposals have appeared in the governance history or development forums.

## Proposed and Implemented PQC Algorithms

> Agoric does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Agoric in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Agoric in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Agoric in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

**Current state**: Agoric's execution environment is SwingSet, which runs Hardened JavaScript contracts under an object-capability model. Unlike EVM chains, SwingSet does not expose protocol-provided cryptographic precompiles — the VM is sandboxed for security rather than crypto-rich. A pure-JavaScript PQC verifier could technically be deployed in a contract, but no protocol-native PQC verification primitive (the equivalent of an EVM precompile for ML-DSA or Falcon) is available.

**Planned future work**: No PQC on-chain logic primitives have been proposed. The [Agoric documentation](https://docs.agoric.com/what-is-agoric) does not mention any planned cryptographic precompile additions.

## Other Features

**Grade: F ❌**

**Current state**: Agoric's core special feature is cross-chain orchestration via IBC. IBC light-client proofs rely on the partner chain's consensus signatures — typically CometBFT Ed25519 or BLS aggregates depending on the counterparty. Agoric inherits whatever EC dependencies its IBC counterparties carry. No PQC alternative for IBC light-client proofs has been proposed in the Cosmos/IBC ecosystem as of early 2026.

**Planned future work**: None identified in public materials.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

**Current state**: No PQC migration plan or EC retirement schedule has been published by the Agoric Systems Operating Company or the Agoric Foundation as of May 2026.

**Planned future work**: None identified.

## Governance

Agoric uses [Cosmos SDK on-chain governance](https://github.com/Agoric/agoric-sdk/releases). BLD stakers vote on software-upgrade proposals; upgrades activate at a pre-agreed block height. A two-track system exists: chain-level upgrades (requiring governance vote and binary update) and contract/vat-level upgrades (governance-triggered without a binary change). Upgrade history is tracked at [agoric-3-proposals](https://github.com/Agoric/agoric-3-proposals). No PQC-relevant proposals have appeared in the governance record.

Governance discussion takes place on the [Agoric community forum](https://community.agoric.com/).

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
