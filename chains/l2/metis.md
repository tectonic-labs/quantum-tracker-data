# Metis (METIS) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Metis Andromeda |
| **Ticker** | METIS |
| **Website** | https://www.metis.io |
| **GitHub** | https://github.com/MetisProtocol/mvm |
| **Stack** | Optimism fork (pre-Bedrock); Hybrid Rollup in development |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844, since May 2025; previously MemoLabs off-chain DA) |
| **Proof type** | Fraud proofs (optimistic challenge period); ZK hybrid layer in development |
| **Sequencer model** | Decentralized (Sequencer Pool — rotating multi-sequencer) |
| **On-chain environment** | EVM (EVM-compatible) |

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

Metis is an optimistic rollup forked from an early version of Optimism, notable for its decentralized Sequencer Pool — a live multi-sequencer rotation that makes it a distinctive design among Ethereum L2s. It settles to Ethereum and, as of May 2025, posts transaction data as Ethereum blobs, meaning its DA posture now inherits Ethereum's roadmap-level PQC trajectory rather than carrying an independent EC-committee vulnerability. For the settlement layer, Metis inherits Ethereum's in-development PQC status.

Every other category is unaddressed from a PQC standpoint. Fraud proofs depend on EC-signed sequencer batch submissions and challenger transactions. The sequencer pool's block signing and node communication are EC-based. The on-chain environment is standard EVM with no PQC verification primitive. A ZK "Hybrid Rollup" layer is in development, but it is expected to use EC-pairing-based SNARKs, which would add another EC surface rather than improve PQC posture. No PQC migration has been discussed in Metis governance or documentation.

## Proposed and Implemented PQC Algorithms

Metis does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: B 🔧**

Metis settles to Ethereum via an optimistic rollup mechanism: state batches are submitted to Ethereum L1 with a challenge period (fraud proof window), and if unchallenged they finalize. Ethereum's PQC migration is actively in progress across its consensus layer, execution layer, and transaction signature surface, giving the settlement layer an in-development rating.

Metis's upgrade authority over the L1 bridge and rollup contracts is controlled by MetisDAO multisig and/or the Metis Foundation — all EC-keyed. A cryptographically relevant quantum computer forging those admin keys could modify settlement contracts or drain the bridge. This exposure is not covered by Ethereum's PQC migration work.

## Data Availability

**Grade: C 🗺️**

As of May 2025, Metis migrated to Ethereum blobs (EIP-4844) for data availability, replacing its previous MemoLabs off-chain DA model. This means DA security now inherits from Ethereum rather than relying on a separate EC-signed committee. Ethereum blob commitments use KZG polynomial commitments over BLS12-381, which is a pairing-based scheme and quantum-vulnerable, but Ethereum's roadmap includes replacing KZG with a quantum-safe alternative. That replacement is planned but not yet implemented, placing the DA grade at roadmapped.

## Proof / Verification

**Grade: F ❌**

Metis uses optimistic fraud proofs. State roots are submitted to Ethereum L1 and assumed valid unless challenged within the fraud-proof window (approximately 7 days). Both the sequencer's batch submission and any challenger's dispute transaction are signed with EC keys (secp256k1 ECDSA). A cryptographically relevant quantum computer could forge sequencer signatures to submit invalid state roots, or forge challenger signatures to suppress valid challenges — either enabling bridge theft or blocking legitimate fraud proofs.

A ZK "Hybrid Rollup" layer is in development as an additional security backstop. However, the ZK component is expected to use EC-pairing-based SNARKs, which would not improve PQC posture.

> We have found no public information indicating migration activity for Metis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Transaction Signatures

**Grade: F ❌**

All user transactions on Metis use ECDSA over secp256k1, identical to the standard EVM transaction format inherited from Ethereum. Address derivation is the Ethereum standard (last 20 bytes of keccak-256 of the public key). ERC-4337 account abstraction is supported at the application layer, but application-layer PQC wallets do not constitute a protocol-level migration.

> We have found no public information indicating migration activity for Metis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Networking

**Grade: F ❌**

Metis's decentralized Sequencer Pool is its defining feature: multiple sequencer nodes rotate block production, with sequencers staking METIS tokens and selected by a rotation schedule. Sequencer blocks are signed with EC keys (secp256k1); a cryptographically relevant quantum computer impersonating a sequencer could forge blocks or disrupt the rotation protocol. Node communication within the sequencer pool is EC-based, consistent with EVM-ecosystem norms. RPC transport uses standard TLS with classical ECDHE cipher suites. No PQC p2p or node identity work has been published.

> We have found no public information indicating migration activity for Metis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Environment

**Grade: F ❌**

Metis runs an EVM-compatible environment (forked from early Optimism/Ethereum) with the standard EVM precompile set: `ecrecover` (0x01), `ecAdd`/`ecMul`/`ecPairing` over BN254 (0x06–0x08), `modexp` (0x05), SHA-256 (0x02), RIPEMD-160 (0x03), and `blake2f` (0x09). No PQC signature verification primitive (ML-DSA, Falcon, SPHINCS+, or similar) is available on-chain. Metis would inherit any future Ethereum EIP adding PQC precompiles if it rebases its fork, but no such EIP has been finalized at the Ethereum layer.

> We have found no public information indicating migration activity for Metis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

**Grade: F ❌**

**Canonical bridge (optimistic challenge period)**: Users lock assets on Ethereum L1 and mint equivalents on Metis L2, with L2→L1 withdrawals requiring the fraud-proof challenge window (~7 days). Withdrawals are anchored to EC-signed sequencer state roots submitted to L1. Forging the sequencer key would allow fraudulent withdrawal proofs; bridge admin key compromise allows arbitrary bridge contract changes.

**Hybrid Rollup ZK layer (in development)**: Metis is developing an additional ZK validity layer on top of the existing optimistic system, intended to provide faster finality and an additional security check. The ZK component is expected to use EC-pairing-based SNARKs. If deployed as a SNARK, this would add another EC-pairing attack surface rather than improve PQC posture.

> We have found no public information indicating migration activity for Metis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## EC Sunset

**Grade: F ❌**

No PQC discussions have been found in Metis governance, documentation, or public communications. There is no plan to retire EC cryptography in any category.

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Settlement 🔧, DA 🗺️, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

## Governance

Metis uses MetisDAO governance: METIS token holders vote on proposals via on-chain voting, with a governance forum for discussion. Protocol upgrades are ultimately controlled by upgrade key holders (MetisDAO multisig and/or the Metis Foundation), which hold the L1 bridge and rollup contract upgrade keys. No PQC-related governance proposals have been filed.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
