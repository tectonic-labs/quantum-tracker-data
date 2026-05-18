# IoTeX (IOTX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | IoTeX |
| **Ticker** | IOTX |
| **Website** | <https://iotex.io> |
| **GitHub** | <https://github.com/iotexproject> |
| **On-chain environment** | EVM (EVM-compatible) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

IoTeX is a DePIN-focused EVM-compatible Layer-1 using **Roll-DPoS** — a delegated proof-of-stake variant that combines a candidate election, VRF-based randomized sub-committee selection, and PBFT-style 2/3 voting for block finalization. All transaction signatures and consensus keys are secp256k1 ECDSA, inherited from EVM compatibility. In May 2026, the first post-quantum cryptography artefact appeared in the IoTeX repositories: [IIP-64](https://github.com/iotexproject/iips/pull/72) (opened 2026-05-18), a standards-track proposal for an end-to-end secp256k1 → PQC migration covering accounts and Roll-DPoS consensus. No code has been merged and no testnet activity has been announced.

## Proposed and Implemented PQC Algorithms

IoTeX does not currently propose or implement any specific post-quantum cryptographic algorithm. IIP-64 motivates the migration but does not yet specify which algorithm family to adopt.

## Transaction Signatures

**Grade: D ⚠️**

IoTeX transactions use secp256k1 ECDSA signatures, inherited from EVM compatibility. User accounts are standard EVM-style addresses derived from secp256k1 public keys.

The first post-quantum proposal in the IoTeX repositories is [IIP-64](https://github.com/iotexproject/iips/pull/72) (opened 2026-05-18 by `xinxin-crypto`), a standards-track proposal for an end-to-end migration from secp256k1/ECDSA to a post-quantum scheme for both the account model and Roll-DPoS consensus. The proposal's motivation cites a Google Quantum AI whitepaper from April 2026 estimating approximately 20× fewer physical qubits needed to break ECDLP-256 than prior estimates, and synthesizes prior work from Ethereum, Bitcoin, Sui, QRL, Coinbase, Meta, and Paradigm.

**Current state.** All mainnet transactions use secp256k1 ECDSA. No PQC signing available.

**Planned future work.** IIP-64 is in proposal stage; no algorithm selection, implementation, or testnet timeline announced.

## Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for IoTeX in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for IoTeX in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for IoTeX in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

### VRF (Sub-committee selection)

IoTeX's Roll-DPoS uses a VRF to randomly select the block-signing sub-committee from the delegate pool each epoch. This VRF is elliptic-curve-based. A quantum adversary capable of breaking the underlying discrete log could predict committee membership and manipulate sortition.

**Planned future work.** IIP-64 covers the Roll-DPoS layer broadly, but no VRF-specific migration proposal has been published.

### W3bstream (Off-chain compute for IoT / DePIN)

W3bstream is IoTeX's verifiable off-chain compute layer for IoT device data. Device-to-chain attestations rely on EC signatures (secp256k1 / Ed25519 at the device layer). A quantum break would allow forging device attestations and retroactively undermining DePIN economic models.

**Planned future work.** No PQC migration announced for W3bstream or DePIN device identity.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, IoTeX's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating an EC retirement plan for IoTeX. If we are mistaken, we would like to hear about it — see the contact link in the footer.

## Governance

IoTeX protocol changes are proposed through the [IoTeX Improvement Proposals (IIPs)](https://github.com/iotexproject/iips) repository. The Roll-DPoS delegate network coordinates upgrades; the IoTeX Foundation leads core development.

Active PQ-relevant proposals:

- [IIP-64 (iips#72)](https://github.com/iotexproject/iips/pull/72) — Standards-track proposal for secp256k1 → PQC migration of the IoTeX account model and Roll-DPoS consensus. Status: Open (filed 2026-05-18). No algorithm specified yet.

Reference documentation:

- [Roll-DPoS Consensus — IoTeX Documentation](https://docs.iotex.io/blockchain/learn-iotex/core-concepts/consensus-mechanism)
- [Consensus Mechanism — IoTeX DePIN docs](https://docs.iotex.io/depin-infra-modules-dim/iotex-l1-depin-blockchain/core-concepts/consensus-mechanism)
- [All you need to know about Roll-DPoS](https://iotex.zendesk.com/hc/en-us/articles/360023984253-All-you-need-to-know-about-Roll-DPoS)

---

_Generated on 18 May 2026 based on information as of 18 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
