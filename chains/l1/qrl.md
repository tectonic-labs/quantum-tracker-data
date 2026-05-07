# Quantum Resistant Ledger (QRL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Quantum Resistant Ledger |
| **Ticker** | QRL |
| **Website** | https://www.theqrl.org/ |
| **GitHub** | https://github.com/theqrl |
| **On-chain environment** | Custom (EVM coming via Project Zond) |
| **Mainnet genesis** | 2018-06-26 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | B | 🔧 | In Development |
| Other Features | A | ✅ | Shipped |
| EC Sunset | A | ✅ | Shipped |

QRL is the oldest purpose-built post-quantum blockchain, launched on mainnet in June 2018 with [XMSS](https://www.rfc-editor.org/rfc/rfc8391) (eXtended Merkle Signature Scheme) as the sole signature scheme — a hash-based algorithm recognized by NIST (SP 800-208). No elliptic-curve cryptography has ever been used at any protocol layer. The codebase has been audited by red4sec and x41 D-sec, and the chain has operated for nearly eight years without a security hotfix. [Project Zond](https://www.theqrl.org/blog/project-zond-progress-report-q4-2024/) (testnet live Q4 2025) extends QRL with an EVM-compatible VM, proof-of-stake consensus using PQC validator keys, and on-chain PQC signature verification via precompiles.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **XMSS** (NIST SP 800-208) | — (native from genesis) | Tx Signatures, Consensus, P2P | Shipped (mainnet, June 2018) |
| **ML-DSA-87** (Dilithium 5 / FIPS 204) | — (new capability) | On-Chain Logic | In Development (Zond Testnet V2, March 2026) |
| **SPHINCS+** / SLH-DSA | — (new capability) | Tx Signatures, On-Chain Logic | Planned (deferred to post-Zond-mainnet) |

## 1. Transaction Signatures

**Grade: A ✅**

QRL transactions are signed exclusively with XMSS, a stateful hash-based signature scheme standardized in [NIST SP 800-208](https://csrc.nist.gov/pubs/sp/800-208/final) and [RFC 8391](https://www.rfc-editor.org/rfc/rfc8391). This has been the case since mainnet genesis in June 2018. Addresses are derived from hashes of XMSS public keys; no EC-based address type exists or has ever existed. ECDSA, Schnorr, and other EC signature schemes are not supported and cannot be used.

Project Zond will add SPHINCS+ (SLH-DSA) as a stateless hash-based alternative for smart contract operations alongside XMSS, though SLH-DSA has been deferred to post-mainnet following a February 2026 code freeze that prioritized ML-DSA-87 for NIST compliance at Zond launch.

**Current state.** All mainnet transactions use XMSS. PQC-native from genesis.

**Planned future work.** Zond adds SPHINCS+ as an additional PQC signature option (post-mainnet).

## 2. Consensus

**Grade: A ✅**

QRL currently runs proof-of-work using the RandomX algorithm — a CPU-friendly, ASIC-resistant hash-based mining scheme. Block selection is determined by hash difficulty; miners are identified by block hash rather than by signing keys. Hash functions are not broken by Shor's algorithm; Grover's provides at most a quadratic speedup against hash functions, reducing security but not breaking it at current key sizes.

Project Zond transitions QRL from PoW to proof-of-stake via a Random Beacon Chain. Validators will use PQC keys (XMSS/SPHINCS+) for block signing and identity, maintaining quantum resistance through the consensus migration.

**Current state.** PoW with RandomX. Hash-based and quantum-safe. No EC in the consensus path.

**Planned future work.** Zond PoS with PQC validator keys. Multi-phase rollout: beacon chain, validator onboarding, hybrid operation, eventual PoW sunset.

## 3. P2P Networking

**Grade: D ⚠️**

QRL uses a custom P2P protocol (not based on libp2p or devp2p). Node identity is authenticated using XMSS public keys, providing PQC-based node authentication. However, the full transport layer security model — particularly key exchange and session encryption — is not fully documented in public sources. Whether the handshake uses a PQC-safe key encapsulation mechanism (e.g., ML-KEM/Kyber) has not been publicly confirmed.

**Current state.** Node identity is PQC (XMSS). Transport encryption details are not yet verified against a post-quantum threat model.

**Planned future work.** Zond includes a P2P layer redesign alongside the consensus migration, expected to include explicit PQC key exchange protocols. Full specification and audit of the P2P handshake is planned before Zond mainnet launch.

## 4. On-Chain Logic

**Grade: B 🔧**

QRL 1.0 has no smart contract support — it is a transaction-only model with no VM. Project Zond introduces the QRVM, an EVM-compatible virtual machine with PQC extensions. The QRVM includes built-in precompiles for verifying ML-DSA-87 (Dilithium 5) and XMSS signatures on-chain. No EC precompiles (ecrecover, etc.) exist or are planned.

Zond Testnet V1 shipped in Q4 2025 with QRVM and PQC signature verification precompiles. Zond Testnet V2 followed on March 31, 2026 with ML-DSA-87 integration. A February 13, 2026 code freeze across six repositories prioritized ML-DSA-87 for NIST compliance at mainnet launch, deferring SLH-DSA (SPHINCS+) to post-mainnet.

**Current state.** On-chain PQC signature verification is live on Zond testnet. Not yet on mainnet.

**Planned future work.** Zond mainnet launch (TBD 2026) with EVM-compatible smart contracts and PQC verification precompiles enabled by default. L2 rollup support planned with inherited PQC properties.

## 5. Other Features

**Grade: A ✅**

QRL includes an Ephemeral Messaging Layer — a PQC-native messaging system for inter-node communications and on-chain message transactions. Messages are signed with XMSS keys, providing quantum-safe communication as a core protocol feature since mainnet launch.

QRL uses a transparent ledger model with no built-in privacy tech (ring signatures, zk-SNARKs, etc.), so there are no additional quantum-vulnerable cryptographic constructions to address.

## 6. EC Sunset

**Grade: A ✅**

> Adding PQC alongside EC is not the same as retiring EC. For reference, QRL's PQC-adoption ratings per category are: Tx Signatures ✅, Consensus ✅, P2P ⚠️, On-Chain 🔧, Other ✅.

QRL never used elliptic-curve cryptography at any protocol layer. The chain was designed PQC-native from genesis (June 2018). There are no EC precompiles, EC address types, EC signature opcodes, or EC key exchange mechanisms to sunset. Project Zond maintains this EC-free design — no EC support is planned or under consideration.

This makes QRL one of the very few blockchains where EC sunset is already complete by virtue of never having adopted EC in the first place.

## Governance

QRL is governed by the QRL Foundation, which maintains roadmap authority and makes final decisions on protocol changes. There is no token-based on-chain governance mechanism. Community input flows through [Discord](https://theqrl.org/discord), [GitHub](https://github.com/theqrl), and [Telegram](https://t.me/QRLedgerOfficial). The project has a conservative upgrade culture — zero security hotfixes in nearly eight years of operation. Hard forks are rare and carefully staged (Zond is deployed as an opt-in testnet first).

PQ-relevant milestones:

- **June 2018**: Mainnet launch with XMSS-only signature architecture.
- **Q4 2025**: Zond Testnet V1 with QRVM, PQC signature verification precompiles, and EVM compatibility.
- **February 2026**: Code freeze across six repositories to prioritize ML-DSA-87 for NIST compliance.
- **March 2026**: Zond Testnet V2 with ML-DSA-87 integration.
- **TBD 2026**: Zond mainnet launch.

---

_Generated on 07 May 2026 based on information as of 07 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
