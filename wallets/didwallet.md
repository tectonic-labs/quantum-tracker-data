# DID Wallet — Public PQC Readiness Report

| | |
|---|---|
| **Name** | DID Wallet |
| **Vendor** | ArcBlock |
| **Category** | Identity |
| **Custody model** | EOA-style self-custody with on-chain DID identity binding (DID:ABT); single-party local signing, seed-mnemonic recovery only. |
| **Website** | [didwallet.io](https://www.didwallet.io/) (consumer landing, "Powered by ArcBlock") |
| **GitHub** | [github.com/ArcBlock](https://github.com/ArcBlock) |
| **Platforms** | iOS, Android, and Chrome browser extension. No first-party desktop binary or hardware device. |
| **Open source** | Mixed: ArcBlock's crypto and DID SDKs are open source (Apache-2.0 for repositories such as `mcrypto` and `forge-js`); the end-user wallet clients appear to be closed-source. |
| **First release** | 2019 (originally launched as the DID ABT Wallet). |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | Yes-but | *️⃣ | In Progress |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

DID Wallet is the consumer wallet behind didwallet.io, built and shipped by ArcBlock as the key-management front end for its W3C-compliant decentralized identity method, DID:ABT. It runs on iOS, Android, and as a Chrome extension, and connects to ArcBlock's own ABT Chain alongside Ethereum, BNB Chain, and Base. User accounts are self-custodied: a key is generated locally from a seed mnemonic, and that key is bound to an on-chain DID identifier. Today the wallet signs transactions and identity-authentication challenges with classical elliptic-curve schemes — Ed25519 by default and secp256k1 as an alternate.

ArcBlock has made one public statement that touches the quantum question: an August 2025 platform update marketed as a "Quantum-Safe Encryption Implementation." Reviewing the substance, that update added SHA2, SHA3, and SHA3-512 hashing for data encryption; it did not change the signature schemes the wallet uses. DID Wallet does not currently ship or commit to a post-quantum signature scheme on any layer.

## Proposed and Implemented PQC Algorithms

DID Wallet does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: Yes-but** *️⃣

ArcBlock has spoken publicly to the quantum topic exactly once that we could trace. An [August 2025 platform update](https://coinmarketcap.com/cmc-ai/arcblock/latest-updates/) was announced as a "Quantum-Safe Encryption Implementation." The technical content of that update was the addition of the SHA2, SHA3, and SHA3-512 hash algorithms for data encryption and hashing. Hash functions and signature schemes are different things: that update did not move the wallet's user-facing signing — Ed25519 and secp256k1 — onto a post-quantum footing.

**Current state.** The vendor has acknowledged the quantum threat in public-facing language, which is why this column is not a flat "No." But the announced work is hash-algorithm work, not a post-quantum signature migration, and the wallet's user keys remain on classical elliptic-curve cryptography. No DID-specific post-quantum roadmap, and no published plan to migrate DID:ABT signatures or the DID-authentication flow, was located.

**Planned future work.** No dated, on-record post-quantum signature milestone has been published. ArcBlock's [DID Wallet documentation](https://www.arcblock.io/docs/did-wallet/en) and [GitHub org](https://github.com/ArcBlock) are the venues where such a commitment would surface if one were made.

## Crypto Agility

**Rating: No** ❌

The wallet ships a fixed signer. The published [ABT DID specification](https://github.com/ArcBlock/abt-did-spec) defines a signature-algorithm field that today enumerates two values — Ed25519 and secp256k1 — and the wire format is structured to allow more than one scheme. That is a useful structural hook. However, no post-quantum value has been allocated to that field, and adding one would require a specification amendment plus a matching implementation in each ArcBlock SDK and in each wallet client.

**Current state.** Because the end-user wallet binaries appear to be closed-source, a community-built signer added to ArcBlock's open SDKs would still not reach the official iOS, Android, or extension distributions without ArcBlock building and shipping it. The wallet provides no plugin or pluggable-signer surface that would let a new signature scheme be added without a new vendor release. The accompanying commentary records this column simply as "Closed."

**Planned future work.** No work to allocate a post-quantum signature value in the ABT DID specification, or to introduce a swappable-signer mechanism, was located.

## Protocol PQC

**Rating: N/A** ➖

This column measures whether the wallet signs user transactions with a chain's own protocol-level post-quantum scheme. DID Wallet supports ABT Chain, Ethereum, BNB Chain, and Base — none of which provide a protocol-level post-quantum signature scheme for user transactions. With no such chain in the wallet's supported set, this column does not apply.

## Contract PQC Support

**Rating: N/A** ➖

This column measures whether the wallet signs with a post-quantum signature that is verified by on-chain smart-contract bytecode. DID Wallet operates as a classical externally-owned-account wallet on Ethereum, BNB Chain, and Base, and as a single-key DID:ABT signer on ABT Chain; it does not route user signing through a smart-contract account. None of its supported chains expose a deployed on-chain post-quantum verifier the wallet integrates with, so this column does not apply.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for DID Wallet in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

DID Wallet is built and shipped by ArcBlock, a US-incorporated company, with the non-profit ArcBlock Foundation acting as steward of the ABT Chain and the ABT token. Wallet and SDK decisions are made by the company; there is no DAO or token-holder governance over wallet client decisions, and protocol changes to ABT Chain and the ABT DID specification are decided by ArcBlock's engineering team in consultation with the Foundation.

Product and protocol direction is disclosed through ArcBlock's [DID Wallet documentation](https://www.arcblock.io/docs/did-wallet/en) and its [GitHub org](https://github.com/ArcBlock), where the [ABT DID specification](https://github.com/ArcBlock/abt-did-spec) and the open crypto SDKs (`mcrypto`, `forge-js`) are published. A post-quantum signature commitment, if made, would surface in those venues. No security disclosure venue (bug bounty or dedicated security contact) and no third-party audit of the DID Wallet clients or the ABT DID protocol were located.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
