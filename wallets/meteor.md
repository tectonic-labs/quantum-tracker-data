# Meteor Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Meteor Wallet |
| **Vendor** | Meteor Wallet |
| **Category** | Software |
| **Custody model** | EOA / single-key self-custody — a 12-word BIP-39 seed for a NEAR account, with optional Ledger hardware co-sign. No native MPC or TSS. |
| **Website** | https://meteorwallet.app/ |
| **GitHub** | https://github.com/Meteor-Wallet |
| **Twitter / X** | https://x.com/MeteorWallet |
| **Platforms** | Browser extension (Chrome / Chromium), web app, and iOS / Android mobile. No standalone desktop app; integrates with Ledger hardware rather than shipping its own device. |
| **Open source** | Mixed — the production wallet clients (extension, web, mobile) are proprietary; the dapp-side SDK and connector repos (`meteor_wallet_sdk`, the `wallet-selector` fork, `near-connect`) are public under GPL-3.0 / Apache-2.0. |
| **First release** | 2022 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Meteor Wallet is a NEAR-focused, non-custodial software wallet. It signs transactions only on the NEAR blockchain; its cross-chain reach to Aurora and Ethereum is bridge-mediated through Rainbow Bridge, not native multi-chain signing. As of the information cutoff for this report, Meteor signs every user transaction with classical elliptic-curve cryptography — Ed25519 by default — and ships no post-quantum signing path.

NEAR Protocol itself is moving toward post-quantum cryptography: NEAR has published a plan for an FIPS-204 (ML-DSA) signing scheme on testnet targeted for the end of Q2 2026, with [explicit reference to working with software and hardware wallet builders](https://www.near.org/blog/making-near-protocol-post-quantum-safe). Because Meteor signs only NEAR transactions, that upstream work, once activated, would cover the wallet's entire signed surface through a single integration. No Meteor-branded public statement, roadmap item, or shipped code on post-quantum migration has been located, and the upstream NEAR scheme has not activated yet.

## Proposed and Implemented PQC Algorithms

Meteor Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

PQC Stance does not apply to Meteor in a way that produces a yes/no signal. No Meteor-branded public statement on post-quantum cryptography has been located — searches across the [marketing site](https://meteorwallet.app/), the [documentation](https://docs.meteorwallet.app/), the [help center](https://help.meteorwallet.app/en), the [GitHub organization](https://github.com/Meteor-Wallet), and the [X account](https://x.com/MeteorWallet) returned no Meteor-authored blog post, roadmap item, security white paper, or social thread on quantum migration. The only relevant signal is upstream and not authored by the vendor: NEAR Protocol's own [published plan](https://www.near.org/blog/making-near-protocol-post-quantum-safe) for an FIPS-204 (ML-DSA) signing scheme on testnet, targeted for the end of Q2 2026.

## Crypto Agility

**Rating: No** ❌

Meteor ships a fixed signer set with no plugin or extension API for adding a new signature scheme. The wallet clients are closed source, so a new algorithm cannot be introduced by a third party — it would require the Meteor team to ship it in a vendor release. The public SDK and connector repositories (`meteor_wallet_sdk`, the [`wallet-selector` fork](https://github.com/Meteor-Wallet/wallet-selector), `near-connect`) let dapps connect to Meteor; they do not let anyone extend the wallet's own signing capability.

**Current state.** There is no pluggable signer, swappable validator facet, or typed signer enum exposed by the wallet. Adding a new signing algorithm is a vendor-side code change.

There is one structural nuance worth noting. NEAR's account model lets a single account hold many keys, and Meteor exposes a "Manage Full Access Keys" UI that lets users list, rotate, and revoke the keys associated with their account — a more developed key-management surface than most consumer wallets ship. That UI does not make the wallet's signer set swappable today, but it is the kind of surface a future "add an alternative key type" flow would build on.

## Protocol PQC

**Rating: N/A** ➖

Meteor's only natively-signed chain is NEAR Protocol. NEAR does not currently enforce a protocol-level post-quantum signature scheme — its [published plan](https://www.near.org/blog/making-near-protocol-post-quantum-safe) targets an FIPS-204 (ML-DSA) signing scheme on testnet by the end of Q2 2026, which had not activated as of the information cutoff for this report. The other chains Meteor reaches — Aurora and Ethereum — are accessible only as Rainbow Bridge transfer destinations; Meteor does not produce signatures on them. With no chain Meteor signs offering a live protocol-level post-quantum signature scheme, this column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

NEAR's protocol provides account-level abstraction primitives — FunctionCall access keys, which are per-contract scoped, limited-permission keys baked into the protocol. Meteor surfaces these directly: its [help center](https://help.meteorwallet.app/en) documents granting dapps function-call access, and the wallet shows a "Connected Apps" management view with fee-allowance monitoring and deauthorization. Meteor's connector flow issues FunctionCall access keys to dapps as the standard NEAR connect pattern.

**Current state.** Meteor does not surface any post-quantum verifier in this layer today — no on-chain post-quantum primitive is exposed in the wallet's UI on any chain it touches.

**Planned future work.** The in-progress signal is upstream. NEAR has a named, dated migration plan — an FIPS-204 (ML-DSA) signing scheme on testnet targeted for the end of Q2 2026 — and its [published statement](https://www.near.org/blog/making-near-protocol-post-quantum-safe) explicitly references collaboration with software and hardware wallet builders. Whether Meteor is one of those collaborators has not been publicly confirmed, and no Meteor-side integration has shipped. NEAR's account model is structured so that an alternative key type could be added to an existing account in a single transaction, and Meteor's existing key-management UI is the surface such a flow would extend.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Meteor Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Meteor Wallet is a private, company-led product; the feature roadmap and security posture are set by the team rather than by a DAO or token holders. There is no native wallet token and no on-chain governance process for the wallet client.

Product communication and user feedback are handled primarily through the public [`meteor-public` GitHub repository](https://github.com/Meteor-Wallet/meteor-public), which also hosts a compliance-documentation folder. The wallet's [documentation](https://docs.meteorwallet.app/) states that the code is to be audited by a software auditing firm, but no specific audit firm or public audit report has been located, and a named bug-bounty program at a canonical Meteor URL has not been identified. A reader evaluating Meteor's security disclosure path should confirm the current channel directly with the vendor.

Any post-quantum commitment from Meteor would most plausibly surface first on the [vendor's X account](https://x.com/MeteorWallet), the [documentation site](https://docs.meteorwallet.app/), or the public GitHub organization. None carried post-quantum content as of the information cutoff for this report.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
