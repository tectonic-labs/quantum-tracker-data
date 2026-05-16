# Beat Token — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Beat Token (Audiera). |
| **Asset class** | Utility. |
| **Issuer** | Audiera (anonymous team; no public team disclosure). |
| **Host chain(s)** | BNB Chain (canonical and only host). |
| **Website** | https://www.coingecko.com/en/coins/audiera (official links aggregated on the CoinGecko listing). |
| **Contract address** | `0xcf3232B85b43BCa90E51D38cc06Cc8bB8C8A3E36` (BEP-20 on BNB Chain). |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | ➖ | ➖ | Not Applicable |
| Cross-Chain Mechanism | ➖ | ➖ | Not Applicable |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Beat Token (BEAT) is a single-chain BEP-20 GameFi utility token deployed on BNB Chain. Its post-quantum posture is almost entirely inherited rather than issuer-controlled: BEAT runs on whatever cryptography BNB Chain provides, and a token cannot be more quantum-safe than the chain it executes on — the host chain is the ceiling. The token contract itself is ownership-renounced (the `owner()` call returns the zero address), so there is no live, team-controlled administrative key gating its on-chain behaviour, and the contract is non-upgradeable with no pause, blacklist, or proxy. Because BEAT is single-chain, holds no reserve, and embeds no extra token-specific cryptography, four of the six categories simply do not apply.

What remains is the host-chain inheritance and the question of retiring elliptic-curve cryptography on the surfaces the project still touches off-contract — the original deployer key and the vesting and treasury wallets that release the published token allocations. No Audiera-attributable post-quantum commitment exists on any public project surface. The project has no whitepaper, no security audit, no public code repository, and no governance forum, so there is no venue where a migration commitment could currently be made.

## Proposed and Implemented PQC Algorithms

Beat Token does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

BEAT is a BEP-20 token deployed solely on [BNB Chain](../chains/l1/bnb-chain.md) at contract `0xcf3232B85b43BCa90E51D38cc06Cc8bB8C8A3E36`. Its transaction signing, consensus participation, and peer-to-peer networking exposure all belong to BNB Chain, not to the token issuer — BEAT inherits the host chain's cryptography wholesale. A token cannot be more quantum-safe than the chain it runs on, so BNB Chain's posture sets BEAT's ceiling.

**Current state.** BEAT runs on a single host, so there is no `(m/n)` distribution to weigh — the rating is BNB Chain's worst category, carried through directly. BNB Chain currently rates as exposed in its peer-to-peer networking and other-features categories, which drives the aggregate to ❌. BEAT inherits that exposure with no ability to override it at the token layer. Independent listings (CoinGecko, CoinMarketCap, Coinbase, Binance) all confirm BEAT exists on BNB Chain only; an earlier assumption that BEAT was a Solana SPL token could not be substantiated against any aggregator or explorer.

**Planned future work.** Any improvement here is BNB Chain's to make. BNB Chain has an early-stage post-quantum effort underway on its transaction-signature and on-chain-logic surfaces; if and when the host chain ships post-quantum protection broadly, BEAT benefits automatically as an ordinary BEP-20. Until then, BEAT's host ceiling remains ❌. See the [BNB Chain report](../chains/l1/bnb-chain.md) for the host-chain detail.

