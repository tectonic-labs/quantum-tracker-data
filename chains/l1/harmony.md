# Harmony (ONE) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Harmony |
| **Ticker** | ONE |
| **Website** | https://harmony.one/ |
| **GitHub** | https://github.com/harmony-one/harmony |
| **On-chain environment** | EVM (sharded; EIP-2537 BLS12-381 precompiles) |
| **Current mainnet version** | v2026.0.0 (March 2026) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Harmony is a sharded EVM-compatible L1 using FBFT (Fast Byzantine Fault Tolerance) consensus. Its architecture groups 250 nodes per shard and achieves ~2-second finality by having the leader aggregate validator votes into a single BLS12-381 multi-signature. The chain currently runs two shards (reduced from four), tracks Ethereum's EVM fork schedule via a go-ethereum fork, and ships the EIP-2537 BLS12-381 precompile set on-chain.

Every cryptographic component is elliptic-curve: secp256k1 ECDSA transaction signatures, BLS12-381 aggregate consensus signing, libp2p node identity and Noise handshakes for P2P, and BLS12-381 + BN254 EC precompiles for on-chain logic. Additionally, Harmony's VDF-based randomness for shard membership uses RSA-group or class-group constructions that are vulnerable to Shor's algorithm. No PQC migration plan or EC retirement schedule has been published.

## Proposed and Implemented PQC Algorithms

> Harmony does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Harmony in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Harmony in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Harmony in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Harmony in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### VDF-Based Randomness

Harmony uses a [Verifiable Delay Function](https://harmony.one/pdf/whitepaper.pdf) for unbiased randomness in shard membership assignment. Production VDF constructions (Pietrzak / Wesolowski-style) rely on the hardness of computing in RSA groups or class groups. Both of these assumptions fall to Shor's algorithm, making the VDF randomness beacon quantum-vulnerable. A quantum adversary who can predict or manipulate shard assignment would gain disproportionate influence over which validators appear in which shards.

**Current state.** RSA/class-group VDF in production. Quantum-vulnerable.

**Planned future work.** No PQC alternative has been proposed.

### Bridges (Horizon / Cross-Chain)

Harmony's cross-chain bridges rely on multisig and BLS attestations — both EC-based and quantum-vulnerable in the same manner as the consensus layer.

**Current state.** EC-based multisig / BLS attestations. No PQC migration documented.

**Planned future work.** None documented.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No PQC migration plan or EC retirement schedule has been published by Harmony. The chain's cryptographic surface includes secp256k1 (tx signatures), BLS12-381 (consensus + on-chain precompiles), libp2p EC (P2P), RSA/class-group VDF (randomness), and EC bridge attestations — with no path identified toward retiring any of these.

**Current state.** No EC retirement plan on any layer.

**Planned future work.** None identified.

## Governance

Harmony protocol changes are coordinated by the core team and activated via hard fork at scheduled block heights. Validators download and restart with the new binary before the fork block. Exchange and wallet support announcements (such as those via Binance) track fork timings. The [GitHub releases](https://github.com/harmony-one/harmony/releases) page is the canonical source for client versions and release notes. Harmony's [documentation](https://docs.harmony.one/home/general/technology/consensus) and [technical overview](https://open.harmony.one/why-harmony-technical-overview-of-protocols-validators-bridges) are the primary public governance venues.

No PQC-relevant governance proposals have been identified.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
