# Mochimo (MCM) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Mochimo |
| **Ticker** | MCM |
| **Website** | https://mochimo.org |
| **GitHub** | https://github.com/mochimodev/mochimo |
| **On-chain environment** | None (pure value transfer) |
| **Mainnet genesis** | 2018-06-25 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | A | ✅ | Shipped |
| EC Sunset | A | ✅ | Shipped |

Mochimo launched its mainnet on June 25, 2018, claiming to be the first operational post-quantum Layer 1 blockchain. The protocol uses WOTS+ (Winternitz One-Time Signature Plus), a hash-based one-time signature scheme per RFC 8391 / NIST FIPS 205, whose security rests on hash function properties rather than elliptic curve algebra vulnerable to Shor's algorithm. Mochimo has never used EC cryptography at any layer. The chain is a pure value-transfer network with no smart contract support, written entirely in C. Key technical features include Peach, a custom PoW algorithm designed to resist FPGA/ASIC centralization, and ChainCrunch, a compression system that periodically consolidates old blockchain data into space-efficient "neogenesis blocks."

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **WOTS+** (RFC 8391 / FIPS 205) | N/A (PQC-native from genesis) | Tx Signatures | Shipped (mainnet genesis, June 2018) |
| **Peach PoW** (hash-based) | N/A (PQC-native from genesis) | Consensus | Shipped (mainnet genesis, June 2018) |

## 1. Transaction Signatures

**Grade: A ✅**

Mochimo transactions are signed with WOTS+ (Winternitz One-Time Signature Plus), a hash-based one-time signature scheme conforming to IETF RFC 8391 and NIST FIPS 205. No elliptic curve cryptography is used. Addresses are one-time by design: each public key is used exactly once and then discarded. The UTXO model enforces mandatory change-address generation for every transaction, similar to early Bitcoin but mandatory, preventing signature reuse even in a hypothetical post-quantum scenario.

**Current state.** WOTS+ has been the sole transaction signature scheme since mainnet genesis on June 25, 2018. No EC-based signatures have ever been available.

**Planned future work.** None required. WOTS+ is mature and embedded in the protocol design.

## 2. Consensus

**Grade: A ✅**

Mochimo uses Proof-of-Work via the Peach algorithm, a custom hash-based mining algorithm designed to be CPU/GPU-friendly while resisting FPGA/ASIC centralization. Block creation and validation are entirely hash-based with no signature verification required. There are no validators in the traditional sense; block selection follows the longest-chain rule with probabilistic finality.

Grover's algorithm provides at most a quadratic speedup against hash functions, reducing effective security but not breaking it. Difficulty adjustment would absorb any marginal quantum mining advantage.

A v4.0 governance vote was underway in April-May 2026 to decide whether to move from PoW to PoS. The voting deadline was extended to May 7, 2026 by the Core Contributor Team. As of May 1, 2026, the tally stood at PoW 48.9% / PoS 51.1% (97 votes cast). If PoS is adopted, the validator identity signature scheme would need evaluation regarding PQC readiness.

**Current state.** Mining and block validation are entirely hash-based. No EC cryptography is involved in the consensus mechanism.

**Planned future work.** Outcome of the v4.0 PoW-vs-PoS vote may require evaluation of validator identity signatures under PoS.

## 3. P2P Networking

**Grade: D ⚠️**

Mochimo uses a standard P2P networking layer with seed-node-based peer discovery. Node identity is hash-based rather than EC-based. However, the transport encryption specifics — whether TLS cipher suites and key exchange protocols are post-quantum — have not been confirmed in public documentation.

**Current state.** No EC in node identity. Transport encryption is implemented, but PQC readiness of the key exchange and cipher suites is unconfirmed.

**Planned future work.** Transport encryption audit and potential upgrade to post-quantum key exchange protocols are recommended.

## 4. On-Chain Logic

Mochimo is a pure value-transfer chain with no smart contract support, no virtual machine, and no on-chain programmability. There are no EC precompiles or builtins to sunset. Signature verification occurs at the consensus layer only.

## 5. Other Features

**Grade: A ✅**

**ChainCrunch** is Mochimo's blockchain compression system that periodically consolidates the entire chain into space-efficient "neogenesis blocks." The current mainnet chain size is approximately 60 MB. Compression uses hash-based methods with no EC involvement.

**One-time address enforcement** ensures that every transaction generates a change address. Combined with WOTS+ one-time signatures, this is an inherent PQC feature that prevents signature reuse attacks.

The entire codebase is written in C with a small footprint suitable for embedded and edge nodes.

## 6. EC Sunset

**Grade: A ✅**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Mochimo's PQC-adoption ratings per category are: Tx Signatures ✅, Consensus ✅, P2P ⚠️, On-Chain ➖, Other ✅.

Mochimo never used elliptic curve cryptography. The protocol was designed PQC-native from genesis on June 25, 2018, using WOTS+ for transaction signatures and Peach (hash-based PoW) for consensus. There is no EC to sunset.

**Current state.** No EC present at any layer. PQC-native from genesis.

**Planned future work.** None required.

## Governance

Mochimo is governed by the Mochimo Foundation with open-source community participation. Development proposals are discussed through community channels and GitHub. Protocol stability is prioritized, with no major hard forks in the chain's history. An on-chain MCM-wallet governance vote mechanism was used for the v4.0 PoW-vs-PoS decision in 2026.

PQ-relevant governance activity:

- **v4.0 Consensus Vote** (April-May 2026): On-chain vote to decide whether v4.0 moves from PoW to PoS. Voting deadline extended to May 7, 2026. If PoS is adopted, the PQC properties of the new validator scheme will need evaluation.

Sources:

- https://mochimo.org/ — Official website
- https://mochimo.org/assets/files/mochimo_wp_EN.pdf — White paper
- https://github.com/mochimodev/mochimo — GitHub repository
- https://x.com/mochimocrypto — Official X/Twitter account

---

_Generated on 07 May 2026 based on information as of 07 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
