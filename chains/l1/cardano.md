# Cardano (ADA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Cardano |
| **Ticker** | ADA |
| **Website** | <https://cardano.org> |
| **GitHub** | <https://github.com/cardano-foundation> |
| **On-chain environment** | Plutus (Haskell-based) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Cardano's PQC posture is research-led without code-level integration. [IOG (Input Output Global)](https://iohk.io/en/blog/posts/2018/02/01/research-program-to-work-on-hardening-cardano-against-quantum-computers/) has run a PQ research program since February 2018 and announced the [Nightstream initiative](https://www.coinreporter.io/2026/02/ada-price-in-focus-as-cardano-expands-interoperability-and-post-quantum-push/) in February 2026, a lattice-based cryptography collaboration with Google and Microsoft Research. As of the most recent recon scan, no PQC algorithm libraries have landed in the cardano-node source code.

The active proposal work sits in the [Cardano Improvement Proposals (CIPs)](https://github.com/cardano-foundation/CIPs) repository. [CIP #1144 (CPS-0027)](https://github.com/cardano-foundation/CIPs/pull/1144) surveys post-quantum signature approaches — naming **SPHINCS+**, **Dilithium**, and **Falcon** as candidates — without committing to one; it was opened 2026-01-29 and is in editor approval / fixups. [CIP #1175 (CPS-0030)](https://github.com/cardano-foundation/CIPs/pull/1175) proposes a quantum-secure settlement layer at the architectural level; it was introduced as an agenda item at the 2026-04-28 CIP meeting with active follow-up on BIP32 / hash-based key upgrade paths. [CIP #1167](https://github.com/cardano-foundation/CIPs/pull/1167) refines Leios with quantum considerations from BuidlerFest discussions.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **SLH-DSA** (SPHINCS+) | Ed25519 | Tx Signatures, On-Chain | Discussed (CIP #1144 survey) |
| **ML-DSA** (Dilithium) | Ed25519 | Tx Signatures, On-Chain | Discussed (CIP #1144 survey) |
| **Falcon / FN-DSA** | Ed25519 | Tx Signatures, On-Chain | Discussed (CIP #1144 survey) |
| Lattice-based scheme (Nightstream, unspecified) | Ed25519 / VRF / KES | Tx Signatures, Consensus | Discussed (IOG / Google / Microsoft research collaboration) |

## 1. Transaction Signatures

**Grade: F ❌**

Cardano's user transaction signatures use [Ed25519](https://developers.cardano.org/docs/operate-a-stake-pool/cardano-key-pairs/) (EdDSA on Curve25519) — broken by Shor's algorithm in the same way as ECDSA. Payment keys, stake keys, governance (DRep) keys, and HD wallets all derive from Ed25519. The [Valentine hard fork (2023)](https://docs.cardano.org/about-cardano/evolution/upgrades/valentine) added SECP curve verification (ECDSA and Schnorr over secp256k1) for interoperability, and Plutus V3 (2024) added BLS primitives — both EC-based, neither quantum-resistant. No PQ replacement for Ed25519 has been merged into cardano-node.

The [CIP #1144 survey](https://github.com/cardano-foundation/CIPs/pull/1144) catalogs the candidate PQ schemes (**SPHINCS+**, **Dilithium**, **Falcon**) but does not select one. CIP #1175 raises BIP32 / hash-based key derivation upgrade paths as an architectural question. Both remain in CIP discussion; neither has produced cardano-node code.

**Current state.** Mainnet transactions are exclusively Ed25519. No PQ scheme is implemented or merged.

**Planned future work.** [CIP #1144](https://github.com/cardano-foundation/CIPs/pull/1144) and [CIP #1175](https://github.com/cardano-foundation/CIPs/pull/1175) are in CIP-process discussion. IOG's Nightstream lattice-cryptography research is at the research-collaboration stage, not yet a deployment plan.

## 2. Consensus

**Grade: D ⚠️**

Cardano runs [Ouroboros Praos](https://docs.cardano.org/about-cardano/learn/ouroboros-overview), a peer-reviewed proof-of-stake protocol with two cryptographic components of interest. The **Verifiable Random Function** (VRF) elects slot leaders privately so attackers cannot DDoS predictable proposers; the implementation (PraosVRF) is EC-based. **Key Evolving Signatures** (KES, specifically Sum6KES at depth 6) provide forward-secure validator signing — a compromise of a hot key at period T cannot forge blocks from earlier periods. KES is theoretically interesting because the underlying Merkle-signature construction is hash-based and quantum-resistant, but Cardano's current KES-Sum6 implementation derives keys over an EC foundation rather than from a pure hash-based scheme.

A PQ-native KES (e.g., Sum6KES over a hash-based primitive like SPHINCS+ or XMSS) would preserve forward security while removing the EC dependency. The [CIP #1167](https://github.com/cardano-foundation/CIPs/pull/1167) thread refines [Leios](https://updates.cardano.intersectmbo.org/) with quantum considerations, and IOG's Nightstream lattice work is the broader research umbrella, but no cardano-node consensus PR has been opened.

**Current state.** Mainnet consensus uses EC-based VRF and Sum6KES. KES provides forward-security mitigation but not PQ resistance.

**Planned future work.** Architectural CIP discussion (#1167, #1175) and IOG / Nightstream research. No code-level consensus PR opened.

## 3. P2P Networking

**Grade: F ❌**

Cardano uses a [custom P2P stack](https://docs.cardano.org/about-cardano/explore-more/cardano-network/p2p-networking) (not libp2p) with TCP-based multiplexing, an Outbound Governor for peer connection initiation, and an Inbound Protocol Governor for inbound mini-protocols. Peers progress through Cold / Warm / Hot states. Transport is standard TCP/IP with no PQC-specific encryption documented; node-identity and peer-authentication mechanisms are not detailed in publicly available material. The 2024 transition from fixed-topology relays to dynamic P2P (SanchoNet era) improved decentralization but did not change cryptographic primitives.

**Current state.** Standard TCP transport; no documented PQ alternative.

**Planned future work.** No specification, working-group thread, or release describes a PQ transport plan for Cardano's P2P layer.

## 4. On-Chain Logic

**Grade: D ⚠️**

[Plutus](https://docs.cardano.org/developer-resources/smart-contracts/plutus) (V3, 2024) exposes Ed25519 verification, SHA-256 / SHA3 / BLAKE2b / Keccak-256 hashing, and — through the Valentine and PlutusV3 upgrades — ECDSA / Schnorr over secp256k1 and BLS (Boneh-Lynn-Shacham) signatures for ZK rollups. None are quantum-resistant. There is no native verification primitive for **SPHINCS+**, **Dilithium**, or **Falcon** in Plutus.

The constraint cited in [PlutusV3 material](https://iohk.io/en/blog/posts/2024/02/12/unlocking-more-opportunities-with-plutusv3/) is cost: hash-based signatures (SPHINCS+) and lattice signatures (Dilithium) carry larger proof sizes and verification cost than EC signatures, making them expensive for general on-chain verification. The CIP #1144 survey is the active venue where algorithm selection is being discussed.

**Current state.** No PQ verification primitive in Plutus.

**Planned future work.** [CIP #1144](https://github.com/cardano-foundation/CIPs/pull/1144) (algorithm survey) is the active venue. No Plutus precompile PR has been opened.

## 5. Other Features

### Mithril (light-client protocol)

**Current state.** [Mithril](https://docs.cardano.org/developer-resources/scalability-solutions/mithril) is a stake-based threshold multi-signature scheme that aggregates many validator signatures into a single compact proof, used by mobile wallets, light clients, and Layer 2 components to verify Cardano state without full-node sync. The [2025–2026 evolution](https://updates.cardano.intersectmbo.org/2026-03-25-mithril/) is integrating SNARK proofs (Halo2 circuit implementation, ALBA proof system under investigation) for further compression. Both the current multi-sig scheme and pairing-based SNARK aggregation are EC-based.

**Planned future work.** SNARK aggregation work continues; PQ-friendly aggregation (hash-based accumulators or lattice-based schemes) is not yet on the published roadmap.

### Midnight (privacy sidechain)

**Current state.** [Midnight](https://midnight.network/) launched mainnet in March 2026 as a sidechain providing confidential smart contracts via ZK-SNARKs over EC pairings. A quantum break of the underlying SNARK system would retroactively deanonymize the historical shielded ledger. The architectural alternative — STARK-based (hash-based) privacy — has not been adopted.

**Planned future work.** No published migration path from SNARK-based privacy to a PQ alternative.

### Hydra (Layer 2 state channels)

**Current state.** [Hydra](https://docs.cardano.org/developer-resources/scalability-solutions/hydra) provides isomorphic state channels with cryptographic proofs of correct state evolution, formally verified in the Universal Composability framework. It supports Plutus contracts and native assets in off-chain heads. Its cryptographic primitives match the on-chain Plutus stack — Ed25519, SECP, BLS — and inherit those quantum exposures.

**Planned future work.** Hydra's PQ posture tracks Plutus and the consensus layer; no Hydra-specific PQ proposal is published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Cardano's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ⚠️, P2P ❌, On-Chain ⚠️, Other ⚠️.

Cardano has no published plan to retire elliptic-curve cryptography from any layer. Public material from IOG describes a phased, research-driven approach: long-term hardening informed by Nightstream and the IOG PQ research program, with potential near-term checkpointing of ledger history through Mithril and Midnight. Public commentary from [Charles Hoskinson](https://decrypt.co/353161/cardano-hoskinson-warns-crypto-becoming-post-quantum-require-trade-offs) cites a roughly 10× performance / size cost as a concern and references the [DARPA Quantum Benchmarking Initiative](https://finance.yahoo.com/news/cardano-founder-says-crypto-quantum-threat-200255327.html) (targeting 2033) as a calibration point.

**Current state.** No EC retirement scheduled.

**Planned future work.** None published. Direction described in public material is phased PQ adoption alongside EC, not EC retirement.

## Governance

Cardano protocol changes flow through the [Cardano Improvement Proposals (CIPs)](https://github.com/cardano-foundation/CIPs) process administered by the Cardano Foundation, with implementation work led by IOG and Intersect. CIPs progress through editor review and CIP meetings before being merged; protocol-affecting changes also require coordination through Intersect-led upgrade processes.

Active PQ-relevant CIPs in the repository:

- [CIP #1144 (CPS-0027)](https://github.com/cardano-foundation/CIPs/pull/1144) — "Approaches to Post-Quantum Signatures." Status: Open (filed 2026-01-29), in editor approval / fixups round 2026-04-29. Surveys candidate schemes without committing to one.
- [CIP #1175 (CPS-0030)](https://github.com/cardano-foundation/CIPs/pull/1175) — "Quantum secure Cardano settlement layer." Status: Open (filed 2026-04-02), introduced at the 2026-04-28 CIP meeting with active follow-up on BIP32 / hash-based key upgrade paths.
- [CIP #1167](https://github.com/cardano-foundation/CIPs/pull/1167) — Leios refinement with quantum considerations. Status: Open (filed 2026-03-25).
- [CIP-441 draft](https://github.com/cardano-foundation/CIPs/pull/441) — earlier post-quantum signatures draft. Status: Draft.

Research collaborations:

- [IOG PQ research program](https://iohk.io/en/blog/posts/2018/02/01/research-program-to-work-on-hardening-cardano-against-quantum-computers/) — ongoing since February 2018.
- [Nightstream initiative](https://www.coinreporter.io/2026/02/ada-price-in-focus-as-cardano-expands-interoperability-and-post-quantum-push/) — IOG / Google / Microsoft Research / Linux Foundation lattice-cryptography collaboration announced February 2026.

No fork has been scheduled or signaled for any cardano-node PQ change.

---

_Generated on 5 May 2026 based on information as of 1 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
