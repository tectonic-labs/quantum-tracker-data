# Flare (FLR) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Flare |
| **Ticker** | FLR |
| **Website** | https://flare.network/ |
| **GitHub** | https://github.com/flare-foundation |
| **Twitter / X** | https://x.com/FlareNetworks |
| **On-chain environment** | EVM |
| **Current mainnet version** | go-flare v1.13.x (activated 2026-04-14) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Flare is an EVM-compatible L1 running [Snowman++ consensus](https://build.avax.network/academy/avalanche-l1/avalanche-fundamentals/02-avalanche-consensus-intro/03-snowman-consensus) (derived from Avalanche) with a focus on data oracles and cross-chain interoperability. All core protocol components — transaction signatures, validator signing, and P2P networking — use ECDSA secp256k1 with no post-quantum alternatives deployed. Flare's research team published a [white paper on hybrid post-quantum digital signatures for the EVM](https://dev.flare.network/pdf/whitepapers/20220722-HybridPostQuantumDigitalSignatureSchemeForTheEthereumVirtualMachine.pdf) in July 2022, proposing deterministic CRYSTALS-Dilithium Level 2 (dCDL2) as a PQC signature scheme that could coexist with ECDSA. This remains a research paper with no announced implementation timeline.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **CRYSTALS-Dilithium** (dCDL2) | ECDSA secp256k1 | On-Chain | Discussed |

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Flare in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

Flare uses [Snowman++ consensus](https://build.avax.network/academy/avalanche-l1/avalanche-fundamentals/02-avalanche-consensus-intro/03-snowman-consensus), adapted from Avalanche for a Federated Byzantine Agreement topology. [Validators](https://docs.flare.network/tech/validators/) sign blocks using ECDSA secp256k1. Validator identity is based on secp256k1 public keys, and a stake-weighted Verifiable Randomness Function (VRF) is used for block leader selection. Blocks reach single-slot finality once accepted through consensus gossip.

ECDSA secp256k1 is vulnerable to Shor's algorithm. No post-quantum migration proposal exists for Flare's consensus layer. The Flare 2.0 Vision mentions expanding consensus across chains but focuses on interoperability, not quantum resistance.

**Current state.** All validator block signatures use ECDSA secp256k1. The VRF for leader selection and Merkle-based proof aggregation are hash-based components that are quantum-resistant, but block signing itself is EC-dependent.

**Planned future work.** None documented for consensus-layer PQC.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Flare in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: D ⚠️**

Flare runs a full [EVM](https://dev.flare.network/network/overview) with standard Ethereum precompiles: ecrecover, ecAdd, ecMul, and ecPairing (BN254). Hash precompiles include SHA-256 and Keccak-256. No PQC signature verification is deployed on-chain.

The Flare research team published a [white paper](https://dev.flare.network/pdf/whitepapers/20220722-HybridPostQuantumDigitalSignatureSchemeForTheEthereumVirtualMachine.pdf) in July 2022 proposing a hybrid post-quantum digital signature scheme for the EVM. The paper describes how deterministic **CRYSTALS-Dilithium** Level 2 ([dCDL2](https://eprint.iacr.org/2017/633.pdf)) signatures could coexist with ECDSA in smart contracts. The proposed approach stores only a signHash on-chain (a compressed representation) to save storage, while verifying dCDL2 + ECDSA signatures off-chain or as a smart contract. Future implementation could include adding a dedicated precompile for PQC signature verification.

**Current state.** Standard EVM EC precompiles only. No PQC verification capability is deployed.

**Planned future work.** The 2022 white paper proposes hybrid PQC-EVM integration, but no implementation timeline, EIP-style proposal, or testnet deployment has been announced.

## 5. Other Features

**Grade: F ❌**

### FTSO (Flare Time Series Oracle)

The [FTSO](https://flare.network/products/flare-time-series-oracle) is a decentralized data oracle providing [time-series data feeds](https://dev.flare.network/ftso/overview) every 1.8 seconds. It uses a stake-weighted VRF for provider selection and Merkle trees for commitment and proof summarization — both hash-based and quantum-resistant. However, data providers sign Merkle roots using ECDSA, making the provider authentication layer quantum-vulnerable.

**Current state.** Hash-based components (VRF, Merkle trees) are quantum-safe. Provider authentication uses ECDSA.

**Planned future work.** No public roadmap for FTSO PQC migration.

### State Connector (Cross-Chain Proof Verification)

The [State Connector](https://flare.network/state-connector-recap/) enables Flare to reach consensus on external blockchain state. [Attestation Providers](https://flare.rocks/stateconnector/) submit proofs of cross-chain events in commit-reveal rounds, with results summarized as Merkle tree roots. The Merkle proof system is hash-based and quantum-safe, but provider authentication is assumed to use ECDSA.

**Current state.** Hash-based proof summarization is quantum-safe. Provider identity/signing is EC-dependent.

**Planned future work.** None documented.

### FAssets (Wrapped Assets Bridge)

[FAssets](https://dev.flare.network/fassets/overview) is a trustless, over-collateralized [bridge](https://flare.network/products/fassets) enabling minting of wrapped versions of BTC, DOGE, XRP, and other assets on Flare. It depends on FTSO for price feeds, State Connector for cross-chain proof of transactions, and a multi-signature scheme for Core Vault security. All cryptographic components are EC-based. If FTSO or State Connector signatures break, false asset minting or redemption could occur.

**Current state.** FAssets depends on FTSO, State Connector, and multi-sig — all currently EC-based.

**Planned future work.** None documented.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ⚠️, Other ❌.

The 2022 [white paper](https://dev.flare.network/pdf/whitepapers/20220722-HybridPostQuantumDigitalSignatureSchemeForTheEthereumVirtualMachine.pdf) proposes a hybrid approach — adding **CRYSTALS-Dilithium** signatures alongside ECDSA for backward compatibility — but no official deprecation timeline or hard fork plan has been announced. No updated roadmap has been published since the white paper's release in July 2022.

**Current state.** ECDSA secp256k1 is embedded in every protocol layer. The 2022 white paper remains the only published research on PQC integration.

**Planned future work.** None beyond the 2022 white paper. No EVM precompile proposal, sunset date for ECDSA-only transactions, or PQC algorithm selection process has been initiated.

## Governance

Flare governance is led by the [Flare Foundation](https://flare.network/) with community input via forum discussions. There is no formal on-chain voting process documented for protocol changes, and no EIP/CIP-style numbering system for proposals.

PQC-related governance activity consists of:

- **Hybrid Post-Quantum Digital Signature Scheme for EVM** — A research [white paper](https://dev.flare.network/pdf/whitepapers/20220722-HybridPostQuantumDigitalSignatureSchemeForTheEthereumVirtualMachine.pdf) published July 22, 2022, proposing dCDL2 (deterministic CRYSTALS-Dilithium Level 2) as a PQC option for EVM smart contracts.
- **Flare 2.0 Vision** — Announced approximately 2024-2025, focusing on consensus expansion and interoperability. No explicit PQC inclusion mentioned.

No public PQC roadmap or implementation timeline has been announced.

---

_Generated on 07 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
