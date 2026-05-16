# Trust Wallet Token (TWT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Trust Wallet Token |
| **Ticker** | TWT |
| **Asset class** | DeFi Governance |
| **Issuer** | Trust Wallet (Binance-affiliated entity) |
| **Host chain(s)** | BNB Chain (BEP-20, canonical), Ethereum (legacy ERC-20) |
| **Website** | https://trustwallet.com/ |
| **Contract address** | `0x4B0F1812e5Df2A09796481Ff14017e6005508003` (BEP-20, BNB Chain) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Trust Wallet Token (TWT) is a utility and governance token tied to the Trust Wallet self-custody wallet, a Binance-affiliated product. It is canonically issued on BNB Chain as a BEP-20 token, with a legacy ERC-20 representation on Ethereum dating from the 2018 ICO. A token cannot be more quantum-safe than the chain it executes on — host-chain inheritance is the ceiling, and TWT inherits an ❌ floor from both of its evaluated host chains. On top of that, the surfaces the issuer itself controls are also elliptic-curve dependent today: the BEP-20 contract still has a live owner key, and the inter-chain paths rely on classical, EC-attested bridges and the legacy ERC-20 deployment.

The TWT contract has a deliberately thin admin surface — a fixed 1,000,000,000 supply minted once in the constructor, with no post-deploy mint, pause, blacklist, or upgrade function — so the owner role's live capability is narrow. But an owner key still exists (ownership has not been renounced), it is guarded by a secp256k1 ECDSA key, and no Trust Wallet or Binance-attributable plan has surfaced to migrate that key, the governance signing path, or the cross-chain paths to post-quantum cryptography.

## Proposed and Implemented PQC Algorithms

Trust Wallet Token does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

TWT runs on two chains: it is canonically issued on [BNB Chain](../chains/l1/bnb-chain.md) as a BEP-20 token at `0x4B0F1812e5Df2A09796481Ff14017e6005508003`, and it has a legacy ERC-20 representation on [Ethereum](../chains/l1/ethereum.md) from the original 2018 ICO. The token's transaction signing, consensus, and networking exposure are properties of those host chains, not of the TWT contract. A token cannot be more quantum-safe than the chain it executes on — the host chains set the ceiling.

**Current state.** Both evaluated hosts carry an ❌ rating in at least one category. BNB Chain rates ❌ on its peer-to-peer networking layer and on a chain-specific "other" surface; Ethereum rates ❌ on its peer-to-peer networking layer. Because TWT's two hosts differ, a distribution qualifier applies — both of the two evaluated hosts (a `2/2` distribution) sit at ❌ across a subset of categories, so the ❌ floor is pervasive across the evaluated set rather than the result of a single outlier. Neither host is exposed across every category, but each hits ❌ somewhere, which sets the aggregate floor at ❌.

**Planned future work.** Of the two hosts, BNB Chain is the better-positioned on transaction-signature and consensus surfaces: it has an early proof-of-concept draft pairing a post-quantum signature scheme with a hash-based proof-aggregation approach, which moves those two surfaces into in-development status on the BNB Chain report. That host-chain progress does not lift TWT's own aggregate — the exposed networking and "other" surfaces still set the floor — but it is the path by which TWT could one day inherit a quantum-safe transaction-signature surface. See the [BNB Chain](../chains/l1/bnb-chain.md) and [Ethereum](../chains/l1/ethereum.md) reports for the full host-chain picture.

## 2. Admin / Privileged Roles

**Grade: F ❌**

