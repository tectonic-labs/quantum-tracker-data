# Arc (ARC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Arc |
| **Ticker** | ARC |
| **Website** | <https://www.arc.network/> |
| **GitHub** | <https://github.com/circlefin/arc-node> |
| **Twitter / X** | <https://x.com/Arc> |
| **On-chain environment** | EVM |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | C | 🗺️ | Roadmapped |
| P2P Networking | C | 🗺️ | Roadmapped |
| On-Chain Logic | B | 🔧 | In Development |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | B | 🔧 | In Development |

Arc is a [Circle-developed stablecoin-native L1](https://www.circle.com/blog/introducing-arc-an-open-layer-1-blockchain-purpose-built-for-stablecoin-finance) built with USDC as its native gas token. Circle has published a comprehensive [post-quantum security roadmap](https://www.arc.network/blog/arcs-quantum-resistant-design-and-roadmap-why-it-matters) for Arc, and has released a [detailed technical paper](https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/PDFs/quantum_paper.pdf) (co-authored with Dan Boneh of Stanford) describing the cryptographic strategy in depth. The paper covers a three-phase migration model — Readiness (current), Transition (hybrid PQ+classical mode), and Switch (full PQ) — and names specific algorithms and mechanisms for each surface. Phase 1 includes opt-in quantum-resistant wallets and an **SLH-DSA-SHA2-128s** EVM precompile, available on testnet and in the pre-mainnet codebase. Arc mainnet has not yet launched (summer 2026 target).

The roadmap is a Circle corporate commitment rather than a community vote — Arc has no on-chain governance at launch. The Switch phase includes an explicit published commitment to reject ECDSA transactions at the protocol level, making Arc one of the few chains with a named EC retirement commitment in the public record.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **SLH-DSA-SHA2-128s** (FIPS 205 / SPHINCS+) | ECDSA secp256k1 | Tx Signatures, On-Chain | In Development (testnet / pre-mainnet codebase) |
| **ML-DSA** (FIPS 204) | ECDSA secp256k1 | Tx Signatures | On Roadmap (candidate, not yet selected) |
| **FN-DSA** (Falcon) | ECDSA secp256k1 | Tx Signatures | On Roadmap (candidate, pending NIST finalization) |
| **X-Wing HPKE** (hybrid: ML-KEM-768 + X25519) | ECDH | Other (encrypted memos) | On Roadmap (Transition phase) |
| **X25519MLKEM768** / **ML-KEM-768** (FIPS 203) | X25519 ECDH | P2P / TLS transport | On Roadmap (Transition phase) |

## 1. Transaction Signatures

**Grade: B 🔧**

Arc's testnet and forthcoming mainnet include optional quantum-resistant wallets as an opt-in path alongside the default ECDSA secp256k1 accounts. The designated algorithm for Phase 1 opt-in wallets is **SLH-DSA-SHA2-128s** — the NIST-standardized version of SPHINCS+ (FIPS 205). This is a stateless hash-based scheme that avoids lattice assumptions but carries larger signatures (~7,856 bytes) than ECDSA (~65 bytes). Circle's [technical paper](https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/PDFs/quantum_paper.pdf) also identifies **ML-DSA** (FIPS 204) as a lattice-based option and **FN-DSA** (Falcon) as a candidate whose adoption was pending NIST finalization at paper publication. A final algorithm selection for the broader transaction-signing path has not been announced.

The Switch phase of Circle's roadmap includes an explicit protocol-level commitment: ["Arc and USDC smart contracts will reject transactions signed with ECDSA."](https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/PDFs/quantum_paper.pdf)

**Current state.** ECDSA secp256k1 is the default. **SLH-DSA-SHA2-128s** opt-in wallets are available on testnet as part of Phase 1 (Readiness). [Arc's public testnet launched October 2025.](https://www.circle.com/pressroom/circle-launches-arc-public-testnet)

**Planned future work.** The Transition phase introduces an ECRecoverOverride mechanism (via hard fork) to support PQ signatures alongside ECDSA at the `ecrecover` precompile address. The Switch phase removes ECDSA as a valid signing scheme entirely. Final algorithm selection for the transition has not been announced.

## 2. Consensus

**Grade: C 🗺️**

Arc uses Malachite BFT consensus (Tendermint-style). Validator signing is currently ECDSA-based. Circle's [technical paper](https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/PDFs/quantum_paper.pdf) explicitly commits to upgrading validator signatures: "We are working toward upgrading Arc's validator signatures to a post-quantum scheme." The same paper identifies the key blocking dependency — no drop-in post-quantum replacement for BLS aggregate signatures currently exists. BLS aggregate signatures are the scheme used in Ethereum-style consensus; their absence from the post-quantum standardized family is a known open problem across the broader PoS ecosystem, not specific to Arc. A final candidate has not been selected.

**Current state.** Validator signatures use ECDSA. No post-quantum consensus implementation has been published for Arc.

**Planned future work.** Circle's Transition phase lists validator PQ signing as a roadmap item, contingent on a suitable aggregate signature scheme becoming available. No algorithm or schedule has been announced.

## 3. P2P Networking

**Grade: C 🗺️**

Arc uses libp2p with the Noise Protocol for peer-to-peer communication. Noise uses X25519 ECDH for the key exchange and Ed25519 for node identity — both EC-based schemes. Circle's [technical paper](https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/PDFs/quantum_paper.pdf) explicitly identifies this surface as a quantum risk and states that the libp2p project has PQ networking "under active exploration" as of its 2025 annual report. The Transition phase of Circle's roadmap lists a "libp2p/Noise Protocol PQ upgrade" as a named work item, and specifies **X25519MLKEM768** (a hybrid of X25519 and **ML-KEM-768**, FIPS 203) for TLS transport as part of the same transition.

**Current state.** libp2p with Noise Protocol (X25519 ECDH + Ed25519). No post-quantum handshake or node identity scheme deployed.

**Planned future work.** The Transition phase roadmap includes a libp2p PQ upgrade and **X25519MLKEM768** for external TLS communication. No specific PR or implementation timeline has been published.

## 4. On-Chain Logic

**Grade: B 🔧**

The [Arc node source](https://github.com/circlefin/arc-node) contains an EVM precompile for **SLH-DSA-SHA2-128s** signature verification at `crates/precompiles/src/pq.rs`. Any smart contract on Arc can call this precompile to verify post-quantum signatures on-chain without custom cryptographic code. The precompile uses `slh-dsa 0.2.0-rc.5` (Rust) and its interface is described in the source as the "Experimental post-quantum cryptography precompile interface" as of a May 2026 update. Test vector generation and test vectors are also present in the codebase.

Arc's public mainnet has not yet launched. The precompile is confirmed in the testnet codebase and is part of the pre-mainnet `arc-node` source. Once mainnet activates with the precompile live, this category will be eligible to advance.

**Current state.** **SLH-DSA-SHA2-128s** EVM precompile implemented in Arc testnet node source (`pq.rs`). The precompile interface is labeled "Experimental." Mainnet activation pending.

**Planned future work.** Mainnet activation. Circle's [technical paper](https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/PDFs/quantum_paper.pdf) describes the precompile as the foundation for Phase 1 opt-in PQC wallets and on-chain PQ signature verification.

## 5. Other Features

Arc is building new PQC-first features (encrypted memos via **X-Wing HPKE**, TEE privacy layer, ECRecoverOverride, encrypted mempool) with no prior EC-based versions to migrate. There are no chain-specific EC cryptographic primitives to sunset in this category.

## 6. EC Sunset

**Grade: B 🔧**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Arc's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus 🗺️, P2P 🗺️, On-Chain 🔧, Other ➖.

Circle's [technical paper](https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/PDFs/quantum_paper.pdf) contains the most concrete EC retirement commitment available in Arc's public record. The Switch phase includes: "Arc and USDC smart contracts will reject transactions signed with ECDSA" and "ecrecover transitions to post-quantum-only mode." The Transition phase names a specific engineering mechanism — an ECRecoverOverride contract deployed via hard fork at the `ecrecover` precompile address — that would support both ECDSA and PQ schemes simultaneously before the full switch. Validator signing is also scheduled for a PQ upgrade during the Transition phase. The ECRecoverOverride mechanism is specifically named and described as an engineering deliverable, indicating active development work beyond a policy statement alone.

No dates have been published for either the Transition or Switch phases, and the final algorithm selections for several categories remain open. But the commitment to remove ECDSA is explicit and on the public record, not merely implied by the presence of a PQC roadmap.

**Current state.** ECDSA is the default for transactions and validator signing. The `ecrecover` precompile is unchanged. No EC retirement has occurred.

**Planned future work.** ECRecoverOverride contract (Transition phase); ECDSA rejection for Arc and USDC contracts (Switch phase); ecrecover PQ-only mode (Switch phase); validator PQ signing (Transition phase, contingent on aggregate signature availability).

## Governance

Arc has no on-chain governance at launch; protocol decisions are made by Circle Inc. PQC roadmap status and technical documentation appear through:

- [Circle Blog — Introducing Arc](https://www.circle.com/blog/introducing-arc-an-open-layer-1-blockchain-purpose-built-for-stablecoin-finance): original chain introduction.
- [Circle Press — Arc Public Testnet launch](https://www.circle.com/pressroom/circle-launches-arc-public-testnet): testnet announcement, October 2025.
- [Arc Blog — Quantum-Resistant Design and Roadmap](https://www.arc.network/blog/arcs-quantum-resistant-design-and-roadmap-why-it-matters): canonical public roadmap document.
- [Circle Post-Quantum Security Roadmap (PDF)](https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/PDFs/quantum_paper.pdf): detailed technical paper covering the three-phase migration model, algorithm selections, and per-surface commitments.
- [arc-node GitHub](https://github.com/circlefin/arc-node): open-source implementation including the SLH-DSA-SHA2-128s EVM precompile.

---

_Generated on 04 Jun 2026 based on information as of 01 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
