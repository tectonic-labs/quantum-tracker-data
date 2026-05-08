# Polkadot (DOT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Polkadot |
| **Ticker** | DOT |
| **Website** | https://polkadot.com |
| **GitHub** | https://github.com/paritytech |
| **Twitter / X** | https://x.com/polkadot |
| **On-chain environment** | WASM (Substrate) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Polkadot is built on [Substrate](https://substrate.dev/docs/en/index), using [Sr25519](https://wiki.polkadot.com/learn/learn-cryptography/) (Schnorr over Ristretto25519) as its primary signature scheme across transaction signing, [BABE block production](https://research.web3.foundation/Polkadot/protocols/block-production/Babe), [GRANDPA finality](https://docs.polkadot.com/polkadot-protocol/architecture/polkadot-chain/pos-consensus/), parachain validation, and [cross-chain messaging (XCM)](https://wiki.polkadot.com/learn/learn-xcm/). All cryptographic primitives — Sr25519, Ed25519, ECDSA secp256k1, and the planned BLS upgrade for GRANDPA — are elliptic-curve based with no post-quantum migration plan for the relay chain or Substrate core.

Web3 Foundation has funded two external PQC research projects: the [QuantumGuard MVP](https://grants.web3.foundation/applications/quantum-guard) (a parachain proof-of-concept using CRYSTALS-Kyber and CRYSTALS-Dilithium) and a [pqc-gateway bridge proof-of-concept](https://kucoin.com/blog/en-kucoin-releases-post-quantum-cryptography-pqc-gateway-proof-of-concept). Neither project has been integrated into the Polkadot relay chain or Substrate framework.

Polkadot does not currently propose or implement any post-quantum cryptographic algorithms in its core protocol.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Polkadot in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

Polkadot uses a hybrid consensus model. [BABE](https://research.web3.foundation/Polkadot/protocols/block-production/Babe) handles block production via a Verifiable Random Function (VRF) over [Sr25519](https://wiki.polkadot.com/learn/learn-cryptography/) keys, while [GRANDPA](https://docs.polkadot.com/polkadot-protocol/architecture/polkadot-chain/pos-consensus/) provides Byzantine fault-tolerant finality once two-thirds of validators attest to blocks. GRANDPA currently uses Sr25519 for votes, with a planned upgrade to BLS signatures for efficient aggregation. Both Sr25519 and BLS are elliptic-curve based.

The random beacon, used for per-slot randomness in BABE and parachain validation, is derived from BABE VRF outputs and GRANDPA finality — both indirectly broken by compromise of the underlying EC schemes.

**Current state.** All consensus signing uses Sr25519. The planned BLS upgrade improves aggregation efficiency but remains EC-based.

**Planned future work.** No post-quantum alternative has been proposed for BABE's VRF or GRANDPA's finality signatures.

## 3. P2P Networking

**Grade: F ❌**

Polkadot nodes communicate via [libp2p](https://docs.libp2p.io/concepts/secure-comm/noise/) with the [Noise XX handshake pattern](https://spec.polkadot.network/chap-networking). Each node has a PeerId derived from its public key (Ed25519 or secp256k1). Ephemeral ECDH on Curve25519 produces the shared secret for symmetric encryption (AES-256-GCM or ChaCha20-Poly1305). The symmetric encryption is quantum-safe; the key derivation from ECDH is not.

**Current state.** Node identity and handshake authentication use EC keys. Peer discovery via Kademlia DHT exposes PeerIds derived from public keys.

**Planned future work.** libp2p's Noise spec is agnostic to underlying curves, so a migration path to post-quantum key exchange exists in principle, but Polkadot has not announced plans.

## 4. On-Chain Logic

**Grade: F ❌**

Polkadot's [WASM runtime](https://substrate.dev/docs/en/index) provides cryptographic primitives through FRAME pallets: Sr25519, Ed25519, and ECDSA secp256k1 verification, plus VRF verification (Sr25519-based). Hash functions (Blake2, Keccak-256, SHA2-256) are quantum-resistant. ink! WASM smart contracts can access these primitives. No native precompile or pallet exists for post-quantum signature schemes.

**Current state.** On-chain signature verification is EC-only. A parachain could implement PQC verification in contracts, but performance in WASM versus native would be a concern.

**Planned future work.** None documented for PQC precompiles or pallets in Substrate core.

## 5. Other Features

**Grade: F ❌**

### Parachain Validation Proofs

Collators produce [Proof-of-Validity (PoV) blocks](https://medium.com/polkadot-network/the-path-of-a-parachain-block-47d05765d7a) signed with Sr25519. Validators sign [validity attestations](https://research-test.readthedocs.io/en/latest/polkadot/validity/) over Sr25519. Candidate receipts are posted to the relay chain.

**Current state.** All PoV signing and validity attestations use Sr25519. No PQC alternative exists.

**Planned future work.** None documented.

### XCM (Cross-Consensus Message Format)

[XCM](https://wiki.polkadot.com/learn/learn-xcm/) messages are authenticated via the source chain's signature scheme (Sr25519 for the relay chain). Merkle tree proofs ensure message ordering and fidelity.

**Current state.** Message authentication inherits the relay chain's EC-based signatures.

**Planned future work.** None documented.

### BEEFY (Bridging Efficiency Gadget)

[BEEFY](https://research.web3.foundation/Polkadot/protocols/BEEFY) sits on top of GRANDPA finality for efficient bridges to external chains. Validators sign MMR (Merkle Mountain Range) roots using Sr25519, enabling lightweight verification of Polkadot finality on non-GRANDPA chains.

**Current state.** BEEFY validator signatures use Sr25519. No PQC alternative exists.

**Planned future work.** None documented.

### Bridges and Light Clients

[Bridge Hub](https://docs.polkadot.com/polkadot-protocol/architecture/system-chains/bridge-hub/) and GRANDPA light clients deployed on target chains validate BLS or Sr25519 signatures over the source chain's validator set. All bridge security depends on EC signatures.

**Current state.** All bridges rely on EC-based GRANDPA/BEEFY light clients.

**Planned future work.** None documented.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No public plans exist to deprecate elliptic-curve cryptography in Polkadot or Substrate. Sr25519 is embedded in Substrate core, BABE VRF depends on it, the planned GRANDPA upgrade targets BLS (still EC), and libp2p Noise relies on Curve25519 ECDH. A migration would require consensus hard fork, backward-compatible signature co-existence, coordination across 100+ parachains, and ecosystem-wide library updates.

Web3 Foundation has funded the [QuantumGuard MVP](https://grants.web3.foundation/applications/quantum-guard) (a parachain PoC using CRYSTALS-Kyber + CRYSTALS-Dilithium) and a [pqc-gateway bridge PoC](https://kucoin.com/blog/en-kucoin-releases-post-quantum-cryptography-pqc-gateway-proof-of-concept), but neither is integrated into the relay chain or Substrate framework.

**Current state.** EC cryptography is embedded in every protocol layer. No category has a published EC retirement plan.

**Planned future work.** PQC research exists at the grant-project level but has not been adopted into the core protocol roadmap.

## Governance

Polkadot governance operates through the Fellowship and on-chain referenda, with the Polkadot Ecosystem Council overseeing protocol upgrades. Protocol changes require fellowship approval and on-chain voting.

PQC-related activity is limited to:

- **QuantumGuard MVP** — A [Web3 Foundation grant](https://grants.web3.foundation/applications/quantum-guard) for building a Polkadot parachain using NIST-standardized quantum-safe algorithms. This is a grant-funded experiment, not a core protocol proposal.
- **pqc-gateway** — A [proof-of-concept](https://kucoin.com/blog/en-kucoin-releases-post-quantum-cryptography-pqc-gateway-proof-of-concept) for PQC bridge security, developed in collaboration with KuCoin and W3IF. Not integrated into Polkadot infrastructure.

No PQC upgrade proposals have been filed through Polkadot's governance process. No Fellowship RFC or referendum addresses post-quantum migration.

---

_Generated on 07 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
