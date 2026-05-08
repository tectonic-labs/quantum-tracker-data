# Kadena (KDA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Kadena |
| **Ticker** | KDA |
| **Website** | https://kadena.io |
| **GitHub** | https://github.com/kadena-io |
| **On-chain environment** | Pact (Turing-incomplete smart contracts) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Kadena is a Proof-of-Work L1 that scales horizontally via [Chainweb](https://docs.kadena.io/), a braided multi-chain protocol in which 20 parallel chains confirm each other's blocks to form a single global view of transaction history. Mining uses a Blake2s-derived hash, so block production is hash-based and does not depend on validator signatures. Smart contracts are written in [Pact](https://docs.kadena.io/), a Turing-incomplete language with formal-verification tooling; Pact accounts use Ed25519 signatures by default with optional secp256k1 ECDSA.

The hash-based consensus layer is the only category where Kadena is quantum-safe today. Transaction signatures, P2P networking, on-chain signature primitives, cross-chain SPV-receipt authorization, external bridges, and EC retirement all sit on elliptic-curve cryptography with no migration shipped or published. We have found no PQC roadmap, proposal, or working draft from the Kadena Foundation or in the [chainweb-node repository](https://github.com/kadena-io/chainweb-node) as of the date of this report.

## Proposed and Implemented PQC Algorithms

Kadena does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Kadena in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: A ✅**

Kadena's [Chainweb](https://docs.kadena.io/) consensus is Proof-of-Work across 20 parallel chains, each producing blocks via a Blake2s-derived mining hash. Each block confirms three peer chains' blocks, forming the "braid" that gives the protocol a single global ordering while distributing mining work in parallel. Block validity is determined by solving the PoW puzzle; miners do not sign blocks with elliptic-curve keys and the protocol does not rely on validator signatures.

Hash functions are not broken by Shor's algorithm. Grover's algorithm provides at most a quadratic speedup against hash preimage search, which leaves a 256-bit-class hash with classical-equivalent security in the ~128-bit range — still secure, with difficulty adjustment absorbing any marginal quantum mining advantage.

**Current state.** Mining and block validation across all 20 Chainweb chains are entirely hash-based. No EC cryptography is involved in block production.

**Planned future work.** None needed for the consensus layer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Kadena in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

[Pact](https://docs.kadena.io/) is Turing-incomplete by design and exposes a small set of built-in cryptographic primitives, including `verify-spv` (cross-chain SPV proof verification) and Ed25519 / secp256k1 signature checks. Because Pact does expose on-chain signature-verification APIs, this category is in scope; however, the available primitives only cover EC schemes today, and we have found no PQC verification primitive proposed or merged.

**Current state.** Pact's on-chain signature primitives verify Ed25519 and secp256k1 only. No PQC verification primitive exists on mainnet.

**Planned future work.** No PQC verification primitive has been proposed for Pact in the public record.

## 5. Other Features

### Cross-chain SPV proofs (intra-Chainweb)

**Grade: F ❌**

Kadena's intra-Chainweb cross-chain transfers use SPV proofs — Merkle inclusion proofs between Chainweb chains — which are hash-based and structurally PQC-friendly. However, when an SPV receipt is consumed to authorize an asset transfer, the authorization is gated by Pact `defcap` capabilities, which themselves rely on Ed25519 / secp256k1 signatures. The Merkle proof is quantum-safe; the surrounding authorization layer is not.

**Current state.** SPV-receipt verification is hash-based; transfer authorization remains EC-signed.

**Planned future work.** No proposal has been identified to move the authorization layer to a post-quantum scheme.

### External bridges

**Grade: F ❌**

External bridges (Hyperlane, Magma, etc.) connecting Kadena to other ecosystems use validator-set signatures over elliptic-curve schemes, which are quantum-vulnerable.

**Current state.** Bridge validators sign with EC keys. No PQC bridge attestation scheme has been adopted.

**Planned future work.** No public roadmap for PQC bridge attestations has been identified.

### Pact gas stations

**Grade: ➖ Not Applicable**

Pact gas stations let third parties pay user gas on behalf of senders. Cryptographically, gas-station authorization is a standard Pact capability gated by the same Ed25519 / secp256k1 signatures used elsewhere — there is no separate cryptographic primitive specific to gas stations, so this feature does not introduce additional quantum exposure beyond what is already covered under Transaction Signatures.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Kadena's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ✅, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Kadena in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Protocol changes for Kadena are coordinated by Kadena LLC and the Kadena Foundation, with the reference implementation maintained in the [chainweb-node repository](https://github.com/kadena-io/chainweb-node) and the smart-contract language in the [Pact repository](https://docs.kadena.io/). Pact account-format changes (which would be required to introduce a PQC signature scheme) require a coordinated upgrade across the Chainweb chains.

No PQ-named KIP, RFC, or working-group thread has been identified in the public record at the date of this report.

---

_Generated on 08 May 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
