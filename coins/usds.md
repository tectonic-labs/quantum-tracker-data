# USDS (USDS) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | USDS |
| **Ticker** | USDS |
| **Asset class** | Stablecoin |
| **Issuer** | Sky Protocol (the rebrand of MakerDAO) |
| **Host chain(s)** | Ethereum, Arbitrum, Base, Solana |
| **Website** | https://sky.money/ |
| **Contract address** | `0xdc035d45d973e3ec169d2276ddab16f1e407384f` (USDS on Ethereum) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

USDS is a stablecoin issued by Sky Protocol, the rebranded successor to MakerDAO. A token can never be more quantum-safe than the chains it runs on — the host chain is the ceiling, and the issuer's own surfaces (admin keys, bridges, custody) are the floor. USDS is canonically issued on Ethereum and Solana, with bridged representations on Arbitrum and Base, so it inherits the transaction-signing, consensus, and networking exposure of those chains. On the token-issuer side, Sky governs USDS through upgradeable proxy contracts, executive spell contracts, and a set of operational multisigs, all of which sign with elliptic-curve keys today. Cross-chain movement runs through SkyLink, which since 2025-2026 is built on LayerZero V2 OFT, with bridge attestations produced by elliptic-curve-signing verifiers.

Across every surface the issuer controls, no public post-quantum migration work has surfaced. There is no Sky governance proposal, blog post, or forum thread describing a plan to move admin keys, bridge attestors, or custody signing to post-quantum cryptography, and no published Sky PQC roadmap. As a result the issuer-attributable categories — Admin / Privileged Roles, Cross-Chain Mechanism, and EC Sunset — are all rated F, and the inherited Host Chain Aggregate is also F because at least one host chain is quantum-exposed in a core category.

## Proposed and Implemented PQC Algorithms

USDS does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

USDS is canonically deployed on Ethereum and Solana as native issuances, with bridged representations on Arbitrum and Base via Sky's LayerZero OFT deployments. The token's transaction signing, consensus participation, and peer-to-peer networking exposure are properties of those host chains, not of the USDS contract or its issuer. The token cannot be more quantum-safe than the chains it executes on — host-chain inheritance sets the ceiling for the entire report.

**Current state.** Of the four host chains, Ethereum and Solana have full public evaluations. Ethereum's worst-rated category is its peer-to-peer networking layer, which is quantum-exposed; see the [Ethereum report](../chains/l1/ethereum.md). Solana's worst-rated categories are its peer-to-peer networking and other chain-specific cryptography, both quantum-exposed; see the [Solana report](../chains/l1/solana.md). Arbitrum and Base do not yet have stand-alone public evaluations; they inherit Ethereum's settlement-layer signing posture for the canonical bridge, plus their own sequencer and data-availability cryptography. Both of the two evaluated host chains carry a worst-case exposed rating, so the aggregate is exposed across the full set of evaluated hosts — this is pervasive, not an isolated outlier. Adding Arbitrum and Base to the count does not raise the floor.

**Planned future work.** Any improvement here depends on the host chains' own post-quantum migrations. Those efforts are tracked on the individual chain reports linked above and are not work the USDS issuer controls.

## 2. Admin / Privileged Roles

**Grade: F ❌**

USDS is an upgradeable ERC-20 governed by Sky Protocol. Several privileged surfaces sit behind elliptic-curve keys: the mint authority that issues USDS when the Peg Stability Module accepts USDC at 1:1 and when collateral vaults are opened; the upgrade proxies for USDS (`0xdc035d45d973e3ec169d2276ddab16f1e407384f`) and sUSDS (`0xa3931d71877c0e7a3148cb7eb4463524fec27fbd`), which are upgradeable through Sky governance spells; the Governance Security Module pause delay (30 hours as of recent governance updates) that gates executive spells; and a set of operational multisigs — the Core Council Buffer Multisig, allocator-operator multisigs, and L2 bridge admin and freeze multisigs — implemented as Gnosis Safe contracts on Ethereum and equivalent constructs on Solana.

