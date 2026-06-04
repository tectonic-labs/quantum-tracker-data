# Cellframe (CELL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Cellframe |
| **Ticker** | CELL |
| **Website** | https://cellframe.net/ |
| **GitHub** | https://github.com/demlabs-cellframe |
| **Twitter / X** | https://x.com/cellframenet |
| **On-chain environment** | Custom (conditional transactions / "t-dApps", no EVM) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | A | ✅ | Shipped |
| On-Chain Logic | A | ✅ | Shipped |
| Other Features | A | ✅ | Shipped |
| EC Sunset | A | ✅ | Shipped |

[Cellframe](https://cellframe.net/) is a post-quantum L0 platform that has been lattice-based since mainnet rather than retrofitting from elliptic-curve cryptography. The protocol bakes NIST-standardized PQC primitives — **CRYSTALS-Dilithium** for signatures and **Kyber 512** for key encapsulation — into the base layer, and exposes an algorithm-agile signature framework that supports **Falcon**, **SPHINCS+**, and a wide allocation of algorithm IDs intended to allow hot-swapping of cryptographic primitives without a hard fork.

The L0 base layer handles transaction signing, consensus, and node-to-node networking; an L1 service layer hosts customizable per-application "parachains" with their own rule sets. Smart-contract-style logic is provided through conditional transactions ("t-dApps") rather than an EVM, and there are no elliptic-curve precompiles in the core protocol. Cross-chain bridges may interoperate with EC-based chains at their endpoints, but the Cellframe protocol itself is PQC-native end-to-end. The codebase is written in plain C, targeted at running on devices ranging from servers to constrained IoT hardware.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **CRYSTALS-Dilithium** (ML-DSA) | EC-based signing (ECDSA / Ed25519 / Schnorr) | Tx Signatures, Consensus | Implemented |
| **Falcon** (FN-DSA) | EC-based signing | Tx Signatures | Implemented (multi-algorithm option) |
| **SPHINCS+** (SLH-DSA) | EC-based signing | Tx Signatures | Implemented (multi-algorithm option) |
| **Kyber 512** (ML-KEM) | EC-based key exchange (ECDH) | P2P | Implemented |

## Transaction Signatures

**Grade: A ✅**

Cellframe transactions are signed with **CRYSTALS-Dilithium** (ML-DSA) by default, and the protocol's [pluggable cryptography architecture](https://cellframe.net/) also exposes **Falcon** and **SPHINCS+** as signing options alongside a large reserved space of algorithm IDs intended to allow new schemes to be slotted in over time. Address derivation is built on PQC keys; there is no ECDSA, Schnorr, or Ed25519 fallback path, and no hybrid EC+PQC mode that depends on EC for security. Multiple signature algorithms can be combined per transaction, and algorithm selection is intended to be upgradable without a hard fork.

**Current state.** Dilithium is the default mainnet signature scheme. Multi-algorithm support, including Falcon and SPHINCS+, has been operational since mainnet. Address derivation uses PQC public keys.

**Planned future work.** The algorithm-agility framework is designed to absorb additional PQC schemes as they are standardized, without requiring a hard fork. No specific transaction-signing migration is pending because the chain is already PQC-native.

## Consensus

**Grade: A ✅**

Consensus is Proof-of-Stake, with [validators signing blocks using **CRYSTALS-Dilithium** PQC keys](https://cellframe.net/white-paper/) rather than EC signatures. Validator identities are PQC-native, and consensus rules can be customized per parachain on top of the L0 stability layer. There is no EC signing in the block-production path; finality is achieved through PQC-signed validator consensus.

**Current state.** PQC-native PoS with Dilithium validator signing has been operational on mainnet since launch. Per-parachain consensus customization is implemented.

**Planned future work.** Future consensus changes are intended to be applied via soft-fork mechanisms where possible, taking advantage of the algorithm-agility framework. No EC migration is required because no EC primitives are used in the consensus path.

## P2P Networking

**Grade: A ✅**

The P2P layer is [a custom L0 transport written in plain C](https://cellframe.net/white-paper/), with **Kyber 512** providing key encapsulation in node handshakes and **CRYSTALS-Dilithium** (or another configured PQC algorithm) used for node identity and peer authentication. There is no ECDH or EC-based node-identity layer documented in the protocol; the networking stack is PQC-native by construction.

**Current state.** Kyber 512 KEM in node handshakes, PQC node identity, and the custom L0 transport are all live on mainnet.

**Planned future work.** The protocol is structured to allow swap-in of additional PQC KEM schemes (Kyber variants and future standardized algorithms) without breaking the on-the-wire protocol. No specific networking migration is pending.

## On-Chain Logic

**Grade: A ✅**

Cellframe does not run a traditional smart-contract VM. On-chain logic is expressed through [conditional transactions, also called "t-dApps"](https://cellframe.net/), which run as pluggable service plugins on nodes rather than as bytecode in an EVM. There are no EC precompiles or EC builtins in the core protocol, and the conditional-transaction system can natively reference and verify PQC signatures. Token verification is performed via datum hashes, with the broader signature-verification primitives operating directly on PQC keys.

**Current state.** Conditional transactions and PQC-aware signature verification within transaction logic are live on mainnet. No EVM, no ECDSA-style precompiles, no EC verification path.

**Planned future work.** The t-dApps framework is being expanded to support more complex verifiable computation. Cross-chain bridges may use EC at their endpoints to interoperate with EC-based chains, but the Cellframe protocol's on-chain logic itself remains PQC-native.

## Other Features

### Algorithm Agility Framework

**Current state.** The protocol allocates a large space of algorithm IDs and a [pluggable PQC architecture](https://cellframe.net/white-paper/) intended to allow signature and KEM algorithms to be added or rotated without hard-forking the chain. **CRYSTALS-Dilithium**, **Falcon**, **SPHINCS+**, and **Kyber 512** are all addressable through this framework today.

**Planned future work.** New PQC primitives can be onboarded as they are standardized; the framework is designed to absorb future algorithms without protocol breaks.

### Dual-Layer Sharding

**Current state.** The chain uses a [two-axis sharding design](https://cellframe.net/white-paper/) — transaction sharding and network-node sharding — operational on mainnet. The cryptographic primitives that secure each shard inherit the PQC stack of the L0 layer, so sharding does not introduce a separate EC dependency.

**Planned future work.** Continued scaling work; no separate cryptographic migration scheduled.

### Cross-Chain Bridges

**Current state.** [`bridge.cellframe.net`](https://cellframe.net/) opened to public users on April 18, 2026, in an early-public state with transfers operational; USDC, DAI, BNB, and ETH withdrawals are not yet supported. The Cellframe-side endpoints of the bridge use the chain's PQC stack; bridge endpoints into EC-based chains must use the EC primitives those chains require for compatibility.

**Planned future work.** Withdrawal-asset coverage is expanding from the initial set, and bridge security is being iterated alongside cross-chain protocol improvements. The intent stated in protocol documentation is to keep Cellframe-side bridge cryptography PQC-compatible.

### Fog Computing / Lightweight Execution

**Current state.** The plain-C codebase targets execution on resource-constrained devices, with documented support for IoT hardware and edge deployments as part of a [decentralized cloud / fog-computing posture](https://cellframe.net/).

**Planned future work.** Expansion of fog-computing capabilities for AI and decentralized ML workloads is on the roadmap.

## EC Sunset

**Grade: A ✅**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ✅, Consensus ✅, P2P ✅, On-Chain ✅, Other ✅.

**Current state.** Cellframe has no elliptic-curve cryptography in its core protocol. The L0 base layer was launched PQC-native, and no EC primitives appear in transaction signing, consensus, or networking. There is no EC retirement timeline because there is no EC to retire on the protocol layer.

**Planned future work.** Not applicable on the core protocol. Cross-chain bridge endpoints into EC-based chains will continue to need to speak EC to interoperate with their counterparties; the Cellframe-side protocol surface is intended to remain EC-free.

## Governance

Cellframe is governed in a company-led model by [DemLabs](https://cellframe.net/), with no on-chain proposal or voting system documented. Roadmap authority sits with the core development team. PQC-relevant change discussion lives across the project's [GitHub organization](https://github.com/demlabs-cellframe) and the project's social channels: [Twitter / X](https://x.com/cellframenet), the [main Telegram channel](https://t.me/cellframe), and the [developer-focused Telegram channel](https://t.me/cellframe_dev_en).

Public milestones on the record:

- **2017** — Project founded with PQC-native architecture as a core design principle.
- **2021** — Mainnet launch with **CRYSTALS-Dilithium** and **Kyber 512** support.
- **2026-04-18** — `bridge.cellframe.net` opened to public users in an early-public state.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
