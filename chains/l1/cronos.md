# Cronos (CRO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Cronos |
| **Ticker** | CRO |
| **Website** | <https://cronos.org/> |
| **GitHub** | <https://github.com/crypto-org-chain/cronos> |
| **Derived from** | Ethereum (EVM layer) and Cosmos Hub (consensus / networking) |
| **On-chain environment** | EVM (via Ethermint) on a Cosmos SDK / CometBFT base |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Cronos is a hybrid stack: EVM transactions and on-chain logic ride an [Ethermint](https://github.com/crypto-org-chain/cronos)-based EVM layer (secp256k1 ECDSA, standard Ethereum precompiles including ecrecover and BN254 pairing operations), while consensus and networking come from the [Cosmos SDK](https://docs.cosmos.network/) with [CometBFT](https://github.com/cometbft/cometbft) (formerly Tendermint). CometBFT validators sign blocks with Ed25519, and the libp2p-based gossip layer uses Ed25519 node identity. Compared with Ethereum's Gasper consensus, the CometBFT layer is less EC-pairing-heavy (no BLS12-381 in the validator-signing path), but every component is still elliptic-curve-based.

No Cronos-specific post-quantum proposal, draft, or working-group thread has been identified in the [crypto-org-chain/cronos](https://github.com/crypto-org-chain/cronos) repository or in Cronos chain governance. Cronos does not natively support EIP-4844 KZG blobs or other special chain-specific cryptographic features beyond its EVM and Cosmos-SDK inheritance.

## Proposed and Implemented PQC Algorithms

Cronos does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Cronos in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Cronos in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Cronos in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Cronos in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

Cronos does not support any special features.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

We have found no public information indicating migration activity for Cronos in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Cronos protocol changes are coordinated by the [Cronos / crypto-org-chain](https://github.com/crypto-org-chain/cronos) maintainers, tracking upstream releases of [Cosmos SDK](https://docs.cosmos.network/) and [CometBFT](https://github.com/cometbft/cometbft) for the consensus and networking layers and Ethermint / EVM upstream for the smart-contract layer.

PQ-relevant work currently visible:

- No PQ pull request, governance proposal, mailing-list thread, or testnet activity specific to Cronos has been identified in the [crypto-org-chain/cronos](https://github.com/crypto-org-chain/cronos) repository or in Cronos chain governance announcements.

No fork has been scheduled or signaled for any PQ migration.

---

_Generated on 06 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
