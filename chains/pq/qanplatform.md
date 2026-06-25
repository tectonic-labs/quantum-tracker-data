# QANplatform (QANX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | QANplatform |
| **Ticker** | QANX |
| **Website** | https://qanplatform.com/ |
| **GitHub** | https://github.com/QANplatform |
| **Twitter/X** | https://x.com/qanplatform |
| **On-chain environment** | QVM (EVM-compatible, multi-language) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | A | ✅ | Shipped |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

QANplatform is a hybrid post-quantum Layer 1 blockchain that signs native transactions with **ML-DSA** (CRYSTALS-Dilithium, NIST FIPS 204) and runs a custom Proof-of-Randomness (PoR) consensus in which validator keys are lattice-based rather than elliptic-curve-based. The chain is also EVM-compatible: alongside its native post-quantum signing path, it accepts ECDSA secp256k1 signatures so that existing Ethereum tooling and wallets can interoperate. The QAN XLINK cross-signature protocol lets Ethereum-compatible wallets such as MetaMask and Trust Wallet interact with ML-DSA keypairs, and a MetaMask integration for ML-DSA-signed transactions shipped in April 2026. The result is a chain whose signature layer, consensus layer, and on-chain verification surface are all post-quantum-capable today.

Because QANplatform keeps elliptic-curve cryptography in place for EVM compatibility, it is a hybrid post-quantum-plus-EC chain rather than a pure post-quantum one. Native accounts default to ML-DSA keys, but ECDSA support remains available for backward compatibility and has no announced removal timeline, so the EC Sunset category is rated as not addressed. The one technical gap on the post-quantum side is P2P networking: node identity is described as post-quantum, but the post-quantum readiness of the transport-encryption layer is not confirmed in public documentation. QANplatform's mainnet had not yet launched as of mid-2026, with launch pending completion of the XLINK and integration audits; the QVM passed a Hacken audit in July 2025.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** (CRYSTALS-Dilithium, FIPS 204) | ECDSA secp256k1 (native signing path) | Tx Signatures, On-Chain | Shipped |
| **ML-DSA** (lattice-based validator keys) | EC validator keys | Consensus | Shipped |

## 1. Transaction Signatures

**Grade: A ✅**

QANplatform signs native transactions with **ML-DSA** (CRYSTALS-Dilithium, NIST FIPS 204), a lattice-based signature scheme that is not vulnerable to Shor's algorithm. Native accounts derive their addresses from post-quantum keys, and multi-signature and account-abstraction flows are supported on the post-quantum key type through the QVM. To preserve EVM compatibility, the chain also accepts ECDSA secp256k1 signatures, with EVM-style addresses derived from elliptic-curve keys; ECDSA is an optional backward-compatibility path rather than the default. The QAN XLINK cross-signature protocol bridges Ethereum-compatible wallets to ML-DSA keypairs, and an April 2026 MetaMask integration makes post-quantum signing accessible through a mainstream EVM wallet.

**Current state.** ML-DSA is the native, default transaction signature scheme. A backward-compatibility layer accepts ECDSA secp256k1 for EVM tooling and existing wallets. The XLINK desktop application is available on Linux, Windows, and macOS, and MetaMask integration for ML-DSA-signed transactions shipped in April 2026.

**Planned future work.** Formal verification tools for smart contracts are scheduled as part of the "Quantum Leap" upgrade (targeted March 2026), and enterprise identity modules are listed on the 2027 roadmap.

## 2. Consensus

**Grade: A ✅**

Consensus runs on Proof-of-Randomness (PoR), a mechanism the project describes as combining proof-of-work and proof-of-stake characteristics. Block validators sign blocks and register their identities using lattice-based post-quantum keys, and validator selection draws on a post-quantum randomness contribution derived from that key material. There is no elliptic-curve fallback in the validator layer, so the consensus surface is post-quantum-native.

**Current state.** PoR consensus with lattice-based validator keys and a post-quantum randomness contribution mechanism is active on the test network. No elliptic-curve cryptography is present in the validator layer.

**Planned future work.** Enhanced randomness-beacon integration is described on the 2026–2027 roadmap.

## 3. P2P Networking

**Grade: D ⚠️**

