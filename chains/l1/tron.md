# TRON (TRX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | TRON |
| **Ticker** | TRX |
| **Website** | [tron.network](https://tron.network) |
| **GitHub** | [tronprotocol](https://github.com/tronprotocol) |
| **Twitter / X** | [@trondao](https://x.com/trondao) |
| **On-chain environment** | TVM (TRON Virtual Machine, EVM-compatible) |
| **Mainnet genesis** | 2018-06-25 |
| **Current mainnet version** | GreatVoyage-v4.8.1 (Democritus) (mandatory by 2026-03-09) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

TRON has no published post-quantum cryptography roadmap from its Foundation or core development team. All transaction signatures, consensus block signing, peer identity, and on-chain precompiles remain EC-based. However, on June 7, 2026, the first PQC-motivated proposal appeared in the [TIP repository](https://github.com/tronprotocol/tips): [tips#891](https://github.com/tronprotocol/tips/pull/891) proposes **OTAK-PQ** (One-Time Access Keys for Post-Quantum Security), a hash-based child-key architecture designed to reduce long-term signature exposure against future quantum threats. This is a community-submitted draft — not a NIST PQ-DSA deployment and not led by core developers or the Foundation — but it represents TRON's first PQC-related governance artifact of any kind.

The chain's quantum-relevant exposure beyond standard ECDSA appears in [TIP-135 Shielded TRC-20](https://github.com/tronprotocol/tips/blob/master/tip-135.md), which uses Groth16 zk-SNARKs over BN254 pairings for token privacy — a quantum break would retroactively deanonymize the historical shielded ledger. TRON's commercial weight rests heavily on TRC-20 USDT, which inherits chain-level ECDSA without adding new quantum-relevant cryptography of its own.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **OTAK-PQ** (hash-based one-time access keys) | ECDSA secp256k1 | Tx Signatures | Discussed |

## Transaction Signatures

**Grade: D ⚠️**

TRON uses [ECDSA secp256k1](https://tronprotocol.github.io/documentation-en/mechanism-algorithm/account/) for all transaction signatures, identical to Ethereum. Addresses are derived by hashing the public key with SHA3-256 (with a 0x41 prefix, 21 bytes total). Multi-signature is supported via TVM smart contracts, and [TIP-43](https://github.com/tronprotocol/tips/blob/master/tip-43.md) adds a BatchValidateSign precompile for efficient parallel signature verification.

**Current state.** All transactions are signed with ECDSA secp256k1. The first PQC-motivated proposal has been submitted: [tronprotocol/tips#891](https://github.com/tronprotocol/tips/pull/891) ("OTAK-PQ", draft, created 2026-06-07) proposes a hash-based child-key architecture featuring one-time child keys, Merkle-root validation, consumed-key enforcement, bootstrap activation, and separation of account ownership from operational signing. **OTAK-PQ** is a hash-based exposure-reduction scheme rather than a NIST PQ-DSA deployment. It is community-submitted and not led by core developers or the TRON Foundation.

**Planned future work.** tips#891 is at Draft status in the TIP repository. No timeline for review or adoption has been published.

## Consensus

**Grade: F ❌**

TRON uses [Delegated Proof of Stake (DPoS)](https://tronprotocol.github.io/documentation-en/mechanism-algorithm/dpos/) with 27 elected Super Representatives (SRs). Each SR signs blocks using ECDSA secp256k1, with the witness_signature included in the block header. SRs rotate every 6-hour round (7,200 slots at 3-second intervals). Finality requires confirmation by at least 18 of 27 SRs.

We have found no public information indicating migration activity for TRON in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

TRON's [P2P networking](https://medium.com/tronnetwork/a-detailed-description-of-p2p-network-modules-ff8f03ebda20) uses a Kademlia distributed hash table (DHT) for peer discovery. Node IDs are 512-bit values with distance calculated by XOR. The P2P Network ID (p2p.version) specifies which network a node joins.

We have found no public information indicating migration activity for TRON in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

TRON's [TVM](https://developers.tron.network/v4.4.0/docs/vm-vs-evm) is EVM-compatible and exposes several EC-based precompiles: ecrecover (0x01), ecAdd (0x06), ecMul (0x07), ecPairing over BN254 (0x08), and [BatchValidateSign](https://github.com/tronprotocol/tips/blob/master/tip-43.md) (0x09). TRON-specific [precompile differences](https://github.com/tronprotocol/tips/issues/272) include TwiceHash (0x20003) and Blake2F (0x20009). Hash functions SHA-256, Keccak-256, and Blake2b are available.

We have found no public information indicating migration activity for TRON in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

**Grade: D ⚠️**

### Shielded TRC-20 (TIP-135)

**Current state.** [TIP-135 Shielded TRC-20](https://github.com/tronprotocol/tips/blob/master/tip-135.md) provides privacy for TRC-20 tokens through three operations — mint (public to shielded), transfer (shielded with hidden source, destination, and amount), and burn (shielded to public) — supporting up to two inputs and two outputs per transaction. SpendDescription and ReceiveDescription fields carry [Groth16 zk-SNARK proofs](https://medium.com/tronnetwork/implementation-of-shielded-trc20-token-contract-e35b2ee010e7) over BN254 elliptic-curve pairings. A quantum break of Groth16 would let an attacker forge proofs and would retroactively deanonymize the historical shielded ledger.

**Planned future work.** No migration plan has been published. STARK-based proof systems are the typical quantum-resistant alternative to Groth16 SNARKs but would require circuit redesign and a hard fork; neither has been proposed in the TIP repository.

### TRC-20 USDT and TRC ecosystem tokens

**Current state.** TRON hosts a [large share of global USDT supply](https://bingx.com/en/learn/article/what-is-usdt-trc-20) on TRC-20. TRC-20, TRC-721, and TRC-1155 tokens inherit transaction signing from the base layer (ECDSA secp256k1) without adding additional cryptographic primitives. Tokens carry no quantum-specific exposure beyond the underlying chain's signature scheme.

**Planned future work.** None published. Token-layer security tracks the chain-layer signature scheme.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, TRON's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ❌, P2P ❌, On-Chain ❌, Other ⚠️.

We have found no public information indicating migration activity for TRON in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

TRON protocol changes follow the [TIP (TRON Improvement Proposal)](https://github.com/tronprotocol/tips) process. TIPs progress through Draft, Review, Accepted, Final. Approval requires review by the core (java-tron) team and on-chain weighted voting by Super Representatives. Major upgrades require hard fork coordination across the 27-validator set.

PQ-relevant proposals filed in the TIP repository:

- [tips#891](https://github.com/tronprotocol/tips/pull/891) — OTAK-PQ (One-Time Access Keys for Post-Quantum Security). Status: Draft (created 2026-06-07, author: `alichatme`). Hash-based child-key architecture for exposure reduction. Community-submitted.

PQ-adjacent proposals (existing EC-based work):

- [TIP-43](https://github.com/tronprotocol/tips/blob/master/tip-43.md) — BatchValidateSign precompile for parallel ECDSA verification. Status: Final (deployed 2019-07-10). Not PQ.
- [TIP-135](https://github.com/tronprotocol/tips/blob/master/tip-135.md) — Shielded TRC-20 (Groth16 SNARK). Status: Final (2020-09-28). Not PQ; quantum-vulnerable.
- TIP-137 — Shielded TRC-721. Status: Final (2020-09-28). Not PQ; quantum-vulnerable.

No fork or amendment vote has been scheduled relating to PQ migration on TRON.

---

_Generated on 08 Jun 2026 based on information as of 08 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
