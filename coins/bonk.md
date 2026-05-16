# BONK (BONK) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | BONK |
| **Ticker** | BONK |
| **Asset class** | Meme |
| **Issuer** | Community-launched token; ecosystem and treasury governed by BonkDAO. |
| **Host chain(s)** | Solana (canonical SPL); Wormhole-wrapped copies on Ethereum, BNB Chain, Polygon PoS, Arbitrum One, Neon EVM, Aptos, and Unichain. |
| **Website** | https://www.bonkcoin.com/ |
| **Contract address** | `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263` (canonical Solana SPL mint). |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | ➖ | ➖ | Not Applicable |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

BONK is a meme token native to Solana, where it exists as an SPL token. Its mint and freeze authorities were burned at launch (or shortly after), so the supply is fixed and only decreases through governance-voted burns — there is no live token-issuer authority that gates supply or balances. Because of that, the surfaces a token issuer normally controls collapse to "not applicable": there is no admin key with power over the contract, no off-chain reserve to anchor, and no extra cryptography embedded in the SPL token itself.

What remains is what BONK *inherits*. A token cannot be more quantum-safe than the chain it runs on — host-chain inheritance is the ceiling. BONK's canonical host, Solana, currently carries quantum-vulnerable exposure, and every off-Solana copy is a third-party Wormhole-wrapped representation that inherits both its destination chain's exposure and the bridge's classical attestation cryptography. No BonkDAO- or Bonk-team-attributable plan to adopt post-quantum cryptography or to retire elliptic-curve cryptography on any BONK-related surface has surfaced on the public record.

## Proposed and Implemented PQC Algorithms

BONK does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

