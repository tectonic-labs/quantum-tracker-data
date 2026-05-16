# Walrus (WAL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Walrus |
| **Ticker** | WAL |
| **Asset class** | DeFi Governance |
| **Issuer** | Built by Mysten Labs, with ecosystem stewardship under the Walrus Foundation. |
| **Host chain(s)** | Sui (native Move package). |
| **Website** | https://walrus.xyz/ |
| **Contract address** | WAL package ID `0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59` on Sui (Walrus system package `0xfdc88f7d7cf30afab2f82e8380d11ee8f70efb90e863d1de8616fae1bb09ea77`). |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | ➖ | ➖ | Not Applicable |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

WAL is the utility, staking, and governance token of the Walrus decentralized storage protocol. It is issued natively on Sui as a Move `Coin`, so its transaction signing, consensus, and networking exposure are entirely inherited from Sui — a token cannot be more quantum-safe than the chain it runs on, and that host-chain inheritance sets the ceiling here. Sui carries elliptic-curve exposure across consensus, peer-to-peer networking, on-chain verification, and other surfaces, which pins the Host Chain Aggregate at the bottom of the scale.

On the surfaces the issuer itself controls — contract-upgrade authority, the WAL supply (`TreasuryCap`), storage-node parameter governance, and the protocol's BLS-signed storage-availability certificates — every disclosed cryptographic primitive is elliptic-curve based, and no Walrus- or Mysten-Labs-attributable post-quantum migration plan has been published. WAL is a single-chain token with no canonical bridge and is an unbacked utility token with no off-chain reserve, so the cross-chain and reserve/custody categories do not apply. Mysten Labs' `fastcrypto` library has experimental hash-based-signature building blocks scoped to Sui's transaction-signing path, but no callable API and no linkage to Walrus's own keys or committee.

## Proposed and Implemented PQC Algorithms

Walrus does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

WAL is issued natively on [Sui](../chains/l1/sui.md) as a Move `Coin` type in the Walrus framework packages. There is no second host chain and no bridged representation in the canonical deployment — WAL is a single-host token. Because it executes on Sui, WAL's transaction signing, consensus participation, and networking exposure are the host chain's responsibility, not the token issuer's. The token cannot be more quantum-safe than the chain it runs on; Sui's posture is the ceiling for everything below.

**Current state.** Sui carries elliptic-curve exposure across most of its surfaces: consensus uses Mysticeti BFT with BLS12-381 aggregated validator signatures, peer-to-peer node identity uses secp256k1, on-chain verification through the Move VM offers elliptic-curve modules only with no post-quantum verification path, and other surfaces include zkLogin's Groth16 / BN254 pairings. Its transaction-signing path is on a roadmap rather than shipped. With elliptic-curve exposure pervasive across consensus, networking, on-chain, and other surfaces, the host-chain aggregate that WAL inherits is at the bottom of the scale. Because WAL has a single host, no distribution qualifier applies — this is not an outlier, it is the one chain WAL lives on. See the [Sui PQC readiness report](../chains/l1/sui.md) for the host-chain detail.

**Planned future work.** The intel reviewed records no shipped host-chain migration; Sui's transaction-signing path is described as roadmapped. Any host-chain migration progress is tracked on the Sui report.

## 2. Admin / Privileged Roles

**Grade: F ❌**

Walrus is a delegated-Proof-of-Stake protocol whose smart contracts run on Sui as Move packages. The privileged surfaces that matter for the WAL token authenticate with Sui elliptic-curve keys.

