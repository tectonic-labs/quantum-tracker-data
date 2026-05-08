# Bittensor (TAO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Bittensor |
| **Ticker** | TAO |
| **Website** | https://bittensor.com |
| **GitHub** | https://github.com/opentensor |
| **Twitter / X** | https://x.com/bittensor |
| **Parent chain** | Polkadot (Substrate-derived) |
| **On-chain environment** | WASM (Substrate) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | B | 🔧 | In Development |
| EC Sunset | F | ❌ | Not Discussed |

Bittensor is a Substrate-based PoS network focused on decentralized AI/ML, inheriting its [cryptographic primitives](https://wiki.polkadot.network/docs/learn-cryptography) from the Polkadot/Substrate ecosystem. All transaction signatures (Sr25519, Ed25519, ECDSA secp256k1), consensus block signing (Sr25519), and P2P networking (libp2p Noise with Curve25519) are elliptic-curve based with no post-quantum migration plan.

The notable exception is Bittensor's MEV shield pallet, which uses **ML-KEM-768** (FIPS 203) for post-quantum key encapsulation in production. This protects shielded transaction content against quantum adversaries but does not address transaction authentication, consensus, or networking — all of which remain EC-dependent.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-KEM-768** (FIPS 203) | ECDH | Other (MEV shield) | Implemented |

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Bittensor in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Bittensor in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Bittensor in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Bittensor's [WASM runtime](https://docs.substrate.io/fundamentals/architecture/) provides an [Ed25519 verification precompile](https://docs.learnbittensor.org/evm-tutorials/ed25519-verify-precompile) exposed to EVM contracts, along with hash functions (Blake2, SHA2-256, Keccak-256) that are quantum-resistant. Sr25519 verification exists in Substrate pallets but is not directly EVM-exposed. No post-quantum signature verification primitives are available on-chain.

**Current state.** On-chain signature verification is limited to EC-based schemes (Ed25519 via precompile, Sr25519 via pallets). Hash functions are quantum-safe.

**Planned future work.** None documented.

## 5. Other Features

**Grade: B 🔧**

### MEV Shield Pallet

The MEV shield pallet uses **ML-KEM-768** (FIPS 203, CRYSTALS-Kyber) for post-quantum key encapsulation combined with XChaCha20Poly1305 for symmetric encryption. Block producers hold the decapsulation key, and transaction submitters encapsulate their transactions under it to prevent MEV extraction. This is merged into [subtensor mainline](https://github.com/opentensor/bittensor) and represents one of the few production deployments of PQC key encapsulation in any blockchain.

**Current state.** MEV-shielded transaction content is quantum-safe via **ML-KEM-768**. Transaction authentication (Sr25519 signatures) remains EC-based.

**Planned future work.** No additional PQC features beyond the existing MEV shield implementation have been announced.

### AI/ML Validator Commitments

Bittensor's core innovation involves decentralized AI where subnet validators evaluate miner outputs and sign commitment proofs. These commitments use Sr25519 signatures and are EC-based.

**Current state.** Validator commitment signing uses Sr25519. No PQC alternative exists.

**Planned future work.** None documented.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other 🔧.

No public plans exist to deprecate elliptic-curve cryptography in Bittensor. Any EC-to-PQC transition would likely cascade from Substrate/Polkadot core rather than originating as a Bittensor-specific decision.

**Current state.** EC cryptography is embedded in every protocol layer except MEV shield key encapsulation. No category has a published EC retirement plan.

**Planned future work.** None documented.

## Governance

Bittensor uses on-chain governance via [Senates](https://docs.bittensor.com/) (DAO voting), with subnet-level governance delegated to individual subnets. Bittensor Enhancement Proposals (BEPs) are the mechanism for protocol changes.

No PQC-related proposals or BEPs have been filed. No formal community discourse on PQC migration has been documented.

---

_Generated on 07 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
