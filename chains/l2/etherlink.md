# Etherlink (XTZ) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Etherlink |
| **Ticker** | XTZ |
| **Website** | https://docs.etherlink.com |
| **Stack** | Tezos Smart Rollup (WASM PVM) |
| **Settlement layer** | Tezos L1 |
| **Data availability** | Tezos L1 inbox |
| **Proof type** | Fraud proofs (WASM PVM dissection / refutation game) |
| **Sequencer model** | Centralized (Etherlink team — Nomadic Labs / Tezos Foundation) |
| **On-chain environment** | EVM (EVM-compatible via WASM kernel) |

## Summary Table

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | B | 🔧 | In Development |
| Data Availability | C | 🗺️ | Roadmapped |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Summary

Etherlink is the primary production deployment of the Tezos Smart Rollup stack. It is an EVM-compatible optimistic rollup that settles to Tezos L1 using a WASM-based fraud proof system called the PVM (Proof-generating Virtual Machine). Transaction data is published directly to the Tezos L1 inbox, meaning DA security is fully Tezos-native rather than relying on a separate committee. Etherlink's settlement and DA posture are tied to Tezos L1's PQC trajectory — and Tezos L1 has a more active PQC story than most L1s, with Nomadic Labs having proposed tz5/ML-DSA-44 (ML-DSA-44 transaction signing) in February 2026 via the Tezos governance process. That proposal is on testnet and feature-flagged for mainnet but has not yet been activated, giving the settlement layer an in-development rating.

Etherlink has two EC exposure layers on top of Tezos L1: it exposes an EVM interface for users (secp256k1 ECDSA transaction signatures, standard EVM precompiles) and the rollup operator uses Tezos EC account keys (Ed25519 or BLS12-381) to sign commitment transactions on Tezos L1. The fraud proof protocol itself is architecturally more favorable than EC-pairing-based ZK-SNARKs — the WASM bisection game is hash-based — but the commitment and challenge lifecycle is gated on EC-signed L1 transactions, making the overall proof system EC-dependent. A key structural advantage for Etherlink is Tezos's self-amending governance: once tz5 activates, rollup operators could migrate to PQC-signed L1 commitment transactions without a contentious fork, and the WASM kernel can be upgraded independently of the L1 protocol.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| ML-DSA-44 (tz5) | Ed25519 / secp256k1 / BLS12-381 (Tezos L1 tx sigs) | Settlement Layer (Tezos L1) | Proposed — testnet active, mainnet feature-flagged; not yet activated |

## Settlement Layer

**Grade: B 🔧**

Etherlink settles to Tezos L1 via the Smart Rollup commitment protocol: state roots are published to Tezos L1 and finalized after a challenge period. The settlement layer's PQC posture is determined by Tezos L1. Nomadic Labs proposed tz5/ML-DSA-44 — adding ML-DSA-44 as a native Tezos transaction signing type — in February 2026. The tz5 feature is active on the Tezos testnet and feature-flagged for mainnet, placing the settlement layer in the In Development tier.

Smart Rollup originator and operator keys are Tezos account keys (Ed25519 tz1 or BLS12-381 tz4), all EC. A cryptographically relevant quantum computer forging those keys could submit fraudulent commitments or disrupt the challenge lifecycle. Once tz5 activates on Tezos L1, operators could migrate to ML-DSA-44 tz5 keys without a rollup-level protocol change — this is a stronger migration path than most Ethereum-settled L2s where settlement-layer PQC is further out.

## Data Availability

**Grade: C 🗺️**

Etherlink uses the Tezos L1 inbox as its DA layer — transaction input messages are posted directly as Tezos L1 operations, so data availability is as reliable as Tezos L1 itself. There is no separate DA committee. Tezos L1 consensus (Tenderbake BFT) uses Ed25519 and BLS12-381 baker signatures, all EC-based. The tz5/ML-DSA-44 proposal is for transaction signing, not baker consensus, so the DA layer's EC dependency is not directly addressed by tz5. There is no concrete plan to migrate Tezos L1 consensus signing to PQC, but it is expected to be a downstream item if and when tz5 activates. The roadmapped rating reflects the upstream Tezos roadmap rather than a specific DA PQC commitment.

## Proof / Verification

**Grade: F ❌**

Etherlink uses WASM PVM fraud proofs. When a commitment is disputed, a dissection/refutation game binary-bisects the execution trace down to a single WASM instruction, which Tezos L1 re-executes directly. The WASM execution trace itself is deterministic and hash-based — there are no EC pairings involved in the computation. This makes the proof mechanism architecturally more quantum-favorable than EC-pairing-based ZK-SNARKs.

However, the commitment and challenge lifecycle is gated on EC-signed Tezos L1 transactions: the Smart Rollup Operator signs commitment submissions with their EC account key, and any challenger must sign dispute transactions with an EC key. A cryptographically relevant quantum computer forging the operator's key could submit fraudulent state roots, potentially bypassing the refutation game entirely. No PQC fraud proof roadmap has been published for Etherlink or the Smart Rollup stack specifically, though tz5 activation at L1 would create a migration path.

