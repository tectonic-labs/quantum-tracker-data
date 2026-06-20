# NEO (NEO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | NEO |
| **Ticker** | NEO |
| **Website** | [neo.org](https://neo.org/) |
| **GitHub** | [neo-project](https://github.com/neo-project) |
| **On-chain environment** | NeoVM (C#, Python, Java, Go, TypeScript) + EVM (Neo X sidechain) |
| **Current mainnet version** | N3 / neo-cli v3.9.2 (activated Feb 2026) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

NEO is a smart-contract platform using dBFT 2.0 (delegated Byzantine Fault Tolerance) consensus with a dual native token model (NEO for governance, GAS for fees). Unlike most major chains, NEO uses **secp256r1 (NIST P-256)** as its primary signature curve rather than secp256k1 — both are elliptic-curve schemes vulnerable to Shor's algorithm at the same scale.

NEO has historical PQC activity predating most chains in this tracker. The project's [community yellow paper](https://neoresearch.io/assets/yellowpaper/yellow_paper.pdf) includes a "NeoQS" (Quantum Safe) concept describing lattice-based cryptography targeting SVP/CVP and LWE/R-LWE hard problems as ECDSA replacements. In 2018, NEO Global Development [partnered with Arqit](https://medium.com/neo-smart-economy/ngd-announces-research-partnership-with-arqit-6036f94cc5d9) for quantum-resistant blockchain research, and a [GitHub proposal (#85)](https://github.com/neo-project/proposals/issues/85) was submitted in February 2019 outlining the technical direction. All three initiatives have had no visible activity since 2019. NeoQS remains a stated long-term intention, not an active implementation.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **Lattice-based (NeoQS)** | ECDSA secp256r1 | Tx Signatures | Discussed |

## Transaction Signatures

**Grade: D ⚠️**

NEO uses [secp256r1 ECDSA (NIST P-256)](https://developers.neo.org/docs/n3/foundation/Cryptography/encryption_algorithm) for transaction signatures on the N3 mainnet, with secp256k1 also supported for cross-chain interoperability (e.g., Neo X sidechain).

**Current state.** No post-quantum signature scheme is available on mainnet or testnet. All transaction authorization relies on elliptic-curve signatures.

**Planned future work.** The NeoQS concept in the [community yellow paper](https://neoresearch.io/assets/yellowpaper/yellow_paper.pdf) describes a lattice-based cryptographic mechanism as an ECDSA replacement. NEO Global Development [partnered with Arqit in 2018](https://medium.com/neo-smart-economy/ngd-announces-research-partnership-with-arqit-6036f94cc5d9) for quantum-resistant research, and [proposal #85](https://github.com/neo-project/proposals/issues/85) (February 2019) outlined the technical direction. All three initiatives have had no visible activity since 2019.

## Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for NEO in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for NEO in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for NEO in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

**Grade: F ❌**

### Neo X Sidechain

**Current state.** Neo X is NEO's EVM-compatible sidechain using secp256k1 signatures. A cross-chain bridge between Neo N3 and Neo X uses validator-set EC signatures.

**Planned future work.** NeoQS and related PQC initiatives do not address the Neo X sidechain or cross-chain bridge.

### NeoFS

**Current state.** NeoFS is a distributed storage network using EC keys for object access control.

**Planned future work.** No PQC migration has been discussed for NeoFS.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No EC removal schedule or sunset plan has been published by the Neo Foundation. The historical NeoQS concept describes adding lattice-based cryptography but does not discuss removing EC support.

## Governance

NEO protocol upgrades are activated by hard fork at pre-announced block heights coordinated by the Neo Foundation. The elected 21-member committee (voted in by NEO holders) controls on-chain parameters via native contract calls; protocol changes require coordinated hard forks. NEO has two production node implementations: neo-cli (C#, reference) and neo-go (Go, community).

- [Proposal #85](https://github.com/neo-project/proposals/issues/85) — "NeoQS" lattice-based PQC proposal, submitted February 18, 2019. No activity since 2019.
- [Arqit research partnership](https://medium.com/neo-smart-economy/ngd-announces-research-partnership-with-arqit-6036f94cc5d9) — announced October 2018 by NEO Global Development. No public follow-up.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
