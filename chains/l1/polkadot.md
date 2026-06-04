# Polkadot (DOT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Polkadot |
| **Ticker** | DOT |
| **Website** | https://polkadot.com |
| **GitHub** | https://github.com/paritytech |
| **Twitter / X** | https://x.com/polkadot |
| **On-chain environment** | Substrate WASM runtime (ink! smart contracts); EVM available via parachains |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Polkadot is a nominated proof-of-stake relay chain that provides shared security and interoperability to a network of specialized parachains. It uses a hybrid consensus model combining BABE (block production via VRF over Sr25519) and GRANDPA (finality via Byzantine fault-tolerant voting), with BEEFY sitting on top for efficient light-client proofs used in bridges. The runtime is compiled to WebAssembly and stored on-chain, enabling forkless upgrades through Polkadot's OpenGov governance system. User transaction signing supports Sr25519, Ed25519, and ECDSA secp256k1 — all elliptic-curve schemes.

The Web3 Foundation has funded experimental PQC research as grant projects — notably the QuantumGuard MVP (a parachain proof-of-concept using CRYSTALS-Kyber and CRYSTALS-Dilithium) and a pqc-gateway bridge proof-of-concept — but neither project is integrated into the relay chain or Substrate core. No official roadmap for PQC migration in the main relay chain or Substrate framework has been published as of April 2026.

## Proposed and Implemented PQC Algorithms

> Polkadot does not currently propose or implement any post-quantum cryptographic algorithms in its relay chain or Substrate core.

## Transaction Signatures

**Grade: F ❌**

Polkadot accounts can sign transactions with any of three schemes: Sr25519 (Schnorr over Ristretto25519), Ed25519, or ECDSA secp256k1. Sr25519 is the recommended and most widely used scheme for Substrate wallets and key derivation; Ed25519 and ECDSA secp256k1 are supported for interoperability. All three are elliptic-curve constructions that are broken by Shor's algorithm running on a sufficiently powerful quantum computer.

**Current state.** All user-facing transaction signing is EC-based across all three supported schemes. No PQC account type exists in the Substrate SDK.

**Planned future work.** No concrete post-quantum proposal for transaction signatures has been identified in the polkadot-sdk repository or in public protocol discussions.

## Consensus

**Grade: F ❌**

Polkadot's consensus layer has two components. BABE handles block production using slot-based assignments derived from a Verifiable Random Function (VRF) over Sr25519 keys — validators generate a VRF output with their Sr25519 private key each slot, and if it falls below the threshold they produce a block. GRANDPA provides Byzantine fault-tolerant finality: once ⅔+ of validators attest to a chain, those blocks are irreversibly finalized. GRANDPA currently uses Sr25519 for vote signing, with a planned upgrade to BLS (Boneh-Lynn-Shacham) signatures for more efficient aggregation. BLS is also elliptic-curve based (pairings over elliptic curves) and would not improve quantum resistance. Both BABE and GRANDPA are quantum-vulnerable.

**Current state.** BABE uses Sr25519 VRF. GRANDPA uses Sr25519, with BLS aggregation planned. No PQC alternative has been proposed for either component.

**Planned future work.** The GRANDPA-to-BLS upgrade is on the roadmap for scalability but does not address quantum resistance. No concrete post-quantum proposal for BABE or GRANDPA has been identified.

## P2P Networking

**Grade: F ❌**

Polkadot nodes communicate via libp2p with the Noise protocol (XX handshake pattern). Each node's PeerId is derived from an Ed25519 or secp256k1 public key. The Noise XX handshake authenticates both peers using their static identity keys and derives a shared session secret via ephemeral ECDH over Curve25519. The symmetric encryption that follows (AES-256-GCM or ChaCha20-Poly1305) is post-quantum-safe, but the key derivation from ECDH is not.

**Current state.** Node identity keys are Ed25519 or secp256k1. Session keys are derived via Curve25519 ECDH. No PQC key exchange or identity scheme has been proposed for the Polkadot networking layer.

