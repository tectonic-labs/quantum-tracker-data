# Sahara AI (SAHARA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Sahara AI |
| **Ticker** | SAHARA |
| **Website** | https://saharaai.com |
| **GitHub** | https://github.com/SaharaLabsAI |
| **On-chain environment** | EVM-compatible (Cosmos SDK EVM module) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Sahara AI is a decentralized-AI Layer 1 built on the Cosmos SDK with Tendermint BFT consensus. It features a layered architecture (Application, Transaction, Data, and Execution layers) targeting AI agent registration, secure agent execution, and automated value settlement as its headline on-chain primitives. As of the information date, the full Sahara Chain mainnet is scheduled for Q4 2026; an "Agentic AppChain" mainnet preceded the full L1 launch. The chain is EVM-compatible per developer documentation.

No post-quantum cryptography roadmap, proposal, or public research has been identified for Sahara AI across any category. The cryptographic foundations are those of the Cosmos SDK and Tendermint stack — Ed25519 for validator signing, secp256k1 for transaction signing — with no modifications or stated intent to modify them for quantum resistance at the time of writing. This report will be revisited after mainnet launch when protocol-level cryptographic specifications are finalized and public.

## Proposed and Implemented PQC Algorithms

> Sahara AI does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Sahara AI in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Sahara AI in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Sahara AI in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

> We have found no public information indicating migration activity for Sahara AI in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

Sahara AI describes three flagship on-chain primitives: on-chain AI asset registration (for AI models, agents, and datasets), secure agent execution (implementation details not publicly specified as of the information date), and automatic value settlement for agent-to-agent payment routing. None of these are described in public materials as introducing new cryptographic primitives.

**Current state.** Implementation details for secure agent execution (whether it uses a TEE, a WASM sandbox, or another mechanism) have not been publicly specified as of the information date.

**Planned future work.** Mainnet Q4 2026 is expected to clarify execution-layer specifics. No PQC work has been identified in connection with any of these features.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for Sahara AI in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Sahara AI uses the Cosmos SDK governance model: SAHARA token holders vote on protocol upgrade proposals, which are executed via the Cosmos SDK `x/upgrade` module at a specified block height. Validator coordination is managed via official Sahara validator channels. Full on-chain governance is expected to activate at mainnet launch (Q4 2026).

No PQC proposals or governance discussions targeting Sahara AI have been identified in any public forum as of the information date.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
