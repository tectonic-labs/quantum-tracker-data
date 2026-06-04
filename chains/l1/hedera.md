# Hedera (HBAR) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Hedera |
| **Ticker** | HBAR |
| **Website** | https://hedera.com |
| **GitHub** | https://github.com/hashgraph |
| **On-chain environment** | EVM (via Hyperledger Besu Smart Contract Service) |
| **Mainnet genesis** | 2019-09-16 |
| **Current mainnet version** | hiero-consensus-node ~v0.72.x (v0.74.0 targeting June 2026) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Hedera uses Hashgraph consensus (asynchronous BFT) rather than a traditional blockchain. All user transactions and consensus events are signed with Ed25519 or ECDSA secp256k1 — both vulnerable to Shor's algorithm. Hedera was architecturally designed with pluggable cryptography, meaning signature algorithm swaps do not require deep protocol rewrites. The network uses SHA-384 hashing throughout (events, certificates, state proofs), which is quantum-resistant for preimage and collision attacks. However, no PQC signature algorithms have been implemented in the core protocol, and no formal migration timeline has been published. A [SEALSQ partnership](https://www.sealsq.com/investors/news-releases/sealsq-partnering-with-hedera-in-the-next-generation-of-post-quantum-semiconductors) for quantum-safe hardware (QS7001 chips) was announced in late 2024, signaling infrastructure-level interest but not a protocol-level commitment.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA-65** (Dilithium / FIPS 204) | Ed25519, ECDSA secp256k1 | Tx Signatures | Discussed (ecosystem project only — third-party agent identity, not core protocol) |

