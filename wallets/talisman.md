# Talisman — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Talisman |
| **Vendor** | Talisman Co Pty Ltd (Melbourne, Australia) |
| **Category** | Software |
| **Custody model** | EOA — single-party self-custody from a BIP-39 mnemonic, with optional hardware co-sign via Ledger or Polkadot Vault. No native MPC. |
| **Website** | https://talisman.xyz/ |
| **GitHub** | https://github.com/TalismanSociety |
| **Twitter / X** | https://x.com/wearetalisman |
| **Platforms** | Browser extension (Chrome, Brave, Arc, Firefox, Edge), plus a companion non-custodial web portal at app.talisman.xyz. No mobile or desktop-native app. |
| **Open source** | Open source — the wallet extension is GPL-3.0. |
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

Talisman is a design-led, open-source browser-extension wallet for the Polkadot ecosystem, with additional support for Ethereum and EVM chains, Solana, and Bittensor. As of the information date for this report, no public statement from the vendor on post-quantum cryptography has been located — no roadmap, blog post, position paper, or audit-report mention scoping quantum migration of the wallet. The wallet's signing surface is entirely classical elliptic-curve cryptography: Schnorrkel/sr25519, Ed25519, and ECDSA secp256k1.

The one forward-looking signal worth noting is upstream rather than wallet-side. Talisman builds on the shared `@polkadot/util-crypto` library and the Substrate `MultiSignature` format; if the Polkadot ecosystem adds a post-quantum signature variant at that shared layer, Talisman would inherit it. No such upstream change has shipped, and no Talisman-side integration work has been located.

## Proposed and Implemented PQC Algorithms

Talisman does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

Talisman's most recent public roadmap document is its 2025 "DeFAI" litepaper, whose forward-looking items — a smart/AA wallet, agent authentication via session keys, and an agent marketplace — are AI- and UX-shaped rather than cryptography-migration-shaped. No post-quantum roadmap, commitment, shipped code, or explicit deprioritization statement has been located from the vendor, so there is no published stance to characterize. The wallet's [documentation](https://docs.talisman.xyz/) and [GitHub organization](https://github.com/TalismanSociety) are the places a future statement would surface.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Talisman in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Protocol PQC

**Rating: N/A** ➖

Protocol PQC measures whether the wallet signs user transactions with a chain's protocol-level post-quantum signature scheme on a post-quantum-native chain it supports. Talisman's [supported chains](https://talisman.xyz/) span the EVM, Substrate, Solana, and Bittensor ecosystems, and none of them expose a protocol-level post-quantum signature scheme for user transactions. With no such chain in its footprint, this column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

Contract PQC Support measures whether the wallet can sign with a post-quantum signature that on-chain bytecode verifies, or whether such integration is publicly in flight. Talisman ships no such capability today: there is no deployed post-quantum verifier on any contract surface it touches, and the wallet does not engage Solana's hash-based Winternitz Vault. Its account-abstraction story is strongest on Substrate, where chain-native primitives — `pallet-multisig` and `pallet-proxy` — give policy levers that a runtime upgrade could later bind to a post-quantum scheme; Talisman also ships [Signet](https://github.com/TalismanSociety/signet-web), a dedicated Polkadot multisig coordination platform. On the EVM side it presents a standard MetaMask-compatible provider with no first-party ERC-4337 or smart-account plumbing.

**Current state.** The "in progress" rating reflects an upstream path rather than shipped wallet code. A post-quantum signature pallet for Polkadot is on the Web3 Foundation roadmap; because Talisman builds on the shared Substrate and `@polkadot/util-crypto` stack, it would inherit pallet-level support if that work lands. No in-flight Talisman pull request implementing such support has been located.

**Planned future work.** The DeFAI litepaper names a "Smart / AA wallet" as a future roadmap item, but no implementation has shipped and the litepaper does not name post-quantum cryptography as a design constraint. The concrete forward signal is the upstream Web3 Foundation pallet work; how and when Talisman would consume it has not been publicly stated.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Talisman in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Talisman is developed by Talisman Co Pty Ltd, a private company based in Melbourne, Australia. The wallet is open source under GPL-3.0, developed in the open at the [TalismanSociety GitHub organization](https://github.com/TalismanSociety), with the [main wallet repository](https://github.com/TalismanSociety/talisman) as the canonical home; GitHub issues and pull requests there are the surface for wallet code changes. Product direction is communicated through the [vendor documentation](https://docs.talisman.xyz/), including the DeFAI litepaper, which is where a post-quantum commitment would most likely first appear.

Talisman has an unusually well-documented audit history for a wallet in this ecosystem — four publicly published reports: a [Verichains keyring audit](https://github.com/verichains/public-audit-reports/blob/main/Verichains%20Public%20Audit%20Report%20-%20Talisman%20Keyring%20-%20v1.0.pdf) (2025-03), a [Hashlock keyring penetration test](https://hashlock.com/wp-content/uploads/2025/01/Talisman-Keyring-Penetration-Test-Report-Final-Report-v2.pdf) (2025-03), a [Hashlock full extension penetration test](https://hashlock.com/wp-content/uploads/2025/01/Talisman-Penetration-Test-Report-Final-Report-v1.pdf) (2024-12), and a [ChainTroopers security assessment](https://github.com/chaintroopers/public_reports/blob/main/Talisman_Wallet_SecAssessment_report-v1.2_4.pdf) (2023-04). All four evaluate the classical signing stack; none scope quantum-resistance posture. The [security documentation](https://docs.talisman.xyz/talisman/about/security) collects this audit history. No dated, on-record post-quantum milestone published by the vendor has been located.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
