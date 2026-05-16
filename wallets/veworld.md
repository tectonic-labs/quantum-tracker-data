# VeWorld — Public PQC Readiness Report

| | |
|---|---|
| **Name** | VeWorld Mobile Wallet |
| **Vendor** | VeChain Foundation |
| **Category** | Software |
| **Custody model** | EOA self-custody (BIP-39 mnemonic), with optional Ledger hardware co-sign and an opt-in Privy-backed embedded smart-account flow. |
| **Website** | https://www.veworld.net/ |
| **GitHub** | https://github.com/vechain/veworld-mobile |
| **Platforms** | iOS and Android mobile apps; Chromium browser extension (Chrome, Brave, Edge, Opera). |
| **Open source** | Mobile client is open source under the MIT license; the browser extension has no public source repository. |
| **First release** | 2023 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

VeWorld is the VeChain Foundation's official wallet for the VeChainThor blockchain, available as iOS and Android apps and a Chromium browser extension. It is the active first-party successor to two now-deprecated Foundation wallets (VeChain Sync / Sync2 and VeChainThor Mobile), and is the product line where any future VeChain wallet features would land first. VeWorld signs every VeChainThor transaction, certificate, and [VIP-191 fee-delegation](https://docs.vechain.org/core-concepts/transactions/meta-transaction-features/fee-delegation/designated-gas-payer-vip-191) request with classical secp256k1 ECDSA, the same scheme VeChainThor inherits from Ethereum.

No post-quantum signing path ships in VeWorld today, and no public VeChain Foundation statement on post-quantum migration could be located. The [Hayabusa hard fork](https://vechainofficial.medium.com/vechain-renaissance-why-hayabusa-matters-3f344e3814be) (2 December 2025) was a consensus and tokenomics upgrade — DPoS, StarGate NFT staking, dynamic VTHO rewards — and explicitly did not include a post-quantum component. VeWorld's wallet posture is therefore largely bounded by the underlying chain: VeChainThor ships no post-quantum primitives at the protocol or precompile layer, so there is currently no chain-side surface for the wallet to engage with.

## Proposed and Implemented PQC Algorithms

VeWorld does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

This column does not apply to VeWorld in its current form. No public VeChain Foundation statement on post-quantum migration — no roadmap item, [VeChain Improvement Proposal](https://github.com/vechain/VIPs), blog post, or social-media thread — could be located. The Foundation's public communication remains anchored to enterprise, supply-chain, and sustainability themes, and most recently to the Hayabusa DPoS migration. With neither a published commitment nor an explicit deprioritization on record, there is no stance to characterize.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for VeWorld in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

The wallet hard-codes secp256k1 ECDSA through the `thor-devkit` and `@vechain/sdk-core` libraries and ships no plugin, extension, or Snap-equivalent API for adding a new signing algorithm. The keystore format is a standard BIP-39 mnemonic with VeChain HD derivation. Adding a new signature scheme would require a code change to the [mobile client](https://github.com/vechain/veworld-mobile) and a coordinated change to the browser extension client, and — more fundamentally — a chain-side scheme for VeChainThor to verify against.

## Protocol PQC

**Rating: N/A** ➖

VeWorld is a single-ecosystem client that supports only VeChainThor and no other chain. VeChainThor has no protocol-level post-quantum signature scheme — consensus rules accept only classical secp256k1 transaction signatures. Because none of the chains VeWorld supports offers a protocol-level post-quantum signing path, this column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

VeChainThor ships no on-chain post-quantum primitive — no precompile and no identified post-quantum verifier contract — so VeWorld signs nothing today that a smart contract verifies post-quantum. What places this column above "Not Engaged" is an architectural surface rather than a delivered feature.

**Current state.** Through [VeChain Kit](https://docs.vechainkit.vechain.org/hooks/wallet) and the `@vechain/embedded-wallet-sdk` package, VeWorld can interact with a Privy-backed embedded smart-account when a dApp opts in (with passkey linking enabled). In that flow the user's key is gated by a WebAuthn passkey and the on-chain identity is a smart-account. This is opt-in per dApp and is not the default VeWorld experience; the default user remains a single-party EOA. Critically, the smart-account's on-chain settlement still verifies a classical secp256k1 signature — the passkey gates an embedded EOA, it is not itself a chain-verified signer. This is a smart-account user experience layered over a classical signer, not a chain-level account-abstraction verifier framework.

**Planned future work.** No published plan to host a post-quantum verifier in this flow could be located. The intel notes only that, because VeChainThor is EVM-compatible, the Privy-backed smart-account path is the closest routing surface in the VeChain ecosystem that could in principle reach a post-quantum verifier contract were one ever deployed. There is no public evidence the Foundation is pursuing this.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for VeWorld in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

VeWorld's off-chain surfaces all use classical cryptography: standard browser and OS TLS to VeChainThor REST nodes and Foundation backend infrastructure, WalletConnect v2 (Noise plus classical ECC) for mobile-to-dApp pairing, and P-256 WebAuthn passkeys for app and extension unlock. The wallet has no native MPC or threshold-signing component. No post-quantum-protected transport, handshake, or backup mechanism was identified.

## Vendor & Governance

VeWorld is published by the VeChain Foundation, a Singapore-registered non-profit that governs the VeChainThor blockchain and sets product direction for the wallet. Wallet client governance is separate from protocol governance: VeChainThor's chain rules are governed through [VeChain Improvement Proposals](https://github.com/vechain/VIPs), which do not cover VeWorld's UX or roadmap. Product direction for VeWorld is set by the Foundation directly; any post-quantum commitment would most plausibly surface through the Foundation's public channels, a VIP (for the chain-side change a wallet PQC feature would depend on), or commits and release notes in the public [mobile repository](https://github.com/vechain/veworld-mobile).

On security review, the VeChain product site references a CertiK security audit of VeWorld; a specific audit report URL and date could not be located. No canonical VeWorld-specific bug-bounty or security-disclosure page could be located on the product site or in the mobile repository. No dated, on-record post-quantum milestone published by the Foundation was found.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
