# DeepBook Token (DEEP) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | DeepBook Token |
| **Ticker** | DEEP |
| **Asset class** | DeFi Governance |
| **Issuer** | Mysten Labs (DeepBook V3 protocol) |
| **Host chain(s)** | Sui (native Move package) |
| **Website** | https://www.deepbook.tech/ |
| **GitHub** | https://github.com/MystenLabs/deepbookv3 |
| **Contract address** | `0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP` |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | ➖ | ➖ | Not Applicable |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

DEEP is the utility, fee, and governance token for DeepBook V3, a decentralized central-limit-order-book exchange built natively on Sui by Mysten Labs. Because DEEP is a native Sui Move `Coin` rather than a bridged or off-chain-backed asset, its quantum-readiness story is mostly inherited from Sui itself: every transaction that places an order, pays a fee, stakes DEEP, or votes in pool governance is authenticated by a Sui transaction signature. A token cannot be more quantum-safe than the chain it runs on, and that host-chain inheritance is the ceiling here — DEEP cannot exceed Sui's posture no matter what the issuer does.

On the surfaces the issuer does control — the DeepBook protocol admin capability, the Move package upgrade capability, and the DEEP treasury — every key today is an elliptic-curve Sui key, and neither DeepBook's documentation nor Mysten Labs' DEEP and governance writeups describe a plan to migrate them to post-quantum cryptography. DEEP has no cross-chain bridge, no off-chain reserve, and no token-specific cryptography beyond Sui-native signature verification, so those three categories do not apply. The result is a token whose post-quantum exposure is currently undiscussed on both the inherited side and the issuer-controlled side.

## Proposed and Implemented PQC Algorithms

DEEP does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

