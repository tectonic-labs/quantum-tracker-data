# World Liberty Financial (WLFI) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | World Liberty Financial |
| **Ticker** | WLFI |
| **Asset class** | DeFi Governance |
| **Issuer** | World Liberty Financial, Inc. (a Delaware non-stock corporation) |
| **Host chain(s)** | Ethereum, BNB Chain, Solana |
| **Website** | https://worldlibertyfinancial.com/ |
| **Contract address** | Ethereum (ERC-20): `0xda5e1988097297dcdc1f90d4dfe7909e847cbef6`; Solana (SPL mint): `2pD8Z7BZYZpkRKUdFx5zCa4CFKb5EDWdPfz5AoHYHY8t` |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

WLFI is the governance token of the World Liberty Financial DeFi protocol. It is issued on Ethereum, BNB Chain, and Solana, and every cryptographic surface a token holder touches today rests on classical elliptic-curve cryptography. A token cannot be more quantum-safe than the chains it runs on — host-chain inheritance is the ceiling — and all three of WLFI's host chains carry at least one quantum-exposed category, so the inherited posture is already exposed before any token-specific surface is considered. On top of that ceiling, the surfaces WLFI's issuer directly controls — an upgradeable proxy governed by a 3-of-5 multisig and a single-signer guardian wallet, plus a Chainlink CCIP cross-chain rail — are all elliptic-curve based.

There is no public WLFI statement, proposal, or roadmap item addressing post-quantum migration or the retirement of elliptic-curve cryptography on any token-controlled surface. Where WLFI is unbacked and carries no extra token-specific cryptography, the corresponding categories are marked not applicable rather than exposed.

## Proposed and Implemented PQC Algorithms

WLFI does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

WLFI is canonically issued on three chains — [Ethereum](../chains/l1/ethereum.md) as an ERC-20, [BNB Chain](../chains/l1/bnb-chain.md) as a BEP-20, and [Solana](../chains/l1/solana.md) as an SPL token — with cross-chain support live from day one (1 September 2025). The token's transaction signing, consensus participation, and peer-to-peer networking are properties of those host chains, not of WLFI itself. WLFI cannot be more quantum-safe than the chains it executes on: the host chains set the ceiling for the token's overall posture.

**Current state.** All three host chains rate ❌ in at least one of their PQC categories. Ethereum is exposed in peer-to-peer networking, where node identity uses `secp256k1`. BNB Chain is exposed in its other-features and EC-sunset categories. Solana is exposed in peer-to-peer networking and in its other-features category. Because every one of the three evaluated host chains sits at the worst-case exposed level, the aggregate is exposed across the board — a `(3/3)` distribution, with no quantum-safe outlier among them.

**Planned future work.** The host chains have their own migration activity that does not lift WLFI's aggregate out of the exposed band: Ethereum has a roadmapped path in several non-P2P categories, and BNB Chain has an active post-quantum proof-of-concept in development outside the exposed categories. Refer to the individual host-chain reports linked above for the detail. None of this is WLFI-attributable work.

