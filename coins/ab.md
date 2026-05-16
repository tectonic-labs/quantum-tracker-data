# AB — Public PQC Readiness Report

| | |
|---|---|
| **Name** | AB |
| **Asset class** | Utility |
| **Issuer** | AB DAO (rebrand of the Newton Project, formerly ticker `NEW`) |
| **Host chain(s)** | AB Chain (AB Core mainnet, native), BNB Chain (BEP-20, canonical trading venue), Ethereum (ERC-20) |
| **Contract address** | `0x95034f653d5d161890836ad2b6b8cc49d14e029a` (BEP-20 on BNB Chain) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

AB is the native gas token of AB Chain (AB Core) and also circulates as a BEP-20 on BNB Chain — its highest-volume venue — and as an ERC-20 on Ethereum. Its post-quantum posture is, at present, entirely classical. The token contracts on BNB Chain and Ethereum, AB DAO's governance signing, and the AB Connect cross-chain protocol all rely on elliptic-curve cryptography (secp256k1 ECDSA), and no public AB DAO roadmap, proposal, or technical document discusses migrating any of these surfaces to post-quantum schemes.

A token cannot be more quantum-safe than the chain it executes on: host-chain inheritance is the ceiling. AB inherits its transaction-signing, consensus, and networking exposure from AB Chain, BNB Chain, and Ethereum, and every evaluated host carries classical EC cryptography with no shipped migration. On top of that inherited ceiling sit the issuer-controlled surfaces — admin keys, governance, and the AB Connect bridge — which are likewise EC-based today. No issuer PQC roadmap or statement was located.

## Proposed and Implemented PQC Algorithms

AB does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

AB runs on three host chains, and this grade is inherited from them — it reflects the chains' own cryptography, not anything the AB DAO controls. Transaction signing, consensus, and node-to-node networking for AB transfers are properties of AB Chain, BNB Chain, and Ethereum, not of the token itself.

