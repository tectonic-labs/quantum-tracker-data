# Quip Network (QUIP) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Quip Network |
| **Ticker** | QUIP |
| **Website** | https://postquant.xyz/ |
| **GitHub** | https://github.com/QuipNetwork |
| **On-chain environment** | Two-layer (Asset Layer + Compute Layer); cross-chain integration with EVM and Solana |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | B | 🔧 | In Development |
| EC Sunset | F | ❌ | Not Discussed |

Quip Network, built by PostQuant Labs, [launched its quantum-classical blockchain testnet on 2 April 2026 in consultation with D-Wave](https://www.prnewswire.com/news-releases/quipnetwork-launches-quantum-classical-blockchain-testnet-opens-doors-to-global-research-community-302732654.html). The chain is structured in two layers: an Asset Layer that secures user assets with **WOTS+** (Winternitz One-Time Signature Plus), a hash-based one-time signature scheme, and a Compute Layer that incentivizes quantum and classical operators to contribute computing power for optimization workloads. Wallet integrations targeting EVM and Solana are deployed on testnet, with Bitcoin support described as in development.

The project is open-source on [GitHub](https://github.com/QuipNetwork) and reports 13,000+ testnet signups at launch. There is no mainnet as of late April 2026, and the public documentation at the time of writing is concentrated on the Asset Layer signature story and the quantum-classical compute marketplace; consensus, P2P, and VM-level details are not yet published in depth.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **WOTS+** (hash-based one-time signatures) | ECDSA secp256k1 / Ed25519 (for users opting into the Asset Layer) | Tx Signatures | In Development (testnet) |

## Transaction Signatures

**Grade: B 🔧**

The Asset Layer signs user transactions with **WOTS+**, a hash-based one-time signature scheme whose security rests on hash function properties rather than elliptic curve assumptions. Address derivation is built on **WOTS+** public key material. Cross-chain wallet integrations let a user keep an EVM or Solana account on the underlying chain while gaining a **WOTS+**-secured surface on the Quip Asset Layer; ECDSA-based keys on those external chains continue to be used for the cross-chain leg.

**Current state.** [**WOTS+** Asset Layer wallets are live on testnet from 2 April 2026](https://www.prnewswire.com/news-releases/quipnetwork-launches-quantum-classical-blockchain-testnet-opens-doors-to-global-research-community-302732654.html), alongside EVM and Solana wallet interop on testnet. There is no mainnet deployment yet, and multi-sig, threshold, and account-abstraction patterns for **WOTS+** are not described in depth in the public materials.

**Planned future work.** Bitcoin wallet support is described as in development on testnet. Mainnet adoption of **WOTS+** is anticipated but a date has not been published.

## Consensus

**Grade: D ⚠️**

The whitepaper describes a Proof-of-Stake design split across the Compute Layer and the Asset Layer, but the consensus signature scheme, validator identity format, randomness beacon, and finality mechanism are not specified in the public documentation reviewed.

**Current state.** Testnet consensus has been operational since 2 April 2026 in support of the [testnet launch](https://www.prnewswire.com/news-releases/quipnetwork-launches-quantum-classical-blockchain-testnet-opens-doors-to-global-research-community-302732654.html), but the cryptographic primitives underpinning block signing and validator authentication have not been disclosed at a level that would let an external reviewer confirm whether they are post-quantum or classical.

**Planned future work.** Full consensus specification is described as forthcoming for mainnet; no concrete post-quantum consensus algorithm has been named in publicly available materials.

## P2P Networking

**Grade: D ⚠️**

Transport protocol, node identity, handshake construction, and peer-discovery details are not published.

**Current state.** A testnet P2P network is operational with 13,000+ signups, but the implementation has not been documented publicly. There is no public statement on whether transport encryption uses post-quantum key exchange or classical primitives.

**Planned future work.** Network security details are described as forthcoming for mainnet documentation. No concrete post-quantum networking primitives have been named in the public materials.

## On-Chain Logic

**Grade: D ⚠️**

The Asset Layer is described as supporting wrapped-asset contracts, and the Compute Layer is described as handling the submission and verification of quantum and classical optimization problems. The VM type, supported precompiles or builtins, and signature-verification primitives available to on-chain programs are not described in depth in the public materials. **WOTS+** verification is implied by Asset Layer transaction processing, but the on-chain verification interface is not documented.

**Current state.** Testnet Asset Layer is operational; smart-contract capabilities on testnet are described as limited.

**Planned future work.** Full VM and precompile specifications are described as forthcoming for mainnet.

## Other Features

### Quantum-classical computing marketplace

**Current state.** The Compute Layer is a marketplace that incentivizes quantum and classical operators to contribute computing power, with users submitting optimization problems and results verifiable on-chain. The design was [developed in consultation with D-Wave Systems, who provided expertise on quantum computing integration](https://www.prnewswire.com/news-releases/quipnetwork-launches-quantum-classical-blockchain-testnet-opens-doors-to-global-research-community-302732654.html). The marketplace is operational on testnet from 2 April 2026.

**Planned future work.** Expansion of the supported quantum and classical problem classes is described as part of the roadmap; mainnet timing is not published. The verification primitives that make compute-result attestations checkable on-chain are not described in depth in the public materials.

### Cross-chain asset security wrapper

**Current state.** The Asset Layer is positioned to let users wrap existing EC-based assets with a **WOTS+**-secured layer without migrating off their original chain. EVM and Solana wallet integrations are live on testnet; Bitcoin integration is described as in development.

**Planned future work.** Bitcoin wallet support is the next stated integration. The wrapper continues to depend on EC-based custody on the external chain — the **WOTS+** layer adds protection above it rather than replacing it.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus ⚠️, P2P ⚠️, On-Chain ⚠️, Other 🔧.

Quip Network's design retains elliptic-curve cryptography indefinitely. The cross-chain wrapper model is built around continued EC operation on the underlying EVM, Solana, and (planned) Bitcoin chains, and the project's stated rationale is that those bridges require ECDSA to remain functional. No EC sunset timeline has been announced. The Asset Layer offers users a **WOTS+**-secured surface they can opt into at their own pace, but the EC side of the bridge is not on a published retirement schedule.

**Current state.** Testnet supports both **WOTS+** and EC wallet bridging from 2 April 2026 onward. EC retention is described as an explicit design choice rather than a temporary compatibility measure.

**Planned future work.** Dual-signature support (**WOTS+** plus EC) is stated to continue on mainnet. The project says it will monitor NIST PQC standardization to inform future direction, but no EC retirement milestones are on the public record.

## Governance

Governance is currently company-led by PostQuant Labs. The project is in its testnet phase from 2 April 2026, and no formal on-chain proposal system, voting mechanism, or community-governance framework has been published. Public-facing development venues are the [project website](https://postquant.xyz/) and the [GitHub organization](https://github.com/QuipNetwork). No PQC-relevant proposals with canonical identifiers have been published in those venues at the time of writing.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
