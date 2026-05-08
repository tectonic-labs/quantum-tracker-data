# Naoris Protocol (NAORIS) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Naoris Protocol |
| **Ticker** | NAORIS |
| **Website** | https://www.naorisprotocol.com/ |
| **Twitter / X** | https://x.com/NaorisProtocol |
| **Mainnet genesis** | 2026-04-01 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Naoris Protocol is a [PQC-native L1](https://www.naorisprotocol.com/) whose mainnet went live on 1 April 2026, with [**ML-DSA** (Dilithium-5, FIPS 204) signing every transaction at genesis](https://www.coindesk.com/markets/2026/04/03/naoris-protocol-s-quantum-resistance-blockchain-goes-live-as-bitcoin-and-ethereum-face-q-day-threats/). The protocol is positioned as a security overlay for existing chains rather than a replacement for them: Bitcoin, Ethereum, and other EC-based ecosystems can integrate without hard-forking, gaining a quantum-resistant validation surface from the Naoris layer while continuing to operate on their own timelines.

The chain pairs **ML-DSA** signing with a novel "dPoSec" (Decentralized Proof of Security) consensus, in which validator participation is contingent on continuously demonstrating an active security posture. Networking sits on a self-described "Sub-Zero Layer" that the project says uses NIST-approved post-quantum primitives end-to-end, though the specific algorithms and the handshake design are not yet documented in detail publicly. Mainnet has been live for roughly a month at the time of writing, so production track record is still being established.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** (Dilithium-5, FIPS 204) | ECDSA / Ed25519 transaction signing | Tx Signatures | Implemented |
| **ML-DSA** (Dilithium-5, FIPS 204) | EC-based validator / block signing | Consensus | Implemented |

## Transaction Signatures

**Grade: A ✅**

All on-chain transactions on Naoris are signed with **ML-DSA** at the Dilithium-5 parameter set, [the NIST-standardized post-quantum signature published as FIPS 204](https://www.coindesk.com/markets/2026/04/03/naoris-protocol-s-quantum-resistance-blockchain-goes-live-as-bitcoin-and-ethereum-face-q-day-threats/). Address derivation is built directly on **ML-DSA** public keys, and the protocol enforces an "irreversible security transition" rule: once a user adopts post-quantum keys, subsequent attempts to spend from the same identity using classical signatures are rejected at the protocol layer, closing off downgrade-attack paths.

**Current state.** **ML-DSA** signing is live on mainnet for every transaction type. There is no documented EC fallback or hybrid mode; the chain has been PQC-native since genesis. Multi-sig and threshold variants of **ML-DSA** are not yet documented publicly. Signature standards are stated as aligned with NIST, NATO, and ETSI guidance.

**Planned future work.** No transaction-signing migration is required — the chain launched on **ML-DSA**. Future documentation is expected to detail multi-sig, threshold, and account-abstraction patterns as the network matures.

## Consensus

**Grade: A ✅**

Consensus uses [dPoSec, a novel mechanism in which validators must continuously attest to active device-and-network security state to participate in block production](https://www.naorisprotocol.com/). Block signing and validator identity both rely on **ML-DSA** keys, so the consensus signing surface is post-quantum from genesis. The launch validator set was invite-only, with the project reporting a network of over one million security nodes participating at mainnet launch.

**Current state.** dPoSec with **ML-DSA** validator identity has been in production since 1 April 2026. Block signatures and validator authentication are post-quantum end-to-end. Pre-launch testing reported processing 100M+ transactions and detecting 603M+ security threats; over 106M transactions had been processed on mainnet by late April 2026.

**Planned future work.** The dPoSec design is stated as continuing to evolve with production experience, and the validator set is expected to expand beyond invite-only over time. Specifics of the randomness beacon and finality mechanism are not yet documented publicly.

## P2P Networking

**Grade: D ⚠️**

Naoris describes its networking layer as a "Sub-Zero Layer" sitting beneath the conventional blockchain stack, [claimed to use NIST-approved post-quantum cryptography for all node-to-node communications](https://www.naorisprotocol.com/). The high-level architectural claim is consistent with the rest of the stack, but the specific handshake construction, transport encryption primitives, and node-identity scheme have not been published in detail at the time of writing.

**Current state.** The Sub-Zero Layer has been deployed on mainnet since 1 April 2026 with stated PQC properties. The peer-discovery mechanism, the exact post-quantum primitives in use for transport, and the node-identity key format are not documented in publicly available materials.

**Planned future work.** The architecture documentation for the Sub-Zero Layer is expected to be expanded as the network matures. Until those specifics are published, the networking layer's PQC story rests on architectural assertions rather than independently inspectable detail.

## On-Chain Logic

**Grade: D ⚠️**

Naoris is positioned primarily as a [security overlay for other blockchains rather than a general-purpose smart-contract platform](https://www.naorisprotocol.com/), so the on-chain logic story is less about a VM and more about cross-ecosystem signature verification at the Sub-Zero Layer. The project states that the layer can validate transactions and contract logic across integrated ecosystems and that post-quantum signature verification is enabled in this unified surface, but the verification primitives, supported algorithms, and integration interfaces are not yet documented in depth.

**Current state.** Mainnet is live with stated PQC signature verification across integrated ecosystems. There is no traditional on-chain VM, EC precompile set, or hash-precompile inventory documented; the chain's role is described as overlay rather than replacement.

**Planned future work.** The on-chain verification specifics are stated as forthcoming as integrations expand and the protocol documentation matures.

## Other Features

### Sub-Zero Layer security overlay

**Current state.** Naoris's distinguishing feature is the [Sub-Zero Layer overlay model](https://www.coindesk.com/markets/2026/04/03/naoris-protocol-s-quantum-resistance-blockchain-goes-live-as-bitcoin-and-ethereum-face-q-day-threats/): it sits beneath conventional blockchain layers and is designed to provide a quantum-resistant security surface to existing chains (Bitcoin, Ethereum, and others) without requiring those chains to hard-fork. The overlay is the principal product, and the architecture is novel — there is no widely-deployed comparable design to benchmark against, and mainnet has been live for roughly a month.

**Planned future work.** Maturation of the overlay is gated on production experience, additional ecosystem integrations, and expanded public documentation. The project also identifies an eventual transition from invite-only to permissionless validator participation, without a published timeline.

### Irreversible security transition

**Current state.** The protocol enforces that once a user adopts post-quantum keys, the same identity cannot subsequently be spent from using classical cryptography. This is a protocol-level rule designed to neutralize downgrade attacks that would otherwise let an attacker push a user's address back to an EC-signing path.

**Planned future work.** No published changes; the rule is in force on mainnet from genesis.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ✅, Consensus ✅, P2P ⚠️, On-Chain ⚠️, Other ⚠️.

Naoris itself has no internal EC dependence to retire — it is post-quantum from genesis. The F rating in this column reflects the *product positioning*: Naoris is explicitly designed to coexist with the EC-based chains it secures rather than to drive their EC retirement. [The interoperability story is that Bitcoin, Ethereum, and other EC ecosystems can adopt the Naoris overlay while continuing to use elliptic-curve cryptography on their own chains](https://www.coindesk.com/markets/2026/04/03/naoris-protocol-s-quantum-resistance-blockchain-goes-live-as-bitcoin-and-ethereum-face-q-day-threats/), and the protocol does not impose or publish EC sunset timelines for those chains. So while the Naoris layer itself contributes nothing to ongoing EC exposure, it also does not advance EC retirement on the chains it integrates with.

**Current state.** No internal EC primitives in use on Naoris. No EC retirement timelines published or imposed for integrated chains; each underlying chain controls its own EC sunset pace.

**Planned future work.** EC retirement on integrated chains is explicitly not in scope for the Naoris protocol design. Internal governance evolution is expected as the network matures, but no roadmap item targets EC sunset commitments.

## Governance

Governance at launch is company-led, with no on-chain proposal or voting system documented at mainnet. PQC-relevant decisions to date — selection of **ML-DSA** as the signature scheme, the dPoSec consensus design, and the Sub-Zero Layer architecture — were taken by the Naoris Protocol team prior to launch. Public venues for community discussion are the [project blog](https://www.naorisprotocol.com/blog), [Discord](https://discord.gg/naorisprotocol), and [Telegram](https://t.me/+E976qpBGhLw3MzA0); transition toward a more formal on-chain or community governance process is described as expected but does not have a published timeline.

---

_Generated on 08 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
