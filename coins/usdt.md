# Tether USDt (USDT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Tether USDt |
| **Ticker** | USDT |
| **Asset class** | Stablecoin |
| **Issuer** | Tether Holdings Ltd / Tether International Ltd (BVI-registered, El Salvador HQ as of 2025) |
| **Host chain(s)** | TRON (~50% of supply), Ethereum (~40%), Solana, BNB Chain, Avalanche, Algorand, Polygon PoS, Tezos, EOS / Vaulta, Liquid, Omni (sunset), and others |
| **Website** | https://tether.to |
| **Contract address** | `0xdAC17F958D2ee523a2206206994597C13D831ec7` (ERC-20 on Ethereum) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

USDT is a centrally-issued stablecoin deployed directly by Tether onto a dozen-plus blockchains. Its post-quantum posture is split across two layers. The first is what Tether itself controls: the per-chain admin keys that mint, burn, pause, blacklist, and (where applicable) upgrade each USDT contract. The second is what USDT inherits from the chains it runs on: a token cannot be more quantum-safe than the chain it executes on, so the host chain is the ceiling on USDT's overall posture, and the issuer-controlled keys are the floor. Today both layers sit at the same place — every evaluated host chain is quantum-exposed in at least one core area, and Tether has not disclosed any post-quantum migration work on its own admin or issuance infrastructure.

Two of the six categories are not applicable to USDT rather than failing. Tether's published reserves are not connected to the on-chain mint by any disclosed cryptographic pipeline, so there is no custody-to-chain surface to rate, and USDT is a plain fungible token on every host with no additional token-specific cryptography. We located no public Tether post-quantum roadmap or statement to link.

## Proposed and Implemented PQC Algorithms

USDT does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

USDT is issued directly, per chain, by Tether. Each chain's USDT is a separate contract deployment, and there is no protocol-level mechanism to move USDT atomically between chains. Because USDT runs on the host chain, its transaction signing, consensus, and networking exposure are the host chain's responsibility, not the token's — and the token cannot be more quantum-safe than the chain underneath it.

**Current state.** Across every evaluated host, the underlying chain is quantum-exposed in at least one core area. TRON, which carries roughly half of all USDT supply, is exposed across transaction signing, consensus, networking, on-chain verification, and elliptic-curve sunset. Ethereum, which carries roughly 40% of supply, is exposed on peer-to-peer networking. Solana and BNB Chain are exposed on networking and other chain-specific surfaces, Algorand on consensus, networking, and EC sunset, and Tezos on consensus and EC sunset. Polygon PoS, EOS / Vaulta, Liquid, and Omni are not separately graded here but share the same elliptic-curve transaction-signing posture. The exposure is pervasive rather than an outlier: all evaluated hosts sit at the same exposed floor, so the aggregate is exposed with no need for a distribution qualifier. The host chains with their own published readiness reports are [TRON](../chains/l1/tron.md), [Ethereum](../chains/l1/ethereum.md), [Solana](../chains/l1/solana.md), [BNB Chain](../chains/l1/bnb-chain.md), [Algorand](../chains/l1/algorand.md), and [Tezos](../chains/l1/tezos.md); Avalanche and Polygon PoS are also hosts but do not yet have published reports.

**Planned future work.** Any post-quantum migration of these surfaces would be carried out by the individual host chains; consult each chain's own report for its roadmap. The intel reviewed records no host-chain migration milestone attributable to USDT itself.

## 2. Admin / Privileged Roles

**Grade: F ❌**

Each USDT deployment is a Tether-controlled contract with admin functions for mint, burn, pause, blacklist, fee adjustment, and, where applicable, upgrade.

