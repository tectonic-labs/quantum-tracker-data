# NEO (NEO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | NEO |
| **Ticker** | NEO |
| **Website** | https://neo.org/ |
| **GitHub** | https://github.com/neo-project |
| **Twitter / X** | https://x.com/Neo_Blockchain |
| **On-chain environment** | NeoVM (C#, Python, Java, Go, TypeScript via compilers) |
| **Current mainnet version** | neo-cli v3.9.2 (activated February 2026) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

NEO is a smart-contract platform running the [dBFT 2.0](https://developers.neo.org/docs/n3/foundation/consensus/dbft) (delegated Byzantine Fault Tolerance) consensus protocol with a dual-token model — NEO for governance voting and GAS for transaction fees. Smart contracts run on NeoVM and can be written in mainstream languages including C#, Python, Java, Go, and TypeScript. NEO is notable for using **secp256r1 (NIST P-256)** as its primary signing curve rather than the secp256k1 curve common among most major chains; both are elliptic-curve discrete-log schemes and are equivalently vulnerable to Shor's algorithm. The Neo X sidechain adds EVM compatibility with secp256k1 signatures. No post-quantum migration work has been identified in Neo Foundation releases, the [neo-project GitHub](https://github.com/neo-project), or official communications as of mid-2026.

## Proposed and Implemented PQC Algorithms

NEO does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for NEO in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

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

[Neo X](https://neo-blockchain.medium.com/announcing-the-neo-x-pre-alpha-testnet-launch-4eff78560bdd) is an EVM-compatible sidechain that provides Solidity contract execution with secp256k1 signatures. The cross-chain bridge between Neo N3 and Neo X uses validator-set EC signatures for attestation. Both the sidechain's transaction signing and the bridge attestation layer are elliptic-curve based.

**Current state.** Neo X mainnet is live with secp256k1 ECDSA signatures and an EC-based bridge to Neo N3. No post-quantum alternative is documented.

**Planned future work.** None announced.

### NeoFS

NeoFS is a distributed storage network associated with the Neo ecosystem. Access control for stored objects uses EC keys.

**Current state.** EC-based object access control. No post-quantum alternative announced.

**Planned future work.** None announced.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for NEO in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

NEO protocol upgrades are activated at a pre-announced block height coordinated by the Neo Foundation; there is no miner-signalling or validator-vote mechanism for protocol changes. The elected 21-member committee (voted in by NEO holders) controls on-chain parameters such as fee whitelists via native contract calls, which do not require a hard fork. Protocol discussion and releases are announced via [neo.org](https://neo.org/) and the [neo-project GitHub](https://github.com/neo-project). The [NEO N3 developer resources](https://developers.neo.org/docs/n3/foundation/consensus/dbft) and [encryption algorithm documentation](https://developers.neo.org/docs/n3/foundation/Cryptography/encryption_algorithm) are the principal references for protocol cryptography. No post-quantum proposal has been identified.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
