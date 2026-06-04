# Flow (FLOW) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Flow |
| **Ticker** | FLOW |
| **Website** | [flow.com](https://flow.com/) |
| **GitHub** | [onflow](https://github.com/onflow/flow-go) |
| **On-chain environment** | Cadence (resource-oriented, capability-based VM) plus Flow EVM (Ethereum-compatible execution via Cadence-Owned Accounts) |
| **Current mainnet version** | flow-go v8.x (Q1 2026 HCUs; Forte upgrade Oct 2025) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Flow is a Foundation-stewarded L1 with a [HotStuff-derived BFT consensus](https://developers.flow.com/networks/node-ops/node-operation/node-roles) distributed across specialized node roles (Collection / Consensus / Execution / Verification). User accounts are unusual among L1s: addresses are decoupled from key material, and each account holds a [multi-key, weighted, algorithm-tagged registry](https://developers.flow.com/build/basics/accounts) authorized to a 1000-unit threshold. A second execution surface, [Flow EVM](https://developers.flow.com/build/evm/how-it-works), runs full Ethereum-compatible bytecode and is accessed from Cadence via Cadence-Owned Accounts.

The headline post-quantum observation for Flow is structural: the algorithm-tagged account-key registry could in principle accept additional algorithm IDs without disturbing existing addresses, on-chain history, or staking positions — accounts would simply gain a new key alongside their existing classical keys. This makes Flow a relatively clean *latent* migration substrate compared with chains where address derivation is bound to a specific key type. The capability is unrealized, however: no Flow Improvement Proposal targeting a post-quantum scheme has been filed in [onflow/flips](https://github.com/onflow/flips) as of this writing, the [Flow Go SDK crypto package](https://github.com/onflow/flow-go-sdk/blob/master/crypto/crypto.go) implements only ECDSA (P-256, secp256k1) and BLS-BLS12-381, and the Flow Foundation has not published a post-quantum migration roadmap. Consensus and networking sit on BLS-BLS12-381 and classical libp2p respectively, and Flow EVM transitively imports Ethereum's classical-cryptography exposure.

## Proposed and Implemented PQC Algorithms

Flow does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: D ⚠️**

Flow's account model is structurally distinctive. Each [account](https://developers.flow.com/build/basics/accounts) holds a registry of one or more keys, each tagged with a signature algorithm, a hash algorithm, and an authorization weight. A transaction is authorized when the signing keys' combined weights reach 1000 units, allowing native multi-signature and threshold patterns (e.g. two 500-weight keys for 2-of-2; mixed-curve quorums). Addresses are allocated by the protocol at account creation rather than derived from a public key, which decouples the account identifier from any specific key material.

**Current state.** The currently-populated registry entries are ECDSA P-256 (the default), ECDSA secp256k1, and (validator-side) BLS-BLS12-381 — all classical EC. [FLIP-264](https://developers.flow.com/build/cadence/advanced-concepts/passkeys) added passkey / WebAuthn credentials (ES256 / ES256k) as an account-key option, which remain pre-quantum. The native multi-key, weighted-threshold model is widely cited in [Flow developer materials](https://developers.flow.com/build/key-concepts/accounts) as a clean substrate for an additive migration, since adding a new algorithm ID would not require users to move funds or change addresses.

**Planned future work.** No [FLIP](https://github.com/onflow/flips) targeting a post-quantum signature algorithm has been filed, and the Flow Foundation has not published a migration timeline. The architectural readiness exists; a concrete proposal does not.

## Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Flow in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Flow in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Flow in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

Flow does not support any special features.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

We have found no public information indicating migration activity for Flow in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Flow is stewarded by the Flow Foundation, which maintains the canonical [`onflow/flow-go`](https://github.com/onflow/flow-go) reference implementation. Community governance flows through Flow Improvement Proposals at [onflow/flips](https://github.com/onflow/flips), structured into Application, Cadence, Governance, and Protocol categories with sponsors and a public review process. Network upgrades ("sporks") are coordinated by the Flow Foundation in collaboration with node operators on a roughly quarterly cadence; mainnet has run since 2020 and has shipped multiple major upgrades, most recently Crescendo (2024) which introduced [Flow EVM](https://developers.flow.com/build/evm/how-it-works).

A search of the FLIP repository as of this writing returns no proposals targeting post-quantum signature schemes — draft or otherwise. We have located no Flow Foundation blog post, roadmap entry, or public statement on post-quantum migration.

---

_Generated on 09 May 2026 based on information as of 09 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
