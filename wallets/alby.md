# Alby — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Alby |
| **Vendor** | Alby |
| **Category** | Software |
| **Custody model** | Non-custodial across all current products — the browser extension holds a Nostr secret key locally, Alby Hub holds the Lightning seed (self-hosted), and Alby Go is a thin client that holds no keys and connects to a remote Hub. |
| **Website** | https://getalby.com/ |
| **GitHub** | https://github.com/getAlby |
| **Platforms** | Browser extension (Chrome, Brave, Edge, Opera, Firefox), mobile (Alby Go on iOS and Android), desktop (Alby Hub on macOS, Windows, Linux), plus a hosted Alby Cloud option. |
| **Open source** | Open source — MIT for the browser extension and most ecosystem libraries; Apache-2.0 for Alby Hub. |
| **First release** | 2021 (browser extension) |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | N/A | ➖ | Not Applicable |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

## Summary paragraphs

Alby is a Bitcoin, Lightning, and Nostr wallet stack. It ships several interoperating products under one brand: a browser extension that acts as a Nostr signer and Lightning client, Alby Hub (a self-hosted Lightning node), Alby Go (a mobile companion that connects to a remote Hub), and a hosted Alby Cloud option. All current products are non-custodial; Alby's historical custodial shared wallet was sunset on 4 January 2025.

Alby's signing surface today is entirely classical: BIP-340 Schnorr over secp256k1 for Nostr events, ECDSA secp256k1 for Lightning channel state and on-chain Bitcoin, and secp256k1 ECDH for the encryption layer that protects Nostr Wallet Connect (NWC) and Nostr direct messages. No post-quantum cryptography ships anywhere in the Alby stack, and no public Alby statement, roadmap item, or code addressing post-quantum migration was found.

## Proposed and Implemented PQC Algorithms

Alby does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

Alby supports Bitcoin, Lightning, and Nostr — none of which has an active protocol-level or contract-level post-quantum signature scheme available for a wallet to adopt today. No published post-quantum migration path exists for Lightning, and no post-quantum primitive is deployed on Bitcoin mainnet. Because there is no production post-quantum surface for a Bitcoin/Lightning/Nostr wallet to engage with, this posture column does not apply in the same way it would for a wallet on a chain that offers such a path.

For the record: no Alby-authored blog post, roadmap item, security paper, or public thread on post-quantum migration was located, and the Alby blog index contains no posts mentioning post-quantum topics ([Alby blog](https://getalby.com/blog/)).

## Crypto Agility

**Rating: N/A** ➖

Alby's architecture has two notable extension surfaces. Alby Hub's `LNClient` interface abstracts six different Lightning-node backends — LDK, LND, Phoenixd, Greenlight, Breez SDK, and Cashu — and the Hub invites contributions for additional backends ([Alby Hub](https://github.com/getAlby/hub); [backend overview](https://blog.getalby.com/the-6-different-lightning-backends-for-alby-hub/)). Separately, the `window.webln` provider and the NWC protocol let third-party Lightning services act as wallet backends for Alby's UI ([NWC docs](https://docs.nwc.dev/)).

These surfaces are real, but the prerequisites for swapping in a post-quantum signing scheme are protocol-side and absent. The browser extension's Nostr signer is fixed to BIP-340 Schnorr secp256k1 because the Nostr protocol itself defines no alternative; a non-classical Lightning signing backend would require Lightning protocol changes that do not exist ([browser extension](https://github.com/getAlby/lightning-browser-extension)). With no production post-quantum scheme available on any supported chain to be made pluggable, this column does not apply.

## Protocol PQC

**Rating: N/A** ➖

Protocol PQC measures whether a wallet signs user transactions with a chain's protocol-level post-quantum scheme. None of the chains Alby supports — Bitcoin, Lightning Network, Nostr, or Liquid — has a protocol-level post-quantum signature scheme, so this column does not apply.

## Contract PQC Support

**Rating: N/A** ➖

Contract PQC Support measures whether a wallet signs with a post-quantum signature verified by on-chain contract bytecode, or has such integration publicly in flight. Bitcoin has no deployed post-quantum primitive on mainnet; BIP-360 (P2QRH) was merged into the BIP repository in early 2026 but is not active ([BIP-360 spec](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki)). Lightning, Nostr, and Liquid likewise define no post-quantum primitive, and none of these chains provides a generalised smart-account surface of the kind this column evaluates. With no on-chain post-quantum verification mechanism available on any supported chain, this column does not apply.

## Off-Chain PQC

**Rating: No** ❌

Off-Chain PQC measures whether a wallet ships post-quantum cryptography in any part of its flow that does not bind on-chain — for example transport encryption, handshakes, or backups.

**Current state.** Alby uses standard transport encryption throughout: ordinary browser TLS for the Alby Account dashboard, standard WebSocket-over-TLS for Nostr relay connections, and standard gRPC-over-TLS for Hub backend connections. No hybrid or post-quantum transport is documented in any Alby signing pipeline.

The most significant off-chain encryption surface is Nostr Wallet Connect. NWC (NIP-47) is co-authored by Alby and is the load-bearing protocol of the Alby product stack — it carries traffic between Alby Go and the Hub, between dapps and the Hub, and for NIP-46 remote-signing requests ([NIP-47 spec](https://nips.nostr.com/47); [NIP-46 spec](https://nips.nostr.com/46)). NWC inherits its encryption from NIP-44, which derives its shared secret from secp256k1 ECDH ([NIP-44 spec](https://nips.nostr.com/44)). That key agreement is classical, the ciphertext is published to public Nostr relays, and it persists indefinitely — so it carries a real harvest-now-decrypt-later exposure for payment instructions and remote-signing traffic. No post-quantum key agreement ships in this path.

**Planned future work.** An open Nostr discussion (issue #1971 in the nostr-protocol/nips repository) raises adding post-quantum encryption alternatives to NIP-44; no NIP has been merged, and no Alby comment in that thread was located ([NIP-44 PQC discussion](https://github.com/nostr-protocol/nips/issues/1971)). No committed Alby integration work in this column was found.

## Vendor & Governance

Alby is developed by Alby Inc., a private company (registered in Liechtenstein per company filings). It began as an open-source community initiative and grew into a company. There is no DAO and no on-chain governance.

Alby's source code is publicly reviewable: the browser extension and most ecosystem libraries are MIT-licensed, and Alby Hub is Apache-2.0-licensed ([browser extension](https://github.com/getAlby/lightning-browser-extension); [Alby Hub](https://github.com/getAlby/hub)). Product direction surfaces through Alby's GitHub organisation and its blog ([GitHub org](https://github.com/getAlby); [Alby blog](https://getalby.com/blog/)). Alby's broader influence runs through protocol authorship — it co-authored NWC (NIP-47) — and through its reference implementations rather than through a governance token; Alby has no native token.

Nostr protocol changes flow through the nostr-protocol/nips repository and Lightning protocol changes through the lightning/bolts repository; Alby participates as an implementer and co-author rather than as a governance authority. A contributor "Bounties" wiki exists for the browser extension, but it lists contributor incentives rather than a formal vulnerability-disclosure program ([Bounties wiki](https://github.com/getAlby/lightning-browser-extension/wiki/Bounties)).

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
