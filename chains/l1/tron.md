# TRON (TRX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | TRON |
| **Ticker** | TRX |
| **Website** | https://tron.network |
| **GitHub** | https://github.com/tronprotocol |
| **On-chain environment** | TVM (TRON Virtual Machine, EVM-compatible) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

TRON has no published post-quantum cryptography roadmap. All transaction signatures, consensus block signing, peer identity, and on-chain precompiles are EC-based, with no migration proposals filed in the [TIP repository](https://github.com/tronprotocol/tips) and no PQ-specific announcements from the TRON Foundation. The chain's quantum-relevant exposure beyond standard ECDSA appears in [TIP-135 Shielded TRC-20](https://github.com/tronprotocol/tips/blob/master/tip-135.md), which uses Groth16 zk-SNARKs over BN254 pairings for token privacy — a quantum break would retroactively deanonymize the historical shielded ledger.

TRON's commercial weight rests heavily on TRC-20 USDT, which inherits chain-level ECDSA without adding new quantum-relevant cryptography of its own.

## Proposed and Implemented PQC Algorithms

TRON does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for TRON in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for TRON in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for TRON in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for TRON in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### Shielded TRC-20 (TIP-135)

**Current state.** [TIP-135 Shielded TRC-20](https://github.com/tronprotocol/tips/blob/master/tip-135.md) provides privacy for TRC-20 tokens through three operations — mint (public → shielded), transfer (shielded with hidden source, destination, and amount), and burn (shielded → public) — supporting up to two inputs and two outputs per transaction. SpendDescription and ReceiveDescription fields carry [Groth16 zk-SNARK proofs](https://medium.com/tronnetwork/implementation-of-shielded-trc20-token-contract-e35b2ee010e7) over BN254 elliptic-curve pairings. A quantum break of Groth16 would let an attacker forge proofs and would retroactively deanonymize the historical shielded ledger.

**Planned future work.** No migration plan has been published. STARK-based proof systems are the typical quantum-resistant alternative to Groth16 SNARKs but would require circuit redesign and a hard fork; neither has been proposed in the TIP repository.

### TRC-20 USDT and TRC ecosystem tokens

**Current state.** TRON hosts a large share of global USDT supply on TRC-20. TRC-20, TRC-721, and TRC-1155 tokens inherit transaction signing from the base layer (ECDSA secp256k1) without adding additional cryptographic primitives. Tokens carry no quantum-specific exposure beyond the underlying chain's signature scheme.

**Planned future work.** None published. Token-layer security tracks the chain-layer signature scheme.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, TRON's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ⚠️.

We have found no public information indicating migration activity for TRON in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

TRON protocol changes follow the [TIP (TRON Improvement Proposal)](https://github.com/tronprotocol/tips) process. TIPs progress through Draft → Review → Accepted → Final. Approval requires review by the core (java-tron) team and on-chain weighted voting by Super Representatives. Major upgrades require hard fork coordination across the 27-validator set.

PQ-relevant proposals filed in the TIP repository:

- None. As of the most recent scan there is no TIP proposing PQC adoption for transaction signatures, consensus, P2P, or on-chain verification.

PQ-adjacent proposals (existing EC-based work):

- [TIP-43](https://github.com/tronprotocol/tips/blob/master/tip-43.md) — BatchValidateSign precompile for parallel ECDSA verification. Status: Final (deployed 2019-07-10). Not PQ.
- [TIP-135](https://github.com/tronprotocol/tips/blob/master/tip-135.md) — Shielded TRC-20 (Groth16 SNARK). Status: Final (2020-09-28). Not PQ; quantum-vulnerable.
- TIP-137 — Shielded TRC-721. Status: Final (2020-09-28). Not PQ; quantum-vulnerable.

No fork or amendment vote has been scheduled relating to PQ migration on TRON.

---

_Generated on 06 May 2026 based on information as of 06 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
