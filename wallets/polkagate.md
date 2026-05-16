# Polkagate — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Polkagate |
| **Vendor** | PolkaGate |
| **Category** | Software |
| **Custody model** | EOA — single-party self-custody with a BIP-39 mnemonic; optional hardware co-sign via Ledger and Polkadot Vault. No native MPC. |
| **Website** | https://polkagate.xyz/ |
| **GitHub** | https://github.com/PolkaGate |
| **Platforms** | Browser extension (Chrome, Brave, Edge, Firefox), iOS, Android, plus a companion non-custodial governance/staking web app. |
| **Open source** | Open source — the extension is a fork of `polkadot-js/extension`. |
| **First release** | 2021 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Polkagate is a community-built, open-source wallet for the Polkadot ecosystem, distinctive for taking Polkadot's chain-level features — OpenGov referenda voting, conviction selection, vote delegation, proxy graphs, pure proxies, and on-chain social recovery — seriously as in-wallet UX rather than deferring them to [Polkadot.js Apps](https://apps.polkagate.xyz/). On the cryptography side, it ships the standard Substrate signing trio: Schnorrkel/sr25519, Ed25519, and ECDSA over secp256k1. All three are classical elliptic-curve schemes, and no post-quantum signing path is exposed in the wallet today.

No public statement from the PolkaGate project on post-quantum cryptography was located. The one forward-looking signal is upstream rather than wallet-side: the Polkadot ecosystem has a post-quantum signature pallet on the Web3 Foundation's roadmap, and because Polkagate inherits its cryptography from the shared [`polkadot-js`](https://github.com/PolkaGate/polkagate-extension) library lineage, a chain-level move would carry over to the wallet — though no in-flight Polkagate-specific work toward that was found.

## Proposed and Implemented PQC Algorithms

Polkagate does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

No public PolkaGate-authored material on post-quantum migration was located — no roadmap, blog post, social post, GitHub issue, or position paper addressing quantum readiness of the wallet. The project is therefore silent on the topic rather than having taken a position for or against it.

The Polkadot ecosystem around Polkagate does have post-quantum research underway upstream — Web3 Foundation has funded prototype work on post-quantum signatures and key exchange — but none of that names Polkagate as a participant, and the same upstream context applies equally to every Polkadot wallet. The [W3F grants ledger](https://github.com/w3f/Grants-Program) is the public record of that research funding.

## Crypto Agility

**Rating: No** ❌

Polkagate ships a fixed signer. It supports the standard Substrate keypair types — sr25519 (the default), Ed25519, and ECDSA secp256k1 — and the keyring already discriminates between curve types per account, so the account model has a notion of multiple schemes. But there is no plugin signer architecture, no third-party signer API, and no runtime keyring extension model: adding a new signature scheme requires a vendor code change (or a fork), not a configuration step a third party could exercise. New chain support ships through the next extension or mobile release with chain metadata bundled in-app.

Adding a post-quantum keypair type would extend the existing per-curve pattern rather than introduce a wholly new concept, but it would still require coordinated changes both in the shared `@polkadot/util-crypto` library and in Substrate's on-chain signature handling. No such work is in flight.

### Current state

The signer set is the classical Substrate trio, identical to the upstream [`polkadot-js` extension](https://github.com/PolkaGate/polkagate-extension) Polkagate forked from. The keystore uses the standard Substrate PKCS#8 JSON format, which carries a crypto-type discriminator and could in principle encode a new variant — but no such variant exists and no extension mechanism lets an outside party add one.

## Protocol PQC

**Rating: N/A** ➖

Protocol PQC measures whether a wallet signs user transactions with a chain's own protocol-level post-quantum signature scheme. Polkagate's footprint is Substrate-first — the Polkadot relay chain, Kusama, their testnets, and the Polkadot/Kusama parachain set — and none of the chains in its marketed set provide a protocol-level post-quantum signature scheme for user transactions. With no applicable chain in its supported set and no in-flight integration work toward one, this column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

Contract PQC Support asks whether the wallet signs with a post-quantum signature verified by on-chain bytecode, or whether such integration is publicly in flight. Polkagate has nothing shipping here today: no Polkadot or Kusama chain it supports has a live, deployed on-chain post-quantum verifier, and no post-quantum signature flows through the wallet.

The forward-looking element is an ecosystem one. A post-quantum signature pallet for Polkadot — built around ML-DSA — sits on the Web3 Foundation's roadmap. Because Polkagate inherits its cryptography from the shared Polkadot-ecosystem libraries, a chain that adopted such a pallet would give Polkagate a path to support post-quantum signing without re-architecting the wallet. Polkagate's chain-native account-abstraction surface is also unusually deep: it exposes Substrate multisig, regular proxies, pure proxies, and on-chain social recovery directly in-wallet, more of these primitives than its peers — so if a parachain runtime added post-quantum policy enforcement at the proxy layer, the wallet's existing UX would be well placed to drive it.

### Current state

No on-chain post-quantum verifier is live on any chain Polkagate supports, and the wallet signs no post-quantum-verified transactions.

### Planned future work

The relevant infrastructure is the roadmapped Polkadot post-quantum signature pallet; the wallet would inherit pallet support once it lands. No Polkagate-specific pull request or integration branch targeting that pallet was located — the in-flight work is upstream of the wallet, not within it.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Polkagate in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

PolkaGate is a small, community-led open-source project with no corporate parent and no DAO at the wallet level. Funding flows through grants and Polkadot Treasury OpenGov referenda rather than venture capital. Code changes are made through public pull requests on the [`polkagate-extension` repository](https://github.com/PolkaGate/polkagate-extension); the [GitHub organization](https://github.com/PolkaGate) is the primary surface for tracking development. There is no native Polkagate token.

A PQC commitment from this project would most plausibly surface either as a Polkagate GitHub issue or pull request, or as ecosystem-level activity in the [W3F grants ledger](https://github.com/w3f/Grants-Program). No dated, on-record PQC milestone published by the project was found.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
