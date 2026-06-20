# XDC Network (XDC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | XDC Network |
| **Ticker** | XDC |
| **Website** | [xdc.org](https://xdc.org/) |
| **GitHub** | [XinFinOrg](https://github.com/XinFinOrg) |
| **On-chain environment** | EVM |
| **Current mainnet version** | XDPoSChain v2.6.8 / Cancun-X (activated 2026-01-29) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

XDC Network is an enterprise-focused Layer 1 blockchain built on a fork of Go Ethereum (geth), using XDPoS 2.0 consensus (Chained HotStuff BFT) with 108 permissioned masternodes. The network targets trade finance and real-world asset tokenization, with [ISO 20022 compliance](https://xinfin.org/xdc-payments/index.html) as a key feature.

In March 2024, XDC co-founder Ritesh Kakkad published a [blog post on xdc.dev](https://www.xdc.dev/riteshkakkad/xdc-networks-unbreakable-future-exploring-area-of-quantum-proof-blockchain-research-47e9) discussing quantum-resistant research areas for the network. The post identifies cryptographic algorithms, consensus mechanisms, and key exchange as areas where XDC is "exploring cutting-edge post-quantum cryptographic techniques." However, it names no specific PQC algorithms, provides no timeline, and uses exploratory language throughout — "the journey to quantum resistance is an ongoing process." No XDC Enhancement Proposal (XEP) or formal roadmap commitment has followed.

## Proposed and Implemented PQC Algorithms

XDC Network does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: D ⚠️**

XDC uses ECDSA secp256k1 for all transaction signatures, consistent with its EVM-compatible design. Address derivation follows the [Ethereum standard](https://docs.xdc.network/) (Keccak256 of public key).

**Current state.** No post-quantum signature scheme is available on mainnet or testnet. All transaction authorization relies on ECDSA.

**Planned future work.** The [co-founder blog post](https://www.xdc.dev/riteshkakkad/xdc-networks-unbreakable-future-exploring-area-of-quantum-proof-blockchain-research-47e9) (March 2024) discusses quantum-resistant cryptography as a research area for XDC but names no specific algorithms or implementation plan.

## Consensus

**Grade: D ⚠️**

XDC uses [XDPoS 2.0](https://docs.xdc.org/introduction/xdc-dpos-consensus) (Chained HotStuff BFT) with 108 masternodes. Block finality requires 2/3+ masternode signatures (72 of 108). Validator identity and block signing use ECDSA secp256k1.

**Current state.** All validator signing uses classical elliptic-curve cryptography. No PQC alternative is deployed.

**Planned future work.** The [co-founder blog post](https://www.xdc.dev/riteshkakkad/xdc-networks-unbreakable-future-exploring-area-of-quantum-proof-blockchain-research-47e9) lists consensus mechanisms as one of several PQC research areas. No specific proposal or timeline has been published.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for XDC Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for XDC Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

XDC Network does not support any special features. ISO 20022 compliance is a messaging format standard, not a cryptographic feature.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ⚠️, P2P ❌, On-Chain ❌, Other ➖.

The co-founder blog post focuses on adding quantum-resistant cryptography; it does not discuss removing elliptic-curve support. No EC removal schedule or sunset plan has been published.

## Governance

XDC protocol upgrades are coordinated by the XinFin Foundation through [XDC Enhancement Proposals (XEPs)](https://www.xdc.dev/) and hard forks activated at pre-announced block heights. Masternode operators must upgrade before the activation block; consensus requires 2/3+ masternodes on the new ruleset.

- No XEP or formal governance proposal related to PQC has been filed.
- The [co-founder blog post](https://www.xdc.dev/riteshkakkad/xdc-networks-unbreakable-future-exploring-area-of-quantum-proof-blockchain-research-47e9) (March 2024) is the only PQC-related publication from XDC leadership. It is a research discussion, not a governance proposal.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
