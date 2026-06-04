# Chiliz (CHZ) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Chiliz |
| **Ticker** | CHZ |
| **Website** | [chiliz.com](https://www.chiliz.com/) |
| **GitHub** | [chiliz-chain](https://github.com/chiliz-chain) |
| **Twitter / X** | [https://x.com/Chiliz](https://x.com/Chiliz) |
| **Derived from** | Ethereum / BNB Chain (Geth fork, PoSA) |
| **On-chain environment** | EVM |
| **Current mainnet version** | Snake8 (activated Oct 2025) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Chiliz Chain is a Geth-derived fork running Proof of Staked Authority (PoSA), developed for fan engagement and sports tokenization through the Socios.com platform. Its cryptographic foundations mirror BNB Chain and, by extension, Ethereum: ECDSA secp256k1 for transaction signatures, secp256k1 for validator block signing and identity, and the same EC precompile set (including `ecrecover`) for on-chain logic. P2P networking follows the Ethereum devp2p model with secp256k1 node identity.

No post-quantum research, proposals, or strategic communications have been located from the Chiliz team. The chain's primary application focus is fan token smart contracts and sports partnership integrations through the [Socios.com](https://socios.com/) platform; no chain-specific cryptographic features beyond standard EVM primitives are present.

## Proposed and Implemented PQC Algorithms

Chiliz does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Chiliz in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Chiliz in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Chiliz in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

Chiliz Chain is EVM-compatible and inherits Ethereum's standard precompile set, including `ecrecover` and BN254 (BN256 addition, multiplication, and pairing) primitives. These are elliptic-curve-based operations. No post-quantum signature verification primitive is available as a precompile or built-in contract, and no proposal for one has been identified in the [Chiliz documentation](https://docs.chiliz.com/) or the [chiliz-chain](https://github.com/chiliz-chain) GitHub organization.

**Current state.** EVM precompile set is identical to Ethereum's. EC-based signature verification only; no PQC primitive.

**Planned future work.** None located.

## Other Features

Chiliz does not support any special features.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

We have found no public information indicating migration activity for Chiliz in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Chiliz Chain protocol upgrades are managed by the Chiliz core team without on-chain governance voting. Hard forks are activated by timestamp, staged on the [Spicy Testnet](https://docs.chiliz.com/) before mainnet deployment, and require validator nodes to upgrade before the activation time. The validator set is permissioned (approximately 11 active validators as of the Snake8 upgrade). No formal improvement-proposal process has been identified.

No post-quantum proposals, working-group documents, or relevant governance discussions have been located.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