**Current state.** All of these surfaces use elliptic-curve signing today — secp256k1 ECDSA for the Ethereum-side externally owned accounts and Gnosis Safe signers, and ed25519 on the Solana side. Sky's upgradeability profile is documented publicly ([DeFiScan](https://www.defiscan.info/protocols/sky/ethereum)), and the Gnosis Safe signing pattern is described in the project's own [multisig signing guide](https://endgame.makerdao.com/endgame/multisig-signing-guide). No Sky governance proposal, blog post, or forum thread has been found that discusses migrating any of these keys to post-quantum primitives, and no concrete post-quantum proposal currently exists for the admin surface. The [Sky forum](https://forum.skyeco.com/) and [governance portal](https://vote.makerdao.com/) show no post-quantum-tagged threads or executive votes.

## 3. Cross-Chain Mechanism

**Grade: F ❌**

USDS is natively issued on Ethereum and Solana, and movement between supported chains goes through SkyLink, Sky's official cross-chain stack. SkyLink was originally built on Wormhole's Native Token Transfer; in 2025-2026 Sky governance migrated it to LayerZero V2 OFT (Omnichain Fungible Token).

**Current state.** The architecture uses `USDS_OFT` and `SUSDS_OFT` adapter contracts on the Ethereum side and `SkyOFTAdapterMintBurn` contracts on each destination chain ([Sky bridge documentation](https://developers.skyeco.com/guides/skylink/usds-ethereum-solana-bridge/)). Message verification runs through LayerZero's ULN with required Decentralized Verifier Networks; for the USDS and sUSDS token routes the documented configuration is two-of-two required verifiers (LayerZero Labs and Nethermind), while the governance route uses a four-of-seven optional verifier set ([SkyLink to Plasma technical scope](https://forum.skyeco.com/t/technical-scope-of-the-new-skylink-bridge-to-plasma/27850), [SkyLink Avalanche deployment](https://forum.skyeco.com/t/skylink-bridge-to-avalanche/27825)). Those verifier attestations are produced with elliptic-curve signatures under LayerZero's standard verifier model. LayerZero serves a very wide chain footprint that includes quantum-exposed chains, so a token relying on it inherits that exposure regardless of which subset of chains USDS itself reaches. Sky governance has shown no post-quantum work on either the OApp adapter contracts or the verifier attestation scheme, and no concrete post-quantum proposal currently exists for the cross-chain mechanism.

## 4. Reserve / Custody

**Grade: ➖**

USDS is collateralized through a hybrid model: on-chain collateral (USDC held in the Peg Stability Module, plus ETH, wstETH, and other approved tokens in collateral vaults) and off-chain real-world-asset reserves, where the Sky Allocator system routes a portion of Peg Stability Module USDC into tokenized US Treasury bills and curated real-world-asset vaults run by professional asset managers ([USDS yield and reserve composition](https://eco.com/support/en/articles/11752998-usds-sky-protocol-2026-yield-guide), [sUSDS reserve sources](https://eco.com/support/en/articles/14798655-susds-explained-sky-s-savings-rate-token)).

This category rates the cryptography that pushes reserve-balance changes onto the chain. For the on-chain collateral, that posture is already captured by the Admin / Privileged Roles category and by the host chain's inheritance. For the off-chain real-world-asset leg, no Sky-published description of the custody-to-chain signing infrastructure — the signing scheme, key custody, or mint-attestation format used by allocator operators to post receipts on-chain — could be found. Absent a disclosed cryptographic linkage between off-chain custody and the on-chain contract, there is no distinct custody-to-chain surface to rate, so this category does not apply.

## 5. Other Token-Specific Crypto

**Grade: ➖**

USDS has no token-specific cryptographic surface beyond what the categories above already cover — no embedded zero-knowledge verifier, no token-internal verifiable randomness, no oracle-gated rebase, and no real-world-asset on-chain-mapping attestation inside the USDS contract itself. Real-world-asset exposure runs through the Allocator system, which sits behind the admin keys already rated. With no extra token-specific cryptography, this category does not apply.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to *retire* elliptic-curve cryptography on the token's own surfaces — admin keys, bridge attestors, and custody-to-chain signing — which is distinct from rating whether the token is *adopting* post-quantum cryptography.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ➖.

**Current state.** No Sky-attributable plan to retire elliptic-curve cryptography could be found for the governance executive and proxy-admin contracts, the operational multisigs (Core Council Buffer, allocator-operator, and L2 freeze multisigs), the SkyLink verifier attestor set, or the allocator operator signing for the real-world-asset leg. Nothing in the [Sky forum](https://forum.skyeco.com/) or in [Sky governance executive proposals](https://vote.makerdao.com/) surfaced a commitment to remove elliptic-curve keys from any of these surfaces.

## Issuer & Governance

USDS is issued by Sky Protocol, a decentralized governance organization and the rebranded successor to MakerDAO. Governance is run by SKY token holders; SKY replaced MKR as the governance asset during the Endgame transition, which completed in 2025. Voting is conducted through the governance portal at vote.makerdao.com (a legacy URL still in use) via voting-proxy contracts, with cold-wallet voting supported through a Gnosis Safe linked to a hot wallet. Executive spells — the on-chain artifacts that modify protocol parameters and admin authority — are gated by the Governance Security Module pause delay, which stands at 30 hours as of the latest pause-delay-increase spell.

Product and protocol decisions are disclosed through Sky's governance forum and the executive-vote portal. Any post-quantum commitment for USDS would surface as a Maker Improvement Proposal, a forum proposal, or an executive vote. No post-quantum-related executive vote, Maker Improvement Proposal, or forum proposal was located. The Sky forum does carry a recurring track for verifier-operator SOC 2 reports and infrastructure attestations, which is operational hardening of the cross-chain stack rather than post-quantum migration.

---

_Generated on 16 May 2026 based on information as of 13 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
