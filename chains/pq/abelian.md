# Abelian (ABEL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Abelian |
| **Ticker** | ABEL |
| **Website** | https://www.pqabelian.io/ |
| **GitHub** | https://github.com/pqabelian |
| **Twitter/X** | https://x.com/pqabelian |
| **On-chain environment** | Privacy-focused L1 (no smart-contract VM); EVM-compatible "QDay" L2 planned |

## Summary

| Category | Grade | Icon | Status |
|----------|-------|------|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Exposed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | A | ✅ | Shipped |
| EC Sunset | ➖ | ➖ | Not Applicable |

Abelian is a post-quantum-native privacy blockchain that pairs Monero-style confidentiality with lattice-based cryptography. Rather than migrating away from elliptic-curve cryptography, the protocol was architected without it from genesis: transaction signing uses a lattice-based linkable ring signature scheme inspired by NIST-standardized CRYSTALS-Dilithium, and the privacy stack (stealth addresses, amount-hiding commitments, and zero-knowledge proofs) is built on the same lattice foundations. Consensus is GPU-friendly Proof-of-Work, which is entirely hash-based.

Transaction signatures, consensus, and the privacy feature set already run on post-quantum primitives and earn top grades. Peer-to-peer networking and on-chain logic are graded lower because they are less settled: Abelian's architecture is consistent with post-quantum node identities, but its transport and handshake cryptography are not explicitly confirmed in public documentation, and the chain has no smart-contract layer today — the EVM-compatible "QDay" Layer 2 is still in development and its signature-verification approach is not yet defined. Because there is no elliptic curve anywhere in the core protocol, the EC Sunset category does not apply: there is nothing to retire.

A note specific to privacy chains: a future break of the underlying cryptography would be retroactive, potentially deanonymizing the entire historical ledger rather than only future transactions. For most privacy chains this is a serious quantum exposure, because their confidentiality rests on elliptic-curve assumptions (ring signatures or discrete-log-based zero-knowledge proofs). Abelian is the opposite case: its privacy is already lattice-based and therefore post-quantum, so this retroactive risk is substantially reduced rather than outstanding — its confidentiality is a strength, not a liability.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **Lattice-based linkable ring signatures (CRYSTALS-Dilithium-inspired)** | (PQC-native; no EC predecessor) | Transaction Signatures | Shipped |
| **Lattice-based commitments and zero-knowledge proofs** | (PQC-native; no EC predecessor) | Other Features | Shipped |

## 1. Transaction Signatures

**Grade: A ✅**

**Current state.** Transactions are signed with a lattice-based linkable ring signature scheme inspired by NIST-standardized CRYSTALS-Dilithium, with no elliptic-curve cryptography anywhere in the signing or address-derivation path. Abelian offers three privacy modes, all lattice-based: a pseudonymous mode using lattice signatures with stealth-address generation; a full-privacy mode adding ring signatures and amount-masking commitments; and a super-privacy mode for fully anonymous transactions. Each transaction derives a one-time stealth address from lattice-based keys, preventing linkability. All signature modes have been live on mainnet since genesis, so there was never an elliptic-curve-to-PQC migration to perform.

**Planned future work.** The planned QDay Layer 2 will bring EVM-compatible smart contracts via zero-knowledge rollups; its signature handling is to be determined and may inherit the L1 lattice-based scheme or adopt rollup-specific schemes.

## 2. Consensus

**Grade: A ✅**

**Current state.** Abelian uses GPU-friendly Proof-of-Work, with a mining puzzle designed for general-purpose GPUs rather than specialized ASICs. Block headers are committed via cryptographic hash functions, miners are identified by hash contribution and difficulty rather than by any signing key, and the randomness used in block production derives from the PoW solution hash. There is no elliptic-curve cryptography in mining or consensus. As a hash-based design, consensus is considered resistant to quantum attack — Grover's algorithm offers only a quadratic speedup against pre-image search, which does not break the security model. Hash-based PoW has been in place since genesis.

