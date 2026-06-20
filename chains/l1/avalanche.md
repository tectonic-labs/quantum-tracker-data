# Avalanche (AVAX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Avalanche |
| **Ticker** | AVAX |
| **Website** | [avax.network](https://avax.network) |
| **GitHub** | [ava-labs](https://github.com/ava-labs) |
| **Twitter / X** | [@avaborz](https://x.com/avax) |
| **On-chain environment** | EVM (C-Chain); UTXO (X-Chain); Platform (P-Chain) |
| **Current mainnet version** | AvalancheGo v1.14.2 / Granite (activated 2025-11-19) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Avalanche is a Proof-of-Stake Layer 1 with a multi-chain architecture: the C-Chain (EVM-compatible smart contracts), X-Chain (UTXO-based asset transfers), and P-Chain (validator management and subnet coordination). It uses [Snowball consensus](https://arxiv.org/pdf/1906.08936), a probabilistic metastable BFT protocol with sub-sampled voting. In February 2026, a community proposal — [AIP-QR-001](https://forum.avax.network/t/acp-idea-staged-transition-to-quantum-resistant-cryptography-aip-qr-001/7055) — was submitted to the [Avalanche Community Proposals (ACP)](https://github.com/avalanche-foundation/ACPs) process, proposing a staged transition to quantum-resistant cryptography with hybrid classical + PQC signatures, PQC validator block signing, and new EVM precompiles for on-chain PQC verification.

The proposal has a [pull request (#278)](https://github.com/avalanche-foundation/ACPs/pull/278) open on the ACP repository for technical review. It has not been accepted or committed to by Ava Labs. No timeline for implementation has been published, and the proposal remains in early review.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **Falcon / FN-DSA** | ECDSA secp256k1 | Tx Signatures, Consensus, On-Chain | Discussed |
| **Dilithium / ML-DSA** | ECDSA secp256k1 | Tx Signatures, Consensus, On-Chain | Discussed |

## Transaction Signatures

**Grade: D ⚠️**

Avalanche uses secp256k1 ECDSA for transaction signatures across all three chains (X-Chain, P-Chain, and C-Chain). The X-Chain and P-Chain use [Avalanche's native address derivation](https://build.avax.network/docs/api-reference/standards/cryptographic-primitives) (SHA256 + RIPEMD160), while the C-Chain uses Ethereum-standard Keccak256 addressing.

**Current state.** No post-quantum signature scheme is available on any Avalanche chain. All transaction authorization relies on secp256k1 ECDSA.

**Planned future work.** [AIP-QR-001](https://forum.avax.network/t/acp-idea-staged-transition-to-quantum-resistant-cryptography-aip-qr-001/7055) proposes a hybrid signature model where transactions would carry both classical ECDSA and PQC signatures (**Falcon** or **Dilithium**). The proposal includes benchmarks for signature sizes and CPU validation costs under a gas economics analysis. [PR #278](https://github.com/avalanche-foundation/ACPs/pull/278) is open for technical review but has not been accepted.

## Consensus

**Grade: D ⚠️**

Avalanche uses [Snowball consensus](https://build.avax.network/docs/primary-network/avalanche-consensus), a probabilistic BFT protocol where validators are identified by secp256k1 public keys registered on the P-Chain. [Avalanche Warp Messaging (AWM)](https://build.avax.network/docs/cross-chain/avalanche-warp-messaging/deep-dive) adds [BLS12-381 multi-signatures](https://www.avax.network/about/blog/avalanche-warp-messaging-awm-launches-with-the-first-native-subnet-to-subnet-message-on-avalanche-mainnet) for cross-subnet message authentication, extending EC exposure.

**Current state.** Validator identity uses secp256k1. AWM uses BLS multi-signatures. Both are quantum-vulnerable.

**Planned future work.** [AIP-QR-001](https://forum.avax.network/t/acp-idea-staged-transition-to-quantum-resistant-cryptography-aip-qr-001/7055) proposes hybrid validator block signing where "validators would sign blocks using both classical (ECDSA) and PQ-safe keys (**Falcon**/**Dilithium**)." The proposal has not been accepted.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Avalanche in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: D ⚠️**

The C-Chain provides standard [EVM precompiles](https://medium.com/avalancheavax/customizing-the-evm-with-stateful-precompiles-f44a34f39efd) including `ecrecover` (secp256k1 ECDSA recovery), `ecAdd`/`ecMul`/`ecPairing` (alt_bn128 elliptic curve operations for ZK-SNARK verification), and standard hash functions. [Subnet-EVM](https://docs.avax.network/build/subnet/deploy/custom-vm-subnet) allows stateful precompiles, meaning subnets could theoretically add PQC precompiles, but no production subnet has done so.

**Current state.** No PQC verification primitive exists on any Avalanche chain. Standard EC-based precompiles only.

**Planned future work.** [AIP-QR-001](https://forum.avax.network/t/acp-idea-staged-transition-to-quantum-resistant-cryptography-aip-qr-001/7055) proposes EVM precompiled contracts at addresses `0x101` and `0x102` for native PQC signature verification. The proposal has not been accepted.

## Other Features

**Grade: F ❌**

### Avalanche Warp Messaging (AWM)

**Current state.** [AWM](https://build.avax.network/docs/cross-chain/avalanche-warp-messaging/deep-dive) enables cross-subnet message authentication using BLS12-381 multi-signatures. Validators register BLS public keys on the P-Chain (per [ACP-77](https://medium.com/zeeve/how-avalanches-acp-77-is-fueling-subnet-growth-and-institutional-adoption-22caa05bbf13)), and signatures are verified on the destination subnet. BLS is quantum-vulnerable.

**Planned future work.** AIP-QR-001 does not address AWM or BLS migration.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ⚠️, P2P ❌, On-Chain ⚠️, Other ❌.

AIP-QR-001 proposes a hybrid model where both classical ECDSA and PQC signatures would coexist. The proposal does not address when EC signature acceptance would end. No EC removal schedule, deprecation timeline, or fork milestone has been published by Ava Labs.

## Governance

Avalanche protocol upgrades are coordinated by Ava Labs through the [Avalanche Community Proposals (ACP)](https://github.com/avalanche-foundation/ACPs) process. ACPs follow a lifecycle: vetting, drafting, merging, discussion, "Implementable" marking, and activation. Named network upgrades (e.g., Etna, Octane, Granite) activate at hardcoded UTC timestamps once a supermajority of stake has upgraded.

- [AIP-QR-001: Staged Transition to Quantum-Resistant Cryptography](https://forum.avax.network/t/acp-idea-staged-transition-to-quantum-resistant-cryptography-aip-qr-001/7055) — posted February 21, 2026 by community member "Mat." Proposes hybrid ECDSA + Falcon/Dilithium signatures, hybrid validator block signing, and PQC EVM precompiles. [PR #278](https://github.com/avalanche-foundation/ACPs/pull/278) opened on the ACP repository for technical review.
- An [earlier general PQC discussion thread](https://forum.avax.network/t/post-quantum-cryptography/580) exists on the Avalanche forum.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
