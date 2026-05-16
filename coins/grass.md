# Grass (GRASS) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Grass |
| **Ticker** | GRASS |
| **Asset class** | DeFi Governance |
| **Issuer** | Grass Foundation (an "ownerless foundation"; subsidiaries Grass OpCo Ltd. and Grass DataCo Ltd.) |
| **Host chain(s)** | Solana |
| **Website** | https://www.grass.io/ |
| **Contract address** | `Grass7B4RdKfBCjTKgSqnXkqjwiGvQyFbuSCUJr3XXjs` (SPL mint on Solana) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | ➖ | ➖ | Not Applicable |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Grass is a DePIN utility and governance token issued only on Solana as a standard SPL token. Its post-quantum posture today rests on two things: what it inherits from Solana, and what the Grass Foundation controls directly. A token cannot be more quantum-safe than the chain it runs on — host-chain inheritance is the ceiling, and the issuer's own surfaces (admin keys, governance authentication, and any token-specific cryptography) set the floor. Both are currently exposed.

On the issuer-controlled side, Grass has revoked the SPL freeze authority but kept its mint authority live, and that key — along with the metadata authority, treasury keys, governance wallet authentication, and the cryptography behind its data-rollup product — relies on elliptic-curve signatures. No published Grass Foundation document or governance proposal discusses migrating any of these surfaces to post-quantum cryptography. There is no Grass-attributable public PQC roadmap or statement to link.

## Proposed and Implemented PQC Algorithms

Grass does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

GRASS is issued only on Solana, as the SPL token with mint `Grass7B4RdKfBCjTKgSqnXkqjwiGvQyFbuSCUJr3XXjs`. Because the token runs on a single host chain, its transaction signing, consensus, and networking exposure are entirely Solana's — not surfaces the Grass Foundation builds or controls. The token cannot be more quantum-safe than the chain it executes on, so Solana's posture is the ceiling for everything below.

**Current state.** On [Solana](../chains/l1/solana.md), the worst-rated categories — peer-to-peer networking and other chain features — remain exposed, which pulls the inherited aggregate to F. With only one host chain in the canonical deployment, no distribution qualifier applies; the exposure is not an outlier but the chain's current baseline.

**Planned future work.** Solana does have host-chain migration activity on record: its transaction-signature and consensus categories reflect a wallet-scoped post-quantum roadmap published by the Solana Foundation, and its on-chain logic category reflects an in-flight post-quantum signature-verification syscall. Those efforts belong to Solana and are tracked on the [Solana report](../chains/l1/solana.md). They do not yet lift the peer-to-peer and other-features categories that drive this aggregate.

## 2. Admin / Privileged Roles

**Grade: F ❌**

GRASS is a standard SPL token, and its on-chain authority state was read directly from a Solana RPC `getAccountInfo` query on the mint account.

