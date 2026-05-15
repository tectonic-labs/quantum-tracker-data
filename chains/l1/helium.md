# Helium (HNT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Helium |
| **Ticker** | HNT |
| **Website** | <https://www.helium.foundation/> |
| **GitHub** | <https://github.com/helium> |
| **Parent chain** | Solana (since [HIP-70](https://github.com/helium/HIP/blob/main/0070-scaling-helium.md), April 2023) |
| **On-chain environment** | SVM (Solana Virtual Machine) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | ➖ | ➖ | Not Applicable |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Helium is a DePIN network whose on-chain settlement layer has lived on Solana since the [HIP-70 migration](https://github.com/helium/HIP/blob/main/0070-scaling-helium.md) in April 2023. HNT, MOBILE, and IOT are SPL tokens, hotspots are represented as compressed NFTs, and reward distribution runs through Solana programs in [helium/helium-program-library](https://github.com/helium/helium-program-library). The legacy Helium L1 (HoneyBadgerBFT, secp256k1, libp2p) is frozen and historical. Because consensus is fully delegated to Solana, this report treats the Consensus category as not applicable and rates only the surfaces that are chain-attributable to Helium.

Outside the inherited Solana envelope, Helium's distinctive cryptography is concentrated in its physical-layer Proof of Coverage stack. Every certified hotspot ships with a [Microchip ATECC608-TNGHNT](https://ww1.microchip.com/downloads/aemDocuments/documents/SCBU/ProductDocuments/DataSheets/ECC608-Trust-and-GO-For-Helium-Network-Data-Sheet-DS40002389.pdf) "Trust & GO for Helium Network" secure element that holds an ECC P-256 (secp256r1) private key generated and locked in-hardware at factory provisioning. That key signs beacon, witness, location, and onboarding messages; the corresponding public key is the hotspot's network identity. We have not found a published Helium Foundation or Nova Labs statement on post-quantum cryptography for any Helium-specific surface, and no Helium Improvement Proposal currently addresses PQC.

## Proposed and Implemented PQC Algorithms

Helium does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Helium in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: ➖ ➖**

Helium has run no consensus of its own since the [HIP-70 migration to Solana](https://github.com/helium/HIP/blob/main/0070-scaling-helium.md) in April 2023. All block production, validator identity, and finality are Solana's; any consensus-layer migration is upstream rather than Helium-attributable. The legacy pre-2023 chain used HoneyBadgerBFT with secp256k1 validator keys, but that chain is frozen and no longer block-producing.

## 3. P2P Networking

**Grade: F ❌**

Helium's networking is two-layered. On-chain settlement transits Solana's QUIC/gossip mesh, which is upstream and not chain-attributable to Helium. The Helium-specific data plane runs over the public internet between hotspots, the [Helium Packet Router](https://docs.helium.com/) and Mobile network oracles, and between hotspots themselves for Proof of Coverage beacons and witnesses. Those flows rely on standard internet TLS plus application-layer signing with each hotspot's ECC P-256 identity provisioned in the [ATECC608-TNGHNT](https://ww1.microchip.com/downloads/aemDocuments/documents/SCBU/ProductDocuments/DataSheets/ECC608-Trust-and-GO-For-Helium-Network-Data-Sheet-DS40002389.pdf) secure element.

**Current state.** Hotspot-to-router and hotspot-to-hotspot links use TLS over the public internet with ECC P-256 application-layer signatures. We have not found a published Helium-attributable proposal for post-quantum key exchange or signing on these channels.

**Planned future work.** No published roadmap from the Helium Foundation or Nova Labs covers hybrid or post-quantum key exchange for Helium-specific transport. The factory-provisioned hardware identity in deployed hotspots sets a practical floor on options.

## 4. On-Chain Logic

**Grade: F ❌**

Helium's on-chain programs live in [helium/helium-program-library](https://github.com/helium/helium-program-library) on Solana, including Helium Entity Manager, Lazy Distributor, Data Credits, Treasury Management, the price oracle, the rewards oracle, the Mobile Entity Manager, and the voter stake registry. They are Anchor/Rust Solana programs that use Solana's standard signature primitives — Ed25519 for the transaction envelope, secp256k1 for ECDSA recovery, and Solana's `Secp256r1Program` precompile for P-256 verification used to bridge hotspot ATECC608 attestations onto Solana.

A Helium-built off-chain "ECC verifier service" validates ECC P-256 hotspot signatures and produces a Solana-side proof, as described in the [Solana case study on Helium](https://solana.com/news/case-study-helium-technical-guide). It was built because native P-256 verification was unavailable on Solana at migration time; with Solana's later addition of `Secp256r1Program` it has become a transitional bridge. It is an EC-bridging tool, not a post-quantum primitive, and does not contribute on-chain PQC verification.

**Current state.** Helium's Solana programs verify only EC signatures via the standard Solana precompiles. No post-quantum verification primitive has been added to any Helium-maintained program.

**Planned future work.** No Helium Improvement Proposal currently proposes adding post-quantum verification to Helium's Solana programs, and we have not found a Helium Foundation engagement in upstream Solana proposals such as the [Falcon syscall discussion (SIMD-0461)](https://github.com/solana-foundation/solana-improvement-documents/pull/461).

## 5. Other Features

### Proof of Coverage (IoT and Mobile)

**Current state.** Hotspots periodically [beacon and witness](https://docs.helium.com/iot/proof-of-coverage/) radio packets to prove they are physically present and providing coverage. IoT PoC uses LoRaWAN beacons; Mobile PoC uses CBRS / Wi-Fi coverage attestations. Each beacon and witness report is signed by the originating hotspot's ECC P-256 (secp256r1) private key held in the [Microchip ATECC608-TNGHNT](https://ww1.microchip.com/downloads/aemDocuments/documents/SCBU/ProductDocuments/DataSheets/ECC608-Trust-and-GO-For-Helium-Network-Data-Sheet-DS40002389.pdf) secure element. The chip generates and protects the key in hardware; the matching public key is pinned at manufacture and serves as the hotspot's network identity and the basis for its on-chain NFT mapping. Hotspot manufacturing tooling lives in [helium/gateway-mfr-rs](https://github.com/helium/gateway-mfr-rs).

Because the hotspot's signing key is bound to a specific factory-provisioned EC chip, a post-quantum replacement is a hardware migration rather than a software one. We have not found a published Helium Foundation discussion of post-quantum options for hotspot identity or of a hardware-replacement path for the deployed fleet.

**Planned future work.** No published Helium-attributable roadmap addresses post-quantum signing for Proof of Coverage beacons and witnesses.

### Location Assertion

**Current state.** A hotspot asserts its physical location on Solana with an assertion signed by the same hotspot ECC P-256 identity, gated by Data Credits. The crypto inherits the hotspot key and the Solana envelope; the location assertion adds no separate signature scheme.

**Planned future work.** No published Helium-attributable proposal addresses post-quantum signing for location assertions.

### Onboarding and Maker Attestation

**Current state.** Approved hotspot Makers attest device authenticity at factory provisioning; the ECC chip is loaded with a Helium-Network-specific P-256 key and the Maker registers the public key with the network. Provisioning tooling lives in [helium/gateway-mfr-rs](https://github.com/helium/gateway-mfr-rs); the [Solana case study](https://solana.com/news/case-study-helium-technical-guide) describes factory pre-signing and QR-code onboarding flows. Maker-side signing uses ECDSA / Ed25519 on the Solana side.

**Planned future work.** No published Helium-attributable proposal addresses post-quantum signing for Maker onboarding or factory attestation.

### Oracle and Lazy Distributor Reward Attestation

**Current state.** Off-chain Proof of Coverage oracles compute per-hotspot rewards from beacon and witness data and sign Solana transactions that set current rewards on the [Lazy Distributor program](https://github.com/helium/helium-program-library). Oracle signing uses Solana Ed25519; the underlying witness data is signed with the hotspot's ECC P-256 key. The entire trust chain from device to oracle to Solana settlement is EC-based.

**Planned future work.** No published Helium-attributable proposal addresses post-quantum signing for oracle reward attestation.

### Helium Wallet

**Current state.** The Helium wallet uses the Solana-standard BIP-39 mnemonic to Ed25519 keypair derivation. No post-quantum option is offered.

**Planned future work.** No published Helium-attributable wallet roadmap addresses post-quantum signing.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Helium's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ➖, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Helium in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Helium's protocol changes flow through [Helium Improvement Proposals](https://github.com/helium/HIP) (HIPs) in the `helium/HIP` repository. Binding decisions are made by on-chain Realms (SPL-Governance) votes using veHNT, with per-subDAO veIOT and veMOBILE votes for the IoT and Mobile subnetworks established under the [HIP-51](https://github.com/helium/HIP) subDAO architecture. HIP editors merge well-formed proposals; the Helium Foundation stewards the protocol and Nova Labs is a major implementer and SubDAO operator.

Relevant landmarks on the public record:

- [HIP-70 — Scaling the Helium Network](https://github.com/helium/HIP/blob/main/0070-scaling-helium.md) — migration to Solana, executed April 2023; ended the native Helium L1.
- [HIP-138 — Return of HNT](https://github.com/helium/HIP/blob/main/0138-return-of-hnt.md) — January 2025 governance change returning HNT as the primary reward token across IoT and Mobile.

No Helium Improvement Proposal currently identified in the `helium/HIP` repository addresses post-quantum cryptography for any Helium component — transaction signing, Solana programs, Proof of Coverage, hotspot identity, oracles, onboarding, or Maker hardware. The two cryptographic HIPs on file (HIP-29 on multi-sig and HIP-30 on BLS12-381 threshold cryptography) predate the Solana migration and target the legacy chain rather than post-quantum primitives.

---

_Generated on 14 May 2026 based on information as of 14 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