**Current state.** AB Chain (AB Core) is a heterogeneous main-chain-plus-sidechain network running Proof of Authority consensus, where AB is the native gas token used to process transactions across the mainnet and sidechains ([CoinMarketCap](https://coinmarketcap.com/currencies/newton/), [CMC AI](https://coinmarketcap.com/cmc-ai/newton/what-is/)). Its validator identity, block signing, and peer-to-peer layer are elliptic-curve based, consistent with EVM-style POA chains. On BNB Chain, AB trades as a BEP-20 at `0x95034f653d5d161890836ad2b6b8cc49d14e029a` ([CoinGecko](https://www.coingecko.com/en/coins/ab-dao)); see the [BNB Chain report](../chains/l1/bnb-chain.md) for its full PQC posture. On Ethereum, AB is listed as an ERC-20; see the [Ethereum report](../chains/l1/ethereum.md). Of the two hosts with their own published evaluations, both carry an unmitigated EC exposure in at least one category — a 2-of-2 distribution, meaning the exposure is pervasive across the evaluated hosts rather than an outlier. AB Chain itself does not yet have a stand-alone published evaluation; as an EC-based POA chain it would not raise the floor.

**Planned future work.** No host-chain migration that would lift this aggregate is recorded for AB's hosts in the material reviewed. The host-chain reports linked above are the place to track any future change.

## 2. Admin / Privileged Roles

**Grade: F ❌**

AB's representations on BNB Chain and Ethereum are standard BEP-20 / ERC-20 contracts controlled by AB DAO project keys.

**Current state.** The BNB-Chain AB contract (`0x95034f653d5d161890836ad2b6b8cc49d14e029a`) and the Ethereum ERC-20 are administered by AB DAO operational keys — secp256k1 ECDSA externally-owned accounts and/or multisigs ([CoinMarketCap](https://coinmarketcap.com/currencies/newton/)). AB has a fixed supply ceiling (roughly 98.82B circulating against a 100B maximum), so inflation is capped, but the privileged surfaces — the cross-chain mint/burn authority used by AB Connect and any pause or upgrade roles — remain elliptic-curve controlled. AB DAO governance lets AB holders propose and vote on upgrades, tokenomics, and parameters, with voting weight denominated in AB ([Gate](https://www.gate.com/learn/articles/what-is-ab-all-you-need-to-know-about-ab/8611), [BingX](https://bingx.com/en/learn/what-is-ab)); on-chain votes use secp256k1 ECDSA and off-chain signaling uses EIP-712 ECDSA. No AB DAO governance proposal, forum thread, or technical document reviewed discusses migrating contract admin keys, governance signing, or the AB Connect mint authority to post-quantum primitives.

## 3. Cross-Chain Mechanism

**Grade: F ❌**

AB moves between chains via **AB Connect**, AB DAO's own cross-chain protocol, which enables the AB token and other assets to move between AB Core, AB sidechains, Ethereum, and BNB Chain ([Gate](https://www.gate.com/learn/articles/what-is-ab/8502), [CMC AI](https://coinmarketcap.com/cmc-ai/newton/what-is/)).

**Current state.** AB Connect is operated by the issuer — AB DAO is the bridge operator — so its full attestation surface is in scope here. The attestation and relay layer is elliptic-curve based: AB Core's POA validators and authorities sign with secp256k1 ECDSA, and cross-chain message authorization, together with the mint and burn of wrapped AB on Ethereum and BNB Chain, is gated by EC-signed attestations. This is the standard federation / POA-attested bridge model ([Bybit](https://learn.bybit.com/en/blockchain/what-is-ab-crypto)). No post-quantum migration of the AB Connect attestation scheme, no validator-set re-key, and no message-format upgrade was located in the material reviewed.

## 4. Reserve / Custody

**Grade: ➖**

AB is an unbacked utility and gas token. There is no reserve, no off-chain custodian, and no custody-to-chain mint-attestation pipeline. The only mint/burn authority that exists is the AB Connect cross-chain authority, which is covered under sections 2 and 3, so there is no separate reserve or custody surface to rate.

## 5. Other Token-Specific Crypto

**Grade: ➖**

AB has no token-specific cryptographic surface beyond what sections 1 through 3 cover — no embedded ZK verifier, no token-internal verifiable random function, no oracle-gated mint, and no real-world-asset on-chain mapping. AB DAO markets real-world-asset integration as a use case, but no AB-specific on-chain asset-identifier attestation or signed RWA mapping was located, so this category does not apply today.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to *retire* elliptic-curve cryptography on the token's own surfaces — distinct from whether the token is *adopting* post-quantum cryptography.

**Current state.** No AB DAO-attributable plan to retire elliptic-curve cryptography was located on any of AB's surfaces: the BEP-20 / ERC-20 contract admin keys (ECDSA EOAs and multisigs), AB DAO governance signing (token-weighted ECDSA votes), the AB Connect cross-chain attestor and relayer keys (POA, secp256k1 ECDSA), or the AB Core POA validator and authority signing keys. No AB DAO roadmap, whitepaper, or forum content reviewed surfaced any post-quantum or EC-retirement track ([Gate](https://www.gate.com/learn/articles/what-is-ab/8502), [BingX](https://bingx.com/en/learn/what-is-ab)).

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ➖.

## Issuer & Governance

AB is governed by **AB DAO**, a decentralized autonomous organization that lets AB token holders propose and vote on protocol upgrades, tokenomics changes, and other developments, with voting weight denominated in AB ([Gate](https://www.gate.com/learn/articles/what-is-ab-all-you-need-to-know-about-ab/8611), [BingX](https://bingx.com/en/learn/what-is-ab)). The DAO model dates from the project's 2025 rebrand from the Newton Project (legacy ticker `NEW`) to AB DAO. Governance signing is elliptic-curve end to end: on-chain votes and executor calls use secp256k1 ECDSA, and off-chain signaling uses EIP-712 ECDSA.

Product and protocol commitments would surface through AB DAO governance proposals and AB DAO's published roadmap and architecture materials. No post-quantum-related proposal or roadmap item was located in the AB DAO governance materials reviewed.

---

_Generated on 16 May 2026 based on information as of 15 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
