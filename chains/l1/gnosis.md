# Gnosis (GNO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Gnosis |
| **Ticker** | GNO |
| **Website** | https://www.gnosischain.com/ |
| **GitHub** | https://github.com/gnosischain |
| **Twitter / X** | https://x.com/gnosischain |
| **Derived from** | Ethereum |
| **On-chain environment** | EVM |
| **Current mainnet version** | Fusaka (activated 2026-04-14, epoch 1714688) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Gnosis Chain is an Ethereum-aligned EVM L1 that tracks Ethereum hard forks closely but activates them independently, typically weeks to months later. It uses a Gnosis Beacon Chain (GBC) functionally equivalent to the Ethereum Beacon Chain, with the same BLS12-381 validator signatures, RANDAO, and finality mechanism. The execution layer is an unmodified Geth fork. Gnosis's [documentation](https://docs.gnosischain.com/about/networks/) reflects no independent PQC research or roadmap; the chain's PQC posture is entirely inherited from Ethereum's trajectory.

One application-layer note: a third-party provider, [QuantumSafe](https://www.qsafe.dev/), offers post-quantum migration tooling for Safe (Gnosis Safe) multisig wallets — a common treasury mechanism for DAOs on Gnosis. This is application-layer tooling, not protocol-level PQC.

## Proposed and Implemented PQC Algorithms

> Gnosis does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Gnosis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Gnosis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Gnosis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Gnosis in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

Gnosis does not support any special features. Unlike Ethereum, Gnosis Chain has no KZG blob commitments or other pairing-based features beyond the shared EVM precompile set.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ➖.

Gnosis has no independent PQC roadmap. Its EC sunset posture tracks Ethereum: BLS12-381 validator signatures, ECDSA secp256k1 transactions, and the standard EC precompile set are all in use with no deprecation schedule. Any EC retirement on Gnosis would follow or mirror a corresponding commitment in Ethereum itself.

**Current state.** No EC retirement plan on any layer.

**Planned future work.** None identified independently of Ethereum.

## Governance

Gnosis Chain governance is coordinated through the Gnosis core team and the validator community via [blog.validategnosis.com](https://blog.validategnosis.com/) and the [Gnosis Chain blog](https://www.gnosischain.com/blog). Protocol activation follows Ethereum's hard fork schedule with Gnosis-specific timing. The [Chiado testnet](https://gnosis-chiado.blockscout.com/) activates forks before mainnet. There is no independent Gnosis EIP equivalent; significant protocol decisions track the Ethereum process.

No PQC-relevant governance proposals have been identified from Gnosis DAO or the Gnosis development team.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
