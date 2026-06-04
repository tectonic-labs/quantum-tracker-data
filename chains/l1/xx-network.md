# XX Network (XX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | XX Network |
| **Ticker** | XX |
| **Website** | <https://xx.network/> |
| **GitHub** | <https://github.com/xx-labs> |
| **Twitter / X** | <https://x.com/xx_network> |
| **On-chain environment** | WASM (Substrate runtime) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

XX Network is frequently marketed as quantum-resistant, but that claim refers to the cMix messaging layer rather than the blockchain itself. The blockchain is a standard [Substrate](https://github.com/xx-labs) deployment using Ed25519 and Sr25519 signatures throughout transaction signing, validator block production, and libp2p peer identity, with no announced post-quantum migration path for any of those base-layer components.

The chain's post-quantum work is concentrated in cMix, the metadata-shredding mixnet that powers [XX Messenger](https://xx.network/) and its associated services. cMix uses post-quantum cryptography for key exchange in the messaging privacy layer, but it operates separately from the blockchain and does not feed PQC primitives into consensus, transaction authorization, networking, or on-chain logic.

## Proposed and Implemented PQC Algorithms

XX Network does not currently propose or implement any post-quantum cryptographic algorithms at the blockchain layer. cMix, the off-chain mixnet messaging layer, uses post-quantum cryptography for key exchange; specific algorithm details have not been documented in the public sources reviewed.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for XX Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for XX Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for XX Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for XX Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### cMix Mixnet (Messaging Privacy Layer)

**Current state.** [cMix](https://xx.network/) is XX Network's metadata-shredding mixnet, used by XX Messenger to provide end-to-end encrypted messaging with large anonymity sets (1,000+ messages per round). The protocol uses post-quantum cryptography for key exchange in the messaging layer; specific algorithm details are not documented in the public sources reviewed. cMix has been in production since network launch and operates as a communication layer that is independent of the blockchain — it does not authenticate or settle transactions, sign blocks, or otherwise feed into consensus, P2P transport, or on-chain logic.

**Planned future work.** cMix continues to be developed as the project's core differentiator. No public roadmap describes integrating cMix's post-quantum primitives into the blockchain layer.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, XX Network's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ⚠️.

We have found no public information indicating migration activity for XX Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

XX Network governance combines foundation-led stewardship with on-chain validator participation through Substrate's governance pallets. Protocol direction is driven primarily by the [XX Foundation](https://xx.network/) and Elixxir, the company that develops cMix. No PQC-relevant proposals affecting the blockchain layer have been identified in the public record at the time of writing; ongoing post-quantum work is scoped to the cMix messaging layer rather than the chain.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
