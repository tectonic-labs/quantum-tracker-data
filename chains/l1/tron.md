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
| Transaction Signatures | B+ | 🧪 | Testnet Live |
| Consensus | B+ | 🧪 | Testnet Live |
| P2P Networking | B+ | 🧪 | Testnet Live |
| On-Chain Logic | B+ | 🧪 | Testnet Live |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

> **Testnet activity**: The [Nile testnet](https://www.cryptotimes.io/2026/07/03/justin-suns-tron-activates-quantum-resistant-signatures-on-nile-testnet/) has been running dual-scheme post-quantum signing — **FN-DSA-512** (Falcon-512) as default and **ML-DSA-44** (Dilithium2) optional — since 2026-07-03, spanning transaction signatures, super-representative block-production signatures, P2P handshakes, and TVM contract verification. This is not yet active on mainnet (Q3 2026 target).

TRON has moved from having no verifiable post-quantum deployment to a concrete, governance-gated testnet activation. On 2026-07-02, [Committee Proposal No. 20628](https://blockonomi.com/tron-post-quantum-signatures-launch-on-nile-testnet-after-vote/) passed, and on 2026-07-03 the Nile testnet went live with quantum-resistant signing running two NIST post-quantum signature schemes in parallel behind on-chain governance flags. The upgrade — shipped in the [GreatVoyage-v4.8.2-PQ1 build](https://www.cryptopolitan.com/tron-network-quantum-resistant-sign/) — covers transaction signatures, block production by super representatives, peer-to-peer node handshakes, and on-chain (TVM) signature verification. Mainnet migration is targeted for Q3 2026 and requires further super-representative governance approval.

Separately, an earlier community-submitted draft, [tips#891](https://github.com/tronprotocol/tips/pull/891) (**OTAK-PQ**, One-Time Access Keys for Post-Quantum Security), proposes a hash-based child-key architecture for signature-exposure reduction. It remains a distinct Draft-stage proposal, not part of the Proposal-20628 NIST scheme track. TRON's other quantum-relevant exposure is [TIP-135 Shielded TRC-20](https://github.com/tronprotocol/tips/blob/master/tip-135.md), which uses Groth16 zk-SNARKs over BN254 pairings — a quantum break would retroactively deanonymize the historical shielded ledger.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **FN-DSA-512** (Falcon-512) | ECDSA secp256k1 | Tx Signatures, Consensus, P2P, On-Chain | Testnet Live |
| **ML-DSA-44** (Dilithium2, FIPS 204) | ECDSA secp256k1 | Tx Signatures, Consensus, P2P, On-Chain | Testnet Live |
| **OTAK-PQ** (hash-based one-time access keys) | ECDSA secp256k1 | Tx Signatures | Discussed |

## Transaction Signatures

**Grade: B+ 🧪**

TRON uses [ECDSA secp256k1](https://tronprotocol.github.io/documentation-en/mechanism-algorithm/account/) for all mainnet transaction signatures, identical to Ethereum. Addresses are derived by hashing the public key with SHA3-256 (0x41 prefix, 21 bytes). Multi-signature is supported via TVM smart contracts, and [TIP-43](https://github.com/tronprotocol/tips/blob/master/tip-43.md) adds a BatchValidateSign precompile for efficient parallel verification.

**Current state.** A dual-scheme post-quantum signing path is [live on the Nile testnet](https://www.cryptotimes.io/2026/07/03/justin-suns-tron-activates-quantum-resistant-signatures-on-nile-testnet/) as of 2026-07-03, activated by Committee Proposal No. 20628 (passed 2026-07-02) behind on-chain governance flags: **FN-DSA-512** (Falcon-512) as the default and **ML-DSA-44** (Dilithium2, FIPS 204) optional. Mainnet transactions still use ECDSA secp256k1. This is a genuine NIST post-quantum signature deployment on a public, mainnet-path testnet — a substantially larger step than the earlier draft [tips#891](https://github.com/tronprotocol/tips/pull/891) OTAK-PQ hash-based access-key scheme, which remains separate and community-submitted.

**Planned future work.** Mainnet migration is [targeted for Q3 2026](https://www.cryptopolitan.com/tron-network-quantum-resistant-sign/), pending further super-representative governance approval. Mainnet activation would move this category to Shipped.

## Consensus

**Grade: B+ 🧪**

TRON uses [Delegated Proof of Stake (DPoS)](https://tronprotocol.github.io/documentation-en/mechanism-algorithm/dpos/) with 27 elected Super Representatives (SRs). Each SR signs blocks with a witness signature included in the block header; SRs rotate every 6-hour round, and finality requires confirmation by at least 18 of 27 SRs.

**Current state.** Under [Committee Proposal No. 20628](https://blockonomi.com/tron-post-quantum-signatures-launch-on-nile-testnet-after-vote/), super-representative block-production signatures use post-quantum schemes (**FN-DSA-512** / **ML-DSA-44**) on the Nile testnet as of 2026-07-03. Mainnet block signing still uses ECDSA secp256k1.

**Planned future work.** Mainnet activation is targeted for Q3 2026 alongside the rest of the Proposal-20628 upgrade, pending SR governance.

## P2P Networking

**Grade: B+ 🧪**

TRON's [P2P networking](https://medium.com/tronnetwork/a-detailed-description-of-p2p-network-modules-ff8f03ebda20) uses a Kademlia distributed hash table for peer discovery, with 512-bit node IDs and XOR distance.

**Current state.** Under Committee Proposal No. 20628, fast-forward node handshakes carry [post-quantum signatures](https://blockonomi.com/tron-post-quantum-signatures-launch-on-nile-testnet-after-vote/) (**FN-DSA-512** / **ML-DSA-44**) on the Nile testnet as of 2026-07-03. Mainnet peer identity remains EC-based.

**Planned future work.** Mainnet activation targeted Q3 2026, pending SR governance.

## On-Chain Logic

**Grade: B+ 🧪**

TRON's [TVM](https://developers.tron.network/v4.4.0/docs/vm-vs-evm) is EVM-compatible and exposes EC-based precompiles: ecrecover (0x01), ecAdd (0x06), ecMul (0x07), ecPairing over BN254 (0x08), and [BatchValidateSign](https://github.com/tronprotocol/tips/blob/master/tip-43.md) (0x09).

**Current state.** Under Committee Proposal No. 20628, TVM contract signature verification supports [post-quantum schemes](https://www.cryptotimes.io/2026/07/03/justin-suns-tron-activates-quantum-resistant-signatures-on-nile-testnet/) (**FN-DSA-512** / **ML-DSA-44**) on the Nile testnet as of 2026-07-03. Mainnet TVM remains EC-only.

**Planned future work.** Mainnet activation targeted Q3 2026, pending SR governance.

## Other Features

**Grade: D ⚠️**

### Shielded TRC-20 (TIP-135)

**Current state.** [TIP-135 Shielded TRC-20](https://github.com/tronprotocol/tips/blob/master/tip-135.md) provides token privacy through mint, transfer, and burn operations, carrying [Groth16 zk-SNARK proofs](https://medium.com/tronnetwork/implementation-of-shielded-trc20-token-contract-e35b2ee010e7) over BN254 elliptic-curve pairings. A quantum break of Groth16 would let an attacker forge proofs and would retroactively deanonymize the historical shielded ledger.

**Planned future work.** No migration plan has been published. STARK-based proof systems are the typical quantum-resistant alternative to Groth16 but would require circuit redesign and a hard fork; neither has been proposed in the TIP repository.

### TRC-20 USDT and TRC ecosystem tokens

**Current state.** TRON hosts a [large share of global USDT supply](https://bingx.com/en/learn/article/what-is-usdt-trc-20) on TRC-20. TRC-20, TRC-721, and TRC-1155 tokens inherit transaction signing from the base layer without adding cryptographic primitives of their own.

**Planned future work.** None published; token-layer security tracks the chain-layer signature scheme.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, TRON's PQC-adoption ratings per category are: Tx Signatures 🧪, Consensus 🧪, P2P 🧪, On-Chain 🧪, Other ⚠️.

The Proposal-20628 upgrade is additive — it runs post-quantum schemes alongside ECDSA behind governance flags rather than removing ECDSA. No policy, milestone, or proposal to retire ECDSA has been published by the TRON Foundation or core developers.

## Governance

TRON protocol changes follow the [TIP (TRON Improvement Proposal)](https://github.com/tronprotocol/tips) process (Draft → Review → Accepted → Final), combined with on-chain weighted voting by Super Representatives and hard-fork coordination across the 27-validator set. Committee Proposals are the on-chain governance mechanism for activating protocol parameters.

PQ-relevant governance on the public record:

- **Committee Proposal No. 20628** — activates dual-scheme post-quantum signing (FN-DSA-512 default, ML-DSA-44 optional). [Passed 2026-07-02; Nile testnet live 2026-07-03](https://www.cryptotimes.io/2026/07/03/justin-suns-tron-activates-quantum-resistant-signatures-on-nile-testnet/). Mainnet migration targeted Q3 2026.
- [tips#891](https://github.com/tronprotocol/tips/pull/891) — OTAK-PQ (One-Time Access Keys). Status: Draft (created 2026-06-07, author: `alichatme`). Hash-based child-key architecture; community-submitted; separate from the Proposal-20628 track.

PQ-adjacent proposals (existing EC-based work):

- [TIP-43](https://github.com/tronprotocol/tips/blob/master/tip-43.md) — BatchValidateSign precompile for parallel ECDSA verification. Status: Final (2019-07-10). Not PQ.
- [TIP-135](https://github.com/tronprotocol/tips/blob/master/tip-135.md) — Shielded TRC-20 (Groth16 SNARK). Status: Final (2020-09-28). Not PQ; quantum-vulnerable.

---

_Generated on 06 Jul 2026 based on information as of 06 Jul 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
