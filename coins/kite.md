# KITE (KITE) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | KITE |
| **Ticker** | KITE |
| **Asset class** | DeFi Governance |
| **Issuer** | GoKite AI / Kite Foundation |
| **Host chain(s)** | Avalanche C-Chain, BNB Smart Chain, Ethereum (bridged ERC-20 / BEP-20); KITE is also the native gas token of Kite Chain |
| **Website** | https://gokite.ai/ |
| **Contract address** | `0x904567252D8F48555b7447c67dCA23F0372E16be` (same address on Ethereum, BNB Chain, and Avalanche C-Chain) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

KITE is the utility and governance token of the Kite AI ecosystem. It is canonically the native gas token of Kite Chain — a dedicated EVM-compatible Proof-of-Stake Layer-1 in the Avalanche ecosystem — and is also bridged as an ERC-20 / BEP-20 onto Ethereum, BNB Smart Chain, and the Avalanche C-Chain. On the surfaces the token issuer directly controls, all cryptography is classical elliptic-curve: the token contract's owner key, the protocol-level ProxyAdmin key, and the LayerZero bridge attestor sets are all secp256k1 ECDSA, and no post-quantum migration work has been disclosed by GoKite AI or the Kite Foundation.

A token cannot be more quantum-safe than the chains it executes on — host-chain inheritance is the ceiling. KITE runs on three EVM hosts, the worst of which (Avalanche) carries no shipped post-quantum protections across its core categories, so the inherited host floor is the lowest grade. On top of that ceiling, the issuer-controlled surfaces — admin keys and the cross-chain bridge — also have no post-quantum proposal on the public record. We found no public PQC roadmap or statement from the issuer.

## Proposed and Implemented PQC Algorithms

KITE does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

This category is inherited: it reflects the weakest post-quantum posture among the chains KITE runs on, not anything the token issuer itself does. KITE's transaction signing, consensus, and networking exposure all belong to its host chains — they are not properties of the token contract.

KITE's bridged ERC-20 / BEP-20 is deployed on three EVM hosts:

- **Avalanche** — no shipped post-quantum protections across its core cryptographic categories.
- **[BNB Chain](../chains/l1/bnb-chain.md)** — post-quantum work in flight or on its roadmap for transaction signatures, consensus, and on-chain verification, with weaker coverage on networking and elliptic-curve retirement.
- **[Ethereum](../chains/l1/ethereum.md)** — post-quantum milestones on its roadmap for transaction signatures and on-chain verification, with consensus work in devnets and networking still exposed.

All three evaluated hosts hit the worst rating in at least one core category, so the aggregate floor is F. Of the three, only Avalanche is wholesale exposed across every core category; the other two have credible post-quantum work either in development or roadmapped in several categories. That distribution — one of three hosts wholesale exposed, the other two exposed only in subsets — is what the F here captures: the floor is set by Avalanche, while BNB Chain and Ethereum are further along.

A token cannot be more quantum-safe than the chain it executes on. Until KITE's worst host chain ships post-quantum protections, the token inherits that ceiling regardless of any issuer-side work.

**Current state.** The inherited floor is set by Avalanche, which has no shipped post-quantum cryptography across its core categories. Avalanche is also the host ecosystem for Kite Chain, the dedicated L1 where KITE is the native gas token.

**Planned future work.** BNB Chain and Ethereum both have post-quantum migration work recorded — in development or on a published roadmap — across transaction signatures, consensus, and on-chain verification. Avalanche has no comparable migration recorded.

