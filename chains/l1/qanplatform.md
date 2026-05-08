# QANplatform (QANX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | QANplatform |
| **Ticker** | QANX |
| **Website** | https://qanplatform.com/ |
| **GitHub** | https://github.com/QANplatform |
| **Twitter / X** | https://x.com/qanplatform |
| **On-chain environment** | EVM-compatible (QVM) with multi-language smart contract support |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | A | ✅ | Shipped |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

[QANplatform](https://qanplatform.com/) is a hybrid Layer 1 blockchain built around **ML-DSA** (CRYSTALS-Dilithium, NIST FIPS 204) as its native transaction signature scheme, paired with a custom Proof-of-Randomness (PoR) consensus that uses lattice-based validator keys. The chain is EVM-compatible through the QAN Virtual Machine (QVM), which exposes both native **ML-DSA** signature verification and the standard EVM elliptic-curve precompiles so that Solidity tooling and existing EC-based wallets continue to work alongside PQC-first accounts. The QVM additionally supports smart contracts written in any Linux-kernel language (JavaScript, Java, Python, Rust, Go, C++, etc.) in addition to Solidity.

QANplatform's posture is "PQC-first with EC retained for EVM compatibility." Transaction signing, consensus, and on-chain signature verification are all PQC-native today, while EC code paths (ECDSA secp256k1, the standard EVM EC precompiles) are kept indefinitely as an interoperability layer with no published deprecation timeline. The "Quantum Leap" upgrade scheduled for March 15, 2026 adds formal-verification tooling for smart contracts, and the published 2027 roadmap includes Quantum Key Distribution (QKD) network integration, enterprise identity modules, and a dedicated DeFi stack.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** (CRYSTALS-Dilithium) | ECDSA secp256k1 | Tx Signatures, Consensus, On-Chain | Implemented |

## Transaction Signatures

**Grade: A ✅**

QANplatform's native transaction signature scheme is **ML-DSA** (CRYSTALS-Dilithium, NIST FIPS 204). Native accounts derive their addresses from lattice-based PQC public keys, and **ML-DSA** is the default signing path. ECDSA secp256k1 is also accepted in parallel so that EVM-derived addresses and existing Ethereum tooling can continue to interact with the chain without modification, but the EC path is an opt-in compatibility layer rather than a security dependency for the PQC accounts. Multi-signature and account-abstraction patterns are supported on both signature types.

**Current state.** **ML-DSA** signing is live on mainnet as the default scheme, with ECDSA secp256k1 retained as a parallel option for EVM compatibility. [MetaMask integration for **ML-DSA**-signed transactions](https://qanplatform.com/) shipped in April 2026, exposing PQC signing through the dominant EVM wallet, and the [QAN XLINK desktop application](https://qanplatform.com/) is available on Linux, Windows, and macOS.

**Planned future work.** The Quantum Leap upgrade scheduled for March 15, 2026 introduces formal-verification tooling for smart contracts, and enterprise identity modules are on the published 2027 roadmap.

## Consensus

**Grade: A ✅**

Consensus runs on Proof-of-Randomness (PoR), QANplatform's hybrid mechanism that combines elements of proof-of-work and proof-of-stake. Block validators register and sign blocks using lattice-based PQC keys, and the randomness contribution that drives validator selection is derived from PQC key material. There is no EC fallback in the validator layer — block production, validator identity, and finality are all PQC-native.

**Current state.** PoR with lattice-based validator keys is operational on mainnet, and the PQC randomness-contribution mechanism is active in production.

**Planned future work.** Enhanced randomness-beacon work is documented in the 2026–2027 horizon. No EC migration is required in the consensus path because no EC primitives are used there.

## P2P Networking

**Grade: D ⚠️**

The networking layer uses PQC-based keys for node identity, so peers identify each other through lattice-based public keys rather than EC keys. The transport-layer encryption used for the actual on-the-wire handshake (TLS or an equivalent KEM-based handshake) is not documented in public sources, so the PQC status of transport encryption is currently unconfirmed.

**Current state.** PQC node-identity keys are deployed across the active network. Peer discovery uses these PQC node identities. The transport encryption that protects connection establishment between nodes has no public PQC commitment on record.

**Planned future work.** [QKD (quantum key distribution) network integration](https://qanplatform.com/) is on the published 2027 roadmap as a longer-horizon networking enhancement.

## On-Chain Logic

**Grade: A ✅**

The QAN Virtual Machine (QVM) is EVM-compatible and additionally supports smart contracts written in any Linux-kernel language. On the cryptographic side, the QVM exposes a native **ML-DSA** signature-verification precompile, so smart contracts can verify PQC signatures on-chain without external signing services. The standard EVM EC precompiles (ecrecover, sha256, etc.) are also present for backward compatibility — their continued presence is an EC-Sunset concern rather than a gap in PQC verification capability.

**Current state.** Native **ML-DSA** signature verification is available to QVM contracts on mainnet. Solidity tooling, the standard EVM precompile set, and the multi-language smart-contract engine are all live.

**Planned future work.** Formal-verification tooling for smart contracts is part of the Quantum Leap upgrade scheduled for March 15, 2026, and a dedicated DeFi stack with PQC-native operations is on the 2027 roadmap.

## Other Features

QANplatform does not support any special features.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ✅, Consensus ✅, P2P ⚠️, On-Chain ✅, Other ➖.

**Current state.** QANplatform retains ECDSA secp256k1 acceptance for transactions and keeps the standard EVM elliptic-curve precompiles (ecrecover and friends) inside the QVM to preserve EVM tooling and wallet compatibility. The consensus and validator-identity layer is PQC-only with no EC code paths. There is no announced deprecation or removal timeline for the EC surface area; the public posture is that EC is expected to remain indefinitely as a compatibility layer.

**Planned future work.** No EC retirement schedule is published. Formal-verification tooling arriving with the Quantum Leap upgrade may make PQC-only contract pathways more practical to express, but it is not framed as an EC-sunset mechanism.

## Governance

QANplatform is governed in a company-led model by the QANplatform team, with no on-chain proposal or voting system documented. Public discussion of PQC-relevant changes lives across the project's [official site](https://qanplatform.com/), [GitHub organization](https://github.com/QANplatform), [Twitter / X account](https://x.com/qanplatform), and [Telegram channel](https://t.me/QANplatform).

Dated milestones on the public record:

- **March 15, 2026** — Quantum Leap upgrade scheduled, introducing formal-verification tooling for smart contracts.
- **April 2026** — MetaMask integration for **ML-DSA**-signed transactions and QAN XLINK desktop app released for Linux, Windows, and macOS.
- **2027** — QKD network integration, enterprise identity modules, and dedicated DeFi stack on the published roadmap.

---

_Generated on 08 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
