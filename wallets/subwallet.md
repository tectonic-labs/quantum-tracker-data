# SubWallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | SubWallet |
| **Vendor** | Koni Studio |
| **Category** | Software |
| **Custody model** | Single-party self-custody using a BIP-39 mnemonic (EOA). Optional hardware co-signing via Ledger, Polkadot Vault, or Keystone. No native MPC. |
| **Website** | https://www.subwallet.app/ |
| **GitHub** | https://github.com/Koniverse |
| **Platforms** | Browser extension (Chrome, Brave, Firefox, Edge), iOS and Android mobile apps, and a companion web dashboard. No desktop-native build. |
| **Open source** | The browser extension is open source under Apache License 2.0. The mobile codebase's license was not independently confirmed. |
| **First release** | 2022 |

## PQC Readiness Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

SubWallet is a multi-ecosystem self-custody wallet from Koni Studio, built originally as a fork of the polkadot-js browser extension and now widely used as a daily-driver wallet across the Polkadot, Ethereum, TON, Cardano, and Bitcoin ecosystems. Its headline feature is the "unified account" — one mnemonic that derives addresses for all five ecosystems at once. Every signing scheme the wallet exposes today (sr25519, Ed25519, ECDSA secp256k1, BIP-340 Schnorr, and Cardano Ed25519) is classical elliptic-curve cryptography.

As of the information date below, no public statement, roadmap, blog post, or code from SubWallet or Koni Studio addressing post-quantum cryptography has been located. The wallet ships no post-quantum signing path today. The one forward-looking signal is upstream rather than first-party: SubWallet inherits the shared `@polkadot/util-crypto` library, so a future post-quantum scheme adopted across the Polkadot ecosystem would propagate to SubWallet without a bespoke integration — but no such upstream change exists yet, and no in-flight SubWallet pull request implementing one has been found.

## Proposed and Implemented PQC Algorithms

SubWallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

No chain SubWallet ships in its default chain list has a protocol-level post-quantum signature scheme, and no public statement from SubWallet or Koni Studio on post-quantum migration has been located. This column does not apply to the wallet in its current form: there is no published vendor position — neither a commitment nor an explicit deprioritization — to characterize.

## Crypto Agility

**Rating: No** ❌

SubWallet already discriminates between several classical signature schemes per account — sr25519, Ed25519, and ECDSA on the Substrate side, plus ECDSA and BIP-340 Schnorr for Bitcoin and Ed25519 for Cardano — and its Substrate keystore JSON format carries a `crypto` type discriminator. In principle that gives the codebase a pattern an additional scheme could extend. In practice, the wallet ships a fixed set of signers ([SubWallet-Extension](https://github.com/Koniverse/SubWallet-Extension)); there is no plugin sandbox, no third-party signer API, and no runtime keyring model that would let a new signature scheme be added without the vendor shipping a new release. Adding a post-quantum scheme would also collide with the unified-account design: large post-quantum keys are not derivable from a 12- or 24-word BIP-39 mnemonic the way classical EC keys are, so a post-quantum account would need its own derivation handling rather than slotting into the existing one-mnemonic model.

**Current state.** New signature support requires a vendor code change. The extension is Apache-2.0 ([SubWallet-Extension](https://github.com/Koniverse/SubWallet-Extension)), so a community fork is legally straightforward, but a fork is not the same as a pluggable, agile design in the shipped product.

## Protocol PQC

**Rating: N/A** ➖

This column measures whether the wallet signs user transactions with a chain's protocol-level post-quantum scheme on a post-quantum-native chain it supports. SubWallet's default chain list spans the Polkadot, Ethereum, TON, Cardano, and Bitcoin ecosystems, and none of those chains provide a protocol-level post-quantum signature scheme for user transactions. With no supported chain offering such a scheme, the column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

This column tracks whether the wallet signs with a post-quantum signature verified by on-chain smart-contract bytecode, or whether such integration is publicly in flight. SubWallet supports a broad contract surface: Substrate's chain-native account-abstraction primitives (`pallet-multisig`, `pallet-proxy`, and Pure Proxy accounts — see the [Polkadot multisig](https://wiki.polkadot.network/docs/learn-account-multisig) and [pure proxy](https://wiki.polkadot.network/docs/learn-proxies-pure) documentation), EVM contracts on Ethereum, its L2s, and Frontier-EVM parachains, ink! contracts on Astar and Aleph Zero, Cardano Plutus contracts, and TON's contract-based account model.

**Current state.** No deployed post-quantum verifier exists on any of these surfaces today, and SubWallet has not shipped a first-party integration with one. On the EVM side the wallet's provider is EOA-shaped — there is no first-party ERC-4337 bundler or paymaster plumbing — so the contract-account path that could host a post-quantum verifier on EVM chains is not natively assisted by the wallet. Substrate's runtime-level account-abstraction primitives are more directly within reach: a parachain runtime upgrade could extend its accepted signature set without coordinating client releases.

**Planned future work.** The Web3 Foundation, which has funded SubWallet's wallet work through its open-grants program ([W3F grants ledger](https://grants.web3.foundation/applications)), is the upstream source of post-quantum research in the Polkadot ecosystem. The path tracked here is that a future post-quantum signature scheme adopted at the Polkadot protocol or pallet level would be inherited by SubWallet through its shared crypto dependency. That is an inherited, ecosystem-level path rather than a SubWallet-specific deliverable: no in-flight SubWallet pull request implementing post-quantum support has been located, and no parachain has shipped such a scheme in production.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for SubWallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

SubWallet is developed by Koni Studio, a Vietnam-based engineering team; the `Koniverse` GitHub organization is the corporate/developer brand and SubWallet is the consumer product brand — both refer to the same entity. Development is open-source maintainer-led under Koni Studio stewardship, with commit access held by Koni Studio engineers alongside ecosystem pull-request contributions. There is no DAO and no token-based governance over the wallet, and as of the information date below there is no native SubWallet token.

Product decisions and code changes surface through the public repositories under the [Koniverse GitHub organization](https://github.com/Koniverse) — chiefly [SubWallet-Extension](https://github.com/Koniverse/SubWallet-Extension), [SubWallet-Mobile](https://github.com/Koniverse/SubWallet-Mobile), and [SubWallet-ChainList](https://github.com/Koniverse/SubWallet-ChainList) — via issues and pull requests. SubWallet is a Web3 Foundation grant recipient, and its grant milestones are visible in the public [W3F open-grants ledger](https://grants.web3.foundation/applications); any post-quantum work pulled into that grant scope would be visible there. The published contact channel is `agent@subwallet.app`. A dedicated public bug-bounty program and any wallet-specific third-party audit reports were not located in this review.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
