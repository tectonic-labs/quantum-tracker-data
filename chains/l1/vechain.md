# VeChain (VET) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | VeChain |
| **Ticker** | VET |
| **Website** | <https://www.vechain.org/> |
| **GitHub** | <https://github.com/vechain> |
| **On-chain environment** | EVM (VeChainThor; EVM-compatible) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

VeChain is an EVM-compatible Layer 1 running the [VeChainThor](https://github.com/vechain/thor) client, maintained by the VeChain Foundation. The chain completed two major upgrades under its "Renaissance" roadmap: Galactica (July 2025, block 22,084,200) adding dynamic gas fees and EVM Shanghai support, and Hayabusa (December 2025, block 23,414,400) transitioning the consensus from Proof of Authority 2.0 to Delegated Proof of Stake, with the StarGate staking platform. A third upgrade, Interstellar, is planned for 2026 and will extend EVM compatibility further.

The cryptographic stack follows standard EVM conventions throughout: secp256k1 ECDSA for both user transactions and Authority Masternode block signing. No post-quantum cryptography work has been published by the VeChain Foundation.

## Proposed and Implemented PQC Algorithms

VeChain does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for VeChain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

VeChain's consensus model has evolved through its Renaissance roadmap. The legacy Proof of Authority 2.0 (PoA 2.0) used 101 Foundation-approved Authority Masternodes, each signing blocks with secp256k1 ECDSA keys. The Hayabusa upgrade (2025-12-02) transitioned the chain to Delegated Proof of Stake, expanding the validator set via the StarGate staking platform. Validator block signing remains secp256k1 ECDSA under the new model.

**Current state.** All validator block signatures use ECDSA over secp256k1. The transition to DPoS added flexibility in validator set membership but introduced no changes to the underlying signature scheme.

**Planned future work.** No post-quantum consensus signature proposal has been identified in the [VeChain Improvement Proposal (VIP) repository](https://github.com/vechain/VIPs) or Foundation communications.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for VeChain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

VeChain's EVM carries the standard set of Ethereum-compatible precompiles: `ecrecover` for secp256k1 ECDSA signature recovery and the alt_bn128 curve precompiles (`ecAdd`, `ecMul`, `ecPairing`) for BN254-based applications. No post-quantum signature verification primitive has been added.

**Current state.** All in-EVM cryptographic verification is EC-based. Smart contracts cannot verify post-quantum signatures natively.

**Planned future work.** No post-quantum precompile or VM extension has been proposed in the [VIP repository](https://github.com/vechain/VIPs) or the [VeChain documentation](https://doc.vechain.org/).

## 5. Other Features

VeChain does not support any special features within the scope of this evaluation (no KZG blobs, no privacy tech, no randomness beacon, no bridge proofs that introduce additional cryptographic dependencies).

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, VeChain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

We have found no public information indicating migration activity for VeChain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

VeChain protocol upgrades are coordinated hard forks triggered at specific block heights, published in advance by the VeChain Foundation via [VeChain Improvement Proposals (VIPs)](https://github.com/vechain/VIPs) and GitHub releases. Node operators must upgrade the `thor` binary before the activation block. The Foundation coordinates directly with Authority Masternodes and, under the post-Hayabusa DPoS model, with the expanded validator set. No on-chain governance token vote is required for protocol upgrades; control rests with the Foundation and the validator set.

No PQC-relevant VIPs have been identified in the public record.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
