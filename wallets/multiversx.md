# MultiversX Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | MultiversX Wallet |
| **Vendor** | MultiversX |
| **Category** | Software |
| **Custody model** | Self-custody EOA across every product. BIP-39 mnemonic or encrypted keystore for seed-derived clients; Ledger secure element for hardware signing; xAlias is self-custody bootstrapped via Google OAuth. |
| **Website** | https://multiversx.com/ |
| **GitHub** | https://github.com/multiversx |
| **Twitter / X** | https://x.com/MultiversX |
| **Platforms** | Browser extension (Chrome, Firefox, Brave, Chromium); mobile (iOS, Android, via xPortal); web apps (Web Wallet, xAlias); third-party hardware via Ledger. No standalone desktop app. |
| **Open source** | Mixed. The wallet SDK pieces (`mx-sdk-js-wallet` and the signing providers) are MIT-licensed in the public `multiversx` GitHub org; the xPortal mobile super-app has no located public repository. |
| **First release** | 2020 (Maiar; rebranded to xPortal in 2023) |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

"MultiversX Wallet" covers a family of first-party products from the MultiversX team: the xPortal mobile super-app, the browser-based Web Wallet, the DeFi Wallet browser extension, the xAlias Google-login wallet, and the MultiversX app for Ledger devices. All of them are self-custody, and all of them sign MultiversX transactions with Ed25519. xPortal additionally holds and signs assets on several other chains using each chain's own classical scheme. As of the information cutoff for this report, none of these products ships a post-quantum signing path, and no MultiversX-authored post-quantum roadmap item, blog post, or position statement was located.

The one forward-looking element is on the chain side. The MultiversX Spica upgrade ([release notes](https://multiversx.com/release/release-spica-v1-8-4-0)) introduced opcodes that let smart contracts verify additional signature types beyond Ed25519. The immediate target of that work is on-chain passkey verification, not post-quantum cryptography, and the passkey feature itself is described as still in development. The same opcode surface could in principle host a post-quantum verifier inside a smart-contract account, but no such verifier has been deployed and no MultiversX product has surfaced one.

## Proposed and Implemented PQC Algorithms

MultiversX Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

The MultiversX wallet products sign with Ed25519, and no chain they support has an activated protocol-level post-quantum signature scheme for a wallet to take a stance on. A search for MultiversX-authored material on post-quantum or quantum-resistant cryptography — blog posts, roadmap entries, audit references, Foundation position papers — returned nothing as of the information cutoff. A community-level comment on X has acknowledged that Ed25519 is vulnerable to quantum computing ([thread](https://x.com/gfusee33/status/1766856652735615037)), but that is an individual community remark, not a statement from the vendor. With no production post-quantum scheme to engage and no vendor statement on the topic, this column does not apply.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for MultiversX Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Protocol PQC

**Rating: N/A** ➖

The MultiversX wallet products sign on MultiversX, and xPortal additionally signs on Bitcoin, Ethereum, Solana, and several other chains. None of these chains has an activated protocol-level post-quantum transaction signature scheme, and the MultiversX signing surface is Ed25519 ([signing documentation](https://docs.multiversx.com/developers/signing-transactions/)). With no protocol-level post-quantum signing path on any supported chain, this column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

MultiversX has native protocol-level account-abstraction primitives, and the Spica upgrade extended them with a smart-contract signature-verification surface. The relevant pieces are:

- **Relayed transactions** ([documentation](https://docs.multiversx.com/developers/relayed-transactions/)) — a third-party relayer can pay gas for a user's transaction; the current v3 form has both sender and relayer co-sign.
- **Guardians** ([documentation](https://docs.multiversx.com/developers/guard-accounts/), [on-chain 2FA page](https://multiversx.com/on-chain-2fa)) — an account can require a co-signature from a guardian address on every outbound transaction; xPortal exposes this as "on-chain 2FA".
- **Spica opcodes** ([on-chain passkeys article](https://multiversx.com/blog/what-are-onchain-passkeys), [Spica release notes](https://multiversx.com/release/release-spica-v1-8-4-0)) — new opcodes that let smart contracts verify additional signature types. The target use case is WebAuthn passkeys, and that feature is described as still in development.

These are real on-chain hooks that a smart-contract account could route an alternative signature scheme through. However, all of the signatures used today across these mechanisms are classical Ed25519, and no on-chain post-quantum verifier has been deployed or announced. The architectural surface exists; a post-quantum integration that uses it does not yet ship.

**Current state.** No MultiversX wallet product signs a transaction that is verified by an on-chain post-quantum primitive. The account-abstraction primitives above all operate on classical signatures.

**Planned future work.** The Spica opcode surface is the candidate path for a future contract-level post-quantum verifier, and a wallet built on the MultiversX SDK would inherit that surface. No MultiversX statement commits to building such a verifier, and the passkey feature that the opcodes were introduced for is itself still in development.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for MultiversX Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

The MultiversX chain is overseen by the MultiversX Foundation, and chain upgrades go through on-chain governance — the Spica upgrade, for example, was passed by validator and staker voting. The xPortal mobile wallet is a consumer-facing brand within the same founder group; wallet feature decisions are set by the team rather than by a DAO vote. The chain's native token, EGLD, is used for gas, staking, and governance; xPortal has no separate token.

Where a post-quantum commitment would surface: chain-level changes (including any future post-quantum verification work built on the Spica opcodes) would appear through MultiversX's on-chain governance process and release notes, while wallet-product changes would appear through the team's own channels and documentation ([wallet docs index](https://docs.multiversx.com/wallet/overview/)).

A security bug bounty is referenced in general terms, and the MultiversX core has been the subject of independent audits in past years, but a single canonical security-disclosure page and the specific audit reports could not be confirmed from public sources. No dated, on-record post-quantum milestone has been published by the vendor for any MultiversX wallet product.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
