# Polkadot{.js} extension — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Polkadot{.js} extension |
| **Vendor** | Parity Technologies |
| **Category** | Software |
| **Custody model** | EOA — single user-held BIP-39 mnemonic per account, single-party self-custody. Optional hardware co-sign via Ledger or Polkadot Vault. No native MPC. |
| **Website** | https://polkadot.js.org/extension/ |
| **GitHub** | https://github.com/polkadot-js/extension |
| **Platforms** | Browser extension (Chrome, Firefox, Edge, Brave and other Chromium / Mozilla-AMO browsers). No first-party mobile or desktop app. |
| **Open source** | Open source — Apache License 2.0. |
| **First release** | 2019 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

## Overview

The Polkadot{.js} extension is the original browser-extension signer for the Polkadot ecosystem, built by [Parity Technologies](https://parity.io/) and licensed permissively under Apache 2.0. It is a single-party, self-custody wallet built around a BIP-39 mnemonic, and it remains the canonical reference signer that other Polkadot wallets implement compatibility against. Its day-to-day end-user role has narrowed over time: it is now best understood as a developer reference and power-user fallback, while polished end-user experiences in the same ecosystem have moved to other wallets.

As of the information date for this report, the project itself has shipped no post-quantum cryptography and has published no post-quantum roadmap. Every signature scheme the wallet exposes — sr25519, Ed25519, and ECDSA — is a classical elliptic-curve scheme. There is no Polkadot{.js}-authored statement on quantum migration, and the wallet has no client-side path for signing with a post-quantum scheme.

## Proposed and Implemented PQC Algorithms

Polkadot{.js} extension does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

The Polkadot{.js} extension is a reference Substrate signer whose cryptographic direction is set upstream rather than as a standalone product roadmap. No post-quantum statement, roadmap, blog post, or position paper authored by the Polkadot{.js} extension project was located, and the project does not maintain an independent product roadmap on which a stance would surface. Searches for the project's name alongside post-quantum terms returned nothing project-authored. Cryptographic posture for this wallet would be inherited from the shared Polkadot toolchain and the underlying chains rather than declared by the wallet itself, so a vendor-level PQC stance is not a meaningful axis here.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Polkadot{.js} extension in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Protocol PQC

**Rating: N/A** ➖

This column measures whether the wallet signs user transactions with a chain's protocol-level post-quantum scheme on a PQC-native chain it supports. Polkadot{.js} is a universal Substrate signer: it does not maintain a fixed chain registry, and any Substrate-based chain reached through the Polkadot-JS API is signable. None of the supported chains expose a protocol-level post-quantum signature scheme for user transactions — every Substrate user-account scheme available through the extension is a classical elliptic-curve scheme. Substrate's on-chain `MultiSignature` type has fixed classical variants, and no Polkadot or Kusama parachain ships a protocol-level post-quantum user-signing path in production. With no supported chain offering such a scheme, this column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

This column tracks whether the wallet signs with a post-quantum signature verified by on-chain contract or runtime bytecode, or whether such integration is publicly in flight. Polkadot{.js} has no deployed post-quantum verifier in production today, and no in-flight wallet-side pull request has been located. What places this column in progress rather than at zero is upstream movement on the chain side: a post-quantum signature pallet for Polkadot is on the [Web3 Foundation](https://research.web3.foundation/) research track, with grant-funded work including the [QuantumGuard MVP](https://grants.web3.foundation/applications/quantum-guard) — a parachain prototype using post-quantum key-establishment and signature primitives — and a [post-quantum gateway proof of concept](https://kucoin.com/blog/en-kucoin-releases-post-quantum-cryptography-pqc-gateway-proof-of-concept). As the reference Substrate signer, Polkadot{.js} would inherit pallet support once such a runtime path lands upstream.

Substrate also already provides chain-native account-abstraction primitives — [multisig](https://wiki.polkadot.network/docs/learn-account-multisig), [proxy accounts, and Pure Proxy ("anonymous") accounts](https://wiki.polkadot.network/docs/learn-proxies-pure) — which Polkadot{.js} fully supports today. These are runtime-level primitives rather than smart contracts, and they currently use classical signatures throughout; they are noted here because they are the structural place a runtime-side post-quantum verifier could attach.

**Current state.** No post-quantum verifier is deployed and no wallet-side integration pull request is in flight.

**Planned future work.** The upstream chain-side post-quantum signature pallet is on the Web3 Foundation research track; the reference signer would inherit that support if and when it ships, but no committed wallet-side timeline was located.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Polkadot{.js} extension in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

The Polkadot{.js} extension is an open-source project maintained under Parity Technologies stewardship, with a small set of core maintainers plus ecosystem contributors. It is not governed by a DAO or a token; there is no native wallet token. Development happens in the open on GitHub at [github.com/polkadot-js/extension](https://github.com/polkadot-js/extension), where issues and pull requests are the change process, and the shared cryptographic and utility libraries live at [github.com/polkadot-js/common](https://github.com/polkadot-js/common). Product and cryptographic direction for the broader ecosystem surfaces through Parity's public channels and the [Web3 Foundation research site](https://research.web3.foundation/) rather than through a wallet-specific roadmap.

Security disclosure follows Parity Technologies' general responsible-disclosure path. Whether the extension is covered under a specific bug-bounty scope, and any audit history specific to the extension codebase, could not be confirmed from public sources and are not reported here.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