No PQC algorithm libraries have been found in the `hedera-services` codebase. The only PQC-related activity in the Hedera ecosystem is an [ecosystem project PR](https://github.com/hashgraph/awesome-hedera/pull/35) referencing ML-DSA-65 for agent identity certificates in a third-party "Swarm Spawner" project. Hedera has publicly acknowledged NIST's finalization of ML-DSA, FN-DSA (Falcon), and SLH-DSA (SPHINCS+) as candidate algorithms for future adoption, but has not committed to a specific scheme.

## 1. Transaction Signatures

**Grade: F ❌**

Hedera supports two key types for user transactions:

- **Ed25519** — EdDSA over Curve25519. Used for native Hedera workflows and HCS topics.
- **ECDSA secp256k1** — Added via [HIP-222](https://hips.hedera.com/HIP/hip-222.html) for EVM ecosystem alignment. Signing uses keccak256 hash of the transaction body, mirroring Ethereum's model.

Both are elliptic curve schemes, vulnerable to Shor's algorithm on a cryptographically relevant quantum computer. No PQC signature schemes are currently supported for on-ledger transactions. Multi-key accounts with threshold signing are supported, but all component keys remain EC-based.

**Current state.** All mainnet transactions use Ed25519 or ECDSA secp256k1 exclusively. No PQC transaction signatures exist on mainnet, testnet, or in any known Hedera fork.

**Planned future work.** Hedera's pluggable cryptography architecture is designed to make PQC algorithm swaps straightforward once adopted. No HIP (Hedera Improvement Proposal) for PQC transaction signatures has been published.

## 2. Consensus

**Grade: D ⚠️**

Hedera's Hashgraph consensus is asynchronous BFT (aBFT). Nodes exchange signed "events" via gossip-about-gossip, building a directed acyclic graph (DAG). Virtual voting infers consensus without explicit round-trip messages. The cryptographic components:

- **Event signing**: Consensus events are signed using Ed25519 (or ECDSA secp256k1). Each event includes a timestamp, parent hashes, transactions, and a signature — all EC-based and quantum-vulnerable.
- **Hashing**: Events and consensus use SHA-384 hashing throughout. SHA-384 is quantum-resistant for preimage resistance (Grover provides at most quadratic speedup, leaving ~192-bit security). This is a deliberate design choice — the entire event history is cryptographically bound via 384-bit hashes.
- **Migration architecture**: Hedera was explicitly designed so that signature algorithm swaps do not require deep protocol changes. The protocol does not hard-code one signature scheme; cryptography is configurable. This lowers the engineering barrier to PQC migration compared to most L1s.

**Current state.** Event signing relies entirely on Ed25519/ECDSA secp256k1. The hashing layer (SHA-384) is quantum-resistant, but the signature layer is not.

**Planned future work.** Hedera has described its architecture as PQC-ready and follows NIST standardization closely, but no HIP or testnet experiment for PQC consensus signatures has been published. The SEALSQ hardware partnership may provide an infrastructure substrate, but protocol-level changes have not been specified.

## 3. P2P Networking

**Grade: D ⚠️**

Hedera's node-to-node communication layer:

- **TLS transport**: All gossip communication is encrypted with TLS 1.2 / 1.3.
- **Node identity**: Each node presents a TLS certificate issued by Hedera. The certificate hash (SHA-384) is published on-ledger for peer verification.
- **Hashing**: Certificate hashes use SHA-384, which is quantum-resistant against preimage and collision attacks.
- **Vulnerability**: The TLS certificate's signing key (ECDSA or RSA) is broken by Shor's algorithm. A quantum attacker who forges a TLS certificate could impersonate nodes. TLS 1.3 deprecates RSA signature use in favor of ECDSA, but both are EC-vulnerable.

**Current state.** TLS certificates use EC/RSA signing keys. No PQC-based TLS (e.g., using ML-DSA or FN-DSA for certificate signing) has been deployed or tested.

**Planned future work.** No proposal or HIP for post-quantum TLS has been published. Certificate infrastructure migration would likely need to coincide with transaction signature PQC adoption.

## 4. On-Chain Logic

**Grade: D ⚠️**

Hedera's Smart Contract Service runs the EVM via Hyperledger Besu, supporting Solidity smart contracts. Available cryptographic primitives:

- **EVM precompiles**: ECRECOVER (ECDSA secp256k1 public key recovery), SHA-256, SHA-3, RIPEMD-160. ECRECOVER is EC-vulnerable; the hashing precompiles are quantum-resistant.
- **System contracts** ([HIP-632](https://hips.hedera.com/HIP/hip-632.html)): Hedera provides system contracts at reserved EVM addresses exposing HAPI functions, including `isAuthorizedRaw()` for Ed25519 signature verification on-chain.
- **No PQC precompiles**: There are no ML-DSA, FN-DSA, or SLH-DSA verification precompiles. Smart contracts cannot verify NIST-standard PQC signatures on-chain.
- **Native services**: HCS topics and HTS token operations rely on the same Ed25519/ECDSA stack with no on-chain PQC verification capability.

**Current state.** No PQC verification is available on-chain. All signature verification (EVM precompiles and system contracts) is EC-based.

**Planned future work.** No HIP for PQC precompiles or system contract extensions has been published. Hedera would need to add PQC verification primitives to support quantum-safe smart contract interactions.

## 5. Other Features

**Grade: D ⚠️**

Hedera offers native services beyond smart contracts, each with distinct cryptographic dependencies:

- **Hedera Consensus Service (HCS)**: Decentralized timestamping and ordering for cross-application workflows. Inherits Ed25519/ECDSA vulnerability from the consensus layer.
- **Hedera Token Service (HTS)**: Native token creation with admin keys for mint, burn, transfer, and freeze operations — all signed with Ed25519/ECDSA. No privacy-enhancing cryptography (ring signatures, zk-SNARKs) is used; tokens are fully transparent on-ledger.
- **SEALSQ partnership**: Hedera announced a collaboration with [SEALSQ Corp](https://www.sealsq.com/investors/news-releases/sealsq-partnering-with-hedera-in-the-next-generation-of-post-quantum-semiconductors) (December 2024) to integrate quantum-resistant hardware via the QS7001 platform. SEALSQ was in quality/functional testing for production launch in 2025. This signals infrastructure-level preparation for PQC, though no mainnet integration timeline has been announced.
- **No privacy tech at risk**: Unlike chains with ring signatures or zk-SNARKs, Hedera has no privacy-enhancing cryptography that would be retroactively compromised by quantum computers.

**Current state.** All native services (HCS, HTS) depend on the same EC-based signing stack. The SEALSQ hardware partnership is the most concrete PQC-adjacent activity.

**Planned future work.** No protocol-level proposal for PQC integration into native services has been published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Hedera's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ⚠️, P2P ⚠️, On-Chain ⚠️, Other ⚠️.

Hedera has no formal timeline for removing Ed25519 or ECDSA secp256k1 from the protocol. Hedera's Chief Scientist, Leemon Baird (inventor of Hashgraph), has [publicly compared](https://decrypt.co/11289/quantum-computing-hedera-bitcoin-bitcoin-safety) quantum breaks on signatures to Y2K — a solvable problem with sufficient lead time — reflecting confidence in migration capability without committing to a specific timeline or algorithm.

Key factors for Hedera's EC sunset posture:

- **Pluggable cryptography**: The protocol was designed so signature algorithms are configuration parameters, not hard-coded protocol rules. This lowers the barrier to adding PQC and potentially deprecating EC, but no plan to exercise this capability has been published.
- **NIST alignment**: Hedera follows the CNSA (Commercial National Security Algorithm) standard and acknowledges NIST's 2024 finalization of ML-DSA, FN-DSA, and SLH-DSA. No commitment to adopt a specific NIST scheme has been made.
- **Council governance**: The Hedera Council (31 global enterprises including Google, IBM, Dell, Boeing) must approve protocol changes. Council members have quantum-aware security strategies across their portfolios, which may accelerate PQC adoption, but no council vote or resolution on PQC migration has been disclosed.
- **EVM precompiles**: ECRECOVER and Ed25519 verification via system contracts would need removal or replacement as part of a full EC sunset.

**Current state.** No EC removal is planned or scheduled. No HIP addresses EC deprecation.

**Planned future work.** None published. A phased migration — adding PQC algorithms first, then deprecating EC — would align with Hedera's architectural design but requires a council-approved HIP and network upgrade.

## Governance

Hedera's protocol changes follow the [HIP (Hedera Improvement Proposal)](https://hips.hedera.com/) process. Proposals are submitted by the community or Hedera staff, debated publicly, and approved by the Hedera Council (31 members with equal voting rights, 3-year terms, max 2 consecutive). Major network upgrades require council majority vote.

No PQ-specific HIPs have been published. Relevant existing HIPs:

- [HIP-222](https://hips.hedera.com/HIP/hip-222.html) — Support for ECDSA (secp256k1) keys. Status: Final. Added the second EC key type alongside Ed25519.
- [HIP-632](https://hips.hedera.com/HIP/hip-632.html) — Hedera Account Service (HAS) System Contract. Status: Final. Provides on-chain Ed25519 verification.

Reference sources:

- [Hedera Post-Quantum Crypto Blog](https://hedera.com/blog/post-quantum-crypto/)
- [Are Ed25519 Keys Quantum-Resistant? — Hedera](https://hedera.com/blog/are-ed25519-keys-quantum-resistant-exploring-the-future-of-cryptography/)
- [Hedera Keys and Signatures Docs](https://docs.hedera.com/hedera/core-concepts/keys-and-signatures)
- [SEALSQ and Hedera Partner on Quantum-Resistant Semiconductors](https://www.sealsq.com/investors/news-releases/sealsq-partnering-with-hedera-in-the-next-generation-of-post-quantum-semiconductors)
- [Leemon Baird on Quantum Computing — Decrypt](https://decrypt.co/11289/quantum-computing-hedera-bitcoin-bitcoin-safety)
- [NIST Post-Quantum Cryptography Standardization](https://csrc.nist.gov/projects/pqc-dig-sig)
- [Hedera Governing Council Overview](https://hederacouncil.org/)

---

_Generated on 07 May 2026 based on information as of 07 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
