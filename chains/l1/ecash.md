# eCash (XEC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | eCash |
| **Ticker** | XEC |
| **Website** | <https://e.cash/> |
| **GitHub** | <https://github.com/Bitcoin-ABC> |
| **Derived from** | Bitcoin Cash (ABC chain split, 2020) |
| **On-chain environment** | Bitcoin Script (with BCH-era extensions) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

eCash split from Bitcoin Cash in November 2020 and [rebranded from BCHA to eCash in July 2021](https://e.cash/blog/bitcoin-abc-rebrands-to-ecash-embraces-proof-of-stake-and-2-decimal-places), redenominating to two decimal places and committing to a stake-weighted finality layer. The chain inherits Bitcoin Cash ABC's transaction format, Bitcoin Script with BCH-era extensions, and the legacy Bitcoin P2P protocol. The published [eCash roadmap](https://e.cash/roadmap) is organized around three pillars — Scaling, Usability, and Extensibility — and does not list post-quantum cryptography, signature-scheme retirement, or any related work item.

The defining cryptographic feature of eCash today is its hybrid consensus: SHA-256d Proof-of-Work block production combined with a stake-weighted [Avalanche post-consensus](https://www.bitcoinabc.org/2022-09-29-avalanche-post-consensus/) layer (activated 2022-09-14) and [Avalanche pre-consensus](https://en.cryptonomist.ch/2025/10/06/ecash-ready-to-revolutionize-digital-transactions-avalanche-style-pre-consensus-arrives/) (activated 2025-11-15 at block 923,347). This "Avalanche" is namesake-collided with the AVAX chain but architecturally distinct: eCash's design is a Snowball-family voting protocol bound entirely to Schnorr signatures over secp256k1, whereas the AVAX network's validator layer is built on BLS12-381 aggregate signatures. The two share a family of consensus ideas, not a cryptographic toolkit.

## Proposed and Implemented PQC Algorithms

> eCash does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for eCash in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

eCash's consensus is a hybrid of SHA-256d Proof-of-Work mining and a stake-weighted Avalanche voting layer that finalizes transaction ordering. The PoW mining layer is hash-based and not threatened by Shor's algorithm, but on eCash mining is not the binding layer for canonical history. Since [Avalanche post-consensus](https://www.bitcoinabc.org/2022-09-29-avalanche-post-consensus/) activated in September 2022, each block has been finalized by a Snowball-style vote among stakers; and since [Avalanche pre-consensus](https://en.cryptonomist.ch/2025/10/06/ecash-ready-to-revolutionize-digital-transactions-avalanche-style-pre-consensus-arrives/) activated on 2025-11-15, transaction ordering itself is fixed by stakers before a miner can include it in a block. The Avalanche layer is therefore what binds the canonical chain, and its rating drives this category's grade.

The Avalanche staker cryptography is documented in the [Bitcoin ABC source](https://github.com/Bitcoin-ABC/bitcoin-abc/blob/master/src/avalanche/proof.h) and in the [technical overview of Avalanche Proofs and Proof Delegations](https://e.cash/blog/technical-overview-of-avalanche-proofs-and-proof-delegations). A staker registers a Proof containing a master public key (secp256k1), a list of SignedStake entries each binding a 100,000,000-XEC UTXO with at least 2016 confirmations to its spending key via a Schnorr signature, and a Schnorr signature by the master key over the limited proof ID. The proof master can then issue a [chain of up to 20 Schnorr-signed delegations](https://github.com/Bitcoin-ABC/bitcoin-abc/blob/master/src/avalanche/delegation.h) so that a hot key on the running avalanche node can vote on the master key's behalf. Reward selection across stakers is deterministic, derived from `hash(previous block hash ‖ Proof ID)` scaled by stake weight, with no verifiable-random-function or VDF component. Every signature in this pipeline is Schnorr over secp256k1.

Within this architecture there is no chain-attributable post-quantum consensus work: no draft, no testnet branch, no entry in the Bitcoin ABC repository, and no item on the published roadmap. This category therefore receives the F-rating treatment because the binding layer is fully exposed even though the underlying PoW is not.

**Current state.** SHA-256d PoW for block production; Avalanche pre- and post-consensus for finality and ordering, with Proofs, Stakes, and Delegations all signed with Schnorr over secp256k1.

**Planned future work.** No post-quantum consensus proposal is currently published.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for eCash in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

eCash exposes a limited on-chain signature-verification surface through Bitcoin Script with BCH-era extensions: OP_CHECKSIG and OP_CHECKMULTISIG inherited from Bitcoin, plus OP_CHECKDATASIG / OP_CHECKDATASIGVERIFY (signature verification over arbitrary data) and the native introspection opcodes (codepoints 0xc0–0xcf) inherited from Bitcoin Cash. All three signature opcodes verify only secp256k1 — either ECDSA or the BCH-style Schnorr variant — and the hash opcodes (OP_SHA256, OP_HASH256, OP_RIPEMD160, OP_HASH160, OP_SHA1) are the only quantum-neutral primitives in the set. The chain has not adopted Bitcoin Cash's CashTokens (May 2023) and has not picked up Bitcoin Cash's hash-based Quantumroot vault work, which is maintained on the BCH side of the 2020 chain split.

Two items on the published [eCash roadmap](https://e.cash/roadmap) — "Advanced Opcodes" and a "New Transaction Format" — are listed as planned but are not scoped to post-quantum cryptography. The planned EVM subnet would inherit Ethereum's EC-based precompile set rather than add PQ verification, and a planned ZK subnet has no committed proof-system choice.

**Current state.** Bitcoin Script + BCH extensions verify only secp256k1 ECDSA and Schnorr. No PQ verification primitive is implemented in any opcode, contract, or precompile.

**Planned future work.** No post-quantum verification opcode or precompile is currently proposed.

## 5. Other Features

### Avalanche Staking (Proofs + Delegations)

**Current state.** Stake-weighted voting on eCash is anchored to Avalanche [Proofs](https://e.cash/blog/technical-overview-of-avalanche-proofs-and-proof-delegations) that bind 100,000,000-XEC UTXOs (≥2016 confirmations) to a master public key via Schnorr signatures, with up to twenty levels of Schnorr-signed delegation allowing a cold-storage master key to authorize a hot avalanche-node key. Every signature in the stake commitment, the proof master signature, and each delegation hop is Schnorr over secp256k1. A quantum break of secp256k1 would let an adversary forge stake commitments and delegations and thereby control the finality and reward-selection layer.

**Planned future work.** No post-quantum staking-credential scheme is currently proposed.

### CashFusion

**Current state.** [CashFusion](https://e.cash/) — the coordinated, non-custodial mixing protocol inherited from Bitcoin Cash — has users commit Schnorr-signed inputs and outputs to a Tor-routed coordinator that assembles a single multi-input fusion transaction. The cryptographic commitments are Schnorr signatures over secp256k1. A future quantum break would retroactively deanonymize the historical fusion-mixed coin trails, because the commitments and signatures preserved in chain history are themselves the linkability seal.

**Planned future work.** No post-quantum alternative to the CashFusion commitment scheme is currently published.

### Subnets (planned)

**Current state.** The roadmap describes two planned subnets: an [EVM subnet and a ZK subnet](https://xolosarmy.xyz/blog/subnets-in-ecash.html). Neither is shipped. The EVM subnet would inherit Ethereum's existing secp256k1 / BN254 / BLS12-381 precompile inventory; the ZK subnet has no committed proof-system choice on the public record. Mainstream production ZK stacks are predominantly SNARK-based and rely on elliptic-curve pairings; whether the eCash ZK subnet will use a hash-based STARK pipeline or a pairing-based SNARK pipeline is not stated.

**Planned future work.** No subnet design document currently scopes a post-quantum cryptographic profile.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, eCash's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

The [eCash roadmap](https://e.cash/roadmap) does not contain a published plan to deprecate or remove elliptic-curve cryptography from any layer of the protocol. Transaction signatures continue to be ECDSA and Schnorr over secp256k1; the Avalanche pre- and post-consensus layers are fully Schnorr-bound; node identity and the staker Proof master key are both secp256k1; on-chain signature verification supports only secp256k1; and the Avalanche staking and CashFusion features are EC-bound by construction. No phase-out schedule, soft-fork plan, or deprecation discussion is currently published.

**Current state.** Every cryptographic surface in eCash uses elliptic-curve primitives; none has a scheduled retirement.

**Planned future work.** No EC-retirement proposal is currently published.

## Governance

eCash protocol changes are coordinated by the [Bitcoin ABC](https://www.bitcoinabc.org/) team, which maintains the reference node implementation. Bitcoin ABC ships protocol upgrades on a scheduled twice-yearly cadence (May 15 and November 15). Design discussion happens on the [Bitcoin ABC site and blog](https://www.bitcoinabc.org/blog/) and within the development team; eCash does not operate a public numbered-proposal process equivalent to Bitcoin's BIP repo or Bitcoin Cash's CHIP repo. Avalanche stakers can in principle decline to follow a new ruleset, but in practice the network has tracked Bitcoin ABC releases.

Recent and upcoming protocol activations on the public record:

- Avalanche post-consensus — activated [2022-09-14](https://www.bitcoinabc.org/2022-09-29-avalanche-post-consensus/).
- Heartbeat real-time difficulty adjustment — activated 2024-11-15.
- [Avalanche pre-consensus](https://en.cryptonomist.ch/2025/10/06/ecash-ready-to-revolutionize-digital-transactions-avalanche-style-pre-consensus-arrives/) — activated 2025-11-15 at block height 923,347.
- Next scheduled network upgrade — 2026-05-15.

No post-quantum proposal is currently on the public record for any of these upgrade windows.

---

_Generated on 14 May 2026 based on information as of 14 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
