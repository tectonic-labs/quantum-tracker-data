# GateChain (GT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | GateChain |
| **Ticker** | GT |
| **Website** | https://gatechain.io/ |
| **GitHub** | https://github.com/gatechain |
| **On-chain environment** | EVM |
| **Current mainnet version** | Block version v21; consensus v1.2.1 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

GateChain is an EVM-compatible L1 developed and operated by Gate (formerly Gate.io). It runs GateMint consensus — a PoS + BFT design drawing on Algorand-style VRF leader selection — built on Cosmos SDK / Tendermint infrastructure, with an Ethereum-equivalent EVM execution layer. Its flagship feature is the Vault Account: a state-machine mechanism that makes transfers revocable within a configurable block-height window. This is a transaction-lifecycle feature, not a cryptographic one; vault accounts are still controlled by standard secp256k1 keys.

Every cryptographic layer uses elliptic-curve primitives: ECDSA secp256k1 for EVM transactions, Ed25519 for VRF-based consensus and BFT voting, Ed25519/X25519 for Tendermint P2P, and Ethereum-equivalent EC precompiles for on-chain logic. The [GateChain crypto library](https://github.com/gatechain/crypto) lists Ed25519, secp256k1, BIP32-ed25519, Curve25519, sr25519, VRF, and multisig — no PQC algorithms appear. GateChain's documentation and GitHub organisation contain no reference to post-quantum cryptography. No public roadmap, proposal, or governance discussion addressing PQC has been identified.

## Proposed and Implemented PQC Algorithms

> GateChain does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for GateChain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for GateChain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for GateChain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for GateChain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### Vault Accounts / Revocable Transactions

GateChain's [Vault Account](https://medium.com/@gatechain/gatechain-security-mechanism-explained-f08f0fac4a3d) is a "secure account" model that makes outgoing transfers revocable during a configurable block-height delay window. Funds sent from a vault to a Normal Account can be recalled via a `revoke` operation, sending them to a pre-designated Retrieval Account. There is also a clearing-height parameter for future-dated asset settlement.

This mechanism is a state-machine and transaction-lifecycle construct, not a cryptographic scheme. Vault accounts are controlled by standard secp256k1 keys; the revoke and clearing operations are themselves secp256k1-signed transactions. The delay window mitigates classical key theft where the legitimate owner still controls the key, but provides no protection against a quantum adversary who can forge the owner's signature — such an adversary can equally sign the revoke or drain the Retrieval Account.

**Current state.** EC-keyed. No PQC migration planned.

**Planned future work.** None documented.

### GateBridge (Official Cross-Chain Bridge)

[GateBridge](https://gatechain.io/gate_bridge/) is Gate's official on-chain gateway moving GT and other assets between GateChain, the GateChain EVM, Ethereum, and other chains. Per a September 2025 overhaul, LayerZero is also used as a cross-chain rail. All attestation is EC-based (secp256k1 / Ed25519 depending on the chain leg). A quantum break of attestation keys would enable forged cross-chain mint messages and asset theft.

**Current state.** All rails EC-attested. No PQC migration announced.

**Planned future work.** None documented.

### Gate Layer (OP Stack L2)

[Gate Layer](https://www.gatechain.io/docs/GateLayer/Introduction/TechnicalArchitecture/) is an optimistic rollup launched September 2025 that settles to GateChain for settlement and data availability. It uses an OP Stack architecture — sequencer, batcher, proposer, challengers — with EIP-4844 KZG blob commitments on the L1 side. All components are EC-based (secp256k1 sequencer/batcher/proposer keys, KZG/BLS12-381 blob commitments). This entry is a pointer; the L2 tech-stack evaluation covers OP Stack properties in detail.

**Current state.** EC throughout; no PQC work.

**Planned future work.** None documented.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

GateChain's documentation contains no reference to post-quantum cryptography. No commitment to retire EC on any layer — transaction signing, consensus, P2P, precompiles, vault/bridge features — has been published by Gate or the GateChain Foundation.

**Current state.** No EC retirement plan.

**Planned future work.** None identified.

## Governance

GateChain's protocol is governed by Gate (formerly Gate.io) and the GateChain Foundation through direct coordination with node operators. There is no formal public proposal track analogous to EIPs or FIPs. Protocol changes are distributed as [node-binary releases](https://github.com/gatechain/node-binary) via the GateChain GitHub organisation; once a supermajority of consensus nodes run the new binary, a network-wide upgrade vote is triggered. [Upgrade announcements](https://www.gatechain.io/docs/announcements/) are published through official channels.

No PQC-relevant proposals have been identified in any GateChain or Gate governance channel.

---

_Generated on 03 Jun 2026 based on information as of 16 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
