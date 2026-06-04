# Polygon (POL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Polygon |
| **Ticker** | POL |
| **Website** | https://polygon.technology/ |
| **GitHub** | https://github.com/maticnetwork |
| **On-chain environment** | EVM (Bor execution layer) |
| **Current mainnet version** | Rio hard fork (activated 2025-10-08) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Polygon PoS is an Ethereum commit-chain secured by a dual-layer architecture: Heimdall (the consensus layer, built on CometBFT with secp256k1 validator keys for Ethereum compatibility) and Bor (the EVM block production layer, a Go-Ethereum fork). Validators — up to 105 active at any time — stake POL on Ethereum and use secp256k1 keys to sign Heimdall vote messages. Heimdall aggregates these signatures into checkpoint headers and submits them to a Polygon root contract on Ethereum approximately every 256 Bor blocks, providing exit-finality anchored to Ethereum. EVM transaction accounts use secp256k1 ECDSA throughout.

The broader Polygon ecosystem includes Polygon zkEVM (a SNARK-proven EVM rollup using elliptic-curve pairings), Polygon CDK (a framework for building more zkEVM rollups), and AggLayer (a cross-rollup bridge and messaging layer using SNARK-based ZK proofs). All of these are EC-based and quantum-vulnerable. No post-quantum migration plan has been published by Polygon Labs for any layer of this stack as of May 2026.

## Proposed and Implemented PQC Algorithms

> Polygon does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Polygon in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

Polygon's Heimdall consensus layer is a Tendermint implementation that replaces the standard Ed25519 validator key scheme with secp256k1 ECDSA to maintain compatibility with Ethereum's address and signature format. Validators sign vote messages and checkpoint headers with secp256k1 keys. The Bor block production layer operates as a rotating subset of Heimdall validators using a proof-of-authority-style scheme. Both layers are quantum-vulnerable through their secp256k1 dependency, and a quantum break simultaneously affects validator vote messages, checkpoint headers, and their verification by the Polygon root contract on Ethereum.

**Current state.** secp256k1 is the validator key scheme across both Heimdall and Bor. Heimdall v2 (CometBFT + Cosmos SDK v0.50) deployed in July 2025 upgraded the software stack significantly but introduced no changes to the underlying signature scheme.

**Planned future work.** No concrete post-quantum proposal for Heimdall or Bor consensus signatures has been identified.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Polygon in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

Bor is EVM-compatible and exposes the standard EVM precompile set, including `ecrecover` and BN254 add/mul/pairing. No PQC verification primitive is present. Any PQC opcode or precompile on Bor would need to track Ethereum's EIP process for EVM precompiles.

**Current state.** Standard EVM precompiles only. No PQC verification on-chain.

**Planned future work.** No Polygon-specific PQC precompile has been proposed. A PQC precompile would likely arrive only after a corresponding Ethereum EIP is implemented.

## Other Features

### Ethereum checkpointing

**Current state.** Heimdall submits Merkle-root checkpoints over Bor block data to a Polygon root contract on Ethereum mainnet approximately every 256 Bor blocks. The checkpoint is signed with secp256k1 keys, and the Polygon root contract on Ethereum verifies the aggregated signatures. This mechanism is quantum-vulnerable through secp256k1.

**Planned future work.** No PQC-aware checkpoint design has been announced by Polygon Labs.

### Polygon zkEVM, CDK, and AggLayer

**Current state.** [Polygon zkEVM](https://docs.polygon.technology/pos/architecture/) is a SNARK-proven EVM rollup whose validity proofs use Plonky2/3-style constructions over elliptic-curve pairings (BN254 / BLS12-381). [Polygon CDK](https://docs.polygon.technology/pos/architecture/) is a framework for building more rollups on the same SNARK basis. [AggLayer](https://docs.polygon.technology/pos/architecture/) aggregates state across CDK rollups using ZK proofs, also SNARK-based and elliptic-curve. All three are quantum-vulnerable.

**Planned future work.** No PQC SNARK migration has been announced for Polygon zkEVM, CDK, or AggLayer. STARK-based proof systems (which can be constructed using hash functions and are more amenable to post-quantum construction) exist in the broader ZK ecosystem but are not on Polygon's published roadmap.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for Polygon in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Polygon PoS upgrades are coordinated by Polygon Labs through a process involving the [Amoy Testnet](https://docs.polygon.technology/pos/overview) and the Polygon Protocol Governance Call (PPGC) series, which provides a forum for validator and community input. There is no on-chain referendum mechanism for Polygon PoS consensus-layer changes; Polygon Labs controls the upgrade schedule and validator adoption is required for activation. No PQC-relevant governance discussions or upgrade proposals have been identified in any Polygon Labs public venue as of May 2026.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
