# Tezos (XTZ) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Tezos |
| **Ticker** | XTZ |
| **Website** | https://tezos.com/ |
| **GitHub** | https://gitlab.com/tezos/tezos |
| **Twitter / X** | https://x.com/tezos |
| **On-chain environment** | Michelson |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Tezos has a published preview proposal for a tz5 account type built on **ML-DSA-44** (Dilithium / FIPS 204), introduced by [Nomadic Labs on Tezos Agora in February 2026](https://forum.tezosagora.org/t/heads-up-post-quantum-user-keys/6980). The chain's [self-amending governance](https://docs.tezos.com/architecture/governance) means PQC additions can be ratified through on-chain voting rather than a contentious hard fork. The stated rationale for staging tz5 early is that cryptographic migrations are socially difficult, and pre-staging gives wallets, custodians, and tooling time to integrate.

The picture today, however, is that all current account types (tz1–tz4), the Tenderbake consensus layer, the P2P NaCl encrypted channels, the Michelson on-chain signature opcodes, and additional features such as Smart Rollups, BLS aggregation, and Sapling privacy are all elliptic-curve or pairing based. No tz5 activation date has been published, no consensus PQC proposal has been drafted, and tz1–tz4 are explicitly slated to remain in the protocol indefinitely for backward compatibility.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA-44** (Dilithium / FIPS 204) | Ed25519, secp256k1, P-256 (tz1/tz2/tz3) | Tx Signatures | Discussed (tz5 proposal preview, Feb 2026) |

## 1. Transaction Signatures

**Grade: D ⚠️**

Tezos accounts today use Ed25519 (tz1, most common), secp256k1 (tz2, Bitcoin/Ethereum compatible), P-256 (tz3, NIST-standard with HSM support), or BLS12-381 (tz4, used for consensus aggregation and multisig). All four are elliptic-curve schemes; none are post-quantum.

In February 2026, [Nomadic Labs published a tz5 preview](https://forum.tezosagora.org/t/heads-up-post-quantum-user-keys/6980) on Tezos Agora proposing **ML-DSA-44** as a new account type. The proposal targets activation through Tezos's on-chain self-amending governance rather than a hard fork.

**Current state.** Mainnet transactions sign with Ed25519 / secp256k1 / P-256 / BLS12-381. **ML-DSA-44** is in preview as tz5 with no scheduled activation date.

**Planned future work.** The tz5 proposal needs to advance through the on-chain amendment stages (Proposal Period → Exploration Vote → Cooldown → Promotion Vote → Adoption). No vote has been called.

## 2. Consensus

**Grade: F ❌**

[Tenderbake](https://octez.tezos.com/docs/quebec/consensus.html), Tezos's deterministic PBFT-variant consensus, signs blocks with Ed25519 (traditional bakers) or BLS12-381 aggregated signatures (tz4 consensus keys, enabled in the Seoul protocol). Both are elliptic-curve. A quantum break against either would let an attacker forge consensus messages.

No specific consensus PQC proposal has been published. Tezos's self-amendment in principle allows for parallel ML-DSA-44 consensus keys in a future amendment, mirroring the tz5 user-key approach, but no such amendment has been drafted.

**Current state.** Ed25519 baker signing and BLS12-381 (tz4) consensus aggregation. No PQ alternative drafted.

**Planned future work.** Possible future amendment paralleling tz5; no draft published.

## 3. P2P Networking

**Grade: D ⚠️**

The [Tezos P2P layer](https://tezos.gitlab.io/shell/p2p.html) is a custom transport (not libp2p or devp2p) that uses NaCl authenticated encryption. Node identity is derived from a proof-of-work nonce computed at node startup, making peer IDs ephemeral rather than persistent cryptographic keys.

The layer is structurally amendable independently of consensus: a future protocol amendment could replace the encrypted-channel scheme without touching consensus rules. No concrete post-quantum handshake proposal has been drafted.

**Current state.** NaCl encrypted channels (EC-based key derivation). Ephemeral PoW-derived peer identity.

**Planned future work.** No specific proposal in flight; self-amendment provides the migration path when a proposal is drafted.

## 4. On-Chain Logic

**Grade: D ⚠️**

[Michelson](https://octez.tezos.com/docs/active/michelson.html) — Tezos's smart-contract VM — has signature-verification opcodes for Ed25519, secp256k1, P-256, and BLS12-381, plus pairings and G1/G2 point operations on BLS12-381. There are no PQC verification opcodes on mainnet today.

The Tezos cryptography research roadmap notes that Michelson opcodes for **ML-DSA-44** are expected to follow tz5 user-key activation, so smart contracts can verify post-quantum signatures. STARK-based proof verification is referenced as speculative future work rather than committed.

**Current state.** Michelson verifies Ed25519, secp256k1, P-256, and BLS12-381. No PQC verification opcode shipped.

**Planned future work.** **ML-DSA-44** verification opcodes expected to follow tz5 activation, enabled via a future protocol amendment.

## 5. Other Features

### Smart Rollups

**Current state.** [Smart Rollups](https://octez.tezos.com/docs/active/smart_rollups.html) are permissionless rollups whose execution is verified on-chain via a Proof-generating Virtual Machine. Most current rollup kernels and examples use EC for user transactions; the architecture itself permits any signature scheme and is not bound to L1 crypto.

**Planned future work.** Rollups could be deployed using STARK-based proofs (hash-based, quantum-safe) or accepting PQC-signed transactions natively. No Tezos rollup currently uses STARKs in production.

### BLS Aggregation

**Current state.** [BLS12-381 signature aggregation](https://research-development.nomadic-labs.com/files/cryptography.html) reduces consensus message size by combining ~200 individual attestations per block into a single aggregated signature. A quantum break against BLS12-381 would let an attacker forge aggregated attestations.

**Planned future work.** No known post-quantum aggregation scheme matches BLS performance. A PQ migration would likely fall back to non-aggregated signatures (with higher network overhead) or threshold signatures, deployed in parallel with non-aggregating PQ consensus signing. No draft published.

### Sapling Privacy

**Current state.** [Sapling](https://research-development.nomadic-labs.com/private-rollups.html) is integrated as a Michelson smart-contract primitive (since the Edo protocol upgrade) for shielded fungible-token transactions. It uses Groth16 zk-SNARKs over BLS12-381 — the same construction as Zcash Sapling. A quantum break would deanonymize the Sapling transaction history retroactively.

**Planned future work.** No Tezos Sapling STARK rewrite exists. Migrating to a post-quantum proof system would require a complete circuit redesign. No proposal has been drafted.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Tezos's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ❌, P2P ⚠️, On-Chain ⚠️, Other ⚠️.

The [tz5 proposal](https://forum.tezosagora.org/t/heads-up-post-quantum-user-keys/6980) explicitly states tz1/tz2/tz3/tz4 will remain in the protocol indefinitely for backward compatibility. Migration is opt-in: users voluntarily create tz5 accounts; existing accounts may rotate. No deprecation timeline is published, and Tezos cultural preference is for soft deprecation rather than forced migration. Sapling and BLS aggregation have no migration plan at all today.

**Current state.** No EC retirement schedule. Infrastructure pre-staging for tz5 is in progress; tz1/tz2/tz3/tz4 will coexist with tz5 indefinitely.

**Planned future work.** None scheduled.

## Governance

Tezos protocol changes pass through [on-chain self-amending governance](https://docs.tezos.com/architecture/governance): Proposal Period → Exploration Vote (5% threshold to advance) → Cooldown → Promotion Vote (supermajority) → Adoption. Delegates holding XTZ stake vote; no individual or organization has veto. The chain has never hard-forked.

PQ-relevant venues and proposals on the public record:

- [Tezos Agora forum](https://www.tezosagora.org/) and [Tezos Community Forum](https://forums.tezos.community/) — primary discussion venues for protocol amendments.
- [Heads-up: Post-quantum user keys](https://forum.tezosagora.org/t/heads-up-post-quantum-user-keys/6980) — tz5 / **ML-DSA-44** preview by Nomadic Labs (Feb 2026). Status: preview / under discussion. No protocol amendment has been submitted to a Proposal Period vote.
- [Nomadic Labs cryptography research](https://research-development.nomadic-labs.com/files/cryptography.html) — broader Octez crypto and HACL\* integration work that underpins the PQ effort.
- [The Baking Sheet](https://bakingsheet.tezoscommons.org/p/the-baking-sheet-issue-294) — community newsletter that covers consensus and tz5 discussions.

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
