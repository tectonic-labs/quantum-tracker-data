# NEAR Protocol (NEAR) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | NEAR Protocol |
| **Ticker** | NEAR |
| **Website** | <https://near.org> |
| **GitHub** | <https://github.com/near> |
| **On-chain environment** | WASM (Rust, AssemblyScript) |
| **Mainnet genesis** | 2020-04-22 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | B | 🔧 | In Development |
| EC Sunset | F | ❌ | Not Discussed |

NEAR Protocol's PQC posture improved materially in May 2026 with an [official blog announcement](https://www.near.org/blog/making-near-protocol-post-quantum-safe) from Near One CTO Anton Astafiev. The headline item is active development of **FIPS-204 (ML-DSA-65)** as a new signing scheme for user transactions, with a testnet target of Q2 2026. The live implementation PR — [nearcore#15731](https://github.com/near/nearcore/pull/15731) — adds ML-DSA-65 via `aws-lc-rs`, protocol-gated behind a `PostQuantumSignatures` feature flag, with a SHA3-384 trie-hash storage optimization to keep state costs manageable. NEAR's account model — human-readable names decoupled from key material, with rotatable access keys — gives it a structural advantage: migrating an account to a PQC key is a single transaction. Consensus, P2P, and EC sunset remain in early discussion only, and on-chain logic has no PQC primitives on the roadmap.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA-65** (FIPS 204) | Ed25519, ECDSA secp256k1 | Tx Signatures | In Development (testnet Q2 2026; [nearcore#15731](https://github.com/near/nearcore/pull/15731)) |

## Transaction Signatures

**Grade: B 🔧**

NEAR transactions are signed with Ed25519 (default) or ECDSA secp256k1. Both are broken by Shor's algorithm. NEAR already supports two signature schemes in its runtime, and its architecture is designed to accommodate additional algorithms.

Near One is actively implementing **FIPS-204 (ML-DSA-65)** as a third signing scheme. The implementation PR [nearcore#15731](https://github.com/near/nearcore/pull/15731) (opened 2026-05-14) adds `MLDSA65` key-type variants using the FIPS-certified `aws-lc-rs` (BoringCrypto) library, gated by a `PostQuantumSignatures` protocol feature flag. To manage state costs, the full ~2 KB public key travels on the wire but is stored in the trie as a 49-byte SHA3-384 hash, analogous to how Bitcoin Script hashes pubkeys. Testnet deployment is planned for the end of Q2 2026, confirmed by NEAR co-founder Illia Polosukhin and the Near One blog. Wallet integration is in progress, with Near One collaborating with Ledger and other hardware/software wallet builders.

NEAR's account model is a notable structural advantage. Accounts are identified by human-readable names (e.g., `alice.near`) rather than being derived from public keys. Each account holds one or more rotatable access keys. Migrating to a PQC key requires only a single transaction to add a new ML-DSA access key and remove the old Ed25519 key — no address change, no fund transfer needed.

**Current state.** Mainnet transactions use Ed25519 and ECDSA secp256k1 exclusively. No PQC signing is available on mainnet or testnet today.

**Planned future work.** ML-DSA-65 signing on testnet by end of Q2 2026. No mainnet activation timeline has been announced.

## Consensus

**Grade: D ⚠️**

NEAR uses Doomslug BFT consensus with [Nightshade](https://pages.near.org/blog/nightshade-2-launches-on-near-mainnet-introducing-stateless-validation/) sharding. Validators sign blocks and approval messages with Ed25519. Block producers (up to 100) and chunk producers (per shard) all use Ed25519 keys for identity and signing. Nightshade 2.0 (2024) introduced stateless validation but did not change the underlying cryptography.

The [Near One blog (2026-05-06)](https://www.near.org/blog/making-near-protocol-post-quantum-safe) confirms "longer-term research to secure the NEAR Protocol: consensus, signing, validators, epoch sync, and sending transactions," but no implementation timeline or specific post-quantum algorithm has been proposed for the consensus layer.

**Current state.** All block and approval signatures use Ed25519. Validator identity is Ed25519-based.

**Planned future work.** Included in Near One's longer-term PQC research scope. No specific timeline or proposal.

## P2P Networking

**Grade: D ⚠️**

NEAR uses a [custom peer-to-peer networking layer](https://near.github.io/nearcore/architecture/network) built on an actor framework. Node identity is based on Ed25519 keys. Peer connections use Ed25519 edge signatures for authentication. The network uses Borsh serialization for inter-node messages.

P2P is included in Near One's stated longer-term PQC research scope (2026-05-06 blog), but no specific migration plan, algorithm, or timeline has been published.

**Current state.** Ed25519 for node identity and peer authentication. No PQC alternatives drafted.

**Planned future work.** Within Near One's research scope; no concrete proposal.

## On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for NEAR Protocol in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

**Grade: B 🔧**

### Chain Signatures

[NEAR Chain Signatures](https://docs.near.org/chain-abstraction/chain-signatures) is a decentralized MPC network that allows NEAR accounts and smart contracts to sign transactions on external blockchains (Bitcoin, Ethereum, Solana, and 30+ others) without bridges. It currently uses threshold ECDSA (secp256k1) and EdDSA, both quantum-vulnerable. A quantum computer could forge these signatures and authorize fraudulent cross-chain transactions.

The Defuse team is actively building quantum-safe Chain Signatures via the NEAR Intents infrastructure. The [2026-05-06 blog](https://www.near.org/blog/making-near-protocol-post-quantum-safe) states this could "offer users from other ecosystems a place to back up their assets in a quantum-safe environment."

**Current state.** Threshold ECDSA and EdDSA only. No PQC chain signatures on mainnet.

**Planned future work.** Quantum-safe Chain Signatures under active development by the Defuse team.

### Aurora EVM

Aurora is an EVM execution environment deployed as a NEAR smart contract. It inherits Ethereum's EC precompiles (ecrecover, ecAdd, ecMul, ecPairing). All Ethereum-derived EC operations running on Aurora are quantum-vulnerable.

**Planned future work.** No PQC upgrade path has been announced for Aurora.

### NEAR Data Availability (NEAR DA)

NEAR DA stores transaction and state commitments using Merkle tree roots validated by Ed25519 chunk signatures.

**Planned future work.** No PQC migration has been announced.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, NEAR's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus ⚠️, P2P ⚠️, On-Chain ❌, Other 🔧.

NEAR's current strategy is additive: ML-DSA-65 will be offered alongside Ed25519 and ECDSA, and users will rotate keys voluntarily. No deprecation, forced migration, or removal timeline has been announced for any EC-based cryptography across any layer.

**Current state.** No EC sunset plan.

**Planned future work.** No EC deprecation roadmap announced.

## Governance

NEAR protocol changes are led by the NEAR Foundation and core developer teams, with proposals discussed via GitHub issues on the nearcore repository and informal RFCs. Hard forks are foundation-directed.

PQ-relevant announcements and reference documentation:

- [2026-05-06 Blog: "Preparing NEAR for the Quantum Computing Era"](https://www.near.org/blog/making-near-protocol-post-quantum-safe) — FIPS-204 (ML-DSA-65) implementation announced; testnet Q2 2026; longer-term consensus/P2P PQC research confirmed; quantum-safe Chain Signatures under development; ZKP proof-of-ownership research disclosed.
- [nearcore#15731](https://github.com/near/nearcore/pull/15731) — Live ML-DSA-65 implementation PR (opened 2026-05-14), `aws-lc-rs`, `PostQuantumSignatures` protocol gate, SHA3-384 trie hash-form storage.
- [CryptoTimes coverage](https://www.cryptotimes.io/2026/05/07/near-plans-post-quantum-safe-signing-for-q2-2026-testnet/) — Illia Polosukhin confirms Q2 2026 testnet timeline.
- [Cointelegraph coverage](https://cointelegraph.com/news/quantum-threat-not-just-about-stolen-funds-near) — Astafiev on proof-of-ownership ZKP research.
- [NEAR Chain Signatures documentation](https://docs.near.org/chain-abstraction/chain-signatures)
- [NEAR Consensus Specification (Nomicon)](https://nomicon.io/ChainSpec/Consensus)
- [NEAR P2P Architecture](https://near.github.io/nearcore/architecture/network)
- [Nightshade 2.0 announcement](https://pages.near.org/blog/nightshade-2-launches-on-near-mainnet-introducing-stateless-validation/)

---

_Generated on 18 May 2026 based on information as of 18 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