**Current state.** Walrus uses a two-tier contract-upgrade model. Standard upgrades require a vote of 2f+1 of storage nodes by shard weight approving a package digest; the new package then repoints the shared System and Staking objects at the next epoch. For critical fixes, a holder of an `EmergencyUpgradeCap` can authorize an immediate upgrade that bypasses the committee vote. Both paths authenticate via Sui transactions — the storage-node operators sign with Sui keys (ed25519, or secp256k1/secp256r1), and the `EmergencyUpgradeCap` is a Sui `Cap` object moved by an ed25519-signed transaction ([Walrus smart-contract documentation](https://deepwiki.com/MystenLabs/walrus/2.3-smart-contracts)).

WAL has a fixed maximum supply of 5 billion, with minting and the genesis distribution controlled by a Sui `TreasuryCap`-pattern object; whatever party signs `TreasuryCap` transactions does so with an ed25519 Sui key ([WAL token page](https://walrus.xyz/wal-token/)). Four protocol parameters covering shard recovery, data challenge, and pricing are adjusted by storage-node governance, with nodes voting via stake-weighted, ed25519-signed Sui transactions ([parameter-governance overview](https://www.gate.com/crypto-wiki/article/what-is-walrus-wal-token-whitepaper-logic-use-cases-and-technical-innovation-explained-20260103)). Multisig thresholds and committee weighting are operational hardening, not a cryptographic migration. No Walrus or Mysten Labs proposal discusses migrating any of these keys to post-quantum primitives.

**Planned future work.** No concrete post-quantum proposal currently exists for the Walrus upgrade authority, the `EmergencyUpgradeCap`, the WAL `TreasuryCap`, or storage-node parameter governance.

## 3. Cross-Chain Mechanism

**Grade: ➖**

WAL is a single-chain token. It is a native Sui Move `Coin` with no canonical bridge deployment, no wrapped or cross-chain representation in the official tokenomics, and no issuer-operated cross-chain mint path. The token's entire lifecycle — minting, staking, governance, and payment for storage — happens on Sui, so there is no cross-chain attestation cryptography to evaluate and this category does not apply.

## 4. Reserve / Custody

**Grade: ➖**

WAL is an unbacked utility and staking token. There is no fiat peg, no real-world-asset collateral, and no off-chain reserve pool. The 5 billion supply is fixed by the Walrus tokenomics and controlled by the on-chain `TreasuryCap` (covered under Admin / Privileged Roles); there is no custody-to-chain mint-attestation infrastructure separate from that, so this category does not apply.

## 5. Other Token-Specific Crypto

**Grade: F ❌**

WAL is the economic security layer for a decentralized storage protocol, and that protocol carries token-adjacent cryptography worth rating here.

**Current state.** Walrus runs in epochs with a committee of storage nodes selected by WAL stake. When a client writes a blob, nodes return signed acknowledgments; once 2f+1 signatures by shard weight are collected, they are aggregated into an availability certificate published on Sui as the Proof-of-Availability. The smart contracts use a BLS committee for verifying storage confirmations — that is, **BLS12-381**, an elliptic-curve pairing scheme, via Mysten's `fastcrypto` library ([Walrus smart-contract documentation](https://deepwiki.com/MystenLabs/walrus/2.3-smart-contracts); [Walrus whitepaper](https://arxiv.org/abs/2505.05370)). An attacker able to forge BLS12-381 signatures could forge availability certificates, attesting that data is stored when it is not.

Walrus's signature feature, Red Stuff, is a 2D erasure code (Reed-Solomon-style primary and secondary slivers, roughly 4.5x replication, self-healing) ([Red Stuff encoding explainer](https://www.walrus.xyz/blog/how-walrus-red-stuff-encoding-works)). Erasure coding is a coding-theory construction rather than a cryptographic one — it is not broken by a quantum computer and needs no migration on its own. The authenticated data structures Red Stuff uses (Merkle-style commitments and blob IDs) are hash-based and quantum-resistant. The token-specific exposure is therefore the elliptic-curve-pairing BLS storage-node committee, for which no migration has been disclosed.

**Planned future work.** No concrete post-quantum alternative has been drafted for the BLS12-381 storage-node committee. Storage-node committees rotate every epoch, but the signature scheme is fixed; a future migration of the availability-certificate scheme would be a protocol-level change, and none is announced.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ➖, Reserve & Custody ➖, Other ❌.

**Current state.** No Walrus- or Mysten-Labs-attributable plan exists to retire elliptic-curve cryptography on the storage-committee upgrade-vote keys and the `EmergencyUpgradeCap`, the WAL `TreasuryCap` and staking-pool admin keys, the BLS12-381 storage-node committee producing availability certificates, or storage-node parameter-governance voting. The [Walrus whitepaper](https://arxiv.org/abs/2505.05370) and [protocol documentation](https://docs.wal.app/) describe Red Stuff, epoch reconfiguration, and tokenomics but contain no migration plan or elliptic-curve-deprecation milestone. Mysten Labs' `fastcrypto` library has experimental hash-based-signature building blocks relevant to Sui's transaction-signing path, but no callable API and no linkage to Walrus's BLS committee or to WAL admin keys.

**Planned future work.** No scheduled retirement of elliptic-curve cryptography on any WAL-issuer surface has been published.

## Issuer & Governance

Walrus is built by Mysten Labs, the team behind Sui, with ecosystem stewardship under the Walrus Foundation. WAL serves three roles: payment for storage, staking to secure the network, and governance.

Protocol governance is exercised by storage nodes rather than directly by token holders. Before each epoch's staking deadline, any node may propose adjustments to four system parameters covering shard recovery, data challenge, and pricing; nodes vote with power proportional to their total (including delegated) stake, and a proposal needs more than 50% approval plus quorum to take effect the following epoch. Contract upgrades follow the two-tier model described above: a 2f+1 shard-weight committee vote for normal upgrades, and an `EmergencyUpgradeCap` for critical fixes.

Walrus product and protocol detail is disclosed through the [Walrus documentation](https://docs.wal.app/), the [WAL token page](https://walrus.xyz/wal-token/), and the [Walrus whitepaper](https://arxiv.org/abs/2505.05370). None of the published governance machinery addresses cryptographic primitives or post-quantum migration; readers tracking a future PQC commitment would watch those venues.

---

_Generated on 16 May 2026 based on information as of 15 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
