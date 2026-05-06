# Bitcoin (BTC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Bitcoin |
| **Ticker** | BTC |
| **GitHub** | <https://github.com/bitcoin> |
| **On-chain environment** | Bitcoin Script |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | C | 🗺️ | Roadmapped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | -- | -- | Not Applicable |
| EC Sunset | D | ⚠️ | Discussed |

Bitcoin's PQC migration sits at the proposal stage. Two BIP-numbered drafts define complementary halves of a path: [BIP-360](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki) (Pay-to-Merkle-Root) introduces a quantum-resistant output type, and [BIP-361](https://github.com/bitcoin/bips/blob/master/bip-0361.mediawiki) (Post Quantum Migration and Legacy Signature Sunset) phases out classical ECDSA/Schnorr spends after a separate PQ signature BIP activates. Neither has a soft-fork activation timeline. Reference sites: [bip360.org](https://bip360.org/), [bip361.org](https://bip361.org/).

The most concrete implementation work is happening off Bitcoin Core: [BTQ Technologies' Bitcoin Quantum Testnet v0.3.0](https://www.prnewswire.com/news-releases/btq-technologies-announces-first-deployment-of-bip-360-on-bitcoin-quantum-testnet-v0-3-0--302718592.html) deployed a working BIP-360 implementation in March 2026 with five **ML-DSA** signature opcodes in tapscript. That work is on a third-party fork, not Bitcoin Core's testnet, signet, or regtest, so it demonstrates feasibility without locking in the algorithms or output formats for the mainnet path.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** (Dilithium / FIPS 204) | ECDSA secp256k1, Schnorr secp256k1 | Tx Signatures, On-Chain | In Development (BTQ third-party fork only) |
| **Falcon / FN-DSA** | ECDSA secp256k1, Schnorr secp256k1 | Tx Signatures, On-Chain | Discussed (named in earlier BIP-360 drafts; algorithm spec factored out) |
| **SLH-DSA** (SPHINCS+) | ECDSA secp256k1, Schnorr secp256k1 | Tx Signatures, On-Chain | Discussed (named in earlier BIP-360 drafts; Project Eleven's "Quantum-Safe Taproot" SLH-DSA fallback) |
| **WOTS+** (Winternitz one-time) | Schnorr secp256k1 | On-Chain | Discussed (conduition's OP_CAT-Winternitz construction; Kudinov & Nick paper) |

## 1. Transaction Signatures

**Grade: C 🗺️**

Bitcoin transactions today are signed with ECDSA secp256k1 (legacy and SegWit v0) or Schnorr secp256k1 (Taproot, [BIP-340](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)). Both are broken by Shor's algorithm. Bitcoin has a partial natural defense — funds in hash-based addresses (P2PKH, P2WPKH) do not reveal the public key until first spend — but Taproot outputs reveal the x-only pubkey in the output itself, and address reuse is widespread. [Per Casa data cited in BIP-361](https://www.coindesk.com/tech/2026/04/15/bitcoin-developers-are-trying-to-build-quantum-defenses-your-coins-could-pay-the-price), over 34% of all bitcoin had revealed a public key on-chain as of 2026-03-01.

Two BIPs define the published path. [BIP-360](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki) (P2MR, formerly P2QRH/P2TSH) introduces a SegWit v3 output type with `bc1z` bech32m addresses that commits to a tapleaf merkle root rather than a key, so the spending public key is revealed only at spend time inside a script. Earlier drafts named **Falcon**, **ML-DSA**, and **SLH-DSA** explicitly; the algorithm specification was [factored out](https://delvingbitcoin.org/t/changes-to-bip-360-pay-to-quantum-resistant-hash-p2qrh/1811) into a separate future BIP so P2MR could be debated independently of algorithm selection. [BIP-361](https://github.com/bitcoin/bips/blob/master/bip-0361.mediawiki) (the legacy signature sunset) defines a two-phase wind-down of ECDSA/Schnorr spends gated on a separate PQ signature BIP being live.

The most concrete implementation is [BTQ Bitcoin Quantum Testnet v0.3.0](https://thequantuminsider.com/2026/03/20/btq-technologies-implements-bip-360-quantum-resistant-bitcoin-transactions-testnet/), which ships full P2MR consensus with five **ML-DSA** signature opcodes enabled in the P2MR tapscript context. This is a separate fork, not Bitcoin Core's testnet, signet, or regtest, and there is no Bitcoin Core PR or feature flag wiring PQC sigs into the production codebase.

**Current state.** Mainnet transactions are exclusively ECDSA/Schnorr secp256k1. No Bitcoin Core test network runs PQC transactions. A third-party fork (BTQ's Bitcoin Quantum Testnet) does, end-to-end, with **ML-DSA** opcodes.

**Planned future work.** Both BIPs remain in Draft. Activation requires a soft-fork mechanism (BIP-9 / BIP-8 / Speedy Trial / UASF); no fork has been scheduled or signaled.

## 2. Consensus

**Grade: A ✅**

Bitcoin's consensus is Nakamoto PoW: miners do not sign blocks, validator identity does not exist in the traditional sense, and there is no randomness beacon — block selection is determined by a PoW race using SHA-256d. Hash functions are not broken by Shor; Grover's algorithm provides at most a quadratic speedup against SHA-256, reducing 256-bit security to roughly 128-bit, which remains secure. Difficulty adjustment would absorb any marginal quantum mining advantage.

**Current state.** Mining and block validation are entirely hash-based. No EC cryptography is involved in the consensus mechanism itself.

**Planned future work.** None needed for the consensus layer specifically.

## 3. P2P Networking

**Grade: F ❌**

Bitcoin's v2 transport encryption ([BIP-324](https://github.com/bitcoin/bips/blob/master/bip-0324.mediawiki), shipped in Bitcoin Core 26.0 and default-enabled in 27.0) uses an ElligatorSwift ECDH handshake on secp256k1 followed by ChaCha20-Poly1305. Pre-BIP-324 connections are unencrypted plaintext. Both are vulnerable: the ECDH handshake is broken by Shor, and unencrypted v1 traffic offers no protection at all.

BIP-324 explicitly reserves transport versioning hooks for "post-quantum cryptography upgrades to the handshake," but no concrete post-quantum handshake proposal currently exists.

**Current state.** secp256k1-based ECDH at the handshake; no PQ alternatives drafted.

**Planned future work.** No BIP, mailing-list thread, or specification is currently published for PQ transport encryption. BIP-324 itself was a multi-year effort that only recently achieved majority adoption; replacing its handshake is comparable in scope.

## 4. On-Chain Logic

**Grade: D ⚠️**

Bitcoin Script offers OP_CHECKSIG / OP_CHECKSIGVERIFY (ECDSA, Schnorr), OP_CHECKMULTISIG (legacy ECDSA only), and OP_CHECKSIGADD (Tapscript). Hash opcodes include SHA-256, double SHA-256, RIPEMD-160, and OP_HASH160. No opcode currently verifies any PQC signature scheme on Bitcoin Core mainnet, signet, or testnet.

Several draft proposals target this gap. BIP-360 P2MR introduces PQC verification scoped to the new output type rather than as a standalone opcode. [OP_TWEAKADD](https://groups.google.com/g/bitcoindev/c/Aee8xKuIC2s) and EC_POINT_ADD are competing draft BIPs offering finer-grained EC primitives that could be composed into PQ-friendly constructions. [conduition's OP_CAT + Winternitz construction](https://chaincode.com/bitcoin-post-quantum.pdf) shows hash-based **WOTS+** signatures are realisable in Script today *if* OP_CAT activates (a separate effort). Kudinov and Nick published a [late-2025 paper](https://chaincode.com/bitcoin-post-quantum.pdf) covering hash-based signature schemes adapted for Bitcoin.

**Current state.** No PQC verification on mainnet. The BTQ fork implements **ML-DSA** opcodes inside the P2MR tapscript context.

**Planned future work.** BIP-360 P2MR validation rules (gated on activation) and the [research papers and demos](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin) feeding into algorithm and opcode design. This category remains the critical path: no PQC transaction signatures can work on Bitcoin Core without corresponding on-chain validation logic.

## 5. Other Features

Bitcoin does not support any special features.

## 6. EC Sunset

**Grade: D ⚠️**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Bitcoin's PQC-adoption ratings per category are: Tx Signatures 🗺️, Consensus ✅, P2P ❌, On-Chain ⚠️, Other --.

[BIP-361](https://github.com/bitcoin/bips/blob/master/bip-0361.mediawiki) is Bitcoin's first published proposal that confronts EC retirement directly. It defines a two-phase consensus-layer sunset for legacy ECDSA/Schnorr spends, gated on a separate PQ signature BIP being live. Phase A (160,000 blocks ≈ 3 years after activation) imposes wallet-level limits on sending funds *to* legacy address types. Phase B (~2 years after Phase A) rejects ECDSA/Schnorr spends at the consensus layer unless they satisfy a quantum-safe rescue protocol. Phase C is under research and explores zero-knowledge proof of BIP-39 seed-phrase ownership for frozen-coin recovery, designed to be compatible with an [Hourglass-style](https://groups.google.com/g/bitcoindev/c/zmg3U117aNc) spending throttle.

The proposal is in Draft. There is no soft-fork activation timeline. BIP-361's stated motivation comes from [Jameson Lopp's "Against Allowing Quantum Recovery of Bitcoin"](https://blog.lopp.net/against-quantum-recovery-of-bitcoin/) (2025-03-16), which argued the network should burn quantum-vulnerable coins rather than allow extraction.

**Current state.** Consensus has no EC to sunset. P2P has neither a PQ proposal nor a retirement plan. On-Chain has no proposal to retire OP_CHECKSIG / OP_CHECKSIGADD. BIP-360 alone *adds* a PQC output type without removing existing ones; BIP-361 is the only proposal that schedules removal.

**Planned future work.** Both BIPs remain in Draft. No soft-fork activation timeline exists for either.

## Governance

Bitcoin's protocol changes follow the [BIP process](https://github.com/bitcoin/bips). Draft proposals are introduced and debated on the [bitcoindev mailing list](https://groups.google.com/g/bitcoindev) and [Delving Bitcoin forum](https://delvingbitcoin.org/). Activation requires a soft-fork mechanism (BIP-9 / BIP-8 / Speedy Trial / UASF), which has historically required years of debate and a clear majority signal.

PQ-relevant proposals on the BIP repo:

- [BIP-360](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki) — P2MR (Pay-to-Merkle-Root). Status: Draft. BIP number assigned 2024-12-18. Reference site: [bip360.org](https://bip360.org/).
- [BIP-361](https://github.com/bitcoin/bips/blob/master/bip-0361.mediawiki) — Post Quantum Migration and Legacy Signature Sunset. Status: Draft (Informational). BIP number assigned 2026-02-11. Reference site: [bip361.org](https://bip361.org/).
- [Hourglass V2](https://github.com/cryptoquick/bips/blob/hourglass-v2/bip-hourglass-v2.mediawiki) — throughput cap on P2PK spends. Hosted on a contributor fork; not yet in the bitcoin/bips repo.

Active discussion threads:

- [P2QRH / BIP-360 Update](https://mailing-list.bitcoindevs.xyz/bitcoindev/8797807d-e017-44e2-b419-803291779007n@googlegroups.com/) on the bitcoindev mailing list.
- ["Changes to BIP-360"](https://delvingbitcoin.org/t/changes-to-bip-360-pay-to-quantum-resistant-hash-p2qrh/1811) on Delving Bitcoin.
- [Original P2QRH thread](https://groups.google.com/g/bitcoindev/c/Aee8xKuIC2s) on bitcoindev.
- [Hourglass introduction](https://groups.google.com/g/bitcoindev/c/zmg3U117aNc) on bitcoindev.

Implementation tracking:

- [BTQ Bitcoin Quantum Testnet v0.3.0](https://thequantuminsider.com/2026/03/20/btq-technologies-implements-bip-360-quantum-resistant-bitcoin-transactions-testnet/) — first end-to-end BIP-360 implementation, third-party fork.

Research and overviews:

- [Chaincode Labs, "Bitcoin and Quantum Computing: Current Status and Future Directions"](https://chaincode.com/bitcoin-post-quantum.pdf) (2025).
- [Project Eleven, "A look at post quantum proposals for Bitcoin"](https://blog.projecteleven.com/posts/a-look-at-post-quantum-proposals-for-bitcoin).
- [Bitcoin Optech Newsletter #385 (2025 Year-in-Review)](https://bitcoinops.org/en/newsletters/2025/12/19/).
- ["The Post-Quantum Security of Bitcoin's Taproot as a Commitment Scheme"](https://eprint.iacr.org/2025/1307.pdf) (eprint 2025/1307).
- [Bitcoin Wiki on quantum computing threats](https://en.bitcoin.it/wiki/Quantum_computing_and_Bitcoin).

No soft fork has been scheduled or signaled for any of the above.

---

_Generated on 5 May 2026 based on information as of 5 May 2026._

_Corrections and additions: contact channel pending launch._

_Editorial policy: none currently published._
