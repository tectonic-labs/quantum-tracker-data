# KuCoin Community Chain (KCS) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | KuCoin Community Chain |
| **Ticker** | KCS |
| **Website** | https://www.kcc.io/ |
| **GitHub** | https://github.com/kcc-community/kcc |
| **On-chain environment** | EVM (go-ethereum fork) |
| **Mainnet genesis** | 2021-06-01 |
| **Current mainnet version** | v1.4.8-stable (released July 2025) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

KuCoin Community Chain (KCC) is an EVM-compatible L1 (chain ID 321) built by forking go-ethereum, with a Proof-of-Staked Authority (PoSA) consensus engine replacing Ethereum's Gasper PoS. Up to 29 validators seal blocks using secp256k1 ECDSA, and the broader stack — transaction signing, devp2p networking, EVM precompiles, and the KCC Bridge — is inherited from go-ethereum with no modifications for quantum readiness.

No PQC migration activity has been identified for KCC in any category. A code search across the `kcc-community` GitHub organization finds no references to post-quantum cryptography, and the KIPs repository contains only two substantive proposals (KIP-1 process, KIP-2 Ishikari hardfork) — neither addresses cryptography. KuCoin (the exchange, KCC's originating entity) published a TLS-layer PQC proof-of-concept in December 2025, but that work is scoped to browser-to-server HTTPS transport and does not touch any KCC chain surface.

## Proposed and Implemented PQC Algorithms

> KuCoin Community Chain does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

> We have found no public information indicating migration activity for KuCoin Community Chain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

KCC uses PoSA (Proof of Staked Authority), a Clique-derived authority engine with KCS token staking. Up to 29 validators participate; each seals a block by placing a 65-byte secp256k1 ECDSA signature in the tail of the block header's extra-data field. The validator address is derived from the secp256k1 public key (`Keccak256(pubkey[1:])[12:]`), and the signer is recovered on verification via `ecrecover`. No hash-based PoW is involved; this is an authority consensus mechanism and its security depends directly on the validator signing keys being EC-secure.

**Current state.** Validator block signing uses secp256k1 ECDSA. No post-quantum alternative is proposed.

**Planned future work.** None published.

## 3. P2P Networking

**Grade: F ❌**

> We have found no public information indicating migration activity for KuCoin Community Chain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

> We have found no public information indicating migration activity for KuCoin Community Chain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

**Grade: F ❌**

### KCC Bridge

The [KCC Bridge](https://github.com/kcc-community/bridge-contract) is an issuer-operated cross-chain bridge connecting KCC to Ethereum, BSC, Polygon, Fantom, and Avalanche. Inbound transfers lock assets on the source chain and mint pegged tokens on KCC via the [`kcc-peg-token`](https://github.com/kcc-community/kcc-peg-token) factory; outbound transfers reverse the process. Minting or releasing funds requires at least two of the designated operator addresses to submit matching transactions. Each operator authorization is an ordinary secp256k1 ECDSA transaction from an operator-controlled account. No threshold signature, BLS aggregation, or other PQC-capable scheme is used.

A quantum break of ECDSA would allow an attacker to forge operator confirmations, enabling unauthorized minting of pegged tokens or draining of locked collateral. The bridge inherits the worst quantum-exposure rating across all chains it connects to (Ethereum, BSC, Polygon, Fantom, Avalanche — all EC-dependent).

**Current state.** EC-signed multi-operator bridge. No post-quantum migration plan.

**Planned future work.** None published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No plan to retire EC cryptography from any KCC surface has been published. KuCoin published a [TLS-layer PQC Gateway proof-of-concept](https://www.kucoin.com/blog/en-kucoin-releases-post-quantum-cryptography-pqc-gateway-proof-of-concept) in December 2025, implementing X25519MLKEM768 hybrid key exchange for browser-to-server HTTPS. That work is explicitly scoped to the exchange's HTTPS transport; it does not address KCC transaction signing, PoSA validator keys, devp2p identity, EVM precompiles, or the KCC Bridge. The announcement references NSA post-quantum transition guidance (~2030 target) but makes no commitment to KCC chain migration with dates.

**Current state.** EC cryptography is embedded in every layer of KCC. No EC retirement timeline exists.

**Planned future work.** None published for the KCC chain.

## Governance

KCC is governed by the KCC team / KCS Foundation, operating through the [`kcc-community/KIPs`](https://github.com/kcc-community/KIPs) proposal repository and the `kcc-community/kcc` client repository. Hard fork activation is controlled by the core maintainers; hardforks require validator adoption. The KIP process has seen very limited use (two proposals since 2021).

Key governance milestones:

- **June 2021** — KCC mainnet launched (chain ID 321).
- **2022** — Ishikari hardfork ([KIP-2](https://github.com/kcc-community/KIPs)) reworked PoSA staking and validator logic; no cryptographic change.
- **July 2025** — `kcc-community/kcc` client v1.4.8 released; no PQC content.
- **December 2025** — KuCoin (the exchange) published a TLS-only PQC Gateway proof-of-concept; no KCC chain commitment followed.

No PQC-relevant KIP has been filed.

---

_Generated on 03 Jun 2026 based on information as of 16 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
