# Mochimo (MCM) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Mochimo |
| **Ticker** | MCM |
| **Website** | https://mochimo.org/ |
| **GitHub** | https://github.com/mochimodev/mochimo |
| **Twitter/X** | https://x.com/mochimocrypto |
| **On-chain environment** | UTXO value transfer (no smart-contract layer) |
| **Mainnet genesis** | 2018-06-25 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Exposed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | A | ✅ | Shipped |
| EC Sunset | ➖ | ➖ | Not Applicable |

Mochimo is a post-quantum blockchain that has been quantum-resistant since its mainnet genesis on 25 June 2018. Rather than migrating away from elliptic-curve cryptography, it never used it: user transactions are signed with **WOTS+**, a hash-based one-time signature scheme, and consensus runs on a custom hash-based proof-of-work algorithm. Because the chain's security rests on hash-function properties (preimage and collision resistance) rather than the algebraic structures broken by Shor's algorithm, both its signature layer and its consensus layer are post-quantum from day one.

The chain is a pure value-transfer network — it has no smart-contract environment, no virtual machine, and no on-chain programmability — so the On-Chain Logic category does not apply. EC Sunset likewise does not apply, since there is no elliptic-curve cryptography anywhere in the protocol to retire. The one open area is P2P networking: while node identity is hash-based rather than EC-based, the post-quantum readiness of the transport-encryption layer is not documented publicly and would benefit from a cipher-suite and key-exchange audit.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **WOTS+** (Winternitz One-Time Signature Plus, RFC 8391 / FIPS 205) | n/a — used from genesis, never replaced EC | Tx Signatures | Shipped |
| **Peach** (custom hash-based proof-of-work) | n/a — used from genesis, never replaced EC | Consensus | Shipped |

## 1. Transaction Signatures

**Grade: A ✅**

Mochimo signs user transactions with **WOTS+** (Winternitz One-Time Signature Plus), a hash-based one-time signature scheme aligned with IETF RFC 8391 and NIST FIPS 205. Its security derives from hash-function properties rather than from elliptic-curve or other algebraic structures, so it is not vulnerable to Shor's algorithm. The protocol enforces one-time addresses: a public key is used exactly once and then discarded, with each transaction generating a fresh change address. This pairing of one-time signatures with mandatory one-time addresses prevents signature-reuse attacks. The chain uses a UTXO value-transfer model, so multi-signature/threshold schemes and account abstraction are not part of the design.

**Current state.** WOTS+ hash-based signatures have been in production since mainnet genesis on 25 June 2018, with one-time addresses enforced at the protocol level.

**Planned future work.** None required; WOTS+ is mature and embedded in the protocol's design.

## 2. Consensus

**Grade: A ✅**

Consensus runs on **Peach**, a custom proof-of-work algorithm designed to resist FPGA/ASIC centralization while remaining CPU/GPU-friendly. Peach is entirely hash-based: block production depends on hash computations rather than any signature scheme, so there is no elliptic-curve cryptography in mining or block validation. Finality is probabilistic under the longest-chain rule, as with other proof-of-work chains.

**Current state.** Peach proof-of-work has run since mainnet genesis on 25 June 2018. Mainnet currently operates at roughly 84-second block times following the February 2025 v3.0 hard fork.

**Planned future work.** An on-chain, stake-weighted governance vote concluded in May 2026 in favor of migrating to proof-of-stake for a future v4.0 release (the proof-of-stake option won 71.5% by stake weight). An implementation proposal is pending. If the migration proceeds, the validator-identity signature scheme for the new consensus mechanism will determine the future post-quantum status of this category — it remains to be confirmed whether it would continue to use WOTS+ or adopt another post-quantum signature scheme.

## 3. P2P Networking

**Grade: F ❌**

Mochimo's C node exchanges peer data over raw sockets (`send()`/`recv()`), with **no SSL/TLS or any encryption library** in the codebase. Peers are identified by IPv4 address only, with no node keys and no peer authentication. The 16-bit session identifiers in the protocol are used for liveness and self-connection detection, not as cryptographic keys, and frame integrity is only a **CRC16 checksum** — a non-cryptographic check that an on-path attacker can recompute after modifying a packet.

**Current state.** Plaintext peer transport with no key exchange, no encryption, and no cryptographic integrity. This is the weakest peer networking among the post-quantum-native chains: it fails confidentiality and, notably, integrity — peer messages can be forged and peers impersonated by an active on-path attacker (classical or quantum). The category grades exposed.

**Planned future work.** Adding an authenticated, encrypted transport — ideally with a post-quantum (hybrid) key exchange and a real message-authentication code in place of CRC16 — would close this gap. No specific public roadmap commitment for this work has been identified.

## 4. On-Chain Logic

**Grade: ➖ Not Applicable**

Mochimo has no smart-contract support, no virtual machine, and no on-chain programmability. It is a pure UTXO value-transfer network. There are no EC precompiles or builtins to retire and no on-chain signature-verification surface to extend, so this category does not apply.

**Current state.** UTXO-only design, maintained since genesis. No on-chain logic exists.

**Planned future work.** No roadmap for smart contracts or on-chain programmability has been published.

## 5. Other Features

**Grade: A ✅**

Two chain-specific features are relevant to post-quantum security, both hash-based:

- **ChainCrunch / Crunchchain compression** periodically compresses older blockchain data into space-efficient "neogenesis" blocks, keeping the mainnet footprint small (on the order of 60 MB). The compression relies on hash functions, not elliptic-curve cryptography.
- **Enforced one-time addresses**: every transaction generates a change address, and combined with WOTS+ one-time signatures this prevents signature reuse — a post-quantum-relevant property baked into the protocol.

The codebase is written in C with a small footprint suitable for embedded and edge nodes.

**Current state.** ChainCrunch compression and one-time address enforcement have both been active since mainnet genesis.

**Planned future work.** Ongoing ChainCrunch optimization and community-driven performance improvements.

## 6. EC Sunset

**Grade: ➖ Not Applicable**

Mochimo never used elliptic-curve cryptography. It launched as a post-quantum chain in June 2018 with WOTS+ signatures and hash-based proof-of-work, so there is nothing to retire — no EC keys, precompiles, or builtins exist anywhere in the protocol. The concept of sunsetting elliptic curve cryptography therefore does not apply.

**Current state.** No elliptic-curve cryptography is present in the protocol; there is nothing to migrate away from.

**Planned future work.** None required.

## Governance

Mochimo is developed under a foundation-led, open-source community model. The single reference implementation is written in C and maintained by the Mochimo Foundation and core development team via GitHub. There is no competing client; all nodes run the same version to stay on the canonical chain, and protocol upgrades are coordinated as hard forks at predetermined block heights.

Recent governance activity has centered on the proposed v4.0 consensus mechanism. In April 2026 an on-chain, MCM-wallet-weighted vote opened on whether to keep proof-of-work or migrate to proof-of-stake. The voting deadline was extended in early May 2026, and the vote concluded with the proof-of-stake option winning 71.5% by stake weight (8.73M MCM across 55 voters) versus 28.5% for keeping proof-of-work (3.48M MCM across 73 voters); proof-of-stake won on stake weight while proof-of-work drew more individual voters. An implementation proposal for the migration is pending.

---

_Generated on 25 Jul 2026 based on information as of 25 Jul 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