**Planned future work.** No concrete post-quantum proposal for the P2P or Noise handshake layer has been identified. libp2p is agnostic to underlying curves and could in principle support PQC key exchange, but Polkadot has not announced plans to pursue this.

## On-Chain Logic

**Grade: F ❌**

Polkadot's runtime is WebAssembly bytecode executing on Substrate's FRAME pallet framework. Substrate exposes cryptographic host functions for Sr25519, Ed25519, and ECDSA secp256k1 signature verification, VRF verification, and standard hash functions (Blake2, Keccak-256, SHA2-256). The hash functions are post-quantum-safe; the signature verification primitives are all elliptic-curve. No native PQC signature-verification precompile exists in Substrate core.

**Current state.** WASM contracts (ink!) and pallets can verify Sr25519, Ed25519, and ECDSA signatures but have no access to a native PQC verification primitive. Implementing PQC verification in WASM contracts is technically possible but would be slow and expensive relative to a native precompile.

**Planned future work.** No concrete post-quantum proposal for Substrate's on-chain cryptographic primitives has been identified. Adding PQC precompiles would require changes to Substrate core maintained by Parity Technologies.

## Other Features

### Parachain Proof-of-Validity (PoV) signatures

**Current state.** Collators sign parachain block candidates using Sr25519, and relay-chain validators sign validity attestations over those candidates using Sr25519. A quantum attacker able to forge Sr25519 signatures could submit false validity proofs for parachains, compromising the security of the shared-security model.

**Planned future work.** No PQC proposal for PoV signing or validity attestations has been identified.

### XCM (Cross-Consensus Message Format)

**Current state.** XCM messages carry cross-chain instructions authenticated by the source chain's signature scheme (Sr25519 for the relay chain, variable for parachains). Message integrity depends on the security of the source chain's consensus signatures.

**Planned future work.** No PQC-aware XCM design has been published.

### BEEFY and bridge light clients

**Current state.** BEEFY produces Merkle Mountain Range (MMR) commitments signed by validators using Sr25519, enabling efficient verification of Polkadot finality on external chains (e.g., Ethereum). GRANDPA light clients deployed on bridge targets validate Sr25519 or BLS signature sets over finality proofs. All bridge security ultimately rests on EC signatures.

**Planned future work.** No PQC-hardened bridge or light client design has been published by Web3 Foundation or Parity Technologies.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for Polkadot in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Polkadot uses OpenGov, a fully on-chain, multi-track governance system in which any DOT holder can submit referenda. Protocol changes — including runtime upgrades — are enacted autonomously by the on-chain scheduler if a referendum passes its track-specific approval threshold and voting period. Kusama (Polkadot's canary network) receives all upgrades before Polkadot mainnet.

PQC-relevant items on the public record:

- **[QuantumGuard MVP grant](https://grants.web3.foundation/applications/quantum-guard)** — Web3 Foundation grant to build a Polkadot parachain using CRYSTALS-Kyber (key exchange) and CRYSTALS-Dilithium (signatures) as a proof-of-concept. This is a research parachain, not an upgrade to the relay chain or Substrate core. Status as of April 2026: grant-funded experiment.
- **[pqc-gateway proof-of-concept](https://kucoin.com/blog/en-kucoin-releases-post-quantum-cryptography-pqc-gateway-proof-of-concept)** — A bridge security proof-of-concept produced in collaboration between Web3 Infrastructure Foundation and KuCoin. Status: proof-of-concept, not deployed to production.
- **[paritytech/polkadot PR #6782](https://github.com/paritytech/polkadot/pull/6782)** — An open pull request from February 2023 that mentions experimental post-quantum VRFs using XMSS in the context of an approval-voting improvement. The PQC content is a discussion point rather than an implementation; the PR has been open for over three years.

No PQC upgrade has been scheduled for OpenGov referendum, and no formal proposal with a canonical identifier has been submitted to the Polkadot governance process.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
