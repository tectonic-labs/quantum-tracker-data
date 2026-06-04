# Astar Network (ASTR) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Astar Network |
| **Ticker** | ASTR |
| **Website** | https://astar.network/ |
| **GitHub** | https://github.com/AstarNetwork |
| **Parent chain** | Polkadot (relay chain consensus and security) |
| **On-chain environment** | EVM + WASM (ink!) via Substrate EVM pallet and contracts pallet |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

[Astar Network](https://astar.network/) is a [Polkadot parachain](https://docs.astar.network/docs/learn/architecture/astar-parachain/) that supports both EVM and WASM (ink!) smart contracts through Substrate's EVM pallet and contracts pallet. Its NPoS consensus security comes from the Polkadot relay chain rather than Astar itself. ASTR is the staking and gas token; dApp Staking is Astar's signature economic feature.

Astar inherits Polkadot's full cryptographic posture for consensus, finality, peer-to-peer networking, and cross-chain validation. The only cryptographic surfaces that differ from Polkadot are at the smart-contract and account layer: the EVM pallet adds secp256k1 ECDSA account keys, and the ink! contracts pallet exposes no post-quantum host functions. No PQC migration work has been identified at the Astar Foundation or Stake Technologies level; any consensus or P2P migration would arrive via Polkadot relay chain upgrades rather than Astar-specific governance.

## Proposed and Implemented PQC Algorithms

Astar Network does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Astar Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Astar Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Astar Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Astar Network supports two on-chain execution environments. The [EVM pallet](https://docs.astar.network/) exposes the standard EVM precompile set — `ecrecover` for secp256k1 ECDSA, and BN254 add, multiply, and pairing operations for zero-knowledge verifiers — with no post-quantum verification primitive. The [contracts pallet (ink! / WASM)](https://docs.astar.network/) exposes standard host functions for hashing and account operations; no post-quantum signature-verification host function or chain extension has been published by Astar. Cross-VM calls between EVM and WASM are supported via Astar's XVM precompile, but this does not add any post-quantum capability.

**Current state.** Both EVM and WASM execution environments are limited to EC-based signature verification. No PQC verify primitive is available to on-chain contracts.

**Planned future work.** No proposal to add a post-quantum verification primitive to either the EVM pallet or the ink! contracts pallet has been published.

## 5. Other Features

**Grade: F ❌**

### XCM messaging and parachain validation

Cross-chain messages between Astar and other parachains use Polkadot's XCM framework. Parachain candidate validation proofs are aggregated on the Polkadot relay chain using BLS12-381 validator signatures. Both are quantum-vulnerable and would migrate as part of any Polkadot relay chain PQC upgrade.

**Current state.** XCM and parachain validation proofs rely on relay-chain BLS aggregation. No Astar-specific post-quantum alternative exists.

**Planned future work.** None Astar-specific. Any improvement would arrive via Polkadot relay upgrades.

### Astar zkEVM (Polygon CDK)

Astar also operates an L2 zkEVM built on Polygon's CDK. SNARK-based proofs (Groth16 / KZG over BN254 / BLS12-381) underpin that system and are quantum-vulnerable.

**Current state.** zkEVM proofs rely on EC pairings.

**Planned future work.** None published by Astar.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No EC retirement schedule has been published by the [Astar Foundation](https://astar.network/) or Stake Technologies. Any EC sunset at the consensus and P2P layers would arrive via Polkadot relay chain governance rather than Astar's own upgrade process. Astar-specific surfaces — the EVM pallet precompiles, ink! host functions, and the zkEVM — have no published retirement plans.

**Current state.** EC cryptography is embedded throughout transaction signing, consensus (inherited from Polkadot), P2P networking, and both on-chain execution environments. No deprecation plan exists at any layer.

**Planned future work.** None published.

## Governance

Astar Network uses [Substrate forkless runtime upgrades](https://docs.astar.network/): governance proposals pass a referendum through OpenGov, and the new WASM runtime blob is applied without a hard fork. Consensus and finality upgrades require Polkadot relay chain governance to pass first.

No PQC-related proposals have been identified in Astar's on-chain governance history or in the [AstarNetwork GitHub organization](https://github.com/AstarNetwork) as of the information cutoff. Because Astar's consensus security comes from Polkadot, the governance venue for any consensus-layer PQC change would be Polkadot's own governance process, not Astar's.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
