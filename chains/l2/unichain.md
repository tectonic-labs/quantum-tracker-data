# Unichain (UNI) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Unichain |
| **Ticker** | UNI |
| **Website** | https://unichain.org |
| **Stack** | OP Stack |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | Fraud proofs (Cannon — RISC-V / MIPS bisection game) |
| **Sequencer model** | Centralized (Uniswap Labs) |
| **On-chain environment** | EVM (EVM-equivalent) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | B | 🔧 | In Development |
| Data Availability | C | 🗺️ | Roadmapped |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Overview

Unichain is a Superchain member built on the OP Stack and operated by Uniswap Labs. It is optimized for high-frequency decentralized exchange activity and uses Ethereum blobs (EIP-4844) as its data availability layer. As a standard OP Stack deployment, Unichain inherits virtually all of its cryptographic properties — and therefore its PQC posture — directly from the OP Stack baseline. Uniswap Labs has made no deployment-specific cryptographic modifications that affect the PQC evaluation; the DeFi-oriented sequencer optimizations are application-layer policy changes only.

Unichain's best category is Settlement Layer, which benefits from Ethereum's active PQC migration work (rated 🔧 In Development). Data Availability earns a roadmap rating because Ethereum's EIP-4844 blob attestation replacement crypto is on Ethereum's roadmap, but no replacement has been defined or shipped yet. Every other category — proof system, transaction signatures, networking, on-chain environment, and bridge governance — has no PQC migration activity, either from OP Labs (who develops the stack) or from Uniswap Labs (who operates this deployment). The Security Council and bridge output root proposer keys that govern Unichain's upgrade path are all standard EC (secp256k1). No PQC discussions from Uniswap Labs have been located.

## Proposed and Implemented PQC Algorithms

Unichain does not currently propose or implement any post-quantum cryptographic algorithms.

## Category Details

### Settlement Layer

**Grade: B 🔧**

Unichain settles to Ethereum L1. Ethereum has active post-quantum cryptography research and development in progress — validator attestation signature replacement (leanSig), transaction signature migration, and related work — placing Ethereum at a "B" in-development tier. Unichain inherits this rating for its settlement layer, though the L2 cannot exceed the security of its parent chain.

OP Stack-specific settlement mechanics add additional EC exposure on top of Ethereum's base: output root proposals and dispute game bonds are submitted by EC-keyed Ethereum accounts, and the upgrade admin is a 2-of-2 multisig (Optimism Foundation + Security Council) using standard EC keys. These L2-specific EC keys are not part of Ethereum's own PQC migration plan and have no retirement schedule.

### Data Availability

**Grade: C 🗺️**

Unichain publishes transaction data to Ethereum as EIP-4844 blobs. The blob attestation mechanism relies on BLS signatures over BLS12-381, which is quantum-vulnerable. Ethereum's roadmap includes replacing the blob attestation cryptography, but the replacement algorithm has not been defined or implemented — it is a roadmap item only, not in active development. This earns a "C / Roadmapped" grade.

Unichain uses only Ethereum blobs for DA; it does not use any alternative DA layer. This means the DA rating is straightforwardly inherited from Ethereum's blob path with no additional exposure.

### Proof / Verification

**Grade: F ❌**

Unichain uses the OP Stack's Cannon fault proof system. Cannon's internal execution trace is MIPS/RISC-V based and its bisection logic is hash-based (Keccak), which is quantum-resistant in isolation. However, the output roots that anchor the entire dispute game are proposed and signed by EC (secp256k1) keys. Bonds in the dispute game are controlled by EC-keyed Ethereum accounts. A cryptographically relevant quantum computer (CRQC) could forge an output root proposer's signature, submit a fraudulent output root, and allow it to finalize — completely bypassing the fraud proof mechanism regardless of Cannon's internal hash-based design.

No plans exist to replace EC-signed output roots or add PQC-keyed proposers or challengers.

> We have found no public information indicating migration activity for Unichain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

### Transaction Signatures

**Grade: F ❌**

Unichain is EVM-equivalent. All user transactions are signed with ECDSA over secp256k1, identical to Ethereum mainnet. No PQC transaction type exists in the OP Stack protocol. ERC-4337 smart account wallets can implement PQC signature schemes at the application layer, but this does not protect the protocol-level signature scheme and does not affect this rating.

> We have found no public information indicating migration activity for Unichain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

### Networking

**Grade: F ❌**

Unichain uses a centralized sequencer operated by Uniswap Labs. The `op-node` gossip network propagates "unsafe" pre-finality blocks using libp2p with secp256k1 node identity keys. RPC connections use classical TLS with ECDHE key exchange. No PQC hybrid key exchange or PQC node identity scheme has been published for any OP Stack deployment.

The centralized sequencer means the p2p gossip layer is a propagation convenience rather than a consensus requirement, but the EC key material remains quantum-vulnerable for node impersonation and traffic interception.

> We have found no public information indicating migration activity for Unichain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

### On-Chain Environment

**Grade: F ❌**

Unichain runs a standard EVM environment. The precompile set matches Ethereum mainnet: `ecrecover` (0x01), `ecAdd`/`ecMul`/`ecPairing` over BN254 (0x06–0x08), and others. No PQC verification precompile (ML-DSA, Falcon, SPHINCS+, or equivalent) exists on Unichain mainnet, testnet, or behind a feature flag.

> We have found no public information indicating migration activity for Unichain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

### Other Features

**Grade: F ❌**

**StandardBridge and CrossDomainMessenger**: L2-to-L1 withdrawals require a 7-day challenge period anchored to an output root. That root is proposed and EC-signed by the designated output root proposer. A CRQC could forge the proposer's signature, submit a fraudulent output root, and drain bridge funds after the window closes. The withdrawal proof itself is a Merkle proof (hash-based), but its security depends entirely on the EC-signed root it anchors to.

**Security Council 2-of-2 multisig**: The Optimism Foundation and Security Council jointly control the Safe multisig that governs OP Stack contract upgrades across the Superchain. All signers use standard EC keys. A CRQC that can forge either signer's key could unilaterally upgrade or drain all Superchain bridge contracts, including Unichain's.

**Guardian role**: An EC-keyed address with the ability to pause the bridge and dispute game factory in emergencies. EC-vulnerable in the same way as the Security Council.

> We have found no public information indicating migration activity for Unichain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

### EC Sunset

**Grade: F ❌**

No PQC discussions from Uniswap Labs have been located, and OP Labs (the OP Stack developer) has published no EC retirement plan for any OP Stack component.

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Settlement 🔧, DA 🗺️, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

## Governance

Unichain governance follows the Optimism Collective model. Protocol upgrades to the OP Stack require Token House approval and are subject to Security Council veto. The 2-of-2 multisig (Optimism Foundation + Security Council) can act unilaterally in emergencies. Uniswap Labs operates the Unichain sequencer and output root proposer under this shared governance framework.

No PQC-related proposals have been submitted to the Optimism governance forum (gov.optimism.io) or the OP Stack specs repository.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