**Current state.** The freeze authority is `null` — revoked — so no party can freeze GRASS token accounts; this removes one elliptic-curve lever. The mint authority, however, is still live and held by the account `31rYartQwHeBMjAe2MgGpffGV57fQY3kug4BDN8tLGqQ`, which can still mint additional GRASS. The "fixed 1 billion supply" described in [Grass's tokenomics documentation](https://grass-foundation.gitbook.io/grass-docs/introduction/grass/grass-tokenomics) is therefore a policy commitment enforced by emission schedule and vesting, not an irreversible on-chain cap. The mint-authority address is a plain System Program account holding no data of its own, which is consistent with either a single elliptic-curve keypair or a multisig vault account; Grass has not published the signer roster or threshold. Either way, the underlying signature scheme is Ed25519, which is quantum-vulnerable. The token metadata / update authority and governance vote authentication (by Solana wallet signature) are likewise elliptic-curve by default. An attacker able to forge the mint-authority signature could inflate supply arbitrarily. No concrete post-quantum proposal currently exists for any of these keys, and the freeze-authority revocation is not itself a post-quantum migration — it removes one elliptic-curve surface while the others remain. Evidence: the [GRASS SPL mint on Solscan](https://solscan.io/token/Grass7B4RdKfBCjTKgSqnXkqjwiGvQyFbuSCUJr3XXjs) and [Grass tokenomics](https://grass-foundation.gitbook.io/grass-docs/introduction/grass/grass-tokenomics).

**Planned future work.** No Grass Foundation document or governance proposal discusses migrating the mint authority, metadata authority, or governance wallet authentication to post-quantum cryptography.

## 3. Cross-Chain Mechanism

**Grade: ➖**

GRASS is canonically deployed only on Solana. There is no bridged, wrapped, or cross-chain-messaging representation in the documented deployment set, and no cross-chain governance or oracle messaging in the token's trust path. With no cross-chain mechanism to evaluate, this category does not apply. If Grass later deploys a bridged GRASS representation, this category would need to be re-rated and would inherit the posture of whatever bridge is used.

## 4. Reserve / Custody

**Grade: ➖**

GRASS is an unbacked DePIN utility and governance token. There is no fiat peg, no real-world-asset collateral, no off-chain reserve pool, and no custody-to-chain mint-attestation linkage. Token emission is governed by the vesting schedule and the live mint authority (covered under Admin / Privileged Roles), and there is no separate custody-to-chain signing infrastructure, so there is no custody surface to rate.

## 5. Other Token-Specific Crypto

**Grade: F ❌**

Grass is more than a plain token issuer: it operates the Grass Sovereign Data Rollup, an application-layer data-provenance system on Solana. Its ZK Processor aggregates per-session zero-knowledge proofs that a dataset was collected correctly and checkpoints those proofs to Solana, while the Grass Data Ledger stores datasets linked to their on-chain proof references. This is token-specific cryptography in scope for this category.

**Current state.** The zero-knowledge proof system is the cryptographic binding between off-chain scraped datasets and their on-chain provenance records. Grass's public materials describe a succinct-proof design — small proofs, fast verification, checkpointed to the chain — rather than a transparent hash-based system. Succinct pairing-based proof systems of that class are quantum-vulnerable; a transparent hash-based proof system would be potentially quantum-safe. Grass has not published a proof-system specification precise enough to rule out a hash-based design, and no Grass-attributable material claims post-quantum proof security. Validator and router roles in the rollup sign their batched web-transaction attestations with Solana Ed25519 keys, which are quantum-vulnerable. A quantum break of the proof system would let an attacker forge dataset provenance records — false attestations that data was collected honestly — undermining the AI-provenance guarantee the rollup exists to provide. Evidence: the [Grass Data Rollup and AI provenance overview](https://www.grass.io/learn), the [Layer-2 Data Rollup launch coverage](https://support.bitrue.com/hc/en-001/articles/29839999942553-Grass-Launches-Layer-2-Data-Rollup-on-Solana-to-Enhance-Transparency-in-AI-Data), and the [ZK Processor and Data Ledger description](https://coinmarketcap.com/cmc-ai/grass/what-is/).

**Planned future work.** No Grass-attributable research, proposal, or roadmap discusses a post-quantum migration for the data-rollup proof system or for validator and router signing.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to retire elliptic-curve cryptography on the token's own surfaces — distinct from whether it is adding post-quantum cryptography alongside it. Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ➖, Reserve & Custody ➖, Other ❌.

**Current state.** There is no Grass-attributable plan to retire elliptic-curve cryptography on any of the token's surfaces: the live SPL mint authority (the highest-blast-radius surface, since it can still inflate supply), the token metadata / update authority, the Foundation treasury keys holding the foundation GRASS allocation, governance and voting wallet authentication, or the Grass Sovereign Data Rollup proof system and its validator/router attestation keys. All of these rely on Ed25519. The freeze-authority revocation retired one elliptic-curve surface but did not establish a retirement path for any of the still-active keys, and the mint authority was deliberately kept live.

**Planned future work.** No Grass governance thread or Foundation document in the public record discusses elliptic-curve retirement. See the [Grass documentation](https://grass-foundation.gitbook.io/grass-docs/), where no EC-retirement material was found.

## Issuer & Governance

Grass is the flagship product of Wynd Network (Wynd Labs), launched in October 2024. The protocol and token are stewarded by the Grass Foundation, described in its own documentation as an "ownerless foundation" with no shareholders. The Foundation operates two subsidiaries: Grass OpCo Ltd. (network operations, including airdrop and staking distributions) and Grass DataCo Ltd. (the B2B data business and its revenue). GRASS is the network's utility and governance token; holders vote on protocol parameters, incentive mechanisms, and partnerships via Solana wallet signatures.

Foundation and governance disclosures appear in the [Grass documentation](https://grass-foundation.gitbook.io/grass-docs/), including the [tokenomics](https://grass-foundation.gitbook.io/grass-docs/introduction/grass/grass-tokenomics) and the [general FAQ](https://grass-foundation.gitbook.io/grass-docs/introduction/general-grass-faq) describing the Foundation structure. None of the published Foundation or governance material addresses cryptographic primitives or post-quantum migration; governance attention is on emission schedules, the data-rollup roadmap, and B2B data-product launches. Readers tracking future PQC commitments would look to those venues for any change.

---

_Generated on 16 May 2026 based on information as of 16 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
