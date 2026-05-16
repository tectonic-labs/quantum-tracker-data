# Gero Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Gero Wallet |
| **Vendor** | A.D. Labs |
| **Category** | Software |
| **Custody model** | EOA self-custody — a BIP-39 mnemonic with Cardano CIP-1852 / Ed25519-BIP32 derivation, with optional Ledger, Trezor, or Keystone hardware co-sign. No native MPC. |
| **Website** | https://gerowallet.io/ |
| **GitHub** | https://github.com/Gero-Labs |
| **Twitter / X** | https://x.com/gerowallet |
| **Platforms** | Browser extension for Chrome, Edge, and Brave. Firefox, iOS, and Android are marketed as "coming soon" and are not shipping yet. |
| **Open source** | Closed-source today, with an Apache-2.0 release in progress under a community-funded open-sourcing initiative. |
| **First release** | The original Gero Wallet first shipped circa 2021; the present-day wallet is a rebuild by the current vendor begun after an August 2024 brand and IP acquisition. |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Gero Wallet is a Cardano-ecosystem browser extension that signs transactions with a fixed Ed25519-BIP32 keystore. It supports Cardano today, with Midnight marketed as "coming soon" and Apex Fusion listed as available. As of the information in this report, no post-quantum signing path ships in the wallet, and no public statement or roadmap from the vendor on post-quantum cryptography has been located. The wallet binary itself is currently closed-source; the vendor has a [community-funded proposal](https://projectcatalyst.io/funds/13/cardano-open-developers/gerowallet-open-sourcing-gerowallet) to release it under Apache-2.0, with the first of three milestones complete and the open-source release milestone in progress.

The post-quantum discussion in the Cardano ecosystem is being driven at the chain layer through Cardano Improvement Proposals — [CIP-1144](https://github.com/cardano-foundation/CIPs/pull/1144) (a survey of post-quantum signature approaches) and [CIP-1175](https://github.com/cardano-foundation/CIPs/pull/1175) (a quantum-secure settlement layer proposal). Both are in CIP discussion and are governance-gated; neither is reflected in any Gero product roadmap.

## Proposed and Implemented PQC Algorithms

Gero Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

No chain that Gero Wallet supports has a protocol-level post-quantum signature scheme, and the wallet exposes no contract-level or off-chain post-quantum mechanism, so there is no production surface for a post-quantum posture to attach to. The vendor has published no statement, roadmap, or commitment on post-quantum cryptography, and none was located in the wallet's blog, the [Cardano Forum](https://forum.cardano.org/t/exploring-cardano-blockchain-security-with-adam-of-cardano-shield-gero-wallet/129980), or the wallet's [Twitter / X account](https://x.com/gerowallet).

## Crypto Agility

**Rating: No** ❌

Gero Wallet ships a fixed Cardano Ed25519-BIP32 signer with no plugin or extension API that would let a new signature scheme be added without a vendor release. Adding an alternative signing algorithm would require an A.D. Labs change to both the wallet client and its underlying Cardano serialization substrate. The wallet does expose a CIP-30 dApp connector, but that is an outbound interface for Cardano dApps to request signatures from Gero — it is not a mechanism for extending the wallet with new chains, accounts, or signing schemes.

The wallet binary is closed-source today, so the wallet client cannot currently be community-forked to add such support. The vendor has a [community-funded open-sourcing proposal](https://projectcatalyst.io/funds/13/cardano-open-developers/gerowallet-open-sourcing-gerowallet) to release the wallet under Apache-2.0; its first milestone (codebase preparation) is marked complete and the open-source-release milestone is in progress, having moved past its originally stated March 2026 target. The vendor's supporting infrastructure libraries on [its GitHub organization](https://github.com/Gero-Labs) — such as [`maestro-java-client`](https://github.com/Gero-Labs/maestro-java-client) and [`blockfrost-java`](https://github.com/Gero-Labs/blockfrost-java) — are already published under permissive licenses, but these are indexer and SDK components rather than the wallet client itself.

**Current state:** The signer is fixed and the wallet code is not publicly available, so there is no in-wallet or community path to add a new signature scheme without a vendor release.

**Planned future work:** No crypto-agility or post-quantum work is on the vendor's published roadmap. If the open-sourcing proposal completes and the wallet binary lands under Apache-2.0, the wallet would become community-forkable.

## Protocol PQC

**Rating: N/A** ➖

Protocol PQC measures whether the wallet signs user transactions with a chain's protocol-level post-quantum scheme. None of the chains Gero Wallet supports — Cardano, Midnight, or Apex Fusion — has a protocol-level post-quantum signature scheme for user transactions, so this column does not apply. Cardano's own post-quantum work is at the proposal stage in the CIP process and has not been activated.

## Contract PQC Support

**Rating: N/A** ➖

Contract PQC Support measures whether the wallet signs with a post-quantum signature verified by on-chain smart-contract bytecode. Cardano has Plutus and Aiken smart contracts, but its on-chain cryptographic primitives are classical (Ed25519, secp256k1 ECDSA and Schnorr, BLS12-381, and hash functions), and no on-chain post-quantum verifier has been located on any chain Gero supports. Cardano also has no generalized account-abstraction layer in the EVM ERC-4337 sense. With no deployed on-chain post-quantum primitive for the wallet to route through, this column does not apply.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Gero Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Gero Wallet is developed by A.D. Labs, a private company that acquired the Gero brand and intellectual property circa August 2024 and rebuilt the wallet. Product decisions and security posture are set internally by the vendor.

The wallet has an associated Cardano native token, GERO, which the vendor's public materials describe as carrying a governance role for token holders. No DAO charter, governance forum, or on-chain proposal history for the wallet was located, so the depth of that governance role is not established here.

Security reports are routed through the vendor's support address (`support@gerowallet.io`) per the [Chrome Web Store listing](https://chromewebstore.google.com/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe). No public bug-bounty platform was located. No publicly disclosed independent audit of the Gero wallet codebase has been located; the vendor's open-sourcing proposal cites auditing as a goal of the planned open-source release. A reader tracking the vendor's post-quantum posture should watch the [official site](https://gerowallet.io/) and [GitHub organization](https://github.com/Gero-Labs), where a wallet source release or any post-quantum commitment would surface.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
