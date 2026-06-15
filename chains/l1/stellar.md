# Stellar (XLM) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Stellar |
| **Ticker** | XLM |
| **Website** | https://www.stellar.org/ |
| **GitHub** | https://github.com/stellar |
| **Twitter/X** | [@StellarOrg](https://x.com/StellarOrg) |
| **On-chain environment** | WASM (Soroban; Rust-compiled) |
| **Current mainnet version** | Protocol 26 / Yardstick (activated 2026-05-06) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Stellar's PQC posture has been minimal historically, with Ed25519 as the sole signature scheme across transactions, consensus, and networking. However, in June 2026, [CAP-0084](https://github.com/stellar/stellar-protocol/pull/1946) was filed — Stellar's first PQC proposal. CAP-0084 proposes adding **ML-DSA** signature verification host functions to [Soroban](https://developers.stellar.org/docs/build/smart-contracts/overview), Stellar's WASM-based smart contract platform. The proposal is at the CAP stage and has not been implemented. All other categories — transaction signatures, consensus, P2P networking, and EC sunset — have no public PQC proposals or migration plans.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** (FIPS 204) | Ed25519 (on-chain verification) | On-Chain | Discussed ([CAP-0084](https://github.com/stellar/stellar-protocol/pull/1946), open 2026-06-08) |

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Stellar in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

Stellar uses the [Stellar Consensus Protocol (SCP)](https://developers.stellar.org/docs/learn/fundamentals/stellar-consensus-protocol), a Federated Byzantine Agreement mechanism [formally specified](https://datatracker.ietf.org/doc/html/draft-mazieres-dinrg-scp-02) by David Mazieres. Every nomination and ballot message is signed with Ed25519 and paired with a cryptographic hash of the sender's quorum set. Validator identity is Ed25519-based. SCP provides immediate finality when a quorum set agrees on a value.

We have found no public information indicating migration activity for Stellar in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

Stellar uses a [custom overlay network](https://github.com/stellar/stellar-core/blob/master/docs/architecture.md) for peer-to-peer communication, with Ed25519-based node identity and TLS-based transport encryption. Peer discovery uses static configuration rather than DHT or gossip protocols.

We have found no public information indicating migration activity for Stellar in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: D ⚠️**

Soroban, Stellar's WASM-based smart contract platform (live since Protocol 20), currently exposes `ed25519_verify`, `secp256r1_verify`, and `secp256r1_recover` as signature verification host functions. Hash primitives include SHA-256, Keccak-256, and Poseidon/Poseidon2 permutations. No post-quantum signature verification is available today.

[CAP-0084](https://github.com/stellar/stellar-protocol/pull/1946) (open, 2026-06-08) proposes adding **ML-DSA** signature verification host functions to Soroban. This is Stellar's first PQC proposal. The CAP has not been implemented and is at the proposal review stage. A related [discussion (#1500)](https://github.com/orgs/stellar/discussions/1500) on supporting cryptographic primitives for proof verification exists but does not specifically address PQC.

**Current state.** Soroban verifies Ed25519 and secp256r1 signatures only. No post-quantum verification is available. Implementing PQC verification in pure WASM would be computationally impractical.

**Planned future work.** CAP-0084 proposes **ML-DSA** verification host functions for Soroban. No implementation timeline has been announced.

## Other Features

**Grade: F ❌**

### Stellar Anchors and SEP Standards

[Stellar anchors](https://developers.stellar.org/docs/learn/fundamentals/anchors) are on/off-ramps connecting Stellar to traditional finance. Stellar Ecosystem Proposals (SEPs) define interoperability standards for anchor-to-wallet communication, which rely on HTTPS/TLS (EC or RSA-dependent). No SEP or SDF guidance recommends or enforces hybrid PQC-TLS for anchor communication.

**Current state.** Anchors depend on standard TLS with EC-based cipher suites. Ed25519 keypair identities are used for signing in stellar.toml (SEP-1).

**Planned future work.** No post-quantum anchor or SEP migration has been proposed.

### Soroban ZK Proof Verification

Soroban supports Poseidon and Poseidon2 permutation primitives for ZK proof verification. While Poseidon is hash-based and considered quantum-resistant for collision resistance, ZK proofs built on EC pairings (e.g., Groth16 over BN254) remain quantum-vulnerable. No Stellar ZK rollups or cross-chain proofs currently rely on these primitives.

**Current state.** Poseidon/Poseidon2 primitives available. No deployed ZK proof systems on Stellar yet.

**Planned future work.** SDF's 2026 cryptography focus is ZK primitives (BN254/Poseidon/Groth16 via Protocol 25 work), which is EC-based rather than PQC-focused.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Stellar's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ⚠️, Other ❌.

No public sunset plan, timeline, or migration strategy exists for Ed25519 or other EC curves used in Stellar. The [SDF 2025 Product Roadmap](https://stellar.org/foundation/roadmap) focuses on privacy features, compliance, and ecosystem growth with no mention of PQC. Recent protocol changes have expanded EC support (adding secp256r1 via [CAP-0051](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md) in 2024) rather than introducing post-quantum alternatives.

**Current state.** No EC sunset plan.

**Planned future work.** No EC deprecation roadmap announced.

## Governance

Stellar protocol changes follow the [Core Advancement Proposal (CAP)](https://github.com/stellar/stellar-protocol) process. CAPs are filed in the `stellar/stellar-protocol` GitHub repository, reviewed by SDF and the community, tested on Testnet, and activated on Mainnet via SCP validator voting. Protocol upgrades occur on a roughly six-month cadence. The current protocol version is 26 (Yardstick), activated 2026-05-06.

PQ-relevant proposals:

- [CAP-0084 / stellar-protocol#1946](https://github.com/stellar/stellar-protocol/pull/1946) — "Add cap-0084 ML-DSA sig verification host functions." Open, created 2026-06-08. Stellar's first PQC proposal. Proposes Soroban host functions for **ML-DSA** signature verification. Status: open (under review).

Reference documentation:

- [SCP Overview](https://developers.stellar.org/docs/learn/fundamentals/stellar-consensus-protocol)
- [SCP Formal Specification (IETF)](https://datatracker.ietf.org/doc/html/draft-mazieres-dinrg-scp-02)
- [Stellar Core Architecture](https://github.com/stellar/stellar-core/blob/master/docs/architecture.md)
- [Soroban Overview](https://developers.stellar.org/docs/build/smart-contracts/overview)
- [CAP-0051: secp256r1 verification](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md)
- [SDF 2025 Product Roadmap](https://stellar.org/foundation/roadmap)
- [SDF 2024 Research Year in Review](https://stellar.org/blog/foundation-news/2024-sdf-research-year-in-review)

---

_Generated on 15 Jun 2026 based on information as of 15 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