Sources:
- [WLFI Ethereum contract](https://etherscan.io/token/0xda5e1988097297dcdc1f90d4dfe7909e847cbef6)
- [WLFI Solana mint](https://www.solflare.com/prices/wlfi/2pD8Z7BZYZpkRKUdFx5zCa4CFKb5EDWdPfz5AoHYHY8t/)
- [Chainlink CCIP day-1 cross-chain announcement for WLFI](https://x.com/chainlink/status/1962526825764282499)

## 2. Admin / Privileged Roles

**Grade: F ❌**

WLFI's Ethereum contract is a TransparentUpgradeableProxy (EIP-1967), an upgradeable proxy whose implementation has been changed multiple times since the initial September 2024 deployment. On-chain control of upgrades, seizure, and parameter changes runs through a 3-of-5 ECDSA Safe multisig, alongside a separate single-signer guardian wallet that holds unilateral authority to invoke a blacklist function. That blacklist and freeze logic was absent from the contract first deployed in September 2024 and was added through a v2 implementation upgrade on 24 August 2025, about a week before the token generation event; it has since been exercised against a holder's wallet.

**Current state.** Every privileged-role signature on the EVM hosts is ECDSA `secp256k1` (the Gnosis Safe and externally-owned-account pattern), and the Solana side uses ed25519 multisig constructs. WLFI's own materials acknowledge that the company can block and freeze wallet addresses and the tokens they hold. No WLFI communication identifies any post-quantum primitive in the privileged-role path. The identities and hardware-security posture of the multisig signers and the guardian wallet owner are not public, and the BNB Chain and Solana admin authority rosters are not publicly enumerated.

**Planned future work.** No concrete post-quantum proposal, draft, or migration effort for WLFI's privileged-role surfaces exists on the public record.

Sources:
- [WLFI proxy / implementation history](https://etherscan.io/token/0xda5e1988097297dcdc1f90d4dfe7909e847cbef6)
- [Multisig and guardian wallet analysis](https://en.cryptonomist.ch/2026/04/16/wlfi-token-governance/)
- [Guardian single-signer freeze authority claim](https://www.cryptotimes.io/2026/04/13/justin-sun-claims-wlfi-has-a-one-signature-wallet-freeze-power/)
- [Call for multisig disclosure](https://cointelegraph.com/news/justin-sun-urges-trump-wlfi-disclose-multi-sig)
- [Blacklist incident and v2 upgrade timeline](https://www.ccn.com/education/crypto/justin-sun-9m-wlfi-blacklist-explained/)
- [WLFI corporate structure and advisory voting](https://themerkle.com/decentralization-debate-intensifies-as-justin-sun-questions-wlfis-wallet-control-system/)

## 3. Cross-Chain Mechanism

**Grade: F ❌**

WLFI launched cross-chain on 1 September 2025 using Chainlink CCIP and its Cross-Chain Token (CCT) standard. The same CCIP infrastructure carries WLFI between Ethereum, BNB Chain, and Solana, with bridging available through the WLFI bridge interface and Transporter.io.

**Current state.** CCIP's trust model rests on two layers of elliptic-curve signing: the Committing decentralized oracle network produces ECDSA `secp256k1` attestations, and the independent Risk Management Network adds a second ECDSA-signed oracle layer with per-chain emergency halt authority. For an issuer-owned token like WLFI, the CCT mechanism is typically configured as burn-and-mint, so the cryptographic chokepoint is the CCIP attestation itself. WLFI inherits the rating of the worst chain CCIP covers, and CCIP serves chains that are themselves quantum-exposed.

**Planned future work.** Neither WLFI nor Chainlink has announced a post-quantum migration for the CCIP Committing DON or Risk Management Network signature schemes, and no WLFI-attributable post-quantum work has been disclosed for the cross-chain path.

Sources:
- [Chainlink CCIP day-1 announcement for WLFI](https://x.com/chainlink/status/1962526825764282499)
- [WLFI cross-chain expansion via CCIP](https://phemex.com/news/article/wlfi-expands-to-ethereum-solana-and-bsc-with-chainlink-ccip-17051)
- [CCIP CCT integration details](https://www.ainvest.com/news/chainlink-ccip-enables-cross-chain-wlfi-token-transfers-ethereum-solana-bsc-integration-2509/)
- [WLFI / CCIP integration overview](https://learn.bybitglobal.com/en/daily-bits/wlfi-adopts-chainlink-ccip)
- [WLFI bridge interface](https://worldlibertyfinancial.com/bridge)
- [CCIP architecture overview](https://docs.chain.link/ccip/concepts/architecture/overview)

## 4. Reserve / Custody

**Grade: ➖**

WLFI is an unbacked governance token. There is no reserve of fiat, Treasury bills, or other assets behind it; its tokenomics consist of a fixed 100-billion supply with phased unlocks gated by advisory governance votes, rather than a custody-to-chain mint flow. Because there is no off-chain reserve linked cryptographically to the on-chain contract, there is no custody-to-chain surface to rate, so this category does not apply.

Sources:
- [WLFI tokenomics](https://bingx.com/en/learn/article/what-is-world-liberty-financial-wlfi-tokenomics-at-sep1-launch)
- [WLFI and reserve-backed product separation](https://info.arkm.com/research/world-liberty-financial-wlfi-trump-tokenomics-stablecoin-products)

## 5. Other Token-Specific Crypto

**Grade: ➖**

WLFI's contract uses an ERC20-Votes-style voting accounting extension, which tracks delegated voting power on-chain, but the underlying voting signatures still resolve to the host chain's externally-owned-account signature scheme already covered in the host-chain and admin categories. There is no token-internal zero-knowledge verifier, no verifiable random function, no oracle-gated rebase, and no real-world-asset on-chain mapping. WLFI is not a privacy token; its "one token, one vote" model with a 5% per-wallet voting cap is enforced through the same on-chain accounting, not a privacy-preserving cryptographic scheme. With no token-specific cryptography beyond surfaces already rated, this category does not apply.

Sources:
- [WLFI governance and one-token-one-vote model](https://zebpay.com/blog/what-is-world-liberty-financial-wlfi)
- [WLFI governance model overview](https://www.okx.com/en-us/learn/top-governance-tokens-2025-wlfi)
- [ERC20-Votes-style governance in practice](https://blockster.com/wlfi-governance-vote-passes-but-10-wallets-controlled-76-of-it)

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to retire elliptic-curve cryptography on the token's own surfaces — distinct from whether the token is adopting post-quantum cryptography.

No WLFI statement commits to retiring elliptic-curve primitives on any token-controlled surface: the 3-of-5 multisig signers (ECDSA `secp256k1` / ed25519), the single-signer guardian wallet, the proxy admin and upgrade authority, or the CCIP Committing DON and Risk Management Network attestor sets that WLFI accepts as its canonical cross-chain rail. WLFI's governance activity through early 2026 has focused on token unlock schedules, listing decisions, and the broader DeFi protocol roadmap; no proposal, blog post, or forum thread surfaces elliptic-curve retirement as a commitment-track topic.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ➖.

Sources:
- [WLFI governance forum](https://forum.worldlibertyfinancial.com/)
- [WLFI documentation](https://docs.worldlibertyfinancial.com/)

## Issuer & Governance

WLFI is the governance token of the World Liberty Financial DeFi protocol. The issuing entity, World Liberty Financial, Inc., is structured as a Delaware non-stock corporation rather than a DAO. Governance follows a "one token, one vote" model with a 5% voting-power cap per wallet, but token-holder votes are advisory: WLFI leadership reserves the right to reject proposals on legal, security, or other grounds, and on-chain execution of governance outcomes runs through the 3-of-5 multisig and guardian wallet rather than being self-executing. The blacklist and freeze function added in the August 2025 v2 upgrade is exercised at the discretion of the guardian and multisig, not by token-holder vote.

WLFI's product documentation is published at its docs site, and governance discussion takes place on its public forum — those venues are where any post-quantum or EC-retirement commitment would be expected to surface. As of the information date below, no WLFI governance proposal addresses PQC migration or EC sunset for any of the token's privileged-role surfaces.

---

_Generated on 16 May 2026 based on information as of 13 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
