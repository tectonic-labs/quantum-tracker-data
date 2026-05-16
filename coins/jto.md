# Jito (JTO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Jito |
| **Ticker** | JTO |
| **Asset class** | DeFi Governance |
| **Issuer** | Jito Foundation / Jito DAO |
| **Host chain(s)** | Solana (canonical SPL, single-chain) |
| **Website** | https://www.jito.network/ |
| **Contract address** | `jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL` (SPL mint on Solana) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | ➖ | ➖ | Not Applicable |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

JTO is the governance token of the Jito DAO, issued only on Solana as a standard SPL token. Its post-quantum posture is shaped by two things: what it inherits from Solana, and the elliptic-curve keys that still control its governance and treasury. A token cannot be more quantum-safe than the chain it runs on — Solana's posture is the ceiling here, and Solana's protocol envelope is Ed25519-only with no shipped migration on its peer-to-peer and core transport surfaces. That ceiling alone places JTO's host-chain inheritance at a failing grade.

On the token-issuer side, JTO's supply-controlling authorities on the SPL mint are burned, but the still-active governance levers — the Jito DAO governance program, the Realms voting wallets, and the Jito Foundation's treasury multisig — all sign with the classical Ed25519 curve, and no Jito-attributable proposal discusses migrating any of them to post-quantum cryptography. JTO is a single-chain, unbacked governance token, so it has no cross-chain mechanism, no reserve/custody surface, and no extra token-specific cryptography to rate. No public PQC roadmap or statement from the issuer was found.

## Proposed and Implemented PQC Algorithms

Jito does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

JTO is issued only on Solana, as the SPL token `JTO` (mint `jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL`). There is no canonical bridged representation on any other chain, so the host-chain posture is Solana's posture taken directly — a single host, with no outlier-versus-pervasive distribution to qualify.

A token's transaction signing, consensus, and networking exposure belong to its host chain, not to the token issuer. JTO inherits all of that from Solana, and the token cannot be more quantum-safe than the chain it executes on.

**Current state.** Solana's protocol envelope is Ed25519-only, and its peer-to-peer and core transport surfaces remain quantum-exposed with no shipped migration. See the [Solana PQC readiness report](../chains/l1/solana.md) for the host-chain detail. Because Solana's worst categories are failing, the inherited host-chain aggregate for JTO is also failing.

**Planned future work.** The host-chain migration activity on record is Solana's own wallet-scoped quantum-readiness work; any progress there is tracked on the [Solana report](../chains/l1/solana.md), not on this token. No Jito-attributable host-chain work exists.

## 2. Admin / Privileged Roles

**Grade: F ❌**

JTO's privileged-role posture follows the common large-cap Solana governance-token pattern: the supply-controlling authorities on the SPL mint are burned, while the ecosystem levers sit on separate Ed25519 governance structures.

**Current state.** The JTO mint's **mint authority** is burned — verified on-chain, the mint reports `mintAuthority: null`. The 1,000,000,000 JTO fixed supply (9 decimals) cannot be expanded; the cap is enforced by the null authority. The **freeze authority** is likewise burned (`freezeAuthority: null`), so no party can freeze JTO token accounts. These details are visible on the [JTO SPL mint](https://explorer.solana.com/address/jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL).

