# Stellar (XLM) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Stellar |
| **Ticker** | XLM |
| **Website** | <https://www.stellar.org/> |
| **GitHub** | <https://github.com/stellar> |
| **Twitter / X** | <https://x.com/StellarOrg> |
| **On-chain environment** | WASM (Soroban) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Stellar's cryptographic stack is Ed25519 throughout: [transaction signing](https://developers.stellar.org/docs/learn/fundamentals), [Stellar Consensus Protocol (SCP)](https://developers.stellar.org/docs/learn/fundamentals/stellar-consensus-protocol) ballot and nomination signatures, and validator and node identity. The [Soroban WASM smart-contract platform](https://developers.stellar.org/docs/build/smart-contracts/overview) (launched 2024) exposes Ed25519 verification, secp256r1 ECDSA verification (added via [CAP-0051](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md) for passkey integration), SHA-256, Keccak-256, and the Poseidon / Poseidon2 permutation primitives. None of the supported primitives are post-quantum signature schemes.

No CAP (Core Advancement Proposal) addressing post-quantum signatures, consensus, networking, or precompiles has been filed in the [stellar/stellar-protocol](https://github.com/stellar/stellar-protocol) repository. The [SDF 2025 Product Roadmap](https://stellar.org/foundation/roadmap) and the [SDF 2024 Research Year in Review](https://stellar.org/blog/foundation-news/2024-sdf-research-year-in-review) do not mention post-quantum cryptography.

## Proposed and Implemented PQC Algorithms

Stellar does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Stellar in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Stellar in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Stellar in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

[Soroban](https://developers.stellar.org/docs/build/smart-contracts/overview) is the WASM-based smart-contract platform on Stellar. Its host functions for cryptography are `ed25519_verify`, the [secp256r1 verification primitives added by CAP-0051](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md), SHA-256, Keccak-256, and the Poseidon / Poseidon2 permutation primitives proposed for ZK-proof use. There is no host function or precompile for any post-quantum signature scheme, and the existing [GitHub discussion on additional cryptographic primitives](https://github.com/orgs/stellar/discussions/1500) does not name a post-quantum primitive as a candidate.

**Current state.** Soroban's signature-verification surface is exclusively Ed25519 and secp256r1.

**Planned future work.** No CAP proposing a post-quantum verification primitive has been filed.

## 5. Other Features

### Stellar Anchors and SEP standards

**Current state.** [Stellar Anchors](https://developers.stellar.org/docs/learn/fundamentals/anchors) and the SEP standards built around them (deposit and withdrawal flows, KYC handoffs, asset issuance) rely on standard HTTPS / TLS for off-chain communication and on Ed25519 keys (e.g., the `stellar.toml` SIGNING_KEY in [SEP-1](https://github.com/stellar/stellar-protocol)) for cryptographic identity. SEP and SDF guidance does not require or recommend hybrid post-quantum TLS for anchor communication.

**Planned future work.** No SEP currently proposes hybrid PQ TLS or PQ identity for anchors.

### Soroban Poseidon / Poseidon2 primitives

**Current state.** Soroban exposes [Poseidon and Poseidon2 permutation primitives](https://developers.stellar.org/docs/build/smart-contracts/overview) intended for efficient ZK-proof verification in smart contracts. Hash-based primitives like Poseidon are not directly broken by Shor's algorithm, but they do not by themselves make a ZK-proof system post-quantum — the soundness of the surrounding proof system also matters, and the existing precompiles do not constitute a PQ signature scheme.

**Planned future work.** No CAP proposes wiring Poseidon into a STARK-style PQ-friendly proof system natively in Soroban.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Stellar in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Stellar protocol changes flow through the [Core Advancement Proposal (CAP) process](https://github.com/stellar/stellar-protocol). CAPs are reviewed publicly on GitHub by the [Stellar Development Foundation (SDF)](https://stellar.org/) core team and Stellar Core maintainers, with Stellar's network running coordinated upgrades on roughly a six-month cadence (21+ protocol versions as of 2024).

PQ-relevant work currently visible:

- No CAP proposing post-quantum cryptography for transaction signatures, consensus, P2P transport, or Soroban host functions has been filed in the [stellar/stellar-protocol](https://github.com/stellar/stellar-protocol) repository.
- The [SDF 2025 Product Roadmap](https://stellar.org/foundation/roadmap) does not mention post-quantum cryptography.
- The [SDF 2024 Research Year in Review](https://stellar.org/blog/foundation-news/2024-sdf-research-year-in-review) does not mention post-quantum cryptography.

The most recent cryptographic CAP, [CAP-0051](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md), expanded EC support by adding secp256r1 verification for passkey-based account abstraction.

---

_Generated on 06 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
