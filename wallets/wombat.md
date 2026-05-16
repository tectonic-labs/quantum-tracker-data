# Wombat — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Wombat |
| **Vendor** | Spielworks GmbH (Berlin), trading publicly as PlayMind since a 2024–2025 rebrand. |
| **Category** | Software |
| **Custody model** | Self-custody EOA across all supported chains. There is no seed phrase shown by default; recovery instead relies on an encrypted key backup to the user's own Google Drive or Dropbox account, decrypted with the user's PIN or password. Raw private-key export is gated behind a one-time paid unlock. No MPC, no smart-contract account. |
| **Website** | https://www.wombat.app/ |
| **GitHub** | https://github.com/wombat-tech |
| **Twitter / X** | https://x.com/adoptwombat |
| **Platforms** | Browser extension (Chrome and Chromium-based browsers — Edge, Brave) and iOS / Android mobile, plus an auxiliary web flow for account and NFT management. No standalone desktop app and no hardware device. |
| **Open source** | Proprietary — the wallet client (extension, mobile, web) is closed source. The vendor's public `wombat-tech` GitHub org contains dApp-integration SDKs, not the wallet client itself. |
| **First release** | 2019 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Wombat is a self-custody gaming wallet from Spielworks GmbH (Berlin), distributed as a browser extension and a mobile app. It began in 2019 as an EOS-only wallet and has since grown into a curated multi-chain set anchored on the Antelope ecosystem (EOS, WAX, Telos) plus EVM gaming destinations (Ethereum, Polygon, Base, Arbitrum, Immutable zkEVM, EOS EVM) and Hedera. Its defining design choice is encrypted key backup to the user's own Google Drive or Dropbox in place of a seed phrase.

Wombat signs user transactions with classical schemes on every chain it supports — secp256k1 ECDSA for Antelope and EVM chains, and Ed25519 for Hedera. No Wombat-, Spielworks-, or PlayMind-authored statement on post-quantum cryptography has been located, and none of the chains Wombat supports currently offers a protocol-level post-quantum signature scheme for user transactions.

## Proposed and Implemented PQC Algorithms

Wombat does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

None of the chains Wombat supports — the Antelope ecosystem (EOS, WAX, Telos), the EVM gaming chains (Ethereum, Polygon, Base, Arbitrum, Immutable zkEVM, EOS EVM), or Hedera — currently offers a protocol-level post-quantum signature scheme for user transactions. With no post-quantum signing path available to adopt or decline across its supported set, this column does not apply to Wombat today. No Wombat-, Spielworks-, or PlayMind-authored blog post, roadmap, or white paper addressing quantum migration has been located; the [PlayMind whitepaper](https://whitepaper.playmind.ai/) makes no post-quantum mention in its public sections.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Wombat in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

For context: Wombat ships a fixed signer set — secp256k1 ECDSA for Antelope and EVM chains, Ed25519 for Hedera — with no plugin platform, Snap-style sandbox, or pluggable-signer interface. Adding a new signature scheme would require an internal code change and a new release from Spielworks. The wallet client is also [closed source](https://github.com/wombat-tech), so a third party cannot fork it to add a new scheme. The only documented third-party integration surface is outbound — SDKs that let games embed Wombat as a wallet provider, and a [community Wharf Session Kit plugin](https://github.com/wharfkit/wallet-plugin-wombat) that lets Antelope dApps connect to Wombat — and none of those surfaces lets a third party add a new signing algorithm.

## Protocol PQC

**Rating: N/A** ➖

Wombat's supported chains — the Antelope ecosystem, the EVM gaming chains, and Hedera — do not currently offer a protocol-level post-quantum signature scheme that a wallet can sign user transactions with. With no PQC-native chain in Wombat's supported set, this column does not apply today.

## Contract PQC Support

**Rating: N/A** ➖

Several of Wombat's supported chains have account-abstraction-style plumbing that could in principle host a contract-deployed signature verifier — Antelope's named-account permission graphs on EOS, WAX, and Telos; ERC-4337 and EIP-7702 on the EVM chains; and multi-signature key structures on Hedera. However, no deployed on-chain post-quantum verifier primitive has been located on any chain Wombat supports, and Wombat does not surface any of this account-abstraction plumbing to the user — it provisions a default single-key account on its onboarding flow and exposes an EOA-shaped provider on EVM. With no deployed contract-level PQC primitive on any supported chain, this column does not apply.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Wombat in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

No post-quantum mechanism was identified anywhere in the wallet's off-chain flow. Transport to RPC endpoints and the vendor backend uses standard browser TLS, and the headline encrypted cloud backup to Google Drive or Dropbox uses classical symmetric encryption derived from the user's PIN or password. Wombat has no MPC custody flow and no documented passkey or WebAuthn unlock path.

## Vendor & Governance

Wombat is built and operated by Spielworks GmbH, a private German company in Berlin that rebranded its public-facing brand to PlayMind during 2024–2025; the legal entity remains Spielworks GmbH. As a private company, Spielworks sets product strategy and the release schedule directly. There is a $WOMBAT gaming and rewards token, but published materials describe it as in-app rewards rather than a governance instrument over the wallet codebase; no DAO or token-holder vote governs the wallet.

Product direction is communicated through Wombat's marketing site and [help center](https://help.wombat.app/) and the [PlayMind whitepaper](https://whitepaper.playmind.ai/); a post-quantum commitment, if one is made, would most naturally surface there. The documented security contact is the standard Wombat support channel and help center. No public bug-bounty program and no public wallet-binary audit reports have been located.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