BONK is canonically issued on **Solana** as the SPL token `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263`. Wrapped representations also exist on seven additional hosts: Ethereum, BNB Chain, Polygon PoS, Arbitrum One, Neon EVM, Aptos, and Unichain ([CoinGecko platform mapping](https://www.coingecko.com/en/coins/bonk)).

BONK's transaction signing, consensus participation, and peer-to-peer networking exposure all belong to whichever host chain a given BONK balance lives on — they are not the token's own surfaces. The token cannot be more quantum-safe than the chain it executes on, so the host chain's posture is the ceiling for BONK's quantum readiness.

**Current state.** Every evaluated host carries quantum-vulnerable exposure. Of the hosts with their own public reports, [Solana](../chains/l1/solana.md), [Ethereum](../chains/l1/ethereum.md), [BNB Chain](../chains/l1/bnb-chain.md), and [Aptos](../chains/l1/aptos.md) each reach a worst-category exposure of ❌; Polygon PoS is exposed across every category. The two L2 hosts (Arbitrum One, Unichain) and Neon EVM are not separately rated, but they inherit a ❌ posture from their settlement chains — Arbitrum One and Unichain settle to Ethereum, and Neon EVM runs over the Solana base layer. The worst state is uniform at ❌ across all hosts evaluated, so there is no outlier-versus-pervasive split to call out: the exposure is pervasive.

**Planned future work.** Aptos is pursuing post-quantum transaction signatures; if that work ships, the Aptos-side BONK representation would benefit on the transaction-signing surface. No comparable migration has shipped on the other hosts.

Sources:
- https://www.coingecko.com/en/coins/bonk — platform mapping (8 hosts, contract addresses)
- https://solscan.io/token/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263 — canonical Solana BONK mint
- https://etherscan.io/token/0x1151cb3d861920e07a38e03eead12c32178567f6 — Wormhole-wrapped BONK on Ethereum
- https://bscscan.com/token/0xa697e272a73744b343528c3bc4702f2565b2f422 — BONK on BNB Chain
- https://polygonscan.com/token/0xe5b49820e5a1063f6f4ddf851327b5e8b2301048 — BONK on Polygon
- https://arbiscan.io/token/0x09199d9a5f4448d0848e4395d065e1ad9c4a1f74 — BONK on Arbitrum

## 2. Admin / Privileged Roles

**Grade: ➖**

This category does not apply to BONK. BONK launched on Solana in December 2022 as an SPL token with a fixed initial supply of 100 trillion tokens distributed via a one-time airdrop — there was no ICO, no presale, and no ongoing emissions. On-chain explorer reads of the mint account show that both the **mint authority** and the **freeze authority** are burned (set to `null`): no party can produce additional BONK or freeze token accounts, and total supply only decreases through governance-voted burns. The one live authority is the Metaplex metadata update authority, which can change the token's display name, symbol, and metadata URI but cannot mint, burn, freeze, or transfer BONK — it has no path to supply or balances. With no live authority that gates the SPL contract, there is no admin or privileged-role surface to rate.

Sources:
- https://solscan.io/token/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263 — mint authority null, freeze authority null
- https://www.cube.exchange/what-is/bonk — launch overview, supply mechanics
- https://www.bitdegree.org/crypto/tutorials/bonk-token-airdrop — December 2022 airdrop mechanics, distribution
- https://cryptorank.io/news/feed/5d157-bonk-dao-burns-1-69t-tokens-bringing-the-supply-down-to-91t — supply reduction to ~91T via DAO burn

## 3. Cross-Chain Mechanism

**Grade: F ❌**

BONK is single-issuer on Solana; every off-Solana BONK is a third-party wrapped representation. The canonical wrapped path on each of the seven non-Solana hosts is the **Wormhole Token Bridge (Portal)**: BONK SPL tokens are locked in the Wormhole Token Bridge program on Solana, and a Wormhole-wrapped BONK is minted on the destination chain. Each of the seven destination addresses is the Wormhole-wrapped BONK on that chain — the Ethereum representation is explicitly labelled "bridged using Wormhole" on its [Etherscan token info](https://etherscan.io/token/0x1151cb3d861920e07a38e03eead12c32178567f6), the Unichain representation is part of the [Uniswap canonical Wormhole bridging set](https://support.uniswap.org/hc/en-us/articles/39264728322317-Bridging-Tokens-with-Wormhole), and the rest fall under the same [CoinGecko platform mapping](https://www.coingecko.com/en/coins/bonk) that names Wormhole as the cross-chain mechanism.

**Current state.** Each cross-chain BONK transfer is attested by Wormhole VAAs signed by 13-of-19 Wormhole Guardians using classical ECDSA over the secp256k1 curve. The Bonk team and BonkDAO are not the bridge operator — this is third-party bridge inheritance. Because the Wormhole Token Bridge serves many chains that themselves carry ❌ exposure, and the Guardian attestation cryptography is uniformly classical with no post-quantum migration shipped, this category is rated ❌. Liquidity also moves through aggregators (Jupiter, Mayan, deBridge) and centralized-exchange deposit and withdrawal paths, but those do not change the trust model relative to the underlying wrapped-token path or the exchange's own custody.

**Planned future work.** No post-quantum proposal currently exists for the Wormhole Guardian attestation path, and no scheduled deprecation of classical Guardian signing has been announced.

Sources:
- https://www.coingecko.com/en/coins/bonk — "BONK is available across 10 blockchain networks through cross-chain bridges like Wormhole"
- https://etherscan.io/token/0x1151cb3d861920e07a38e03eead12c32178567f6 — Wormhole-bridged BONK on Ethereum
- https://support.uniswap.org/hc/en-us/articles/39264728322317-Bridging-Tokens-with-Wormhole — Unichain canonical bridging via Wormhole
- https://portalbridge.com/ — Wormhole Portal Token Bridge supported chains
- https://wormhole.com/docs/products/reference/contract-addresses/ — Wormhole Token Bridge contract addresses across chains
- https://everstake.one/blog/an-essential-guide-to-wormhole-and-the-portal-token-bridge — Portal Bridge overview

## 4. Reserve / Custody

**Grade: ➖**

This category does not apply to BONK. BONK is an unbacked meme token: there is no off-chain reserve, no proof-of-reserves, no mint-authorisation surface (the mint authority is burned), and no disclosed cryptographic linkage between off-chain custody and the on-chain contract. With no custody-to-chain surface, there is nothing to rate here.

## 5. Other Token-Specific Crypto

**Grade: ➖**

This category does not apply to BONK. The canonical Solana BONK SPL token has no embedded ZK verifier, oracle gating, verifiable random function, rebase logic, or real-world-asset on-chain mapping. Adjacent ecosystem products — BonkBot (a Telegram trading bot routing over Jupiter and Solana DEXes), LetsBonk.fun (a memecoin launchpad operated with Raydium), BonkSwap, and Bonk Arena — are separate programs and front-ends that consume BONK but do not embed cryptography into the SPL token itself. BonkDAO governance routes through Realms, Solana's on-chain governance platform, where voting is by classical Ed25519 wallet signature; that voting authentication is operational authorization, captured under EC Sunset below, rather than a token-contract cryptographic extra. With no extra cryptography in the SPL token, there is nothing to rate here.

Sources:
- https://www.bonkdao.com/ — BonkDAO voting site
- https://www.coingecko.com/learn/letsbonk-fun-solana-memecoin-launchpad-guide — LetsBonk.fun launchpad overview
- https://docs.bonkbot.io/ — BonkBot documentation

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether there is a credible plan to *retire* elliptic-curve cryptography on BONK's own surfaces — distinct from whether BONK is *adopting* post-quantum cryptography. Adding PQC alongside EC is not the same as retiring EC. For reference, BONK's PQC-adoption ratings per category are: Host Chain ❌, Admin ➖, Cross-Chain ❌, Reserve & Custody ➖, Other ➖.

**Current state.** The relevant elliptic-curve surfaces for BONK are:

- The **canonical Solana BONK SPL mint** — mint and freeze authorities are burned, so there is no live SPL authority key to retire. The Metaplex metadata update authority, a single classical Ed25519 keypair, is still live; it is a low-blast-radius surface (it cannot touch supply or balances) but an elliptic-curve surface nonetheless.
- The **BonkDAO treasury multisig** — an 8-of-11 classical Ed25519 Solana multisig held by an 11-member community council, which controls the DAO treasury and routes governance-decided burns and grants.
- **Realms governance voting** — BonkDAO community voting is authenticated by staked-BONK-holder Ed25519 wallet signatures.
- The **Wormhole Guardian set** — 19 Guardians signing 13-of-19 ECDSA (secp256k1) VAAs that attest every cross-chain BONK transfer on the seven non-Solana hosts.

Nothing in the public BonkDAO record — the BonkDAO voting portal, the BONK community site, or the BonkDAO Medium publication — surfaces a commitment to retiring classical ECDSA or Ed25519 on any of these surfaces. The category is rated ❌.

**Planned future work.** No concrete plan, draft, or proposal to retire elliptic-curve cryptography on any BONK-related surface currently exists on the public record.

Sources:
- https://www.bonkdao.com/ — BonkDAO voting portal (no PQC content)
- https://medium.com/@bonkdao.com/burn-of-bonk-token-earned-from-bonkbot-bbb279b5511a — BonkDAO Medium (treasury / burn operations, no PQC mention)
- https://www.bonkcoin.com/ — BONK community site (no PQC content)

## Issuer & Governance

BONK has no on-chain governance over its canonical Solana SPL mint: mint and freeze authorities are burned, supply is fixed, and the contract has no upgrade proxy or owner. Governance over the BonkDAO treasury and the wider ecosystem (BonkBot fee allocation, LetsBonk.fun parameters, grants, and burn schedules) flows through two layers:

- An **8-of-11 multisig council** of community members and core contributors, which initially managed the DAO treasury, with proposals requiring a 1% quorum and 66% approval.
- A **Realms-based community voting layer**, activated in July 2024, that lets any BONK holder temporarily stake and vote on burn proposals and other DAO matters, with the council gradually delegating decisions to community vote.

Governance decisions can move treasury BONK and direct ecosystem revenue, but cannot mint new BONK, freeze accounts, or alter the SPL contract. Decisions are disclosed through the BonkDAO voting portal and the BonkDAO Medium publication; the most significant decisions to date have been periodic supply burns funded by BonkBot trading fees. Any post-quantum commitment by BonkDAO would surface through those venues. As of this report, none has.

---

_Generated on 16 May 2026 based on information as of 13 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
