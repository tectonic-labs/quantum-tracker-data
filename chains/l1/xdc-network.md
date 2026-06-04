# XDC Network (XDC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | XDC Network |
| **Ticker** | XDC |
| **Website** | <https://xdc.org/> |
| **GitHub** | <https://github.com/XinFinOrg> |
| **On-chain environment** | EVM (XDPoSChain; go-ethereum fork) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

XDC Network is an EVM-compatible Layer 1 running [XDPoSChain](https://github.com/XinFinOrg), a go-ethereum fork maintained by the XinFin Foundation. The chain targets enterprise and trade-finance use cases, with native support for ISO 20022 financial messaging standards and private permissioned subnets. Two major recent upgrades are on record: XDC 2.0 / XDPoS 2.0 (Chained HotStuff BFT, activated September 2024) and v2.6.8 "Cancun-X" (activated 29 January 2026 at block 98,800,200). The cryptographic stack follows standard EVM conventions throughout — secp256k1 ECDSA for user transactions and masternode block signing, devp2p for peer networking, and the standard go-ethereum precompile set on-chain.

No post-quantum migration work has been published by the XinFin Foundation as of the date of this report.

## Proposed and Implemented PQC Algorithms

XDC Network does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for XDC Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

XDC Network uses XDPoS 2.0, a [Delegated Proof of Stake](https://docs.xdc.org/introduction/xdc-dpos-consensus) variant based on Chained HotStuff BFT, activated September 2024. The 108 active masternodes (each required to stake 10,000,000 XDC) sign blocks and votes using secp256k1 ECDSA. Finality is achieved when 2/3+ masternodes (72 of 108) sign the new block, producing deterministic 3-block (~6-second) finality. The XDC 2.0 upgrade transitioned from Istanbul BFT to Chained HotStuff but made no changes to the underlying signature scheme.

**Current state.** All masternode block signing uses ECDSA over secp256k1. No post-quantum validator-identity or block-signing mechanism has been proposed.

**Planned future work.** None published. The [XDC Network Governance & Roadmap](https://xinfin.org/roadmap) describes no post-quantum consensus work.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for XDC Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

XDC Network inherits the standard go-ethereum precompile set: `ecrecover` (secp256k1 ECDSA recovery), `ecAdd` and `ecMul` (alt_bn128 / BN254 curve operations), `ecPairing` (BN254 pairing for zk-SNARK verification), `sha256`, `ripemd160`, `modexp`, `identity`, and `blake2f`. The [Cancun-X upgrade (v2.6.8)](https://docs.xdc.network/) included optimised precompile handling but no post-quantum additions.

**Current state.** All on-chain cryptographic primitives are EC-based. Smart contracts cannot verify post-quantum signatures natively.

**Planned future work.** No post-quantum precompile or VM extension has been proposed.

## 5. Other Features

XDC Network's ISO 20022 compliance is a financial messaging format standard, not a cryptographic feature; it introduces no new cryptographic dependencies beyond the base-layer ECDSA signing and TLS transport. It is not applicable to the post-quantum exposure assessment.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, XDC Network's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

We have found no public information indicating migration activity for XDC Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

XDC Network protocol changes are coordinated by the XinFin Foundation and require a 2/3+ supermajority of the 108 active masternodes to activate at a specified block height. Protocol proposals are tracked as [XDC Enhancement Proposals (XEPs)](https://www.xdc.dev/) via the developer forum and GitHub. There is no on-chain governance token vote for protocol forks; coordination is driven by Foundation announcements and masternode operator compliance.

No PQC-relevant XEPs have been identified in the public record.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
