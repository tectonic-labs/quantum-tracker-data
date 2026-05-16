# Four (FORM) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Four (FORM) |
| **Asset class** | DeFi Governance |
| **Issuer** | Four (the project formerly known as BinaryX) |
| **Host chain(s)** | BNB Chain |
| **Website** | https://four.meme/en |
| **Contract address** | `0x5b73A93b4E5e4f1FD27D8b3F8C97D69908b5E284` (BNB Chain, BEP-20) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | ➖ | ➖ | Not Applicable |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

FORM is the utility and governance token of the "Four" ecosystem — a GameFi, IGO launchpad, and memecoin-launchpad project that was renamed from BinaryX (BNX), with the BNX token swapped 1:1 to FORM on a new BNB Chain contract in March 2025. It is a non-upgradeable BEP-20 token deployed, by current listings, only on BNB Chain. A token cannot be more quantum-safe than the chain it runs on: FORM's transaction signing, consensus, and networking exposure are all inherited from BNB Chain, and host-chain inheritance is the ceiling on its overall posture.

Within that ceiling, the surfaces the Four team itself controls — the contract's `owner` key, the owner-managed minter set, and on-chain governance signing — are all secured by classical elliptic-curve cryptography (secp256k1 ECDSA). No post-quantum migration work attributable to Four has been located in the project's material, rebrand announcements, or exchange coverage. The issuer maintains no public PQC roadmap or statement.

## Proposed and Implemented PQC Algorithms

Four does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

FORM is issued on **BNB Chain** at `0x5b73A93b4E5e4f1FD27D8b3F8C97D69908b5E284`. Because FORM is a BEP-20 token, its transaction signing, consensus, and networking exposure are BNB Chain's, not the token's own — the token inherits whatever posture the host chain has, and it cannot be more quantum-safe than the chain it executes on.

**Current state.** Current [CoinGecko](https://www.coingecko.com/en/coins/four) and [CoinMarketCap](https://coinmarketcap.com/currencies/binaryx-new/) listings show FORM deployed only on BNB Chain. BNB Chain's worst category is its node-identity / networking layer (secp256k1-based devp2p identity) and a chain-specific bridge surface, both of which leave it quantum-exposed; with a single confirmed host sitting at that level, the inherited aggregate floor is ❌.

**Planned future work.** BNB Chain has a draft proof-of-concept that would add a post-quantum signature scheme at the protocol level, which lifts several of its categories into active development — but that is the host chain's work, not Four's, and it does not raise the chain's networking exposure today. No host-chain migration changes the FORM token's own posture.

## 2. Admin / Privileged Roles

**Grade: F ❌**

The FORM BEP-20 contract is verified on BscScan (Solidity 0.8.20, exact match) and is not an upgradeable proxy — its bytecode is fixed. It nonetheless carries several privileged surfaces.

**Current state.** Per the [verified contract source](https://bscscan.com/token/0x5b73A93b4E5e4f1FD27D8b3F8C97D69908b5E284), the contract exposes an `owner` role using a two-step ownership transfer pattern (`transferOwnership` / `acceptOwnership`). The owner controls a minter set — `addMinter(address)` and `removeMinter(address)` grant and revoke minting rights, and an approved minter can call `mint(...)`, with supply bounded by a max-supply cap. The owner can also `blacklist` and `unblacklist` addresses to freeze transfers, and a `burnBNX` helper burns legacy BNX as part of the [1:1 BNX-to-FORM token swap](https://www.coincarp.com/currencies/announcement/binaryx-bnx-token-swap-and-rebranding-to-four-form/). Every one of these privileged surfaces is authorised by secp256k1 ECDSA: the owner and minter addresses are EVM accounts authorised by ECDSA signatures or ECDSA-backed multisig. Four's published material (the [rebrand coverage](https://blog.mexc.com/what-is-four-token-form-a-binaryx-rebranding/), exchange explainers, project site) discloses no signer roster, no audit of the admin model, and no post-quantum work on these keys.

**Planned future work.** No concrete post-quantum proposal, draft, or implementation effort for FORM's admin keys currently exists on the public record.

## 3. Cross-Chain Mechanism

**Grade: ➖**

No confirmed multi-chain deployment of the post-rebrand FORM token has been located; current [CoinGecko](https://www.coingecko.com/en/coins/four) listings show it only on BNB Chain. Project roadmap material [mentions potential future cross-chain compatibility](https://blog.mexc.com/what-is-four-token-form-a-binaryx-rebranding/), but no canonical FORM bridge or attestation mechanism is in production. With no second host and no live bridge, FORM has no cross-chain transfer mechanism, so this category does not apply.

## 4. Reserve / Custody

**Grade: ➖**

FORM is an unbacked ecosystem and governance token. There is no reserve, no custodian, and no off-chain-to-on-chain mint-attestation pipeline — on-chain inflation is governed entirely by the contract's owner-managed minter set, which is already covered above. With no custody-to-chain surface, this category does not apply.

## 5. Other Token-Specific Crypto

**Grade: ➖**

FORM has no token-specific cryptographic machinery beyond what the categories above cover — no embedded ZK verifier, no token-internal VRF, no oracle-gated minting, and no on-chain RWA mapping. The contract's ERC20Votes delegation and ERC-2612 (`permit`) features rely on secp256k1 ECDSA, which is host-chain transaction-signature exposure rather than a FORM-specific surface. With no extra token-specific cryptography to rate, this category does not apply.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to retire elliptic-curve cryptography on the token's own surfaces, which is distinct from whether the token is adopting PQC. No Four-attributable plan to retire EC has been located for the FORM contract `owner` key (a secp256k1 ECDSA account or multisig), the minter set authorised via `addMinter` / `removeMinter`, or ERC20Votes governance delegation and voting (ECDSA-signed). No post-quantum discussion at all was located in Four's project material, rebrand announcements, or [exchange coverage](https://bscscan.com/token/0x5b73A93b4E5e4f1FD27D8b3F8C97D69908b5E284), and the [Four ecosystem site](https://four.meme/en) carries no PQC content.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ➖, Reserve & Custody ➖, Other ➖.

We have found no public information indicating EC-retirement activity for FORM. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Issuer & Governance

FORM is issued and operated by Four, the project that was renamed from BinaryX in 2024; that rename itself ran through a community vote of BNX holders held 21–23 September 2024. The FORM contract embeds ERC20Votes, giving the token on-chain delegation and vote-weight accounting, and the project describes FORM as the governance token of the Four ecosystem. No formal on-chain Governor or Timelock stack for FORM has been located — the contract `owner` holds the actual admin authority. All voting and signing is secp256k1 ECDSA.

Product and project information is disclosed through the Four ecosystem site and exchange coverage of the rebrand and token swap. No PQC-related proposal, roadmap, or discussion has been located, and no dated on-record post-quantum milestone has been published by the issuer.

---

_Generated on 16 May 2026 based on information as of 16 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
