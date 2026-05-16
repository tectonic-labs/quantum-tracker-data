# Sender — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Sender |
| **Vendor** | Sender Labs (Singapore) |
| **Category** | Software |
| **Custody model** | Single-key self-custody (EOA / NEAR account); user holds a 12-word seed phrase. Optional Ledger hardware co-sign. No native MPC. |
| **Website** | https://senderwallet.io/ |
| **GitHub** | https://github.com/SenderLabs |
| **Twitter / X** | https://x.com/Sender_AI |
| **Platforms** | Browser extension (Chrome, Brave, Edge, Kiwi) and mobile (iOS, Android). |
| **Open source** | Proprietary — the production wallet clients are closed source. |
| **First release** | 2021 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Sender is a multi-chain software wallet built around NEAR, with coverage extending to Aurora, TON, and a range of Ethereum-compatible chains. As of the information date for this report, no Sender-branded public statement on post-quantum cryptography has been located across the vendor's website, documentation, GitHub presence, or social accounts. The wallet today signs NEAR transactions with classical Ed25519 and EVM transactions with classical secp256k1 ECDSA; it ships no post-quantum signing path. Sender's nearest path to post-quantum relevance is upstream: NEAR Protocol has a public plan to add a post-quantum signing scheme at the protocol layer, and Sender — as a NEAR-native wallet — would be a natural consumer of that scheme once it activates.

## Proposed and Implemented PQC Algorithms

Sender does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

This column rates whether the vendor has made a public statement about post-quantum cryptography. No Sender-authored blog post, roadmap item, security white paper, or social thread on quantum migration has been located across the vendor's marketing site, [developer documentation](https://docs.senderwallet.io/), the corporate [Sender Network site](https://www.sender.org/), the [Sender Network whitepaper](https://sender-network.gitbook.io/sender-network-docs), the vendor's [GitHub org](https://github.com/SenderLabs), or the [Sender X account](https://x.com/Sender_AI). The wallet's primary chain, NEAR, has a published plan to add post-quantum signing at the protocol level — see the upstream [Near One blog post](https://www.near.org/blog/making-near-protocol-post-quantum-safe) — but that is an upstream chain statement, not a Sender statement.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Sender in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

The wallet clients are closed source, and Sender ships a fixed signer set with no plugin or extension API for adding a new signature scheme. A third party cannot add a new signing algorithm without Sender Labs shipping it in a new release.

## Protocol PQC

**Rating: N/A** ➖

This column rates whether the wallet signs user transactions with a chain's protocol-level post-quantum scheme on a PQC-native chain it supports. None of the chains Sender supports today exposes a protocol-level post-quantum signature scheme for user transactions, so this column does not apply. NEAR Protocol has a published plan to add a post-quantum signing scheme on testnet, but as of the information date for this report that scheme has not activated on mainnet and Sender has not implemented it.

## Contract PQC Support

**Rating: Yes-but** *️⃣

This column rates whether the wallet signs with a post-quantum signature verified by on-chain smart-contract bytecode, or whether such integration is publicly in flight.

**Current state.** Sender ships a classical EOA-style wallet on every chain it supports. There is no Sender user-facing flow that routes a signature through smart-contract bytecode verifying a post-quantum signature on-chain today.

**Planned future work.** NEAR Protocol has a published plan, described in the upstream [Near One blog post](https://www.near.org/blog/making-near-protocol-post-quantum-safe) (6 May 2026), to add a post-quantum signing scheme on testnet by the end of Q2 2026, and that post explicitly references collaboration with software and hardware wallet builders. NEAR's [access-key model](https://docs.near.org/api/rpc/access-keys) lets an account hold multiple key types, which provides a clean path for a wallet to add an alternative signing scheme to an existing account. Whether Sender Labs is one of the wallet collaborators referenced upstream has not been publicly confirmed.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Sender in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Sender uses standard browser TLS for transport and has no native MPC handshake or passkey ceremony documented; no post-quantum mechanism is identified in any off-chain part of the wallet flow.

## Vendor & Governance

Sender is published by Sender Labs, a private, VC-backed company based in Singapore. Product decisions, the feature roadmap, and security posture are set by the company; the wallet client is not governed by a DAO or token holders.

Product information is disclosed through the vendor's [marketing site](https://senderwallet.io/) and [developer documentation](https://docs.senderwallet.io/). A documented support channel is published in the developer documentation. The vendor's marketing site states the wallet was audited by the security firm SlowMist; the specific report date and scope were not located.

Where post-quantum commitments would surface, the most relevant near-term signal is upstream rather than from the vendor: NEAR Protocol's published [post-quantum plan](https://www.near.org/blog/making-near-protocol-post-quantum-safe) targets a post-quantum signing scheme on testnet by the end of Q2 2026. Readers tracking Sender's post-quantum readiness should watch both that upstream timeline and the vendor's own channels for any wallet-side integration announcement.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
