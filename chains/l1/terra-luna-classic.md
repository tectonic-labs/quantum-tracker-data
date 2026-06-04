# Terra Luna Classic (LUNC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Terra Luna Classic |
| **Ticker** | LUNC |
| **On-chain environment** | CosmWasm |
| **Mainnet genesis** | 2019-04-23 |
| **Current mainnet version** | terrad v4.0.1 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Terra Luna Classic is the community-maintained continuation of the original Terra chain following the May 2022 algorithmic-stablecoin collapse. Terraform Labs migrated forward to a separate chain; the original chain continues under community governance led by the L1 Joint Task Force (L1TF). It remains a Cosmos SDK / CometBFT PoS L1 with CosmWasm smart contracts. Post-collapse work has focused on aligning with current Cosmos SDK and CometBFT versions, patching security vulnerabilities, and improving LUNC burn mechanics — no post-quantum cryptography roadmap has been published.

## Proposed and Implemented PQC Algorithms

Terra Luna Classic does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Terra Luna Classic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Terra Luna Classic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Terra Luna Classic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Terra Luna Classic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### IBC Interconnect and Market Module 2.0

**Current state.** Terra Luna Classic uses IBC for cross-chain communication, relying on standard CometBFT light-client proofs. The Market Module 2.0 (MM2) introduces strict LUNC and USTC mint controls to curb inflation. Both features are application-layer logic without additional cryptographic primitives beyond the base-layer EC signatures.

**Planned future work.** No post-quantum migration plan has been published for IBC or application-layer modules.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Terra Luna Classic's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Terra Luna Classic in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Terra Luna Classic uses the Cosmos SDK `x/gov` module. Governance proposals require a community deposit and a voting period (typically approximately 7 days); they pass with a supermajority of Yes votes and quorum requirements. The L1 Joint Task Force (L1TF) is the primary funded development group; no Terraform Labs involvement remains. Upgrade coordination happens through the Terra Classic governance forums and the community governance portal.

No PQC-related governance proposals have been identified as of the most recent research pass.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
