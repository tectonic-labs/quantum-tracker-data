# BNB Chain (BNB) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | BNB Chain |
| **Ticker** | BNB |
| **Website** | <https://www.bnbchain.org> |
| **GitHub** | <https://github.com/bnb-chain> |
| **On-chain environment** | EVM (Geth fork) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | B | 🔧 | In Development |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | B | 🔧 | In Development |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

BNB Chain has a single, large draft PR pulling its PQC story together across transactions, consensus, and on-chain verification. [bnb-chain/bsc#3660](https://github.com/bnb-chain/bsc/pull/3660), opened 2026-04-28 by BSC core developer `fynnss`, is a 4,805+/50- diff across 58 files implementing **ML-DSA-44** (FIPS 204) end-to-end: a new `PQTxType=0x05` user-transaction envelope, a `PQVoteAttestation` that replaces BLS fast-finality vote aggregation with a **STARK** recursive proof, a PQ Registry precompile at address `0x70`, a `bsc4` P2P sub-protocol carrying PQ vote messages, and an opt-in operator flag for validators. The PR has not been merged and the change is not on testnet.

The earlier proposal in this space, [BEP-575](https://github.com/bnb-chain/BEPs/pull/575) (Falcon precompile, May 2025), is now stale because bsc#3660 chose **ML-DSA-44** over **Falcon** on the basis of ~1,500 verifications/sec and ~35% smaller key+sig at matched ~128-bit PQ security on BSC's 450 ms slot budget. The 2026 BNB Chain technical roadmap leads with performance, dual-client strategy, and native privacy; PQ is signalled via bsc#3660 but not yet on the published roadmap.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA-44** (Dilithium / FIPS 204) | ECDSA secp256k1, BLS12-381 (fast-finality votes) | Tx Signatures, Consensus, On-Chain | In Development (bsc#3660 draft PoC; not on testnet) |
| **STARK** recursive aggregation | BLS12-381 vote aggregation | Consensus | In Development (bsc#3660 PQVoteAttestation) |
| **Falcon / FN-DSA** | ECDSA secp256k1 | On-Chain | Discussed (BEP-575 proposal, now stale) |

## 1. Transaction Signatures

**Grade: B 🔧**

User transactions on BNB Chain are signed with ECDSA secp256k1, inherited from Geth/Ethereum. Address derivation, multisig via smart contracts, and ERC-4337 account abstraction all match Ethereum.

[bsc#3660](https://github.com/bnb-chain/bsc/pull/3660) introduces `PQTxType = 0x05`, an EIP-2718-style transaction envelope carrying a 1,312-byte **ML-DSA-44** public key and a 2,420-byte **ML-DSA-44** signature. Sender addresses are derived as `keccak256(pubkey)[12:]`; the explicit public key is then resolved through the new on-chain PQ Registry precompile at `0x70` (see On-Chain Logic). The PR is in draft; nothing has been merged or activated on testnet.

**Current state.** Mainnet transactions are exclusively ECDSA secp256k1.

**Planned future work.** bsc#3660 is the active vehicle. There is no fork-activation timeline.

## 2. Consensus

**Grade: B 🔧**

BNB Chain uses [Parlia](https://github.com/bnb-chain/bsc/blob/master/consensus/parlia/parlia.go), a hybrid Delegated Proof of Stake plus Proof of Authority engine: 45 validators are elected daily by stake, 21 are selected per epoch (18 from the top "Cabinet," 3 from the next-ranked "Candidate" set), and they take turns producing blocks at 0.45-second slot times. Block signing uses ECDSA consensus keys; the fast-finality path aggregates votes with BLS.

bsc#3660 introduces `PQVoteAttestation`, a fast-finality construction that replaces the BLS aggregate signature with a **STARK** recursive proof attesting to a committee of **ML-DSA-44** individual votes. The change is gated behind an `IsPQFork` switch and exposed over a new `bsc4` P2P sub-protocol carrying `PQVotesMsg`, alongside the existing classical `bsc3` stream. Validators opt in by passing `--pqvotekey <path>`; the `PQVotePool` is always-on so peers store other validators' PQ votes even when a node has no local PQ key. The PR also covers snapshot back-fill / cache-warmup logic for restart correctness and dedicated `pq_*_test.go` end-to-end tests.

**Current state.** Mainnet consensus uses ECDSA block signing and BLS vote aggregation.

**Planned future work.** bsc#3660 fast-finality migration. Not on testnet.

## 3. P2P Networking

**Grade: D ⚠️**

BNB Chain inherits Ethereum's devp2p stack — RLPx with ECIES key exchange and secp256k1 node identity. Peer discovery uses Kademlia DHT (discv4 / discv5). The bsc#3660 PoC adds a `bsc4` sub-protocol that carries PQ vote messages alongside the classical `bsc3` stream — chain-attributable in-repo work that touches the P2P layer in service of a PQC migration — but it does not change devp2p key exchange or node identity, and the underlying transport crypto remains EC-based.

**Current state.** secp256k1 node identity, ECIES handshakes; the new `bsc4` sub-protocol is the only PQ-related P2P artifact and only carries PQ payloads.

**Planned future work.** No proposal for PQ transport encryption or PQ node identity is currently published.

## 4. On-Chain Logic

**Grade: B 🔧**

The BSC EVM exposes the standard Ethereum precompile set: ecrecover (secp256k1), ecAdd / ecMul / ecPairing (BN254), and BLS12-381 ops where inherited from upstream. Hash precompiles cover SHA-256, RIPEMD-160, Keccak-256, and Blake2f. There is no PQC verification precompile on mainnet.

bsc#3660 adds a **PQ Registry precompile at `0x70`** that stores **ML-DSA-44** public keys for `PQTxType` accounts and serves them to consensus and sender-recovery code paths. Genesis seeds the registry with a non-zero nonce so the contract is protected from EIP-158 storage wipe. The earlier [BEP-575](https://github.com/bnb-chain/BEPs/pull/575) draft proposed a **Falcon** precompile; bsc#3660's choice of **ML-DSA-44** supersedes that direction, and a successor BEP describing the ML-DSA + STARK approach is expected.

**Current state.** No PQC precompile shipped.

**Planned future work.** bsc#3660 PQ Registry precompile at `0x70` plus ML-DSA-44 verification logic in the EVM call path. Not on testnet.

## 5. Other Features

### BNB Greenfield Bridge

**Current state.** The Greenfield cross-chain bridge uses an [ECDSA-based multisig scheme](https://docs.bnbchain.org/bnb-greenfield/core-concept/programmability/) among Greenfield validators, with the cross-chain relay drawing its validator set from Parlia consensus. A quantum break of the validator-signature scheme would let an attacker forge cross-chain messages.

**Planned future work.** No bridge-specific PQ proposal. Bridge security tracks consensus-layer migration; bsc#3660 does not modify Greenfield contracts.

### opBNB (OP Stack L2)

**Current state.** opBNB is an OP Stack optimistic rollup with BNB as the settlement asset. Settlement signatures inherit OP Stack's ECDSA secp256k1 path on the L1.

**Planned future work.** No opBNB-specific PQ proposal; PQ posture follows from Ethereum's roadmap.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, BNB Chain's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus 🔧, P2P ⚠️, On-Chain 🔧, Other ❌.

bsc#3660 is structured as additive PQC rather than EC retirement. The classical ECDSA transaction path remains accepted, the BLS fast-finality path remains alongside `PQVoteAttestation`, all pre-existing precompiles (ecrecover, BN254, BLS12-381) are untouched, and the new `bsc4` sub-protocol runs in parallel with `bsc3`. The PR establishes a `IsPQFork` gate that allows incremental PQC adoption per fork; no fork-specific commitment to retire EC has been published.

**Current state.** No EC retirement scheduled. The 2026 tech roadmap does not commit to any EC-deprecation milestone.

**Planned future work.** None published.

## Governance

BNB Chain's protocol changes are coordinated by the BNB Chain core development team (Binance-aligned) through hard forks; validator coordination is required for activation but the validator set is largely Binance-selected. Proposal discussion happens through [BEPs](https://github.com/bnb-chain/BEPs) and on the chain-development repo.

Active PQ-relevant work:

- [bnb-chain/bsc#3660](https://github.com/bnb-chain/bsc/pull/3660) — "all: post quantum migration poc." Status: Draft (opened 2026-04-28). 14 commits, 4,805+/50- across 58 files. Authored by `fynnss` (Fynn Zhang). Adds `PQTxType=0x05`, `PQVoteAttestation` (ML-DSA-44 + STARK aggregation), PQ Registry precompile at `0x70`, `bsc4` P2P sub-protocol, `--pqvotekey` operator flag, `PQ_PLAN.md` document, and dedicated end-to-end tests.
- [BEP-575](https://github.com/bnb-chain/BEPs/pull/575) — Falcon Post-Quantum Signatures. Status: Draft (filed 2025-05-19). Stale: bsc#3660 selected ML-DSA-44 over Falcon. Likely needs revision or replacement.

Roadmap context:

- [2026 BNB Chain Tech Roadmap](https://www.bnbchain.org/en/blog/tech-roadmap-2026) emphasizes performance (20,000 TPS target), dual-client strategy (Geth + Reth), and native privacy. PQ is signalled via the bsc#3660 PoC but is not on the public 2026 roadmap.

No fork has been scheduled or signaled for any of the above.

---

_Generated on 5 May 2026 based on information as of 1 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
