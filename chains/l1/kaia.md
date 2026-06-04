# Kaia (KAIA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Kaia |
| **Ticker** | KAIA |
| **Website** | https://docs.kaia.io/ |
| **GitHub** | https://github.com/kaiachain |
| **Derived from** | Klaytn (primary codebase) + Finschia (LINE-Web3) |
| **On-chain environment** | EVM (full EVM with Klaytn account-key extensions) |
| **Mainnet genesis** | 2024-08-29 |
| **Current mainnet version** | Osaka fork (activated approx. 2026-04-07) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Kaia is an EVM-compatible L1 formed from the merger of Klaytn (Kakao-backed, South Korea) and Finschia (LINE-backed, Japan), launched on 2024-08-29. The chain targets messaging-app-integrated Web3 across APAC, with potential reach to roughly 250 million KakaoTalk and LINE users. Kaia inherits the Klaytn codebase as its primary engine and runs Modified Istanbul BFT (IBFT) consensus with VRF-based committee selection for fast (~1-second) deterministic finality.

No PQC migration activity has been identified for Kaia in any category. All cryptographic surfaces — user transaction signing, block validator signing, P2P node identity, on-chain EC precompiles, and service-chain anchoring — remain entirely dependent on elliptic curve cryptography with no published plan to change.

## Proposed and Implemented PQC Algorithms

> Kaia does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Kaia in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Kaia in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Kaia in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

> We have found no public information indicating migration activity for Kaia in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

**Grade: F ❌**

Kaia inherits several chain-specific features from the Klaytn codebase, all of which are EC-dependent.

### Service Chains

Service Chains are Klaytn-derived sidechains that allow dApps to run their own EVM instance while periodically anchoring checkpoints back to Kaia mainnet. The anchor signatures produced by each Service Chain's validator set use standard EC cryptography.

**Current state.** Service Chain anchor signing is EC-based. No post-quantum alternative has been proposed.

**Planned future work.** None published.

### Fee Delegation

Kaia's account-key system allows transactions to carry two stacked ECDSA signatures: one from the user (`RoleTransaction`) and one from a designated fee payer (`RoleFeePayer`). This sponsored-transaction mechanism is purely an application of EC signing and introduces no additional cryptographic scheme.

**Current state.** Fee delegation uses secp256k1 ECDSA. No post-quantum alternative has been proposed.

**Planned future work.** None published.

### VRF-Based Committee Selection

Kaia uses a VRF to randomly select a sub-committee of Governance Council members each consensus round. The VRF is EC-based and quantum-vulnerable.

**Current state.** VRF committee randomization relies on EC cryptography. No post-quantum alternative has been proposed.

**Planned future work.** None published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No PQC migration plan or EC retirement schedule has been published by the Kaia Foundation. The chain launched in August 2024 and its 2026 development focus (Osaka fork, blob transaction support) is unrelated to quantum cryptography.

**Current state.** EC cryptography is embedded in every layer of the Kaia stack.

**Planned future work.** None published.

## Governance

Kaia is governed by the Kaia Foundation, which coordinates hard fork timing with exchanges and Governance Council members. Protocol upgrades are activated by block number in the reference client (`kaiachain/kaia` on GitHub). The KIPs (Kaia Improvement Proposals) process is used for substantive protocol changes.

No PQC-relevant governance proposals or working groups have been identified in the Kaia ecosystem as of the information date.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
