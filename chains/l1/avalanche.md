# Avalanche (AVAX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Avalanche |
| **Ticker** | AVAX |
| **Website** | https://avax.network |
| **GitHub** | https://github.com/ava-labs |
| **Twitter / X** | https://x.com/avax |
| **On-chain environment** | EVM (C-Chain); UTXO (X-Chain); Platform chain (P-Chain) |
| **Current mainnet version** | AvalancheGo v1.14.2 / Granite upgrade (activated 2025-11-19) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

[Avalanche](https://avax.network) is a proof-of-stake platform built around a [three-chain primary network](https://build.avax.network/docs/primary-network/avalanche-consensus): the C-Chain (EVM-compatible smart contracts), the X-Chain (UTXO asset transfers), and the P-Chain (validator management and subnet governance). The platform also supports Subnets — independent blockchains that run their own virtual machines and validator sets. The single canonical implementation is `AvalancheGo`, maintained by Ava Labs, which all mainnet and Fuji testnet validators run.

Avalanche uses secp256k1 ECDSA for transaction signing across all three primary chains and for validator identity. [Avalanche Warp Messaging (AWM)](https://www.avax.network/about/blog/avalanche-warp-messaging-awm-launches-with-the-first-native-subnet-to-subnet-message-on-avalanche-mainnet) — the cross-subnet messaging protocol — uses BLS12-381 multi-signatures, adding an additional EC layer. No PQC migration roadmap or EC retirement plan has been published by Ava Labs or the Avalanche Foundation as of the information cutoff.

## Proposed and Implemented PQC Algorithms

Avalanche does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Avalanche in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Avalanche in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Avalanche in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

The [C-Chain EVM](https://build.avax.network/docs/api-reference/standards/cryptographic-primitives) exposes the standard EVM precompile set: `ecrecover` (secp256k1 ECDSA recovery), `ecAdd`, `ecMul`, and `ecPairing` (alt_bn128 operations used in SNARK verification). An additional X-Chain signature verification precompile allows C-Chain contracts to verify X-Chain ECDSA signatures. No post-quantum signature verification precompile is available.

Subnet-EVM allows subnet operators to add stateful precompiles, so a subnet could theoretically deploy a post-quantum verification precompile. However, no production subnet has done so, and there are no published proposals to add such a precompile to the primary C-Chain.

**Current state.** Standard EVM EC precompiles only. No PQC verification primitive exists on the C-Chain or any known production subnet.

**Planned future work.** None documented. Subnet-EVM's extensibility is a theoretical path but no concrete proposal has been identified.

## 5. Other Features

**Grade: F ❌**

### Avalanche Warp Messaging (AWM)

[Avalanche Warp Messaging](https://build.avax.network/docs/cross-chain/avalanche-warp-messaging/deep-dive) enables any two Avalanche subnets to authenticate arbitrary messages between themselves. Validators collectively produce a [BLS12-381 multi-signature](https://www.avax.network/about/blog/avalanche-warp-messaging-awm-launches-with-the-first-native-subnet-to-subnet-message-on-avalanche-mainnet) attesting to message validity, with BLS public keys registered on the P-Chain per [ACP-77](https://medium.com/zeeve/how-avalanches-acp-77-is-fueling-subnet-growth-and-institutional-adoption-22caa05bbf13). If BLS12-381 is broken, cross-subnet message authenticity is compromised.

**Current state.** BLS12-381 multi-signatures are EC-based and quantum-vulnerable. No PQC migration plan for AWM has been published.

**Planned future work.** None documented.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No PQC roadmap or EC retirement timeline has been published by Ava Labs or the Avalanche Foundation. Avalanche's multi-chain architecture — with subnets each carrying their own validator set — makes coordinated migration more complex than a single-chain protocol: it would require voluntary adoption by individual subnet validator sets in addition to primary network changes.

**Current state.** secp256k1 is embedded in transaction signing on all three primary chains, validator identity on the P-Chain, node TLS certificates, and the C-Chain EVM precompile set. BLS12-381 is used for AWM cross-subnet attestations. No deprecation plan exists for any of these.

**Planned future work.** None published.

## Governance

Protocol changes on Avalanche are proposed through the [Avalanche Community Proposals (ACPs)](https://github.com/avalanche-foundation/ACPs) process on GitHub, following a workflow similar to Ethereum EIPs. Ava Labs core maintainers review and merge ACP documents; the Avalanche Foundation and core developer team coordinate activation scheduling. Some staking parameter changes use on-chain validator voting, but protocol upgrades are coordinated by Ava Labs with community input.

No PQC-related ACPs have been identified in the [ACPs repository](https://github.com/avalanche-foundation/ACPs) as of the information cutoff. Notable ACPs in the PQC-adjacent space: [ACP-77](https://github.com/avalanche-foundation/ACPs) introduced BLS multi-signature key registration on the P-Chain for interchain messaging, which extends EC exposure rather than reducing it.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
