# Wormhole (W) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Wormhole |
| **Ticker** | W |
| **Asset class** | Utility |
| **Issuer** | Wormhole Foundation |
| **Host chain(s)** | Solana (canonical SPL), Ethereum (ERC-20 via Wormhole NTT), and many additional chains via Wormhole NTT |
| **Website** | https://wormhole.com/ |
| **Contract address** | `85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ` (canonical SPL token on Solana) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Wormhole's W token is the utility token of the Wormhole cross-chain messaging protocol, and it also carries a governance role through Wormhole's MultiGov system. W is canonically issued as a Solana SPL token, and Wormhole's Native Token Transfer (NTT) standard extends it to Ethereum and a wide range of other chains. Because of that footprint, W's quantum exposure is shaped by two things: the chains it runs on, and the cryptography of the Wormhole protocol itself.

A token cannot be more quantum-safe than the chain it executes on — host-chain inheritance sets the ceiling, and the token-issuer surfaces (admin keys, the cross-chain mechanism) set the floor. Today both sit at the same level. Every evaluated host chain is quantum-exposed in at least one category, and the Wormhole-Foundation-controlled surfaces — the SPL mint and freeze authorities, the NTT owner roles on each deployment, and the [19-Guardian](https://wormhole.com/docs/protocol/infrastructure/guardians/) attestation network that authorizes every cross-chain transfer — are uniformly elliptic-curve. No Wormhole-Foundation-attributable post-quantum migration plan for any of these surfaces has been located.

## Proposed and Implemented PQC Algorithms

Wormhole does not currently propose or implement any post-quantum cryptographic algorithms on W's token-issuer surfaces.

## 1. Host Chain Aggregate

**Grade: F ❌**

W is canonically issued as a Solana SPL token at `85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ`. Through Wormhole's [NTT (Native Token Transfer)](https://wormhole.com/products/ntt) standard, W is also deployed on Ethereum, BNB Chain, Avalanche, Optimism, Arbitrum, Base, Aptos, Sui, and others — each NTT host being an independent contract that mints W only when authorized by the Guardian network.

W's transaction signing, consensus participation, and peer-to-peer networking exposure are properties of these host chains, not of the W token itself. The token inherits whatever posture its host chains have, and it cannot be more quantum-safe than the chains it runs on.

**Current state.** Every evaluated host chain is quantum-exposed in at least one category. Solana, the canonical host, is exposed on its peer-to-peer and protocol-specific surfaces. Ethereum is exposed on peer-to-peer networking. BNB Chain, Avalanche, Aptos, and Sui are each exposed in at least one category. The L2 NTT hosts — Optimism, Arbitrum, and Base — inherit Ethereum's settlement posture. All evaluated hosts sit at the same exposure floor, so the aggregate rating is the worst of them: exposed. There is no outlier here — the exposure is pervasive across the host set rather than concentrated in one chain. Where these host chains have their own public PQC readiness reports, consult them directly for the chain-level detail; Solana and Ethereum are the two most material hosts for W.

**Planned future work.** The intel reviewed records no host-chain migration milestone that would lift this aggregate rating.

## 2. Admin / Privileged Roles

**Grade: F ❌**

W carries Wormhole-Foundation-controlled privileged authority, and the exact surface differs by host:

- On the **canonical Solana SPL token**, the Wormhole Foundation holds an Ed25519 mint authority and an Ed25519 freeze authority. Genesis was 10 billion W with a documented unlock schedule, and the mint authority remains active to service that schedule.
- On the **NTT EVM deployments**, each contract is an upgradeable `Ownable` contract behind a proxy. The owner can adjust Guardian-set quorum requirements, pause bridging, and reconfigure the trusted Wormhole Core contract. Owner control is exercised through a Foundation multisig signing with secp256k1 ECDSA.
- On the **NTT non-EVM deployments** (Aptos, Sui, and others), there is equivalent admin authority signed with host-native elliptic-curve schemes.

Wormhole Foundation operational custody is held in multi-party multisigs; the signer rosters and thresholds are not fully published.

**Current state.** All admin signing across every host is elliptic-curve — Ed25519 on Solana, ECDSA on EVM hosts, host-native EC elsewhere. No concrete post-quantum proposal currently exists for W's admin keys, the NTT owner multisigs, or the operational treasury. ([W on Solana](https://solscan.io/token/85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ), [W on Ethereum](https://etherscan.io/token/0xb0ffa8000886e57f86dd5264b9582b2ad87b2b91).)

## 3. Cross-Chain Mechanism

**Grade: F ❌**

W moves between chains via [Wormhole's own NTT (Native Token Transfer) standard](https://wormhole.com/products/ntt), which is gated by Wormhole's core [Guardian network](https://wormhole.com/docs/protocol/infrastructure/guardians/).

The transfer flow works in four stages: a user calls `transfer()` on the source-chain NTT contract, which burns or locks the source token and emits a Wormhole message; the 19 Guardian validators each independently observe that message; each Guardian signs it with ECDSA secp256k1, and a 13-of-19 threshold of those signatures forms a Verified Action Approval (VAA) — a standard multisig of 13 individual signatures, not a threshold signature scheme; and finally the [Wormhole Core Contract](https://wormhole.com/docs/protocol/security/) on the destination chain verifies all 13 ECDSA signatures against the known Guardian set before the NTT contract mints or releases the token. A Guardian overview is published [here](https://wormhole.com/blog/wormhole-101-guardians).

**Current state.** The entire attestation path is elliptic-curve. Guardian public keys are necessarily known, since on-chain verification depends on them, so the cryptographic surface is the full ECDSA Guardian set. An attacker able to derive a 13-of-19 majority of Guardian private keys could forge arbitrary VAAs. No concrete post-quantum migration of the Guardian signing scheme has been announced.

The intel reviewed also notes a structural sizing constraint that is independent of any migration intent: post-quantum signatures are far larger than the ~64-byte ECDSA signatures used today, so a 13-of-19 post-quantum-signed VAA would grow the signature payload by roughly two orders of magnitude, with corresponding per-chain calldata costs. A move to a threshold post-quantum scheme producing a single aggregate signature would mitigate that, but such schemes remain research-stage ([ACM survey on threshold lattice signatures](https://dl.acm.org/doi/full/10.1145/3772274)).

## 4. Reserve / Custody

**Grade: ➖**

W is an unbacked utility and governance token. There is no off-chain reserve, no proof-of-reserves pipeline, and no custody-to-chain mint authority — supply is set programmatically by the W tokenomics unlock schedule. With no off-chain custody linked to the on-chain contract, there is no custody-to-chain cryptographic surface to rate, so this category does not apply.

## 5. Other Token-Specific Crypto

**Grade: F ❌**

W's NTT contracts do not embed token-specific cryptography beyond the standard NTT message format already covered under the Cross-Chain Mechanism. The value of W, however, depends on the security of the Wormhole protocol as a whole: the Guardian set, the VAA verification performed by every connected chain's Core Contract, and any future protocol-layer cryptographic upgrades.

**Current state.** The protocol-layer cryptography that gives W its utility is uniformly elliptic-curve.

**Planned future work.** Wormhole has [discussed](https://wormhole.com/docs/protocol/security/) transitioning to ZK proofs for VAA verification, and its [blog](https://wormhole.com/blog/) carries posts weighing STARK and SNARK options. A STARK-based (hash-based) proof system would be a post-quantum-positive direction. As of this review, however, no production deployment of ZK-based VAA verification has shipped, and the discussed ZK work does not name a post-quantum migration target for the Guardian signing layer itself.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to *retire* elliptic-curve cryptography on the token's own surfaces, which is distinct from whether the token is *adopting* post-quantum cryptography.

No Wormhole-Foundation-attributable plan to retire elliptic curve has been located for the 19-Guardian secp256k1 ECDSA signing keys, the canonical Solana SPL mint and freeze authorities (Ed25519), the NTT owner multisigs on each connected chain, or the Wormhole Core contracts' admin keys. Wormhole's published [roadmap](https://wormhole.com/roadmap) covers NTT expansion, MultiGov cross-chain governance, the Settlement intent-based bridging product, and ZK verification research — none of which schedules elliptic-curve retirement on the Guardian set or admin keys. The Wormhole [blog](https://wormhole.com/blog) carries no post-quantum or EC-retirement posts.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ❌.

## Issuer & Governance

Wormhole is operated by the **Wormhole Foundation**, a Cayman Islands foundation, with original protocol development by Jump Crypto. The 19 Guardian validators run a Proof-of-Authority consensus model with equal weight; changes to the Guardian set require a Guardian supermajority vote.

W token holders have a governance role through **MultiGov**, Wormhole's cross-chain governance system. The initial governance scope is limited and Foundation-mediated; protocol upgrades that touch the Guardian set, the Core contracts, or VAA verification require operational coordination across every connected chain.

Wormhole's product and roadmap commitments are disclosed through the Wormhole [blog](https://wormhole.com/blog) and [roadmap](https://wormhole.com/roadmap) pages — those are the venues where any post-quantum commitment would be expected to surface. As of this review, no dated, on-record post-quantum milestone has been published, and no post-quantum proposal has been tabled through MultiGov.

---

_Generated on 16 May 2026 based on information as of 15 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
