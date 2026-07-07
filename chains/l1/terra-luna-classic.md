# Terra Luna Classic (LUNC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Terra Luna Classic |
| **Ticker** | LUNC |
| **Derived from** | Cosmos SDK / CometBFT |
| **On-chain environment** | CosmWasm |
| **Mainnet genesis** | 2019-04-23 |
| **Current mainnet version** | terrad v4.0.1 (Cosmos SDK v0.53 migration activated 2026-04-17) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Terra Luna Classic is the community-maintained continuation of the original Terra chain after the May 2022 algorithmic-stablecoin collapse — a Cosmos SDK + CometBFT proof-of-stake L1 with CosmWasm smart contracts, governed by community validators (the L1 Joint Task Force) with no Terraform Labs involvement. Its cryptography is the standard Cosmos/CometBFT stack: secp256k1 ECDSA for transactions and Ed25519 for validator and node keys, all quantum-vulnerable.

Recent development has centered on unforking the codebase, patching security issues, and the Cosmos SDK v0.53 upgrade rather than post-quantum work. The first post-quantum artifact has now appeared: an early-stage **post-quantum roadmap RFC** in the project's development repository (executive summary, a signature-scheme explainer, and a roadmap outline). It is documentation-stage — no code, no scheme selected, no scheduled upgrade — but it is the chain's first chain-attributable PQC activity.

## Proposed and Implemented PQC Algorithms

> Terra Luna Classic does not currently propose or implement any specific post-quantum cryptographic algorithms. Its post-quantum work to date is a documentation-stage roadmap RFC that has not selected a scheme.

## Transaction Signatures

**Grade: D ⚠️**

Terra Luna Classic signs transactions with secp256k1 ECDSA through the Cosmos SDK — the standard Cosmos account model, quantum-vulnerable to Shor's algorithm. There is no post-quantum signature scheme implemented or scheduled.

**Current state.** secp256k1 ECDSA via the Cosmos SDK. A post-quantum roadmap RFC has appeared in the project's development repository — an executive summary, a signature explainer, and a roadmap outline — marking the chain's first chain-attributable PQC activity. It is documentation-stage: no algorithm has been selected and no implementation exists.

**Planned future work.** The roadmap RFC scopes a future post-quantum signature direction but has not committed to a scheme or a timeline.

## Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Terra Luna Classic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Terra Luna Classic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Terra Luna Classic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

Terra Luna Classic's chain-specific features — IBC cross-chain interconnect (standard CometBFT light-client proofs) and Market Module 2.0 (mint controls and anti-inflation logic) — are application-layer and introduce no additional cryptography beyond the base Cosmos/CometBFT stack. There is no separate post-quantum-relevant cryptographic surface to migrate here.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, Terra Luna Classic's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No plan or schedule to retire elliptic-curve cryptography has been published by the Terra Classic L1 Joint Task Force or community governance. The post-quantum roadmap RFC is an adoption-side document; it does not commit to an EC retirement timeline.

## Governance

Terra Luna Classic uses on-chain governance via the Cosmos SDK `x/gov` and `x/upgrade` modules: a governance proposal sets a target block height for a coordinated chain halt, validators install the new `terrad` binary, and the upgrade activates. Proposals run through a community deposit and voting period (typically ~7 days) requiring quorum and a supermajority. Implementation is coordinated by the community-funded L1 Joint Task Force.

As of the last review, no post-quantum governance proposal has been filed on-chain. The post-quantum roadmap RFC exists in the development repository at the documentation stage and has not entered the formal on-chain governance process.

---

_Generated on 06 Jul 2026 based on information as of 06 Jul 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
