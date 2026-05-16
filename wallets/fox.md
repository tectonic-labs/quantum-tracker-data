# Fox Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Fox Wallet |
| **Vendor** | Fox Wallet |
| **Category** | Software |
| **Custody model** | EOA self-custody — BIP-39 seed phrase, single-party local signing. No native MPC/TSS and no documented hardware co-sign. |
| **Website** | https://foxwallet.com/ |
| **GitHub** | https://github.com/foxwallet |
| **Platforms** | Mobile (iOS, Android) flagship; Chrome browser extension with a narrower scope. No standalone desktop app. |
| **Open source** | Partial — the browser extension is MIT-licensed and covers Aleo plus EVM chains; the multi-chain mobile flagship has no public repository and is treated as closed-source. |
| **First release** | 2021 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | No | ❌ | Not Engaged |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Fox Wallet is a multi-chain self-custody wallet whose deepest integrations are in the privacy and zero-knowledge ecosystem — it markets itself as "the world's first Aleo mobile wallet" and carries notable support for Aleo, Iron Fish, Filecoin, and Spacemesh alongside the usual Bitcoin, Ethereum, Solana, Aptos, and Sui coverage. Despite that cryptography-heavy positioning, the wallet ships no post-quantum signing path today. No Fox Wallet statement, roadmap item, or branch addressing post-quantum cryptography has been located across its website, documentation, GitHub organization, or partner ecosystem write-ups.

Every chain Fox Wallet supports signs with classical, pre-quantum schemes: ECDSA over secp256k1 for EVM chains and Bitcoin, Ed25519 for Solana, Aptos, Sui, TON, and Cosmos, and Schnorr over the Aleo curve pair for Aleo. The wallet's privacy-chain depth is worth flagging in quantum terms: the zero-knowledge systems behind Aleo and Iron Fish are themselves pre-quantum, so a future cryptographically relevant quantum computer would defeat them the same way it defeats a transparent signature. That is a chain-side property rather than a wallet decision, but it is the most consequential cryptographic exposure for Fox Wallet's user base.

## Proposed and Implemented PQC Algorithms

Fox Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

Fox Wallet has made no public statement — for or against — on post-quantum cryptography. None of its supported chains expose a protocol-level post-quantum signature scheme that the wallet would be expected to take a position on, and no deployed on-chain post-quantum primitive on those chains is something the wallet is being asked to integrate today. With no live post-quantum surface to engage and no published deprioritization, this column does not apply.

## Crypto Agility

**Rating: No** ❌

Fox Wallet ships a fixed, per-chain signer set with no plugin or extension API. Each chain's signing scheme is hard-coded — there is no swappable signer, no typed signer enum a new scheme could be registered into, and no "register a custom account type" interface. The published GitHub surface (the Aleo wallet adapter, a Solana wallet-adapter fork, the in-app web3 provider) lets external dapps connect *to* the wallet; none of it lets a third party add a new signing algorithm.

The keystore is standard BIP-39 plus BIP-32 / SLIP-0044 / BIP-44 derivation, which is not structured to accommodate alternative key formats. Adding any new signature scheme would require a vendor-shipped release. The MIT-licensed [browser extension](https://github.com/foxwallet/foxwallet-extension) is forkable in principle, but its scope is Aleo plus EVM only; the [multi-chain mobile flagship](https://github.com/foxwallet) — where Bitcoin, Solana, Aptos, Sui, and the privacy-chain support live — has no public repository and cannot be extended externally.

**Current state.** No agility mechanism exists. A new scheme can only arrive through an internal vendor release.

## Protocol PQC

**Rating: N/A** ➖

None of the chains Fox Wallet supports currently enforces a protocol-level post-quantum signature scheme for user transactions. The wallet's chain catalogue is classical end to end, so there is no protocol-level post-quantum scheme for it to sign with. This column does not apply.

## Contract PQC Support

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Fox Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Fox Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Fox Wallet is built by the Fox Wallet team, operating as a privately held company; product decisions are made internally, with no DAO or on-chain governance over the wallet. There is no public roadmap or governance forum where post-quantum commitments would surface — disclosures, when they occur, appear via the wallet's own website and documentation.

Audit history is limited: a CertiK penetration test is published in the vendor's public [security-audit repository](https://github.com/foxwallet/security-audit-certification), with the original report dated 2021. No subsequent audit reports have been located, and that audit predates much of the wallet's later chain expansion. No formal security disclosure venue (such as a bug-bounty program or a dedicated `security@` address) was located in the wallet's documentation.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
