# Horizen (ZEN) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Horizen |
| **Ticker** | ZEN |
| **Asset class** | Utility |
| **Issuer** | Horizen Foundation / Horizen Labs |
| **Host chain(s)** | Base (canonical ERC-20 since 23 July 2025) |
| **Website** | https://www.horizen.io |
| **GitHub** | https://github.com/HorizenOfficial |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | ➖ | ➖ | Not Applicable |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Horizen's ZEN is, as of 23 July 2025, an ERC-20 token on [Base](../chains/l2/base.md). The original Horizen mainchain (a proof-of-work, Bitcoin-derived UTXO chain) and the EON EVM sidechain were both discontinued at block 1,807,300, and all ZEN balances were migrated onto a single ERC-20 contract on Base. As a result, ZEN no longer has its own consensus or peer-to-peer layer — those concerns now belong entirely to Base and, beneath it, Ethereum. A token cannot be more quantum-safe than the chain it runs on, and that host-chain inheritance is the ceiling on ZEN's posture: its transaction signing, consensus, and networking exposure are all Base's.

On the surfaces the issuer itself controls — the token's admin and authorization functions — ZEN today rides Base's elliptic-curve signature stack (secp256k1 ECDSA, plus ERC-4337 smart-contract-wallet flows), and no Horizen-attributable post-quantum work has been disclosed for the token or its admin keys. There is no current cross-chain bridge, no off-chain reserve, and no extra token-specific cryptography embedded in the ERC-20 contract, so those three categories do not apply. Horizen Labs markets a quantum threat-assessment advisory service to enterprises, but that is a consulting product and has not been applied to ZEN itself in any disclosed migration milestone.

## Proposed and Implemented PQC Algorithms

Horizen (ZEN) does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

As of 23 July 2025 at block 1,807,300, the original Horizen mainchain and the EON EVM sidechain were both discontinued, and all ZEN balances were migrated to an ERC-20 contract on [Base](../chains/l2/base.md), Coinbase's OP Stack L2. ZEN's transaction signing, consensus, and networking exposure are therefore the host chain's, not the token's — the token cannot be more quantum-safe than the chain it executes on.

ZEN is deployed on a single evaluated host, so there is no spread of exposure across multiple chains to weigh; the rating is simply Base's worst stoplight across the host-chain categories, which is ❌. The reader who wants the detail behind that rating — Base's transaction-signature, consensus, and networking posture, and any migration Base has on record — should consult the [Base report](../chains/l2/base.md).

**Current state.** ZEN inherits Base's elliptic-curve security model. Base's worst host-chain category is rated ❌.

**Planned future work.** Any host-chain migration is Base's to make and is tracked on the [Base report](../chains/l2/base.md); no host-chain post-quantum migration is recorded that would lift this rating today.

