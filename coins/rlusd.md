# Ripple USD (RLUSD) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Ripple USD |
| **Ticker** | RLUSD |
| **Asset class** | Stablecoin |
| **Issuer** | Standard Custody & Trust Company, LLC (a wholly-owned Ripple subsidiary) |
| **Host chain(s)** | Ethereum, XRPL (XRP Ledger) |
| **Website** | https://ripple.com/solutions/stablecoin/ |
| **GitHub** | https://github.com/ripple |
| **Contract address** | `0x8292Bb45bf1Ee4d140127049757C2E0fF06317eD` (Ethereum); issuer account `rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De` (XRPL) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | F | ❌ | Not Discussed |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

RLUSD is a dollar-backed stablecoin issued natively on two chains — Ethereum and the XRP Ledger (XRPL). Its post-quantum posture is shaped by two things: what it inherits from those host chains, and what its issuer controls directly. A token cannot be more quantum-safe than the chain it runs on, so the host chains set the ceiling, while the issuer's own surfaces — the admin keys that govern minting and upgrades, the bridges that move RLUSD across chains, and the custody-to-chain signing path — set the floor.

Today every one of those surfaces relies on elliptic-curve cryptography. On Ethereum, RLUSD is an upgradeable ERC-20 whose privileged roles are gated by a custom multi-signature contract using ECDSA secp256k1 keys; on XRPL the issuer account signs with secp256k1 or Ed25519. Cross-chain movement rides third-party bridges (Wormhole NTT and Axelar) whose attestor sets also sign with ECDSA. Ripple has published a [4-phase post-quantum roadmap for the XRP Ledger protocol](https://ripple.com/insights/post-quantum-readiness-on-the-xrp-ledger/) targeting 2028, but that roadmap addresses the XRPL protocol itself rather than the RLUSD-specific admin, bridge, and custody keys, and there is no Ripple-attributable PQC commitment that names RLUSD's own surfaces.

## Proposed and Implemented PQC Algorithms

RLUSD does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

RLUSD is natively issued on two chains: [Ethereum](../chains/l1/ethereum.md) and the [XRP Ledger](../chains/l1/ripple.md). This rating is inherited — RLUSD's transaction-signing, consensus, and networking exposure are properties of those host chains, not of the token issuer. The token cannot be more quantum-safe than the chains it executes on; host-chain inheritance is the ceiling for everything else in this report.

**Current state.** Both evaluated host chains carry at least one quantum-exposed category, so the aggregate sits at the worst level across all of them — ❌ across both of the two evaluated hosts. Ethereum's most exposed surface is its peer-to-peer networking layer. XRPL's exposure spans its peer-to-peer layer and chain-specific cryptography, and its mainnet today remains entirely dependent on elliptic-curve signatures.

**Planned future work.** XRPL has post-quantum work in flight at the protocol level: Ripple has published an April 2026 4-phase roadmap targeting a full transition by 2028, and a testnet has been used to exercise quantum-resistant accounts, transactions, and consensus. That migration belongs to the host chain rather than to RLUSD itself. The host-chain reports linked above carry the detail.

Sources:
- https://etherscan.io/token/0x8292bb45bf1ee4d140127049757c2e0ff06317ed — RLUSD Ethereum token contract
- https://xrpscan.com/token/RLUSD.rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De — RLUSD XRPL issuer
- https://ripple.com/insights/post-quantum-readiness-on-the-xrp-ledger/ — XRPL protocol PQC roadmap

## 2. Admin / Privileged Roles

**Grade: F ❌**

RLUSD has parallel administrative surfaces on its two host chains, and both rely entirely on elliptic-curve cryptography.

**Current state.** On Ethereum, RLUSD is an ERC-20 deployed behind a UUPS upgradeable proxy. Five on-chain role-based access control roles govern the token — Minter, Burner, Pauser (individual and global freeze), Clawbacker (forced burn), and Upgrader (which can swap the contract implementation via `upgradeToAndCall()`) — each managed by a central Role Admin account. Every account holding one of these roles is itself a Ripple-built custom multi-signature contract that mirrors XRPL's native multisig: it stores a predetermined list of signers with weights and a quorum, verifies the ECDSA signatures of those signers, and then forwards the authorized call. All multi-sign signer keys are secp256k1 externally owned accounts, and the proxy upgrade path is gated on the same elliptic-curve-signed quorum. On XRPL, the issuer account `rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De` is configured with clawback, global-freeze, and deposit-authorization flags enabled, and the freeze authority has not been disabled. XRPL accounts sign with either secp256k1 or Ed25519 — both elliptic-curve schemes that are broken by Shor's algorithm on a sufficiently capable quantum computer. Ripple has not published the specific key configuration for the RLUSD issuer account.

**Planned future work.** No concrete post-quantum proposal currently exists for either the Ethereum multi-sign / UUPS admin keys or the XRPL issuer keys. Ripple's published XRPL post-quantum roadmap targets protocol-level account, consensus, and transaction signatures on XRPL itself; it does not commit to migrating the RLUSD admin surfaces.

Sources:
- https://github.com/ripple/RLUSD-Implementation/blob/main/doc/rlusd-ethereum-design.md — RLUSD Ethereum contract design (UUPS, 5 roles, MultiSign)
- https://github.com/ripple/RLUSD-Implementation/blob/main/doc/rlusd-xrpl-settings.md — RLUSD XRPL issuer settings (flags)
- https://etherscan.io/token/0x8292bb45bf1ee4d140127049757c2e0ff06317ed — RLUSD contract
- https://xrpl.org/docs/concepts/accounts/cryptographic-keys — XRPL secp256k1 / Ed25519 key types

## 3. Cross-Chain Mechanism

**Grade: F ❌**

RLUSD is dual-natively issued on XRPL and Ethereum — there is no built-in burn-and-mint or canonical issuer bridge between the two, as each chain has its own issuance contract or account. Cross-chain liquidity instead flows through third-party bridges that Ripple has formally integrated.

**Current state.** Ripple announced in 2026 that RLUSD's Layer-2 expansion runs on Wormhole's Native Token Transfers (NTT) standard, with active testing on Optimism, Base, Ink, and Unichain; NTT lets Ripple maintain native issuance while using Wormhole for the messaging layer. Wormhole's trust root is its Guardian network — 19 institutionally-run nodes that independently observe source-chain events and produce signatures that the destination-chain core contract verifies. Those Guardian signatures use ECDSA secp256k1. Ripple has also selected Axelar's General Message Passing as the bridge protocol for the XRPL EVM Sidechain; Axelar's validator set signs cross-chain messages with ECDSA secp256k1 under threshold-cryptography rules. A Squid Router aggregator layer sits on top of Axelar and Wormhole and inherits the same trust roots. Third-party-bridge exposure is inherited at the worst level across every chain the bridge serves, and both Wormhole and Axelar cover footprints that include quantum-exposed chains, so RLUSD's cross-chain stack is rated ❌.

**Planned future work.** No post-quantum migration is in flight for either the Wormhole Guardian set or the Axelar validator set as it applies to RLUSD, and no concrete post-quantum proposal currently exists for RLUSD's cross-chain path.

Sources:
- https://ripple.com/insights/ripple-usd-rlusd-expands-to-l2s-with-wormhole-ntt-standard/ — RLUSD expansion via Wormhole NTT
- https://wormhole.com/products/native-token-transfers — NTT framework
- https://wormhole.com/docs/products/token-transfers/native-token-transfers/concepts/architecture/ — NTT architecture (Guardian + custom transceivers)
- https://www.theblock.co/post/299696/ripple-to-use-axelar-as-bridge-protocol-for-evm-sidechain — Axelar as XRPL EVM Sidechain bridge
- https://wormhole.com/blog/ripple-expands-multichain-interoperability-infrastructure-with-wormhole — Wormhole / XRPL integration

## 4. Reserve / Custody

**Grade: F ❌**

RLUSD's reserve and custody stack has two layers, and the layer that touches the chain relies on elliptic-curve cryptography.

**Current state.** RLUSD is backed by U.S. dollar deposits and short-term U.S. Treasuries and cash equivalents held in segregated accounts; in July 2025 Ripple selected The Bank of New York Mellon as the primary custodian of those reserve assets. BNY Mellon holds off-chain cash and Treasuries and is not on the on-chain signing path. The custody-to-chain link is operated separately: the on-chain mint and burn authority on Ethereum, and the equivalent issuer-side functions on XRPL, are run by Standard Custody & Trust Company, LLC, a wholly-owned Ripple subsidiary chartered as an NYDFS-regulated limited-purpose trust. Standard Custody operates the multi-sign signer rosters described above, and that multi-sign contract is the cryptographic binding between off-chain custody decisions and on-chain mint, burn, pause, clawback, and upgrade calls. That binding is the same ECDSA secp256k1 multi-sign rated under Admin / Privileged Roles — when the mint key is the custody key, the same key is rated in both categories. Ripple Custody product material describes the use of hardware security modules (Securosys CyberVault / CloudHSM, FIPS 140-2 Level 4) and multi-party computation for institutional custody clients generally, but Ripple has not published the specific HSM or MPC configuration backing the RLUSD Standard Custody signers.

**Planned future work.** No concrete post-quantum proposal currently exists that names RLUSD's custody-to-chain signing, HSM, or MPC infrastructure.

Sources:
- https://ripple.com/solutions/stablecoin/ — RLUSD overview, BNY Mellon custody, Standard Custody issuance
- https://github.com/ripple/RLUSD-Implementation/blob/main/doc/rlusd-ethereum-design.md — MultiSign contract as custody-to-chain binding
- https://ripple.com/solutions/digital-asset-custody/ — Ripple Custody HSM / MPC product profile
- https://ripple.com/ripple-press/ripple-accelerates-institutional-custody-adoption-with-security-compliance-and-staking-capabilities/ — Ripple Custody + Securosys HSM rollout

## 5. Other Token-Specific Crypto

**Grade: ➖**

RLUSD has no token-specific cryptographic surface beyond what the host-chain, admin, and cross-chain categories already cover — no embedded zero-knowledge verifier, no token-internal verifiable random function, no oracle-gated rebase, and no real-world-asset on-chain mapping attestation. Monthly reserve attestations are signed by third-party auditors but do not gate on-chain behavior, so there is no additional token-specific cryptographic surface to rate and this category does not apply.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to *retire* elliptic-curve cryptography on the token's own surfaces, which is distinct from whether the token is adding post-quantum cryptography alongside it.

**Current state.** There is no Ripple-attributable plan to retire elliptic-curve cryptography on the surfaces RLUSD's issuer controls: the Ethereum UUPS upgrader and the Role Admin, Minter, Burner, Pauser, and Clawbacker multi-sign signers (all secp256k1); the XRPL issuer account's master, regular, and signer-list keys (secp256k1 or Ed25519); or Standard Custody's HSM / MPC signer infrastructure for RLUSD mint authorization. The Wormhole Guardian set and Axelar validator set used for cross-chain transfers are third-party infrastructure and are not Ripple's to retire.

**Planned future work.** Ripple's April 21 2026 "Post-Quantum Readiness on the XRP Ledger" 4-phase roadmap covers XRPL protocol accounts, transactions, and consensus, with a Q-Day contingency phase and a 2028 target for full transition. That roadmap applies to XRP itself and to any account on XRPL once the relevant amendment activates — it does not specifically commit Ripple to retire elliptic-curve cryptography on the RLUSD ERC-20's Ethereum admin keys, the Wormhole or Axelar bridge attestor sets, or the Standard Custody HSM signing infrastructure.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ❌, Other ➖.

Sources:
- https://ripple.com/insights/post-quantum-readiness-on-the-xrp-ledger/ — XRPL protocol PQC roadmap (not RLUSD-specific)
- https://www.coindesk.com/markets/2026/04/21/ripple-wants-the-xrp-ledger-to-be-quantum-proof-by-2028-here-is-its-plan — CoinDesk coverage of the roadmap
- https://thequantuminsider.com/2026/04/21/ripple-outlines-plan-to-protect-xrpl-from-quantum-computing-risks/ — Quantum Insider coverage
- https://github.com/ripple/RLUSD-Implementation — RLUSD-Implementation repo

## Issuer & Governance

RLUSD is not governed by a DAO. The issuer of record is Standard Custody & Trust Company, LLC, a wholly-owned Ripple subsidiary chartered under a New York Department of Financial Services Limited Purpose Trust Company Charter; the token is also approved by the Dubai Financial Services Authority. Changes to the RLUSD contracts — upgrades on Ethereum and issuer-flag changes on XRPL — are executed by Standard Custody's multi-sign signers under Ripple's internal governance, with no on-chain voting or public proposal process. Monthly third-party attestations of reserve assets are published; the attestation signatures do not gate on-chain behavior.

Because there is no public proposal process for RLUSD itself, any RLUSD-specific post-quantum commitment would surface through Ripple's own product channels — its insights blog and press releases — or through the [RLUSD-Implementation repository](https://github.com/ripple/RLUSD-Implementation), which currently records no post-quantum commits or issues for the RLUSD admin surfaces. The XRP Ledger's post-quantum posture is a separate governance track, handled through XRPL Foundation amendment voting and Ripple's published 4-phase roadmap; that track is captured on the [XRP Ledger evaluation](../chains/l1/ripple.md), not here.

Sources:
- https://ripple.com/solutions/stablecoin/ — RLUSD official overview
- https://ripple.com/insights/post-quantum-readiness-on-the-xrp-ledger/ — Ripple's XRPL PQC roadmap (April 2026)
- https://github.com/ripple/RLUSD-Implementation — RLUSD implementation repo

---

_Generated on 16 May 2026 based on information as of 13 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
