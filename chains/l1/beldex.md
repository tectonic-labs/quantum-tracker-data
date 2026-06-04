# Beldex (BDX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Beldex |
| **Ticker** | BDX |
| **Website** | https://docs.beldex.io/ |
| **GitHub** | https://github.com/Beldex-Coin |
| **Derived from** | Monero / CryptoNote |
| **On-chain environment** | Privacy money and messaging stack (no general smart-contract VM) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

[Beldex](https://docs.beldex.io/) is a privacy-focused proof-of-stake cryptocurrency derived from Monero / CryptoNote, which transitioned from proof-of-work to masternode-based PoS in December 2021. The privacy primitives — ring signatures (CLSAG), stealth addresses, and RingCT confidential amounts — are inherited directly from Monero and all rely on Curve25519 / Ed25519 elliptic-curve discrete-log assumptions. The Beldex ecosystem extends the privacy model beyond payments to include **BChat** (a Session-style messaging application) and **BelNet** (an anonymous VPN-style routing network), both of which route through the same masternode infrastructure and use the same EC key material.

Because Beldex is a privacy chain, the quantum vulnerability has a retroactive dimension. A quantum break of Curve25519 would let an attacker reconstruct the true spender behind any historical ring signature, decrypt RingCT-hidden amounts, link stealth addresses back to recipient long-term keys, and retroactively de-anonymize BChat conversations and BelNet sessions. Past privacy is not preserved by any future migration. No PQC migration plan or EC retirement schedule has been published by the Beldex Foundation as of the information cutoff.

## Proposed and Implemented PQC Algorithms

Beldex does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Beldex in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Beldex in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Beldex in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: ➖ Not Applicable**

Beldex does not provide a general smart-contract virtual machine. The chain is a privacy money and messaging substrate; on-chain logic is limited to the masternode protocol and the privacy transaction rules. There is no API by which on-chain code could call a signature verification primitive, post-quantum or otherwise.

## 5. Other Features

**Grade: F ❌**

### Ring signatures (CLSAG) and stealth addresses

Beldex uses [CLSAG ring signatures](https://coinbureau.com/review/beldex-review) (superseding the earlier MLSAG variant) over Curve25519. Each transaction hides the true sender within a ring of decoys; the one-time recipient address is derived via EC Diffie-Hellman. A quantum break of Curve25519 recovers the true spender for every historical ring signature and links every stealth address back to its recipient long-term key — retroactively, across the entire ledger.

**Current state.** Ring signatures and stealth addresses are fully EC-based.

**Planned future work.** No post-quantum replacement has been published.

### RingCT (confidential amounts)

RingCT hides transaction amounts using Pedersen commitments over Curve25519, with Bulletproof range proofs. A quantum break recovers all historical hidden amounts.

**Current state.** RingCT is EC-based. All historical amounts are at risk on Q-day.

**Planned future work.** No post-quantum alternative is proposed.

### BChat and BelNet

[BChat](https://cryptopotato.com/beldex-explained-a-guide-to-its-privacy-focused-blockchain-ecosystem/) is a Session-style messenger and [BelNet](https://cryptopotato.com/beldex-explained-a-guide-to-its-privacy-focused-blockchain-ecosystem/) is an onion-like VPN routing network, both backed by the Beldex masternode infrastructure. Identity and session keys are Curve25519-based. A quantum break extends retroactively to messaging and routing history, not just payment history.

**Current state.** BChat and BelNet session keys are EC-based.

**Planned future work.** No post-quantum alternative is proposed.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ➖, Other ❌.

As with Monero — from which Beldex inherits its cryptographic design — replacing Curve25519 across all privacy primitives is not a drop-in substitution but a redesign of the entire privacy core. No EC retirement schedule has been published by the [Beldex Foundation](https://docs.beldex.io/).

**Current state.** Curve25519 / Ed25519 is embedded in ring signatures, stealth addresses, RingCT, masternode signing, P2P node identity, BChat session keys, and BelNet routing keys. No deprecation plan exists.

**Planned future work.** None published.

## Governance

Beldex protocol upgrades are activated via hard forks at predetermined block heights, announced by the Beldex Foundation. Masternode operators (requiring 10,000 BDX stake) must upgrade their daemon binaries before the target block height for activation to proceed. No formal governance proposal process (analogous to BIPs or EIPs) has been documented publicly.

No PQC-related proposals have been identified in the [Beldex-Coin GitHub organization](https://github.com/Beldex-Coin) or the Beldex Foundation's public communications as of the information cutoff.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
