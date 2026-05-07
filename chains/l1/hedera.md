# Hedera (HBAR) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Hedera |
| **Ticker** | HBAR |
| **Website** | <https://hedera.com/> |
| **GitHub** | <https://github.com/hashgraph> |
| **Twitter / X** | <https://x.com/hedera> |
| **On-chain environment** | EVM (Smart Contract Service via Hyperledger Besu) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Hedera is a [Hashgraph](https://hedera.com/blog/post-quantum-crypto/) (asynchronous Byzantine Fault Tolerant) network governed by the [Hedera Council](https://hederacouncil.org/), a 31-member body of global enterprises (Google, IBM, Dell, Boeing, EDF, LG, and others). The platform's user-facing signature schemes are Ed25519 and ECDSA secp256k1 (the latter introduced via [HIP-222](https://hips.hedera.com/HIP/hip-222.html) for EVM compatibility), and these are the schemes that Hashgraph events themselves are signed with. The Smart Contract Service runs an [EVM via Hyperledger Besu](https://docs.hedera.com/hedera/core-concepts/smart-contracts/understanding-hederas-evm-differences-and-compatibility) and exposes the standard Ethereum precompile set (ecrecover, SHA-256, SHA-3, RIPEMD-160) plus the [Hedera Account Service system contract introduced in HIP-632](https://hips.hedera.com/HIP/hip-632.html), which adds an `isAuthorizedRaw()` interface for verifying Ed25519 signatures on Hedera-native accounts. None of the verification primitives is post-quantum.

Hedera frames itself as quantum-aware by design: SHA-384 hashing (rather than 256-bit) is used for event hashing, certificate hashes, and ledger-binding constructions, and [public material](https://hedera.com/blog/are-ed25519-keys-quantum-resistant-exploring-the-future-of-cryptography/) describes the cryptographic-algorithm choice as a configuration parameter rather than a hard-coded protocol element to make future swaps easier. In December 2024, Hedera and [SEALSQ announced a partnership](https://www.sealsq.com/investors/news-releases/sealsq-partnering-with-hedera-in-the-next-generation-of-post-quantum-semiconductors) to integrate the QS7001 quantum-safe semiconductor platform; SEALSQ is in the qualification phase ahead of production. No PQC algorithm libraries have landed in `hedera-services` and no consensus or transaction-layer PQ migration timeline has been announced.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** (Dilithium) | Ed25519 | Other (ecosystem; agent-identity certificates in [Swarm Spawner](https://github.com/hashgraph/awesome-hedera/pull/35)) | Discussed (ecosystem listing PR; not core protocol) |

The [SEALSQ QS7001 hardware partnership](https://www.sealsq.com/investors/news-releases/sealsq-partnering-with-hedera-in-the-next-generation-of-post-quantum-semiconductors) targets infrastructure rather than a specific protocol-layer signature scheme, and Hedera has not publicly committed to a NIST post-quantum signature algorithm.

## 1. Transaction Signatures

**Grade: F ❌**

Hedera transactions are signed with [Ed25519 or ECDSA secp256k1](https://docs.hedera.com/hedera/core-concepts/keys-and-signatures); ECDSA support was added by [HIP-222](https://hips.hedera.com/HIP/hip-222.html) for EVM-ecosystem alignment. Both schemes are elliptic-curve-based and quantum-vulnerable. Multi-key threshold accounts are supported, but each component key is one of these two EC schemes. Hedera's general framing — that algorithm choice is a configuration parameter rather than a protocol hard-coded value — is described in [Hedera's post-quantum-cryptography blog](https://hedera.com/blog/post-quantum-crypto/), and a partnership with [SEALSQ on the QS7001 quantum-safe hardware platform](https://www.sealsq.com/investors/news-releases/sealsq-partnering-with-hedera-in-the-next-generation-of-post-quantum-semiconductors) was announced in December 2024. Neither has produced a HIP, draft specification, or testnet activity that would replace Ed25519 / ECDSA on the transaction-signing path.

**Current state.** Mainnet transactions are exclusively Ed25519 or ECDSA secp256k1.

**Planned future work.** No HIP currently proposes a post-quantum signature scheme on the transaction-signing path.

## 2. Consensus

**Grade: D ⚠️**

Hedera's [Hashgraph](https://hedera.com/blog/post-quantum-crypto/) is asynchronous BFT: nodes gossip events whose hashes form a directed acyclic graph, and "virtual voting" infers consensus without explicit round messages. Each event is signed with Ed25519 (or ECDSA secp256k1) — quantum-vulnerable — and event hashing uses SHA-384, which is hash-based and considered post-quantum-secure for preimage resistance. Hedera describes the consensus layer as designed for an algorithm swap: signature schemes are not hard-coded into protocol rules. No consensus-layer PQ HIP has been opened, and no post-quantum signature scheme has been wired into `hedera-services` at this time.

**Current state.** Event signing remains Ed25519 / ECDSA. Event hashing is SHA-384.

**Planned future work.** No consensus-layer PQ HIP has been filed. The chain's design framing emphasizes an algorithm-swap path; a specific scheme has not been proposed.

## 3. P2P Networking

**Grade: D ⚠️**

Inter-node gossip is encrypted with [TLS 1.2 / 1.3](https://hedera.com/blog/network-upgrade-communications-a-new-previewnet-ip-proxies-and-tls-support/). Each node presents a TLS certificate whose SHA-384 fingerprint is published on-ledger, so the binding of a node identity to its on-ledger record is hash-based and post-quantum-secure for preimage resistance. The TLS handshake itself, including the certificate's signing key, uses standard EC algorithms and would need to migrate to a post-quantum or hybrid TLS suite alongside any signature-layer migration. No Hedera publication describes a hybrid PQ-TLS rollout for the gossip layer.

**Current state.** Standard TLS 1.2 / 1.3 with EC certificate signing; SHA-384 cert fingerprints published on-ledger.

**Planned future work.** No HIP currently proposes a post-quantum or hybrid TLS suite for inter-node gossip.

## 4. On-Chain Logic

**Grade: D ⚠️**

The [Hedera Smart Contract Service](https://docs.hedera.com/hedera/core-concepts/smart-contracts/understanding-hederas-evm-differences-and-compatibility) runs the EVM via Hyperledger Besu and exposes the standard Ethereum precompile set: ecrecover (secp256k1 ECDSA), SHA-256, SHA-3, RIPEMD-160. [HIP-632](https://hips.hedera.com/HIP/hip-632.html) introduced the Hedera Account Service system contract at a reserved EVM address, exposing `isAuthorizedRaw()` for on-chain verification of Ed25519 signatures on Hedera-native accounts. None of these primitives is a post-quantum signature scheme; the available signature-verification surface for Solidity contracts on Hedera is limited to ECDSA secp256k1 and Ed25519.

**Current state.** EVM precompile set + HIP-632 Ed25519 verification. No PQ verification primitive exposed on-chain.

**Planned future work.** No HIP currently proposes a post-quantum verification precompile or system-contract extension.

## 5. Other Features

### Hedera Consensus Service (HCS) and Hedera Token Service (HTS)

**Current state.** [HCS](https://hedera.com/consensus-service) provides decentralized message ordering for off-chain applications, and [HTS](https://hedera.com/blog/hedera-token-service-hts-live-on-mainnet-with-over-60-initial-ecosystem-partners/) is the native token-issuance service. Both inherit the platform's signature stack: topic admin keys, token admin keys, mint / burn / transfer authorization, and freeze controls all use Ed25519 or ECDSA secp256k1 signatures. There is no privacy-tech overlay (no ring signatures, no shielded transactions); HCS and HTS state is fully transparent on-ledger.

**Planned future work.** No HIP currently proposes a post-quantum signature scheme for HCS or HTS administrative keys; their security tracks the chain-level signature scheme.

### SEALSQ QS7001 hardware partnership

**Current state.** Hedera and [SEALSQ Corp](https://www.sealsq.com/investors/news-releases/sealsq-partnering-with-hedera-in-the-next-generation-of-post-quantum-semiconductors) announced a partnership in December 2024 to integrate the QS7001 quantum-safe semiconductor platform. SEALSQ is in qualification ahead of production. The partnership targets hardware infrastructure (e.g., key storage, signing hardware) rather than a specific protocol-layer signature replacement, and no on-ledger HIP has been opened to consume the hardware path.

**Planned future work.** SEALSQ QS7001 production rollout was targeted for 2025 per public statements. Integration into Hedera's protocol path has not been announced.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ⚠️, P2P ⚠️, On-Chain ⚠️, Other ⚠️.

Hedera has no formal sunset timeline for Ed25519 or ECDSA. Public material from Hedera describes the platform as architected to make algorithm swaps trivial — signature schemes are framed as configuration parameters rather than hard-coded protocol elements — and Hedera explicitly tracks the [NIST post-quantum signature standardization process](https://csrc.nist.gov/projects/pqc-dig-sig) (ML-DSA / FN-DSA / SLH-DSA). Chief Scientist [Leemon Baird has publicly described the migration challenge as solvable on Y2K-style timelines](https://decrypt.co/11289/quantum-computing-hedera-bitcoin-bitcoin-safety) given sufficient lead time. None of this constitutes a scheduled retirement of EC primitives, and no committed migration timeline has been published.

**Current state.** No EC retirement scheduled.

**Planned future work.** None published. Migration would require Hedera Council coordination and remains opportunity-driven (NIST standard maturity, hardware availability) rather than deadline-driven.

## Governance

Hedera protocol changes flow through the [HIP (Hedera Improvement Proposal)](https://hips.hedera.com/) process. Network upgrades and significant protocol changes require approval by the [Hedera Council](https://hederacouncil.org/) (31 of up to 39 enterprise seats; three-year terms, max two consecutive). Council members vote with equal weight; majority decisions carry.

PQ-relevant work currently visible:

- [HIP-222 — Support ECDSA(secp256k1) keys](https://hips.hedera.com/HIP/hip-222.html). Status: Final. Adds ECDSA secp256k1 alongside Ed25519 for transaction signing — extends EC use; not a PQ migration.
- [HIP-632 — Hedera Account Service (HAS) System Contract](https://hips.hedera.com/HIP/hip-632.html). Status: Final. Exposes `isAuthorizedRaw()` for Ed25519 verification in Solidity contracts — extends Ed25519 reach on-chain; not a PQ migration.
- [SEALSQ partnership announcement (Dec 2024)](https://www.sealsq.com/investors/news-releases/sealsq-partnering-with-hedera-in-the-next-generation-of-post-quantum-semiconductors) — quantum-safe semiconductor collaboration; not a HIP.
- [hashgraph/awesome-hedera #35 (Swarm Spawner using ML-DSA-65)](https://github.com/hashgraph/awesome-hedera/pull/35) — open ecosystem-listing PR for an agent-identity-certificate project that uses ML-DSA-65; this is an ecosystem listing, not a core protocol change.

No HIP proposing a post-quantum signature scheme on the transaction-signing path or in the consensus layer has been filed.

---

_Generated on 06 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
