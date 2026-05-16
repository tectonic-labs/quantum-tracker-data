# Petra — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Petra |
| **Vendor** | Aptos Labs |
| **Category** | Software |
| **Custody model** | Single-key self-custody (Aptos Ed25519 account) by default; optional Aptos Keyless (OIDC-derived, seed-phrase-free) and Ledger / Keystone hardware co-sign. No native MPC. |
| **Website** | https://petra.app/ |
| **GitHub** | https://github.com/aptos-labs |
| **Platforms** | Browser extension (Chrome, Edge, Brave; Firefox listing exists), iOS, Android, and Petra Web. No standalone desktop app. |
| **Open source** | Proprietary wallet clients. Auxiliary dapp-integration repos (`petra-wallet-types`, `petra-plugin-wallet-adapter`) are open-licensed; cryptographic primitives ride on the open-source `aptos-core` SDK. |
| **First release** | 2022 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Petra is the first-party Aptos wallet from Aptos Labs, and it is single-ecosystem: it signs Aptos transactions only, with Ed25519 as the default and sole user-facing signing scheme. As of the information cutoff for this report, Petra ships no post-quantum signing path. The Petra blog, FAQ, and security pages do not mention post-quantum, quantum-resistant, lattice-based, or hash-based signatures.

The relevant post-quantum activity sits one level up, at the Aptos chain. [AIP-137](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-137-post-quantum-aptos-accounts-via-slh-dsa-sha2-128s.md) — "Post-quantum Aptos accounts via SLH-DSA-SHA2-128s signatures" — was accepted in the Aptos governance process, and the proposal itself notes that wallets may choose to implement support for the scheme. That is a chain-side proposal, not a shipped protocol feature and not a Petra commitment. No Petra implementation timeline, testnet build, or roadmap entry for post-quantum signing has been published.

## Proposed and Implemented PQC Algorithms

Petra does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

Petra signs Aptos transactions only, and Aptos does not yet have an activated protocol-level post-quantum signature scheme. The chain-side proposal [AIP-137](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-137-post-quantum-aptos-accounts-via-slh-dsa-sha2-128s.md) has been accepted in Aptos governance but is not activated on mainnet, so there is no production post-quantum scheme for a wallet to take a stance on yet. No Petra-branded public statement on post-quantum cryptography was located; the Aptos Labs proposal is a chain-level document, separate from the wallet product.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Petra in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Protocol PQC

**Rating: N/A** ➖

Petra supports only the Aptos chain, and Aptos has no activated protocol-level post-quantum transaction signature scheme. The accepted [AIP-137](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-137-post-quantum-aptos-accounts-via-slh-dsa-sha2-128s.md) proposal describes an opt-in protocol-level scheme, but it is not live on mainnet, so there is no protocol-level post-quantum signing path for any chain Petra supports. This column does not apply.

## Contract PQC Support

**Rating: N/A** ➖

Aptos provides Move-based account abstraction, which lets accounts attach custom authentication logic and is a structural surface that could host an on-chain post-quantum verifier. However, no such verifier has been deployed on Aptos, and Petra ships no UI routing through any contract-level post-quantum primitive. With no deployed on-chain post-quantum verifier on the only chain Petra supports, this column does not apply.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Petra in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Petra is developed by Aptos Labs, a private US company; product decisions for the wallet are made internally rather than through a token or DAO process. The Aptos chain itself is governed on-chain through the [AIP process](https://github.com/aptos-foundation/AIPs), which is where chain-level post-quantum proposals such as AIP-137 surface — but that process governs the chain, not the wallet client.

Security disclosures are handled through the `SECURITY.md` in the [aptos-labs/petra-wallet](https://github.com/aptos-labs/petra-wallet) repository, which directs reports to Aptos Labs; the broader `aptos-core` security policy applies to the underlying cryptographic primitives. The Petra extension's store listing references independent audits, but a canonical published audit-reports page was not located, so specific audit firms and dates could not be confirmed.

No dated, on-record post-quantum milestone has been published by Aptos Labs for the Petra wallet itself. Readers tracking when a post-quantum commitment would surface should watch the Petra product channels and the Aptos AIP repository.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
