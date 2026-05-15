# Beam (BEAM) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Beam |
| **Ticker** | BEAM |
| **Website** | <https://www.onbeam.com/> |
| **GitHub** | <https://github.com/BuildOnBeam> |
| **Parent chain** | Avalanche (Subnet-EVM) |
| **On-chain environment** | Subnet-EVM |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

[Beam](https://www.onbeam.com/) is an Avalanche subnet specialized for Web3 gaming, launched in late 2023 by the Merit Circle community following a governance vote to rebrand the MC token to BEAM. The chain runs [Subnet-EVM](https://github.com/ava-labs/subnet-evm) — Avalanche's customizable EVM variant — with no documented custom-precompile modifications that touch cryptography, so its cryptographic posture is Subnet-EVM stock plus chain-specific surfaces around its bridge and wallet stack. Beam validators are a subset of Avalanche Primary Network validators who have opted in to validate the subnet, and after the [ACP-77 "Etna" upgrade](https://github.com/avalanche-foundation/ACPs) subnet validators are tracked on the P-Chain with associated BLS keys.

This report covers **Beam (BEAM)**, the Merit Circle gaming Avalanche subnet. It is not the same chain as **BEAMX**, the [Mimblewimble privacy L1](beam.md) that shares the "Beam" name; the two projects are unrelated despite the surface-level naming collision. Because Beam (BEAM) inherits its consensus, P2P, and EVM cryptography from the Avalanche stack, the per-category ratings below describe inherited posture rather than independent design decisions — there is no separate Beam fork of `avalanchego` and no Beam-attributable PQC research, prototype, or governance proposal currently on the public record.

## Proposed and Implemented PQC Algorithms

Beam does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Beam in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Beam in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Beam in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Beam in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

**Grade: F ❌**

### Beam-Avalanche bridge

The [Beam-Avalanche bridge](https://docs.onbeam.com/) moves BEAM between the Beam subnet and Avalanche C-Chain, and via downstream messaging stacks to other chains where wrapped BEAM circulates. The dominant retail bridge path routes through general-purpose messaging stacks rather than Beam-native bridge cryptography, and those messaging stacks rely on EC validator-set signatures for their cross-chain attestations.

**Current state.** Bridge attestations rest on EC signatures from the underlying messaging providers.

**Planned future work.** No post-quantum bridge work has been published; any migration here would be downstream of the underlying messaging providers migrating their own validator-set signature schemes.

### Sphere Wallet / Sphere SDK

[Sphere Wallet and the Sphere SDK](https://docs.onbeam.com/) are the in-house wallet stack used across Beam-based games, marketed with account-abstraction and embedded-wallet UX. The underlying signing envelope is the standard EVM ECDSA secp256k1 transaction format.

**Current state.** Sphere signs with secp256k1 ECDSA. Account-abstraction features sit above that envelope rather than replacing it.

**Planned future work.** No wallet-layer post-quantum migration has been published.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

A meaningful EC retirement on Beam is structurally downstream of two separate migrations: the Avalanche Primary Network would need to retire EC across Snowman consensus, P-Chain validator identity, and `avalanchego` P2P (because Beam inherits all of these); and the Beam-Avalanche bridge plus the Sphere wallet stack would need chain-specific EC retirement work. Neither track has a published schedule.

**Current state.** secp256k1 ECDSA is embedded in Subnet-EVM transactions, validator identity at the Primary Network layer, `avalanchego` TLS node certificates, the standard EVM precompile set, the bridge messaging path, and the Sphere wallet envelope. No EC deprecation plan exists.

**Planned future work.** None published.

## Governance

Beam's protocol and ecosystem decisions are directed by the Beam Foundation, with historical [governance discussion](https://snapshot.org/#/meritcircle.eth) under the Merit Circle / MC Foundation umbrella using Snapshot-style off-chain voting. The original MC → BEAM rebrand and the launch of the Beam Avalanche subnet were ratified through that venue in late 2023. No PQC-related proposals have been identified in public Beam Foundation records, in the [BuildOnBeam GitHub organization](https://github.com/BuildOnBeam), or in the Snapshot governance archive as of the information cutoff. Protocol upgrades to the underlying Avalanche stack flow through the [Avalanche Community Proposal](https://github.com/avalanche-foundation/ACPs) process, which is the venue where any inherited cryptographic change would surface.

---

_Generated on 14 May 2026 based on information as of 14 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
