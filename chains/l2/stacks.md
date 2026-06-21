# Stacks (STX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Stacks |
| **Ticker** | STX |
| **Website** | https://www.stacks.co |
| **GitHub** | https://github.com/stacks-network/stacks-core |
| **Stack** | Stacks / Proof of Transfer |
| **Settlement layer** | Bitcoin |
| **Data availability** | Bitcoin anchor blocks + Stacks P2P |
| **Proof type** | None — PoX consensus with WSTS block attestation |
| **Sequencer model** | Decentralized — PoX miners |
| **On-chain environment** | Clarity VM |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | C | 🗺️ | Roadmapped |
| Data Availability | F | ❌ | Not Discussed |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Overview

Stacks is a unique Bitcoin Layer 2 that uses Proof of Transfer (PoX) to anchor its security to Bitcoin. Unlike rollups that post transaction data and proofs to their settlement layer, Stacks miners compete by committing BTC to stackers, and the winning miner's Stacks block hash is embedded in a Bitcoin transaction. Post-Nakamoto (activated 2024), Stacks achieves Bitcoin finality: once the Bitcoin transaction containing the anchor is confirmed, the Stacks block is final.

Block validity on Stacks is guaranteed not by ZK proofs or fraud proofs, but by WSTS (Weighted Schnorr Threshold Signatures) — a FROST-based protocol producing aggregate Schnorr signatures over secp256k1. At least 70% of stacked STX weight must sign each block. This threshold signing mechanism, along with every other cryptographic layer in Stacks, relies entirely on secp256k1 elliptic-curve cryptography.

Stacks also operates sBTC, a trust-minimized 1:1 Bitcoin peg where BTC is locked in a single Taproot (P2TR) UTXO controlled by the signer set via WSTS. A cryptographically relevant quantum computer could derive the aggregate private key from the Taproot output's public key and steal all BTC locked in the sBTC peg — a catastrophic risk to the entire locked supply.

The Clarity VM, Stacks' decidable smart contract language, exposes secp256k1-verify and secp256k1-recover as built-in functions, with no PQC verification primitives available. SIP-033 (Clarity 4) adds secp256r1 support, expanding rather than reducing the EC attack surface.

No PQC research, proposals, or governance discussions have been identified anywhere in the Stacks ecosystem as of June 2026.

## Proposed and Implemented PQC Algorithms

None. No PQC algorithms have been proposed or implemented for any component of the Stacks ecosystem.

## Settlement Layer

**Grade: C 🗺️**

Stacks settles to Bitcoin via Proof of Transfer. Stacks miners submit Bitcoin transactions committing BTC to stackers, and each Stacks block hash is anchored to Bitcoin via a Bitcoin transaction. Post-Nakamoto, Stacks achieves Bitcoin finality — once the anchoring Bitcoin transaction is confirmed, the Stacks block is final.

The settlement layer's PQC posture is inherited from Bitcoin. Bitcoin has draft BIPs (BIP-360 and BIP-361) proposing post-quantum transaction types, but no mainnet activation timeline exists. PoX mining commit transactions expose miner public keys on Bitcoin L1 — the same quantum exposure as any Bitcoin UTXO with a revealed pubkey. Stacker reward addresses similarly expose secp256k1 pubkeys when spending rewards. Stacks settlement cannot be more PQC-secure than Bitcoin itself.

## Data Availability

**Grade: F ❌**

We have found no public information indicating migration activity for Stacks in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Stacks uses a hybrid DA model. Block hashes are anchored to Bitcoin via miner commit transactions (the Bitcoin anchor provides hash-based integrity via SHA-256, which is quantum-resistant at 128-bit security), but full block data is stored and propagated on the Stacks P2P network, not on Bitcoin.

Each Stacks block must be signed by a weighted threshold of stackers using WSTS (Weighted Schnorr Threshold Signatures) — a FROST-based protocol producing Schnorr signatures over secp256k1. The 70% signing threshold means at least 70% of stacked STX weight must sign. A CRQC could forge these block attestation signatures, undermining the entire DA attestation layer. The signer set rotates per reward cycle (~2100 Bitcoin blocks / ~2 weeks), with signer keys registered as secp256k1 keypairs during stacking.

## Proof / Verification

**Grade: F ❌**

We have found no public information indicating migration activity for Stacks in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Stacks does not use ZK proofs or fraud proofs. Block validity is guaranteed by PoX consensus: miners compete via Proof of Transfer, and stackers attest to block validity by producing WSTS threshold Schnorr signatures. WSTS is a variation of FROST producing aggregate Schnorr signatures over secp256k1. The aggregate public key is derived from individual stacker signing keys via distributed key generation (DKG).

