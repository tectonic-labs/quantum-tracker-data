# ASI Alliance (FET) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Artificial Superintelligence Alliance |
| **Ticker** | FET |
| **Website** | https://superintelligence.io/asi-token-fet/ |
| **GitHub** | https://github.com/fetchai |
| **On-chain environment** | CosmWasm + EVM module |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

The [Artificial Superintelligence (ASI) Alliance](https://superintelligence.io/asi-token-fet/) is a March 2024 token merger of Fetch.ai, SingularityNET, and Ocean Protocol, with CUDOS joining as a compute partner. The unified token trades as FET. The Alliance currently runs the **Fetch.ai mainnet** (Cosmos SDK + CometBFT) as its production chain, with all cryptography EC-based: secp256k1 ECDSA for transactions and Ed25519 for CometBFT consensus.

A separate **ASI:Chain** — a blockDAG L1 — launched to DevNet in October 2025 (public DevNet Beta March 2026). Alliance communications describe ASI:Chain as featuring "modular quantum-safe cryptographic primitives," but as of May 2026, no specific post-quantum algorithm, migration timeline, or technical specification has been published. Until a concrete scheme is named and committed to, the "quantum-ready" framing remains at the discussion stage.

ASI Alliance does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: D ⚠️**

The production Fetch.ai mainnet uses secp256k1 ECDSA via Cosmos SDK for all transaction signing. The ASI:Chain DevNet references "quantum-resistant smart contracts and advanced cryptographic techniques" and "modular quantum-safe primitives" in [alliance communications](https://0xgreythorn.medium.com/fetch-ai-the-asi-alliance-decentralized-ai-powerhouse-b39c40ec4a56), but no specific post-quantum signature scheme has been named in published technical documentation.

**Current state.** Fetch.ai mainnet: secp256k1 ECDSA, standard Cosmos SDK multi-sig. ASI:Chain DevNet: quantum-ready framing with no concrete specification.

**Planned future work.** ASI:Chain is expected to deliver on its quantum-safe claims, but no algorithm, timeline, or fork date has been committed.

## 2. Consensus

**Grade: D ⚠️**

The Fetch.ai mainnet runs CometBFT (Tendermint) PoS with Ed25519 validator block-signing keys. ASI:Chain introduces a blockDAG architecture with sharded "customizable consensus" tailored to AI workloads, described as "quantum-ready" in alliance communications. No concrete post-quantum consensus scheme has been published.

**Current state.** Fetch.ai: CometBFT Ed25519 consensus. ASI:Chain: DevNet with quantum-ready framing, no specific scheme.

**Planned future work.** ASI:Chain's consensus design is in development; quantum-safe properties are stated goals but not yet specified.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for ASI Alliance in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

The Fetch.ai mainnet supports CosmWasm contracts and runs an EVM module (FetchEVM), both exposing only standard EC precompiles (ecrecover, BN254). No post-quantum verification primitives are available on-chain.

**Current state.** EC-only precompiles on both CosmWasm and EVM surfaces.

**Planned future work.** None concrete. ASI:Chain may introduce PQC-capable on-chain logic, but no specification has been published.

## 5. Other Features

**Grade: F ❌**

### Almanac / AI-Agent Registry

Fetch.ai's agent directory uses standard ECDSA agent keys for agent identity and capability-based access controls. This is application-level, not protocol-level cryptography.

**Current state.** Standard ECDSA agent keys. No PQC alternative.

**Planned future work.** None documented.

### IBC

Standard CometBFT light-client proofs for Cosmos IBC interconnect. No PQC alternative.

**Current state.** Ed25519-based IBC light client verification. No PQC.

**Planned future work.** None documented.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ⚠️, P2P ❌, On-Chain ❌, Other ❌.

The Alliance's "quantum-ready" framing does not include a commitment to retire EC primitives on a specific fork or timeline. ASI:Chain is a new chain alongside Fetch.ai, not an EC-retirement vehicle for the existing mainnet.

**Current state.** No EC retirement schedule exists for either the Fetch.ai mainnet or ASI:Chain.

**Planned future work.** None documented.

## Governance

The ASI Alliance operates as a multi-organization consortium (Fetch.ai, SingularityNET, Ocean Protocol, CUDOS). The Fetch.ai mainnet uses Cosmos SDK governance (on-chain voting). ASI:Chain governance structure has not been publicly specified.

No PQC-specific proposals have been filed through Fetch.ai's on-chain governance. The "quantum-ready" positioning originates from [alliance-level communications](https://crypto.com/en/university/what-is-the-artificial-superintelligence-alliance) rather than formal governance proposals.

---

_Generated on 07 May 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
