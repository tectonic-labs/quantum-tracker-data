# Suku Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Suku Wallet. |
| **Vendor** | Citizens Reserve, Inc. (operating brand "Suku"). |
| **Category** | Software. |
| **Custody model** | Smart-contract account — a Gnosis Safe multi-sig with an embedded signer keyed off the user's X (Twitter) login; non-custodial per the vendor. |
| **Website** | https://wallet.suku.world/ |
| **GitHub** | https://github.com/SukuLab |
| **Platforms** | Browser extension for Chromium browsers (Chrome, Edge, Brave, Opera). |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Suku Wallet is a browser extension that turns an X (Twitter) handle into a smart-contract wallet, built on a [Gnosis Safe multi-sig substrate](https://wallet.suku.world/security) with account-abstraction routing. The wallet supports three EVM networks — Ethereum, Polygon, and BNB Chain — and signs every transaction with a classical secp256k1 ECDSA key held by an embedded signer bound to the user's X identity.

No post-quantum cryptography ships in Suku Wallet today, and the vendor has published no PQC roadmap or statement. The one column that registers movement is Contract PQC Support, and that registers only because the underlying Gnosis Safe account-abstraction architecture provides a slot where an on-chain post-quantum verifier could one day live — a property inherited from the substrate, not something Suku itself has built or committed to.

## Proposed and Implemented PQC Algorithms

Suku Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

Suku self-describes the wallet as an experimental, still-in-beta product with a small user base, and no Suku- or Citizens Reserve-authored statement on post-quantum cryptography could be located. The [vendor security page](https://wallet.suku.world/security) describes the wallet's multi-sig and account-abstraction architecture and a third-party security audit, but carries no PQC roadmap item. Because the vendor has neither committed to nor explicitly deprioritized post-quantum work in any public material, there is no published stance to evaluate.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Suku Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Protocol PQC

**Rating: N/A** ➖

Suku Wallet supports only standard EVM networks — Ethereum, Polygon, and BNB Chain. None of these chains has a protocol-level post-quantum signature scheme that a wallet could sign user transactions with, so this column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

Suku Wallet is a smart-contract account: every Suku account is a [Gnosis Safe multi-sig with account-abstraction routing](https://wallet.suku.world/security). The Safe substrate implements EIP-1271 `isValidSignature` and supports modules and fallback handlers — the same architectural slot where an on-chain post-quantum signature verifier would be installed. The vendor's [own milestone post](https://medium.com/suku/upgrading-suku-wallet-a-step-closer-towards-account-abstraction-e10fc8e7785c) on its account-abstraction migration, and its [GitHub org](https://github.com/SukuLab) (which includes a fork of Safe's account-abstraction SDK), document this smart-contract-account foundation.

**Current state.** The architectural slot exists, but it is unoccupied. No on-chain post-quantum verifier has been deployed by Suku, and the rating reflects an inherited, undifferentiated architectural readiness rather than any Suku-specific integration. The capability to host a post-quantum verifier comes from the Gnosis Safe ecosystem; Suku ships none of its own.

**Planned future work.** No Suku-authored roadmap line item names post-quantum work for the contract layer. The vendor's published account-abstraction roadmap language emphasizes completing its EIP-4337 migration and adding multi-signer recovery options, not post-quantum verifiers.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Suku Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

Suku Wallet is published by Citizens Reserve, Inc., a private corporation operating under the "Suku" brand; the [parent brand site](https://www.suku.world/) is the company's primary public surface. The wallet binary and its smart-contract architecture are company-led — there is no DAO governing the product. The SUKU ERC-20 token associated with the ecosystem is positioned as a utility token (in-wallet gas payment and NFT-mint privileges), not a governance token over the wallet.

Product information is disclosed through the [vendor security page](https://wallet.suku.world/security), a [Notion-hosted product wiki](https://wiki.suku.world/products/sukuwallet), and the team's [Medium posts](https://medium.com/suku/upgrading-suku-wallet-a-step-closer-towards-account-abstraction-e10fc8e7785c). The security page names Highland Security as having audited and penetration-tested the technology; the underlying Gnosis Safe contracts are audited separately as part of the broader Safe ecosystem. A post-quantum commitment, if one were made, would most plausibly surface in the security page or a Medium post. Readers should consult those venues directly for the current state.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
