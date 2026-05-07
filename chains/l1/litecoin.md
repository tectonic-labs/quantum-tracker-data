# Litecoin (LTC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Litecoin |
| **Ticker** | LTC |
| **Website** | <https://litecoin.org> |
| **GitHub** | <https://github.com/litecoin-project> |
| **Twitter / X** | <https://x.com/litecoin> |
| **Derived from** | Bitcoin |
| **On-chain environment** | Bitcoin Script |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Litecoin is a Bitcoin fork: its transaction signature scheme (secp256k1 ECDSA), Bitcoin Script execution surface, and P2P transport closely mirror Bitcoin's pre-Taproot baseline. Litecoin has not adopted Taproot or BIP-340 Schnorr. The chain's distinct on-chain feature is [MWEB (MimbleWimble Extension Blocks)](https://litecoin.com/projects/mweb), an opt-in confidential-transaction layer activated in 2022, which by 2025 had grown to over 400,000 LTC in private balances and >90% network adoption for MWEB block validation. MWEB's confidential-transaction construction uses [Pedersen commitments on secp256k1](https://github.com/libbitcoin/libbitcoin-system/wiki/Pedersen-Commitments-in-EC-Form) and Bulletproofs range proofs with EC components — both quantum-vulnerable.

No Litecoin-specific post-quantum proposal, draft, or working-group thread has been identified. Public discussion among Litecoin contributors points toward watching Bitcoin's [BIP-360](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki) and [BIP-361](https://github.com/bitcoin/bips/blob/master/bip-0361.mediawiki) work for an eventual upstream signal, without a Litecoin-specific timeline.

## Proposed and Implemented PQC Algorithms

Litecoin does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Litecoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: A ✅**

Litecoin uses [Scrypt proof-of-work](https://litecoin.org) instead of Bitcoin's SHA-256d. Scrypt is memory-hard and hash-based; mining is unaffected by Shor's algorithm and Grover's algorithm at most halves preimage strength. There is no validator key material in the consensus layer.

**Current state.** Scrypt PoW. Hash-based.

**Planned future work.** None needed for the consensus layer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Litecoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for Litecoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

### MWEB (MimbleWimble Extension Blocks)

**Current state.** [MWEB](https://litecoin.com/projects/mweb) is Litecoin's opt-in confidential-transaction layer, activated in 2022. By 2025, MWEB held over 400,000 LTC in private balances with greater than 90% network adoption for MWEB block validation. The construction uses Pedersen commitments of the form `P = rG + vH` [on secp256k1](https://github.com/libbitcoin/libbitcoin-system/wiki/Pedersen-Commitments-in-EC-Form) to hide transaction amounts, and Bulletproofs range proofs whose hardness assumptions include the discrete-log problem on the same curve. The signing component of MWEB transactions is also secp256k1 ECDSA. A quantum break of secp256k1's discrete-log problem would let an attacker recover hidden amounts and reconstruct the historical MWEB transaction graph, retroactively defeating the privacy that the construction provides — the [Quarkslab audit of the Litecoin MWEB integration](https://blog.quarkslab.com/audit-of-the-mimblewimble-integration-inside-litecoin.html) describes the EC-based construction in detail. Litecoin's November 2025 statement that MWEB addresses are "quantum resistant" appears to refer to the absence of raw public-key reuse rather than to the discrete-log security of the underlying commitments.

**Planned future work.** No Litecoin-specific post-quantum proposal for MWEB or for transaction signatures has been filed. Community discussion points toward watching Bitcoin's [BIP-360](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki) and [BIP-361](https://github.com/bitcoin/bips/blob/master/bip-0361.mediawiki) without a Litecoin-specific timeline.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ✅, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Litecoin in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

Litecoin protocol development happens in the [litecoin-project/litecoin](https://github.com/litecoin-project/litecoin) repository, with stewardship from the [Litecoin Foundation](https://litecoin-foundation.org). The chain has historically tracked Bitcoin Core for base-layer changes while diverging on a few notable features (Scrypt PoW, no Taproot, MWEB).

PQ-relevant work currently visible:

- No Litecoin-specific PQ pull request, BIP-equivalent draft, mailing-list thread, or testnet activity has been identified.
- Public discussion in the Litecoin community references Bitcoin's [BIP-360](https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki) and [BIP-361](https://github.com/bitcoin/bips/blob/master/bip-0361.mediawiki) post-quantum proposals as the upstream signal to watch, without a Litecoin-specific commitment.

No fork has been scheduled or signaled for any PQ migration.

---

_Generated on 06 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
