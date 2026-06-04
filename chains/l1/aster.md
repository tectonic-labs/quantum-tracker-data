# Aster (ASTER) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Aster Chain |
| **Ticker** | ASTER |
| **Website** | https://docs.asterdex.com/aster-chain/overview |
| **On-chain environment** | Proprietary derivatives matching engine (non-general-purpose VM) |
| **Mainnet genesis** | 2026-03-17 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

[Aster Chain](https://docs.asterdex.com/aster-chain/overview) is the L1 blockchain powering the [Aster DEX](https://docs.asterdex.com/product/aster-chain), an orderbook-style perpetual and spot derivatives exchange. Mainnet launched on 2026-03-17. The team is publicly described as operating in stealth; no public source-code repository or upgrade specification has been identified. The chain uses a Proof-of-Staked Authority consensus model with a small fixed validator set.

Privacy is the headline feature: ZK-encrypted orders, one-time stealth addresses per trade, and selective-disclosure viewer passes for compliance. The ZK proof system is not publicly disclosed, but the 50 ms block time and 100,000 TPS performance targets effectively rule out STARK proving, making a SNARK family (Groth16 / PLONK / Halo2) over EC pairings the most likely foundation. Stealth addresses are derived via EC Diffie-Hellman. Both are quantum-vulnerable. Because Aster is a privacy chain, this vulnerability has a retroactive dimension: a future quantum break would enable an attacker to deanonymize the entire historical orderbook — every past trade, every past account linkage. Past privacy is not preserved by any future migration.

No PQC migration plan or EC retirement schedule has been published as of the information cutoff.

## Proposed and Implemented PQC Algorithms

Aster does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Aster in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Aster in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Aster in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Aster Chain's execution layer is the perpetual and spot matching engine, not a general smart-contract virtual machine. No published post-quantum verification primitive has been identified. Because the codebase is not public, it is not possible to independently verify what cryptographic operations are available to on-chain logic.

**Current state.** No PQC verify primitive has been documented.

**Planned future work.** None published.

## 5. Other Features

**Grade: F ❌**

### ZK-encrypted orders and stealth addresses

Every [privacy-mode order](https://docs.asterdex.com/aster-chain/overview) is encrypted before posting and proven valid via a ZK circuit. The proof system is not disclosed; performance targets strongly suggest a SNARK family over EC pairings. One-time stealth addresses are derived per trade using EC Diffie-Hellman. Both components are quantum-vulnerable.

A quantum break of the underlying EC curves would retroactively expose every past order and every past account linkage in the orderbook history. This retroactive dimension distinguishes privacy chains from non-privacy chains: there is no future migration that restores the privacy of already-recorded data.

**Current state.** ZK proof system and stealth addresses are EC-based. Proof system undisclosed; SNARK family inferred from performance characteristics.

**Planned future work.** No post-quantum alternative for the ZK proof system or stealth address scheme has been published.

### Selective disclosure ("viewer pass")

ZK proofs that reveal specific transaction details to designated parties rely on the same EC base as the ZK proof system.

**Current state.** EC-based. No post-quantum alternative.

**Planned future work.** None published.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

[Aster Chain](https://docs.asterdex.com/aster-chain/overview) launched on 2026-03-17 with EC-only cryptography across all observable layers. No PQC migration plan or EC retirement schedule has been published.

**Current state.** EC cryptography underlies transaction signing, consensus, P2P networking, ZK-encrypted orders, stealth addresses, and viewer-pass proofs. No deprecation plan exists.

**Planned future work.** None published.

## Governance

No formal upgrade proposal process (analogous to BIPs, EIPs, or CIPs) has been documented publicly for Aster Chain. The [H1 2026 roadmap](https://phemex.com/news/article/aster-dex-announces-2026-h1-roadmap-with-layer1-blockchain-launch-42658) mentions on-chain governance rights for users planned for Q2 2026, but whether that covers protocol-level cryptographic upgrades is not specified. No PQC-related governance activity has been identified as of the information cutoff.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
