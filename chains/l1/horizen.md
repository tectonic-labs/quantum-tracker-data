# Horizen (ZEN) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Horizen |
| **Ticker** | ZEN |
| **Website** | <https://www.horizen.io> |
| **GitHub** | <https://github.com/HorizenOfficial> |
| **Derived from** | Zclassic fork of Zcash (2017) |
| **Parent chain** | Base (post-2025-07-23 migration) |
| **On-chain environment** | EVM (ERC-20 on Base; planned EVM-native L3 on Base) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | ➖ | ➖ | Not Applicable |
| P2P Networking | ➖ | ➖ | Not Applicable |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

[Horizen](https://www.horizen.io) is no longer a standalone Layer 1. As [documented in the official migration overview](https://horizen-2-docs.horizen.io/migration/overview/), "both old chains will be discontinued, and all coin transfers are now managed on Base." The original Bitcoin-derived UTXO mainchain (Equihash proof-of-work) and the EON EVM sidechain were [both halted on 2025-07-23](https://2miners.com/blog/july-2025-work-progress-zen-shutdown/), with mining ending the prior day and the final mainchain block (#1,807,300) mined at 06:00 UTC. ZEN is now an ERC-20 token on Base (Coinbase's OP Stack L2), with a planned [privacy-focused EVM-native L3 appchain](https://beincrypto.com/horizen-mainnet-launch-base/) rolling up to Base under the "Horizen 2.0" rebrand.

Because Horizen has discontinued its own consensus and P2P layers, those categories are rated Not Applicable rather than graded — the security of ZEN transactions now rides on Base and Ethereum directly. For the cryptography that *is* Horizen-attributable today (ERC-20 contract authorization on Base, the upcoming L3 appchain, and the tightly-integrated [zkVerify](https://zkverify.io) sister project), no published roadmap milestone commits to post-quantum signatures, post-quantum proof systems, or EC retirement. Horizen Labs publicly markets a ["Quantum Security Consultancy"](https://www.horizenlabs.io/) line of business and an enterprise-facing ["Harvest Now, Decrypt Later"](https://horizenlabs.io/blog/harvest-now-decrypt-later-the-quantum-threat-your-risk-register-isn-t-tracking) advisory, but neither has been applied to the project's own chain in any disclosed roadmap commitment.

## Proposed and Implemented PQC Algorithms

Horizen does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

Post-migration, ZEN transactions are authorized on Base, which uses ECDSA over secp256k1 (inherited from Ethereum) plus ERC-4337 smart-contract-wallet flows. The planned Horizen 2.0 L3 is described as a ["fully EVM-compatible environment"](https://horizen-2-docs.horizen.io/migration/overview/) and inherits the same signature stack. No Horizen-attributable post-quantum transaction-signature proposal, draft, or in-repo code has been published.

The legacy mainchain (now halted) used secp256k1 ECDSA on transparent t-addresses, inherited from its Bitcoin/Zclassic ancestry. The legacy EON sidechain used Schnorr signatures over EC curves inside the [Zendoo](https://www.horizen.io/academy/zendoo/) certificate-verification path for threshold-signed withdrawals. Both surfaces ceased producing transactions on 2025-07-23.

**Current state.** ZEN transaction authorization is whatever Base accepts; no Horizen-specific signature primitive remains in operation.

**Planned future work.** None published targeting transaction signatures on either the ERC-20 contract or the upcoming L3.

## 2. Consensus

**Grade: ➖**

Horizen no longer operates a consensus layer. The legacy mainchain ([Equihash proof-of-work](https://www.horizen.io/horizen-upgrade), hash-based and consensus-puzzle-safe in the same sense as Zcash's PoW) was halted on 2025-07-23, and the legacy EON sidechain (delegated-PoS with Schnorr / Curve-25519-derived validator signing) was halted the same day. The Horizen 2.0 L3 is [described as built on the OP Stack foundation](https://beincrypto.com/horizen-mainnet-launch-base/) and rolls up to Base; consensus security flows from Base and Ethereum.

Rating consensus for Horizen-the-chain would double-count the upstream chains' postures, so we mark this category Not Applicable rather than grading it.

## 3. P2P Networking

**Grade: ➖**

Horizen no longer operates a P2P network. Gossip and peer discovery for ZEN balances are part of Base's network layer, and the Horizen 2.0 L3 is positioned as a Base appchain rather than an independent peer-to-peer network. The legacy mainchain used a Bitcoin-derived devp2p stack with secp256k1 node identity until shutdown; the legacy EON sidechain used a Sparkz/Scorex networking stack with secp256k1-style node keys.

As with Consensus, this category is marked Not Applicable to avoid restating Base and Ethereum's postures.

## 4. On-Chain Logic

**Grade: F ❌**

The Horizen 2.0 L3 is documented as a ["fully EVM-compatible environment"](https://horizen-2-docs.horizen.io/migration/overview/) deploying Solidity contracts on Base's OP Stack foundation. It inherits the standard Ethereum precompile set: `ecrecover` (secp256k1), the alt_bn128 / BN254 pairing precompiles (`ecAdd`, `ecMul`, `ecPairing`), Keccak256, SHA256, RIPEMD160, and Blake2f. No post-quantum signature-verification precompile or builtin has been proposed by Horizen for the L3 or for the ERC-20 contract on Base.

The [zkVerify](https://zkverify.io) sister project — a Substrate-based L1 maintained by Horizen Labs and [tightly integrated with the L3 plan](https://medium.com/@cryptomanion/understanding-the-horizen-2-0-white-paper-essential-highlights-e1db07ced223) — [exposes verifier pallets](https://zkverify.io/blog/zkverify-mainnet-and-vfy-is-live) for Groth16, PLONK, Halo2, Fflonk, Ultraplonk, SP1, Plonky2, EZKL, Proof-of-SQL, and STARKs. Of these, only the STARK family rests on hash-based soundness rather than elliptic-curve assumptions, and zkVerify verifies proof systems rather than implementing post-quantum signature primitives. zkVerify is also a distinct chain rather than Horizen itself.

**Current state.** Standard EVM precompiles on Base (and, by extension, on the planned L3). No post-quantum signature verification is available to contracts.

**Planned future work.** The published roadmap mentions a [Q1 2026 "Confidential Compute Environment"](https://www.horizen.io/roadmap) based on trusted-execution environments, plus modular cryptography integrations described as ZKP / MPC / FHE. None of these is a post-quantum signature-verification commitment.

## 5. Other Features

### Zendoo cross-chain SNARKs (legacy, halted)

The [Zendoo cross-chain transfer protocol](https://eprint.iacr.org/2020/123.pdf) authenticated withdrawal certificates from EON back to the legacy mainchain via recursive zk-SNARK proofs that a threshold of sidechain certifiers had signed a withdrawal batch with Schnorr keys. The construction (Darlin / Marlin variants) used the [Tweedle / Pasta (Pallas/Vesta) curve cycle](https://github.com/HorizenOfficial/zendoo-sc-cryptolib) — elliptic-curve-based, with the same general posture as Zcash Orchard's Halo 2.

**Current state.** Moot. The mainchain and EON sidechain have not produced blocks since 2025-07-23, and Zendoo withdrawal certificates are no longer issued. No post-quantum migration plan was published for Zendoo before the sunset.

**Planned future work.** None — the construction is retired with the chain.

### Sprout-derived shielded pool (removed)

Horizen inherited a Zcash Sprout-derived shielded pool from its Zclassic ancestry but never shipped Sapling on the mainchain. The pool was [deprecated under ZenIP 42204](https://blog.horizen.io/upcoming-deprecation-of-the-horizen-mainchain-shielded-pools/) and [fully removed in Zen 5.0.0 in 2024](https://github.com/HorizenOfficial/zen/blob/release/5.0.0/doc/release-notes/release-notes-5.0.0.md) (ZenIP 42207), well before the chain itself was halted. The decision context for the removal was [public](https://www.theblock.co/post/236861/grayscale-backed-horizen-to-change-blockchain-to-drop-privacy-coin-label).

The retroactive-deanonymization concern that applies to live shielded chains applies only weakly here: historical Sprout ciphertexts remain on the immutable legacy ledger, but the deshield deadline lapsed before the 2024 hard fork, the chain no longer produces blocks, and the affected population is bounded by whoever held shielded balances at deprecation time.

**Current state.** No shielded pool is operated by Horizen today.

**Planned future work.** None — the pool is retired.

### Horizen 2.0 L3 privacy features (planned, not live)

The [Horizen roadmap](https://www.horizen.io/roadmap) describes a Q1 2026 "Confidential Compute Environment" built on trusted-execution environments, with modular cryptography integrations (ZKP, MPC, FHE) and "bot-proof execution" via order obfuscation. These are confidentiality features rather than post-quantum cryptographic primitives, and as currently described they would rely on EC-based proof systems (Groth16, Halo2, PLONK family) verified through zkVerify alongside TEE-based confidentiality.

**Current state.** Not yet live; the L3 mainnet launched in [Q4 2025](https://beincrypto.com/horizen-mainnet-launch-base/), and the Confidential Compute Environment is on the published roadmap for Q1 2026.

**Planned future work.** No post-quantum cryptographic commitment is attached to either the Confidential Compute Environment or the modular cryptography track.

### zkVerify (sister project, not the Horizen chain)

[zkVerify](https://zkverify.io) is a separate Substrate-based L1 maintained by Horizen Labs, [launched on mainnet in 2024](https://chainwire.org/2024/05/23/horizen-labs-launches-zkverify-the-most-efficient-modular-blockchain-for-zk-proof-verification/). It uses BABE block authoring with Sr25519 VRFs, GRANDPA finality with Ed25519 + BLS signatures, and an NPoS validator/nominator model — [all elliptic-curve-based](https://docs.zkverify.io/architecture/mainchain/consensus). Among its supported verifier pallets, STARKs are the only family whose soundness rests on hash assumptions rather than EC.

**Current state.** zkVerify's own consensus and signature stack are EC-based; its STARK verifier is hash-based but is not a signature primitive.

**Planned future work.** No published commitment to migrate zkVerify's consensus or transaction signatures to post-quantum primitives.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ➖, P2P ➖, On-Chain ❌, Other ❌.

The 2025 [migration to Base](https://www.theblock.co/post/364064/horizen-zen-base-appchain) was framed publicly as a [compliance, scalability, and developer-reach move](https://crypto.news/horizen-zen-token-base-launch-privacy-appchain-2025/), not a cryptographic-agility move. As a side effect, it retired a large amount of Horizen-attributable EC surface (mainchain ECDSA, Zendoo Schnorr/Pasta proofs, EON validator signing), but the remaining and forward-looking EC surface — secp256k1 on Base, the standard EVM precompile set on the planned L3, and the EC-based proof systems verified through zkVerify — has no published retirement schedule.

**Current state.** No published plan to retire elliptic-curve primitives on the ERC-20 ZEN contract, the upcoming Horizen 2.0 L3, or the zkVerify sister chain. The 2024 shielded-pool removal was a privacy-feature sunset rather than an EC sunset; transparent secp256k1 addresses remained the only option after it.

**Planned future work.** None published.

## Governance

Horizen protocol changes flow through the [ZenIP (Zen Improvement Proposal) process](https://github.com/HorizenOfficial), with discussion on the [Horizen DAO Discourse forum](https://horizen.discourse.group). The DAO has demonstrated willingness to execute large structural changes — the 2024 migration directive (ZenIP 42405) reportedly passed with very high approval, followed by ZenIP 42406 (technical roadmap) and ZenIP 42407 (tokenomics) to execute the Base move, and culminating in the [2025-07-23 mainchain shutdown](https://2miners.com/blog/july-2025-work-progress-zen-shutdown/) at block 1,807,300.

A scan of the ZenIP record did not surface any proposals targeting post-quantum signatures, post-quantum proof systems, or EC retirement on the planned L3 or on zkVerify. Readers tracking ongoing discussion can follow the [Horizen DAO forum](https://horizen.discourse.group), the [Horizen GitHub organization](https://github.com/HorizenOfficial), and the [zkVerify GitHub organization](https://github.com/zkVerify/zkVerify).

---

_Generated on 14 May 2026 based on information as of 14 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml) — contact channel pending launch._

_Editorial policy: none currently published._
