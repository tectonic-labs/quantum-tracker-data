# Initia (INIT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Initia |
| **Ticker** | INIT |
| **Website** | https://initia.xyz |
| **GitHub** | https://github.com/initia-labs |
| **On-chain environment** | MoveVM (native) plus OPinit optimistic-rollup stack for Minitia L2s |
| **Mainnet genesis** | 2025-04-24 |

## Summary Table

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Summary

Initia is a Cosmos SDK + CometBFT L1 chain that natively runs MoveVM and serves as the settlement and coordination layer for **Minitias** — application-specific L2 optimistic rollups built with the **OPinit Stack**. Minitia rollups can be EVM-, WasmVM-, or MoveVM-compatible. Initia launched its mainnet (`initiation-2`) in April 2025 and is the first blockchain to integrate MoveVM with Cosmos IBC.

The chain's cryptographic foundation follows the Cosmos SDK and CometBFT defaults: secp256k1 ECDSA for user transactions and Ed25519 for consensus validator keys. MoveVM's crypto modules expose hash, ECDSA, and BLS12-381 verification primitives — all EC-based. We have found no published PQC migration plan from the Initia Foundation across any evaluation category as of the date of this report.

## Proposed and Implemented PQC Algorithms

> Initia does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Initia in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Initia in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Initia in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

Initia's MoveVM executes Move-language smart contracts. The Move standard library and Aptos-derived crypto modules expose SHA-2/SHA-3 hash functions, secp256k1 ECDSA verification, Ed25519 verification, and BLS12-381 verification. No post-quantum signature-verification primitive is available.

**Current state.** On-chain signature verification covers EC schemes only. No PQC verification module has been proposed or merged.

**Planned future work.** None published.

## Other Features

**Grade: F ❌**

### OPinit Stack (Optimistic Rollup Framework)

Minitia L2 rollups built with the OPinit Stack generate fraud proofs that are verified on the Initia L1. Fraud-proof construction and validation rely on EC validator key signatures; the same quantum exposure that applies to the base-layer validator set applies here.

**Current state.** Fraud-proof signatures are EC-based. No post-quantum alternative has been proposed for the OPinit fraud-proof path.

**Planned future work.** None published.

### IBC (Inter-Blockchain Communication)

Initia uses IBC for cross-chain messaging. IBC light-client proofs verify CometBFT Ed25519 validator signatures, which are quantum-vulnerable. A quantum attacker capable of forging Ed25519 signatures could forge IBC packet attestations and undermine cross-chain trust.

**Current state.** IBC light-client verification is EC-based. No post-quantum IBC light-client mechanism has been proposed for Initia.

**Planned future work.** None published.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for Initia in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Initia uses the standard Cosmos SDK on-chain governance module. Protocol upgrades are proposed via `MsgSoftwareUpgrade` governance proposals that set a future block height; validators run Cosmovisor to perform automated binary swaps at that height. The single canonical client, `initiad`, is maintained by the Initia Foundation at the [initia-labs GitHub organization](https://github.com/initia-labs).

Readers tracking governance activity can follow the Initia Foundation's announcements and the initia-labs GitHub organization. No PQC-relevant governance proposal has been identified in the public record.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
