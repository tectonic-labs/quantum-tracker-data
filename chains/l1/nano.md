# Nano (XNO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Nano |
| **Ticker** | XNO |
| **Website** | https://nano.org/ |
| **GitHub** | https://github.com/nanocurrency |
| **On-chain environment** | None (currency-only block-lattice) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Nano (formerly RaiBlocks, ticker XNO since 2021) is a feeless, instant payment network based on a block-lattice architecture: each account maintains its own asynchronous chain of send and receive blocks signed by the account holder. Transaction conflict resolution is handled by [Open Representative Voting (ORV)](https://en.wikipedia.org/wiki/Nano_(cryptocurrency)), in which Principal Representatives cast balance-weighted votes over the network. Both account-block signatures and representative votes use **Ed25519-Blake2b** — a custom variant of Ed25519 that substitutes Blake2b for SHA-512 inside the EdDSA signing scheme. The underlying curve is Curve25519, which is vulnerable to Shor's algorithm. No post-quantum migration work has been identified in Nano Foundation communications or the nano-node repository.

## Proposed and Implemented PQC Algorithms

Nano does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Nano in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Nano in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Nano in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

Nano has no smart contract layer. The block-lattice protocol supports only send, receive, open, and change-representative operations; arbitrary computation is not possible. This category does not apply.

## Other Features

Nano has no chain-specific cryptographic features beyond its core signing and consensus. The small proof-of-work nonce attached to each block is a Blake2b-based difficulty puzzle for spam prevention; it is not relevant to consensus security and introduces no additional EC dependency. This category does not apply.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ➖, Other ➖.

We have found no public information indicating migration activity for Nano in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Nano upgrades are coordinated off-chain by the Nano Foundation, with new node versions released and a recommended upgrade deadline announced for Principal Representatives. There is no on-chain governance contract; coordination is social and stake-weighted. No post-quantum proposal has been identified in Nano Foundation communications.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
