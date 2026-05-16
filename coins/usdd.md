# USDD (USDD) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | USDD |
| **Ticker** | USDD |
| **Asset class** | Stablecoin |
| **Issuer** | TRON DAO Reserve |
| **Host chain(s)** | TRON, Ethereum, BNB Chain |
| **Website** | https://usdd.io |
| **Contract address** | `TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t` (canonical TRC-20 on TRON); `0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6` (ERC-20 on Ethereum) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

USDD is a stablecoin canonically issued on TRON by the TRON DAO Reserve and bridged to Ethereum and BNB Chain. Its post-quantum posture is shaped by two things: what the issuer controls, and what it inherits from its host chains. A token cannot be more quantum-safe than the chain it runs on — host-chain inheritance sets the ceiling, and the issuer's own surfaces (admin keys, the cross-chain bridge) set the floor. For USDD both sit at the bottom of the scale today.

On the issuer side, the mint, burn, pause, and upgrade authority for USDD on every host chain is controlled by admin keys and a TRON DAO Reserve multi-sig committee, all using elliptic-curve ECDSA `secp256k1`. The canonical cross-chain route runs through the BitTorrent Chain (BTTC) bridge, whose validators also sign with ECDSA. No post-quantum migration has been disclosed for any of these surfaces. Reserve/custody and other token-specific cryptography are not separately rated, because USDD discloses no custody-to-chain signing flow distinct from its admin keys and embeds no token-internal cryptographic extras. We located no public PQC roadmap or statement from the issuer.

## Proposed and Implemented PQC Algorithms

USDD does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

USDD is canonically issued on [TRON](../chains/l1/tron.md) and bridged to [Ethereum](../chains/l1/ethereum.md) and [BNB Chain](../chains/l1/bnb-chain.md). The token's transaction signing, consensus participation, and peer-to-peer networking exposure are properties of these host chains, not of the token issuer — and a token cannot be more quantum-safe than the chain it executes on. The host-chain layer is therefore the ceiling on USDD's overall posture.

**Current state.** All three host chains have public PQC readiness reports. Each one currently has at least one quantum-exposed surface among the core categories: TRON is broadly exposed across transaction signing, consensus, peer-to-peer networking, and on-chain verification; BNB Chain and Ethereum carry exposed surfaces of their own, including peer-to-peer networking. Because the inherited rating is the worst stoplight across the hosts, and every one of the three evaluated chains contributes an exposed surface, the aggregate sits at the floor. The intel records this as a "(3/3)" distribution — exposure here is pervasive across all hosts, not an outlier on a single chain.

**Planned future work.** Any host-chain migration work belongs to the individual chains; see the linked TRON, Ethereum, and BNB Chain reports for their respective roadmaps and status.