Sources:
- [KITE host-platform listing (CoinGecko)](https://www.coingecko.com/en/coins/kite-ai)
- [Kite Chain contract list](https://docs.gokite.ai/kite-chain/3-developing/smart-contracts-list)
- [Kite whitepaper](https://gokite.ai/kite-whitepaper)

## 2. Admin / Privileged Roles

**Grade: F ❌**

The KITE token on Ethereum, BNB Chain, and Avalanche C-Chain is deployed at the same address (`0x904567252D8F48555b7447c67dCA23F0372E16be`) and is a verified, **non-upgradeable** ERC-20 with `Ownable` and `Pausable` extensions. The owner role is a secp256k1 externally-owned account (`0x725e318e181d7e1bb26c0d77ddc58ff6ba463fd8`) holding `transferOwnership`, `renounceOwnership`, `pause`, and `unpause`. The token contract exposes no `mint` function — supply was minted once at deploy (max ~10B KITE) and distributed via cross-chain bridging and the Kite Chain emissions schedule. Because the token contract is non-upgradeable, there is no ProxyAdmin role on the KITE ERC-20 itself.

Above the token, the Kite Chain protocol contracts (KiteStakingManager, RewardVault, FixedAPRRewardCalculator, StakingVault) use upgradeable proxy patterns whose upgrade authority is a ProxyAdmin at `0x3FA7667FD726F73ef42c66f8715E0C6d37D44905`. The published documentation states that only the ProxyAdmin owner can trigger implementation upgrades, but does not specify whether that authority is a single account, a multisig, or a governance timelock. The underlying signature scheme on Kite Chain — an Avalanche-ecosystem EVM L1 — is secp256k1 ECDSA regardless.

**Current state.** Every privileged key on the token and the surrounding protocol contracts is classical secp256k1 ECDSA.

No GoKite AI or Kite Foundation proposal, blog post, or technical document discusses migrating the owner key, the ProxyAdmin key, or any other admin surface to post-quantum primitives. No concrete post-quantum proposal currently exists for this category.

Sources:
- [KITE ERC-20 verified source (Etherscan)](https://etherscan.io/token/0x904567252D8F48555b7447c67dCA23F0372E16be)
- [KITE BEP-20 (BscScan)](https://bscscan.com/token/0x904567252d8f48555b7447c67dca23f0372e16be)
- [KITE on Avalanche C-Chain (Snowscan)](https://snowscan.xyz/token/0x904567252d8f48555b7447c67dca23f0372e16be)
- [Kite Chain contract list — ProxyAdmin authority](https://docs.gokite.ai/kite-chain/3-developing/smart-contracts-list)
- [Kite tokenomics](https://docs.gokite.ai/get-started-why-kite/tokenomics)

## 3. Cross-Chain Mechanism

**Grade: F ❌**

KITE is configured as a LayerZero OFT (Omnichain Fungible Token) across its three EVM hosts plus Kite Chain itself. The Etherscan-verified bytecode shows `lzReceive`, `quoteSend`, and `send` entry points consistent with LayerZero V2 OFT, references to the LayerZero EndpointV2 contract, and `OFTSent` / `OFTReceived` events on cross-chain transfers with shared-decimals normalization between hosts. No Wormhole, Axelar, or Multichain integration is present in the token bytecode.

LayerZero's verification and execution framework rests on ECDSA-attested cross-chain messages, with security parameters configured per application. A LayerZero-bridged token inherits the weakest coverage across LayerZero's full multi-chain footprint, which spans well over 100 chains and includes several with no shipped post-quantum protections. KITE's cross-chain rating therefore reflects that broad inheritance regardless of which subset of chains it is bridged to today.

Kite Chain also operates a separate "Lucid Bridge" for stablecoins (USDC, WETH, USDT) between Kite Chain and other ecosystems. That bridge is documented as carrying other assets onto Kite Chain, not KITE itself — the KITE cross-chain path is the LayerZero OFT.

**Current state.** KITE moves between chains via the LayerZero OFT burn-and-mint mechanic, attested with classical ECDSA. The KITE-specific verifier set has not been published.

No post-quantum commitments are surfaced for the LayerZero path or for the Lucid Bridge. No concrete post-quantum proposal currently exists for this category.

Sources:
- [KITE bytecode — OFT entry points and EndpointV2 reference (Etherscan)](https://etherscan.io/token/0x904567252D8F48555b7447c67dCA23F0372E16be#code)
- [Kite Chain contract list — LayerZero EndpointV2 and Lucid Bridge](https://docs.gokite.ai/kite-chain/3-developing/smart-contracts-list)
- [Kite x LayerZero integration narrative](https://medium.com/@KiteAI/kite-ai-ecosystem-maps-the-bridge-between-web2-scale-and-web3-infrastructure-4fe63f10c72c)

## 4. Reserve / Custody

**Grade: ➖**

KITE is an unbacked utility and governance token. There is no off-chain reserve, no custodian, and no off-chain-to-on-chain mint-attestation pipeline. Token supply is fixed at deploy on each cross-chain endpoint and balanced between chains via the bridge burn-and-mint mechanic. Because there is no custody-to-chain surface, this category does not apply.

## 5. Other Token-Specific Crypto

**Grade: ➖**

The KITE ERC-20 / BEP-20 contracts have no token-specific cryptographic surface beyond the LayerZero OFT integration (covered under Cross-Chain Mechanism) and the standard ERC-20 plus `Ownable`, `Pausable`, and ERC-2612 permit pattern, which rely on host-chain ECDSA rated on the chain side. The Kite-specific application cryptography — Proof-of-Attributed-Intelligence consensus, Agent Passport identity, and the x402 agentic-payment plumbing — lives on Kite Chain itself and would be rated under that L1's evaluation, not on the bridged token surface. There is no extra token-specific cryptography to rate here, so this category does not apply.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to *retire* elliptic-curve cryptography on the token's own surfaces — distinct from whether the token is adopting post-quantum cryptography. No GoKite AI or Kite Foundation plan to retire elliptic-curve cryptography was located for any of the following:

- The KITE ERC-20 owner key (a secp256k1 account holding `pause` and `transferOwnership`).
- Kite Chain's ProxyAdmin key for KiteStakingManager and related proxies.
- The KITE token-holder governance signing surface.
- The LayerZero verifier and executor attestor sets that carry KITE between hosts.

No such commitment appears in the Kite whitepaper, the MiCA whitepaper, the tokenomics documentation, or the issuer's Medium and X posts.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ➖.

Sources:
- [Kite whitepaper](https://gokite.ai/kite-whitepaper)
- [Kite MiCA whitepaper](https://gokite.ai/mica-whitepaper)
- [Kite documentation portal](https://docs.gokite.ai/)

## Issuer & Governance

KITE is issued by GoKite AI / the Kite Foundation, which builds and operates Kite Chain. Product documentation, an English-language whitepaper, a MiCA-format whitepaper, and a tokenomics page are published through the issuer's site and the documentation portal at `docs.gokite.ai`.

KITE token holders are described in the tokenomics documentation as voting on protocol upgrades, incentive structures, and module performance requirements, with governance participation tied to staking by validators, delegators, and module operators. A formal on-chain Governor and Timelock stack has not been published in the located materials; current admin authority over the Kite Chain protocol contracts rests with the ProxyAdmin owner at `0x3FA7667FD726F73ef42c66f8715E0C6d37D44905`, whose signer composition is not disclosed in the public documentation.

Anyone tracking KITE's post-quantum posture should watch the issuer's whitepapers, tokenomics page, and documentation portal — that is where a product or PQC commitment would surface. As of this report, no post-quantum-tagged proposal, RFC, or research post has been published.

---

_Generated on 16 May 2026 based on information as of 13 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
