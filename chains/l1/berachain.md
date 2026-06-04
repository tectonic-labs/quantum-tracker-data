# Berachain (BERA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Berachain |
| **Ticker** | BERA |
| **Website** | https://docs.berachain.com/learn/ |
| **GitHub** | https://github.com/berachain |
| **On-chain environment** | EVM (EVM-identical execution layer) |
| **Current mainnet version** | Prague4 / bera-geth v1.011607.0 (activated 2025-11-12) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

[Berachain](https://docs.berachain.com/learn/) is an EVM-identical layer-1 blockchain with a novel **Proof-of-Liquidity (PoL)** economic model. Rather than directing staking rewards to validators directly, PoL routes governance-token BGT emissions to liquidity providers in whitelisted Reward Vaults, aligning validator incentives with DeFi liquidity. The chain uses a three-token model — BERA (gas and staking), BGT (governance), and HONEY (native stablecoin).

The consensus layer is [BeaconKit](https://github.com/berachain/beacon-kit), a CometBFT-based consensus-client framework that wraps CometBFT to deliver Ethereum-style single-slot finality for EVM execution clients. The execution layer supports multiple clients: [bera-geth](https://github.com/berachain/bera-geth) (the primary Go-Ethereum fork) and [bera-reth](https://github.com/berachain/bera-reth) (a Reth fork). Validator signatures use Ed25519 (CometBFT-native) or BLS12-381 depending on BeaconKit configuration; both are EC-based. The execution layer is EVM-identical to Ethereum, carrying the same EC precompile set. No PQC migration plan has been published by the Berachain Foundation as of the information cutoff.

## Proposed and Implemented PQC Algorithms

Berachain does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Berachain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Berachain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Berachain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Berachain's execution layer is EVM-identical to Ethereum, carrying the full standard EVM precompile set: `ecrecover` (secp256k1 ECDSA recovery), BN254 add, multiply, and pairing operations, BLS12-381 operations (after EIP-2537), and KZG point evaluation (EIP-4844). No post-quantum signature verification primitive is available.

Any post-quantum on-chain verification primitive on Berachain would track the Ethereum EIP timeline, as there are no Berachain-specific on-chain logic proposals.

**Current state.** EVM-identical EC precompiles only. No PQC verify primitive exists.

**Planned future work.** None Berachain-specific. Would track Ethereum's EIP roadmap.

## 5. Other Features

**Grade: F ❌**

### Proof-of-Liquidity (PoL)

[Proof-of-Liquidity](https://www.coingecko.com/learn/what-is-berachain-crypto-proof-of-liquidity) is an economic mechanism implemented in smart contracts: validators stake BERA to earn block-production rights and direct BGT emissions toward liquidity providers in Reward Vaults. This is an accounting and incentive layer, not a novel cryptographic primitive. The quantum surface of PoL is identical to the underlying validator signatures and EVM contract interactions — it does not introduce or require any additional cryptography beyond what the consensus and execution layers already use.

**Current state.** PoL is implemented in EVM smart contracts. No additional EC dependencies beyond the base EVM and consensus layers.

**Planned future work.** None.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No PQC migration plan or EC retirement schedule has been published by the [Berachain Foundation](https://github.com/berachain). Berachain's EVM-identical execution layer inherits whatever PQC precompile evolution Ethereum adopts via EIPs; Berachain-specific consensus (BeaconKit / CometBFT) and P2P layers have no published migration path.

**Current state.** secp256k1 is embedded in all EVM transaction signing. Ed25519 or BLS12-381 (depending on BeaconKit configuration) underpins consensus validator signing. secp256k1 (devp2p) and Ed25519 (CometBFT p2p) handle node identity and transport. No deprecation plan exists at any layer.

**Planned future work.** None published.

## Governance

Berachain uses named hard forks activated at Unix timestamps (Deneb1, Electra, Electra1, Prague1 through Prague4). Both the consensus client (BeaconKit) and the execution client (bera-geth or bera-reth) must be upgraded before each fork timestamp. The chain has seen rapid patch iterations — Prague1 through Prague4 were released in late 2025 in response to a mainnet exploit — so operators track the [BeaconKit releases](https://github.com/berachain/beacon-kit/releases) and [bera-geth releases](https://github.com/berachain/bera-geth/releases) closely.

No PQC-related governance proposals have been identified in the [Berachain GitHub organization](https://github.com/berachain) or the Berachain Foundation's public communications as of the information cutoff.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
