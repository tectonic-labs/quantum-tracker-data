# Raydium (RAY) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Raydium |
| **Ticker** | RAY |
| **Asset class** | DeFi Governance |
| **Issuer** | Raydium (core team) |
| **Host chain(s)** | Solana (canonical SPL token; single-chain) |
| **Website** | https://docs.raydium.io/raydium |
| **Contract address** | `4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R` (SPL mint on Solana) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | ➖ | ➖ | Not Applicable |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Raydium is a Solana-native automated market maker (AMM) and decentralized exchange, and RAY is its protocol token — used for single-sided staking and as the target of a buyback program funded by a share of trading fees. The token's quantum-readiness posture is shaped by two things: what Raydium controls directly, and what it inherits from its host chain. A token cannot be more quantum-safe than the chain it runs on, so Solana sets the ceiling here. Solana's networking and certain other protocol surfaces are quantum-exposed today, which caps RAY's inherited posture.

On the surfaces Raydium itself controls, the picture is also unmigrated. The SPL mint authority is held and active — RAY's hard cap is not enforced by a burned mint authority, and emissions from a mining reserve continue. Program upgrade and admin authority sit under an [ed25519 Squads multisig](https://docs.raydium.io/raydium/protocol/security/access-controls) with a 24-hour timelock. All of these are elliptic-curve signing surfaces, and no Raydium-attributable documentation, blog post, or governance discussion addresses post-quantum cryptography. RAY does not currently maintain a public PQC roadmap.

## Proposed and Implemented PQC Algorithms

Raydium does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

RAY is canonically issued on **Solana** as the SPL token `RAY` (mint `4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R`). It is a single-chain token — there is no Raydium-issued canonical representation on any other chain. Because RAY runs entirely on Solana, its transaction signing, consensus, and networking exposure are the host chain's responsibility, not the token's. RAY cannot be more quantum-safe than Solana itself.

**Current state.** Solana's transaction-signature and consensus surfaces use Ed25519, while its peer-to-peer networking (QUIC/TLS 1.3 with Ed25519 gossip identity) and certain other protocol features remain quantum-exposed. The worst-rated of Solana's categories drive the inherited aggregate, which places RAY's Host Chain Aggregate at F. With only one host chain, there is no distribution qualifier — the exposure is the single host's exposure in full. Solana's own posture is tracked in its [public PQC readiness report](../chains/l1/solana.md).

**Planned future work.** Any improvement to RAY's inherited posture would come from Solana's own migration work; the intel record notes a wallet-scoped roadmap on the host chain but no protocol-level transaction PQC shipped. Raydium has no host-chain migration of its own to record, since it does not operate the chain.

## 2. Admin / Privileged Roles

**Grade: F ❌**

**Current state.** Raydium's privileged-role surfaces are all elliptic-curve (Ed25519) signing paths, and none has a disclosed post-quantum posture.

The SPL **mint authority is held and active**. RAY has a hard cap of 555,000,000 tokens, but that cap is not enforced by a burned mint authority. Of the supply, 188.7M RAY (34%) is allocated to a mining reserve, from which roughly 1.9M RAY per year is still emitted — the bulk funding single-sided RAY staking rewards, on a halvening schedule. Because emissions continue, a mint-side signing authority remains live. The SPL **freeze authority** is part of the same token-account control surface, with no disclosed PQC posture.