**Current state.** The Ethereum USDT contract (`0xdAC17F958D2ee523a2206206994597C13D831ec7`) is the historical reference: a non-proxy contract with a documented `owner` role controlling minting and a blacklist mapping. Newer deployments use the same access pattern with host-appropriate scaffolding. The privileged keys behind these roles are classical elliptic-curve schemes on every host — secp256k1 ECDSA on EVM chains and TRON, Ed25519 on Solana and Algorand, and a mix of supported schemes on Tezos. Tether has not published signer rosters or thresholds for its admin multisigs, and we located no post-quantum commitment in Tether's public communications targeting any host-chain admin pipeline. The contract sources can be inspected on the [Ethereum](https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7), [TRON](https://tronscan.org/#/token20/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t), and [Solana](https://solscan.io/token/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB) explorers, and Tether's [news page](https://tether.to/en/news/) is the venue where any such announcement would appear.

**Planned future work.** The reviewed intel records no Tether proposal, draft, or commitment to migrate these admin keys to post-quantum signing.

## 3. Cross-Chain Mechanism

**Grade: F ❌**

Unlike some other stablecoins, Tether operates no first-party cross-chain transfer protocol for USDT — there is no Tether-run burn-and-mint attestation service, no Tether-issued bridge contract, and no protocol-level cross-chain message format.

**Current state.** Two on-chain cross-chain paths are in scope. The first is Tether's own per-chain mint coordination: when a customer redeems USDT on one chain and re-issues it on another through Tether's direct relationship, Tether burns on the first chain and mints on the second using its admin authority — and those admin keys are the same classical elliptic-curve keys described in the Admin section. The second path is third-party generic bridges such as Wormhole and LayerZero, which users employ to wrap or transfer USDT; those bridges carry their own quantum exposure, which USDT inherits when it travels over them. The absence of a single Tether-operated attestation key is a mild structural mitigation — there is no one issuer-held cross-chain signing key to forge — but every cross-chain path that does exist is classically elliptic-curve-signed end to end. No Tether-attributable post-quantum work on cross-chain signing was located.

**Planned future work.** The reviewed intel records no Tether plan, draft, or commitment for a post-quantum cross-chain mechanism.

## 4. Reserve / Custody

**Grade: ➖**

USDT is backed by a Tether-disclosed reserve mix, with custody counterparties named in Tether's [transparency reports](https://tether.to/en/transparency) and attestations published by an external auditor. However, Tether has not published any documented cryptographic process by which reserve custodians sign mint authorisations that the on-chain contract verifies. The on-chain side is simply the Tether admin key (rated under Admin / Privileged Roles), and the off-chain side is a banking workflow that produces no signed on-chain artefact. Because there is no disclosed cryptographic linkage between off-chain custody and the on-chain contract, there is no custody-to-chain surface to rate, so this category does not apply.

## 5. Other Token-Specific Crypto

**Grade: ➖**

USDT is a standard fungible token on each of its hosts (ERC-20, TRC-20, SPL, FA1.2, ASA). It embeds no zero-knowledge verifier, no oracle-gated mint logic, no verifiable random function, and no on-chain real-world-asset mapping beyond the admin and cross-chain surfaces already covered. With no extra token-specific cryptography, this category does not apply.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset measures whether the issuer has a credible plan to *retire* elliptic-curve cryptography on the token's own surfaces — the per-chain admin keys, any bridge attestors, and custody-to-chain signing — which is distinct from whether the token is adopting post-quantum cryptography.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ➖.

**Current state.** Tether has disclosed no plan to retire elliptic-curve cryptography on its per-chain USDT admin keys, on its operational signing infrastructure for issuance and redemption, or on the custody-side banking infrastructure. Tether's published communications over the reviewed period cover legal-entity restructuring, an El Salvador headquarters move, AI initiatives, and reserve diversification — none touch on post-quantum migration of the issuance infrastructure. The [Tether news](https://tether.to/en/news/) and [blog](https://tether.to/en/blog/) pages are where any such commitment would be published.

**Planned future work.** The reviewed intel records no dated commitment from Tether to retire elliptic-curve cryptography on any token-controlled surface.

## Issuer & Governance

Tether Holdings Ltd / Tether International Ltd is a centrally-controlled, privately-held company (BVI-registered, with an El Salvador headquarters as of 2025), affiliated with iFinex Inc. USDT governance is not on-chain: contract upgrades, mint authority, blacklist decisions, and custody operations are made by Tether management. There is no Tether DAO, no on-chain governance vote on protocol parameters, and no published process for community input on cryptographic primitives. Any post-quantum migration of USDT would therefore be a corporate decision by Tether, executed as key rotation on each host chain. Product and policy commitments are disclosed through Tether's own channels — its [transparency page](https://tether.to/en/transparency), [news page](https://tether.to/en/news/), and [blog](https://tether.to/en/blog/) — and no dated post-quantum milestone has been published on any of them.

---

_Generated on 16 May 2026 based on information as of 15 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
