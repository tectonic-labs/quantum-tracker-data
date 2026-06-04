# Tempo (TEMPO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Tempo |
| **Ticker** | TEMPO |
| **Website** | https://tempo.xyz/ |
| **GitHub** | https://github.com/tempoxyz |
| **Twitter / X** | https://x.com/tempo |
| **On-chain environment** | EVM (Reth, Osaka target) |
| **Mainnet genesis** | 2026-03-18 |
| **Current mainnet version** | T4 Network Upgrade (v1.7.0) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Tempo is a payments-focused EVM L1 incubated by Paradigm and Stripe, with Visa as anchor validator. It launched mainnet on March 18, 2026 with an execution layer built on [Reth](https://github.com/tempoxyz/tempo) and a consensus layer using [Commonware Threshold Simplex](https://commonware.xyz/blogs/threshold-simplex) BFT with BLS12-381 threshold signatures. As of the most recent research pass, no public post-quantum cryptography roadmap or EC retirement discussion has been identified in Tempo's docs, blog, GitHub, or public commentary.

## Proposed and Implemented PQC Algorithms

Tempo does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Tempo in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Tempo in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Tempo in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Tempo in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### Tempo Zones (Private Execution)

**Current state.** Tempo Zones are opt-in private execution environments that hide balances and transfers, with selective disclosure for regulators. The specific cryptographic construction underlying Zones has not been publicly disclosed in [Tempo documentation](https://docs.tempo.xyz/). The broader industry norm for regulator-friendly stablecoin privacy is zk-SNARKs over BN254 or BLS12-381 pairings, both of which are vulnerable to Shor's algorithm.

**Planned future work.** No quantum-safe migration plan for Tempo Zones has been published.

### Threshold Primitives (BLS12-381)

**Current state.** The [Commonware Threshold Simplex](https://commonware.xyz/blogs/threshold-simplex) BFT underpinning Tempo's consensus enables a suite of threshold primitives — native randomness, threshold encryption, threshold decryption, random leader election, and lightweight bridging — all derived from the BLS12-381 threshold key material. BLS12-381 pairings are broken by Shor's algorithm; a quantum break of the consensus key material would also compromise these derived capabilities.

**Planned future work.** No post-quantum migration plan for threshold primitives has been published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Tempo's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Tempo in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Tempo uses [TIPs (Tempo Improvement Proposals)](https://github.com/tempoxyz/mpp-specs) published in the `tempoxyz/mpp-specs` repository. Protocol upgrades are deployed as named network upgrades (T1 Bach, T2, T3, T4, …) scheduled at specific timestamps or block heights. The current validator set is permissioned (design partners, including Visa as anchor), with a stated roadmap toward permissionless validation. There is no on-chain governance voting module; upgrade coordination relies on the permissioned validator set and social consensus.

No PQC-related TIPs have been identified as of the most recent research pass.

---

_Generated on 03 Jun 2026 based on information as of 04 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
