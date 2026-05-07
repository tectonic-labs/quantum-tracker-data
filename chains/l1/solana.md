# Solana (SOL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Solana |
| **Ticker** | SOL |
| **Website** | https://solana.com |
| **GitHub** | https://github.com/solana-foundation |
| **Twitter / X** | https://x.com/solana |
| **On-chain environment** | SVM (Solana Virtual Machine) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | B | 🔧 | In Development |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Solana's PQC story is most advanced at the on-chain primitive layer and least developed everywhere else. Two validator clients are actively building **Falcon** verification syscalls: [firedancer-io/firedancer#9446](https://github.com/firedancer-io/firedancer/pull/9446) (a native C implementation from Jump Trading, iterated April 22–29, 2026) and [anza-xyz/solana-sdk#537](https://github.com/anza-xyz/solana-sdk/pull/537) (a liboqs-based draft from an external contributor, stale since February 2026 with merge conflicts). The corresponding Solana Improvement Document, [SIMD-0461](https://github.com/solana-foundation/solana-improvement-documents/pull/461), is in `Idea` status — the earliest lifecycle stage — and a maintainer comment from Anza on March 18, 2026 noted that the proposal had not been raised in internal prioritization conversations.

The [Solana Foundation's first PQ-named statement](https://solana.com/news/quantum-readiness), published April 27, 2026, frames migration as wallet-scoped: research, then new wallets, then migrate existing wallets. Notably, both core validator client teams — Anza and Firedancer/Jump — have independently converged on **Falcon** (FN-DSA, NIST FIPS 206 IPD) as the candidate scheme, a significant signal. However, the Foundation's statement uses the phrase *"no change is required today or likely anytime soon"* and the roadmap does not commit to a protocol-envelope PQ transaction type. Validator consensus signing, P2P transport, and Turbine block propagation are not mentioned.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **Falcon / FN-DSA** | Ed25519 | On-Chain (verification syscall) | In Development (firedancer#9446 active; solana-sdk#537 stale; SIMD-0461 in `Idea` status) |
| **ML-DSA** (Dilithium) | Ed25519 | Tx Signatures | Discussed (Project Eleven prototype testnet, December 2025) |

## 1. Transaction Signatures

**Grade: D ⚠️**

Solana transactions are signed exclusively with **Ed25519**. Each Solana account's address is its 32-byte Ed25519 public key, so public keys are exposed at-rest in every account record — unlike Bitcoin's hashed P2PKH addresses or Ethereum's hashed account derivation. All mainnet accounts carry quantum-recoverable public keys.

The [Foundation's April 27, 2026 quantum-readiness page](https://solana.com/news/quantum-readiness) names **Falcon** as a candidate signature scheme and outlines a phased plan: research, new wallets, migrate existing wallets. The plan is wallet-scoped — equivalent to the smart-contract-wallet pattern using on-chain verification — and does not commit to a protocol-envelope PQ transaction type. Both Anza and Firedancer/Jump independently selected Falcon/FN-DSA (NIST FIPS 206 IPD) as their candidate algorithm, reducing algorithmic indecision as a future blocker, but the protocol-envelope commitment has not followed. The earlier [Project Eleven partnership](https://www.prnewswire.com/news-releases/project-eleven-to-advance-post-quantum-security-for-the-solana-network-302642847.html) (December 2025) ran a research prototype testnet with **ML-DSA** / Dilithium transactions; it was a research demonstration, not a commitment. Userland constructions like the Winternitz Vault (Blueshift, January 2025) are application-layer programs, not envelope changes.

**Current state.** Mainnet transactions are exclusively Ed25519 at the protocol envelope. No PQ transaction envelope has been proposed in any SIMD.

**Planned future work.** Foundation-level discussion as of April 2026, plus a research-prototype testnet from the Project Eleven collaboration. No SIMD currently proposes a PQ transaction envelope.

## 2. Consensus

**Grade: D ⚠️**

Solana's consensus is [Tower BFT](https://docs.anza.xyz/implemented-proposals/tower-bft), a pBFT variant tied to Proof of History. Every validator vote is signed with the validator's Ed25519 private key under stake-weighted voting and lockout-based fork commitment. The in-flight consensus rewrite, [SIMD-0326 (Alpenglow)](https://github.com/solana-foundation/solana-improvement-documents/pull/326), is non-PQC and continues to use Ed25519/BLS-style aggregate primitives.

The Foundation's [April 27 statement](https://solana.com/news/quantum-readiness) acknowledges quantum as a threat at the chain level but does not name any change to validator-vote signing; [secondary coverage](https://www.cryptbull.net/2026/04/28/solana-prepares-for-the-quantum-era-foundation-details-step-by-step-transition/) confirms the plan does not detail consensus-mechanism changes. No SIMD currently proposes PQ consensus signing.

**Current state.** Validator votes use Ed25519 on mainnet. Alpenglow rewrites consensus without changing the signature scheme.

**Planned future work.** Foundation-level acknowledgment of the threat exists; no consensus-specific proposal has been opened.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Solana in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: B 🔧**

Solana exposes EC signature verification through native [precompiled programs](https://solana.com/docs/core/programs/precompiles): Ed25519Program, Secp256k1Program (ECDSA secp256k1 with pubkey recovery), and Secp256r1Program (NIST P-256). All three are EC-based; no PQC syscall is on mainnet, testnet, or feature-flagged.

Two validator clients are implementing a **Falcon** verification syscall. [firedancer-io/firedancer#9446](https://github.com/firedancer-io/firedancer/pull/9446) is a native C implementation from a Jump Trading engineer, iterated continuously between April 22 and April 29, 2026. [anza-xyz/solana-sdk#537](https://github.com/anza-xyz/solana-sdk/pull/537) implements the same primitive through liboqs from an external contributor; it has been stale since February 1, 2026 and is in `mergeable_state: dirty`. The matching [SIMD-0461](https://github.com/solana-foundation/solana-improvement-documents/pull/461) is in `Idea` status with `simd-bot` indicating "Cannot merge yet — Missing approval from Anza." A Firedancer/Jump engineer commented on April 21, 2026 proposing to ship in Solana v4.1, but no Anza response was recorded.

**Current state.** No PQC syscall on mainnet. Native **Falcon** implementation actively iterated in Firedancer.

**Planned future work.** firedancer#9446 continues iteration. SIMD-0461 awaits Anza review and movement out of `Idea` status.

## 5. Other Features

### Turbine block propagation

**Current state.** Turbine splits blocks into Reed-Solomon-coded packets and distributes them via a stake-weighted random tree per packet, [derived from Ed25519 packet signatures](https://www.helius.dev/blog/turbine-block-propagation-on-solana). Shred ordering and Merkle roots are leader-signed with Ed25519. Turbine has a real EC dependency in its tree derivation and packet authentication.

**Planned future work.** No SIMD or working-group thread proposes PQ alternatives for Turbine.

### Gulf Stream and Proof of History

**Current state.** [Gulf Stream](https://www.helius.dev/blog/solana-gulf-stream) is a mempool-less forwarding protocol — transactions are forwarded directly to the current or next slot leader. It adds no cryptography beyond the transaction-layer Ed25519. Proof of History is a VDF-like sequential SHA-256 hashing chain; it is hash-based and unaffected by Shor's algorithm in isolation.

**Planned future work.** No PQ-specific work published for Gulf Stream or PoH.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Solana's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ⚠️, P2P ❌, On-Chain 🔧, Other ❌.

The [Foundation's April 27, 2026 statement](https://solana.com/news/quantum-readiness) is explicit: *"no change is required today or likely anytime soon."* The proposed wallet-migration sequence — research, then new wallets, then migrate existing wallets — does not impose mandatory deprecation, a fork date, or a scheduled retirement of Ed25519. SIMD-0461 frames **Falcon** as *"an alternative to the existing Ed25519 signatures,"* explicitly additive. Searches for `deprecate`, `sunset`, `retire`, or `remove ed25519` against the Solana Improvement Documents repository return no matches.

**Current state.** No EC retirement scheduled. All proposed PQC work is additive.

**Planned future work.** None published.

## Governance

Solana's protocol changes flow through the [Solana Improvement Documents (SIMDs)](https://github.com/solana-foundation/solana-improvement-documents) repository, with implementation work in [Anza's Agave](https://github.com/anza-xyz/agave), [Firedancer](https://github.com/firedancer-io/firedancer) (Jump Trading), and [Sig](https://github.com/Syndica/sig) (Syndica) validator clients. SIMDs progress through `Idea` → `Review` → `Implemented` lifecycle; merging requires Anza approval per `simd-bot`'s gating rules.

Active PQ-relevant work:

- [SIMD-0461](https://github.com/solana-foundation/solana-improvement-documents/pull/461) — Falcon precompile / verification syscall. Status: `Idea`. simd-bot: "Cannot merge yet — Missing approval from Anza."
- [firedancer-io/firedancer#9446](https://github.com/firedancer-io/firedancer/pull/9446) — Native C Falcon syscall. Active iteration April 22–29, 2026.
- [anza-xyz/solana-sdk#537](https://github.com/anza-xyz/solana-sdk/pull/537) — Falcon via liboqs. Status: stale since 2026-02-01; merge conflicts.
- [SIMD-0326 (Alpenglow)](https://github.com/solana-foundation/solana-improvement-documents/pull/326) — consensus rewrite. Non-PQC; included for context.

Foundation activity:

- 2025-12 — [Project Eleven partnership](https://www.prnewswire.com/news-releases/project-eleven-to-advance-post-quantum-security-for-the-solana-network-302642847.html) announced; research prototype testnet with **ML-DSA** / Dilithium.
- 2026-04-27 — [Solana Foundation: Solana's Quantum Readiness](https://solana.com/news/quantum-readiness) — first Foundation-level statement naming Falcon. Wallet-scoped. Both Anza and Firedancer/Jump independently named Falcon/FN-DSA as their candidate.
- 2026-04-27 to 2026-04-28 — [Cointelegraph](https://cointelegraph.com/news/solana-introduces-post-quantum-solution-falcon-on-two-validator-clients) and other outlets cover the Foundation post and dual-client algorithm convergence.

Searches across `firedancer-io`, `anza-xyz`, and `Syndica` for `post-quantum`, `pqc`, `liboqs`, `mlkem`, and similar terms found no P2P PQ work as of the source's last scan.

---

_Generated on 07 May 2026 based on information as of 06 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
