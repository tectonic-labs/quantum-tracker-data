# QRL (QRL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Quantum Resistant Ledger |
| **Ticker** | QRL |
| **Website** | https://www.theqrl.org/ |
| **GitHub** | https://github.com/theqrl |
| **Twitter/X** | https://x.com/qrledger |
| **On-chain environment** | QRL 1.0: transaction-only model (no smart contracts); Project Zond: EVM-compatible PoS successor (testnet) |

## Summary

| Category | Grade | Icon | Status |
|----------|-------|------|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | B | 🔧 | In Development |
| Other Features | A | ✅ | Shipped |
| EC Sunset | ➖ | ➖ | Not Applicable |

QRL is the original purpose-built post-quantum blockchain, launched on mainnet in June 2018. Rather than migrating away from elliptic-curve cryptography, the protocol was architected without it: every transaction signature uses XMSS (the eXtended Merkle Signature Scheme), a hash-based scheme standardized by NIST in SP 800-208. Address derivation hashes the XMSS public key, and no elliptic-curve cryptography is permitted at any layer. The chain runs RandomX Proof-of-Work for consensus, which is hash-based and therefore quantum-safe.

Transaction signatures, consensus, and the protocol's other quantum-safe features (including its PQC-native messaging layer) are all shipped and have run on post-quantum primitives since genesis, earning a top grade in each. On-chain logic is rated In Development: QRL 1.0 has no smart contracts, while Project Zond — the EVM-compatible Proof-of-Stake successor — demonstrates on-chain PQC signature verification on its public testnet but has not yet launched on mainnet. Peer-to-peer networking is rated Discussed: node identity is anchored in XMSS keys, but the post-quantum properties of the transport-layer handshake and key exchange are not yet confirmed in public documentation. Because there is no elliptic curve in the protocol, the EC Sunset category does not apply: there is nothing to retire.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **XMSS** | (PQC-native; no EC predecessor) | Transaction Signatures, Consensus, Other Features | Shipped |
| **SPHINCS+** | (PQC-native; no EC predecessor) | Transaction Signatures (via Project Zond) | In Development |
| **ML-DSA-87** | (PQC-native; no EC predecessor) | On-Chain Logic (Zond on-chain signature verification) | In Development |

## 1. Transaction Signatures

**Grade: A ✅**

**Current state.** Every transaction on QRL is signed with XMSS, a hash-based signature scheme standardized by NIST under SP 800-208. Addresses are derived from a hash of the XMSS public key, and no elliptic-curve cryptography is allowed anywhere in the signing or address-derivation path. There is no native multisig (it can be approximated with P2SH-like constructs at the application layer) and no account abstraction. XMSS-only signing has been live on mainnet since the June 2018 genesis, and after seven years of operation the chain has never required a security hotfix. The codebase has been audited by red4sec and x41 D-Sec.

**Planned future work.** Project Zond, the EVM-compatible Proof-of-Stake successor (testnet live since Q4 2025, mainnet TBD), adds stateless SPHINCS+ signature support alongside XMSS for smart-contract operations, with planned Layer-2 rollup support that inherits the same post-quantum properties.

## 2. Consensus

**Grade: A ✅**

**Current state.** QRL 1.0 uses Proof-of-Work with the RandomX algorithm, a CPU-friendly, ASIC-resistant design. Block production is hash-based and therefore quantum-safe, with miners identified by block hash and randomness supplied implicitly via hash difficulty. Finality follows the standard probabilistic Proof-of-Work model. RandomX Proof-of-Work has been active since the June 2018 genesis.

**Planned future work.** Project Zond transitions consensus from Proof-of-Work to Proof-of-Stake via a dedicated Random Beacon Chain, with validator keys built on post-quantum signatures (XMSS) and instant finality planned through Beacon Chain consensus. The rollout is staged across beacon-chain launch, validator onboarding, hybrid operation, and an eventual Proof-of-Work sunset; Zond testnet consensus rules are live and demonstrate post-quantum validator-key integration.

