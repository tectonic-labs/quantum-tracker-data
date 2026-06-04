# Centrifuge (CFG) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Centrifuge |
| **Ticker** | CFG |
| **Website** | <https://centrifuge.io> |
| **GitHub** | <https://github.com/centrifuge> |
| **Parent chain** | Polkadot (parachain, legacy) |
| **On-chain environment** | Substrate / WASM (parachain) plus EVM (V3 protocol on Ethereum, Base, Arbitrum, Avalanche, BNB Chain, Plume, with additional non-EVM hosts) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Centrifuge is unusual on this list because it now exists in two parallel forms. The original Centrifuge Chain — a Polkadot parachain built on Substrate — still operates and continues to receive maintenance commits to [centrifuge/centrifuge-chain](https://github.com/centrifuge/centrifuge-chain), with a core lease on Polkadot through January 2028. In parallel, governance proposal [CP141](https://gov.centrifuge.io/t/cp141-initiate-the-development-of-centrifuge-v3-a-multi-chain-evm-based-protocol/6734) (passed February 2025) authorized the construction of [Centrifuge V3](https://centrifuge.io/blog/centrifuge-v3-multichain-launch), a multi-chain EVM-native rewrite of the protocol, which [launched in July 2025](https://thedefiant.io/news/blockchains/centrifuge-migrates-to-ethereum-with-cross-chain-evm-native-protocol) on Ethereum, Base, Arbitrum, Avalanche, BNB Chain, and Plume, with later expansion to Solana and Stellar. The [CFG token itself was migrated](https://centrifuge.io/blog/cfg-token-migration-2025) over May – December 2025 to a native Ethereum ERC-20 at `0xcccCCCcCCC33D538DBC2EE4fEab0a7A1FF4e8A94`, and the legacy parachain ↔ Ethereum bridge was deprecated after the swap window closed.

For post-quantum accounting, this dual-state matters: the parachain's cryptographic posture is inherited from Polkadot (sr25519, Ed25519, ECDSA, BLS12-381 on the relay chain), while the V3 protocol's posture is inherited from each EVM host it runs on plus the cryptography of whichever cross-chain bridge a given message routes through. No chain-attributable post-quantum work has been located in either surface — no proposal in the [Centrifuge governance forum](https://gov.centrifuge.io/), no entries in the [parachain runtime repo](https://github.com/centrifuge/centrifuge-chain), and no entries in the [V3 protocol repo](https://github.com/centrifuge/protocol).

## Proposed and Implemented PQC Algorithms

Centrifuge does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

The Centrifuge parachain follows the standard Substrate account model, supporting **sr25519** (Schnorrkel over Ristretto25519) as the default along with **Ed25519** and **ECDSA secp256k1** alternatives — all elliptic-curve schemes. The V3 protocol on EVM hosts uses standard externally-owned accounts signed with ECDSA secp256k1; smart-account paths layered on top (e.g. ERC-4337) ultimately resolve to elliptic-curve key material as well.

**Current state.** No post-quantum signature option is available on either the parachain or the EVM-hosted V3 protocol.

**Planned future work.** No public proposal, draft, or roadmap item for a post-quantum transaction-signature scheme has been located in the [Centrifuge governance forum](https://gov.centrifuge.io/) or in either source repository.

## Consensus

**Grade: F ❌**

The Centrifuge parachain authors blocks via **Aura** (round-robin among collators) and inherits security and finality from the Polkadot relay chain — BABE (sr25519 VRF) for block production and GRANDPA for finality, with relay-chain validators producing BLS12-381 aggregate signatures and Ed25519 session keys. Collators on the parachain do not finalize on their own. The V3 protocol does not run its own consensus; on each EVM host it inherits the consensus rules of that chain.

**Current state.** No post-quantum consensus path exists at the Centrifuge layer. Any change would have to arrive upstream — through Polkadot relay-chain upgrades on the parachain side, or through individual host chains on the V3 side.

**Planned future work.** None published.

## P2P Networking

**Grade: F ❌**

The parachain runs the standard Substrate libp2p stack: Ed25519 node identities and a Noise XX handshake using Curve25519 ECDH, identical to Polkadot. The V3 protocol has no peer-to-peer layer of its own; cross-chain messages travel over each bridge provider's networking (Wormhole's Guardian gossip, LayerZero's DVN attestations, Axelar's Cosmos validator gossip, Chainlink CCIP's DON) — all of which are elliptic-curve at the transport and signature layers today.

**Current state.** No post-quantum handshake or node-identity scheme is in use.

**Planned future work.** None published.

## On-Chain Logic

**Grade: F ❌**

Two on-chain surfaces. The parachain runtime is built from [Substrate FRAME pallets](https://github.com/centrifuge/centrifuge-chain) — including Centrifuge-specific `pools`, `loans`, `nft`, `keystore`, and `permissions` pallets for the real-world-asset workflow — compiled to WASM and executed against standard Substrate host functions for hashing (Blake2, Keccak, SHA-2) and signature verification (sr25519, Ed25519, ECDSA). The V3 [protocol contracts](https://github.com/centrifuge/protocol) run on the standard EVM precompile set on each host: `ecrecover` (secp256k1), the BN254 add / mul / pairing precompiles, BLS12-381 (EIP-2537) on hosts that ship it, plus hash precompiles. Neither surface exposes a post-quantum signature-verification primitive — no host function on the parachain side, no precompile on the V3 side.

**Current state.** No post-quantum verification primitive is available on either surface.

**Planned future work.** None published. Any future on-chain post-quantum verification on the V3 side would depend on each host EVM shipping a post-quantum precompile; on the parachain side it would require either a Substrate host function from upstream or a chain-extension addition.

## Other Features

### Real-world-asset pools and tokenization

The defining product feature: real-world assets are represented as on-chain assets and locked as collateral inside pools, with pool participants receiving senior / junior tranche claims (TIN / DROP in the legacy Tinlake model, [ERC-7540 vaults](https://docs.centrifuge.io/developer/protocol/overview/) in V3). Authorization for asset originators, investors, and risk roles is enforced through host-chain account signatures — sr25519 on the parachain, secp256k1 ECDSA on the EVM hosts — and asset documents are typically held off-chain with on-chain hash anchors. The hash anchoring uses SHA-2 / Keccak / Blake2, which are not threatened by a quantum break, but the authorization layer above them is elliptic-curve end-to-end.

**Current state.** Authorization is elliptic-curve; no post-quantum signature option is exposed to pool participants.

**Planned future work.** None published.

### V3 cross-chain messaging

The V3 protocol uses a hub-and-spoke design in which each pool selects a single hub chain for accounting and share-class management and distributes liquidity onto spoke chains via burn-and-mint token movement; control messages are aggregated across multiple bridges with retries and gas subsidies. The aggregator stacks four classical cross-chain rails: [Wormhole](https://wormhole.com/blog/centrifuge-completes-v3-migration-delivering-unified-multichain-rwa) (Guardian network signing under secp256k1 ECDSA), LayerZero V2 (configurable DVNs whose default verifiers sign under secp256k1 ECDSA), Axelar (Cosmos / CometBFT validator set, Ed25519 for consensus and secp256k1 ECDSA for cross-chain transaction signatures), and Chainlink CCIP (DON-signed reports under secp256k1 ECDSA).

**Current state.** Every constituent bridge is elliptic-curve at the message-attestation layer. Aggregating across multiple bridges does not raise the post-quantum floor, because each rail can be attacked independently.

**Planned future work.** None published from Centrifuge for the bridge layer; any improvement would have to come from the individual bridge providers.

### Legacy parachain ↔ Ethereum bridge

The pre-V3 bridge between the Centrifuge parachain and Ethereum used Polkadot's BEEFY / GRANDPA light-client posture (sr25519 / BLS12-381). It was deprecated after the V3 migration and is no longer in the data path.

**Current state.** Out of service.

**Planned future work.** Not applicable.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No published elliptic-curve retirement schedule has been located from the Centrifuge Network Foundation, the DAO, or the operating teams. The 2025 protocol migration moved the application surface from a Substrate-EC environment to an EVM-EC environment — a sideways move in cryptographic terms rather than a sunset. On the parachain side, any elliptic-curve retirement would arrive through Polkadot relay-chain upgrades. On the V3 side, retirement would depend on each host chain (Ethereum, Base, Arbitrum, Avalanche, BNB Chain, Plume, plus Solana and Stellar) deprecating elliptic-curve primitives, and on each contracted bridge provider doing the same for cross-chain messaging. Centrifuge sits downstream of every one of these venues.

**Current state.** No elliptic-curve deprecation milestone is published for either the parachain runtime or the V3 contracts.

**Planned future work.** None published.

## Governance

Centrifuge governance has historically run on the parachain via the on-chain Council and referenda model (Substrate `pallet-democracy` and `pallet-collective`), with proposals authored on the [Centrifuge governance forum](https://gov.centrifuge.io/) under the "CP" identifier. Two recent proposals are load-bearing for the current architecture:

- [CP141 — Initiate the development of Centrifuge V3, a multi-chain, EVM-based protocol](https://gov.centrifuge.io/t/cp141-initiate-the-development-of-centrifuge-v3-a-multi-chain-evm-based-protocol/6734) (passed February 2025) authorized construction of the V3 protocol. The [V3 launch](https://centrifuge.io/blog/centrifuge-v3-multichain-launch) followed in July 2025.
- A subsequent proposal in November 2025 shifted active governance and protocol oversight to the Centrifuge Network Foundation, with the DAO retaining the ability to reassume governance later. See the [Centrifuge Q3 2025 recap](https://centrifuge.io/blog/centrifuge-q3-2025-recap) for context.
- A separate July 2025 governance thread, [Deprecating Altair Chain](https://gov.centrifuge.io/t/deprecating-altair-chain/7013), covers the wind-down of the Kusama sister chain.

No post-quantum-relevant proposals, working-group documents, or scheduled discussions have been located in the governance forum or in either source repository as of the date below.

---

_Generated on 03 Jun 2026 based on information as of 14 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