Evidence:
- [Horizen migration overview](https://horizen-2-docs.horizen.io/migration/overview/) — old chains discontinued, transfers managed on Base.
- [ZEN becomes an ERC-20 on Base](https://www.theblock.co/post/364064/horizen-zen-base-appchain) — migration coverage.

## 2. Admin / Privileged Roles

**Grade: F ❌**

ZEN is now an ERC-20 token on Base, with balances migrated from the halted mainchain under Horizen Labs / Horizen Foundation control. Token authorization rides Base's EVM signature stack — secp256k1 ECDSA, plus ERC-4337 smart-contract-wallet flows — and any contract-admin or upgrade functions are elliptic-curve-controlled by the issuer. No Horizen-attributable post-quantum transaction-signature or admin-key research, governance proposal, or in-repo code was located. Horizen Labs' "Quantum Threat Assessment" is a consulting product the company sells to enterprises, not work applied to its own token.

**Current state.** Admin and authorization surfaces are EC-controlled; no concrete post-quantum proposal currently exists for them.

Evidence:
- [Horizen migration hub](https://www.horizen.io/horizen-upgrade) — ZEN to ERC-20 on Base.
- [Horizen GitHub](https://github.com/HorizenOfficial) — no post-quantum token-admin migration on file.
- [Harvest-now-decrypt-later advisory](https://horizenlabs.io/blog/harvest-now-decrypt-later-the-quantum-threat-your-risk-register-isn-t-tracking) — enterprise advisory posture, no own-token commitment.

## 3. Cross-Chain Mechanism

**Grade: ➖**

The only cross-chain event in ZEN's history was the one-time mainchain/EON to Base migration on 23 July 2025, after which the legacy chains were halted at block 1,807,300. ZEN is now canonical and single-chain on Base, with no ongoing issuer-operated burn-and-mint path and no canonical third-party bridge surfacing as a primary deployment path. Because there is no live cross-chain transfer mechanism, this category does not apply.

Evidence:
- [Migration overview](https://horizen-2-docs.horizen.io/migration/overview/) — migration to Base, old chains discontinued.
- [Final mainchain block 1,807,300](https://2miners.com/blog/july-2025-work-progress-zen-shutdown/) — chain shutdown record.

## 4. Reserve / Custody

**Grade: ➖**

ZEN is an unbacked utility token with no off-chain reserve and no custody-to-chain mint-attestation pipeline. The Base ERC-20 is itself the canonical token, not a representation of an off-chain claim, so there is no custody-to-chain surface to rate.

Evidence:
- [Horizen site](https://www.horizen.io/) — no reserve attestations.
- [Horizen 2.0 docs](https://horizen-2-docs.horizen.io/) — ERC-20 token model on Base.

## 5. Other Token-Specific Crypto

**Grade: ➖**

The ZEN ERC-20 contract on Base embeds no cryptography beyond the host EVM stack. The chain-specific cryptography historically associated with Horizen — the Zendoo recursive cross-chain SNARKs (EON withdrawal certificates) and the Sprout-derived shielded pool — lived on the mainchain and EON, both of which are now halted; the shielded pool was already removed in 2024. The zkVerify proof-verification cryptography is a sister Substrate L1, rated on the chain side, not ZEN-token-contract cryptography. There is therefore no token-specific extra cryptography to rate for the ZEN ERC-20.

Evidence:
- [Zendoo construction](https://eprint.iacr.org/2020/123.pdf) — legacy cross-chain SNARK design, now moot.
- [Shielded pool removed (2024)](https://github.com/HorizenOfficial/zen/blob/release/5.0.0/doc/release-notes/release-notes-5.0.0.md) — release notes.
- [zkVerify repository](https://github.com/zkVerify/zkVerify) — sister L1, chain-side crypto.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ➖, Reserve & Custody ➖, Other ➖.

No Horizen / Horizen Labs-attributable plan exists to retire elliptic-curve cryptography on the ZEN ERC-20 or its issuer-controlled admin surface. The 2025 migration to Base incidentally retired a large legacy EC surface (mainchain ECDSA, Zendoo proofs), but that was a side effect of a scalability and compliance move, not an EC-retirement initiative — and the current token surface (Base secp256k1 plus issuer admin keys) carries no published retirement schedule. Horizen Labs markets a "Quantum Threat Assessment" advisory product but has not applied it to its own token or chains in any disclosed milestone.

Evidence:
- [Horizen roadmap](https://www.horizen.io/roadmap) — no EC-sunset milestone.
- [Horizen GitHub](https://github.com/HorizenOfficial) — no EC-retirement proposal on file.
- [Horizen Labs](https://www.horizenlabs.io/) — Quantum Security Consultancy line of business (external, not self-applied).

## Issuer & Governance

Horizen governs via the Horizen DAO, using Discourse discussion plus token voting for its improvement proposals (ZenIPs), with the Horizen Foundation executing decisions and Horizen Labs implementing them. The DAO has demonstrated the capacity to make large structural changes: it approved the migration directive (ZenIP 42405) and then executed the move to Base. As of this writing, no ZenIP targets post-quantum migration, post-quantum signatures, or EC sunset for the ZEN token. Product and migration decisions surface through the DAO's Discourse forum and the [Horizen GitHub organization](https://github.com/HorizenOfficial); readers tracking where a future post-quantum commitment would first appear should watch those venues and the [Horizen roadmap](https://www.horizen.io/roadmap).

---

_Generated on 29 Jun 2026 based on information as of 29 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