## 3. P2P Networking

**Grade: D ⚠️**

**Current state.** QRL runs a custom peer-to-peer protocol (not based on libp2p or other common stacks), with seed-node bootstrapping and a gossip protocol for peer propagation. Node identity and peer authentication use XMSS public keys, so node authentication is post-quantum. However, the transport-layer security model — specifically whether the handshake and key exchange use post-quantum-safe schemes — is not fully documented in public sources, so the networking layer cannot yet be confirmed quantum-safe against the full post-quantum threat model.

**Planned future work.** A peer-to-peer layer redesign is expected alongside the Zond consensus migration and is anticipated to include explicit post-quantum key-exchange protocols. Full specification and audit of the handshake are planned before the Zond mainnet launch, and community documentation efforts on the existing P2P layer are underway.

## 4. On-Chain Logic

**Grade: B 🔧**

**Current state.** QRL 1.0 has no smart-contract support and no virtual machine — it follows a transaction-only model — so on-chain signature verification is not applicable on the current mainnet. There are no elliptic-curve precompiles (QRL avoids elliptic curve at all levels); cryptographic hash functions are available as precompiles. Project Zond introduces the QRVM, an EVM-compatible virtual machine with post-quantum extensions, and its testnet (live since Q4 2025) demonstrates built-in on-chain verification of ML-DSA-87 (Dilithium 5) and XMSS signatures. This functionality is not yet live on mainnet.

**Planned future work.** Zond mainnet (TBD 2026) is planned to enable EVM-compatible smart contracts with post-quantum signature-verification precompiles by default. ML-DSA-87 is prioritized for the mainnet launch, while SLH-DSA (SPHINCS+) is deferred to post-mainnet following a February 2026 code-freeze reprioritization across six repositories. Layer-2 rollup support is planned with inherited post-quantum verification. Zond Testnet V2, released 31 March 2026, added ML-DSA-87 integration.

## 5. Other Features

**Grade: A ✅**

**Current state.** QRL includes an Ephemeral Messaging layer: a post-quantum-native messaging system for inter-node communication and on-chain message transactions, signing messages with XMSS keys for quantum-safe communication. An on-chain message-transaction type has been post-quantum-signed since genesis. The ledger is transparent, with no built-in privacy technology such as ring signatures or zk-SNARKs — the design focus is quantum-safety rather than privacy enhancement. Ephemeral Messaging has been a core protocol feature since the June 2018 launch.

**Planned future work.** Project Zond is expected to bring enhanced messaging capabilities with SPHINCS+ support and potential smart-contract-based messaging protocols, along with future cross-chain messaging to Layer-2s that is expected to inherit the same post-quantum properties.

## 6. EC Sunset

**Grade: ➖ Not Applicable**

QRL was designed post-quantum-native from genesis. It has never used elliptic-curve cryptography at any layer — transaction signing, consensus, and node identity have all relied on post-quantum primitives since the June 2018 mainnet launch — so there is no elliptic curve to retire. Project Zond maintains the same elliptic-curve-free design, with no EC support planned or considered. Because there is no legacy EC dependency to remove, this category does not apply.

## Governance

QRL is developed under a Foundation-led model (the QRL Foundation) with community input rather than token-based on-chain voting; the Foundation holds roadmap and merge authority, and community advocacy occurs via Discord, GitHub, and discussion forums. The upgrade culture is conservative and stability-first — hard forks are rare and carefully planned, and the chain has had zero security hotfixes since launch. Project Zond is a major planned upgrade staged as an optional public testnet first, with the eventual QRL 1.0 to Zond transition designed as a trustless, automated chain migration (users claim Zond balances by signing a migration message with their existing XMSS key) rather than a custodial bridge.

- Website: https://www.theqrl.org/
- GitHub: https://github.com/theqrl

---

_Generated on 24 Jun 2026 based on information as of 06 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