A CRQC could derive the aggregate private key from the aggregate public key and forge block attestations, or derive individual signer keys to participate in DKG/signing without staking. The [WSTS implementation](https://github.com/stacks-sbtc/wsts) uses the FIRE extension for efficient DKG with weighted parties. The protocol complexity grows with the number of distinct stackers, making future migration to PQC threshold signatures nontrivial.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Stacks in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

All Stacks user transactions require secp256k1 signatures — either ECDSA (standard single-sig) or Schnorr (introduced post-Nakamoto). Transaction authorization supports single-sig and multisig modes, but both use secp256k1 key material. Stacks addresses are derived from secp256k1 public keys with a Stacks-specific version byte (C32Check encoding). The underlying key material is the same as Bitcoin.

There is no native account abstraction. Smart contracts can implement custom authorization logic in Clarity, but must ultimately be called by a secp256k1-signed transaction. A CRQC could forge transactions for any account whose public key is known (revealed on first spend). No PQC signature support exists, and no SIPs or governance discussions proposing PQC transaction signature support have been identified.

## Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Stacks in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Stacks uses a custom P2P protocol implemented in [stacks-core](https://github.com/stacks-network/stacks-core) (Rust). Nodes communicate over TCP with a custom message format — there is no use of libp2p or devp2p. The P2P stack handles peer discovery, block propagation, and signer-to-signer coordination for WSTS signing rounds.

Nodes are identified by secp256k1 public keys in the P2P network. Peer addresses include the node's public key for authentication. There is no evidence of encrypted transport (Noise, TLS, or equivalent) in the stacks-core P2P protocol; connections appear to be plaintext TCP with message-level authentication via secp256k1 signatures. The lack of encrypted transport is a concern beyond PQC — it exposes the network to passive eavesdropping even with classical adversaries. Signer-to-signer WSTS coordination (DKG rounds, signing nonces) transits the P2P network; interception could enable side-channel attacks on the threshold signing protocol.

## On-Chain Environment

**Grade: F ❌**

We have found no public information indicating migration activity for Stacks in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Stacks runs the Clarity VM — a decidable, non-Turing-complete smart contract language interpreted at runtime (not compiled to bytecode). The VM exposes several cryptographic builtins:

**EC-based builtins:**
- `secp256k1-verify` — verifies a secp256k1 signature against a message hash and public key
- `secp256k1-recover?` — recovers a secp256k1 public key from a message hash and signature
- `principal-of?` — derives a Stacks principal (address) from a secp256k1 public key

**Hash builtins:** `sha256`, `sha512`, `sha512/256`, `keccak256`, `hash160` (Bitcoin-style RIPEMD160(SHA256)) — all quantum-safe.

**Upcoming (SIP-033 / Clarity 4):** `secp256r1-verify` and `secp256r1-recover` add NIST P-256 curve support. This expands the EC attack surface rather than moving toward PQC.

No PQC signature verification primitives exist. Clarity's interpreted execution model would make large PQC signature verification (e.g., ML-DSA, Falcon) expensive without dedicated builtins, and no proposals for such builtins have been identified.

## Other Features

**Grade: F ❌**

We have found no public information indicating migration activity for Stacks in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

**sBTC (trustless Bitcoin peg):** sBTC is a 1:1 Bitcoin-pegged asset on Stacks. BTC is locked in a single UTXO on Bitcoin controlled by the signer set via WSTS; sBTC tokens are minted/burned on Stacks accordingly. The sBTC UTXO on Bitcoin is a Taproot (P2TR) address controlled by the signer set via WSTS (Weighted Schnorr Threshold Signatures over secp256k1). Peg-out requests require a threshold WSTS signature to move BTC. The aggregate public key rotates each reward cycle via DKG. A CRQC could derive the aggregate private key from the Taproot output's public key and steal all BTC locked in the sBTC peg. This is catastrophic — the entire sBTC supply would be at risk.

**PoX stacking:** STX holders lock tokens to participate in consensus and earn BTC rewards. Stacking registration includes committing a signing key for block attestation. Signing keys are secp256k1 keypairs, and reward addresses are Bitcoin addresses (secp256k1-derived). A CRQC could derive stacker signing keys from their registered public keys, enabling unauthorized participation in block signing.

## EC Sunset

**Grade: F ❌**

We have found no public information indicating migration activity for Stacks in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Settlement C 🗺️, DA F ❌, Proof F ❌, Tx Sigs F ❌, Networking F ❌, On-Chain F ❌, Other F ❌.

Stacks is deeply coupled to secp256k1 at every layer — transaction signing, block attestation (WSTS/Schnorr), sBTC peg (Taproot/WSTS), P2P identity, and on-chain verification builtins. A PQC migration would require coordinated changes across the entire stack. The addition of secp256r1 in [SIP-033 / Clarity 4](https://stacks.org/sip-033-clarity-4) moves in the opposite direction from PQC readiness, expanding rather than reducing EC dependency. Bitcoin's eventual PQC migration (BIP-360/361) would only address the settlement layer; all Stacks-specific components would need independent PQC migrations.

## Governance

Stacks governance operates through Stacks Improvement Proposals (SIPs), a structured process including draft, community review, advisory board vote, and network activation. The Stacks Foundation governs the SIP process and ecosystem grants. Hiro Systems (formerly Blockstack PBC) is the primary development company for stacks-core and the Clarity VM. Network upgrades require miner and stacker adoption — the Stacks Foundation and Hiro Systems coordinate releases, but activation is consensus-driven. No SIPs or governance discussions related to post-quantum cryptography have been identified as of June 2026.

---

_Generated on 20 Jun 2026 based on information as of 20 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
