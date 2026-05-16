# Argent (Ready Wallet) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Argent / Ready Wallet (Formerly Argent) |
| **Vendor** | Argent Labs / Ready |
| **Category** | Smart Contract |
| **Custody model** | Smart-contract account on Starknet (owner/signer key plus optional Guardian authorizes the account contract; funds are held by the contract). The legacy Argent Vault on Ethereum L1 is also a smart-contract wallet. |
| **Website** | [ready.co](https://www.ready.co/) |
| **GitHub** | [github.com/argentlabs](https://github.com/argentlabs) |
| **Platforms** | Browser extension (Chrome, Firefox, Edge, Brave), iOS, Android, and a web wallet. No standalone desktop client. |
| **Open source** | The account contracts (`argent-contracts-starknet` and the legacy `argent-contracts`) are GPL-3.0 open source. |
| **First release** | 2017 (company); Argent mobile wallet 2018; Argent X Starknet browser extension 2022. |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | Yes | ✅ | Shipped |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Argent — rebranded to "Ready" in February 2025, though the legal entity (Argent Labs Limited, UK) is unchanged — is a smart-contract wallet focused almost exclusively on Starknet, with a legacy Ethereum L1 product (Argent Vault) in maintenance mode. Every Argent / Ready account on Starknet is itself a Cairo smart contract: the user's device key authorizes the account, and signature verification happens entirely in contract code. That architecture is what stands out for post-quantum readiness. The account contract uses a typed `SignerSignature` enum that already carries multiple signing schemes — Stark-curve ECDSA, secp256k1, secp256r1 (P-256), EIP-191, and WebAuthn passkeys — and the v0.4 release demonstrated that a new signer scheme can be added by shipping a new enum variant plus an in-Cairo verifier.

No Argent / Ready post-quantum roadmap, blog post, or position statement was located, and the wallet ships no post-quantum signing path today. The closest adjacent work is a [September 2023 BTQ × StarkWare research result](https://www.btq.com/blog/completing-the-first-falcon-signature-verification-in-starkware-initiating-the-transition-to-a-quantum-safe-ethereum) that completed Falcon signature verification in Cairo on Starknet and framed account abstraction as the migration path — but Argent is not named as a participant, and that work has not been adopted into any Argent / Ready account contract.

## Proposed and Implemented PQC Algorithms

Argent does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

Argent / Ready is a smart-contract wallet whose signature verification is governed by the account contract rather than by a chain protocol, and the available intel for this column did not establish a basis for a posture rating distinct from what the architecture columns capture. No public Argent / Ready statement on post-quantum signature support was located as of the information date of this report.

## Crypto Agility

**Rating: Yes** ✅

Argent / Ready's account contract is built around a typed `SignerSignature` enum that already supports four classical schemes — Stark-curve ECDSA, secp256k1, secp256r1, and WebAuthn — as documented in the [signer types reference](https://github.com/argentlabs/argent-contracts-starknet/blob/main/docs/signers_and_signatures.md). Because the account is a Cairo smart contract, adding a new signing scheme is a matter of shipping a new enum variant and an in-contract verifier rather than changing a chain protocol.

**Current state.** The v0.4 release of [`argent-contracts-starknet`](https://github.com/argentlabs/argent-contracts-starknet) added the secp256r1 / WebAuthn passkey signer, verified entirely in Cairo. That release is the existence proof that the wallet can take on a non-default signing scheme through its existing extensibility surface. The contracts are GPL-3.0, so the signer enum and its verifiers are publicly inspectable. The web wallet's smart-contract architecture is described in the vendor's [web wallet architecture post](https://www.ready.co/blog/exploring-web-wallets-architecture).

**Planned future work.** No post-quantum signer variant has been added or publicly proposed by Argent / Ready. The intel notes one practical limitation: stateful schemes would require additional state tracking that the current device-key model does not provide, whereas adding a new stateless curve or scheme follows the same path the WebAuthn signer took.

## Protocol PQC

**Rating: N/A** ➖

Argent / Ready is Starknet-exclusive, with a legacy Ethereum L1 product in maintenance mode. Neither chain offers a protocol-level post-quantum signature scheme for user transactions, so there is no chain protocol against which the wallet could sign post-quantum transactions. This column does not apply.

## Contract PQC Support

**Rating: N/A** ➖

Argent / Ready accounts on Starknet are native smart-contract accounts, and their signature verification runs in Cairo bytecode — the kind of architecture that could host an on-chain post-quantum verifier. However, no post-quantum verification primitive is deployed in any Argent / Ready account contract, and the available intel did not establish an in-flight integration that would make this column a live measure for the wallet. The [BTQ × StarkWare Falcon-in-Cairo research](https://www.btq.com/blog/completing-the-first-falcon-signature-verification-in-starkware-initiating-the-transition-to-a-quantum-safe-ethereum) demonstrates feasibility on Starknet but is research that Argent has not adopted.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Argent / Ready in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Argent / Ready is built by Argent Labs Limited, a private company based in London, UK, trading as "Ready" since February 2025. The wallet is company-led: there is no DAO, no token-based governance over the wallet contracts, and no native Argent / Ready token. Product direction is communicated through the vendor's blog and documentation at [ready.co](https://www.ready.co/) and [docs.ready.co](https://docs.ready.co/); any post-quantum commitment would surface there.

The account contracts are developed in public on [GitHub](https://github.com/argentlabs) under GPL-3.0. Security disclosures are handled through a bug bounty advertised on the vendor's security pages, with historic disclosures via the contract repositories. The Starknet account and multisig contracts have been audited by Consensys Diligence, including the [June 2023 "Argent Account & Multisig for StarkNet" audit](https://consensys.io/diligence/audits/2023/06/argent-account-multisig-for-starknet/); the earlier Ethereum Argent Vault contracts were also audited. No dated, on-record post-quantum milestone published by Argent / Ready was located.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