Sources:
- [USDD multi-chain footprint](https://www.coingecko.com/en/coins/usdd) — TRON, Ethereum, BNB Chain deployment.
- [TRON DAO Reserve USDD landing page](https://usdd.io) — deployment topology.

## 2. Admin / Privileged Roles

**Grade: F ❌**

USDD is operated by the TRON DAO Reserve, an off-chain consortium that controls the mint and burn authority for USDD on each host chain.

**Current state.** The USDD contracts on TRON, Ethereum, and BNB Chain are admin-controlled. Mint authority, plus the standard burn, pause, and blacklist controller functions, sits behind admin keys controlled by the TRON DAO Reserve. The contract suite is upgradeable under reserve governance — the USDD 1.0 to 2.0 transition in 2024–2025 introduced new contract addresses and a new collateral-backed peg on each chain. The TRON DAO Reserve operates a multi-sig committee that signs reserve operations; the founding member set has changed since launch, implying signer rotations, but no post-quantum-related change has been disclosed. All of these privileged surfaces use elliptic-curve ECDSA `secp256k1` — the curve shared by TRON and the EVM host chains for externally owned accounts. No public information from the issuer describes a post-quantum primitive for any privileged role, and no migration is in flight or on a published roadmap.

**Planned future work.** No concrete post-quantum proposal or roadmap currently exists for USDD's admin or privileged-role keys.

## 3. Cross-Chain Mechanism

**Grade: F ❌**

USDD is canonically issued on TRON; movement to Ethereum and BNB Chain is documented to route through the BitTorrent Chain (BTTC) bridge.

**Current state.** BTTC is a proof-of-stake sidechain whose cross-chain validator set signs deposit and withdrawal attestations. USDD locked on TRON's BTTC gateway mints a representation on BTTC, which then re-mints onto Ethereum or BNB Chain through the respective bridge lanes. The validator set is a small permissioned-staking group, and it signs with elliptic-curve ECDSA `secp256k1` keys on each lane; bridge security relies on an honest majority of those validators. Because USDD inherits the worst rating across the chains the bridge connects, and all three of those chains are exposed on the host side, the cross-chain mechanism sits at the floor. BTTC has not announced a post-quantum migration, and no issuer-attributable post-quantum work has been disclosed for the cross-chain path. Some third-party aggregators list USDD on additional chains via secondary wrapped-asset bridges; those are not the canonical issuer route, which runs through BTTC.

**Planned future work.** No concrete post-quantum proposal or roadmap currently exists for the BTTC bridge or USDD's cross-chain path.

Sources:
- [TRON DAO Reserve USDD landing page](https://usdd.io)
- [BitTorrent Chain overview](https://bt.io) — validator set, bridge architecture.
- [BTTC developer documentation](https://docs.bt.io) — gateway contracts, signature scheme.

## 4. Reserve / Custody

**Grade: ➖**

The TRON DAO Reserve publishes a reserve composition page showing collateral against the USDD float — currently described as a mix of BTC, USDT, USDC, TRX, and JustLend pool tokens following the move from the earlier algorithmic model to a claimed over-collateralized one. However, the cryptography that pushes reserve-balance changes onto the chain collapses to the same multi-sig keys that sign mint and burn transactions, already covered under Admin / Privileged Roles. USDD discloses no custody-to-chain attestation flow distinct from those admin keys — no hardware-security-module vendor disclosure, no multi-party-computation participant roster, and no separate mint-attestation message format. With no disclosed cryptographic linkage between off-chain custody and the on-chain contract beyond the admin keys, there is no separate custody-to-chain surface to rate, so this category does not apply.

Sources:
- [TRON DAO Reserve site](https://tdr.org) — reserve composition page.
- [USDD landing page](https://usdd.io) — collateral disclosure, 2.0 mechanism.
- [JustLend pool documentation](https://justlend.org) — collateral pool tokens used in USDD backing.

## 5. Other Token-Specific Crypto

**Grade: ➖**

Beyond a standard TRC-20 / ERC-20 / BEP-20 token, USDD's distinguishing features — the 2.0 re-pegging mechanism, JustLend collateral pools, and reserve governance — are operational rather than cryptographic. The re-pegging logic is implemented as on-chain admin-callable functions and as on-chain DeFi positions in JustLend pools, both already covered by the host-chain and admin categories. USDD embeds no additional zero-knowledge verifier, no token-internal verifiable random function, and no oracle-gated rebase distinct from the admin path. With no token-specific cryptographic extras beyond what the earlier categories already cover, this category does not apply.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to retire elliptic-curve cryptography on the token's own surfaces, which is distinct from whether the token is adopting post-quantum cryptography.

We have found no public information indicating migration activity for USDD in this category. No issuer-attributable plan exists to retire elliptic-curve cryptography on USDD's admin and mint-authority keys across TRON, Ethereum, or BNB Chain, on the TRON DAO Reserve multi-sig signer rosters, on the BTTC validator set and bridge attestation keys, or on off-chain custody signing for reserve management. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ➖.

Sources:
- [TRON DAO forum](https://forum.trondao.org)
- [TIP repository](https://github.com/tronprotocol/tips)

## Issuer & Governance

USDD is governed by the TRON DAO Reserve, which is structurally a committee of founding members together with the TRON DAO and associated entities. The founding-member list at launch in May 2022 has since been affected by external events, and the current operational signer composition is not separately published in a form that allows independent verification.

The USDD 1.0 to 2.0 transition in 2024–2025 was executed via reserve governance and introduced the claimed over-collateralization model. Governance for the underlying USDD contracts and the JustLend collateral pools is off-chain — committee decisions — with on-chain execution by the privileged multi-sig.

Where post-quantum commitments would surface: the TRON DAO Reserve site and the USDD landing page for product and reserve disclosures, the [TRON DAO forum](https://forum.trondao.org) for governance discussion, and the [TIP repository](https://github.com/tronprotocol/tips) for protocol improvement proposals. As of this report, there are no public PQC-relevant governance proposals from the TRON DAO Reserve or associated entities for USDD, and no TIPs addressing post-quantum cryptography have been filed.

---

_Generated on 16 May 2026 based on information as of 13 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