Evidence:
- [CoinGecko — Audiera listing](https://www.coingecko.com/en/coins/audiera) — platform mapping, BNB Chain only.
- [CoinMarketCap — Audiera](https://coinmarketcap.com/currencies/audiera/) — BEP-20 deployment.
- [BscScan — BEAT token contract](https://bscscan.com/token/0xcf3232b85b43bca90e51d38cc06cc8bb8c8a3e36) — verified BEP-20 contract.

## 2. Admin / Privileged Roles

**Grade: ➖**

This category does not apply to BEAT. The token contract is ownership-renounced: a live call to `owner()` returns the zero address, confirming `renounceOwnership()` has been executed. The contract is a standard hand-rolled ERC-20 with an `Ownable` `mint()` function that is `onlyOwner`-gated — with the owner set to the zero address, that mint authority is permanently un-callable and no further BEAT can ever be minted. There is no pause, no blacklist, no transfer kill-switch, and no upgrade proxy. The full one-billion-token supply is already issued. With no live, team-attributable privileged key gating the contract, there is no admin surface to rate.

Evidence:
- [BscScan — verified contract source](https://bscscan.com/address/0xcf3232b85b43bca90e51d38cc06cc8bb8c8a3e36#code) — `mint` is `onlyOwner`; no burn, blacklist, or pause; not a proxy.
- [GeckoTerminal — BEAT contract](https://www.geckoterminal.com/bsc/tokens/0xcf3232b85b43bca90e51d38cc06cc8bb8c8a3e36) — contract verified, no proxy, no honeypot.

## 3. Cross-Chain Mechanism

**Grade: ➖**

This category does not apply to BEAT. The token is single-chain on BNB Chain — the CoinGecko platform mapping lists `binance-smart-chain` only, and CoinMarketCap, Coinbase, and Binance likewise show a single network. There is no project-attributed bridge, wrapper, or canonical cross-chain deployment of BEAT, and no wrapped BEAT representation on any other chain was found. With no cross-chain transfer mechanism, there is no bridge cryptography to rate.

Evidence:
- [CoinGecko — Audiera listing](https://www.coingecko.com/en/coins/audiera) — platforms field lists `binance-smart-chain` only.
- [CoinMarketCap — Audiera](https://coinmarketcap.com/currencies/audiera/) — single-network BEP-20 listing.

## 4. Reserve / Custody

**Grade: ➖**

This category does not apply to BEAT. The token is an unbacked utility token — there is no fiat peg, no real-world-asset collateral, no off-chain reserve pool, no proof-of-reserves, and no custody-to-chain mint-attestation linkage. The published tokenomics describe a token allocation and multi-year vesting schedule, not a backed reserve; vesting-wallet releases are token distribution, not custody-to-chain attestation. With no cryptographic linkage between off-chain custody and the on-chain contract, there is no custody-to-chain surface to rate.

Evidence:
- [CoinGecko — Audiera listing](https://www.coingecko.com/en/coins/audiera) — no reserve or backing claim.
- [Bitrue — Audiera BEAT tokenomics](https://www.bitrue.com/blog/audiera-beat-coin-explained-tokenomics) — tokenomics and vesting allocation (unbacked utility token).

## 5. Other Token-Specific Crypto

**Grade: ➖**

This category does not apply to BEAT. The token contract embeds no zero-knowledge verifier, no oracle-gated mint, no verifiable random function, no rebase logic, and no real-world-asset on-chain mapping — it is a plain hand-rolled ERC-20 with a now-dead `Ownable` mint and a `SafeMath` library. Audiera's headline features — AI-generated music, AI idols, rhythm-battle gameplay, NFT cosmetics, a Telegram mini-app, and Bluetooth dance-mat mechanics — are off-chain application logic and front-end mechanics, not on-chain cryptographic infrastructure in the BEAT contract. NFT cosmetics, if minted, would be separate contracts evaluated on their own. The BEAT token itself carries no extra token-specific cryptography to rate.

Evidence:
- [BscScan — verified contract source](https://bscscan.com/address/0xcf3232b85b43bca90e51d38cc06cc8bb8c8a3e36#code) — standard ERC-20, no ZK, oracle, or VRF.
- [Bitget Academy — Audiera overview](https://www.bitget.com/academy/12560603846400) — feature description (AI music, rhythm games, NFTs — off-chain).
- [Phemex Academy — Audiera dance-and-earn guide](https://phemex.com/academy/what-is-audiera-beat-dance-and-earn-guide) — dance-and-earn mechanics described as application-layer.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to retire elliptic-curve cryptography on the token's own surfaces, which is distinct from rating whether the token is adopting post-quantum cryptography. Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ➖, Cross-Chain ➖, Reserve & Custody ➖, Other ➖.

**Current state.** Ownership renouncement removed the single team-controlled elliptic-curve key that gated the live contract — the `onlyOwner` mint — which is why the Admin / Privileged Roles category rates as not applicable. EC Sunset, however, is stricter: it asks about retiring elliptic-curve cryptography across every surface the project still touches. Those surfaces are the original deployer key `0x2e2B29D314db954ee9d8c5ced89fa5153a64a04e` (ECDSA on secp256k1), which controlled deployment and any pre-renouncement minting and may still route project allocations; and the treasury and vesting wallets that release the Community, Foundation, Advisors, Team, and Marketing token tranches on a multi-year monthly schedule, all of which are elliptic-curve EOAs or elliptic-curve-signed multisigs. The contract's `transferOwnership` ABI also remains anchored to ECDSA should ownership ever be re-granted. No Audiera-attributable commitment to retire elliptic-curve cryptography on any of these keys appears on any public project surface — no research statement, no roadmap item, and no published security audit.

**Planned future work.** No concrete post-quantum proposal currently exists for any BEAT-controlled key surface. The project has no governance forum, no DAO mechanism, and an anonymous team, so there is currently no venue through which such a commitment could be made or attributed.

Evidence:
- [CoinGecko — Audiera listing](https://www.coingecko.com/en/coins/audiera) — official links; no PQC content, no EC-retirement roadmap.
- [BscScan — verified contract source](https://bscscan.com/address/0xcf3232b85b43bca90e51d38cc06cc8bb8c8a3e36#code) — `renounceOwnership` executed; `transferOwnership` ABI remains ECDSA-anchored.
- [RootData — Audiera](https://www.rootdata.com/Projects/detail/Audiera) — project and team data (anonymous team; no PQC posture).

## Issuer & Governance

Audiera positions BEAT as a Web3 revival of the legacy "Audition" rhythm-game intellectual property. The issuer's team is anonymous, with no public team disclosure; the project cites community contributors and "BP Market Makers" rather than a named founding team or disclosed backers.

BEAT has no on-chain governance. The token contract is non-upgradeable, its `mint()` authority is dead, and ownership is renounced; there is no DAO, no on-chain proposal system, and no published multisig roster. The project's tokenomics reference a "Foundation" tranche (15% of supply), but no Foundation governance charter, voting mechanism, or signer disclosure is public.

There is no published whitepaper, no security-audit report, and no public code repository, and none of the published project material addresses cryptographic primitives or post-quantum migration. As a result there is currently no disclosure venue — issuer blog with a roadmap, governance forum, or improvement-proposal repository — where a PQC commitment would surface. Readers tracking BEAT's posture would need to watch the project's own channels for any future disclosure.

---

_Generated on 16 May 2026 based on information as of 15 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
