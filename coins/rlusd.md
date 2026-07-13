# Ripple USD (RLUSD) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Ripple USD |
| **Ticker** | RLUSD |
| **Asset class** | Stablecoin |
| **Issuer** | Standard Custody & Trust Company, LLC (a wholly-owned Ripple subsidiary) |
| **Host chain(s)** | Ethereum, XRPL (XRP Ledger) |
| **Website** | https://ripple.com/solutions/stablecoin/ |
| **GitHub** | https://github.com/ripple/RLUSD-Implementation |
| **Contract address** | `0x8292Bb45bf1Ee4d140127049757C2E0fF06317eD` (Ethereum); XRPL issuer `rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De` |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | F | ❌ | Not Discussed |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | D | ⚠️ | Discussed |

RLUSD is a NYDFS-regulated stablecoin issued natively on two chains — Ethereum (as an ERC-20 behind an upgradeable proxy) and the XRP Ledger (as an issued asset). A token cannot be more quantum-safe than the chains it runs on, and both of RLUSD's host chains remain elliptic-curve-dependent today, so the inherited host-chain ceiling is already at the exposed level. On top of that ceiling, the surfaces RLUSD's issuer directly controls — the Ethereum admin roles, the custody-to-chain mint/burn authority, and the third-party bridges used for cross-chain movement — all rely on ECDSA (secp256k1) signing with no shipped post-quantum alternative.

Ripple, RLUSD's issuer parent, has published a [4-phase post-quantum roadmap for the XRP Ledger](https://ripple.com/insights/post-quantum-readiness-on-the-xrp-ledger/) (April 2026) targeting the XRPL protocol. That roadmap touches the environment RLUSD lives in — its eventual Phase-4 amendment would force the RLUSD XRPL issuer account off elliptic curve — but it names no RLUSD-specific key and does not cover RLUSD's Ethereum admin surface. It is awareness that touches the token, not a migration plan for the token's own surfaces.

## Proposed and Implemented PQC Algorithms

RLUSD does not currently propose or implement any post-quantum cryptographic algorithms on its own issuer-controlled surfaces.

## 1. Host Chain Aggregate

**Grade: F ❌**

RLUSD is natively issued on two chains: the XRP Ledger (issuer account `rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De`) and Ethereum (token contract `0x8292Bb45bf1Ee4d140127049757C2E0fF06317eD`). A token's transaction signing, consensus, and networking exposure are inherited from its host chains, not set by the token issuer — so this rating is the worst stoplight across the chains RLUSD runs on. The token cannot be more quantum-safe than the chains it executes on; host-chain inheritance is the ceiling on RLUSD's overall posture.

**Current state.** Both evaluated hosts — [XRP Ledger](../chains/l1/xrp-ledger.md) and [Ethereum](../chains/l1/ethereum.md) — hit the exposed level in at least one core category, so the aggregate is exposed across both of the two evaluated hosts (2/2). This is pervasive rather than an outlier: it is not one weak chain dragging down an otherwise-strong pair — both host chains are elliptic-curve-dependent at the level that matters here.

