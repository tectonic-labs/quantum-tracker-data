# Beam (BEAMX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Beam |
| **Ticker** | BEAMX |
| **Website** | https://www.beam.mw/ |
| **GitHub** | https://github.com/BeamMW/beam |
| **Derived from** | Mimblewimble + Lelantus |
| **On-chain environment** | BeamShaders (WASM-style VM) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

[Beam](https://www.beam.mw/) is a privacy-focused proof-of-work cryptocurrency built on the [Mimblewimble protocol](https://www.beam.mw/docs/dev/beam-technology/mimblewimble/) with Lelantus-MW shielded-pool extensions, mainnet active since 2019. Mining uses BeamHash III, an Equihash-derived hash-based algorithm, which is the only protocol layer not exposed to quantum attack. Every other cryptographic component — transaction signatures, the privacy-preserving Pedersen commitments that hide amounts, the Lelantus-MW shielded pool, BeamShaders smart-contract host functions, and node identity — relies on elliptic-curve discrete-log assumptions over secp256k1.

Because Mimblewimble's confidentiality is *defined* in terms of EC discrete-log, a quantum break is retroactive: an attacker who eventually solves the discrete-log problem can decrypt historical confidential amounts and reconstruct ownership history across the entire ledger. No PQC migration plan or EC retirement schedule has been published by the Beam Foundation or BeamX DAO as of the information cutoff for this report.

## Proposed and Implemented PQC Algorithms

Beam does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Beam in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: A ✅**

Beam secures consensus with BeamHash III proof-of-work. Proof-of-work is hash-based, so it is not exposed to Shor's algorithm the way elliptic-curve signature schemes are — the consensus layer is quantum-resistant by construction and requires no migration.

**Current state.** BeamHash III proof-of-work; no elliptic-curve dependency in the consensus mechanism.

**Planned future work.** None required for quantum resistance at the consensus layer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Beam in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Beam supports [BeamShaders](https://www.beam.mw/docs/ecosystem/), confidential scriptable smart contracts that run in a WASM-like VM with Pedersen-committed inputs and outputs. The host-function surface exposes only EC and hash primitives; no post-quantum signature-verification primitive is available.

**Current state.** BeamShaders can verify EC signatures and call hash functions but cannot verify any post-quantum signature scheme on-chain.

**Planned future work.** No proposal to add a post-quantum verification host function has been published.

## 5. Other Features

**Grade: F ❌**

### Mimblewimble + Pedersen commitments

[Mimblewimble](https://www.beam.mw/docs/dev/beam-technology/mimblewimble/) hides transaction amounts behind Pedersen commitments and proves ownership via excess Schnorr signatures, with cut-through aggregation that removes spent intermediate inputs and outputs from the ledger. Both Pedersen commitments and Schnorr signatures rest on the secp256k1 discrete-log problem. A quantum break would let an attacker recover hidden amounts and excess values across the entire chain history; combined with chain-graph side information, ownership history can be reconstructed retroactively.

**Current state.** Mimblewimble cryptography is fully EC-based.

**Planned future work.** No post-quantum redesign of the Mimblewimble core has been drafted.

### Lelantus-MW shielded pool

Lelantus-MW is the shielded-pool extension layered on top of Mimblewimble that breaks transaction-graph linkage through burn-and-redeem flows. It uses the same EC base and inherits the same retroactive-break exposure as the core protocol.

**Current state.** Lelantus-MW operations are fully EC-based.

**Planned future work.** No post-quantum alternative is proposed.

### Atomic swaps

Beam supports atomic swaps with Bitcoin and Litecoin counterparties using Schnorr-based protocols, which depend on EC.

**Current state.** Atomic-swap signing is EC-based.

**Planned future work.** None published.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ✅, P2P ❌, On-Chain ❌, Other ❌.

The privacy properties of Beam are *defined* in terms of EC discrete-log assumptions — Pedersen commitments, Schnorr excess signatures, and Lelantus-MW shielded operations all rely on secp256k1. A migration here is not a drop-in replacement but a redesign of the cryptographic core. No retirement schedule for EC primitives has been published by the Beam Foundation or BeamX DAO as of the information cutoff.

**Current state.** secp256k1 is embedded in transaction signing, amount commitments, shielded-pool operations, smart-contract host functions, atomic swaps, and node identity. No EC deprecation plan exists.

**Planned future work.** None published.

## Governance

Beam's governance layer is the [BeamX DAO](https://www.beam.mw/), with BEAMX as the governance token (BEAM is the chain's currency). No PQC-related proposals have been identified in public BeamX DAO records or in the [BeamMW/beam](https://github.com/BeamMW/beam) repository as of the information cutoff. Readers tracking development discussions can follow the project's GitHub and the [Beam ecosystem documentation](https://www.beam.mw/docs/ecosystem/).

---

_Generated on 08 May 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
