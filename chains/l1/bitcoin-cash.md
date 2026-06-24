# Bitcoin Cash (BCH) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Bitcoin Cash |
| **Ticker** | BCH |
| **Website** | <https://bitcoincash.org> |
| **GitHub** | <https://gitlab.com/bitcoin-cash-node/bitcoin-cash-node> |
| **Twitter / X** | <https://x.com/bitcoincashorg> |
| **Derived from** | Bitcoin |
| **On-chain environment** | Bitcoin Script (with BCH extensions) |
| **Current mainnet version** | BCHN v29.0.0 / May 15 2026 upgrade (activated 2026-05-15) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | D | ⚠️ | Discussed |

Bitcoin Cash forked from Bitcoin before SegWit, so its baseline cryptographic surface differs in places: there is no Taproot, no native Schnorr per [BIP-340](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki) (BCH adopted its own Schnorr variant for [singlesig in May 2019](https://upgradespecs.bitcoincashnode.org/2019-05-15-upgrade/) and [multisig in November 2019](https://upgradespecs.bitcoincashnode.org/2019-11-15-upgrade/), on the same secp256k1 curve), and no [BIP-324](https://bips.dev/324/) v2 transport. The chain extended Bitcoin Script with native introspection opcodes ([CHIP-2021-02](https://gitlab.com/GeneralProtocols/research/chips/-/blob/master/CHIP-2021-02-Add-Native-Introspection-Opcodes.md), May 2022) and [CashTokens](https://cashtokens.org/docs/spec/chip/) (May 2023) for fungible and non-fungible token primitives. Further VM extensions — [BigInt arithmetic](https://github.com/bitjson/bch-bigint/blob/master/readme.md) ([May 2025](https://upgradespecs.bitcoincashnode.org/2025-05-15-upgrade/)), [loops](https://github.com/bitjson/bch-loops), [functions](https://github.com/bitjson/bch-functions), and [bitwise opcodes](https://github.com/bitjson/bch-bitwise) ([May 2026](https://upgradespecs.bitcoincashnode.org/2026-05-15-upgrade/)) — have made BCH's scripting VM powerful enough to implement PQC signature verification in script without dedicated opcodes.

The most concrete PQC work is [Quantumroot](https://blog.bitjson.com/quantumroot/), a hash-based vault primitive using **LM-OTS** (Leighton-Micali One-Time Signatures, SHA-256-based). Quantumroot [smart contracts are available](https://ide.bitauth.com/import-gist/60e779f718515b83fb80706e078acdb3) and deployable on mainnet since the May 2026 upgrade activation. No wallet has implemented Quantumroot yet. It targets 256-bit classical / 128-bit quantum security and is structured as opt-in vaults rather than a chain-wide signature replacement. A separate [Lamport-OTS proof-of-concept](https://dorahacks.io/buidl/36826) has also been demonstrated on BCH Script.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **LM-OTS** (Leighton-Micali One-Time Signatures, SHA-256-based) | ECDSA secp256k1, Schnorr secp256k1 (vault scope) | On-Chain (Quantumroot vaults) | Discussed (mainnet-capable since May 2026; opt-in vault construction, awaiting wallet deployment) |
| **Lamport-OTS** (Lamport One-Time Signatures, RIPEMD-160-based PoC) | ECDSA secp256k1, Schnorr secp256k1 (one-time use context) | On-Chain (smart contract) | Discussed (proof-of-concept; no wallet or dapp uses it) |

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Bitcoin Cash in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Bitcoin Cash signs transactions with ECDSA secp256k1 by default, with optional [Schnorr signatures (BCH variant, May 2019)](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/2019-05-15-schnorr.md) on the same secp256k1 curve. The BCH Schnorr implementation differs from Bitcoin's BIP-340: it is a fixed 65-byte format, does not introduce Taproot, and does not provide tapscript or pay-to-taproot output types. Both ECDSA and Schnorr remain quantum-vulnerable.

Quantumroot (see On-Chain Logic) is an opt-in vault primitive, not a chain-wide signature-scheme replacement; it covers funds locked into vault scripts rather than ordinary P2PKH or multisig spends.

**Current state.** ECDSA secp256k1 + BCH Schnorr (non-BIP340), both on secp256k1.

**Planned future work.** No CHIP currently proposes a chain-wide post-quantum transaction signature scheme.

## 2. Consensus

**Grade: A ✅**

Bitcoin Cash secures consensus with SHA-256d proof-of-work (with AMAS difficulty adjustment). Proof-of-work is hash-based, so it is not exposed to Shor's algorithm the way elliptic-curve signature schemes are — the consensus layer is quantum-resistant by construction and requires no migration.

**Current state.** SHA-256d proof-of-work; no elliptic-curve dependency in the consensus mechanism.

**Planned future work.** None required for quantum resistance at the consensus layer.

## 3. P2P Networking

**Grade: F ❌**

BCH inherits the legacy pre-BIP-324 Bitcoin P2P protocol — plaintext, unauthenticated TCP connections with secp256k1 node identity and protocol version 70015+. BCHN v24.0.0+ supports `addrv2` / `sendaddrv2` for longer address formats (Onion V3, I2P) but does not encrypt connections. BCHN v28.0.0 (May 2025) added per-peer bandwidth rate-limiting via `-peerratelimit`, a DoS mitigation rather than a cryptographic transport upgrade. [BIP-324](https://bips.dev/324/) v2 transport — Bitcoin Core's opportunistic encryption layer using ElligatorSwift ECDH — has not been adopted. Even if it were, ECDH is itself quantum-vulnerable.

**Current state.** Plaintext v1 P2P, secp256k1 node identity, no transport encryption.

**Planned future work.** No CHIP, working-group thread, or release plan describes a post-quantum transport for BCH.

## 4. On-Chain Logic

**Grade: D ⚠️**

This category rates whether the chain provides post-quantum signature verification at the same level it provides its elliptic-curve verification. Bitcoin Cash verifies EC signatures through dedicated VM opcodes (`OP_CHECKSIG` / `OP_CHECKMULTISIG`), so reaching that bar would mean either a dedicated post-quantum verification opcode or a single canonical, ecosystem-shared post-quantum script that applications reference rather than re-implement. Today BCH has neither: there is no PQ opcode (and none on a published timeline), and the hash-based options are individual constructions a developer builds themselves — exactly the kind of application-level verification this category does not credit. The work is real and chain-attributable, which is why it rates Discussed rather than lower, but it has not reached the chain-provided or canonical-tooling threshold.

Bitcoin Cash extended Bitcoin Script in two material directions. [CHIP-2021-02 (May 2022)](https://gitlab.com/GeneralProtocols/research/chips/-/blob/master/CHIP-2021-02-Add-Native-Introspection-Opcodes.md) added 15 native introspection opcodes (codepoints 0xc0-0xcf), including OP_UTXOBYTECODE and OP_ACTIVEBYTECODE, enabling contracts to read and verify script conditions without extra hashing layers. [CashTokens (May 2023)](https://cashtokens.org/docs/spec/chip/) added fungible and non-fungible token primitives — token category IDs are derived from UTXO position rather than from EC primitives, with NFT commitments structured as hash-based attestations issued under ECDSA / Schnorr keys.

[Quantumroot](https://blog.bitjson.com/quantumroot/) is the active PQC work in this category. It implements **LM-OTS** (Leighton-Micali One-Time Signatures) using SHA-256 — hash-based, quantum-resistant — packaged as opt-in smart-contract vaults. Quantumroot was tested on [Chipnet](https://blog.bitjson.com/quantumroot-on-chipnet/) (BCH's preview network) and [smart contracts are now available](https://ide.bitauth.com/import-gist/60e779f718515b83fb80706e078acdb3) for mainnet deployment following the May 2026 upgrade activation. No wallet has implemented Quantumroot yet. Quantumroot does not introduce a general post-quantum signature precompile; it operates inside Script using existing primitives.

A separate [**Lamport-OTS** proof-of-concept](https://dorahacks.io/buidl/36826) (RIPEMD-160-based Lamport One-Time Signatures) has also been demonstrated on BCH Script. The mainnet VM supports it, but no wallet or dapp uses it.

BCH's recent VM extensions — [BigInt arithmetic (May 2025)](https://upgradespecs.bitcoincashnode.org/2025-05-15-upgrade/), [loops](https://github.com/bitjson/bch-loops) and [functions (May 2026)](https://upgradespecs.bitcoincashnode.org/2026-05-15-upgrade/) — enable implementing PQC signature verification directly in script without requiring dedicated opcodes.

**Current state.** ECDSA / Schnorr verification through OP_CHECKSIG and OP_CHECKMULTISIG; native introspection opcodes; CashTokens primitives. Quantumroot LM-OTS vaults are mainnet-capable but exist as an individual vault construction not yet deployed by any wallet. No PQ verification opcode, and no single canonical PQ script shared across tooling.

**Planned future work.** Quantumroot awaits first wallet deployment. No dedicated post-quantum signature opcode has been proposed.

## 5. Other Features

### CashFusion (privacy layer)

**Current state.** [CashFusion](https://cashfusion.org/) is a non-custodial privacy protocol launched in 2019 (final tests completed March 2026). Each user commits to inputs and outputs through ECDSA / Schnorr signatures; a Tor-routed coordination server orchestrates rounds without learning the linkage between coins. The cryptographic commitments are EC-based; a quantum break would let an adversary trace coin trails and retroactively deanonymize the historical CashFusion ledger. No post-quantum alternative to the signature-commitment scheme is currently published.

**Planned future work.** None published.

### CashTokens (token layer)

**Current state.** [CashTokens](https://cashtokens.org/docs/spec/chip/) fungible and non-fungible primitives derive token category IDs from UTXO position (not EC). Issuer authority over NFT commitments is exercised through ECDSA / Schnorr signatures, so token issuance remains exposed to the chain-level signature scheme.

**Planned future work.** None published. Token-issuance security tracks the chain-level signature scheme.

## 6. EC Sunset

**Grade: D ⚠️**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Bitcoin Cash's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ✅, P2P ❌, On-Chain ⚠️, Other ❌.

Bitcoin Cash has no formal plan to retire elliptic-curve cryptography. The chain adopted Schnorr alongside ECDSA in 2019, both on secp256k1 — additive rather than substitutive — and the Quantumroot path is structured as opt-in vaults, again additive.

A [challenge-based transition protocol](https://bitcoincashresearch.org/t/quantum-resistant-bitcoin-cash-a-challenge-based-transition-protocol/1804) has been proposed on Bitcoin Cash Research. The proposal describes a commit-delay-reveal-challenge scheme that would make EC practically unusable through delay and challenge mechanisms rather than removing EC opcodes outright, keeping the migration path open indefinitely. This represents early-stage community discussion; no CHIP has been filed and no inclusion in an upgrade bundle has been proposed.

**Current state.** No EC retirement scheduled. Early-stage discussion of a challenge-based transition mechanism on Bitcoin Cash Research.

**Planned future work.** The challenge-based transition protocol remains at the discussion stage. No CHIP has been filed.

## Governance

Bitcoin Cash protocol changes are coordinated through the [CHIP (Cash Improvement Proposal) process](https://gitlab.com/im_uname/cash-improvement-proposals/-/blob/master/CHIPs.md), with implementation across multiple node implementations ([Bitcoin Cash Node](https://gitlab.com/bitcoin-cash-node/bitcoin-cash-node), [BCHD](https://github.com/gcash/bchd), [Flowee](https://codeberg.org/Flowee/thehub)). Changes activate through coordinated annual hard forks on May 15 each year when CHIPs reach community consensus. Discussion happens on [Bitcoin Cash Research](https://bitcoincashresearch.org/) and the chain's CHIP repositories.

PQ-relevant work currently visible:

- [Quantumroot (LM-OTS vaults)](https://blog.bitjson.com/quantumroot/) — [smart contracts available](https://ide.bitauth.com/import-gist/60e779f718515b83fb80706e078acdb3); mainnet-capable since May 2026 upgrade; awaiting wallet deployment. Also covered by [news.bitcoin.com](https://news.bitcoin.com/quantumroot-debuts-on-bitcoin-cash-first-post-quantum-vault-on-bitcoin-script/).
- [Lamport-OTS PoC (DoraHacks)](https://dorahacks.io/buidl/36826) — proof-of-concept Lamport One-Time Signatures on BCH Script.
- [Quantum-Resistant Bitcoin Cash: A Challenge-Based Transition Protocol](https://bitcoincashresearch.org/t/quantum-resistant-bitcoin-cash-a-challenge-based-transition-protocol/1804) — discussion-stage proposal for a commit-delay-reveal-challenge EC sunset mechanism.
- [Bitcoin Cash Research thread on PQC](https://bitcoincashresearch.org/t/post-quantum-cryptography/845) — community discussion thread on post-quantum cryptography options for BCH.

PQ-adjacent work (existing EC-based primitives):

- [BCH Schnorr spec (singlesig May 2019)](https://upgradespecs.bitcoincashnode.org/2019-05-15-upgrade/) / [multisig November 2019](https://upgradespecs.bitcoincashnode.org/2019-11-15-upgrade/) — Schnorr on secp256k1. Final. Not PQ.
- [CHIP-2021-02](https://gitlab.com/GeneralProtocols/research/chips/-/blob/master/CHIP-2021-02-Add-Native-Introspection-Opcodes.md) — native introspection opcodes. Activated May 2022. Not PQ.
- [CHIP-2022-02 (CashTokens)](https://cashtokens.org/docs/spec/chip/) — fungible / non-fungible token primitives. Activated May 2023. Not PQ.
- [CHIP-2024-07 (BigInt)](https://github.com/bitjson/bch-bigint/blob/master/readme.md), [CHIP-2021-05 (VM limits)](https://github.com/bitjson/bch-vm-limits/blob/master/readme.md) — activated [May 2025](https://upgradespecs.bitcoincashnode.org/2025-05-15-upgrade/). Not PQ but enables PQ script implementations.
- [CHIP-2021-05 (Loops)](https://github.com/bitjson/bch-loops), [CHIP-2025-05 (Functions)](https://github.com/bitjson/bch-functions) — activated [May 2026](https://upgradespecs.bitcoincashnode.org/2026-05-15-upgrade/). Not PQ but enables PQ script implementations.

No chain-wide post-quantum signature CHIP has been proposed.

---

_Generated on 22 Jun 2026 based on information as of 22 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
