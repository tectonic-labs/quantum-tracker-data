# Avalanche (AVAX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Avalanche |
| **Ticker** | AVAX |
| **Website** | <https://avax.network> |
| **GitHub** | <https://github.com/ava-labs> |
| **Twitter / X** | <https://x.com/avax> |
| **On-chain environment** | EVM (C-Chain); UTXO (X-Chain); platform chain (P-Chain) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Avalanche is a multi-chain platform: the [C-Chain](https://build.avax.network/docs/api-reference/standards/cryptographic-primitives) (EVM-compatible), the X-Chain (UTXO), and the P-Chain (validator and subnet management). Across all three, transactions are signed with secp256k1 ECDSA. [Snowball consensus](https://arxiv.org/pdf/1906.08936) identifies validators by secp256k1 public keys registered on the P-Chain, and [ACP-77](https://github.com/avalanche-foundation/ACPs) added BLS12-381 public-key registration on the P-Chain to support [Avalanche Warp Messaging (AWM)](https://www.avax.network/about/blog/avalanche-warp-messaging-awm-launches-with-the-first-native-subnet-to-subnet-message-on-avalanche-mainnet) — a BLS multi-signature scheme used to authenticate cross-subnet messages. The [Avalanche Network Protocol P2P layer](https://docs.avax.network/api-reference/standards/avalanche-network-protocol) uses TLS 1.3 with secp256k1-tied node identity. The C-Chain exposes the standard EVM precompile set (ecrecover, ecAdd, ecMul, ecPairing on alt_bn128, plus SHA-256, Keccak-256, Blake2b, RIPEMD-160) and X-Chain ECDSA verification.

No [Avalanche Community Proposal (ACP)](https://github.com/avalanche-foundation/ACPs) addressing post-quantum cryptography has been filed. Subnet-EVM does support [stateful precompiles](https://medium.com/avalancheavax/customizing-the-evm-with-stateful-precompiles-f44a34f39efd) so a subnet could in principle add a custom PQ precompile, but no production subnet has done so.

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

We have found no public information indicating migration activity for Avalanche in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### Avalanche Warp Messaging (AWM)

**Current state.** [Avalanche Warp Messaging](https://www.avax.network/about/blog/avalanche-warp-messaging-awm-launches-with-the-first-native-subnet-to-subnet-message-on-avalanche-mainnet) lets any two Avalanche subnets exchange and verify arbitrary messages. Validators collectively produce a [BLS12-381 multi-signature](https://build.avax.network/docs/cross-chain/avalanche-warp-messaging/deep-dive) attesting to message validity, with public-key registration on the P-Chain enabled by [ACP-77](https://github.com/avalanche-foundation/ACPs). BLS12-381 is pairing-based and quantum-vulnerable; a quantum break would compromise the authenticity of cross-subnet messages and any bridge or state-sync construction that relies on AWM.

**Planned future work.** No ACP proposing a post-quantum replacement for the AWM signature scheme has been filed.

### Subnets and custom VMs

**Current state.** Avalanche [subnets](https://docs.avax.network/) are independent chains that can run a custom VM. [Subnet-EVM stateful precompiles](https://medium.com/avalancheavax/customizing-the-evm-with-stateful-precompiles-f44a34f39efd) provide an extension surface where a subnet could in principle add a custom post-quantum verification precompile. No production subnet is publicly known to have done so.

**Planned future work.** No subnet-level PQ precompile rollout has been announced.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Avalanche in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Avalanche protocol changes flow through [Avalanche Community Proposals (ACPs)](https://github.com/avalanche-foundation/ACPs), a GitHub-based proposal process maintained by the Avalanche Foundation with implementation by Ava Labs and other Avalanche network clients. ACPs progress through vetting, drafting, editor merge, GitHub-discussion review, and "Implementable" marking before activation in a coordinated network upgrade.

PQ-relevant work currently visible:

- No ACP proposing post-quantum cryptography for transaction signatures, Snowball consensus, P2P transport, EVM precompiles, or AWM has been filed in the [avalanche-foundation/ACPs](https://github.com/avalanche-foundation/ACPs) repository.
- The most recent cryptography-relevant ACP, [ACP-77](https://github.com/avalanche-foundation/ACPs), enabled BLS12-381 public-key registration on the P-Chain to support AWM — extending EC use rather than introducing post-quantum primitives.

No fork has been scheduled or signaled for any PQ migration.

---

_Generated on 06 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
