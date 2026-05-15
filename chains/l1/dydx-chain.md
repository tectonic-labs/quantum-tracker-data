# dYdX Chain (DYDX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | dYdX Chain |
| **Ticker** | DYDX |
| **Website** | https://dydx.exchange |
| **GitHub** | https://github.com/dydxprotocol |
| **Derived from** | Cosmos SDK / CometBFT |
| **On-chain environment** | Cosmos SDK protocol modules (no general smart-contract VM) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

dYdX Chain (often called dYdX v4) is an application-specific Cosmos SDK + CometBFT proof-of-stake chain purpose-built for perpetual-futures trading. Unlike a general-purpose L1, it does **not** ship a general smart-contract VM: there is no CosmWasm and no EVM. All on-chain behavior is hard-coded into protocol-native Cosmos SDK modules (`clob`, `perpetuals`, `subaccounts`, `prices`, `rewards`, `vault`, and so on), with an in-protocol central limit order book and matching engine that run across the [validator set](https://docs.dydx.exchange/) and settle on chain. Readers expecting a generic L1 with deployable user contracts should keep that scope in mind throughout this report.

Cryptographically, dYdX Chain inherits the standard Cosmos stack: secp256k1 ECDSA for user transactions via Cosmos SDK [`x/auth`](https://pkg.go.dev/github.com/cosmos/cosmos-sdk/crypto/keys), and Ed25519 for [CometBFT validator block signing](https://docs.cometbft.com/v0.37/spec/consensus/signing) and [P2P node identity](https://docs.cometbft.com/v0.37/spec/p2p/peer.html). No post-quantum primitives are deployed anywhere in the protocol today, and no dYdX Improvement Proposal (DIP) on the [governance forum](https://dydx.forum/) targets PQC migration as of the information date for this report.

dYdX Chain does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for dYdX Chain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for dYdX Chain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for dYdX Chain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

dYdX Chain does not expose a general smart-contract environment. Its on-chain logic is implemented entirely as built-in Cosmos SDK protocol modules — the [v4-chain source](https://github.com/dydxprotocol/v4-chain) hosts the `clob`, `perpetuals`, `subaccounts`, `prices`, `rewards`, and related modules — and third parties cannot deploy bytecode or call signature-verification host functions of any kind. As a result there is no contract-callable signature-verification primitive at all on dYdX Chain, neither elliptic-curve nor post-quantum.

This category rates the *availability* of a post-quantum verification primitive that on-chain logic can call. Because the underlying [Cosmos SDK crypto module](https://pkg.go.dev/github.com/cosmos/cosmos-sdk/crypto/keys) already exposes secp256k1 and Ed25519 verification utilities to module code, the chain *could* expose a post-quantum primitive to its native modules in the same way. It has not done so, and no such work is on the public record.

**Current state.** No post-quantum verification primitive is exposed on dYdX Chain, in protocol modules or anywhere else.

**Planned future work.** No public roadmap addresses adding a post-quantum verification primitive to dYdX Chain's protocol modules.

## 5. Other Features

**Grade: F ❌**

### In-protocol orderbook and matching engine

The defining feature of dYdX Chain is its in-protocol central limit order book (CLOB) and matching engine. Per the [dYdX v4 Whitepaper](https://dydx.exchange/dydx-chain-whitepaper.pdf), orders are gossiped across the validator set and held in validator memory off chain, while matches are produced as on-chain transactions and settlement is on chain. Cryptographically, the orderbook and matching engine are application logic — they introduce no new signature scheme beyond the CometBFT validator signatures used for block production.

**Current state.** All cryptographic exposure here rolls up to CometBFT validator signing, which remains Ed25519. No post-quantum alternative exists for the CLOB or matching path.

**Planned future work.** No public roadmap addresses post-quantum cryptography for the in-protocol orderbook or matching engine.

### IBC

dYdX Chain participates in [Inter-Blockchain Communication (IBC)](https://docs.dydx.exchange/), connecting to other Cosmos zones (notably Noble for USDC). IBC light clients verify counterparty state by checking CometBFT validator Ed25519 signatures from the counterparty chain. If those signatures are compromised, IBC packet verification on dYdX Chain becomes untrustable.

**Current state.** IBC verification on dYdX Chain depends entirely on Ed25519 validator signatures from counterparty chains. No post-quantum light-client verification exists.

**Planned future work.** No dYdX-specific roadmap covers post-quantum IBC verification.

### Ethereum bridge for the DYDX token

The DYDX token originally launched as an ERC-20 on Ethereum during the dYdX v3 era and was [bridged into the v4 chain](https://www.dydxopsdao.com/blog) as wethDYDX, routed through Noble. The cryptography along this path is the standard elliptic-curve stack end to end: Ethereum secp256k1 ECDSA on the source side, CometBFT Ed25519 on the dYdX Chain side, and IBC light-client proofs (also Ed25519-rooted) in between.

**Current state.** Bridge cryptography is fully elliptic-curve. No post-quantum component is in the path.

**Planned future work.** No public roadmap addresses post-quantum cryptography on the ethDYDX → wethDYDX bridge.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

dYdX Chain's elliptic-curve cryptography is deeply embedded: secp256k1 for transaction signatures via [Cosmos SDK `x/auth`](https://pkg.go.dev/github.com/cosmos/cosmos-sdk/crypto/keys), and Ed25519 for [CometBFT consensus signing](https://docs.cometbft.com/v0.37/spec/consensus/signing) and [P2P node identity](https://docs.cometbft.com/v0.37/spec/p2p/peer.html). No dYdX Improvement Proposal on the [dYdX governance forum](https://dydx.forum/) discusses removing any of these primitives, and no EC retirement schedule has been published by the project. Elliptic curve cryptography remains the indefinite default across the full stack.

**Current state.** No EC retirement plan has been published for any category of dYdX Chain's cryptography.

**Planned future work.** No EC retirement timeline exists on the public record.

## Governance

dYdX Chain governance happens through dYdX Improvement Proposals (DIPs) and discussion on the [dYdX governance forum](https://dydx.forum/). As of the information date for this report, no DIP filed on the forum addresses post-quantum cryptography, signature-scheme migration, or elliptic-curve retirement. The [v4-chain repository](https://github.com/dydxprotocol/v4-chain) likewise has no open work targeting post-quantum primitives. Readers wanting to follow current state should watch the governance forum and the v4-chain repository directly.

---

_Generated on 14 May 2026 based on information as of 14 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
