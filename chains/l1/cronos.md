# Cronos (CRO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Cronos |
| **Ticker** | CRO |
| **Website** | [cronos.org](https://cronos.org/) |
| **GitHub** | [crypto-org-chain/cronos](https://github.com/crypto-org-chain/cronos) |
| **Derived from** | Cosmos SDK / CometBFT (consensus) + Ethereum (EVM layer via Ethermint) |
| **On-chain environment** | EVM (via Ethermint) |
| **Current mainnet version** | cronosd v1.7.x (mainnet chain ID: cronosmainnet_25-1) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Cronos is an EVM-compatible chain built on the Cosmos SDK and CometBFT, using the Ethermint library to bridge between the Cosmos SDK transaction model and the EVM execution layer. Its transaction signatures use ECDSA secp256k1 for both EVM transactions and Cosmos SDK messages. Block production and finality are handled by CometBFT, where all validator signing uses Ed25519. P2P networking follows the Cosmos SDK standard with libp2p and Ed25519 node identity. On-chain logic inherits Ethereum's precompile set including `ecrecover` and BN254 primitives.

No post-quantum research, proposals, or roadmap items have been located from the Cronos team or Crypto.org. Protocol upgrades proceed through on-chain governance using CRO token holders, using the same Cosmos SDK `x/upgrade` module as [Cosmos Hub](https://docs.cosmos.network/).

## Proposed and Implemented PQC Algorithms

Cronos does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Cronos in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

Cronos consensus is provided by [CometBFT](https://github.com/cometbft/cometbft) (formerly Tendermint), a Byzantine Fault Tolerant consensus protocol where all validator signing — prevotes, precommits, and proposals — relies on Ed25519. Ed25519 is an elliptic-curve scheme based on the discrete logarithm problem and is vulnerable to Shor's algorithm. Unlike Ethereum's PoS, which relies on BLS12-381 aggregate signatures, Cronos's validator signing uses individual Ed25519 signatures, removing the pairing-based dependency while retaining quantum vulnerability.

**Current state.** All consensus signing uses Ed25519 (CometBFT standard). No post-quantum validator signing is deployed or proposed on Cronos specifically.

**Planned future work.** No PQC consensus proposal has been filed through Cronos governance. Upstream work in the broader Cosmos ecosystem (such as the ML-DSA-65 validator key PRs in CometBFT and Cosmos SDK) could potentially benefit Cronos when merged, but no Cronos-specific commitment has been made.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Cronos in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

Cronos EVM inherits Ethereum's standard precompile set through Ethermint, including `ecrecover` (secp256k1 signature recovery) and BN254 elliptic-curve operation precompiles. No post-quantum verification primitive is available to EVM contracts, and no governance proposal or development work targeting a PQC precompile has been identified.

**Current state.** EVM precompile set mirrors Ethereum, including EC signature-verification primitives. No PQC verification primitive is available.

**Planned future work.** None located.

## Other Features

Cronos does not support any special features.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

We have found no public information indicating migration activity for Cronos in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Cronos protocol upgrades are submitted as software upgrade proposals through on-chain governance using the Cosmos SDK `x/upgrade` module. CRO token holders vote on proposals; validators halt at the specified block height and switch binaries. No formal improvement-proposal numbering system equivalent to Bitcoin's BIPs has been identified for Cronos specifically; proposals are discussed on the Cronos governance forums before being submitted on-chain.

No post-quantum proposals or relevant governance discussions have been located. Readers wanting to track current state should monitor the [Cronos documentation](https://docs.cronos.org/) and the [crypto-org-chain/cronos](https://github.com/crypto-org-chain/cronos) repository directly.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
