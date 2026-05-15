# Stacks (STX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Stacks |
| **Ticker** | STX |
| **GitHub** | https://github.com/stacksgov |
| **Derived from** | Bitcoin (security anchoring via PoX block-commits + VRF sortition) |
| **On-chain environment** | Clarity VM |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Stacks is a Bitcoin-anchored smart-contract chain that combines a Proof-of-Transfer (PoX) commitment to Bitcoin with Nakamoto signer-finalized blocks (activated via [SIP-021](https://github.com/stacksgov/sips/blob/main/sips/sip-021/sip-021-nakamoto.md) in 2024). Every cryptographic component on the Stacks side — miner block signatures, Stacker signer signatures, sortition VRF, node identity, on-chain signature opcodes, and the sBTC peg — currently relies on elliptic-curve primitives over secp256k1.

The only chain-attributable PQC artifact found is a [July 2025 community forum thread on forum.stacks.org](https://forum.stacks.org/t/future-proofing-stacks-toward-post-quantum-cryptography-readiness/18185) titled "Future-Proofing Stacks: Toward Post-Quantum Cryptography Readiness", which sketches a phased Clarity-level path including adding hash-based and lattice-based verification opcodes. No Stacks Improvement Proposal (SIP) has been filed, no working group has been chartered, and the published [Stacks 2026 roadmap](https://stacksroadmap.com/) (Bitcoin Staking → Scaling → DeFi) does not include PQC as a milestone.

## Proposed and Implemented PQC Algorithms

Stacks does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: D ⚠️**

Stacks transactions are signed with ECDSA over secp256k1. The standard single-sig principal address (`SP...` on mainnet, `ST...` on testnet) is derived from `HASH160(SHA256(pubkey))`, with a multi-sig variant available at the protocol level. Account abstraction is not exposed at the protocol envelope; Clarity post-conditions provide spend-control hooks inside contracts, but the outer signature envelope is fixed ECDSA. Both ECDSA and Schnorr over secp256k1 are broken by Shor's algorithm.

The only chain-attributable PQC discussion is the [July 2025 forum thread "Future-Proofing Stacks: Toward Post-Quantum Cryptography Readiness"](https://forum.stacks.org/t/future-proofing-stacks-toward-post-quantum-cryptography-readiness/18185). The post outlines a phased plan that would add Clarity verification primitives for lattice and hash-based schemes, follow with optional PQ transaction types modeled on the [BIP-360 approach used in Bitcoin](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki), and eventually extend to wallet and bridge work. The same author has separately referenced [Taproot quantum exposure in the Stacks Roadmap and Product Vision Update thread](https://forum.stacks.org/t/stacks-roadmap-and-product-vision-update/17852/46). No SIP has been filed and no on-record response from the core client maintainers or the Stacks Foundation has been located in the thread.

**Current state.** Mainnet transactions are exclusively secp256k1 ECDSA. There is no PQ transaction type on testnet or in any open SIP.

**Planned future work.** None scheduled. The forum thread is a community trial balloon; no SIP, working group, or testnet activity follows from it as of the information date.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Stacks in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Stacks in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

The factual baseline that informs this rating: the Stacks node uses a custom P2P stack (Rust implementation under `stackslib/src/net/` in [stacks-core](https://github.com/stacks-network/stacks-core)) rather than libp2p or devp2p. Node identity is secp256k1, and the handshake frame carries the peer's secp256k1 public key ([stackslib/src/net/chat.rs](https://github.com/stacks-network/stacks-core/blob/master/stackslib/src/net/chat.rs)). The on-the-wire framing does not use Noise or TLS as a standard transport layer.

## 4. On-Chain Logic

**Grade: F ❌**

Clarity, the Stacks smart-contract language, exposes signature-verification opcodes today, so this category is in scope rather than not applicable. The available primitives are `secp256k1-verify` and `secp256k1-recover?` (both secp256k1 ECDSA), plus `secp256r1-verify` (NIST P-256 ECDSA), which was added in [Clarity 4 / SIP-033](https://stacks.org/sip-033-clarity-4) to support [WebAuthn / passkey integration](https://forum.stacks.org/t/adding-webauthn-p-256-support-to-clarity-for-native-passkey-integration/17886). A follow-up forum thread tracks ongoing [clarification of the secp256r1-verify behaviour](https://forum.stacks.org/t/sip-clarification-of-claritys-secp256r1-verify-behavior/18564). Hash primitives include `sha256`, `sha512`, `sha512/256`, `keccak256`, and `hash160` ([Clarity functions reference](https://docs.stacks.co/reference/clarity/functions); [Hiro docs entry for secp256k1-verify](https://docs.hiro.so/stacks/clarity/functions/secp256k1-verify)).

There is no post-quantum signature-verification opcode on mainnet, testnet, or in any open SIP. Clarity 4 added a second elliptic-curve verification primitive rather than a post-quantum one. The community forum thread cited in the Transaction Signatures section mentions Clarity verification primitives only in passing as a future idea, not as a concrete SIP draft.

**Current state.** Signature verification is available only for secp256k1 (ECDSA) and secp256r1 (ECDSA).

**Planned future work.** [SIP-039](https://github.com/stacksgov/sips) (Clarity Wasm) and [SIP-034](https://github.com/stacksgov/sips) (capacity upgrade) target throughput, not cryptography. No SIP for post-quantum Clarity primitives has been filed.

## 5. Other Features

### sBTC peg

**Grade: F ❌**

[sBTC](https://docs.stacks.co/learn/sbtc) is a trustless two-way peg between Bitcoin and Stacks. BTC is locked on Bitcoin in a Taproot output controlled by an open-membership sBTC signer set (up to roughly 150 signers, dynamically rotated per PoX cycle), and sBTC is minted on Stacks; peg-out reverses the flow. The signer set authorises each peg-in and peg-out Bitcoin transaction by producing a [WSTS / FROST weighted-threshold Schnorr signature over secp256k1](https://github.com/stacks-sbtc/wsts), with a 70% weighted-reward-slot threshold that mirrors the Nakamoto signer threshold ([Hiro overview of SIP-028 and the signer set](https://www.hiro.so/blog/who-are-the-sbtc-signers-breaking-down-sip-028); [sBTC paper](https://stacks-network.github.io/stacks/sbtc.html)). An [Immunefi attackathon critical finding](https://github.com/immunefi-team/Past-Audit-Competitions/blob/main/stacks-i-attackathon/37861-bc-critical-sbtc-signer-wsts-implementation-allows-nonce-replays-such-that-a-malicious-signer.md) reported in the same period showed how sensitive the WSTS implementation surface is to subtle errors (a nonce-replay class issue in the signer flow).

A quantum break of secp256k1 would forge the threshold signature and drain the peg. Because the BTC custody output is a Taproot script, sBTC also inherits Bitcoin's Taproot quantum-exposure characteristics on the custody side (see the [Bitcoin public report](bitcoin.md)). Any Stacks-side migration would need to be paired with a Bitcoin-side PQ output type for the custody leg as well as a PQ threshold replacement for WSTS on the Stacks side; neither is production-ready today.

**Current state.** Open-membership WSTS/FROST Schnorr threshold custody over secp256k1.

**Planned future work.** None published. The July 2025 forum thread lists "wallet and sBTC bridge planning" as a long-term wish-list item, not engineering work.

### Stacker incentives and the BTC reward path

**Grade: F ❌**

Stackers lock STX during PoX cycles in exchange for BTC rewards paid directly by miners' Bitcoin block-commit transactions ([Stacks mining docs](https://docs.stacks.co/learn/block-production/mining); [Stacks paper](https://stacks-network.github.io/stacks/stacks.html)). Reward addresses on Bitcoin and Stacker public keys are secp256k1 throughout, so the BTC reward path inherits Bitcoin's address-reuse and Taproot exposure characteristics (see the [Bitcoin public report](bitcoin.md)). No Stacks-side mitigation specific to this path has been published.

**Current state.** secp256k1 throughout the reward path.

**Planned future work.** None published on the Stacks side.

### StackerDB

**Grade: F ❌**

StackerDB is a replicated key-value store gossiped over the Stacks P2P network and used by sBTC signers and other distributed services to coordinate. Chunks are authenticated by secp256k1 ECDSA signatures from the writing party.

**Current state.** secp256k1 ECDSA chunk authentication.

**Planned future work.** None published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Stacks's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No published proposal retires ECDSA, Schnorr, WSTS, or the secp256k1 VRF from Stacks. No SIP has been filed, no Stacks Foundation statement on EC retirement has been located, and the [2026 roadmap](https://stacksroadmap.com/) ([overview coverage](https://www.benzinga.com/pressreleases/26/05/52531824/)) does not include an EC sunset milestone. The community forum thread cited earlier proposes *adding* PQ schemes alongside the existing EC primitives, not retiring them; Clarity 4 / [SIP-033](https://stacks.org/sip-033-clarity-4) similarly *added* a second EC primitive without deprecating `secp256k1-verify`.

A second structural constraint: any Stacks-side EC retirement on the sBTC custody leg is bounded above by Bitcoin's own EC sunset decision, because the BTC under sBTC sits in a Taproot output on Bitcoin. The Bitcoin-side picture (BIP-360 and BIP-361) is summarised in the [Bitcoin public report](bitcoin.md).

**Current state.** No EC retirement plans published for any category.

**Planned future work.** None published.

## Governance

Stacks protocol changes follow the [SIP (Stacks Improvement Proposal) process in the stacksgov/sips repository](https://github.com/stacksgov/sips), with categories for Consensus, Networking, Operations, and Meta. Activation of consensus-affecting SIPs is gated on combined miner and Stacker signaling aligned to PoX cycles.

Recent SIP activity referenced in this report:

- [SIP-021 — Nakamoto](https://github.com/stacksgov/sips/blob/main/sips/sip-021/sip-021-nakamoto.md). Stacks 3.0 / Nakamoto release introducing Stacker signer-finalized blocks. Activated 2024. ([PR thread](https://github.com/stacksgov/sips/pull/155).)
- [SIP-025 — Iterating towards Weighted Schnorr Threshold Signatures](https://github.com/stacksgov/sips/blob/main/sips/sip-025/sip-025-iterating-towards-weighted-schnorr-threshold-signatures.md). Describes the iterative path from the post-Nakamoto interim signer scheme toward the full WSTS roll-out.
- [SIP-028 — sBTC signer set](https://www.hiro.so/blog/who-are-the-sbtc-signers-breaking-down-sip-028) (Hiro explainer). Governance of the open-membership sBTC signer set.
- [SIP-033 — Clarity 4](https://stacks.org/sip-033-clarity-4). Added `secp256r1-verify` and other Clarity functions in 2026. None are post-quantum.

PQC-relevant discussion threads on `forum.stacks.org`:

- ["Future-Proofing Stacks: Toward Post-Quantum Cryptography Readiness"](https://forum.stacks.org/t/future-proofing-stacks-toward-post-quantum-cryptography-readiness/18185) (2025-07-02). Community proposal sketching a phased Clarity-level PQC path. Not a SIP.
- ["Stacks Roadmap and Product Vision Update", post #46](https://forum.stacks.org/t/stacks-roadmap-and-product-vision-update/17852/46). Same author referencing Taproot quantum exposure.
- ["Adding WebAuthn (P-256) Support to Clarity for Native Passkey Integration"](https://forum.stacks.org/t/adding-webauthn-p-256-support-to-clarity-for-native-passkey-integration/17886) and ["SIP-Clarification of Clarity's secp256r1-verify Behavior"](https://forum.stacks.org/t/sip-clarification-of-claritys-secp256r1-verify-behavior/18564). Background on why Clarity 4 added an EC verification primitive rather than a post-quantum one.

No SIP carrying a PQC number has been filed.

---

_Generated on 14 May 2026 based on information as of 14 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
