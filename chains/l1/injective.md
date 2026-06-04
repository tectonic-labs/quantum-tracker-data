# Injective (INJ) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Injective |
| **Ticker** | INJ |
| **Website** | https://injective.com |
| **GitHub** | https://github.com/InjectiveLabs |
| **On-chain environment** | MultiVM: CosmWasm + inEVM (native EVM layer) |

## Summary Table

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Summary

Injective is a Cosmos SDK + CometBFT Layer-1 specialized for decentralized finance, running a native exchange and derivatives matching engine as Cosmos SDK modules. It supports a **MultiVM** runtime combining CosmWasm (Rust smart contracts) and a native EVM layer called **inEVM**, introduced in 2024. The INJ token serves as the staking, gas, and governance token. The single canonical client, `injectived`, is maintained by Injective Labs.

All transaction and consensus signing uses the Cosmos SDK and CometBFT defaults: secp256k1 ECDSA for user accounts and Ed25519 for validator block-signing keys. Both CosmWasm and inEVM expose only EC-based signature verification primitives. Bridges connecting Injective to other networks — Peggy (Cosmos⇄Ethereum validator multisig) and Wormhole (guardian-set EC signatures) — are also EC-based. We have found no published PQC migration plan from Injective Labs across any evaluation category as of the date of this report.

## Proposed and Implemented PQC Algorithms

> Injective does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for Injective in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

> We have found no public information indicating migration activity for Injective in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for Injective in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

Injective's MultiVM runtime provides two execution environments:

- **CosmWasm** runs Rust-based smart contracts and exposes host functions for secp256k1 and Ed25519 signature verification and hashing. No post-quantum verification host function is available.
- **inEVM** (native EVM) exposes the standard Ethereum precompile set including `ecrecover`, BN254 add/mul/pairing, and EIP-2537 BLS12-381 ops if enabled. No PQC verification precompile is available.

**Current state.** Both CosmWasm and inEVM provide EC-only signature verification. No post-quantum primitive has been proposed for either environment.

**Planned future work.** None published.

## Other Features

**Grade: F ❌**

### Native Exchange and Derivatives Modules

Injective's on-chain orderbook, matching engine, and binary-options markets are implemented as Cosmos SDK modules rather than smart contracts. Their cryptographic exposure flows from the validator-signing layer covered under Consensus; no independent cryptographic primitive is specific to these modules.

**Current state.** Exchange module security derives from CometBFT validator signatures. No independent PQ mitigation is proposed.

**Planned future work.** None published.

### Bridges

Injective connects to external networks via:

- **Peggy** — a Cosmos-to-Ethereum bridge secured by a validator-set multisig over EC keys.
- **Wormhole** — a cross-chain messaging protocol secured by a guardian-set of EC-signed attestations.
- **IBC** — standard CometBFT light-client proofs over Ed25519 validator signatures.

All three bridge mechanisms are EC-based and quantum-vulnerable. A quantum adversary capable of forging the relevant signatures could redirect or forge cross-chain messages.

**Current state.** All bridges use EC-based attestation. No post-quantum alternative has been proposed for any bridge mechanism.

**Planned future work.** None published.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for Injective in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Injective protocol changes are coordinated through on-chain governance proposals (`MsgSoftwareUpgrade`) that schedule upgrades at a future block height; the Cosmovisor process on each validator node handles the binary swap. Recent upgrades include IIP-632 (v1.19.0, April 2026) and the Vulcan proposal (submitted approximately June 2026).

The `injectived` client and governance discussions are maintained by Injective Labs at the [InjectiveLabs GitHub organization](https://github.com/InjectiveLabs). Readers tracking active governance can follow the [Injective Hub governance portal](https://hub.injective.network/) and the InjectiveLabs GitHub organization. No PQC-relevant governance proposal has been identified in the public record.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
