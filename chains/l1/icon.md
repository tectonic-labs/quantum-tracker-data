# ICON (ICX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | ICON |
| **Ticker** | ICX |
| **Website** | https://icon.community/ |
| **GitHub** | https://github.com/icon-project |
| **On-chain environment** | SCORE (JVM — Python/Java smart contracts) plus EVM compatibility layer |
| **Mainnet genesis** | 2018-09-24 |

## Summary Table

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Summary

ICON is a Korean-origin Layer-1 blockchain using **LFT2 (Loop Fault Tolerance 2.0)** consensus, a round-based BFT-style algorithm where elected **C-Reps (Consensus Representatives)** propose and finalize blocks. The single production node implementation is **Goloop** (Go), maintained by the ICON Foundation. Smart contracts run on **SCORE** (Smart Contract on Reliable Environment), a JVM-based virtual machine accepting contracts written in Python or Java, alongside an EVM compatibility layer.

ICON's primary differentiator is **BTP (Blockchain Transmission Protocol)**, a trustless cross-chain message-passing protocol that cryptographically verifies source-chain validator signatures and consensus proofs. We have found no published PQC migration plan, proposal, or working group from the ICON Foundation across any of the six evaluation categories as of the date of this report. All transaction signatures, consensus signing, P2P networking, on-chain primitives, and BTP cross-chain verification use secp256k1 ECDSA with no post-quantum alternative identified.

## Proposed and Implemented PQC Algorithms

> ICON does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for ICON in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for ICON in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for ICON in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

ICON provides two smart-contract execution paths. The native SCORE environment runs JVM-based contracts; standard cryptographic primitives are available through system contracts, but no post-quantum verification primitive is exposed. The EVM compatibility layer exposes the standard EVM precompile set including `ecrecover` and BN254 pairings; again, no PQC verification primitive is available.

**Current state.** Both SCORE and the EVM compatibility layer provide only elliptic-curve signature verification. No post-quantum verification primitive has been proposed for either execution environment.

**Planned future work.** None published.

## Other Features

**Grade: F ❌**

### BTP (Blockchain Transmission Protocol)

ICON's BTP is a chain-agnostic generic-message-passing protocol. The on-chain BTP verifier reads relay messages and cryptographically verifies the source chain's validator signatures and consensus process. Because most supported source chains use EC-based validator signatures, BTP inherits their quantum exposure. On the ICON side, BTP relays verify ICON's own EC-based validator signatures, which would be vulnerable to a quantum adversary capable of forging those signatures.

**Current state.** BTP verification is EC-based on both the source-chain and the ICON sides. No post-quantum alternative has been proposed for BTP relay or verification.

**Planned future work.** None published.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for ICON in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

ICON protocol changes are coordinated by elected **P-Reps (Public Representatives)** through the **Network Proposal System (NPS)**. A proposal must pass a P-Rep vote with the sponsoring P-Rep posting 10% ICX collateral as a bond. Once passed, the protocol halts at a target block height and nodes upgrade to the specified Goloop binary. The ICON Foundation stewards core development and releases; the single canonical client (Goloop) is maintained in the [icon-project/goloop](https://github.com/icon-project/goloop) repository.

Readers tracking active governance activity can follow the ICON Community hub at [icon.community](https://icon.community/) and the icon-project GitHub organization. No PQC-relevant proposal has been identified in the public governance record.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
