# Flow Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Flow Wallet (formerly Lilico, then Flow Core / Flow Reference Wallet). |
| **Vendor** | Outblock / Flow Foundation. |
| **Category** | Software. |
| **Custody model** | Self-custody over Flow's native multi-key account model; a single ECDSA P-256 key on-device by default (iOS Secure Enclave / Android Keystore), with no native MPC. |
| **Website** | [wallet.flow.com](https://wallet.flow.com/) |
| **GitHub** | [github.com/onflow](https://github.com/onflow) |
| **Platforms** | Chrome browser extension (Chromium-based browsers) and iOS / Android mobile apps. No standalone desktop app and no first-party hardware device. |
| **Open source** | Open source — iOS, Android, and the extension are all public, with the `FRW-monorepo` and `Flow-Wallet-Kit` SDK published under the MIT license on the `onflow` GitHub organization. |
| **First release** | 2022 (as "Lilico"). |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | Yes-but | *️⃣ | In Progress |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Flow Wallet is the open-source, first-party reference wallet for the Flow blockchain. Every transaction it signs today uses classical elliptic-curve cryptography — ECDSA over NIST P-256 by default, with ECDSA over secp256k1 supported by the Flow protocol as an alternative. The default account key is generated and held inside the device's secure element (Apple Secure Enclave on iOS, hardware-backed Android Keystore on Android), which is a meaningful protection against key extraction but does not change the underlying scheme's exposure to a future quantum attacker.

No post-quantum signing path ships in Flow Wallet today, and no published Flow Foundation roadmap, improvement proposal, or statement specific to post-quantum migration was located. The wallet's notable structural feature is Flow's account model itself: Flow accounts are multi-key, weighted, and algorithm-tagged, which means a post-quantum key could in principle be added to an existing account without abandoning it — once the Flow protocol defines an identifier for such an algorithm.

## Proposed and Implemented PQC Algorithms

Flow Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

This column does not apply to Flow Wallet's current evaluation. No public statement from the Flow Foundation or the wallet's maintainers addressing post-quantum cryptography was located — the [Flow Wallet documentation](https://docs.wallet.flow.com/) and the [Flow developer portal](https://developers.flow.com/build/basics/accounts) describe the wallet's security model in classical terms (hardware key residency, anti-phishing) and do not mention a quantum threat. The wallet's security-forward marketing centers on [Secure Enclave key residency](https://docs.wallet.flow.com/features/secure-enclave), which is a classical protection.

## Crypto Agility

**Rating: Yes-but** *️⃣

Flow's protocol design is unusually agile, and Flow Wallet inherits that property. A Flow account is a multi-key entity at the protocol level: it can hold several keys at once, each carrying its own algorithm tag, hash tag, and authorization weight, with a 1000-unit weight threshold governing what combination of keys can authorize a transaction. Accounts already mix P-256 and secp256k1 keys with weighted authorization today. The [Flow account model documentation](https://developers.flow.com/build/basics/accounts) describes this registry, where each key records an algorithm identifier and a hash identifier.

That algorithm-tagged registry is the architectural slot a post-quantum scheme would occupy. Because the registry is additive, a new algorithm identifier could be introduced without disturbing existing keys. The wallet already surfaces the multi-key model — its device-linking feature adds a new key to an existing account when pairing the extension to the mobile app, rather than importing a seed phrase — and a post-quantum public key would slot in as another account-key entry.

**Current state.** The wallet ships a fixed signer set (ECDSA P-256, ECDSA secp256k1, and passkey/WebAuthn) and there is no plugin-style interface for adding new signing algorithms. The `Flow-Wallet-Kit` SDK exposes provider abstractions, but these are abstractions over implementations of the existing classical schemes, not pluggable algorithm slots.

**Planned future work.** No post-quantum algorithm identifier is currently defined in Flow's account-key registry, and no Flow improvement proposal introducing one was located in the [Flow Improvement Proposals repository](https://github.com/onflow/flips). Adding a post-quantum signing algorithm would require both a protocol-level change and a wallet client change. The redeeming structural factor is that the iOS, Android, and extension clients plus the `Flow-Wallet-Kit` SDK are all public and MIT-licensed, so a third party could fork the wallet and propose post-quantum support without vendor consent; no such fork has been located.

## Protocol PQC

**Rating: N/A** ➖

Flow Wallet operates only within the Flow ecosystem, spanning Flow Cadence and Flow EVM as two execution environments on the same chain. No chain Flow Wallet supports has a protocol-level post-quantum signature scheme available for user transactions, so this column does not apply.

## Contract PQC Support

**Rating: N/A** ➖

Flow's account model is itself a form of native account abstraction — Cadence resource accounts support multi-key, weighted authorization, and parent-child account linking, and the Cadence-Owned Account pattern lets one Flow account control a [Flow EVM address](https://developers.flow.com/build/evm/accounts). A Cadence contract could in principle host an on-chain post-quantum verifier, but no such deployed verifier on Flow Cadence or Flow EVM was located, and the wallet ships no interface for one. With no on-chain post-quantum primitive available in the ecosystems Flow Wallet supports, this column does not apply.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Flow Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Flow Wallet is the official first-party reference wallet for the Flow blockchain. It is stewarded by the Flow Foundation as an open-source, MIT-licensed project, with implementation history at Outblock (the team behind the original "Lilico" wallet) and the canonical code now consolidated under the [`onflow` GitHub organization](https://github.com/onflow). No DAO governs the wallet itself.

Flow chain governance runs through the Flow Improvement Proposal process in the [`onflow/flips` repository](https://github.com/onflow/flips); a protocol-level change such as adding a post-quantum algorithm identifier would surface there, and that repository is the place a reader can monitor for such a proposal. The wallet's open-source clients on the `onflow` organization are where any client-side post-quantum work would appear. Security disclosures are directed to the Flow Foundation via the FRW repositories. A specific bug-bounty venue and a published audit history for the wallet could not be confirmed and are omitted here.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
