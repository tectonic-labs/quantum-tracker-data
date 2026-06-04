# Vaulta (A) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Vaulta |
| **Ticker** | A |
| **Website** | <https://www.vaulta.com> |
| **GitHub** | <https://github.com/AntelopeIO/spring> |
| **On-chain environment** | WASM (Antelope `nodeos`; EOS EVM is a separate sidechain) |
| **Mainnet genesis** | 2018-06-09 |
| **Current mainnet version** | AntelopeIO/spring v1.x with Savanna BFT (activated 2024-09-25) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Vaulta is an Antelope-based Layer 1 that [rebranded from EOS in March 2025](https://www.prnewswire.com/news-releases/eos-rebrands-to-vaulta-announces-strategic-shift-to-web3-banking-and-banking-advisory-group-302404988.html), with the native token [ticker swapping from EOS to A on 14 May 2025](https://www.vaulta.com/resources/vaulta-token-swap-a-begins-may-14) via a block-producer multi-sig. The rebrand is strategic and brand-positioning only — the underlying Antelope protocol is unchanged. Validators (Block Producers) authorize transactions using secp256k1 (`K1`) or secp256r1 (`R1`) ECDSA keys, and the September 2024 [Spring 1.0 / Savanna hard fork](https://eosnetwork.com/resources/eos-hard-fork-spring-1-0-savanna-consensus/) introduced BLS12-381 aggregate finalizer signatures for instant finality. That upgrade added new elliptic-curve dependencies rather than removing any.

No post-quantum migration work has been published by Vaulta, the EOS Network Foundation (its predecessor), or the Antelope Coalition as of the date of this report.

## Proposed and Implemented PQC Algorithms

Vaulta does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Vaulta in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

Vaulta's consensus is Savanna BFT, introduced in [Spring 1.0](https://eosnetwork.com/resources/eos-hard-fork-spring-1-0-savanna-consensus/) (activated 25 September 2024). It replaced the legacy DPoS last-irreversible-block scheme with a HotStuff-derived BFT algorithm. Block Producers acting as finalizers must register a BLS12-381 finalizer key on-chain via `eosio::regfinkey`; the protocol collects and verifies aggregate BLS signatures to achieve sub-second finality. BLS12-381 is a pairing-friendly curve and is broken by Shor's algorithm at the same scale as ECDSA.

**Current state.** Both finalizer-key BLS12-381 aggregate signatures and the standard secp256k1/secp256r1 block-production authorization keys are elliptic-curve based. The Savanna upgrade strengthened liveness and finality performance but introduced additional EC dependencies.

**Planned future work.** No post-quantum consensus signature scheme has been announced. The Vaulta rebrand made no cryptographic changes.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Vaulta in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

The [Spring 1.0 release](https://eosnetwork.com/resources/eos-hard-fork-spring-1-0-savanna-consensus/) shipped a full BLS12-381 host-function suite to support Savanna and Antelope IBC verification: `bls_g1_add`, `bls_g2_add`, `bls_pairing`, `bls_g1_weighted_sum`, `bls_g2_weighted_sum`, and related field-operation intrinsics. The existing `recover_key` intrinsic handles secp256k1/secp256r1 ECDSA recovery. All cryptographic primitives available to WASM smart contracts are elliptic-curve based.

**Current state.** No host function exposes a post-quantum verification primitive. A WASM contract could theoretically implement post-quantum verification in pure WASM, but at prohibitive computational cost.

**Planned future work.** No PQC host function has been proposed. The Vaulta "Web3 banking" strategic pivot has not surfaced post-quantum requirements in public roadmap materials.

## 5. Other Features

### Antelope IBC

**Current state.** [Antelope IBC](https://eosnetwork.com/antelope/) (cross-chain messaging between Antelope Coalition chains) uses Savanna's BLS12-381 aggregate signatures as the finality proof for cross-chain trust. A quantum break of BLS12-381 would directly invalidate IBC's trust assumption.

**Planned future work.** No STARK-based or post-quantum IBC alternative is on the published roadmap.

### Token rebrand (EOS → A)

**Current state.** The [May 2025 token swap](https://www.vaulta.com/resources/vaulta-token-swap-a-begins-may-14) from EOS to A used the same `eosio.token` contract with a 1:1 swap and a four-month bidirectional window. No cryptographic changes were made.

**Planned future work.** None relevant to post-quantum posture.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Vaulta's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Vaulta in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Vaulta protocol upgrades are controlled by the elected top-21 Block Producers through on-chain privileged multi-sig proposals (MSIGs). Protocol features are gated by named feature flags in `nodeos`; the BP set must upgrade node software and then co-sign a MSIG to activate each feature. No on-chain governance token vote is required. The [Antelope Coalition](https://docs.eosnetwork.com/manuals/leap/latest/) (EOS/Vaulta, WAX, Telos, UX Network) shares the codebase; upgrades are coordinated but each chain activates independently.

No PQC-relevant proposals have been identified in the Antelope Coalition or Vaulta governance record.

---

_Generated on 03 Jun 2026 based on information as of 14 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
