# Bitcoin Cash (BCH) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Bitcoin Cash |
| **Ticker** | BCH |
| **Website** | <https://bitcoincash.org> |
| **GitHub** | <https://github.com/bitcoincashorg> |
| **Derived from** | Bitcoin |
| **On-chain environment** | Bitcoin Script (with BCH extensions) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | C | 🗺️ | Roadmapped |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Bitcoin Cash forked from Bitcoin before SegWit, so its baseline cryptographic surface differs in places: there is no Taproot, no native Schnorr per [BIP-340](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki) (BCH adopted its own Schnorr variant in May 2019, on the same secp256k1 curve), and no [BIP-324](https://bips.dev/324/) v2 transport. The chain extended Bitcoin Script with native introspection opcodes (CHIP-2021-02, May 2022) and CashTokens (May 2023) for fungible and non-fungible token primitives.

The most concrete PQC work is [Quantumroot](https://news.bitcoin.com/quantumroot-debuts-on-bitcoin-cash-first-post-quantum-vault-on-bitcoin-script/), a hash-based vault primitive using **LM-OTS** (Leighton-Micali One-Time Signatures, SHA-256–based) developed by Jason Dreyzehner. Quantumroot is already deployed on Chipnet (BCH's preview network), with mainnet activation planned for May 2026. It targets 256-bit classical / 128-bit quantum security and is structured as opt-in vaults rather than a chain-wide signature replacement.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **LM-OTS** (Leighton-Micali One-Time Signatures, SHA-256–based) | ECDSA secp256k1, Schnorr secp256k1 (vault scope) | On-Chain (Quantumroot vaults) | Roadmapped (Chipnet live; mainnet activation planned May 2026) |

## 1. Transaction Signatures

**Grade: F ❌**

Bitcoin Cash signs transactions with ECDSA secp256k1 by default, with optional [Schnorr signatures (BCH variant, May 2019)](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/2019-05-15-schnorr.md) on the same secp256k1 curve. The BCH Schnorr implementation differs from Bitcoin's BIP-340: it is a fixed 65-byte format, does not introduce Taproot, and does not provide tapscript or pay-to-taproot output types. Both ECDSA and Schnorr remain quantum-vulnerable. We have found no public information indicating migration activity for the chain-level transaction signature scheme.

Quantumroot (see On-Chain Logic) is an opt-in vault primitive, not a chain-wide signature-scheme replacement; it covers funds locked into vault scripts rather than ordinary P2PKH or multisig spends.

**Current state.** ECDSA secp256k1 + BCH Schnorr (non-BIP340), both on secp256k1.

**Planned future work.** No CHIP currently proposes a chain-wide PQ transaction signature scheme.

## 2. Consensus

**Grade: A ✅**

Bitcoin Cash inherits Bitcoin's [SHA-256d Proof-of-Work](https://minisatoshi.cash/upgrade-history) consensus and ASIC mining hardware. The difficulty adjustment uses the Adaptive Moving Average Scheme (AMAS), retargeting roughly every 600 seconds. PoW is hash-based; mining is unaffected by Shor's algorithm and Grover's algorithm at most halves SHA-256 preimage strength. There is no validator key material in the consensus layer.

**Current state.** SHA-256d PoW with AMAS difficulty. Hash-based.

**Planned future work.** None needed for the consensus layer.

## 3. P2P Networking

**Grade: F ❌**

BCH inherits the legacy pre-BIP-324 Bitcoin P2P protocol — plaintext, unauthenticated TCP connections with secp256k1 node identity and protocol version 70015+. BCHN v24.0.0+ supports `addrv2` / `sendaddrv2` for longer address formats (Onion V3, I2P) but does not encrypt connections. BCHN v28.0.0 (May 2025) added per-peer bandwidth rate-limiting via `-peerratelimit`, a DoS mitigation rather than a cryptographic transport upgrade. [BIP-324](https://bips.dev/324/) v2 transport — Bitcoin Core's opportunistic encryption layer using ElligatorSwift ECDH — has not been adopted. Even if it were, ECDH is itself quantum-vulnerable.

**Current state.** Plaintext v1 P2P, secp256k1 node identity, no transport encryption.

**Planned future work.** No CHIP, working-group thread, or release plan describes a PQ transport for BCH.

## 4. On-Chain Logic

**Grade: C 🗺️**

Bitcoin Cash extended Bitcoin Script in two material directions. [CHIP-2021-02 (May 2022)](https://reference.cash/protocol/forks/chips/2022-05-native-introspection-opcodes) added 15 native introspection opcodes (codepoints 0xc0–0xcf), including OP_UTXOBYTECODE and OP_ACTIVEBYTECODE, enabling contracts to read and verify script conditions without extra hashing layers. [CashTokens (May 2023)](https://cashtokens.org/docs/spec/chip/) added fungible and non-fungible token primitives — token category IDs are derived from UTXO position rather than from EC primitives, with NFT commitments structured as hash-based attestations issued under ECDSA / Schnorr keys.

[Quantumroot](https://blog.bitjson.com/quantumroot-on-chipnet/) is the active PQC work in this category. It implements **LM-OTS** (Leighton-Micali One-Time Signatures) using SHA-256 — hash-based, quantum-resistant — packaged as opt-in smart-contract vaults. Quantumroot has been deployed and tested on Chipnet (BCH's preview network); mainnet activation is planned for May 2026. Public material reports cost on the order of 100–1,000× lower than equivalent Ethereum vault constructions. Quantumroot does not introduce a general PQ-signature precompile; it operates inside Script using existing primitives.

**Current state.** ECDSA / Schnorr verification through OP_CHECKSIG and OP_CHECKMULTISIG; native introspection opcodes; CashTokens primitives. No PQ verification precompile.

**Planned future work.** Quantumroot mainnet activation planned for May 2026. No chain-wide PQ-signature opcode has been proposed.

## 5. Other Features

### CashFusion (privacy layer)

**Current state.** [CashFusion](https://cashfusion.org/) is a non-custodial privacy protocol launched in 2019 (final tests completed March 2026). Each user commits to inputs and outputs through ECDSA / Schnorr signatures; a Tor-routed coordination server orchestrates rounds without learning the linkage between coins. The cryptographic commitments are EC-based; a quantum break would let an adversary trace coin trails and retroactively deanonymize the historical CashFusion ledger. No PQ alternative to the signature-commitment scheme is currently published.

**Planned future work.** None published.

### CashTokens (token layer)

**Current state.** CashTokens fungible and non-fungible primitives derive token category IDs from UTXO position (not EC). Issuer authority over NFT commitments is exercised through ECDSA / Schnorr signatures, so token issuance remains exposed to the chain-level signature scheme.

**Planned future work.** None published. Token-issuance security tracks the chain-level signature scheme.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Bitcoin Cash's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ✅, P2P ❌, On-Chain 🗺️, Other ❌.

Bitcoin Cash has no published plan to retire elliptic-curve cryptography. The chain adopted Schnorr alongside ECDSA in 2019, both on secp256k1 — additive rather than substitutive — and the Quantumroot path is structured as opt-in vaults, again additive. There is no equivalent to Bitcoin's [BIP-361](https://github.com/bitcoin/bips/blob/master/bip-0361.mediawiki) sunset proposal in the BCH CHIP repository.

**Current state.** No EC retirement scheduled.

**Planned future work.** None published.

## Governance

Bitcoin Cash protocol changes are coordinated through the [CHIP (Cash Improvement Proposal) process](https://github.com/bitcoincashorg/bitcoincash.org), with implementation across multiple node implementations (Bitcoin Cash Node, Bitcoin ABC, Bitcoin Unlimited). Changes activate through coordinated annual upgrades when CHIPs reach community consensus. Discussion happens on [Bitcoin Cash Research](https://bitcoincashresearch.org/) and the chain's CHIP repositories.

PQ-relevant work currently visible:

- [Quantumroot (LM-OTS vaults)](https://news.bitcoin.com/quantumroot-debuts-on-bitcoin-cash-first-post-quantum-vault-on-bitcoin-script/) — deployed on Chipnet (preview network); mainnet activation planned for May 2026. Authored by Jason Dreyzehner.
- [Bitcoin Cash Research thread on PQC](https://bitcoincashresearch.org/t/post-quantum-cryptography/845) — community discussion thread on post-quantum cryptography options for BCH.

PQ-adjacent work (existing EC-based primitives):

- [BCH Schnorr spec (May 15, 2019)](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/2019-05-15-schnorr.md) — Schnorr on secp256k1. Final. Not PQ.
- [CHIP-2021-02](https://reference.cash/protocol/forks/chips/2022-05-native-introspection-opcodes) — native introspection opcodes. Activated May 2022. Not PQ.
- CHIP-2022-02 (CashTokens) — fungible / non-fungible token primitives. Activated May 2023. Not PQ.

No chain-wide PQ-signature CHIP has been proposed.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