DEEP is issued natively on [Sui](../chains/l1/sui.md) as a Move `Coin`, with the type `0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP`. There is no second host chain and no bridged representation in the canonical deployment — DeepBook V3 is [deployed exclusively on Sui](https://docs.sui.io/standards/deepbook). Because DEEP is a single-host token, its transaction signing, consensus, and networking exposure are entirely Sui's, not the token's: this category rates what DEEP inherits, not anything the DeepBook team can change on its own.

**Current state.** Sui's worst-rated categories drive this aggregate. Sui's consensus (Mysticeti BFT with BLS12-381 aggregated validator signatures), peer-to-peer networking (secp256k1 node identity), on-chain verification (a Move VM exposing only elliptic-curve modules), and other cryptography (zkLogin's Groth16 proofs over the BN254 pairing curve) are all quantum-vulnerable today. Sui's transaction-signature path is somewhat further along — Mysten Labs' `fastcrypto` library carries experimental post-quantum building blocks — but the host's lower-rated categories set the aggregate at the bottom. With Sui as DEEP's only host, there is no distribution qualifier: the exposure is pervasive across the single chain DEEP runs on.

**Planned future work.** Any improvement here is host-chain work. See the [Sui report](../chains/l1/sui.md) for the current state of Sui's protocol-level migration efforts. Even a fully post-quantum DeepBook admin posture would remain capped by Sui's host-chain ratings until Sui itself migrates.

## 2. Admin / Privileged Roles

**Grade: F ❌**

DeepBook V3 runs entirely as Sui Move packages, and DEEP is a Move `Coin`. Several privileged surfaces govern the token and the protocol it secures, and all of them authenticate with Sui elliptic-curve transaction signatures.

**Current state.** The DeepBook `registry` module defines a [`DeepbookAdminCap`](https://github.com/MystenLabs/deepbookv3/blob/main/packages/deepbook/sources/registry.move) — minted to the package publisher's address at initialization and held off-contract — that gates `set_treasury_address` (where pool-creation fees are sent), `enable_version` / `disable_version` (which package versions the live contracts accept), `add_stablecoin` / `remove_stablecoin` (the stablecoin whitelist), and `authorize_app` / `deauthorize_app`. Version enable/disable is the upgrade-gating control: it decides which on-chain code path is honored. Separately, the DeepBook V3 Move packages are upgradable, and Sui package upgrades are authorized by an `UpgradeCap` object — whoever holds it can publish a new package version, which the `DeepbookAdminCap` then enables. The DEEP [`TreasuryCap`](https://github.com/MystenLabs/deepbookv3/blob/main/packages/token/sources/deep.move) is wrapped inside a shared `ProtectedTreasury` object that exposes a public `burn` but no public mint, so post-genesis supply can only decrease; supply was fixed at 10 billion in a single genesis mint. Finally, [per-pool DEEP-staking governance](https://blog.sui.io/deep-token-deepbook-governance/) lets stakers vote each epoch on a pool's taker fee, maker fee, and required stake under a quasi-concave voting curve.

Every one of these surfaces — the `DeepbookAdminCap`, the package `UpgradeCap`, the `ProtectedTreasury` / `TreasuryCap`, and pool governance — moves and authenticates with Sui elliptic-curve keys (ed25519, or secp256k1/secp256r1). Sui `MultiSig` thresholds, if used for the admin or upgrade caps, are operational hardening, not a post-quantum measure. No concrete post-quantum proposal currently exists for any of these keys, and no DeepBook or Mysten Labs document discusses migrating them.

## 3. Cross-Chain Mechanism

**Grade: ➖**

DEEP is a single-chain token. It is a native Sui Move `Coin` with no canonical bridge deployment, no wrapped or cross-chain representation in the official tokenomics, and no issuer-operated cross-chain mint path. DeepBook V3 is deployed only on Sui, and DEEP's entire lifecycle — genesis mint, trading-fee payment, staking, and governance — happens on Sui. There is no cross-chain attestation cryptography to evaluate, so this category does not apply.

## 4. Reserve / Custody

**Grade: ➖**

DEEP is an unbacked utility, fee, and governance token. There is no fiat peg, no real-world-asset collateral, and no off-chain reserve pool. The fixed 10-billion supply is held in the on-chain `ProtectedTreasury` (covered under Admin / Privileged Roles), and there is no custody-to-chain mint-attestation infrastructure separate from that. With no off-chain reserve and no cryptographic linkage between custody and the on-chain contract, there is no custody-to-chain surface to rate.

## 5. Other Token-Specific Crypto

**Grade: ➖**

DeepBook V3 is an on-chain central-limit-order-book matching engine: order placement, matching, settlement, flash loans, and `BalanceManager` accounting all run as ordinary [Sui Move transactions](https://docs.sui.io/standards/deepbook). The matching engine and the pool data structures carry no cryptographic primitive beyond Sui-native transaction signature verification, which is rated on the host-chain side. There is no ZK verifier embedded in the contract, no token-specific threshold-signature scheme or oracle-gated mint, and no verifiable-random-function in the fee or staking logic. DeepBook has no token-adjacent committee or attestation cryptography, so there is no token-specific extra cryptography to rate.

## 6. EC Sunset

**Grade: F ❌**

Adding post-quantum cryptography alongside elliptic-curve cryptography is not the same as retiring elliptic-curve cryptography. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ➖, Reserve & Custody ➖, Other ➖.

EC Sunset rates whether the issuer has a credible plan to *retire* elliptic-curve cryptography on the token's own surfaces. No DeepBook- or Mysten-Labs-attributable plan exists to retire elliptic-curve keys on the `DeepbookAdminCap` (which controls version enablement, the treasury address, the stablecoin whitelist, and app authorization), the DeepBook V3 package `UpgradeCap`, the DEEP `ProtectedTreasury` / `TreasuryCap` and genesis-distribution keys, or per-pool DEEP-staking governance voting. DeepBook's [documentation](https://docs.sui.io/standards/deepbook) and the [DEEP token launch](https://blog.sui.io/deepbook-version3-deep-token/) and governance writeups describe tokenomics, the matching engine, and the voting model but contain no elliptic-curve-deprecation milestone. Mysten Labs' `fastcrypto` library carries experimental post-quantum building blocks relevant to Sui's transaction-signature path, but those are not linked to DeepBook's admin keys or the DEEP token. No scheduled retirement of elliptic-curve cryptography is published for any DEEP-issuer surface.

## Issuer & Governance

DeepBook V3 is built by Mysten Labs, the team behind Sui, and is positioned as native Sui DeFi infrastructure. DEEP serves three roles: paying trading fees (a fee paid in DEEP is set 20% lower than the equivalent input-token fee), staking for taker/maker incentives, and governance.

Governance is per-pool: DEEP staked into a specific pool grants the staker the right, each epoch, to propose and vote on that pool's taker fee, maker fee, and required-stake parameters under a quasi-concave voting curve, with approved proposals taking effect at the start of the next epoch. This per-pool governance is scoped to economic parameters only — it does not control DeepBook V3 contract upgrades, the stablecoin whitelist, the treasury address, or app authorization, which remain with the off-contract `DeepbookAdminCap`. None of the published governance machinery addresses cryptographic primitives or post-quantum migration.

Product and protocol details are disclosed through DeepBook's [documentation](https://docs.sui.io/standards/deepbook), the [DeepBook protocol site](https://www.deepbook.tech/), the [DEEP token page](https://www.deepbook.tech/deep-token), and Mysten Labs' Sui blog posts on the [DEEP token launch](https://blog.sui.io/deepbook-version3-deep-token/) and [governance](https://blog.sui.io/deep-token-deepbook-governance/). A post-quantum commitment, if one were made, would be expected to surface in those venues. No dated, on-record post-quantum milestone has been published by the issuer.

---

_Generated on 16 May 2026 based on information as of 15 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