**Planned future work.** XRPL has an in-flight protocol-level post-quantum effort (a testnet running ML-DSA-based Quantum Accounts, Transactions, and Consensus, alongside Ripple's April 2026 4-phase roadmap targeting 2028), but XRPL mainnet remains fully EC-dependent today. Details of each host chain's migration status live on their own reports linked above.

- [RLUSD Ethereum token contract](https://etherscan.io/token/0x8292bb45bf1ee4d140127049757c2e0ff06317ed)
- [RLUSD XRPL issuer](https://xrpscan.com/token/RLUSD.rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De)

## 2. Admin / Privileged Roles

**Grade: F ❌**

RLUSD has parallel admin surfaces on its two host chains, and both are EC-only.

**Current state.** On Ethereum, the RLUSD ERC-20 is deployed behind a UUPS upgradeable proxy. Five on-chain RBAC roles — Minter, Burner, Pauser, Clawbacker, and Upgrader — control token operations under a central Role Admin account. Every account holding one of these roles is itself a Ripple-built custom [MultiSign contract](https://github.com/ripple/RLUSD-Implementation/blob/main/doc/rlusd-ethereum-design.md) that stores a predetermined list of signers with weights and a quorum, verifies the ECDSA signatures of those signers, and then forwards the authorized call. All MultiSign signer keys are secp256k1 externally-owned accounts, and even the proxy upgrade path is gated on the same EC-signed quorum.

On the XRPL side, the [issuer account](https://github.com/ripple/RLUSD-Implementation/blob/main/doc/rlusd-xrpl-settings.md) `rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De` is configured with clawback, global-freeze, and deposit-authorization flags enabled (and `lsfNoFreeze` deliberately unset, preserving freeze authority). [XRPL accounts sign](https://xrpl.org/docs/concepts/accounts/cryptographic-keys) with either secp256k1 or Ed25519 — both elliptic-curve schemes.

**Planned future work.** No issuer-attributable post-quantum migration plan currently covers either the Ethereum MultiSign / UUPS admin keys or the XRPL issuer keys. Ripple's April 2026 XRPL roadmap addresses protocol-level XRPL signatures, not the RLUSD admin surfaces specifically.

## 3. Cross-Chain Mechanism

**Grade: F ❌**

RLUSD is dual-natively issued on XRPL and Ethereum, with no built-in canonical issuer bridge between the two — each chain has its own issuance contract or account. Cross-chain liquidity instead flows through third-party bridges Ripple has formally integrated.

**Current state.** RLUSD's L2 expansion runs on [Wormhole's Native Token Transfers (NTT) standard](https://ripple.com/insights/ripple-usd-rlusd-expands-to-l2s-with-wormhole-ntt-standard/), with active testing on Optimism, Base, Ink, and Unichain. [NTT](https://wormhole.com/products/native-token-transfers) lets the issuer maintain native issuance while using Wormhole for the messaging layer. Wormhole's trust root is its [Guardian network](https://wormhole.com/docs/products/token-transfers/native-token-transfers/concepts/architecture/): 19 institutionally-run nodes that each observe source-chain events and produce a signature, verified in aggregate by the destination-chain core contract. Guardian signatures are ECDSA (secp256k1). Separately, Ripple selected [Axelar as the bridge protocol for the XRPL EVM Sidechain](https://www.theblock.co/post/299696/ripple-to-use-axelar-as-bridge-protocol-for-evm-sidechain); Axelar's validator set signs cross-chain messages with ECDSA under threshold-cryptography rules, and Squid Router sits on top as aggregator UX with the same underlying trust roots.

Third-party-bridge inheritance takes the worst rating across every chain a bridge serves. Both Wormhole and Axelar cover footprints that include exposed chains, so the worst inherited rating for RLUSD's cross-chain stack is exposed.

**Planned future work.** No post-quantum migration is in flight for either the Wormhole Guardian set or the Axelar validator set as it applies to RLUSD. See also [Wormhole's XRPL integration announcement](https://wormhole.com/blog/ripple-expands-multichain-interoperability-infrastructure-with-wormhole).

## 4. Reserve / Custody

**Grade: F ❌**

RLUSD's reserve and custody stack has two layers, and only one of them is on the cryptographic signing path.

**Current state.** The reserve assets — U.S. dollar deposits and short-term Treasuries — are held in segregated accounts, with [The Bank of New York Mellon selected as primary custodian](https://ripple.com/solutions/stablecoin/) in July 2025. BNY holds the off-chain assets but is not on the on-chain signing path. The custody-to-chain link is operated by Standard Custody & Trust Company, LLC, the NYDFS-chartered Ripple subsidiary that runs the [MultiSign signer rosters](https://github.com/ripple/RLUSD-Implementation/blob/main/doc/rlusd-ethereum-design.md) gating mint, burn, pause, clawback, and upgrade. That MultiSign contract is the same ECDSA secp256k1 stack rated under the admin surface — when the mint key is the custody key, it is the same key in both places.

Ripple [Custody product material](https://ripple.com/solutions/digital-asset-custody/) describes use of HSMs (FIPS 140-2 Level 4) and MPC for institutional clients generally, and has [publicized a Securosys HSM rollout](https://ripple.com/ripple-press/ripple-accelerates-institutional-custody-adoption-with-security-compliance-and-staking-capabilities/), but no published statement names the specific configuration backing the RLUSD Standard Custody signers.

**Planned future work.** No post-quantum HSM or MPC commitment that names RLUSD was located. The documented custody-to-chain linkage is EC-only with no issuer-attributable post-quantum plan.

## 5. Other Token-Specific Crypto

**Grade: ➖**

RLUSD has no token-specific cryptographic surface beyond what the categories above already cover — no embedded ZK verifier, no token-internal VRF, no oracle-gated rebase, no RWA-specific on-chain mapping attestation. Monthly reserve attestations are signed by third-party auditors but do not gate on-chain behaviour, so there is no additional token-specific crypto surface to rate.

## 6. EC Sunset

**Grade: D ⚠️**

EC Sunset rates whether the issuer has a credible plan to *retire* elliptic-curve cryptography on the token's own surfaces — distinct from whether the token is adopting PQC. Adding PQC alongside EC is not the same as retiring EC. For reference, RLUSD's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ❌, Other ➖.

**Current state.** There is no dedicated plan to retire EC on RLUSD's own surfaces — the Ethereum UUPS upgrader and Role Admin MultiSign signers (all secp256k1), the XRPL issuer account's master / regular / signer-list keys (secp256k1 or Ed25519), Standard Custody's HSM/MPC signing infrastructure, or the Wormhole Guardian and Axelar validator sets (which are third-party and not Ripple's to retire).

What lifts this category above the "nothing on the record" floor is Ripple's own published work. Ripple — RLUSD's issuer parent — released a [4-phase "Post-Quantum Readiness on the XRP Ledger" roadmap](https://ripple.com/insights/post-quantum-readiness-on-the-xrp-ledger/) on 21 April 2026, covering XRPL protocol accounts, transactions, and consensus, with a Q-Day contingency phase and a 2028 target for full transition ([CoinDesk coverage](https://www.coindesk.com/markets/2026/04/21/ripple-wants-the-xrp-ledger-to-be-quantum-proof-by-2028-here-is-its-plan), [The Quantum Insider coverage](https://thequantuminsider.com/2026/04/21/ripple-outlines-plan-to-protect-xrpl-from-quantum-computing-risks/)). Because the roadmap applies to any account on XRPL once the amendment activates, its Phase-4 amendment will eventually force the RLUSD XRPL issuer account `rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De` off ECDSA/Ed25519 as a byproduct of the chain migration. That is issuer-attributable public acknowledgement of PQC touching the environment RLUSD lives in, which clears the "Discussed" bar.

**Planned future work.** The roadmap stops short of a plan for RLUSD's own surfaces: it names no RLUSD key, and the Ethereum admin surface — the bulk of RLUSD's footprint — is entirely uncovered. There is no issuer commitment specifically to retire EC on the RLUSD ERC-20's Ethereum admin keys, the bridge attestor sets, or the Standard Custody signing infrastructure.

## Issuer & Governance

RLUSD is not governed by a DAO. The issuer of record is Standard Custody & Trust Company, LLC, a wholly-owned Ripple subsidiary chartered under a New York Department of Financial Services (NYDFS) Limited Purpose Trust Company Charter; the token is also approved by the Dubai Financial Services Authority (DFSA). Changes to the RLUSD contracts — upgrades on Ethereum, issuer-flag changes on XRPL — are executed by Standard Custody's MultiSign signers under Ripple's internal governance, with no on-chain voting or public proposal process. Monthly third-party attestations of reserve assets are published; the attestation signatures do not gate on-chain behaviour.

Where PQC commitments would surface: Ripple discloses product and roadmap decisions on its own [insights channel](https://ripple.com/insights/post-quantum-readiness-on-the-xrp-ledger/), and RLUSD's implementation is published in the [RLUSD-Implementation repository](https://github.com/ripple/RLUSD-Implementation). The XRP Ledger's own post-quantum posture is a separate governance track — XRPLF amendment voting plus Ripple's published 4-phase roadmap targeting 2028 — captured on the XRP Ledger's own report rather than here.

---

_Generated on 07 Jul 2026 based on information as of 07 Jul 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
