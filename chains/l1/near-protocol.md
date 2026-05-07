# NEAR Protocol (NEAR) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | NEAR Protocol |
| **Ticker** | NEAR |
| **Website** | https://near.org |
| **GitHub** | https://github.com/near |
| **On-chain environment** | WASM (Rust, AssemblyScript) |
| **Mainnet genesis** | 2020-04-22 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | 🔧 | In Development |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | D | 🔧 | In Development |
| EC Sunset | F | ❌ | Not Discussed |

NEAR Protocol's PQC posture improved materially in May 2026 with an [official blog announcement](https://www.near.org/blog/making-near-protocol-post-quantum-safe) from Near One CTO Anton Astafiev. The headline item is active development of **FIPS-204 (ML-DSA)** as a new signing scheme for user transactions, with a testnet target of Q2 2026. NEAR's account model — human-readable names decoupled from key material, with rotatable access keys — gives it a structural advantage: migrating an account to a PQC key is a single transaction. Consensus, P2P, and EC sunset remain in early discussion only, and on-chain logic has no PQC primitives on the roadmap.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** (FIPS 204 / Dilithium) | Ed25519, ECDSA secp256k1 | Tx Signatures | In Development (testnet Q2 2026) |

## 1. Transaction Signatures

**Grade: D 🔧**

NEAR transactions are signed with Ed25519 (default) or ECDSA secp256k1. Both are broken by Shor's algorithm. NEAR already supports two signature schemes, so its runtime is designed to accommodate additional algorithms.

Near One is actively implementing **FIPS-204 (ML-DSA)** as a third signing scheme. Testnet deployment is planned for the end of Q2 2026, confirmed by NEAR co-founder Illia Polosukhin and the Near One blog post of 2026-05-06. Wallet integration is in progress, with Near One collaborating with Ledger and other hardware/software wallet builders. Larger PQC key and signature sizes will require downstream workflow changes across APIs, wallets, and UX.

NEAR's account model is a notable structural advantage. Accounts are identified by human-readable names (e.g., `alice.near`) rather than being derived from public keys. Each account holds one or more rotatable access keys. Migrating to a PQC key requires only a single transaction to add a new ML-DSA access key and remove the old Ed25519 key — no address change, no fund transfer needed.

**Current state.** Mainnet transactions use Ed25519 and ECDSA secp256k1 exclusively. No PQC signing is available on mainnet or testnet today.

**Planned future work.** ML-DSA signing on testnet by end of Q2 2026. No mainnet activation timeline has been announced.

## 2. Consensus

**Grade: D ⚠️**

NEAR uses Doomslug BFT consensus with Nightshade sharding. Validators sign blocks and approval messages with Ed25519. Block producers (up to 100) and chunk producers (per shard) all use Ed25519 keys for identity and signing. Nightshade 2.0 (2024) introduced stateless validation but did not change the underlying cryptography.

The Near One blog (2026-05-06) confirms "longer-term research to secure the NEAR Protocol: consensus, signing, validators, epoch sync, and sending transactions," but no implementation timeline or specific PQC algorithm has been proposed for the consensus layer.

**Current state.** All block and approval signatures use Ed25519. Validator identity is Ed25519-based.

**Planned future work.** Included in Near One's longer-term PQC research scope. No specific timeline or proposal.

## 3. P2P Networking

**Grade: D ⚠️**

NEAR uses a custom peer-to-peer networking layer built on an actor framework. Node identity is based on Ed25519 keys. Peer connections use Ed25519 edge signatures for authentication. The network uses Borsh serialization for inter-node messages.

P2P is included in Near One's stated longer-term PQC research scope (2026-05-06 blog), but no specific migration plan, algorithm, or timeline has been published.

**Current state.** Ed25519 for node identity and peer authentication. No PQC alternatives drafted.

**Planned future work.** Within Near One's research scope; no concrete proposal.

## 4. On-Chain Logic

**Grade: F ❌**

NEAR smart contracts run in a WASM runtime. Contracts written in Rust or AssemblyScript can call host functions for cryptographic operations, including Ed25519 signature verification. No PQC signature verification host functions or precompiles exist, and none have been announced.