Node identity on the QANplatform network uses post-quantum keys rather than elliptic-curve keys. However, the transport-encryption layer — the key-exchange and cipher-suite choices used for handshakes and peer communication — is not documented in public materials, so its post-quantum readiness is unconfirmed. As a result this surface is treated as an open, discussed-only area rather than a shipped one.

**Current state.** Post-quantum node-identity keys are deployed in the active network. The post-quantum status of the transport-encryption layer is not publicly documented.

**Planned future work.** Quantum Key Distribution (QKD) network integration is listed on the 2027 roadmap. A public audit clarifying the transport-layer key exchange and cipher suites would resolve this category; no specific implementation commitment for a post-quantum transport upgrade has been identified.

## 4. On-Chain Logic

**Grade: A ✅**

The QAN Virtual Machine (QVM) is EVM-compatible and additionally supports smart contracts written in any Linux-kernel-compatible language (JavaScript, Java, Python, Rust, Go, C++, and others). Critically, the QVM provides native **ML-DSA** (CRYSTALS-Dilithium) signature verification on-chain: smart contracts can verify post-quantum signatures directly through a precompile, without external signing infrastructure. Standard EVM elliptic-curve precompiles (such as `ecrecover`) and hash precompiles (SHA-256, Keccak-256) are also present for EVM backward compatibility; the presence of EC precompiles is an EC Sunset consideration rather than an on-chain-logic gap, because the post-quantum verification path is available natively.

**Current state.** The QVM exposes a native ML-DSA verification precompile and supports both post-quantum and EC signature verification on-chain. The QVM passed a Hacken audit in July 2025.

**Planned future work.** Formal verification tools for smart contracts are scheduled in the "Quantum Leap" upgrade (targeted March 2026), and a dedicated DeFi stack with post-quantum-native operations is on the 2027 roadmap.

## 5. Other Features

**Grade: ➖ Not Applicable**

QANplatform's distinguishing feature — multi-language smart contract support, allowing contracts in any Linux-kernel-compatible language — is a developer-experience capability rather than a cryptographic primitive, so it does not carry an independent post-quantum exposure. The related SignQuantum document-signing product applies post-quantum signatures outside the blockchain context. No chain-specific cryptographic surface (such as a randomness beacon, bridge, or privacy layer) introduces an additional post-quantum exposure that would be rated here.

**Current state.** Multi-language smart contract support is implemented in the QVM. No additional chain-specific cryptographic feature requires a separate rating.

**Planned future work.** None specific to this category.

## 6. EC Sunset

**Grade: F ❌**

QANplatform retains elliptic-curve cryptography for EVM compatibility, and there is no announced plan or timeline to deprecate or remove it. Although native accounts default to post-quantum ML-DSA keys, the chain deliberately keeps an ECDSA secp256k1 path so that existing Ethereum tooling, wallets, and contracts continue to work — and the standard EVM elliptic-curve precompiles (including `ecrecover`) remain available in the QVM. EC support is expected to persist indefinitely as a compatibility layer. Because adding post-quantum cryptography alongside elliptic-curve cryptography is not the same as retiring it, and because no removal plan has been published or discussed, this category is rated as not addressed.

The per-surface picture reflects the hybrid design: the consensus layer is post-quantum-only with no EC, while transaction signing accepts both ECDSA and ML-DSA, and the on-chain logic layer retains EC precompiles alongside post-quantum verification.

**Current state.** ECDSA secp256k1 remains accepted for transactions and EVM tooling, and EVM elliptic-curve precompiles are present in the QVM. No EC retirement has occurred and none has been announced.

**Planned future work.** No elliptic-curve removal timeline has been published. Formal verification tooling on the roadmap may, over time, enable safer post-quantum-only pathways in smart contracts, but this is not a stated EC retirement commitment.

## Governance

QANplatform is developed under a company-led model by QANplatform, with no documented on-chain governance system. The development roadmap is managed internally by the core team, and major upgrades — such as the "Quantum Leap" upgrade targeting formal smart-contract verification tools, and the planned 2027 QKD network integration and enterprise identity modules — are announced and coordinated by the company. Network upgrades that require hard forks depend on validator-operator participation, and the validator set is not yet fully permissionless. Mainnet activation is contingent on completion of an integration audit covering the QVM, XLINK, RPC, database, consensus, governance, and token-economics subsystems.

---

_Generated on 24 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