A RISC-V PVM migration is planned for H2 2026, but this does not address the EC signing dependency.

> We have found no public information indicating migration activity for Etherlink in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Transaction Signatures

**Grade: F ❌**

Etherlink is EVM-compatible, so user transactions use ECDSA over secp256k1, identical to the Ethereum transaction format. Address derivation is the EVM standard (last 20 bytes of keccak-256 of the public key). ERC-4337 account abstraction is supported at the application layer. The underlying Tezos L1 natively supports Ed25519 (tz1), secp256k1 (tz2), P-256 (tz3), and BLS12-381 (tz4) — all EC. The tz5/ML-DSA-44 proposal is for Tezos L1 native transactions and does not automatically apply to Etherlink EVM user transactions unless explicitly integrated by a rollup kernel upgrade.

> We have found no public information indicating migration activity for Etherlink in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Networking

**Grade: F ❌**

Etherlink uses a single centralized Smart Rollup Operator (Etherlink team, operated by Nomadic Labs / Tezos Foundation). The operator ingests and orders transactions. Smart Rollup nodes sync primarily from the Tezos L1 inbox rather than a rollup p2p gossip network; limited p2p exists between rollup nodes for state sync but it is not a public gossip layer. The operator uses a Tezos EC account key (Ed25519 or BLS12-381) for signing L1 commitment transactions. RPC transport uses standard TLS with classical ECDHE cipher suites. No PQC networking or node identity work has been published.

> We have found no public information indicating migration activity for Etherlink in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Environment

**Grade: F ❌**

Etherlink's on-chain environment has two layers. The outer EVM-compatible interface exposes the standard EVM precompile set: `ecrecover` (0x01), `ecAdd`/`ecMul`/`ecPairing` over BN254 (0x06–0x08), `modexp` (0x05), SHA-256, and Keccak-256. The underlying WASM kernel is architecturally flexible — it can implement arbitrary logic including PQC signature verification entirely in kernel bytecode — but no production kernel does so. Tezos L1 Michelson supports Ed25519, secp256k1, P-256, and BLS12-381 signature verification, with tz5 PQC opcodes pending activation. No PQC signature verification primitive is available on Etherlink today.

> We have found no public information indicating migration activity for Etherlink in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

**Grade: F ❌**

**FA bridge (Tezos ticket mechanism)**: The FA bridge moves assets between Tezos L1 and Etherlink using the Tezos ticket mechanism. L1→L2 transfers and L2→L1 withdrawals are gated by the Smart Rollup commitment lifecycle. Bridge security is tied to Tezos L1 consensus integrity and the EC-signature chain on rollup commitments. Once tz5 activates, bridge users could optionally use tz5/ML-DSA-44 keys for ticket operations on the L1 side.

**Tezos self-amending governance (crypto agility)**: Tezos's on-chain amendment process can upgrade the protocol — including adding new signature types or PQC opcodes to Michelson — without a hard fork. Governance votes are cast by EC-keyed delegates. This is a structural advantage: the WASM kernel can also be upgraded independently of the L1 protocol. This flexibility is Etherlink's strongest differentiator compared to other L2 stacks from a PQC migration standpoint, but no migration has been executed yet.

**Tezos Sapling privacy (inherited risk)**: Sapling is an optional privacy protocol for Tezos L1 fungible tokens, using Groth16 zk-SNARKs over BLS12-381 elliptic-curve pairings. A cryptographically relevant quantum computer breaks Groth16, retroactively deanonymizing the entire Sapling transaction history. Past privacy cannot be restored by any future migration.

> We have found no public information indicating a PQC migration plan for Etherlink-specific features. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## EC Sunset

**Grade: F ❌**

There is no explicit EC retirement plan for Etherlink or the Smart Rollup stack. A rollup-level EC sunset is conditional on Tezos L1 first activating tz5/ML-DSA-44. If tz5 activates, operators and bridge participants could migrate to PQC-signed L1 transactions, and a future kernel upgrade could expose PQC tx types for EVM users — but no committed timeline exists for either step.

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Settlement 🔧, DA 🗺️, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

## Governance

Etherlink has two governance layers. Protocol-level changes (including any tz5 activation that would affect Etherlink's settlement layer) go through Tezos L1's five-period on-chain amendment process, where delegates vote using their Tezos account keys. Etherlink kernel upgrades are controlled by the Smart Rollup originator/operator — currently the Etherlink team (Nomadic Labs / Tezos Foundation) — and can be deployed without a Tezos L1 governance vote.

The one PQC-relevant proposal in flight is the tz5/ML-DSA-44 proposal for Tezos L1 transaction signing (Nomadic Labs, February 2026). This is active on the Tezos testnet and feature-flagged for mainnet but has not been put to a governance vote. No PQC proposals specific to the Etherlink rollup layer have been filed.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