If PQC verification were needed on-chain today, contracts would have to include PQC libraries compiled to WASM, incurring significant gas costs. The Near One blog mentions "Intents contracts will be quantum safe in the mid-term" but does not describe PQC verification primitives for general smart contract use.

**Current state.** WASM contracts can verify Ed25519 and ECDSA only. No PQC host functions.

**Planned future work.** No PQC precompile or host function roadmap announced.

## 5. Other Features

**Grade: D 🔧**

### Chain Signatures

NEAR Chain Signatures is a decentralized MPC network that allows NEAR accounts and smart contracts to sign transactions on external blockchains (Bitcoin, Ethereum, Solana, and 30+ others) without bridges. It currently uses threshold ECDSA (secp256k1) and EdDSA, both quantum-vulnerable. A quantum computer could forge these signatures and authorize fraudulent cross-chain transactions.

The Defuse team is actively building quantum-safe Chain Signatures via the NEAR Intents infrastructure. The 2026-05-06 blog states this could "offer users from other ecosystems a place to back up their assets in a quantum-safe environment." Post-quantum MPC solutions are still in active development.

### Aurora EVM

Aurora is an EVM execution environment deployed as a NEAR smart contract. It inherits Ethereum's EC precompiles (ecrecover, ecAdd, ecMul, ecPairing). All Ethereum-derived EC operations running on Aurora are quantum-vulnerable, and no PQC upgrade path has been announced for Aurora specifically.

### NEAR Data Availability (NEAR DA)

NEAR DA stores transaction and state commitments using Merkle tree roots validated by Ed25519 chunk signatures. No PQC migration has been announced for this component.

**Current state.** Chain Signatures PQC work is in development (Defuse team). Aurora and NEAR DA remain EC-only with no announced upgrade plans.

**Planned future work.** Quantum-safe Chain Signatures under active development. Aurora and NEAR DA have no PQC roadmap.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, NEAR's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus ⚠️, P2P ⚠️, On-Chain ❌, Other 🔧.

NEAR's current strategy is additive: ML-DSA will be offered alongside Ed25519 and ECDSA, and users will rotate keys voluntarily. No deprecation, forced migration, or removal timeline has been announced for any EC-based cryptography across any layer.

**Current state.** No EC sunset plan. Focus is on adding PQC options, not removing EC.

**Planned future work.** No EC deprecation roadmap announced. Near One's ZKP proof-of-ownership research (hash-based ZKP to prove seed phrase knowledge without revealing it) may inform an eventual EC sunset strategy, but this is early-stage research.

## Governance

NEAR protocol changes are led by the NEAR Foundation and core developer teams, with proposals discussed via GitHub issues on the nearcore repository and informal RFCs. There is no formal EIP-like proposal process. Hard forks are foundation-directed (e.g., Nightshade 2.0 in 2024).

PQ-relevant announcements:

- [2026-05-06 Blog: "Preparing NEAR for the Quantum Computing Era"](https://www.near.org/blog/making-near-protocol-post-quantum-safe) — FIPS-204 (ML-DSA) implementation announced, testnet Q2 2026, longer-term consensus/P2P PQC research confirmed, quantum-safe Chain Signatures under development by Defuse team, ZKP proof-of-ownership research disclosed.
- [CryptoTimes coverage](https://www.cryptotimes.io/2026/05/07/near-plans-post-quantum-safe-signing-for-q2-2026-testnet/) — Illia Polosukhin confirms Q2 2026 testnet timeline.
- [Cointelegraph coverage](https://cointelegraph.com/news/quantum-threat-not-just-about-stolen-funds-near) — Astafiev on proof-of-ownership ZKP research.

Reference documentation:

- [NEAR Chain Signatures documentation](https://docs.near.org/chain-abstraction/chain-signatures)
- [NEAR Consensus Specification (Nomicon)](https://nomicon.io/ChainSpec/Consensus)
- [NEAR Key Management](https://near-nodes.io/intro/keys)
- [NEAR P2P Architecture](https://near.github.io/nearcore/architecture/network)
- [Nightshade 2.0 announcement](https://pages.near.org/blog/nightshade-2-launches-on-near-mainnet-introducing-stateless-validation/)

---

_Generated on 07 May 2026 based on information as of 07 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
