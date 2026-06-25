# xx network (XX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | xx network |
| **Ticker** | XX |
| **Website** | https://xx.network/ |
| **GitHub** | https://github.com/xx-labs |
| **Twitter/X** | https://x.com/xx_network |
| **On-chain environment** | Substrate runtime (WASM); no EVM |

## Summary

| Category | Grade | Icon | Status |
|----------|-------|------|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

xx network, founded by David Chaum and launched in 2021, is frequently described as a post-quantum platform. That description applies to its separate cMix messaging layer, not to its blockchain. The blockchain itself — the xx chain — is a standard [Substrate](https://github.com/xxfoundation/xxchain)-based ledger that uses elliptic-curve cryptography throughout: Ed25519 / Sr25519 for transaction signing, EC-keyed xxBFT (BABE block production plus GRANDPA finality) for consensus, and libp2p over EC for peer-to-peer networking. None of these layers carry a post-quantum signature scheme, and the on-chain runtime exposes only standard Substrate EC and hash primitives.

The one place post-quantum cryptography appears is cMix, the metadata-shredding mixnet that powers the xx messenger privacy product. cMix uses a quantum-resistant key exchange for its messaging layer. cMix is a communication layer that operates independently of the blockchain — it does not sign transactions, produce blocks, or secure on-chain state — so its post-quantum properties do not extend to the ledger. We have found no public roadmap to migrate the blockchain's elliptic-curve cryptography to post-quantum alternatives or to retire EC from the chain. The grade in the Other Features category reflects the cMix key exchange; every blockchain-layer category remains elliptic-curve and quantum-vulnerable.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **cMix quantum-resistant key exchange** (specific scheme not publicly detailed) | EC key exchange in the messaging layer only | Other Features (cMix messaging, off-chain) | Shipped (privacy layer, not blockchain) |

## 1. Transaction Signatures

**Grade: F ❌**

**Current state.** xx network transactions are signed with [Ed25519 and Sr25519](https://github.com/xxfoundation/xxchain), the Substrate-standard elliptic-curve schemes. Account addresses are derived from EC public keys via the Substrate account layer, and multisig is provided by the standard Substrate multisig pallet. All of these primitives are vulnerable to Shor's algorithm. There is no post-quantum signature option for user transactions.

**Planned future work.** No public roadmap indicates a migration of transaction signatures to a post-quantum scheme. The post-quantum cryptography used by xx network is in the cMix messaging layer, which does not sign on-chain transactions. If a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

**Current state.** Consensus is xxBFT, following the Substrate pattern of BABE block production and GRANDPA finality. Validators sign blocks with Ed25519 / Sr25519 keys, validator identity is bound to those EC public keys, and slot-leader election uses an elliptic-curve verifiable random function (VRF). The consensus layer is entirely elliptic-curve-based, with no post-quantum component in block production or finality.

**Planned future work.** No public roadmap indicates a migration of consensus signing or randomness to post-quantum primitives. If a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

**Current state.** The blockchain networking stack is the Substrate libp2p implementation: Ed25519 node-identity keys, Noise-protocol handshakes with EC key exchange, and a Kademlia DHT for peer discovery keyed on EC node identities. This is standard elliptic-curve networking. The cMix mixnet is a separate layer and is not part of the blockchain's peer-to-peer transport.

**Planned future work.** No public roadmap indicates a migration of the blockchain P2P layer to post-quantum cryptography. If a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

**Current state.** The xx chain runs a Substrate WebAssembly runtime (no EVM). On-chain cryptographic functionality is the Substrate standard set: Ed25519 / Sr25519 signature verification and SHA-256 / BLAKE2b hashing. There is no on-chain verification primitive for any post-quantum signature scheme; runtime logic can verify only elliptic-curve signatures.

**Planned future work.** No public roadmap indicates adding post-quantum signature verification to the runtime. If a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

**Grade: D ⚠️**

**Current state.** xx network's distinguishing feature is [cMix](https://xx.network/), a metadata-shredding mixnet that provides anonymous, end-to-end-encrypted messaging (the basis of the xx messenger product). cMix uses a quantum-resistant key exchange for its messaging layer; the specific algorithm is not detailed in public sources. cMix is a communication layer separate from the blockchain — it does not sign transactions, produce blocks, or secure on-chain state — so its post-quantum key exchange does not extend post-quantum protection to the ledger. This grade reflects the post-quantum key exchange present in the cMix privacy layer.

**Planned future work.** cMix continues to be developed as the platform's privacy differentiator. No public roadmap indicates integrating cMix's post-quantum cryptography into the blockchain's consensus, signing, or networking layers.

## 6. EC Sunset

**Grade: F ❌**

Adding post-quantum cryptography in a separate messaging layer is not the same as retiring elliptic-curve cryptography from the blockchain. For reference, xx network's per-category status is: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ⚠️ (cMix messaging layer).

**Current state.** The blockchain layer — transaction signing, consensus, and peer-to-peer networking — has been elliptic-curve-based since launch in 2021 and remains so. The post-quantum cryptography xx network is known for resides in the cMix messaging layer, not on-chain. There is no published plan to retire Ed25519 / Sr25519 or other EC primitives from the chain.

**Planned future work.** No EC retirement schedule or post-quantum migration plan for the blockchain layer has been published. If a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

xx network protocol changes follow the standard Substrate on-chain governance path: a council vote, an optional technical-committee fast-track, and a public token-holder referendum that schedules a `system.setCode` runtime upgrade. Most consensus rule changes ship as forkless WASM runtime upgrades; host-function or libp2p changes that cannot be encapsulated in WASM require a coordinated binary upgrade. Development and governance are stewarded by the xx Foundation.

- Website: https://xx.network/
- GitHub: https://github.com/xx-labs
- Node implementation: https://github.com/xxfoundation/xxchain

---

_Generated on 24 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
