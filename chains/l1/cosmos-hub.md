# Cosmos Hub (ATOM) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Cosmos Hub |
| **Ticker** | ATOM |
| **Website** | [cosmos.network](https://cosmos.network) |
| **GitHub** | [cosmos](https://github.com/cosmos) |
| **Twitter / X** | [@cosmoshub](https://x.com/cosmoshub) |
| **On-chain environment** | CosmWasm (WASM) |
| **Mainnet genesis** | 2019-03-14 |
| **Current mainnet version** | gaia v27.x (cosmoshub-4) (2026) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Cosmos Hub runs on CometBFT (formerly Tendermint) with a validator set that signs blocks using Ed25519, while user transactions rely primarily on ECDSA secp256k1. No post-quantum cryptographic primitives are deployed on Cosmos Hub today. However, upstream development has reached a significant milestone: as of June 2, 2026, the full **ML-DSA-65** signing path — covering both validator keys and user account keys — is merged in the Cosmos SDK and CometBFT main branches. The three key pull requests are [cometbft#5875](https://github.com/cometbft/cometbft/pull/5875) (ML-DSA-65 key type via Cloudflare's CIRCL library), [cosmos-sdk#26436](https://github.com/cosmos/cosmos-sdk/pull/26436) (ML-DSA-65 validator keys), and [cosmos-sdk#26472](https://github.com/cosmos/cosmos-sdk/pull/26472) (ML-DSA-65 account keys, merged 2026-06-02). Cosmos Hub has not yet adopted these changes — no governance upgrade proposal has been filed — but the capability is available on the next dependency bump. The Interchain Foundation (ICF) has also [allocated funding in 2024](https://medium.com/the-interchain-foundation/icf-funding-program-2024-3928d3b59e2f) for a broader Cosmos SDK cryptography module redesign, and DoraFactory has published an [experimental Cosmos SDK chain with PQC signatures](https://github.com/DoraFactory/cosmos-pqc) as a research proof-of-concept.

Because the Cosmos SDK is shared infrastructure, every chain built on it — including Osmosis, Akash, Babylon, Injective, Kava, Sei, Initia, Provenance, Cronos, Mantra, THORChain, Agoric, Berachain, ASI Alliance, and Story — inherits the ML-DSA-65 capability on its next `go.mod` bump. As of June 7, 2026, no consumer chain has bumped yet.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA-65** | secp256k1 (ECDSA) | Tx Signatures | Discussed |
| **ML-DSA-65** | Ed25519 | Consensus | Discussed |

## Transaction Signatures

**Grade: D ⚠️**

Cosmos Hub uses ECDSA secp256k1 as the primary and default transaction signing scheme. The Cosmos SDK also supports Ed25519, secp256r1, and legacy multisig, but secp256k1 is predominant on the Hub. Addresses are derived as the first 20 bytes of SHA-256(pubkey).

**Current state.** All transaction signing uses secp256k1. However, upstream [cosmos/cosmos-sdk#26472](https://github.com/cosmos/cosmos-sdk/pull/26472) — "feat!: Add ml-dsa-65 account keys" — was merged on June 2, 2026. This breaking change adds **ML-DSA-65** keyring creation (`--algo ml_dsa_65`), a transaction signing and verification path, and a `SigVerifyCostMlDsa65` gas parameter. Combined with the previously merged validator-key PRs ([cosmos-sdk#26436](https://github.com/cosmos/cosmos-sdk/pull/26436) and [cometbft#5875](https://github.com/cometbft/cometbft/pull/5875)), the complete operator-to-user ML-DSA-65 signing path is now in the Cosmos SDK main branch. Cosmos Hub inherits this capability on its next dependency bump, but no Hub upgrade proposal exists yet.

**Planned future work.** The [ICF-funded cryptography module redesign](https://medium.com/the-interchain-foundation/icf-funding-program-2024-3928d3b59e2f) continues in parallel. The next milestone to watch is whether a Cosmos Hub governance proposal is filed to adopt a gaia release that includes the ML-DSA-65 SDK version.

## Consensus

**Grade: D ⚠️**

Cosmos Hub uses CometBFT, a BFT consensus protocol where all [validator signing](https://docs.cometbft.com/v0.37/spec/consensus/signing) — prevotes, precommits, and proposals — relies on Ed25519. Validator identity is an Ed25519 public key, with the [validator address](https://tutorials.cosmos.network/tutorials/9-path-to-prod/3-keys.html) derived as SHA-256(pubkey)[0:20]. Blocks reach instant finality when more than two-thirds of validators sign precommits using Ed25519.

**Current state.** All consensus signing is Ed25519. Three upstream pull requests have now been merged that introduce **ML-DSA-65** as a validator key option:

- [cometbft/cometbft#5875](https://github.com/cometbft/cometbft/pull/5875) — "feat: Add ml-dsa 65 key type" (+822/-60 across 27 files). Uses Cloudflare's [CIRCL](https://github.com/cloudflare/circl) library. Includes end-to-end test fixtures for networks using ML-DSA-65 throughout.
- [cosmos/cosmos-sdk#26436](https://github.com/cosmos/cosmos-sdk/pull/26436) — "feat: Update for ml-dsa-65 validator keys" (+1417/-238 across 52 files).
- [cosmos/cosmos-sdk#26472](https://github.com/cosmos/cosmos-sdk/pull/26472) — "feat!: Add ml-dsa-65 account keys" (merged 2026-06-02, +497/-73 across 26 files). Completes the operator+user cascade.

These PRs are all merged in upstream main branches. Cosmos Hub has not yet adopted these changes.

**Planned future work.** The upstream PRs are merged and ready for consumption. The [ICF-funded cryptography module redesign](https://medium.com/the-interchain-foundation/icf-funding-program-2024-3928d3b59e2f) continues in parallel. The next step is a gaia release that bumps to an SDK version containing ML-DSA-65, followed by a governance upgrade proposal.

## P2P Networking

**Grade: F ❌**

Cosmos Hub's [P2P networking layer](https://docs.cometbft.com/v0.37/spec/p2p/peer.html) uses a custom Tendermint protocol over TCP. Each [node's identity](https://tutorials.cosmos.network/tutorials/9-path-to-prod/5-network.html) is an Ed25519 public key. The handshake uses HKDF-SHA256 based authenticated encryption with a Diffie-Hellman component using Ed25519 keys. While HKDF-SHA256 itself is hash-based and quantum-resistant, the key agreement mechanism depends on Ed25519, making the handshake quantum-vulnerable overall.

**Current state.** Node identity and handshake authentication use Ed25519. Peer discovery relies on manual seed nodes and address book gossip.

**Planned future work.** No published roadmap addresses post-quantum transport for the Cosmos P2P layer.

## On-Chain Logic

**Grade: F ❌**

Cosmos Hub supports smart contracts through [CosmWasm](https://cosmwasm.cosmos.network/core/standard-library/cryptography), a WebAssembly runtime. The available cryptographic host functions include secp256k1_verify, secp256k1_recover_pubkey, secp256r1_verify, and ed25519_verify — all EC or EdDSA based. Hash functions (SHA-256, Keccak256, Blake2b) are also available. No post-quantum signature verification primitives exist in the CosmWasm environment.

The [Cosmos SDK crypto module](https://pkg.go.dev/github.com/cosmos/cosmos-sdk/crypto/keys) supports secp256k1, Ed25519, and secp256r1, with [community discussions](https://github.com/cosmos/cosmos-sdk/discussions/8543) exploring future signature scheme support. Adding post-quantum verification primitives would require VM and host function changes.

**Current state.** CosmWasm contracts can only verify EC and EdDSA signatures. No post-quantum verification operations are available.

**Planned future work.** The [ICF 2024 funding program](https://medium.com/the-interchain-foundation/icf-funding-program-2024-3928d3b59e2f) targets a cryptography module redesign that may eventually expose post-quantum primitives to contracts, but no timeline has been published.

## Other Features

**Grade: D ⚠️**

### IBC (Inter-Blockchain Communication)

[IBC](https://github.com/cosmos/ibc/blob/main/spec/core/ics-002-client-semantics/README.md) provides secure, permissionless cross-chain message passing using light clients. IBC light clients verify packets by checking validator Ed25519 signatures from counterparty chains — specifically, they verify LastCommit signatures at block height H+1 to confirm the AppHash at H.

If a counterparty chain's validators' Ed25519 keys are compromised by a quantum computer, IBC light clients on Cosmos Hub cannot verify counterparty state. Bridged tokens and cross-chain state become untrustable retroactively. The IBC protocol is built around signature verification; migrating to an alternative verification method would require a protocol-level redesign.

**Current state.** IBC security is entirely dependent on Ed25519 validator signatures from counterparty chains. No post-quantum light client verification exists. The upstream **ML-DSA-65** validator key PRs (now merged) would enable PQC-signed blocks, which IBC light clients could eventually verify — but no IBC-specific integration work has been published.

**Planned future work.** The ICF-funded cryptography module redesign may eventually enable modular signature schemes that could be adopted by IBC, but no IBC-specific post-quantum migration plan has been published.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ⚠️, P2P ❌, On-Chain ❌, Other ⚠️.

The Interchain Foundation has [allocated funding](https://medium.com/the-interchain-foundation/icf-funding-program-2024-3928d3b59e2f) for a Cosmos SDK cryptography module redesign that would support modular, future-proof cryptography including post-quantum support. This is enabling infrastructure — it makes algorithm substitution possible — but it is not an EC deprecation plan. No category of Cosmos Hub's cryptography has a published sunset schedule for EC removal.

A full EC migration would likely require a modular cryptography layer in the SDK, dual-signature support during transition, a hard fork to activate PQC consensus or transaction validation, coordinated validator key rotation, and IBC client protocol redesign for alternative verification methods.

**Current state.** EC cryptography (secp256k1 for transactions, Ed25519 for consensus/P2P/IBC) is deeply embedded in the protocol. No category has a published EC retirement plan.

**Planned future work.** The cryptography module redesign (expected "2024+") will enable modular signature schemes, but PQC integration remains unscheduled. The merged **ML-DSA-65** PRs add PQC as an option alongside existing EC schemes; they do not remove or deprecate EC.

## Governance

Cosmos Hub governance operates through the [x/governance module](https://hub.cosmos.network/main/governance), where ATOM token holders vote on text proposals, parameter changes, and software upgrades. A simple majority (>50%) with quorum (40%) is required for most proposals. Validators with one-third of voting power can veto proposals.

No formal PQC proposals have been filed through Cosmos Hub's on-chain governance process. PQC-related activity is limited to upstream SDK/CometBFT development and Foundation-level funding:

- **ICF Funding Program 2024** — The Interchain Foundation [announced funding](https://medium.com/the-interchain-foundation/icf-funding-program-2024-3928d3b59e2f) for Cosmos SDK cryptography module redesign including post-quantum support. This is a Foundation-level funding decision, not an on-chain governance action. Target completion is unknown.
- **cometbft/cometbft#5875** — [ML-DSA-65 key type PR](https://github.com/cometbft/cometbft/pull/5875) (merged). Adds ML-DSA-65 as a validator key option via CIRCL.
- **cosmos/cosmos-sdk#26436** — [ML-DSA-65 validator keys PR](https://github.com/cosmos/cosmos-sdk/pull/26436) (merged). Adds ML-DSA-65 validator keys to the Cosmos SDK.
- **cosmos/cosmos-sdk#26472** — [ML-DSA-65 account keys PR](https://github.com/cosmos/cosmos-sdk/pull/26472) (merged 2026-06-02). Adds ML-DSA-65 user account key support (`--algo ml_dsa_65` keyring, tx sign/verify path, gas parameter). Breaking change.
- **DoraFactory cosmos-pqc** — An [experimental Cosmos SDK chain](https://github.com/DoraFactory/cosmos-pqc) with PQC signatures, published as a research proof-of-concept. Not integrated into Cosmos Hub.
- **SDK Discussion #8543** — A [community discussion](https://github.com/cosmos/cosmos-sdk/discussions/8543) on Ed25519 support and future signature schemes in the Cosmos SDK.

No formal community discourse on PQC migration timeline has occurred on the Cosmos Hub governance forum.

---

_Generated on 08 Jun 2026 based on information as of 08 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
