# BNB Chain (BNB) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | BNB Chain |
| **Ticker** | BNB |
| **Website** | <https://www.bnbchain.org/en> |
| **GitHub** | <https://github.com/bnb-chain> |
| **Twitter / X** | <https://x.com/BNBCHAIN> |
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

BNB Smart Chain (BSC) has published a formal [BSC PQC Migration Report](https://bnbchain.org/en/blog/bsc-post-quantum-cryptography-migration-report) (May 2026) and has an open proof-of-concept pull request — [bnb-chain/bsc#3660](https://github.com/bnb-chain/bsc/pull/3660) — covering transaction signatures, consensus vote aggregation, and on-chain key registry in a single integrated PoC. The chosen algorithm is **ML-DSA-44** (FIPS 204), selected over larger ML-DSA variants for its smaller signature size and faster verification within BSC's 450 ms slot budget. The report documents measured performance impact: native-transfer TPS drops approximately 40% (from 4,973 to 2,997), transaction size grows from 110 bytes to approximately 2.5 KB, and block size grows from approximately 110 KB to approximately 2 MB. The primary bottleneck identified is block byte size and cross-region propagation overhead — not signature verification. No code has merged to mainline yet, and no testnet deployment has been announced.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA-44** (FIPS 204) | ECDSA secp256k1 | Tx Signatures | In Development |
| **ML-DSA-44** (FIPS 204) | BLS12-381 vote aggregation | Consensus | In Development |
| **STARK** recursive aggregation | BLS aggregate fast-finality votes | Consensus | In Development |
| **ML-DSA-44** (FIPS 204) | ecrecover / secp256k1 on-chain | On-Chain | In Development |

## Transaction Signatures

**Grade: B 🔧**

User transactions on BNB Chain are currently signed with ECDSA secp256k1, inherited from Geth/Ethereum. Address derivation follows the standard EVM pattern (Keccak-256 of the public key, last 20 bytes).

**Current state.** All mainnet transactions require ECDSA secp256k1 signatures. Multi-signature is handled via smart contracts rather than at the protocol level.

**Planned future work.** [bsc#3660](https://github.com/bnb-chain/bsc/pull/3660) (draft, opened 2026-04-28) introduces a new transaction type `PQTxType = 0x05` — an EIP-2718-style envelope carrying a 1,312-byte **ML-DSA-44** public key and a 2,420-byte **ML-DSA-44** signature. The sender address is derived as `keccak256(pubkey)[12:]`, mirroring EVM address derivation, and the full public key is registered via a new on-chain PQ Registry precompile. The [BSC PQC Migration Report](https://bnbchain.org/en/blog/bsc-post-quantum-cryptography-migration-report) explains the algorithm selection: **ML-DSA-44** was chosen over the larger ML-DSA-65 and ML-DSA-87 variants for lower network overhead, citing approximately 1,500 verifications per second and 35% smaller key-plus-signature size compared to BLS-12-381 at equivalent post-quantum security.

## Consensus

**Grade: B 🔧**

BSC uses [Parlia](https://github.com/bnb-chain/bsc/blob/master/consensus/parlia/parlia.go), a hybrid Delegated Proof of Stake plus Proof of Authority engine. Forty-five validators are elected daily by staking rank; 21 are selected per epoch (18 from the top-ranked "Cabinet" plus 3 rotating "Candidates"), and they take turns producing blocks at 0.45-second slot times. Block signing uses ECDSA consensus keys; fast-finality vote aggregation uses BLS.

**Current state.** Mainnet consensus uses ECDSA block signing and BLS vote aggregation. Block time is 0.45 seconds with approximately 1.125-second practical finality.

**Planned future work.** [bsc#3660](https://github.com/bnb-chain/bsc/pull/3660) introduces `PQVoteAttestation`, which replaces the BLS aggregate fast-finality signature with a **STARK** recursive proof attesting to a committee of **ML-DSA-44** individual votes. The feature is gated on an `IsPQFork` flag and exposed via a new `bsc4` P2P sub-protocol carrying `PQVotesMsg`. Validators opt in by supplying a `--pqvotekey` flag; the `PQVotePool` runs on all nodes regardless, so peers accumulate and propagate PQ votes even without a local PQ key. The PR includes snapshot back-fill and cache-warmup logic for restart correctness and dedicated end-to-end tests. Not yet on testnet.

## P2P Networking

**Grade: D ⚠️**

BNB Chain inherits Ethereum's devp2p stack — RLPx with ECIES key exchange and secp256k1 node identity. Peer discovery uses Kademlia DHT (discv4 / discv5).

**Current state.** All node identity and key exchange is elliptic-curve-based. The bsc#3660 PoC adds a `bsc4` sub-protocol that carries PQ vote messages alongside the existing classical `bsc3` stream — in-repo work attributable to the PQC migration effort — but it does not replace devp2p key exchange, secp256k1 node identity, or transport encryption.

**Planned future work.** No proposal for quantum-resistant transport encryption or node identity has been published.

## On-Chain Logic

**Grade: B 🔧**

The BSC EVM exposes the standard Ethereum precompile set: `ecrecover` (secp256k1), ecAdd/ecMul/ecPairing (BN254), and BLS12-381 operations. No PQC signature verification is available on mainnet today.

**Current state.** Smart contracts can verify ECDSA secp256k1, BN254 pairings, and BLS12-381 signatures via precompiles. No post-quantum verification primitive is accessible on-chain.

**Planned future work.** [bsc#3660](https://github.com/bnb-chain/bsc/pull/3660) adds a PQ Registry precompile at address `0x70` that stores **ML-DSA-44** public keys for accounts that have submitted a `PQTxType` transaction, serving key lookups to consensus and sender-recovery code. Genesis seeds the registry with a non-zero nonce to prevent EIP-158 storage deletion. This supersedes the earlier [BEP-575](https://github.com/bnb-chain/BEPs/pull/575) Falcon precompile proposal, which is now stale.

## Other Features

### BNB Greenfield Bridge

**Current state.** The BNB Greenfield bridge — a bidirectional asset bridge between BSC and BNB Greenfield (a decentralized storage chain) — uses ECDSA-based multisig among Greenfield validators for cross-chain message authorization, drawing its validator set from Parlia consensus. Details are documented in the [BNB Greenfield programmability docs](https://docs.bnbchain.org/bnb-greenfield/core-concept/programmability/).

**Planned future work.** We have found no public information indicating migration activity for the Greenfield bridge or opBNB in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

### opBNB (OP Stack L2)

**Current state.** opBNB is an OP Stack optimistic rollup with BNB as the settlement asset. It inherits OP Stack's transaction signature requirements (ECDSA secp256k1 on the L1 settlement layer).

**Planned future work.** No opBNB-specific PQC migration plan has been published. Progress here follows the BSC and OP Stack migration tracks.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, BNB Chain's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus 🔧, P2P ⚠️, On-Chain 🔧, Other ❌.

[bsc#3660](https://github.com/bnb-chain/bsc/pull/3660) is structured as additive PQC rather than EC retirement. The classical ECDSA transaction path remains accepted alongside `PQTxType`, the BLS fast-finality path remains alongside `PQVoteAttestation`, all pre-existing precompiles (ecrecover, BN254, BLS12-381) are untouched, and the new `bsc4` sub-protocol runs in parallel with `bsc3`. The [2026 BNB Chain Tech Roadmap](https://www.bnbchain.org/en/blog/tech-roadmap-2026) does not commit to any EC-deprecation milestone.

**Current state.** No EC retirement scheduled or announced.

**Planned future work.** None published.

## Governance

BNB Chain protocol changes are coordinated through the core development team (Binance-aligned) via the BNB Enhancement Proposal (BEP) process and through hard forks requiring validator coordination. PQC-relevant proposals:

- **[bnb-chain/bsc#3660](https://github.com/bnb-chain/bsc/pull/3660)** — "all: post quantum migration poc." Status: Draft (opened 2026-04-28). 14 commits, 4,805+/50- across 58 files. Covers `PQTxType=0x05`, `PQVoteAttestation` (ML-DSA-44 + STARK aggregation), PQ Registry precompile at `0x70`, `bsc4` P2P sub-protocol, `--pqvotekey` operator flag, and `PQ_PLAN.md` design document. No BEP identifier assigned yet.

- **[BEP-575](https://github.com/bnb-chain/BEPs/pull/575)** — Falcon Post-Quantum Signatures. Status: Draft (filed 2025-05-19). This proposal is now stale; bsc#3660 selected ML-DSA-44 instead. A successor BEP formalizing the ML-DSA + STARK approach is expected.

The [BSC PQC Migration Report](https://bnbchain.org/en/blog/bsc-post-quantum-cryptography-migration-report) (published 2026-05-14, covered in the [press release](https://www.benzinga.com/pressreleases/26/05/52557707/bnb-chain-publishes-research-report-exploring-post-quantum-cryptography-migration-path-for-bsc)) is the first formal technical publication from the BNB Chain team on the migration path. No fork activation has been scheduled.

---

_Generated on 18 May 2026 based on information as of 18 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
