# Lace — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Lace |
| **Vendor** | Input Output Global (IOG) |
| **Category** | Software |
| **Custody model** | Self-custody EOA: a BIP-39 mnemonic with Cardano CIP-1852 / Ed25519-BIP32 derivation and Bitcoin BIP-32 / BIP-44 derivation. Optional Ledger / Trezor / Keystone hardware co-sign. No native MPC. |
| **Website** | https://www.lace.io/ |
| **GitHub** | https://github.com/input-output-hk/lace |
| **Platforms** | Browser extension (Chrome, Edge, Brave, Firefox) and mobile (iOS, Android). No first-party desktop wallet — Daedalus is IOG's separate full-node desktop product. |
| **Open source** | Open source — Apache-2.0 for the IOG Cardano stack. |
| **First release** | 2023 (mainnet beta; previewed at the 2022 Cardano Summit). |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Lace is IOG's first-party light wallet for Cardano, extended to native Bitcoin in 2024. It ships a fixed signing surface — Ed25519-BIP32 for Cardano transactions and secp256k1 ECDSA / Schnorr for Bitcoin — and absorbed the Nami wallet, which now lives inside Lace as "Nami Mode." No post-quantum signing path ships in Lace today, and no Lace-product-specific post-quantum roadmap has been published. IOG's post-quantum work is currently positioned at the Cardano chain-research level — through community improvement proposals and a lattice-cryptography research initiative — rather than as a wallet-product commitment.

Because both of the chains Lace supports, Cardano and Bitcoin, are still at the proposal and discussion stage for any protocol-level post-quantum signature scheme, several rubric columns do not yet apply to Lace. The columns that remain in scope reflect that no committed post-quantum integration work was found for the wallet itself.

## Proposed and Implemented PQC Algorithms

Lace does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

This column does not apply to Lace in its current form. No Lace-product-team-authored public statement on post-quantum cryptography was located, and the chains Lace supports do not yet expose a protocol-level post-quantum signature scheme, so there is no wallet-level posture to assess. IOG's published post-quantum discussion runs at the Cardano chain-research level — through community improvement proposals such as [CIP-1144](https://github.com/cardano-foundation/CIPs/pull/1144), which surveys post-quantum signature approaches, and [CIP-1175](https://github.com/cardano-foundation/CIPs/pull/1175), a quantum-secure settlement layer proposal, alongside an earlier [CIP-441](https://github.com/cardano-foundation/CIPs/pull/441) draft on post-quantum signatures and native wallets. None of these proposals name Lace as an implementation target. They govern the Cardano chain, not the Lace product, and Lace's own FAQ and repository do not reference post-quantum or quantum-resistant cryptography.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Lace in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Protocol PQC

**Rating: N/A** ➖

No chain Lace supports has a protocol-level post-quantum signature scheme, so this column does not apply. Lace operates on Cardano and Bitcoin; neither chain currently accepts a post-quantum transaction signature at the protocol layer. Cardano's potential post-quantum schemes are at the community-proposal and discussion stage, and Bitcoin's are likewise pre-activation. With no protocol-level post-quantum signing available on either supported chain, there is nothing for the wallet to sign against.

## Contract PQC Support

**Rating: N/A** ➖

Neither chain Lace supports offers a deployed on-chain post-quantum verification primitive, so this column does not apply. Cardano's Plutus and Aiken smart contracts provide cryptographic built-ins limited to classical schemes and hashes, with no deployed post-quantum verifier, and Bitcoin offers only limited Script with no generalized smart-account model. There is therefore no on-chain contract path through which Lace could route a post-quantum signature.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Lace in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Lace is a first-party product of Input Output Global (IOG), a private company that builds and maintains the Cardano technology stack. Lace product decisions, feature roadmap, and security posture are set internally by IOG; there is no DAO or on-chain governance over the wallet itself, and there is no Lace governance token.

Cardano *chain* governance is conducted on-chain through the Voltaire era, where delegated representatives, the Constitutional Committee, and stake pool operators vote on community improvement proposals and hard-fork activations. That process governs the chain, not the wallet — but it is where any chain-level post-quantum decision affecting Lace would surface. The relevant proposals are tracked publicly in the [Cardano CIP repository](https://github.com/cardano-foundation/CIPs/pull/1144).

Security disclosures for Lace are routed through IOG's support channels and the [Lace GitHub repository](https://github.com/input-output-hk/lace). Lace has been audited by independent firms as part of IOG's standard pre-mainnet review process; specific firms, dates, and report URLs were not established by the source material. IOG has not published a dated, on-record post-quantum milestone for the Lace product.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
