# Cardano (ADA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Cardano |
| **Ticker** | ADA |
| **Website** | <https://cardano.org> |
| **GitHub** | <https://github.com/cardano-foundation> |
| **Twitter / X** | <https://x.com/Cardano> |
| **On-chain environment** | Plutus (Haskell-based) |
| **Mainnet genesis** | 2017-09-29 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | C | 🗺️ | Roadmapped |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | D | ⚠️ | Discussed |

Cardano's PQC posture is research-led, with a meaningful upgrade in May 2026. [IOG (Input Output Global)](https://iohk.io/en/blog/posts/2018/02/01/research-program-to-work-on-hardening-cardano-against-quantum-computers/) has maintained a PQ research program since February 2018 and in February 2026 announced the [Nightstream initiative](https://www.coinreporter.io/2026/02/ada-price-in-focus-as-cardano-expands-interoperability-and-post-quantum-push/) — a lattice-based cryptography collaboration with Google and Microsoft Research. At the Consensus Miami keynote on May 16, 2026, post-quantum security was named one of three Cardano strategic pillars for 2026, with five CIPs advancing toward implementation readiness and an alignment with FIPS 203-206 (ML-KEM, ML-DSA, SLH-DSA). No PQC algorithm libraries have yet landed in the cardano-node source code, but the project has moved from passive research to an active roadmap commitment.