**Planned future work.** No changes to the consensus algorithm are planned.

## 3. P2P Networking

**Grade: F ❌**

**Current state.** The `abec` node is a **btcd (Bitcoin Core-lineage) fork**, and its peer transport carries **no encryption**. Peers connect with plain sockets using Bitcoin wire framing (magic + command + length + a non-cryptographic double-SHA256 checksum); there is no key exchange, no session encryption, and no peer authentication (peers are addresses only). The self-signed TLS present in the software guards the **RPC control channel**, not peer gossip — a common point of confusion for Bitcoin-lineage nodes. There is no elliptic curve in the transport, but there is also no post-quantum protection: the link fails both confidentiality and integrity, and an on-path attacker can read and forge peer traffic. The category grades exposed.

**Planned future work.** No peer-to-peer transport-security upgrade has been announced. Adding an authenticated, encrypted transport with a post-quantum (hybrid) handshake would close this gap.

## 4. On-Chain Logic

**Grade: D ⚠️**

**Current state.** The Abelian L1 has no general-purpose virtual machine and no traditional smart contracts; privacy logic is built directly into the protocol layer rather than exposed through contracts. There are no elliptic-curve precompiles or builtins, and no on-chain signature-verification surface, because there are no contracts. The hash functions used for PoW and commitment schemes exist as protocol primitives, not as contract-callable builtins.

**Planned future work.** The planned QDay Layer 2 is a zero-knowledge rollup intended to bring EVM compatibility to the Abelian ecosystem. It is in development and not yet live. Whether QDay will inherit the L1's lattice-based signature verification or introduce its own scheme is not yet defined; if it follows standard EVM conventions, post-quantum signature support would need to be added explicitly through contracts or precompiles.

## 5. Other Features

**Grade: A ✅**

**Current state.** Abelian's flagship privacy model combines lattice-based linkable ring signatures, commitment schemes that hide transaction amounts, and zero-knowledge proofs — the entire privacy stack is lattice-based, with no elliptic-curve cryptography. One-time stealth addresses prevent transaction linkability, and metadata obfuscation shields transaction size, timing, and contextual details from analytics. This stack has been live on mainnet since genesis.

A consequence specific to privacy chains is that a future cryptographic break would be retroactive: it would apply to the entire historical ledger, not just to transactions made after the break. For privacy chains whose confidentiality rests on elliptic-curve assumptions — for example ring signatures over an elliptic curve, or discrete-log-based zero-knowledge proofs — this is a standing quantum exposure. Abelian's confidentiality is instead built on lattice assumptions believed to resist quantum attack, so this retroactive risk is substantially mitigated: its privacy is post-quantum by construction.

**Planned future work.** The roadmap centers on deploying the QDay Layer 2 and expanding EVM compatibility within the ecosystem.

## 6. EC Sunset

**Grade: ➖ Not Applicable**

Abelian was designed post-quantum-native from genesis, using lattice-based signatures and a lattice-based privacy stack. There is no elliptic-curve cryptography in the protocol — transaction signing, consensus, and privacy have all used post-quantum or hash-based primitives since launch — so there is no elliptic curve to retire. Because there is no legacy elliptic-curve dependency to remove, this category does not apply.

## Governance

Abelian is developed under a foundation-led model with no on-chain governance vote; protocol direction and upgrades are coordinated by the Abelian Foundation. Upgrades are delivered through hard forks activated at predetermined block heights, with miners signaling readiness and upgrading the single reference `abec` client. Post-quantum security is a foundational design principle rather than an upgrade path, so there is no formal post-quantum migration proposal to track.

- Website: https://www.pqabelian.io/
- White paper: https://download.abelian.info/release/docs/whitepaper.pdf
- GitHub: https://github.com/pqabelian

---

_Generated on 25 Jul 2026 based on information as of 25 Jul 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
