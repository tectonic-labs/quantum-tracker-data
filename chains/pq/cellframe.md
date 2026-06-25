# Cellframe (CELL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Cellframe |
| **Ticker** | CELL |
| **Website** | https://cellframe.net/ |
| **GitHub** | https://github.com/demlabs-cellframe |
| **Twitter/X** | https://x.com/cellframenet |
| **On-chain environment** | Custom L0 protocol (no EVM); conditional transactions / "t-dApps" |

## Summary

| Category | Grade | Icon | Status |
|----------|-------|------|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | A | ✅ | Shipped |
| On-Chain Logic | A | ✅ | Shipped |
| Other Features | A | ✅ | Shipped |
| EC Sunset | ➖ | ➖ | Not Applicable |

Cellframe is a post-quantum-native Layer-0 blockchain platform built in plain C and designed from genesis to run on NIST-standardized post-quantum cryptography. Rather than migrating away from elliptic-curve cryptography, the protocol was architected without it: CRYSTALS-Dilithium (ML-DSA) provides transaction and validator signatures, and Kyber 512 provides key encapsulation for the networking layer. The base layer (L0) handles quantum-safe encryption, consensus, and sharding, while a service layer hosts application-specific "parachains" with customizable rules.

Across all five technical exposure categories — transaction signatures, consensus, peer-to-peer networking, on-chain logic, and other features — our evaluation finds the protocol already running on post-quantum primitives, earning a top grade in each. Because there is no elliptic curve in the core protocol, the EC Sunset category does not apply: there is nothing to retire. An algorithm-agility design supports hot-swapping cryptographic schemes (including Falcon and SPHINCS+, across a large algorithm-ID space) without hard forks, positioning the chain to adopt future post-quantum standards as they evolve.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **CRYSTALS-Dilithium (ML-DSA)** | (PQC-native; no EC predecessor) | Transaction Signatures, Consensus | Shipped |
| **Falcon** | (PQC-native; no EC predecessor) | Transaction Signatures | Shipped |
| **SPHINCS+** | (PQC-native; no EC predecessor) | Transaction Signatures | Shipped |
| **Kyber 512** | (PQC-native; no EC predecessor) | P2P Networking | Shipped |

## 1. Transaction Signatures

**Grade: A ✅**

**Current state.** Transactions are signed with CRYSTALS-Dilithium (ML-DSA) by default, with no elliptic-curve requirement anywhere in the signing or address-derivation path. The pluggable cryptographic architecture also supports Falcon, SPHINCS+, and other post-quantum schemes, and multiple signature algorithms can be combined within a single transaction. A large algorithm-ID space (65,536 IDs) underpins algorithm hot-swap and custom cryptographic combinations. Dilithium has been the default since the first protocol versions, and multi-algorithm support has been operational since mainnet launch.

**Planned future work.** Algorithm agility was designed in from genesis; the roadmap supports continuous algorithm updates without hard forks, allowing new post-quantum signature schemes to be adopted as standards mature.

## 2. Consensus

**Grade: A ✅**

**Current state.** Cellframe uses Proof-of-Stake with consensus rules that can be customized per parachain. Validators sign blocks with Dilithium post-quantum keys, and validator identity is itself Dilithium-based — there is no elliptic-curve cryptography in block production. Finality is deterministic, established through post-quantum-signed validator consensus. PQC-native PoS and Dilithium validator signing have been active since genesis.

**Planned future work.** Consensus rules remain customizable per parachain without affecting L0 stability, and the protocol-agnostic design allows consensus upgrades to be delivered through soft-fork mechanisms where possible.

## 3. P2P Networking

**Grade: A ✅**

**Current state.** The networking layer runs a custom L0 protocol written in plain C. Node identity and peer authentication use post-quantum keys (Dilithium or configurable), and node handshakes use the Kyber 512 key encapsulation mechanism for transport encryption and key exchange. Peer discovery is secured via the same post-quantum node-identity keys. There is no elliptic-curve cryptography in the networking stack; the Kyber 512 KEM has been operational in node handshakes on mainnet.

**Planned future work.** The architecture retains flexibility to adopt additional or successor post-quantum key-encapsulation schemes (Kyber variants and future KEMs) as they are standardized.

## 4. On-Chain Logic

**Grade: A ✅**

**Current state.** Cellframe does not use a traditional smart-contract VM; instead it offers conditional transactions ("t-dApps") implemented as service plugins running on nodes. There is no EVM and no elliptic-curve precompiles in the core protocol. Token verification is performed via datum hash using post-quantum-compatible hash functions, and conditional-transaction logic can natively reference and verify post-quantum signatures. Conditional transactions and on-chain PQC signature verification are operational on mainnet.

**Planned future work.** The roadmap includes expanding the t-dApps framework toward more complex verifiable computation, alongside cross-chain bridge improvements. Bridge endpoints may use elliptic-curve cryptography when connecting to EC-based external chains for interoperability, but the Cellframe L0 protocol itself remains post-quantum-native.

## 5. Other Features

**Grade: A ✅**

**Current state.** The variable-cryptography architecture allows algorithm hot-swap without hard forks, backed by a large algorithm-ID space supporting continuous cryptographic updates. The platform implements dual-layer sharding — splitting both transactions and network nodes — for scalability, and supports lightweight execution on resource-constrained "fog computing" devices. Cross-chain bridge infrastructure is live; as noted above, bridge endpoints may use elliptic-curve cryptography only where required to interoperate with EC-based chains, while the L0 protocol stays post-quantum-native. As of April 2026 the public bridge opened to users, with some external-asset withdrawals not yet enabled at that early-public stage.

**Planned future work.** Planned work includes expanding fog-computing capabilities for AI and decentralized ML workflows and enhancing cross-chain bridge security with post-quantum-compatible protocols.

## 6. EC Sunset

**Grade: ➖ Not Applicable**

Cellframe was designed post-quantum-native from genesis. There is no elliptic-curve cryptography in the core protocol — consensus, networking, and transaction signing have all used post-quantum primitives since launch — so there is no elliptic curve to retire. The only place EC may appear is at cross-chain bridge endpoints connecting to external EC-based chains, which is an interoperability boundary rather than a property of the Cellframe protocol itself. Because there is no legacy EC dependency to remove, this category does not apply.

## Governance

Cellframe is developed by DemLabs, which coordinates a developer-driven roadmap; there is no formal on-chain governance vote for protocol direction, though an on-chain Decree system propagates validator-signed parameter and protocol changes network-wide. Protocol upgrades favor soft-fork mechanisms where possible, and the algorithm-agility design minimizes the need for hard forks.

- Website: https://cellframe.net/
- White paper: https://cellframe.net/white-paper/
- GitHub: https://github.com/demlabs-cellframe

---

_Generated on 24 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
