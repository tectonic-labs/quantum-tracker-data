# Sei (SEI) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Sei |
| **Ticker** | SEI |
| **Website** | [sei.io](https://www.sei.io/) |
| **GitHub** | [sei-protocol](https://github.com/sei-protocol) |
| **Twitter / X** | [@SeiNetwork](https://x.com/SeiNetwork) |
| **Derived from** | Ethereum (EVM layer) + Cosmos Hub (consensus layer) |
| **On-chain environment** | EVM (parallelized) |
| **Current mainnet version** | v6.4 (May 2026) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | D | ⚠️ | Discussed |

Sei is a high-performance EVM Layer 1 built on Cosmos SDK with CometBFT consensus and a parallelized execution engine. In January 2026, Sei Labs published a [detailed engineering analysis](https://blog.sei.io/research/building-giga-what-quantum-computing-means-for-high-performance-chains/) examining what quantum computing means for high-throughput chains. The blog evaluates NIST-standardized PQC signature schemes, identifies the bandwidth scaling challenge unique to chains targeting hundreds of thousands of transactions per second, and proposes architectural mitigations including STARK-based proof batching and a dual-key migration strategy. However, no Sei Improvement Proposal (SIP) or formal roadmap commitment has followed. Development focus remains on the Giga upgrade (Autobahn consensus for >200k TPS).

The research represents genuine technical engagement with PQC migration — notably the recognition that standard PQC signature sizes (1,312–49,216 bytes versus 64–65 bytes for ECDSA) would require 0.48–1.57 GB/s of bandwidth at Sei's target throughput. This places Sei ahead of many chains that have not publicly acknowledged the quantum threat, but the absence of concrete implementation plans or governance proposals keeps all discussed categories at the ⚠️ (Discussed) level.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** | ECDSA secp256k1, Ed25519 | Tx Signatures, Consensus | Discussed |
| **SLH-DSA** | ECDSA secp256k1, Ed25519 | Tx Signatures, Consensus | Discussed |
| **Falcon / FN-DSA** | ECDSA secp256k1, Ed25519 | Tx Signatures, Consensus | Discussed |
| **STARK / FRI** | N/A (verification batching) | Tx Signatures | Discussed |

## Transaction Signatures

**Grade: D ⚠️**

Sei currently uses ECDSA over secp256k1 for all user transaction signatures on its EVM layer, and secp256k1 for legacy Cosmos SDK transactions (being phased out under SIP-3). Both are vulnerable to quantum attack via Shor's algorithm.

**Current state.** All transaction signatures rely on elliptic-curve cryptography. No post-quantum signature scheme is available on mainnet or testnet.

**Planned future work.** Sei Labs' [January 2026 research blog](https://blog.sei.io/research/building-giga-what-quantum-computing-means-for-high-performance-chains/) evaluates **ML-DSA** (FIPS 204), **SLH-DSA** (FIPS 205), and **Falcon** as candidate replacements. The blog identifies that at 200k TPS, PQC signature sizes would impose 0.48–1.57 GB/s bandwidth overhead, and proposes STARK-based proof batching to amortize verification costs — block producers would batch PQC signature verifications and generate a single proof attesting validity. A commit-now-verify-later model with economic bonds is also discussed. No SIP has been filed and no implementation timeline has been announced.

## Consensus

**Grade: D ⚠️**

Sei uses [CometBFT](https://github.com/cometbft/cometbft) (formerly Tendermint) for Byzantine Fault Tolerant consensus. Validator block signing uses Ed25519, which is quantum-vulnerable. Unlike Ethereum's BLS12-381 aggregate signatures, Sei's Ed25519 validator signatures do not rely on elliptic-curve pairings, but Ed25519 is still broken by Shor's algorithm.

**Current state.** All validator signing is Ed25519. No post-quantum alternative is deployed or in development.

**Planned future work.** The [research blog](https://blog.sei.io/research/building-giga-what-quantum-computing-means-for-high-performance-chains/) discusses the challenge of migrating validator signatures to PQC at high throughput, particularly the difficulty of signature aggregation with post-quantum schemes. No concrete plan or SIP has been published for consensus-layer PQC migration.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Sei in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Sei in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

Sei does not support any special features.

## EC Sunset

**Grade: D ⚠️**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ⚠️, P2P ❌, On-Chain ❌, Other ➖.

**Current state.** Sei has no published plan for removing elliptic-curve cryptography from any protocol layer. ECDSA secp256k1 remains the sole transaction signature scheme, and Ed25519 is the sole validator signing scheme.

**Planned future work.** The [research blog](https://blog.sei.io/research/building-giga-what-quantum-computing-means-for-high-performance-chains/) proposes a dual-key migration strategy where users would attach post-quantum keys to existing identities before a quantum threat materializes, maintaining both authorization paths temporarily before deprecating classical signatures. This indicates awareness of the need for EC retirement, but no governance proposal or timeline has been published.

## Governance

Sei governance operates through the **Sei Improvement Proposal (SIP)** process, with proposals activated via on-chain governance votes requiring >50% approval of staked SEI with a 33.4% quorum. No SIP related to post-quantum cryptography has been filed. The PQC discussion to date has been limited to the [January 2026 research blog post](https://blog.sei.io/research/building-giga-what-quantum-computing-means-for-high-performance-chains/) from Sei Labs, which is an engineering analysis rather than a governance proposal.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