The TWT BEP-20 contract on BNB Chain (`0x4B0F1812e5Df2A09796481Ff14017e6005508003`) is the verified `TrustWalletToken` contract, compiled with Solidity 0.6.12 and built from the OpenZeppelin `ERC20`, `ERC20Burnable`, and `Ownable` components ([BscScan verified source](https://bscscan.com/token/0x4b0f1812e5df2a09796481ff14017e6005508003#code)).

**Current state.** The contract's admin surface is intentionally thin. The full 1,000,000,000 TWT supply is minted once inside the constructor, and the contract exposes no owner-callable `mint` function — supply can only decrease through burns ([Callisto Network audit, Dec 2021](https://callisto.network/trust-wallet-token-security-audit-report/); [TWT tokenomics](https://trustwallet.com/twt-token)). The `burn` and `burnFrom` functions are callable by any holder against their own balance or an approved allowance, not an admin surface. The remaining owner-only functions are `transferOwnership` and `renounceOwnership`. Ownership has **not** been renounced — `owner()` does not return the zero address — so a live owner role exists. Because there is no mint, pause, blacklist, or upgrade function, the owner's capability is limited to re-assigning or renouncing ownership; it cannot move user balances or inflate supply.

That live owner role is guarded by a secp256k1 ECDSA key — a Trust Wallet / Binance-controlled key, operated as a classical externally-owned account or a Binance-operated multisig on BNB Chain. TWT governance is run as off-chain community proposals executed by the Trust Wallet team, and any binding on-chain action is an ECDSA-signed transaction from that owner key. No Trust Wallet or Binance governance proposal, forum thread, or engineering post discusses migrating the TWT owner key or the governance signing path to a post-quantum scheme; the [Trust Wallet community forum](https://community.trustwallet.com/) shows no such thread. The key remains a forge or compromise target at Q-day, and a future action that re-introduces authority — a migration to a new TWT contract, or an ownership-gated extension — would route through it.

## 3. Cross-Chain Mechanism

**Grade: F ❌**

TWT is canonical on BNB Chain as a BEP-20 token; the Ethereum association is the legacy 2018 ERC-20 from the original ICO ([host-platform listing](https://www.coingecko.com/en/coins/trust-wallet-token); [TWT origin and migration](https://trustwallet.com/twt-token)).

**Current state.** The present-day cross-chain posture is not a token-team-operated canonical bridge. TWT moves between its two hosts through the legacy ERC-20-to-BEP-20 relationship — where the BEP-20 deployment is the primary one and the ERC-20 a residual representation — and through generic third-party bridges, including the [BNB Chain native bridge](https://www.bnbchain.org/en/bnb-chain-bridge) and the in-app swap and bridge providers exposed in the Trust Wallet application. These attestation layers are elliptic-curve based: ECDSA validator and relayer sets, EC-curve multi-party computation, or BLS-pairing committees, depending on the provider. A token that rides any generic bridge inherits the worst-rated chain across that bridge's full coverage footprint, and the mainstream bridges reachable for TWT cover chains that carry ❌ ratings, so the inherited cross-chain rating is ❌. No Trust Wallet or Binance-attributable post-quantum work was located on the TWT cross-chain path.

## 4. Reserve / Custody

**Grade: ➖**

TWT is an unbacked utility and governance token with a fixed launch supply. There is no reserve, no custodian, and no off-chain-to-on-chain mint-attestation pipeline — the supply was minted once in the constructor with no post-deploy mint, so there is no custody-to-chain linkage to rate. This category does not apply.

## 5. Other Token-Specific Crypto

**Grade: ➖**

TWT has no token-specific cryptographic surface beyond what categories 1 through 3 cover — no embedded zero-knowledge verifier, no token-internal verifiable random function, no oracle-gated issuance, and no real-world-asset on-chain mapping. The BEP-20 contract is a plain `TrustWalletToken` (ERC-20 plus burnable). Trust Wallet the application is itself a multi-chain self-custody wallet with its own key-management cryptography, but that is the wallet client's exposure, not a property of the TWT token contract. This category does not apply.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ➖.

**Current state.** No Trust Wallet or Binance-attributable plan to retire elliptic-curve cryptography was located for any of TWT's own surfaces: the BEP-20 owner key (a secp256k1 ECDSA externally-owned account or multisig on BNB Chain), the Trust Wallet governance signing path (off-chain community proposals executed via ECDSA transactions), or the generic third-party bridges and legacy ERC-20-to-BEP-20 path that ferry TWT between BNB Chain and Ethereum. The [Trust Wallet community forum](https://community.trustwallet.com/), [Trust Wallet's main site](https://trustwallet.com/), and [Binance's blog](https://www.binance.com/en/blog) show no such commitment for TWT. Notably, renouncing ownership — a single `renounceOwnership()` call — would permanently retire the one TWT-controlled EC admin surface and is the cheapest possible EC-sunset action available to the issuer; it has not been taken.

## Issuer & Governance

TWT is issued by Trust Wallet, a multi-chain self-custody wallet and a Binance-affiliated entity (Binance acquired Trust Wallet in 2018). Governance follows a community-proposal, team-executed model rather than an on-chain Governor: token holders submit and discuss proposals through the [Trust Wallet community channels](https://community.trustwallet.com/), and the Trust Wallet team executes binding actions. There is no on-chain Governor or Timelock contract specific to TWT, and the TWT contract itself has a deliberately thin admin surface (no mint, no pause, no upgrade proxy), so the only binding on-chain owner action is ownership transfer or renouncement, executed as an ECDSA-signed transaction from the contract owner key.

Product and any PQC commitments would surface through Trust Wallet's main site, the community forum, or Binance's published materials. No PQC-related proposal, request for proposals, or forum post was located for TWT; Trust Wallet's published priorities focus on wallet feature development (multi-chain support, swaps, dApp browser) rather than PQC migration of the TWT token contract.

---

_Generated on 16 May 2026 based on information as of 15 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
