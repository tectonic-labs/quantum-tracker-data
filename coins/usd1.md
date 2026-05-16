# USD1 (USD1) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | USD1 |
| **Ticker** | USD1 |
| **Asset class** | Stablecoin |
| **Issuer** | World Liberty Financial, Inc. (WLFI), with BitGo Trust Company as regulated custodian and infrastructure operator. |
| **Host chain(s)** | Aptos, BNB Chain, Ethereum, Mantle, Monad, Morph, Plume, Solana, Tron. |
| **Website** | https://worldlibertyfinancial.com/usd1 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

USD1 is a centrally issued, fiat-backed stablecoin from World Liberty Financial, deployed natively across nine chains and operated under BitGo's Stablecoin-as-a-Service model — BitGo provides custody, mint/burn infrastructure, and the on-chain smart contracts. A token cannot be more quantum-safe than the chain it runs on, and host-chain inheritance is the ceiling here: every evaluated USD1 host chain carries quantum exposure today. On top of that ceiling, the surfaces the issuer directly controls — the admin multisig that gates mint, burn, freeze, pause, and upgrade, and the Chainlink CCIP rail used to move USD1 between chains — rely on elliptic-curve signatures with no post-quantum migration disclosed.

Neither WLFI nor BitGo has published a PQC roadmap or statement covering USD1's admin keys, cross-chain attestations, or reserve-to-chain signing. As a result the token's posture is determined entirely by classical elliptic-curve cryptography across both its inherited (host chain) and issuer-controlled surfaces.

## Proposed and Implemented PQC Algorithms

USD1 does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

USD1 is canonically issued — native, not bridged — on nine chains: Aptos, BNB Chain, Ethereum, Mantle, Monad, Morph, Plume, Solana, and Tron. Its transaction signing, consensus, and networking exposure belong to each host chain, not to the token issuer. The token cannot be more quantum-safe than the chain it executes on, so this category reflects the worst posture across those hosts.

**Current state.** Six of the nine host chains have been evaluated: [Aptos](../chains/l1/aptos.md), [BNB Chain](../chains/l1/bnb-chain.md), [Ethereum](../chains/l1/ethereum.md), Monad, [Solana](../chains/l1/solana.md), and [Tron](../chains/l1/tron.md). All six rate ❌ in at least one quantum-exposure category, so this is pervasive rather than an isolated outlier — a (6/6) distribution among evaluated hosts. Tron and Monad are exposed across transaction signing, consensus, networking, and on-chain verification, with no migration roadmap. Aptos is exposed in consensus, networking, and on-chain verification. BNB Chain and Solana carry networking and chain-specific exposure. Ethereum is exposed at the peer-to-peer networking layer. The three remaining hosts — Mantle, Morph, and Plume — have not yet been evaluated; pending those evaluations, the aggregate is reported against the evaluated subset.

**Planned future work.** Host-chain migration activity, where it exists, is the host chain's work and is described on each chain's own report. No host-chain migration changes the worst-case posture today.

## 2. Admin / Privileged Roles

**Grade: F ❌**