The still-active levers are governance and treasury structures. About 24.3% of supply sits in a [Realms DAO controlled by JTO holders](https://www.jito.network/docs/governance/the-jito-governance-token-jto/); the Jito DAO governance program enacts passed Jito Improvement Proposals, with a 250,000 JTO proposal threshold, a 3-day voting period, a 2-day execution delay, and a roughly 3% (30M JTO) yes-vote threshold. Vote authentication is by Solana wallet signature, which uses the classical Ed25519 curve. The [Jito Foundation](https://www.jito.network/docs/governance/constitution-of-the-jito-foundation/) has also allocated part of its treasury to a [4-of-6 multisig](https://www.dlnews.com/articles/defi/solana-defi-app-jito-moves-to-boost-the-value-of-its-jto-token-through-a-subdao/) with a 12-month value-generation mandate; that multisig is a standard Solana (Ed25519) multisig, and the DAO governance program executes via Realms tooling, also Ed25519.

All disclosed signing surfaces are elliptic-curve. The mint/freeze burn eliminates one EC surface — the mint key — but the governance and treasury authorities remain quantum-vulnerable, and no concrete post-quantum proposal currently exists for any of them.

**Planned future work.** No Jito-team or DAO proposal discusses migrating any of these keys to post-quantum primitives.

## 3. Cross-Chain Mechanism

**Grade: ➖**

JTO is a single-chain Solana SPL token. The Jito Foundation issues no canonical bridged representation on any other chain, and there is no issuer-controlled cross-chain mechanism — no xERC20, no native token-transfer bridge, no mint-and-burn across hosts. Third-party bridges could wrap JTO opportunistically, but no such wrap is a canonical issuer-endorsed deployment, so this category does not apply.

## 4. Reserve / Custody

**Grade: ➖**

JTO is an unbacked governance token: there is no fiat peg, no real-world-asset collateral, no off-chain reserve pool, and no custody-to-chain mint-attestation linkage. (JitoSOL, the Jito liquid-staking token backed by staked SOL, is a separate token and is not the subject of this report.) With no off-chain reserve and no custody-to-chain signing infrastructure, there is no surface to rate, so this category does not apply.

## 5. Other Token-Specific Crypto

**Grade: ➖**

JTO has no token-specific cryptographic surface beyond what the host-chain and admin categories already cover. The token contract is a standard SPL token — there is no embedded zero-knowledge verifier, no verifiable random function, no oracle-gated emission (the mint is burned, so there are no ongoing emissions), and no real-world-asset on-chain-mapping attestation. DAO voting and treasury disbursements route through the Realms governance program and the Foundation multisig already discussed above, so this category does not apply.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to *retire* elliptic-curve cryptography on the token's own surfaces — distinct from whether the token is adding post-quantum cryptography alongside it.

**Current state.** No Jito-attributable plan exists to retire elliptic-curve cryptography on the Jito DAO governance program and the Realms-platform DAO controlling 24.3% of supply (Ed25519), on DAO-voting wallet authentication (Solana Ed25519), or on the Jito Foundation 4-of-6 treasury multisig (Ed25519). No Jito Improvement Proposal in the [public Jito governance forum](https://forum.jito.network/) discusses post-quantum cryptography or EC retirement. The mint/freeze burn at launch retired one EC surface — the mint key — but did not establish a retirement path for any of the still-active EC keys.

The only post-quantum-adjacent signal in the broader ecosystem is Solana's own wallet-scoped quantum-readiness work, which is host-chain activity tracked on the [Solana report](../chains/l1/solana.md), not Jito-issuer work.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ➖, Reserve & Custody ➖, Other ➖.

## Issuer & Governance

Jito is a Solana MEV-infrastructure and liquid-staking project: it operates the Jito-Solana validator client, the block-engine / TipRouter MEV-tip infrastructure, and issues JitoSOL, a liquid-staking token. JTO is the governance token of the Jito DAO, distinct from JitoSOL.

The DAO is administered through the Realms platform on Solana. JTO holders submit and vote on [Jito Improvement Proposals (JIPs)](https://www.jito.network/docs/governance/the-jito-governance-token-jto/), with a 250,000 JTO proposal threshold, a 3-day voting window, a 2-day execution delay, and a roughly 3% (30M JTO) yes-vote threshold for passage. The DAO treasury is funded by protocol revenue, and about 24.3% of the 1B JTO supply is held in the Realms DAO under direct token-holder control. The [Jito Foundation](https://www.jito.network/docs/governance/constitution-of-the-jito-foundation/) has stood up a [4-of-6 multisig](https://www.dlnews.com/articles/defi/solana-defi-app-jito-moves-to-boost-the-value-of-its-jto-token-through-a-subdao/) with a 12-month mandate to deploy part of the treasury toward value generation for the DAO.

Where PQC commitments would surface: the [Jito governance forum](https://forum.jito.network/) and the JIP process. As of this report, none of the published governance material addresses cryptographic primitives or post-quantum migration; recent governance activity has been scoped to protocol economics rather than cryptography.

---

_Generated on 16 May 2026 based on information as of 15 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