All Raydium program **Upgrade and Admin Authority** sits under a [Squads multisig](https://docs.raydium.io/raydium/protocol/security/access-controls), the Solana Ed25519 multisig program. In a 2025 hardening pass, Raydium moved program admin authority to Squads V4 and added a 24-hour timelock, alongside operational measures: air-gapped signing machines, TOTP, physical security keys, and local simulation of upgrades. The legacy multisig was retained for treasury security. Squads is one of the multisig systems [widely used by Solana protocols for program-upgrade management](https://squads.xyz/blog/solana-multisig-program-upgrades-management). The timelock and air-gap/TOTP/hardware-key measures are operational hardening — they strengthen resilience but do not change the underlying signature scheme, which remains Ed25519.

RAY tokenomics, including the hard cap and mining reserve, are documented in [Raydium's RAY token page](https://docs.raydium.io/raydium/protocol/the-ray-token), with reserve and emissions detail also reflected in [third-party tokenomics data](https://tokenomist.ai/raydium). The SPL mint is viewable on [Solscan](https://solscan.io/token/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R).

**Planned future work.** No Raydium-team statement, audit, or proposal discusses migrating the mint authority, freeze authority, or the Squads program/admin/treasury multisigs to post-quantum signing. No concrete post-quantum proposal currently exists for these surfaces.

## 3. Cross-Chain Mechanism

**Grade: ➖**

RAY is a single-chain SPL token. There is no Raydium-issued canonical representation on another chain, no native cross-chain token deployment, and no issuer-operated bridge — Raydium itself is a Solana-native AMM/DEX. Third parties may have produced wrapped RAY representations, but none is canonical or Raydium-controlled. With no cross-chain mechanism attributable to the issuer, this category does not apply.

## 4. Reserve / Custody

**Grade: ➖**

RAY is an unbacked protocol/governance token. There is no fiat peg, no real-world-asset collateral, no off-chain reserve pool, and no custody-to-chain mint-attestation linkage. Mining-reserve emissions and buyback flows are on-chain mechanisms controlled by the keys covered under the Admin / Privileged Roles section; there is no separate off-chain custody-to-chain signing infrastructure. With no custody-to-chain surface to rate, this category does not apply.

## 5. Other Token-Specific Crypto

**Grade: ➖**

RAY has no token-specific cryptographic surface beyond the privileged-role keys already covered. The token contract is a standard SPL token, with no embedded ZK verifier, no verifiable random function, no oracle-gated mint, and no real-world-asset on-chain-mapping attestation. The buyback mechanism (12% of trading fees used to buy back RAY) and staking-reward distribution route through Raydium programs whose authority is already rated under the Admin / Privileged Roles section. With nothing additional to rate, this category does not apply.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to retire elliptic-curve cryptography on the token's own surfaces — distinct from whether the token is adopting post-quantum cryptography.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ➖, Reserve & Custody ➖, Other ➖.

**Current state.** There is no Raydium-attributable plan to retire elliptic-curve cryptography on any of its signing surfaces: the SPL mint authority (Ed25519) controlling mining-reserve emissions, the SPL freeze authority, the Squads V4 program upgrade / admin multisig (Ed25519), the legacy treasury multisig (Ed25519), or holder-signaling wallet authentication (Solana Ed25519). The 2025 move to Squads V4 with a 24-hour timelock and air-gap/TOTP/hardware-key hardening improved operational resilience but did not change the cryptographic primitive — the same Ed25519 verification path remains. No Raydium [documentation](https://docs.raydium.io/raydium) or [security/access-control](https://docs.raydium.io/raydium/protocol/security/access-controls) material in the public record addresses EC retirement.

**Planned future work.** No Raydium documentation, blog post, or governance discussion currently addresses EC retirement, and no concrete plan exists in the public record.

## Issuer & Governance

Raydium is a Solana-native automated market maker (AMM) and DEX, with associated products including a permissionless pool launcher (LaunchLab) and concentrated liquidity pools. RAY is the protocol token, used for single-sided staking — rewarded from the mining reserve and a portion of trading fees — and as the target of a buyback program funded by 12% of protocol trading fees.

Raydium operates as a team-run protocol rather than an on-chain token-holder DAO: program upgrades and admin actions are gated by a Squads multisig with a 24-hour timelock, as described in [Raydium's access-controls documentation](https://docs.raydium.io/raydium/protocol/security/access-controls). There is no on-chain governance forum or proposal track through which a PQC commitment would currently surface. None of the published protocol or security documentation addresses cryptographic primitives or post-quantum migration. Readers tracking future commitments should watch [Raydium's documentation](https://docs.raydium.io/raydium) and security pages.

---

_Generated on 16 May 2026 based on information as of 15 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
