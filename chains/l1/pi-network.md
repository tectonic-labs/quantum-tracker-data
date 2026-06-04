# Pi Network (PI) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Pi Network |
| **Ticker** | PI |
| **On-chain environment** | Stellar account/asset model; Soroban WASM smart contracts (availability on Pi not confirmed) |
| **Derived from** | Stellar Core |
| **Mainnet genesis** | 2025-02 (Open Mainnet launch) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Pi Network is a Stellar-fork L1 using a customized version of the Stellar Consensus Protocol (SCP), a federated Byzantine agreement system in which each node defines its own quorum slice. The chain derives its cryptographic architecture from Stellar Core: transaction signatures and validator messages are signed with Ed25519, and the P2P overlay uses a Stellar-derived networking stack with EC-based node identity. Pi Network launched its Open Mainnet in February 2025 and has been stepping through protocol versions in 2026, with Protocol v23 activating on mainnet in May 2026 and a v24 upgrade targeted for June 2026.

Pi Network has no published post-quantum cryptography roadmap. Because it is a Stellar fork, any PQC migration effort would depend on upstream Stellar Core development; there is no independent Pi-level PQC initiative on the public record as of May 2026. On-Chain Logic is marked Not Applicable because Pi runs the Stellar account/asset model rather than a general VM, and Soroban (Stellar's WASM smart-contract platform) has not been confirmed as integrated into Pi Network as of May 2026.

## Proposed and Implemented PQC Algorithms

> Pi Network does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Pi Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Pi Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Pi Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: ➖**

Pi Network uses the Stellar account/asset model rather than a general programmable VM. Soroban, Stellar's WASM smart-contract platform, launched on Stellar mainnet in 2024, but whether Pi Network has integrated Soroban is not confirmed in public documentation as of May 2026. This category is marked Not Applicable pending confirmation of on-chain programmability.

## Other Features

Pi Network does not support any special features.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ➖, Other ➖.

> We have found no public information indicating migration activity for Pi Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Pi Network protocol upgrades are Foundation-controlled. The Pi Network Foundation sets the upgrade schedule, deploys new protocol versions to Pi Testnet first, then coordinates validator upgrades on mainnet with a fixed deadline. There is no token-holder vote mechanism for protocol changes. The Foundation's upgrade cadence in 2026 has been approximately biweekly, stepping through protocol versions v19 through v26 to reach smart-contract readiness. No PQC-relevant proposals or public discussions have been identified in any Foundation-controlled venue as of May 2026.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
