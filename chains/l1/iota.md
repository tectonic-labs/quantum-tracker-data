# IOTA (IOTA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | IOTA |
| **Ticker** | IOTA |
| **On-chain environment** | Move VM |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

IOTA has undergone significant architectural evolution. The original Tangle used Winternitz one-time signatures (hash-based, post-quantum-secure), but [Chrysalis (2021)](https://www.mdpi.com/1424-8220/25/11/3408) replaced this with Ed25519. The current production chain — [IOTA Rebased](https://blog.iota.org/iota-rebased-technical-view/) (mainnet May 2025) — is derived from Sui's Move VM and [Mysticeti BFT consensus](https://docs.iota.org/about-iota/iota-architecture/consensus), with [Ed25519 throughout](https://docs.iota.org/developer/cryptography/transaction-auth/signatures).

The most concrete PQC work is in the [IOTA Identity library](https://docs.iota.org/developer/iota-identity/how-tos/post-quantum), which since October 2025 supports hybrid post-quantum DID signatures using **ML-DSA**, **Falcon**, **SLH-DSA**, and **LMS/HSS**. This is a framework that runs alongside the chain for decentralized identity and verifiable credentials, not a protocol-level primitive. IOTA's long-term roadmap references post-quantum transaction signing but without a specific scheme commitment or implementation timeline.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** (FIPS 204) | Ed25519 | Other (IOTA Identity) | Discussed |
| **Falcon** (512/1024) | Ed25519 | Other (IOTA Identity) | Discussed |
| **SLH-DSA** (FIPS 205) | Ed25519 | Other (IOTA Identity) | Discussed |
| **LMS / HSS** | Ed25519 | Other (IOTA Identity) | Discussed |

## 1. Transaction Signatures

**Grade: D ⚠️**

IOTA Rebased uses pure [Ed25519 for transaction signing](https://docs.iota.org/developer/cryptography/transaction-auth/signatures), inherited from its Sui-derived architecture. IOTA's long-term roadmap references CRYSTALS-Dilithium and Falcon as future candidates for post-quantum transaction signing, but no implementation timeline, fork window, or specific scheme commitment has been published.

**Current state.** All transaction signing is Ed25519 (elliptic-curve, quantum-vulnerable).

**Planned future work.** Post-quantum transaction signing is mentioned in roadmap communications but without concrete details.

## 2. Consensus

**Grade: F ❌**

IOTA uses [Mysticeti BFT consensus](https://docs.iota.org/about-iota/iota-architecture/consensus) (Sui-derived), an uncertified DAG-based protocol with sub-second finality targets. Validator block-signing keys are Ed25519.

**Current state.** Ed25519 for all consensus signing. No post-quantum alternative has been proposed.

**Planned future work.** None documented.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for IOTA in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

IOTA's Move VM (Sui-derived) exposes Ed25519, ECDSA secp256k1, and BLS12-381 verification through standard Move stdlib and Sui crypto modules. No post-quantum verification primitive is available on-chain.

**Current state.** On-chain signature verification is EC-only. No PQC verification modules exist.

**Planned future work.** None documented.

## 5. Other Features

**Grade: D ⚠️**

### IOTA Identity (Hybrid Post-Quantum DID Signatures)

The [IOTA Identity library](https://docs.iota.org/developer/iota-identity/how-tos/post-quantum) — a decentralized identity and verifiable credential framework built on top of IOTA — supports hybrid post-quantum DID signatures since October 2025:

- **ML-DSA** (FIPS 204) at three security levels
- **Falcon** at 512 and 1024 bits
- **SLH-DSA** (FIPS 205) and **LMS / HSS** at 128 / 192 / 256 bits
- Hybrid mode: ECDSA + PQC, so identity assertions remain valid under classical or quantum adversary

The **LMS/HSS** support is particularly relevant for IoT scenarios, where stateful hash-based signatures are a lower-risk choice for long-lived devices.

**Current state.** The Identity library provides post-quantum DID capabilities running alongside the IOTA chain. This does not change the chain's transaction-signature or consensus posture — protocol-level features remain EC-based.

**Planned future work.** The Identity library is expected to expand. Chain protocol PQC migration depends on the IOTA Foundation's broader roadmap, currently undated.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ❌, P2P ❌, On-Chain ❌, Other ⚠️.

No EC retirement plan has been published. The [Rebased migration](https://blog.iota.org/iota-rebased-fast-forward/) in May 2025 added EC dependencies (full Sui crypto stack) rather than removing them. The historical Winternitz OTS-based addresses from the original Tangle are no longer the primary transaction-signing path.

**Current state.** Ed25519 is embedded in every protocol layer. No EC deprecation schedule exists.

**Planned future work.** None documented.

## Governance

IOTA governance operates through the IOTA Foundation, which controls the protocol development roadmap. The Rebased architecture introduces DPoS with validator participation, but formal governance processes for protocol upgrades have not been publicly specified in detail.

No PQC-specific governance proposals have been filed. Post-quantum references appear in foundation-level roadmap communications rather than formal governance actions.

---

_Generated on 07 May 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
