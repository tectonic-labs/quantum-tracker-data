# Mina Protocol (MINA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Mina Protocol |
| **Ticker** | MINA |
| **Website** | https://minaprotocol.com/ |
| **GitHub** | https://github.com/MinaProtocol/mina |
| **On-chain environment** | zkApps (Kimchi recursive SNARKs, Pasta curve cycle) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

[Mina Protocol](https://minaprotocol.com/) is a "succinct blockchain" — rather than storing a growing linear chain, the entire chain state is compressed into a constant ~22 KB [recursive zk-SNARK proof](https://minaprotocol.com/blog/what-are-zk-snarks) that any device can verify. Consensus is [Ouroboros Samasika](https://minaprotocol.com/blog/what-is-ouroboros-samasika) proof-of-stake; smart contracts are written as TypeScript programs compiled to [Kimchi](https://github.com/MinaProtocol/mina/blob/master/docs/specs/signatures/description.md) SNARK circuits via the o1js library. All of these depend on the Pasta cycle — a pair of elliptic curves (Pallas and Vesta) purpose-built for efficient recursive proof generation.

Because Mina uses recursive SNARKs not just as a feature but as its entire ledger format, the quantum exposure is deeper than on most other chains. A break of the discrete-log problem on the Pasta curves would allow an attacker to forge a valid SNARK proof for an arbitrary state transition, effectively rewriting chain history without any fallback to a full-transaction ledger. No PQC migration plan or EC retirement schedule has been published by Mina Foundation or O(1) Labs.

## Proposed and Implemented PQC Algorithms

> Mina Protocol does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Mina Protocol in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Mina Protocol in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Mina Protocol in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Mina's on-chain logic layer is fundamentally different from EVM chains. Smart contracts ("zkApps") are written using the [o1js TypeScript library](https://minaprotocol.com/blog/what-are-zk-snarks) and compiled to Kimchi SNARK circuits that run over the Pasta cycle (Pallas + Vesta curves). The on-chain protocol does not execute contract code; it verifies the SNARK proof and applies the proven state transition. The verifier is hardcoded to Pasta-curve operations — there is no general "signature verification primitive" surface to add PQC opcodes to in the traditional sense. Because the verification system itself is EC-based, the entire zkApp model inherits the same quantum exposure.

**Current state.** On-chain proof verification uses Kimchi/Pasta. No post-quantum proof system is available for on-chain use.

**Planned future work.** None published. Replacing the proof system would require a major protocol rewrite.

## 5. Other Features

**Grade: F ❌**

### Recursive zk-SNARKs as the Chain Ledger

Mina's most distinctive feature is that the [entire blockchain is represented as a single recursive SNARK proof](https://minaprotocol.com/wp-content/uploads/technicalWhitepaper.pdf) rather than a growing block history. The Kimchi proof system is built over the [Pasta cycle](https://github.com/MinaProtocol/mina/blob/master/docs/specs/signatures/description.md) — Pallas and Vesta curves selected specifically because each curve's scalar field is the other's base field, enabling efficient recursion. Both curves rely on the elliptic-curve discrete-log problem for their security, which is broken by Shor's algorithm.

Unlike chains that use SNARKs for specific features (privacy, rollup proofs, vote aggregation), Mina's constant-size chain means there is no full-transaction ledger to fall back on. A quantum adversary capable of forging a Pasta-curve proof could produce a SNARK that attests to an arbitrary state transition — crediting their account with the entire supply, erasing transaction history, or forging zkApp invariants — and nodes would have no alternate ground truth against which to detect the forgery.

Migrating Mina to a quantum-safe recursive proof system (such as hash-based STARKs) would require replacing Kimchi, the Pasta cycle, and the o1js compiler pipeline — a substantial research and engineering undertaking with no published timeline.

**Current state.** Recursive SNARKs (Kimchi/Pickles over Pallas/Vesta) are the entire ledger format. All proof verification is Pasta-curve-dependent.

**Planned future work.** None published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No PQC migration plan or EC retirement schedule has been published by Mina Foundation or O(1) Labs. The pending [Mesa upgrade](https://minaprotocol.com/blog/what-is-ouroboros-samasika) (as of early 2026) introduces slot-time reductions, expanded zkApp state, and an automated hard-fork mechanism; it does not address quantum cryptography. Replacing EC on Mina is a deeper problem than on most chains because the Pasta cycle is integral to the chain's constant-size property — there is no migration path that leaves the architecture intact.

**Current state.** The Pasta cycle (Pallas + Vesta) is foundational to every cryptographic surface on Mina.

**Planned future work.** None published.

## Governance

Mina Protocol uses a formal upgrade process through Mina Improvement Proposals (MIPs). Hard forks bundle one or more MIPs; recent upgrades (Berkeley, Mesa) have included on-chain community votes as a formal approval step before mainnet activation. O(1) Labs and the Mina Foundation coordinate upgrade timing, with staged testing on devnets and the Mina testnet before mainnet.

The Mesa upgrade bundled MIPs 6–9, all of which received unanimous approval in an on-chain vote in December 2025. No PQC-relevant MIP has been filed or discussed publicly.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
