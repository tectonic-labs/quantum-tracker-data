# Cosmos Hub (ATOM) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Cosmos Hub |
| **Ticker** | ATOM |
| **Website** | https://cosmos.network |
| **GitHub** | https://github.com/cosmos |
| **Twitter / X** | https://x.com/cosmoshub |
| **On-chain environment** | CosmWasm (WASM) |
| **Mainnet genesis** | 2019-03-14 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Cosmos Hub runs on CometBFT (formerly Tendermint) with a validator set that signs blocks using Ed25519, while user transactions rely primarily on ECDSA secp256k1. No post-quantum cryptographic primitives are deployed anywhere in the protocol today. The Interchain Foundation (ICF) has [allocated funding in 2024](https://medium.com/the-interchain-foundation/icf-funding-program-2024-3928d3b59e2f) for a Cosmos SDK cryptography module redesign that would enable modular, future-proof signature schemes including PQC support. Additionally, DoraFactory has published an [experimental Cosmos SDK chain with PQC signatures](https://github.com/DoraFactory/cosmos-pqc) as a research proof-of-concept. Neither effort has produced deployed protocol changes on Cosmos Hub.

Cosmos Hub does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Cosmos Hub in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

Cosmos Hub uses CometBFT, a BFT consensus protocol where all [validator signing](https://docs.cometbft.com/v0.37/spec/consensus/signing) — prevotes, precommits, and proposals — relies on Ed25519. Validator identity is an Ed25519 public key, with the [validator address](https://tutorials.cosmos.network/tutorials/9-path-to-prod/3-keys.html) derived as SHA-256(pubkey)[0:20]. Blocks reach instant finality when more than two-thirds of validators sign precommits using Ed25519.

Ed25519 is an elliptic-curve scheme on Twisted Edwards Curve25519, vulnerable to Shor's algorithm. A quantum adversary capable of breaking Ed25519 could forge validator signatures, producing invalid blocks or censoring transactions. Migration would require a hard fork plus coordinated validator key rotation across the entire validator set.

**Current state.** All consensus signing is Ed25519. No post-quantum alternative has been proposed for CometBFT's consensus signatures.

**Planned future work.** The [CometBFT documentation](https://docs.cometbft.com/v0.37/spec/consensus/signing) makes no mention of post-quantum consensus signatures. The ICF-funded cryptography module redesign may eventually enable algorithm substitution, but no consensus-specific timeline has been published.

## 3. P2P Networking

**Grade: F ❌**

Cosmos Hub's [P2P networking layer](https://docs.cometbft.com/v0.37/spec/p2p/peer.html) uses a custom Tendermint protocol over TCP. Each [node's identity](https://tutorials.cosmos.network/tutorials/9-path-to-prod/5-network.html) is an Ed25519 public key. The handshake uses HKDF-SHA256 based authenticated encryption with a Diffie-Hellman component using Ed25519 keys. While HKDF-SHA256 itself is hash-based and quantum-resistant, the key agreement mechanism depends on Ed25519, making the handshake quantum-vulnerable overall.

**Current state.** Node identity and handshake authentication use Ed25519. Peer discovery relies on manual seed nodes and address book gossip.

**Planned future work.** No published roadmap addresses PQC transport for the Cosmos P2P layer.

## 4. On-Chain Logic

**Grade: F ❌**

Cosmos Hub supports smart contracts through [CosmWasm](https://cosmwasm.cosmos.network/core/standard-library/cryptography), a WebAssembly runtime. The available cryptographic host functions include secp256k1_verify, secp256k1_recover_pubkey, secp256r1_verify, and ed25519_verify — all EC or EdDSA based. Hash functions (SHA-256, Keccak256, Blake2b) are also available. No lattice-based or hash-based post-quantum signature verification primitives exist in the CosmWasm environment.

The [Cosmos SDK crypto module](https://pkg.go.dev/github.com/cosmos/cosmos-sdk/crypto/keys) supports secp256k1, Ed25519, and secp256r1, with [community discussions](https://github.com/cosmos/cosmos-sdk/discussions/8543) exploring future signature scheme support. Adding PQC precompiles would require VM and host function changes.

**Current state.** CosmWasm contracts can only verify EC and EdDSA signatures. No PQC verification operations are available.

**Planned future work.** The [ICF 2024 funding program](https://medium.com/the-interchain-foundation/icf-funding-program-2024-3928d3b59e2f) targets a cryptography module redesign that may eventually expose PQC-safe primitives to contracts, but no timeline has been published.

## 5. Other Features

**Grade: D ⚠️**

### IBC (Inter-Blockchain Communication)

[IBC](https://github.com/cosmos/ibc/blob/main/spec/core/ics-002-client-semantics/README.md) provides secure, permissionless cross-chain message passing using light clients. IBC light clients verify packets by checking validator Ed25519 signatures from counterparty chains — specifically, they verify LastCommit signatures at block height H+1 to confirm the AppHash at H.

If a counterparty chain's validators' Ed25519 keys are compromised by a quantum computer, IBC light clients on Cosmos Hub cannot verify counterparty state. Bridged tokens and cross-chain state become untrustable retroactively. The IBC protocol is built around signature verification; migrating to an alternative verification method would require a protocol-level redesign.

The [ICF 2024 funding program](https://medium.com/the-interchain-foundation/icf-funding-program-2024-3928d3b59e2f) includes a cryptography module redesign for the Cosmos SDK that could eventually enable modular signature schemes including PQC. DoraFactory has published an [experimental Cosmos SDK chain with PQC signatures](https://github.com/DoraFactory/cosmos-pqc) as a research proof-of-concept, though it has not been integrated into Cosmos Hub or IBC production code.

**Current state.** IBC security is entirely dependent on Ed25519 validator signatures from counterparty chains. No PQC-safe light client verification exists.

**Planned future work.** The ICF-funded cryptography module redesign may eventually enable modular signature schemes that could be adopted by IBC, but no IBC-specific PQC migration plan has been published.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ⚠️.

The Interchain Foundation has [allocated funding](https://medium.com/the-interchain-foundation/icf-funding-program-2024-3928d3b59e2f) for a Cosmos SDK cryptography module redesign that would support modular, future-proof cryptography including PQC. This is enabling infrastructure — it makes algorithm substitution possible — but it is not an EC deprecation plan. No category of Cosmos Hub's cryptography has a published sunset schedule for EC removal.

A full EC migration would likely require a modular cryptography layer in the SDK, dual-signature support during transition, a hard fork to activate PQC consensus or transaction validation, coordinated validator key rotation, and IBC client protocol redesign for alternative verification methods.

**Current state.** EC cryptography (secp256k1 for transactions, Ed25519 for consensus/P2P/IBC) is deeply embedded in the protocol. No category has a published EC retirement plan.

**Planned future work.** The cryptography module redesign (expected "2024+") will enable modular signature schemes, but PQC integration remains unscheduled.

## Governance

Cosmos Hub governance operates through the [x/governance module](https://hub.cosmos.network/main/governance), where ATOM token holders vote on text proposals, parameter changes, and software upgrades. A simple majority (>50%) with quorum (40%) is required for most proposals. Validators with one-third of voting power can veto proposals.

No formal PQC proposals have been filed through Cosmos Hub's on-chain governance process. PQC-related activity is limited to:

- **ICF Funding Program 2024** — The Interchain Foundation [announced funding](https://medium.com/the-interchain-foundation/icf-funding-program-2024-3928d3b59e2f) for Cosmos SDK cryptography module redesign including post-quantum support. This is a Foundation-level funding decision, not an on-chain governance action. Target completion is unknown.
- **DoraFactory cosmos-pqc** — An [experimental Cosmos SDK chain](https://github.com/DoraFactory/cosmos-pqc) with PQC signatures, published as a research proof-of-concept. Not integrated into Cosmos Hub.
- **SDK Discussion #8543** — A [community discussion](https://github.com/cosmos/cosmos-sdk/discussions/8543) on Ed25519 support and future signature schemes in the Cosmos SDK.

No formal community discourse on PQC migration timeline has occurred on the Cosmos Hub governance forum.

---

_Generated on 07 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
