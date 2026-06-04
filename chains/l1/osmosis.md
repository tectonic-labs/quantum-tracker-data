# Osmosis (OSMO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Osmosis |
| **Ticker** | OSMO |
| **Website** | https://osmosis.zone/ |
| **GitHub** | https://github.com/osmosis-labs/osmosis |
| **On-chain environment** | CosmWasm (Rust smart contracts) + native AMM modules |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Osmosis is an application-specific Cosmos SDK chain optimized as a cross-chain decentralized exchange and DeFi hub. It runs CometBFT (Tendermint) consensus with Ed25519 validator keys, uses secp256k1 ECDSA for user transactions (the Cosmos SDK default), and supports CosmWasm smart contracts written in Rust. Beyond the standard Cosmos stack, Osmosis adds native AMM modules including concentrated liquidity, stableswap, superfluid staking, and TWAP. These modules are application logic with no new cryptographic primitives. As the largest DEX in the Cosmos ecosystem with over 50 active IBC channels, Osmosis acts as a liquidity hub for the broader Cosmos network.

Osmosis has no published plan or public discussion of post-quantum cryptography migration as of May 2026. Its PQC posture is the standard Cosmos SDK posture: secp256k1 ECDSA for transactions and Ed25519 for consensus, with no PQC roadmap at either layer.

## Proposed and Implemented PQC Algorithms

> Osmosis does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Osmosis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Osmosis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Osmosis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

> We have found no public information indicating migration activity for Osmosis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

### IBC (Inter-Blockchain Communication)

**Current state.** Osmosis operates over 50 active IBC channels, making it a central liquidity routing layer for the Cosmos ecosystem. IBC packet security rests on CometBFT light-client proofs, which are authenticated via Ed25519 validator signatures on each counterparty chain. A quantum break of Ed25519 would allow forged light-client proofs across all connected chains, undermining the integrity of cross-chain liquidity flows that pass through Osmosis.

**Planned future work.** No PQC-aware IBC implementation or migration has been announced by Osmosis Labs or the ibc-go maintainers as of May 2026.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for Osmosis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Osmosis protocol upgrades are governed via the Cosmos SDK on-chain governance module. OSMO token holders submit and vote on software upgrade proposals; if a proposal passes, `osmosisd` halts at the specified block height, applies the migration handler, and resumes. Cosmovisor automates the binary swap on the validator side. No PQC-relevant governance proposals have been identified in the [Osmosis governance forum](https://docs.osmosis.zone/) or the [osmosis-labs/osmosis GitHub repository](https://github.com/osmosis-labs/osmosis) as of May 2026.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
