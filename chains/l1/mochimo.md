# Mochimo (MCM) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Mochimo |
| **Ticker** | MCM |
| **Website** | https://mochimo.org/ |
| **GitHub** | https://github.com/mochimodev/mochimo |
| **Twitter / X** | https://x.com/mochimocrypto |
| **On-chain environment** | None (no smart contracts) |
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

[Mochimo](https://mochimo.org/) launched its genesis block on June 25, 2018, as a post-quantum-native Layer 1 blockchain. It uses **WOTS+** (Winternitz One-Time Signature Plus), a hash-based one-time signature scheme per [IETF RFC 8391](https://mochimo.org/assets/files/mochimo_wp_EN.pdf), whose security relies on hash function properties rather than algebraic structures vulnerable to quantum attack. The entire protocol was designed without elliptic-curve cryptography — there is no EC to sunset.

Mochimo's consensus uses Peach, a custom hash-based PoW algorithm, and the chain enforces one-time addresses (combined with WOTS+ one-time signatures). The community recently voted to migrate from PoW to PoS in the v4.0 upgrade, with the vote concluding at 71.5% in favor by stake weight. The validator signing scheme for the new PoS system has not yet been specified.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **WOTS+** (RFC 8391) | N/A (PQC from genesis) | Tx Signatures | Implemented |

## 1. Transaction Signatures

**Grade: A ✅**

Mochimo uses **WOTS+** (Winternitz One-Time Signature Plus) for all transaction signing, a hash-based scheme per IETF RFC 8391 and NIST FIPS 205. One-time addresses are enforced: each public key is used exactly once then discarded, eliminating signature-reuse attack vectors.

**Current state.** **WOTS+** signatures from mainnet genesis (June 25, 2018). No ECC at any point in the chain's history.

**Planned future work.** None required; WOTS+ is mature and embedded in protocol design.

## 2. Consensus

**Grade: A ✅**

Mochimo uses [Peach](https://mochimo.org/assets/files/mochimo_wp_EN.pdf), a custom Proof-of-Work algorithm designed to resist FPGA/ASIC centralization while remaining CPU/GPU-friendly. Peach is entirely hash-based with no elliptic-curve component. No signature verification is required in block creation — the PoW race determines block selection.

The community recently voted to migrate consensus from PoW to PoS in the v4.0 upgrade. The final tally was 71.5% in favor of PoS migration by stake weight (8.73M MCM, 55 voters) versus 28.5% for keeping PoW (3.48M MCM, 73 voters), with 129 votes cast (128 valid). The validator identity signing scheme for the new PoS system has not yet been specified — whether it will retain **WOTS+**, adopt a stateful hash-based scheme, or move to a different PQC signature algorithm remains an open design question.

**Current state.** Peach PoW from mainnet genesis. Entirely hash-based, no EC.

**Planned future work.** v4.0 PoS migration approved by community vote. Implementation proposal pending; validator signing scheme selection will determine whether the consensus layer maintains its current PQC posture.

## 3. P2P Networking

**Grade: D ⚠️**

Mochimo's P2P networking does not use EC-based node identity — identifiers are hash-based. However, the transport encryption layer's post-quantum specifics are unconfirmed in public documentation. TLS cipher suites and key exchange protocols used in node-to-node communication have not been publicly audited for PQC readiness.

**Current state.** Node identity is hash-based (no EC). Transport encryption PQC status unconfirmed.

**Planned future work.** Transport encryption PQC audit and potential upgrade to post-quantum key exchange recommended.

## 4. On-Chain Logic

Mochimo is a pure value-transfer chain with no smart contracts, no virtual machine, and no on-chain programmability. This category does not apply.

## 5. Other Features

**Grade: A ✅**

### ChainCrunch Compression

ChainCrunch periodically compresses the entire blockchain into space-efficient "neogenesis blocks," keeping mainnet size at approximately 60 MB. This uses hash-based compression, not ECC.

**Current state.** Active from mainnet genesis. Entirely hash-based.

**Planned future work.** ChainCrunch optimization and enhancement.

### One-Time Address Enforcement

Every transaction generates a change address. Combined with **WOTS+** one-time signatures, this prevents signature-reuse attacks even in a hypothetical post-quantum scenario.

**Current state.** Enforced from genesis. Core PQC design feature.

**Planned future work.** None required.

## 6. EC Sunset

**Grade: A ✅**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ✅, Consensus ✅, P2P ⚠️, On-Chain ➖, Other ✅.

Mochimo never used elliptic-curve cryptography. The chain was designed PQC-native from genesis (June 25, 2018) with **WOTS+** hash-based signatures and Peach hash-based PoW. There is no EC to retire.

**Current state.** No EC anywhere in the protocol.

**Planned future work.** Not applicable.

## Governance

Mochimo governance is foundation-led with open-source community participation. Protocol changes are proposed by the core development team and discussed via community channels.

Governance activity:

- **v4.0 Consensus Vote** — On-chain MCM-wallet governance vote to decide whether v4.0 migrates from PoW (Peach) to PoS. Vote concluded: PoS approved with 71.5% by stake weight. Implementation proposal pending.

---

_Generated on 11 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
