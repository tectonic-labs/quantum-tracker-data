# Keplr — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Keplr |
| **Vendor** | Chainapsis (incorporated as KPLR Pte Ltd, Singapore) |
| **Category** | Software |
| **Custody model** | EOA — single user-held BIP-39 seed phrase, with optional Ledger hardware co-sign |
| **Website** | https://www.keplr.app/ |
| **GitHub** | https://github.com/chainapsis/keplr-wallet |
| **Platforms** | Browser extension (Chrome, Firefox, Edge), iOS and Android mobile, plus a non-custodial web dashboard |
| **Open source** | Source-available — the browser extension is Apache 2.0; the mobile codebase is all-rights-reserved, and some proprietary submodules are not published |
| **First release** | 2020 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | Yes-but | *️⃣ | In Progress |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

Keplr is the principal wallet of the Cosmos ecosystem, shipping as a browser extension and mobile app with support for Cosmos/IBC chains plus EVM, Starknet, and Bitcoin ecosystems added between 2024 and 2026. Today every signature it produces is classical: secp256k1 for Cosmos, Ethereum-flavored secp256k1 for EVM, STARK-curve ECDSA for Starknet, and secp256k1 (with Taproot/Schnorr) for Bitcoin. No post-quantum signing path ships in the wallet, and no Keplr- or Chainapsis-authored roadmap, blog post, or position paper on quantum migration was located.

The most material caveat is architectural. The Cosmos ecosystem has live post-quantum work in progress at the SDK and consensus layer, and the closest analogue to a forward path for Keplr runs through Cosmos smart-contract account abstraction. That keeps the Contract PQC column in an in-progress state rather than a flat "not engaged," even though Keplr itself has shipped nothing concrete. The remaining columns reflect that no PQC chain Keplr supports has a protocol-level post-quantum signature scheme, and no post-quantum cryptography appears anywhere in the wallet's off-chain flow.

## Proposed and Implemented PQC Algorithms

Keplr does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

The wallet's posture on post-quantum cryptography cannot be meaningfully assessed because none of the chains Keplr supports today expose a protocol-level post-quantum signature scheme for users to sign with, and the vendor has made no public statement — for or against — on quantum migration. There is no published roadmap, commitment, or explicit deprioritization to evaluate. Where a forward path exists at all, it runs through the Contract PQC column rather than a vendor stance, so this column does not apply.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Keplr in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

**Current state.** Keplr's signing algorithms are not swappable at runtime. The supported curves are baked into the wallet's cryptography package and into each per-ecosystem signer method. New chain support reaches the wallet two ways — by merging an entry into the community [Keplr Chain Registry](https://github.com/chainapsis/keplr-chain-registry), or by including the chain in the next extension release — and a dapp can also prompt a user to add a Cosmos-SDK chain at runtime through [`experimentalSuggestChain`](https://docs.keplr.app/api/guide/suggest-chain). None of those paths is signer-pluggable: the registry's signing-algorithm hint and the suggest-chain interface accept only classical secp256k1 variants. There is no plugin or keyring API by which a third party could introduce a new signature scheme, so adopting one would require a code change shipped by the vendor in a new release of the wallet itself.

## Protocol PQC

**Rating: N/A** ➖

No chain Keplr supports has a protocol-level post-quantum signature scheme that a user signs transactions with. Keplr's chain set is Cosmos/IBC chains plus EVM networks, Starknet, and Bitcoin — all of which settle user transactions with classical signatures. Because there is no protocol-level post-quantum signing surface available on any supported chain, this column does not apply.

## Contract PQC Support

**Rating: Yes-but** *️⃣

**Current state.** No on-chain post-quantum verifier is engaged on any chain Keplr supports today. On the Cosmos side, account-abstraction-style functionality is built from `authz` permission grants, fee grants, Interchain Accounts, and CosmWasm smart-contract accounts; Keplr signs into those constructs with classical secp256k1. A CosmWasm-based post-quantum verifier account is architecturally conceivable — analogous to how EVM contracts can validate alternative signatures — but no such contract is deployed. On the EVM side, Keplr's provider is shaped for externally-owned accounts and does not natively assist with smart-account bundling or delegation. On Starknet, every account is a Cairo contract by design, and Keplr signs the validating account's underlying key.

**Planned future work.** The reason this column is in progress rather than "not engaged" is the live Cosmos-ecosystem post-quantum pipeline. [DoraFactory's `pqc-cosmos`](https://github.com/DoraFactory/pqc-cosmos) adds a post-quantum signature scheme to CometBFT consensus and the Cosmos SDK cryptography package, and its roadmap explicitly contemplates making existing wallets such as Keplr support post-quantum Cosmos-based chains. Cosmos SDK post-quantum discussions are ongoing, including consensus-layer signature-type proposals. As of the information date, no Keplr-side change has shipped and no upstream contribution or public commitment from the vendor was located — the in-progress status reflects ecosystem-level activity that names Keplr as a needed integration, not delivered wallet code.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for Keplr in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

**Current state.** No post-quantum cryptography was identified anywhere in Keplr's off-chain flow. Transport security to RPC endpoints and vendor backends uses standard browser TLS. Keplr ships no first-party MPC or threshold-signature product, so there is no MPC handshake to protect, and it does not support passkey or WebAuthn ceremonies. No hybrid or post-quantum TLS in the signing pipeline was found.

## Vendor & Governance

Keplr is developed by Chainapsis, a private company incorporated in Singapore as KPLR Pte Ltd. There is no DAO and no token-based governance over the wallet; product decisions sit with the company. The [Keplr Chain Registry](https://github.com/chainapsis/keplr-chain-registry) operates on an open pull-request model, but final merge decisions rest with Chainapsis maintainers, and that registry is the canonical place where new chain support — the venue where a post-quantum chain integration would surface — is tracked.

Issues and reports are handled through GitHub issues on the [main repository](https://github.com/chainapsis/keplr-wallet). No public bug-bounty program (such as HackerOne or Immunefi) and no publicly indexed third-party audit reports were located; the repository's reference to proprietary submodules not in the open-source build limits external audit scope. Readers tracking Keplr's post-quantum posture should watch the vendor's documentation, the chain registry, and the main repository for any shipped change.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
