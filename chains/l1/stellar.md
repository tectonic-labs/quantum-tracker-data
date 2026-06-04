# Stellar (XLM) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Stellar |
| **Ticker** | XLM |
| **Website** | https://www.stellar.org |
| **GitHub** | https://github.com/stellar |
| **Twitter / X** | https://x.com/StellarOrg |
| **On-chain environment** | Soroban (WebAssembly) |
| **Current mainnet version** | Protocol 26 — Yardstick (activated 2026-05-06) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Stellar uses the Stellar Consensus Protocol (SCP), a Federated Byzantine Agreement system in which validators organize into quorum slices and reach consensus without proof-of-work. The Stellar Development Foundation (SDF) drives protocol changes through the Core Advancement Proposal (CAP) process. Soroban, Stellar's WebAssembly-based smart-contract platform, launched with Protocol 20 and has expanded steadily since. Protocol 26 (Yardstick), activated on May 6, 2026, included CAP-0073, CAP-0077, and CAP-0079.

No post-quantum cryptography roadmap, proposal, or public research has been identified for Stellar across any category. The SDF's published 2025 roadmap and 2024 Research Year in Review focus on privacy features, compliance, ecosystem growth, and ZK proof primitives (including Poseidon/Poseidon2 for ZK-friendly hashing), with no PQC mention. Stellar has expanded its elliptic-curve primitive set — adding secp256r1 verification in CAP-0051 (Protocol 21, June 2024) to support WebAuthn passkeys — rather than moving toward post-quantum alternatives.

## Proposed and Implemented PQC Algorithms

> Stellar does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Stellar in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Stellar in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Stellar in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

Soroban's smart-contract host exposes cryptographic functions for use by on-chain code: `ed25519_verify`, `secp256r1_verify` ([CAP-0051](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md)), `secp256r1_recover`, `sha256`, `keccak256`, and Poseidon/Poseidon2 permutation primitives. All signature-verification functions are elliptic-curve-based. The Poseidon primitives support ZK-friendly hashing but are not post-quantum signature primitives. A [GitHub discussion on additional cryptographic primitives for proof verification](https://github.com/orgs/stellar/discussions/1500) does not address post-quantum schemes. [CAP-0051](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0051.md) most recently added a second EC verification primitive rather than a post-quantum one.

**Current state.** Signature verification in Soroban is limited to Ed25519 and secp256r1 (ECDSA). No post-quantum verification primitive is available on mainnet, testnet, or in any open CAP.

**Planned future work.** No CAP for post-quantum Soroban primitives has been filed.

## Other Features

### Stellar Anchors and SEP Standards

**Current state.** Anchors are on/off-ramps connecting Stellar to traditional finance via the [Stellar Ecosystem Proposals (SEP) standards](https://developers.stellar.org/docs/learn/fundamentals/anchors). Anchor-to-wallet communication uses HTTPS/TLS, and anchor identity records in `stellar.toml` (SEP-1) are signed with Ed25519. If TLS transport or anchor signing keys are broken, man-in-the-middle attacks on anchor communication become feasible and historical HTTPS traffic could be decrypted.

**Planned future work.** No SEP or SDF guidance proposes hybrid or post-quantum TLS for anchor communication.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for Stellar in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Stellar protocol changes follow the [CAP (Core Advancement Proposal) process](https://github.com/stellar/stellar-protocol) in the `stellar/stellar-protocol` repository. The SDF prepares a stable stellar-core release and upgrades Testnet approximately three weeks before Mainnet. Tier 1 validators coordinate a Mainnet vote by setting the ledger protocol version; activation happens when a quorum of validators agree via SCP.

No CAPs specifically addressing post-quantum cryptography have been filed or discussed in the core repository as of the information date.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
