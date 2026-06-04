# Oasis Network (ROSE) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Oasis Network |
| **Ticker** | ROSE |
| **Website** | https://oasis.net/ |
| **GitHub** | https://github.com/oasisprotocol |
| **On-chain environment** | Multi-ParaTime: Sapphire (confidential EVM), Emerald (plain EVM), Cipher (WASM) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Oasis Network is a modular proof-of-stake L1 with a two-layer architecture: a CometBFT (Tendermint lineage) consensus layer and a pluggable execution layer built around "ParaTimes" — sandboxed runtimes that can each choose their own execution environment. Production ParaTimes include Sapphire (a confidential EVM backed by Intel SGX), Emerald (a plain EVM), and Cipher (WASM). The consensus layer uses Ed25519 validator keys; Sapphire and Emerald use secp256k1 ECDSA for EVM-compatible accounts; Cipher uses Ed25519 (Oasis-style accounts). All signature schemes across all layers are elliptic curve. No post-quantum migration plan or roadmap has been published by the Oasis Foundation as of May 2026.

Sapphire's confidentiality model adds an additional dimension to the PQC risk picture. Confidentiality is enforced by Intel SGX TEEs whose attestation infrastructure relies on RSA and ECDSA certificates. A sufficiently powerful quantum computer could forge TEE attestation certificates or recover historical TEE session keys, allowing retroactive decryption of encrypted Sapphire contract state. Unlike a simple public ledger where only future transactions are at risk, confidential Sapphire transactions submitted today could be decrypted retroactively if session key material is ever exposed.

## Proposed and Implemented PQC Algorithms

> Oasis Network does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Oasis Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Oasis Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Oasis Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

> We have found no public information indicating migration activity for Oasis Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

### Sapphire confidential EVM (Intel SGX TEE)

**Current state.** Sapphire's confidentiality is enforced by Intel SGX Trusted Execution Environments. The root of trust for SGX attestation is Intel's certificate infrastructure, which relies on RSA and ECDSA. A quantum break of the underlying asymmetric schemes could allow an attacker to forge attestation certificates — enabling false claims of running approved Sapphire code — or to recover historical TEE session keys, retroactively decrypting every confidential transaction ever submitted to Sapphire. This retroactive exposure risk is analogous to the deanonymization risk that affects privacy chains: data that is confidential today was encrypted under keys that are classically secure but quantum-vulnerable.

**Planned future work.** No PQC alternative to the Intel SGX attestation root of trust has been announced by the Oasis Foundation. Intel's own roadmap for quantum-safe attestation certificates would be upstream of any Oasis action, and no Oasis-level initiative to address this exposure has been published.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for Oasis Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Oasis Network protocol upgrades are governed through off-chain coordination (the Oasis Foundation, validator forums, and GitHub) combined with on-chain upgrade proposals. Unlike most Cosmos SDK chains, there is no token-holder vote mechanism for consensus-layer upgrades; changes are proposed by the Foundation and enacted via validator coordination at specified epoch boundaries. No PQC-relevant proposals, governance discussions, or upgrade plans have been identified in any of these venues as of May 2026.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
