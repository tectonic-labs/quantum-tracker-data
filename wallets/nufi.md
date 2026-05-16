# NuFi — Public PQC Readiness Report

| | |
|---|---|
| **Name** | NuFi |
| **Vendor** | NuFi s. r. o. (a Vacuumlabs spin-out) |
| **Category** | Software |
| **Custody model** | EOA (BIP-39 mnemonic, per-chain HD derivation) by default; optional seedless MPC-TSS via Web3Auth / Torus social login; optional Ledger / Trezor / Keystone / OneKey / GridPlus / BitBox hardware co-sign. No smart-contract wallet. |
| **Website** | https://nu.fi/ |
| **GitHub** | https://github.com/nufi-official |
| **Twitter / X** | https://x.com/nufiwallet |
| **Platforms** | Browser extension (Chrome and Chromium derivatives) and a hosted web wallet at https://wallet.nu.fi/. No mobile app located. |
| **Open source** | Mixed — integration SDKs, the MetaMask Cardano Snap, and the tokenlists are open source; the wallet client binary is not published as open source. |
| **First release** | December 2021 (first beta); the predecessor AdaLite dates to 2018. |

## Summary of Ratings

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | No | ❌ | Not Engaged |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

## Summary

NuFi is a multi-chain software wallet covering Cardano, Solana, Flow, Ethereum / EVMs, and Bitcoin. It comes from the team behind [AdaLite](https://github.com/vacuumlabs/adalite), Cardano's first lightweight browser wallet, which transitioned from Vacuumlabs into the NuFi s. r. o. spin-out. NuFi ships in three custody modes: a default seed-phrase EOA model, a seedless social-login mode built on [Web3Auth / Torus](https://web3auth.io/) MPC, and hardware co-signing across six hardware-wallet brands.

Every signing scheme NuFi supports today is pre-quantum: Ed25519 for Cardano and Solana, ECDSA on secp256k1 for Ethereum / EVMs and Bitcoin, ECDSA on P-256 for Flow, and Schnorr on secp256k1 for Bitcoin Taproot. No NuFi- or Vacuumlabs-authored public statement on post-quantum cryptography was located, and no post-quantum signing path ships in any custody mode. None of the chains NuFi supports currently enforces a protocol-level post-quantum signature scheme.

## Proposed and Implemented PQC Algorithms

NuFi does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

PQC Stance is recorded as not applicable for NuFi. No NuFi- or Vacuumlabs-authored public statement on post-quantum cryptography was located: no blog post, no Medium article on [NuFi's publication](https://nufi-official.medium.com/nufi-wallet-integrates-flow-blockchain-enters-the-ecosystem-with-ambitious-plans-ec4e74692252), and no entry in the [NuFi support knowledge base](https://support.nu.fi/) referencing post-quantum, quantum-resistant, lattice-based, or hash-based signatures. With neither a published commitment nor an explicit deprioritization on record, there is no vendor stance to characterize.

## Crypto Agility

**Rating: No** ❌

NuFi hard-codes a per-chain default signing scheme and exposes no plugin architecture through which a third party could add a new signing algorithm. There is no Snap-style extension API for inbound chains or signers; the wallet's published "extension" surfaces — its [MetaMask Cardano Snap](https://github.com/nufi-official/nufi-snap) and its [Flow FCL Web3Auth plugin](https://github.com/nufi-official/fcl-web3auth-plugin) — are outbound integrations that expose NuFi flows to other ecosystems rather than inbound extension points. Adding a new signature scheme would require a change shipped by the NuFi team itself.

The wallet client binary is not published as open source under the [NuFi GitHub org](https://github.com/nufi-official), while several integration SDKs are. Because the wallet code is not community-extensible, any future post-quantum signing path would have to originate from the vendor.

**Current state:** No swappable signer, pluggable validator, or typed signer enum that would accept a new scheme without a vendor release was found. The seedless MPC custody path maintains non-BIP32 key material for social-login accounts, but no post-quantum integration work was located on that path either.

## Protocol PQC

**Rating: N/A** ➖

Protocol PQC measures whether the wallet signs user transactions with a chain's protocol-level post-quantum scheme on a PQC-native chain it supports. NuFi supports Cardano, Solana, Flow, Ethereum / EVMs, and Bitcoin — none of which currently enforces a protocol-level post-quantum signature scheme for user transactions. Because no supported chain offers such a scheme, this column does not apply.

## Contract PQC Support

**Rating: No** ❌

Contract PQC Support measures whether the wallet signs with a post-quantum signature that is verified by on-chain smart-contract bytecode. NuFi supports Solana, which has a deployed mainnet hash-based post-quantum primitive (the Winternitz Vault), but NuFi does not ship any user interface for it. No other chain NuFi supports has a live deployed on-chain post-quantum contract: Cardano has no Plutus post-quantum verifier deployed, Flow's on-chain verifier is fixed to its two ECDSA curves, and Ethereum / EVMs and Bitcoin have no deployed post-quantum primitive.

**Current state:** No committed integration work toward on-chain post-quantum verification was found in any [NuFi repository](https://github.com/nufi-official). The default EVM flow is EOA signing, and NuFi is an EOA-or-MPC wallet rather than a smart-contract wallet.

## Off-Chain PQC

**Rating: No** ❌

Off-Chain PQC measures whether the wallet ships post-quantum cryptography anywhere that does not bind on-chain — such as post-quantum TLS to a backend, a post-quantum MPC handshake, or post-quantum-protected backup. NuFi's transport to its backend and to chain RPC endpoints uses standard browser TLS. The seedless social-login custody path uses Web3Auth / Torus MPC over classical primitives, and the MPC layer produces a standard chain-native classical signature. No post-quantum off-chain mechanism was identified.

**Current state:** No committed off-chain post-quantum integration work was found.

## Vendor & Governance

NuFi is developed by NuFi s. r. o., a private Slovak limited liability company spun out of Vacuumlabs, a Bratislava-based product-engineering firm. Product decisions, the feature roadmap, and security posture are set internally by the NuFi team; there is no DAO and no on-chain governance over the wallet, and there is no native NuFi token.

Product announcements are published on [NuFi's Medium publication](https://nufi-official.medium.com/nufi-wallet-integrates-flow-blockchain-enters-the-ecosystem-with-ambitious-plans-ec4e74692252) and the [marketing site](https://nu.fi/); a post-quantum commitment, if one were made, would most likely surface there first. Vacuumlabs maintains the underlying Cardano libraries and the [Ledger Cardano app firmware](https://github.com/vacuumlabs/ledger-app-cardano), so the same engineering organization controls both the wallet's Cardano signing path and the Ledger Cardano firmware. Security issues are routed through `help@nu.fi` and the [NuFi support portal](https://support.nu.fi/). No dated, on-record post-quantum milestone published by the vendor was located.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