USD1's privileged roles — mint, burn, freeze, pause, and upgrade — are operated under BitGo's Stablecoin-as-a-Service model. BitGo's documented [multisig smart-contract proxy pattern](https://developers.bitgo.com/concepts/multisig-smart-contract) uses a proxy contract with a 2-of-3 ECDSA `secp256k1` signer set (user / backup / BitGo) on EVM chains, with analogous ed25519-based key sets on Solana and Aptos. BitGo's [USD1 product blueprint](https://www.bitgo.com/resources/blog/usd1-the-blueprint-for-bitgos-stablecoin-as-a-service/) describes the mint/burn and reconciliation workflow.

**Current state.** No WLFI or BitGo communication indicates that any privileged role uses a post-quantum signature scheme, and no migration is in flight or on a published roadmap. The admin signer set relies on classical elliptic-curve keys today.

## 3. Cross-Chain Mechanism

**Grade: F ❌**

WLFI [announced in May 2025](https://www.coindesk.com/markets/2025/05/16/world-liberty-s-stablecoin-now-available-on-multiple-networks-through-chainlink-s-interoperability-protocol) that Chainlink CCIP is the canonical cross-chain transfer rail for USD1, initially connecting Ethereum and BNB Chain, with the [press release](https://www.prnewswire.com/news-releases/record-breaking-world-liberty-financial-usd1-stablecoin-unlocks-cross-chain-capabilities-with-chainlink-302458003.html) and a [Chainlink announcement](https://x.com/chainlink/status/1923439791309455647) confirming further chains to follow. USD1 uses CCIP's Cross-Chain Token (CCT) standard: native USD1 on each chain, with CCIP routing inter-chain transfers.

**Current state.** Per the [CCIP architecture](https://docs.chain.link/ccip/concepts/architecture/overview), the cross-chain trust model rests on two signing layers: a Committing decentralised oracle network (DON) that signs cross-chain reports with ECDSA `secp256k1` keys, and an independent Risk Management Network (RMN), also ECDSA-signed, with per-chain emergency-halt authority. Because USD1 is issuer-owned, the CCT configuration places the cryptographic chokepoint on the CCIP attestation rather than on locked collateral. CCIP serves chains where the underlying host ratings are exposed, and no PQC migration has been announced for CCIP. No WLFI- or BitGo-attributable post-quantum work has been disclosed for the cross-chain path.

## 4. Reserve / Custody

**Grade: ➖**

Reserves are held by BitGo Trust Company, with the underlying cash and short-duration US Treasury bills managed by BlackRock through its institutional money-market product line; WLFI publishes [monthly AICPA-criteria attestations](https://www.bitgo.com/usd1/attestations/) and a [Chainlink Proof-of-Reserves feed](https://blockonomi.com/wlfis-usd1-launches-real-time-proof-of-reserves-using-chainlink-and-bitgo/). In USD1's design, the mint authority *is* the custody-to-chain link — BitGo's signers controlling the mint function on each chain are the cryptographic linkage, and that surface is already rated under Admin / Privileged Roles. The Proof-of-Reserves oracle reports balances rather than gating mints, so it is not load-bearing for the mint-to-chain link. With no documented custody-side signing process distinct from the admin keys, there is no separate custody-to-chain surface to rate, so this category does not apply.

## 5. Other Token-Specific Crypto

**Grade: ➖**

USD1 has no token-specific cryptographic features beyond the admin multisig, CCIP attestations, and Proof-of-Reserves oracle already covered above. It is not a privacy stablecoin, embeds no zero-knowledge verifier, and has no real-world-asset on-chain mapping logic beyond the standard token representations on each host chain. With no extra token-specific cryptography, this category does not apply.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to *retire* elliptic-curve cryptography on the token's own surfaces — admin keys, bridge attestors, and custody-to-chain signing — which is distinct from rating whether the token is adopting PQC.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ➖.

**Current state.** No public WLFI or BitGo statement commits to retiring elliptic-curve primitives in any token-controlled surface — the admin multisig, the CCIP attestor signatures the issuer accepts, or the Proof-of-Reserves oracle signature scheme. There is no EC retirement roadmap and no scheduled retirement milestone on the public record.

## Issuer & Governance

USD1 is centrally issued by World Liberty Financial, Inc., a private company, with BitGo Trust Company as the regulated custodian and infrastructure operator. Governance is fully off-chain, conducted through WLFI corporate decision-making; the separate WLFI governance token confers influence over the broader WLFI DeFi platform but is not in the USD1 issuance authority path.

Product and reserve disclosures surface through BitGo's [USD1 product page](https://www.bitgo.com/usd1/), its [monthly attestation reports](https://www.bitgo.com/usd1/attestations/), and WLFI's [attestation documentation](https://docs.worldlibertyfinancial.com/usd1-token/attestation-reports). WLFI filed a January 2026 de novo application with the OCC to charter World Liberty Trust Company, a proposed national trust bank that would let WLFI issue and hold USD1 independently of BitGo over time; that change does not alter today's on-chain cryptographic surface.

There are no public PQC-relevant governance proposals from either WLFI or BitGo for USD1.

---

_Generated on 16 May 2026 based on information as of 13 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
