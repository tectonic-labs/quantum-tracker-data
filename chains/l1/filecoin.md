# Filecoin (FIL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Filecoin |
| **Ticker** | FIL |
| **Website** | https://filecoin.io/ |
| **GitHub** | https://github.com/filecoin-project |
| **Twitter / X** | https://x.com/Filecoin |
| **On-chain environment** | FVM (WASM-based, EVM-compatible via FEVM) |
| **Current mainnet version** | nv28 "Firehorse" (activated 2026-05-27) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Filecoin is a decentralised storage network combining Proof of Replication (PoRep) and Proof of Spacetime (PoSt) with an EVM-compatible smart contract environment (FVM). The entire protocol depends on elliptic-curve cryptography: ECDSA secp256k1 and BLS12-381 for transaction signatures; EC-signed Expected Consensus block proposals; libp2p with Noise/TLS handshakes over EC keys for P2P; and — most critically — Groth16 zk-SNARKs over BLS12-381 for the storage proof system itself. No public PQC roadmap or quantum transition plan has been disclosed by Protocol Labs or the Filecoin Foundation.

The storage proof system is the highest-severity exposure. Groth16 depends on the hardness of discrete logarithm over BLS12-381. If pairing-friendly curves are broken by a quantum adversary, storage proofs become forgeable, allowing providers to claim storage they do not hold. Filecoin verifies more than two million Groth16 proofs per day, making a migration uniquely challenging at scale.

## Proposed and Implemented PQC Algorithms

> Filecoin does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Filecoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Filecoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Filecoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Filecoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### Proof of Replication (PoRep) and Proof of Spacetime (PoSt)

Filecoin's storage proof system uses [Groth16 zk-SNARKs](https://github.com/filecoin-project/bellperson) over BLS12-381 pairings. PoRep proves that a storage provider has committed a unique copy of sealed data; PoSt proves the provider continues to hold the data. The circuits are among the largest deployed in production — over 100 million constraints — and the network verifies [more than two million Groth16 proofs per day](https://filecoin.io/blog/posts/update-trusted-setup/). A [trusted setup ceremony](https://filecoin.io/blog/posts/update-trusted-setup/) was conducted in 2020-2021.

Groth16 depends on the hardness of the discrete logarithm problem over BLS12-381. A quantum adversary who can break pairing-friendly elliptic curves could generate fraudulent storage proofs at no cost, claiming to hold data they do not possess. This would enable sybil attacks on storage accounting, economic collapse of storage pricing signals, and potential data loss as the network's apparent redundancy masks zero actual replication.

Hash-based SNARK alternatives (such as STARK-based proving systems) would not require a trusted setup and would be quantum-resistant, but migrating Filecoin's proof system would require circuit redesign, new parameter generation, a hard fork to activate the new proof type, and a transition period during which both proof types are accepted.

**Current state.** Groth16 over BLS12-381 is in production. No quantum-safe alternative has been proposed.

**Planned future work.** None documented. Protocol Labs has not disclosed a roadmap for migrating the PoRep/PoSt proof system.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No public PQC roadmap or quantum transition plan has been disclosed. Every cryptographic layer — transaction signatures (secp256k1, BLS12-381), block signing (secp256k1, BLS12-381), P2P handshakes, on-chain primitives, and the storage proof system (Groth16/BLS12-381) — relies on elliptic-curve constructions. Migrating the storage proof system alone would be a multi-year undertaking requiring new circuit design, new trusted setup or setup-free alternative, and coordinated storage provider upgrades.

**Current state.** No EC retirement plan on any layer.

**Planned future work.** None identified.

## Governance

Filecoin governance operates through the [FIP (Filecoin Improvement Proposal)](https://fips.filecoin.io/) process, with structured FIP types defined under FIP0001v2 (Technical, Cryptoeconomic, Community, Security, and FRC categories). Protocol changes are staged on the Calibration testnet before mainnet activation. The [FIPs repository](https://github.com/filecoin-project/FIPs) is the public record of proposals.

No PQC-relevant FIPs have been identified. FIP-0079 (BLS Aggregate Signatures to FVM, implemented 2023) enabled BLS12-381 signature aggregation for FVM actors but does not address quantum vulnerability. No proposal to add PQC signature schemes or to migrate the storage proof system has been filed.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
