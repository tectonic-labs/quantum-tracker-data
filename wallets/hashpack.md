# HashPack — Public PQC Readiness Report

| | |
|---|---|
| **Name** | HashPack |
| **Vendor** | HashPack |
| **Category** | Software |
| **Custody model** | Self-custody EOA — user holds a BIP-39 seed phrase; HashPack servers do not hold or shard the key. Default key type is Ed25519, with ECDSA secp256k1 selectable at account creation for EVM compatibility. Optional hardware co-sign via Ledger, D'CENT, or Citadel. Email ("Magic Link") accounts use a Hedera-managed Ed25519 key. |
| **Website** | https://www.hashpack.app/ |
| **GitHub** | https://github.com/Hashpack |
| **Platforms** | Browser extension (Chromium-based: Chrome, Edge, Brave, Opera), iOS and Android mobile, and a web app at https://wallet.hashpack.app/. No standalone desktop app. |
| **Open source** | Proprietary — the browser-extension, mobile, and web client source is closed. Auxiliary connection libraries (HashConnect, the Hedera WalletConnect relay) are open source. |
| **First release** | ~2021 |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | N/A | ➖ | Not Applicable |
| Crypto Agility | No | ❌ | Not Engaged |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | N/A | ➖ | Not Applicable |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

HashPack is the dominant self-custody wallet for the Hedera network, serving a large majority of Hedera's monthly active users. It is a single-ecosystem wallet: it supports Hedera only, signing user transactions with Ed25519 by default or with ECDSA secp256k1 for EVM-compatible accounts. As of this report, no HashPack-branded public statement on post-quantum cryptography has been located — the vendor's blog, security page, and documentation do not address the topic.

Hedera itself maintains a [public post-quantum roadmap](https://hedera.com/blog/post-quantum-cryptography-and-blockchain/) that targets post-quantum user keys for 2027 and that explicitly tells wallet vendors their software will need updates to let users rotate keys. HashPack's posture is therefore best understood against that chain-side timeline: the network has a plan, the wallet has not yet published one of its own.

## Proposed and Implemented PQC Algorithms

HashPack does not currently ship or commit to any post-quantum cryptographic algorithms.

## PQC Stance

**Rating: N/A** ➖

HashPack ships only on the Hedera network, and Hedera does not yet offer a protocol-level post-quantum signature scheme for user transactions. Hedera has published a roadmap that names 2027 as the target for post-quantum user keys, but until that arrives there is no PQC signing path for HashPack to adopt or decline. No HashPack-authored statement on post-quantum cryptography has been located in the vendor's blog, [security page](https://www.hashpack.app/security), or [documentation](https://docs.hashpack.app/). The actionable post-quantum signal in this ecosystem currently sits with the chain rather than the wallet.

## Crypto Agility

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for HashPack in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

For context: at the Hedera protocol level, an account's authorization key is extensible — Ed25519, ECDSA secp256k1, and multi-key structures already coexist, and Hedera supports rekeying an Ed25519 account in place. But the HashPack client itself is [closed source](https://github.com/Hashpack), and its signer set is fixed and vendor-controlled. Adding a new signature scheme to the wallet would require an internal HashPack code change and a new release; the client exposes no plugin, Snap-style, or pluggable-signer interface that would let a new scheme be added without one.

## Protocol PQC

**Rating: N/A** ➖

HashPack supports only the Hedera network, and Hedera does not currently offer a protocol-level post-quantum signature scheme that wallets can sign user transactions with. With no PQC-native chain in HashPack's supported set, this column does not apply today. Hedera's published roadmap targets post-quantum user keys for 2027; if that ships and HashPack adopts it, this column would become applicable.

## Contract PQC Support

**Rating: N/A** ➖

Hedera implements account abstraction at the protocol level, and its EVM-compatible Smart Contract Service is structurally capable of hosting a contract-deployed signature verifier. However, no on-chain post-quantum verifier primitive has been located on Hedera, and HashPack ships no interface for signing against one. With no deployed contract-level PQC primitive on the only chain HashPack supports, this column does not apply.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for HashPack in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

No post-quantum mechanism was identified anywhere in the wallet's off-chain flow — transport to RPC and vendor backends uses standard browser TLS, the HashConnect dApp messaging relay uses classical encryption, and the email-account flow uses standard email-channel security. Hedera's roadmap includes post-quantum TLS for client connections, but that is a chain-side item and has not shipped.

## Vendor & Governance

HashPack is a private company. It sets product strategy, security architecture, and day-to-day operations directly. There is also a formal community-input process: holders of the $PACK token vote on product priorities, token economics, and wallet cosmetics through hashgraph.vote, an on-chain voting workflow anchored to the Hedera Consensus Service. Security architecture and core operations are explicitly outside the scope of that token vote.

Product direction and any future commitments would surface through the [HashPack blog](https://www.hashpack.app/) and the hashgraph.vote governance workflow. A post-quantum commitment, if one is made, would most naturally appear there or in the [documentation](https://docs.hashpack.app/).

On audits, HashPack has had an independent security review by Quantstamp ([audit certificate](https://certificate.quantstamp.com/full/hash-pack/95a96750-4624-412c-876e-5965dc021e70/index.html)), and the vendor states it plans further external audits at critical junctures.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