Active proposal work sits in the [Cardano Improvement Proposals (CIPs)](https://github.com/cardano-foundation/CIPs) repository. [CIP #1144 (CPS-0027)](https://github.com/cardano-foundation/CIPs/pull/1144) surveys post-quantum signature approaches — naming **SPHINCS+**, **Dilithium**, and **Falcon** as candidates — without committing to one; it was opened 2026-01-29 and is in editor approval as of late April 2026. [CIP #1175 (CPS-0030)](https://github.com/cardano-foundation/CIPs/pull/1175) proposes a quantum-secure settlement layer and was introduced at the 2026-04-28 CIP meeting, with active follow-up discussion on BIP32 / hash-based key upgrade paths into May 2026. [CIP #1167](https://github.com/cardano-foundation/CIPs/pull/1167) refines Leios with quantum considerations.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **SLH-DSA** (SPHINCS+) | Ed25519 | Tx Signatures, On-Chain | Discussed (CIP #1144 survey) |
| **ML-DSA** (Dilithium) | Ed25519 | Tx Signatures, On-Chain | Discussed (CIP #1144 survey) |
| **Falcon / FN-DSA** | Ed25519 | Tx Signatures, On-Chain | Discussed (CIP #1144 survey) |
| Lattice-based scheme (Nightstream, unspecified) | Ed25519 / VRF / KES | Tx Signatures, Consensus | Discussed (IOG / Google / Microsoft Research collaboration) |

## Transaction Signatures

**Grade: C 🗺️**

Cardano's user transaction signatures use [Ed25519](https://developers.cardano.org/docs/operate-a-stake-pool/cardano-key-pairs/) (EdDSA on Curve25519) — vulnerable to Shor's algorithm in the same way as ECDSA. Payment keys, stake keys, governance (DRep) keys, and HD wallets all derive from Ed25519. The [Valentine hard fork (2023)](https://docs.cardano.org/about-cardano/evolution/upgrades/valentine) added SECP curve verification for cross-chain interoperability, and [Plutus V3 (2024)](https://iohk.io/en/blog/posts/2024/02/12/unlocking-more-opportunities-with-plutusv3/) added BLS primitives for zero-knowledge rollups — neither change introduces quantum resistance to transaction signatures.

At the Consensus Miami keynote on May 16, 2026, post-quantum security was announced as one of three Cardano strategic pillars, with CIPs advancing to implementation readiness and an alignment with FIPS 203-206 (ML-KEM, ML-DSA, SLH-DSA standards). The [Nightstream initiative](https://www.coinreporter.io/2026/02/ada-price-in-focus-as-cardano-expands-interoperability-and-post-quantum-push/) — an IOG collaboration with Google and Microsoft Research on lattice-based cryptography — is named as the primary research effort underpinning this roadmap. [CIP #1175 (CPS-0030)](https://github.com/cardano-foundation/CIPs/pull/1175) proposes architectural changes for a quantum-secure settlement layer, with active discussion on BIP32 / hash-based key derivation paths and the limitations of pre-image reveal approaches for non-BIP32 keys.

**Current state.** Mainnet transactions are exclusively Ed25519. No post-quantum scheme has been merged into cardano-node.

**Planned future work.** [CIP #1144](https://github.com/cardano-foundation/CIPs/pull/1144) and [CIP #1175](https://github.com/cardano-foundation/CIPs/pull/1175) are advancing through the CIP process. The Vision 2026 commitment names lattice-based (LWE) approaches aligned with FIPS 203-206 as the direction, with implementation-stage CIPs in progress. No hard fork date has been announced. Sources: [Cryptonews](https://cryptonews.net/news/altcoins/32874262/), [Crowdfund Insider](https://www.crowdfundinsider.com/2026/05/278955-cardano-founder-charles-hoskinson-highlights-quantum-computing-risks-and-potential-blockchain-network-defenses/).

## Consensus

**Grade: D ⚠️**

Cardano runs [Ouroboros Praos](https://docs.cardano.org/about-cardano/learn/ouroboros-overview), a peer-reviewed proof-of-stake protocol with two cryptographic components of interest. The **Verifiable Random Function** (VRF) elects slot leaders privately; Cardano's implementation is elliptic-curve-based. **Key Evolving Signatures** (KES, specifically Sum6KES at depth 6) provide forward-secure validator signing — a compromise of a hot key at period T cannot forge blocks from earlier periods. KES's underlying Merkle-signature construction is hash-based and theoretically compatible with a quantum-resistant variant, but Cardano's current KES-Sum6 uses an EC-based foundation rather than a pure hash-based scheme.

**Current state.** Mainnet consensus uses an EC-based VRF and Sum6KES. The KES architecture offers a migration pathway to a hash-based primitive, but that replacement has not been implemented.

**Planned future work.** The [CIP #1167](https://github.com/cardano-foundation/CIPs/pull/1167) discussion refines Leios with quantum considerations, and IOG's Nightstream research umbrella covers consensus primitives. No cardano-node consensus PR has been opened for a post-quantum upgrade.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Cardano in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: D ⚠️**

[Plutus V3 (2024)](https://iohk.io/en/blog/posts/2024/02/12/unlocking-more-opportunities-with-plutusv3/) exposes Ed25519 verification, SHA-256 / SHA3 / BLAKE2b / Keccak-256 hashing, and — through the Valentine and Plutus V3 upgrades — ECDSA / Schnorr over secp256k1 and BLS signatures for ZK rollups. None are quantum-resistant, and there is no native verification primitive for post-quantum signature schemes in [Plutus](https://docs.cardano.org/developer-resources/smart-contracts/plutus) today.

**Current state.** No post-quantum verification primitive is available in Plutus. Cost is the primary constraint cited in [Plutus V3 material](https://iohk.io/en/blog/posts/2024/02/12/unlocking-more-opportunities-with-plutusv3/): hash-based and lattice-based signatures carry larger proof sizes and higher verification cost than EC signatures.

**Planned future work.** [CIP #1144](https://github.com/cardano-foundation/CIPs/pull/1144) is the active venue for algorithm selection. No Plutus precompile PR has been opened. As CIP-level algorithm choices are made, Plutus builtins would follow.

## Other Features

### Mithril (Light-client protocol)

**Current state.** [Mithril](https://docs.cardano.org/developer-resources/scalability-solutions/mithril) is a stake-based threshold multi-signature scheme that compresses many validator signatures into a single compact proof, enabling mobile wallets, light clients, and Layer 2 components to verify Cardano state without full-node sync. The [2025–2026 evolution](https://updates.cardano.intersectmbo.org/2026-03-25-mithril/) is integrating SNARK proofs (Halo2 circuit implementation, ALBA proof system under investigation) for further compression. Both the current multi-sig scheme and the pairing-based SNARK aggregation in development are elliptic-curve-based.

**Planned future work.** SNARK aggregation work continues; no post-quantum aggregation alternative (hash-based accumulators or lattice-based schemes) is on the published roadmap.

### Midnight (Privacy sidechain)

**Current state.** [Midnight](https://midnight.network/) launched mainnet in March 2026 as a sidechain providing confidential smart contracts via ZK-SNARKs over EC pairings. A quantum break of the underlying SNARK system would retroactively deanonymize the historical shielded ledger.

**Planned future work.** No published migration path from SNARK-based privacy to a post-quantum alternative.

### Hydra (Layer 2 state channels)

**Current state.** [Hydra](https://docs.cardano.org/developer-resources/scalability-solutions/hydra) provides isomorphic state channels with cryptographic proofs of correct state evolution, formally verified in the Universal Composability framework. Its cryptographic primitives match the on-chain Plutus stack — Ed25519, SECP, BLS — and inherit those quantum exposures.

**Planned future work.** Hydra's post-quantum posture tracks Plutus and the consensus layer. No Hydra-specific post-quantum proposal has been published.

## EC Sunset

**Grade: D ⚠️**

Adding PQC alongside EC is not the same as retiring EC. For reference, Cardano's PQC-adoption ratings per category are: Tx Signatures 🗺️, Consensus ⚠️, P2P ❌, On-Chain ⚠️, Other ⚠️.

Cardano has no published plan to retire elliptic-curve cryptography from any layer. Public material from IOG describes a phased, research-driven approach: long-term hardening informed by the [Nightstream initiative](https://www.coinreporter.io/2026/02/ada-price-in-focus-as-cardano-expands-interoperability-and-post-quantum-push/) and the [IOG PQ research program](https://iohk.io/en/blog/posts/2018/02/01/research-program-to-work-on-hardening-cardano-against-quantum-computers/), with potential near-term ledger checkpointing via Mithril and Midnight. The Vision 2026 announcement (May 16, 2026) elevates PQ security to a formal strategic pillar with CIPs advancing toward implementation, which moves the discussion from passive research toward an active roadmap — but no EC retirement commitment or timeline has been stated.

**Current state.** No EC retirement scheduled or announced.

**Planned future work.** Direction described in public material is phased PQ adoption alongside EC. The Vision 2026 commitment covers adoption of new PQC primitives; no retirement schedule for Ed25519, SECP, or BLS has been published.

## Governance

Cardano protocol changes flow through the [Cardano Improvement Proposals (CIPs)](https://github.com/cardano-foundation/CIPs) process, administered by the Cardano Foundation with implementation work led by IOG and Intersect. CIPs progress through editor review and CIP meetings before being merged; protocol-affecting changes also require coordination through Intersect-led upgrade processes.

Active PQ-relevant CIPs:

- [CIP #1144 (CPS-0027)](https://github.com/cardano-foundation/CIPs/pull/1144) — "Approaches to Post-Quantum Signatures." Status: Open (filed 2026-01-29), in editor approval / fixups as of 2026-04-29. Surveys candidate schemes without committing to one.
- [CIP #1175 (CPS-0030)](https://github.com/cardano-foundation/CIPs/pull/1175) — "Quantum secure Cardano settlement layer." Status: Open (filed 2026-04-02), introduced at the 2026-04-28 CIP meeting with active follow-up on BIP32 / hash-based key upgrade paths into May 2026.
- [CIP #1167](https://github.com/cardano-foundation/CIPs/pull/1167) — Leios refinement with quantum considerations. Status: Open (filed 2026-03-25).
- [CIP-441 draft](https://github.com/cardano-foundation/CIPs/pull/441) — earlier post-quantum signatures draft. Status: Draft.

Research collaborations:

- [IOG PQ research program](https://iohk.io/en/blog/posts/2018/02/01/research-program-to-work-on-hardening-cardano-against-quantum-computers/) — ongoing since February 2018.
- [Nightstream initiative](https://www.coinreporter.io/2026/02/ada-price-in-focus-as-cardano-expands-interoperability-and-post-quantum-push/) — IOG / Google / Microsoft Research / Linux Foundation lattice-cryptography collaboration, announced February 2026.

No fork has been scheduled or signaled for any cardano-node post-quantum change.

---

_Generated on 03 Jun 2026 based on information as of 18 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
