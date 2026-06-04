# Babylon (BABY) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Babylon Genesis |
| **Ticker** | BABY |
| **Website** | https://babylonlabs.io/ |
| **GitHub** | https://github.com/babylonlabs-io |
| **On-chain environment** | CosmWasm |
| **Current mainnet version** | babylond v4.2.5 / Genesis V2 (activated 2025-06-16) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

[Babylon Genesis](https://babylonlabs.io/) is a Cosmos SDK + CometBFT proof-of-stake chain with a novel Bitcoin-staking finality layer. Bitcoin holders lock BTC on the Bitcoin chain via timelock and slashing transactions; in return they operate "Finality Providers" that vote on Babylon block finality using EOTS (Extractable One-Time Signatures), a scheme that automatically reveals the Finality Provider's secret key on double-signing, enabling cryptographic slashing back to the BTC stake.

Babylon's security model stacks several EC dependencies: Cosmos SDK secp256k1 for transaction authentication, CometBFT Ed25519 for validator block signing, BLS12-381 for vote-extension aggregation, EOTS Schnorr signatures over secp256k1 for Finality Provider votes, and Bitcoin Schnorr (BIP-340) for the BTC staking transactions and checkpoints. A quantum break of secp256k1 simultaneously compromises transaction signing, BTC staking lock-up safety, EOTS slashability, and Bitcoin-side checkpoints. No PQC migration plan has been published by Babylon Labs as of the information cutoff.

## Proposed and Implemented PQC Algorithms

Babylon does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Babylon in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Babylon in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Babylon in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Babylon runs [CosmWasm smart contracts](https://github.com/babylonlabs-io/babylon/blob/main/docs/architecture.md), including contracts for BTC staking logic, finality module coordination, and BTC light-client functionality. No post-quantum signature verification primitive is exposed at the CosmWasm host-function level.

**Current state.** CosmWasm contracts on Babylon have no post-quantum verification primitive available.

**Planned future work.** None published.

## 5. Other Features

**Grade: F ❌**

### Bitcoin staking and EOTS

Babylon's defining feature is its [Bitcoin-staking security layer](https://babylonlabs.io/blog/the-three-facets-of-babylon-genesis). Stakers lock BTC on the Bitcoin chain using Schnorr signatures (BIP-340) over secp256k1, combined with timelocks and adaptor signatures for the slashing path. Finality Providers vote using EOTS — a one-time Schnorr variant where double-signing automatically exposes the secret key, enabling on-chain slashing of the associated BTC stake.

EOTS's slashability guarantee is structurally bound to the discrete-log problem: the cryptographic argument that double-signing exposes the secret key depends on EC hardness. Replacing EOTS with a hash-based post-quantum scheme would not preserve this automatic slashability property without a fundamental redesign. A quantum break of secp256k1 would simultaneously compromise all locked BTC via stolen Bitcoin keys, defeat EOTS slashability, and undermine Bitcoin-side checkpoint authentication.

**Current state.** BTC staking transactions use Schnorr/secp256k1. EOTS voting uses Schnorr/secp256k1. Both are quantum-vulnerable.

**Planned future work.** None published. Replacing EOTS would require redesigning the slashability argument.

### BLS vote-extension aggregation

Babylon uses BLS12-381 to aggregate validator votes in the CometBFT vote-extension mechanism. This scheme was the subject of [a vulnerability disclosure in 2024](https://cryptonews.com/news/flaw-found-in-bitcoin-staking-protocol-babylon-could-disrupt-consensus/) that Babylon Labs acknowledged. BLS12-381 is EC-based and quantum-vulnerable.

**Current state.** BLS12-381 vote-extension aggregation is in production.

**Planned future work.** None published.

### Bitcoin checkpointing

Babylon writes finality checkpoints back to the Bitcoin chain, inheriting Bitcoin's secp256k1 posture for those on-chain records.

**Current state.** Checkpoint transactions use Bitcoin Script (secp256k1). No PQC alternative.

**Planned future work.** None published.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

Babylon's EC dependencies are deeply structural: EOTS's slashability guarantee, BTC staking transaction authentication, and Bitcoin checkpointing all rest on secp256k1 in ways that cannot be retired without redesigning the core security model. No EC retirement schedule has been published.

**Current state.** secp256k1 underlies transaction signing, EOTS finality voting, BTC staking transactions, and Bitcoin checkpoints. Ed25519 underlies CometBFT block signing. BLS12-381 underlies vote-extension aggregation. No deprecation plan exists at any layer.

**Planned future work.** None published.

## Governance

Babylon Genesis uses [Cosmos SDK on-chain governance](https://docs.babylonlabs.io/developers/babylon_genesis_chain/node_information/): software upgrade proposals require `minDeposit` in BABY and a voting period before activation. Validators and delegators vote, and the chain halts at the scheduled block height so all operators can upgrade before resuming.

No PQC-related governance proposals have been identified in the [Babylon Labs GitHub](https://github.com/babylonlabs-io) or Babylon's on-chain governance history as of the information cutoff.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
