# Nightly — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Nightly |
| **Vendor** | Nightly Labs |
| **Category** | Software |
| **Custody model** | Self-custody EOA — single-party, BIP-39 seed phrase (24 words by default). Optional Google Drive backup of the encrypted seed, optional Sui zkLogin social-login account, and optional Ledger hardware co-sign. No native MPC. |
| **Website** | https://nightly.app/ |
| **GitHub** | https://github.com/nightly-labs |
| **Platforms** | Browser extension (Chrome, Firefox, Edge, Brave, Opera, and Safari); iOS and Android mobile apps. No standalone desktop app. |
| **Open source** | Proprietary wallet client; some dapp-side adapters and templates are open source. |
| **First release** | 2022 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Nightly is a broad multi-chain self-custodial wallet from Nightly Labs, a Polish team with close ties to the Aleph Zero ecosystem. It ships as a browser extension and on iOS and Android, and markets support for more than 105 networks spanning the Solana (SVM), Aptos and Movement (Move-VM), Sui, EVM, Polkadot/Substrate, Bitcoin, and several other chain families. It signs transactions with the per-chain default scheme — Ed25519 for Solana, Aptos, Sui, and NEAR; sr25519 for the Polkadot family; secp256k1 ECDSA for Bitcoin and EVM chains — and additionally supports the [Sui zkLogin](https://docs.sui.io/concepts/cryptography/zklogin) keyless account flow.

As of this report, Nightly ships no post-quantum cryptography in any production path, and no Nightly-authored statement, roadmap item, or security note on quantum migration was found. Its broad chain coverage does, however, place it next to chain-side post-quantum work that is already on the record — most notably [Aptos AIP-137](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-137.md), an accepted protocol proposal that names wallets among the parties expected to add support — so it is positioned where a future Contract PQC integration would land even though no such integration ships today.

## Proposed and Implemented PQC Algorithms

Nightly does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

PQC Stance does not apply here because no Nightly-published statement on post-quantum cryptography could be located. Searches across the vendor's [main site](https://nightly.app/), the [wallet web surface and blog](https://wallet.nightly.app/), the [user FAQ](https://wallet.nightly.app/faq), and the [`nightly-labs`](https://github.com/nightly-labs) GitHub organization returned no references to post-quantum, quantum-resistant, lattice-based, or hash-based signatures. With neither a commitment nor an explicit deprioritization on the record, there is no published stance to characterize.

## Crypto Agility

**Rating: No** ❌

Nightly hard-codes its signing schemes — Ed25519 for Solana, Aptos, Sui, and NEAR; sr25519 for the Polkadot/Substrate family; secp256k1 ECDSA for Bitcoin and EVM chains — and provides no way to load an alternative signature scheme without the vendor shipping a new release. The wallet client is closed source, so there is no community path to add a new signer. Its most visible developer-facing surface, [Nightly Connect](https://connect.nightly.app/), is a multi-chain dapp-connection protocol — it lets dapps connect to the wallet over a relayer, the way WalletConnect does, rather than letting third parties extend the wallet's set of signing algorithms. The keystore is BIP-39 plus per-chain HD derivation and does not model alternative or stateful signing schemes.

**Current state.** Adding a new signature scheme to Nightly today would require a vendor-side change to the closed-source wallet client. There is no pluggable-signer interface, no plugin or extension marketplace, and no configuration path that an external party could use to introduce a new signing algorithm.

## Protocol PQC

**Rating: N/A** ➖

Protocol PQC does not apply because none of the chains Nightly supports today exposes an active protocol-level post-quantum signature scheme that the wallet could sign user transactions with. Across Nightly's SVM, Move-VM, EVM, Polkadot/Substrate, Bitcoin, and other supported chains, user transactions are authorized with Ed25519, sr25519, or secp256k1 ECDSA. Nightly's catalogue includes Algorand, which uses a post-quantum scheme for in-protocol state proofs, but Algorand user transactions remain Ed25519 and Nightly signs them with Ed25519. With no protocol-level PQC signing path available on any supported chain, there is nothing for this column to measure.

## Contract PQC Support

**Rating: Yes-but** *️⃣

Contract PQC Support measures whether the wallet signs through on-chain smart-contract bytecode that verifies a post-quantum signature, or has such integration publicly in flight. Nightly does not ship any such path today, but its multi-chain footprint places it directly alongside chain-side post-quantum work that is on the record.

**Current state.** Nightly is one of the established Aptos wallets, and Aptos has a formally accepted protocol proposal — [AIP-137](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-137.md), accepted in December 2025 — that specifies an optional hash-based post-quantum account scheme and states that wallets may choose to implement support for it. No Nightly-side announcement, blog post, or roadmap reference to AIP-137 has been located. On the Solana side, a live hash-based on-chain primitive exists — the [Solana Winternitz Vault](https://github.com/deanmlittle/solana-winternitz-vault) — but Nightly ships no user interface for it. Nightly does support Sui's native [zkLogin](https://docs.sui.io/concepts/cryptography/zklogin) keyless flow, an on-chain account-abstraction surface, but that flow is pre-quantum and does not constitute a post-quantum integration.

**Planned future work.** No Nightly-published timeline for adopting any of these on-chain post-quantum mechanisms was found. The chain-side groundwork on Aptos and Solana exists and is public; whether and when Nightly delivers wallet-side support for it is not on the record.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Nightly in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Nightly is published by Nightly Labs, a private Polish company; product decisions, the feature roadmap, and security posture are set by the company team, and there is no DAO or on-chain governance over the wallet. Any PQC commitment would surface through the vendor's own channels — its [main site](https://nightly.app/), the [wallet blog](https://wallet.nightly.app/), the [developer documentation](https://docs.nightly.app/), and the [`nightly-labs`](https://github.com/nightly-labs) GitHub organization, which hosts the open-source dapp adapters, web3 templates, and Nightly Connect protocol components while the wallet client itself remains closed source.

No public security-disclosure venue and no published wallet-software audit reports for Nightly were located at the time of this report.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
