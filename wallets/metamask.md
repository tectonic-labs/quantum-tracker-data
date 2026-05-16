# MetaMask — Public PQC Readiness Report

| | |
|---|---|
| **Name** | MetaMask |
| **Vendor** | Consensys |
| **Category** | Software |
| **Custody model** | EOA seed phrase by default; MPC-TSS for Embedded Wallets; opt-in smart-contract accounts via the Smart Accounts Kit. |
| **Website** | https://metamask.io/ |
| **GitHub** | https://github.com/MetaMask |
| **Platforms** | Browser extension (Chrome, Firefox, Edge, Brave, Opera) and mobile (iOS, Android); a Portfolio web app and Embedded Wallets SDK round out the surface. No standalone desktop app. |
| **Open source** | Source-available under a custom proprietary "MetaMask License" (free for non-commercial use and for commercial use under 10,000 monthly active users; a commercial license is required above that). Several supporting modules ship separately under MIT. |
| **First release** | 2016 (browser extension). |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | Yes | ✅ | Shipped |
| Protocol PQC | No | ❌ | Not Engaged |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

_PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today._

MetaMask is the most widely used Ethereum-ecosystem wallet, shipping as a browser extension and mobile app and supporting roughly two dozen networks across EVM chains plus native Solana and Bitcoin. Its signing today is entirely classical: ECDSA on secp256k1 for EVM and Bitcoin transactions, Ed25519 for Solana, with Schnorr/Taproot for Bitcoin announced as still to come. No post-quantum signing path ships in the wallet today, and no public Consensys roadmap, blog post, or position paper on quantum migration could be found.

Where MetaMask is structurally interesting for post-quantum work is its extensibility. The [MetaMask Snaps](https://docs.metamask.io/snaps/) platform and its [Keyring API](https://docs.metamask.io/snaps/reference/keyring-api/) let a third-party module register a new account type with its own signing surface — the same mechanism that brought Solana, Cosmos, and other non-EVM chains into the wallet. Separately, MetaMask's [Smart Accounts Kit](https://docs.metamask.io/smart-accounts-kit/) ships ERC-4337 and EIP-7702 smart-account plumbing, including an EIP-1271 signature-verification hook that can route through arbitrary on-chain verifier bytecode. Both are the plumbing through which a post-quantum signature scheme could reach production without MetaMask shipping a new core release.

## Proposed and Implemented PQC Algorithms

MetaMask does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

This column does not apply to MetaMask's current record. No public Consensys post-quantum roadmap, commitment, shipped code, or explicit deprioritization statement could be located — searches for MetaMask- or Consensys-authored quantum-migration material returned nothing, and the vendor's 2025 product-update post contains no quantum-related line items. With no published position to evaluate either way, there is no stance to rate.

## Crypto Agility

**Rating: Yes** ✅

MetaMask's own code can accept a new signature scheme without the vendor shipping a new release. The [Snaps Keyring API](https://docs.metamask.io/snaps/reference/keyring-api/) lets a third-party Snap register an account type that handles its own key material and exposes its own signing methods — the documented mechanism behind the wallet's non-EVM chain support. A Snap can return signatures over arbitrary algorithms through the keyring request flow, so a post-quantum account type is mechanically possible on the platform as it stands.

**Current state.** The Keyring API is in production and already hosts non-secp256k1 schemes; the Solana, Cosmos, and other interop Snaps are live examples of account types with signing surfaces the core wallet did not ship. The core keystore — a BIP-39 seed with BIP-32 HD derivation over secp256k1/Ed25519 masters — is itself not extensible to non-hierarchical or stateful key schemes, so a hash-based stateful scheme would need a Snap to manage its own external state store. The friction for a post-quantum account type is dapp-facing rather than wallet-facing: MetaMask's chain-method catalog (`personal_sign`, `eth_signTransaction`, `eth_signTypedData_v4`, `eth_signUserOperation`) is EVM-shaped and assumes secp256k1 ECDSA semantics on the dapp-facing surface.

**Planned future work.** No roadmap mention of post-quantum primitives could be located; the publicly visible roadmap emphasizes multichain expansion, Smart Accounts, Embedded Wallets, and institutional custody.

## Protocol PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for MetaMask in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Contract PQC Support

**Rating: Yes-but** *️⃣

MetaMask ships the smart-account architecture through which an on-chain post-quantum verifier could be authorized, but does not yet ship or integrate a deployed post-quantum primitive. The [Smart Accounts Kit](https://docs.metamask.io/smart-accounts-kit/) provides an ERC-4337-compliant smart-contract account implementation, and MetaMask has deployed an [EIP-7702 Delegator contract on Ethereum mainnet](https://etherscan.io/address/0x63c0c19a282a1b52b07dd5a65b58948a07dae32b) that upgrades EOAs into smart accounts. These smart accounts can validate signatures through EIP-1271, meaning any signature scheme verifiable in EVM bytecode could be plugged in by a dapp.

**Current state.** The architectural plumbing is live across MetaMask's EVM networks: ERC-4337, EIP-7702, the Smart Accounts Kit, and EIP-1271 verifier hooks are all in production. What is not present is engagement with an actually-deployed on-chain post-quantum primitive — MetaMask itself does not ship a post-quantum verifier contract, and no UI or ceremony for an on-chain post-quantum mechanism (such as Solana's Winternitz Vault, which exists on Solana mainnet) is exposed. On chains without generalized account abstraction in MetaMask's integration — Solana, Bitcoin, TRON — this contract route is not available. The capability is real but the production integration is not there yet.

**Planned future work.** No dated, on-record milestone for a post-quantum verifier integration could be located.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for MetaMask in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

MetaMask is a wholly-owned product of Consensys, a private corporation; it is company-led with no DAO and no token-based proposal process. Decisions such as the 2020 move from an MIT license to the proprietary MetaMask License are made unilaterally by the company. Product announcements are disclosed through the vendor's news channel at https://metamask.io/news/ ; that channel is where a post-quantum commitment would be expected to surface, and as of this report none has.

Security disclosures are handled through a [HackerOne bug bounty program](https://hackerone.com/metamask). The wallet and its Snaps and smart-account contracts have been audited by multiple firms over time, though there is no single canonical audit page; dated audit reports are scattered across the project's repositories.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
