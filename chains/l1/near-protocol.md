# NEAR Protocol (NEAR) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | NEAR Protocol |
| **Ticker** | NEAR |
| **Website** | https://near.org |
| **GitHub** | https://github.com/near |
| **Twitter/X** | [@NEARProtocol](https://x.com/nearprotocol) |
| **On-chain environment** | WASM (Rust, AssemblyScript) |
| **Current mainnet version** | Protocol version 84 (testnet on version 85) |
| **Mainnet genesis** | 2020-04-22 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B+ | 🧪 | Testnet Live |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | B | 🔧 | In Development |
| EC Sunset | F | ❌ | Not Discussed |

> **Testnet activity**: ML-DSA-65 (the `PostQuantumSignatures` feature, gated at protocol version 85) is live and active on NEAR's public testnet as of 2026-07-06. Mainnet is on protocol version 84 — one version away. This is not yet active on mainnet.

NEAR Protocol is one of the most advanced non-PQC-native L1 chains in post-quantum migration. In May 2026, Near One [announced](https://www.near.org/blog/making-near-protocol-post-quantum-safe) active development of **FIPS-204 (ML-DSA-65)** as a third signing scheme for user transactions. By mid-June 2026, the implementation reached a major milestone: ML-DSA-65 was [stabilized on the mainnet-bound stable protocol track](https://github.com/near/nearcore/pull/15878) (protocol version 85), with all productionization work — gas pricing, transaction size accounting, key-hash optimization, and end-to-end tests — merged into nearcore. As of 2026-07-06, ML-DSA-65 is **live and active on NEAR's public testnet** (protocol version 85); mainnet is on protocol version 84, one version away. This makes NEAR the first major non-PQC-native L1 with a NIST FIPS 204 signature scheme not just merged but network-activated on a mainnet-path testnet. A formal standards-track proposal, [NEP-645](https://github.com/near/NEPs/pull/645) ("ML-DSA-65 Post-Quantum Transaction Signatures", opened 2026-07-01), and an in-protocol SHA3-256 host function for quantum-safe account identifiers ([nearcore#16006](https://github.com/near/nearcore/pull/16006), merged) round out the work. Mainnet activation awaits a validator vote to upgrade from protocol v84 to v85.

NEAR's account model gives it a structural advantage: accounts are identified by human-readable names decoupled from key material, and each account holds rotatable access keys. Migrating to a PQC key requires only a single transaction. Consensus, P2P, and EC sunset remain in early discussion stages, and on-chain logic has no PQC primitives on the roadmap.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA-65** (FIPS 204) | Ed25519, ECDSA secp256k1 | Tx Signatures | Testnet Live (active on public testnet at protocol v85; [nearcore#15878](https://github.com/near/nearcore/pull/15878)) |

## Transaction Signatures

**Grade: B+ 🧪**

NEAR transactions are signed with Ed25519 (default) or ECDSA secp256k1. Both are broken by Shor's algorithm. NEAR already supports two signature schemes in its runtime, and its architecture is designed to accommodate additional algorithms.

Near One has implemented **FIPS-204 (ML-DSA-65)** as a third signing scheme. The core implementation PR [nearcore#15731](https://github.com/near/nearcore/pull/15731) (opened 2026-05-14) adds `MLDSA65` key-type variants using the FIPS-certified `aws-lc-rs` (BoringCrypto) library, gated by a `PostQuantumSignatures` protocol feature flag. To manage state costs, the full ~2 KB public key travels on the wire but is stored in the trie as a ~33-byte SHA3-256 hash (optimized from SHA3-384/49 bytes via [#15830](https://github.com/near/nearcore/pull/15830), merged 2026-06-02).

On 2026-06-10, the critical stabilization PR [nearcore#15878](https://github.com/near/nearcore/pull/15878) merged, moving ML-DSA-65 from the nightly/future-gated protocol config (v154) down to the stable protocol version (v85). As of 2026-07-06, protocol v85 is **live on NEAR's public testnet**, so ML-DSA-65 transaction signing is active there today; mainnet is on protocol v84. The formal standard [NEP-645](https://github.com/near/NEPs/pull/645) (opened 2026-07-01) specifies ML-DSA-65 as a first-class NEAR transaction-signature scheme, and [nearcore#16006](https://github.com/near/nearcore/pull/16006) adds an in-protocol SHA3-256 host function for quantum-safe Universal Account IDs.

All productionization PRs have merged:

- [nearcore#15815](https://github.com/near/nearcore/pull/15815) (merged 2026-06-01): end-to-end ML-DSA-65 access-key tests covering AddKey, view, sign, DeleteKey, and function-call key flows.
- [nearcore#15813](https://github.com/near/nearcore/pull/15813) (merged 2026-06-02): ML-DSA-65 verification distribution and worst-case Criterion benchmarks, feeding the gas pricing constant.
- [nearcore#15830](https://github.com/near/nearcore/pull/15830) (merged 2026-06-02): hash ML-DSA-65 access keys with SHA3-256 instead of SHA3-384, shrinking the on-trie key-handle from 49 to ~33 bytes.
- [nearcore#15842](https://github.com/near/nearcore/pull/15842) (merged 2026-06-08): `ml_dsa_65_verification_cost` = 100 Ggas, charged to burnt gas per ML-DSA-65 signature verified.
- [nearcore#15860](https://github.com/near/nearcore/pull/15860) (merged 2026-06-08): generalizes the ML-DSA-65 hash domain tag into a `HashDomainTag` enum for future reuse.
- [nearcore#15869](https://github.com/near/nearcore/pull/15869) (merged 2026-06-09): counts ML-DSA-65 signatures (~3.3 KB) against transaction size limits; adds architecture documentation.
- [nearcore#15873](https://github.com/near/nearcore/pull/15873) (merged 2026-06-09): removes undesired `non_exhaustive` attribute from hash domain types.

Developer tooling has landed across the stack: an ML-DSA-65 developer-tooling wave — [near-sdk-rs#1557](https://github.com/near/near-sdk-rs/pull/1557) (contract SDK `PublicKey` type), [near-cli-rs#605](https://github.com/near/near-cli-rs/pull/605) (`near generate-keypair --ml-dsa-65`), [near-jsonrpc-client-rs#190](https://github.com/near/near-jsonrpc-client-rs/pull/190), [near-socialdb-client-rs#49](https://github.com/near/near-socialdb-client-rs/pull/49), [cargo-near#436](https://github.com/near/cargo-near/pull/436), and [near-workspaces-rs#449](https://github.com/near/near-workspaces-rs/pull/449) — merged on 2026-07-01/02. Validator CLI ([near-validator-cli-rs#41](https://github.com/near/near-validator-cli-rs/pull/41)) and docs ([docs#3061](https://github.com/near/docs/pull/3061)) remain open.

Wallet integration is in progress, with Near One collaborating with Ledger and other hardware and software wallet builders.

NEAR's account model is a notable structural advantage. Accounts are identified by human-readable names rather than being derived from public keys. Each account holds one or more rotatable access keys. Migrating to a PQC key requires only a single transaction to add a new ML-DSA access key and remove the old Ed25519 key — no address change or fund transfer needed.

**Current state.** ML-DSA-65 is live and active on NEAR's public testnet at protocol v85. Mainnet transactions use Ed25519 and ECDSA secp256k1 exclusively, with mainnet on protocol v84.

**Planned future work.** Mainnet activation when validators vote to upgrade from protocol v84 to v85. Retail-wallet signing is still in progress; that plus mainnet activation would move this category to Shipped.

## Consensus

**Grade: D ⚠️**

NEAR uses [Doomslug BFT consensus](https://nomicon.io/ChainSpec/Consensus) with [Nightshade](https://pages.near.org/blog/nightshade-2-launches-on-near-mainnet-introducing-stateless-validation/) sharding. Validators sign blocks and approval messages with Ed25519. Block producers and chunk producers all use Ed25519 keys for identity and signing. Nightshade 2.0 (2024) introduced stateless validation but did not change the underlying cryptography.

The [Near One blog (2026-05-06)](https://www.near.org/blog/making-near-protocol-post-quantum-safe) confirms "longer-term research to secure the NEAR Protocol: consensus, signing, validators, epoch sync, and sending transactions," but no implementation timeline or specific post-quantum algorithm has been proposed for the consensus layer.

**Current state.** All block and approval signatures use Ed25519. Validator identity is Ed25519-based.

**Planned future work.** Included in Near One's longer-term PQC research scope. No specific timeline or proposal.

## P2P Networking

**Grade: D ⚠️**

NEAR uses a [custom peer-to-peer networking layer](https://near.github.io/nearcore/architecture/network) built on an actor framework. Node identity is based on Ed25519 keys. Peer connections use Ed25519 edge signatures for authentication.

P2P is included in Near One's stated longer-term PQC research scope ([2026-05-06 blog](https://www.near.org/blog/making-near-protocol-post-quantum-safe)), but no specific migration plan, algorithm, or timeline has been published.

**Current state.** Ed25519 for node identity and peer authentication. No post-quantum alternatives drafted.

**Planned future work.** Within Near One's research scope; no concrete proposal.

## On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for NEAR Protocol in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

**Grade: B 🔧**

### Chain Signatures

[NEAR Chain Signatures](https://docs.near.org/chain-abstraction/chain-signatures) is a decentralized [MPC network](https://github.com/near/mpc) that allows NEAR accounts and smart contracts to sign transactions on external blockchains (Bitcoin, Ethereum, Solana, and [30+ others](https://pages.near.org/blog/chain-signatures-adds-eddsa-support-cross-chain-signing-for-solana-ton-stellar-sui-aptos/)) without bridges. It currently uses threshold ECDSA (secp256k1) and EdDSA, both quantum-vulnerable.

The Defuse team is actively building quantum-safe Chain Signatures via the NEAR Intents infrastructure. The [2026-05-06 blog](https://www.near.org/blog/making-near-protocol-post-quantum-safe) states this could "offer users from other ecosystems a place to back up their assets in a quantum-safe environment."

**Current state.** Threshold ECDSA and EdDSA only. No post-quantum chain signatures on mainnet.

**Planned future work.** Quantum-safe Chain Signatures under active development by the Defuse team.

### Aurora EVM

[Aurora](https://doc.aurora.dev/) is an EVM execution environment deployed as a NEAR smart contract. It inherits Ethereum's EC precompiles (ecrecover, ecAdd, ecMul, ecPairing). All Ethereum-derived EC operations running on Aurora are quantum-vulnerable. No post-quantum upgrade path has been announced for Aurora.

### NEAR Data Availability (NEAR DA)

NEAR DA stores transaction and state commitments using Merkle tree roots validated by Ed25519 chunk signatures. No post-quantum migration has been announced.

### Proof-of-Ownership Research (ZKP)

Near One is researching an emergency fallback mechanism — allowing users to prove knowledge of their seed phrase via zero-knowledge proofs without revealing the seed itself — for scenarios where elliptic-curve keys are broken. The construction uses hash-based ZKP, inspired by [Bitcoin ecosystem work](https://gist.github.com/Roasbeef/563f173fe44e2005e003a082716e586f#stark-proof-of-bip-32-seed-knowledge-bip32-pq-zkp).

**Current state.** Active research. No implementation timeline.

**Planned future work.** Research ongoing; no deployment plan announced.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, NEAR's PQC-adoption ratings per category are: Tx Signatures 🧪, Consensus ⚠️, P2P ⚠️, On-Chain ❌, Other 🔧.

NEAR's current strategy is additive: ML-DSA-65 will be offered alongside Ed25519 and ECDSA, and users will rotate keys voluntarily. No deprecation, forced migration, or removal timeline has been announced for any EC-based cryptography across any layer.

**Current state.** No EC sunset plan.

**Planned future work.** No EC deprecation roadmap announced.

## Governance

NEAR protocol changes are led by the NEAR Foundation and core developer teams, with proposals discussed via GitHub issues on the nearcore repository and informal RFCs. Hard forks are foundation-directed. Protocol upgrades use a validator-voting mechanism: once a sufficient share of validator stake signals readiness for a new protocol version, the upgrade activates automatically.

PQ-relevant announcements and reference documentation:

- [2026-05-06 Blog: "Preparing NEAR for the Quantum Computing Era"](https://www.near.org/blog/making-near-protocol-post-quantum-safe) — **FIPS-204 (ML-DSA-65)** implementation announced; testnet Q2 2026; longer-term consensus/P2P PQC research confirmed; quantum-safe Chain Signatures under development; ZKP proof-of-ownership research disclosed.
- [nearcore#15731](https://github.com/near/nearcore/pull/15731) — Live ML-DSA-65 implementation PR (opened 2026-05-14), `aws-lc-rs`, `PostQuantumSignatures` protocol gate.
- [nearcore#15878](https://github.com/near/nearcore/pull/15878) — ML-DSA-65 stabilized on stable protocol version 85 (merged 2026-06-10). Moves ML-DSA-65 from nightly/future config to the mainnet-bound stable track. As of 2026-07-06, protocol v85 is live on the public testnet; mainnet is on v84.
- [NEP-645](https://github.com/near/NEPs/pull/645) — "ML-DSA-65 Post-Quantum Transaction Signatures." Status: Open (created 2026-07-01). Formal standards-track proposal specifying ML-DSA-65 as a first-class NEAR transaction-signature scheme.
- [nearcore#16006](https://github.com/near/nearcore/pull/16006) — adds a SHA3-256 host function for quantum-safe Universal Account IDs and carries the `ml_dsa_65_verification_cost` gas parameter. Merged.
- ML-DSA-65 developer-tooling wave merged 2026-07-01/02: [near-cli-rs#605](https://github.com/near/near-cli-rs/pull/605), [near-jsonrpc-client-rs#190](https://github.com/near/near-jsonrpc-client-rs/pull/190), [near-socialdb-client-rs#49](https://github.com/near/near-socialdb-client-rs/pull/49), [cargo-near#436](https://github.com/near/cargo-near/pull/436), [near-workspaces-rs#449](https://github.com/near/near-workspaces-rs/pull/449). Still open: [near-validator-cli-rs#41](https://github.com/near/near-validator-cli-rs/pull/41), [docs#3061](https://github.com/near/docs/pull/3061).
- Supporting merges: [#15815](https://github.com/near/nearcore/pull/15815) (e2e tests), [#15813](https://github.com/near/nearcore/pull/15813) (benchmarks), [#15830](https://github.com/near/nearcore/pull/15830) (SHA3-256 key hash), [#15842](https://github.com/near/nearcore/pull/15842) (gas pricing), [#15860](https://github.com/near/nearcore/pull/15860) (domain tag refactor), [#15869](https://github.com/near/nearcore/pull/15869) (tx size limits), [#15873](https://github.com/near/nearcore/pull/15873) (cleanup).
- [near-sdk-rs#1557](https://github.com/near/near-sdk-rs/pull/1557) — Draft PR exposing ML-DSA-65 public keys to the contract SDK (opened 2026-06-13).
- [CryptoTimes coverage](https://www.cryptotimes.io/2026/05/07/near-plans-post-quantum-safe-signing-for-q2-2026-testnet/) — Illia Polosukhin confirms Q2 2026 testnet timeline.
- [Cointelegraph coverage](https://cointelegraph.com/news/quantum-threat-not-just-about-stolen-funds-near) — Near One on proof-of-ownership ZKP research.
- [BanklessTimes coverage](https://www.banklesstimes.com/articles/2026/05/07/near-protocol-soars-after-quantum-safe-signing-confirmed-for-q2/) — Market reaction and technical summary.
- [@NEARProtocol PQC thread (X)](https://x.com/NEARProtocol/status/2052056127349678503) — Pinned tweet thread from 2026-05-06.
- [NEAR Chain Signatures documentation](https://docs.near.org/chain-abstraction/chain-signatures)
- [NEAR Access Keys API](https://docs.near.org/api/rpc/access-keys)
- [NEAR Consensus Specification (Nomicon)](https://nomicon.io/ChainSpec/Consensus)
- [NEAR P2P Architecture](https://near.github.io/nearcore/architecture/network)
- [Nightshade 2.0 announcement](https://pages.near.org/blog/nightshade-2-launches-on-near-mainnet-introducing-stateless-validation/)
- [Messari: Understanding Nightshade 2.0](https://messari.io/copilot/share/understanding-nightshade-2-0-c3d2e839-9c50-49ce-90f7-0f2677b0e4d4)

---

_Generated on 06 Jul 2026 based on information as of 06 Jul 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
