# Asentum (ASE) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Asentum |
| **Ticker** | ASE |
| **Website** | <https://www.asentum.com/> |
| **On-chain environment** | Hardened JavaScript / SES |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | B | 🔧 | In Development |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | A | ✅ | Shipped |

Asentum is a from-scratch Layer-1 blockchain designed with post-quantum cryptography at every layer from genesis. Transaction signing and validator consensus use **ML-DSA-65** (Dilithium3, FIPS 204 Level 3), confirmed in the validator onboarding application with the message "Your Dilithium3 keypair is encrypted locally and never leaves this machine." A public testnet launched April 30, 2026 with five validators across three continents and more than 20,000 blocks finalized; mainnet launched May 13, 2026. The execution model uses JavaScript via Hardened JavaScript / SES (the same isolation primitive used by the Agoric project), with on-chain scheduling and cron functionality rolled out in a May 18 testnet update. No independent third-party cryptographic audit of the ML-DSA-65 implementation has been published.

The team has publicly described their algorithm selection rationale: all three ML-DSA security levels were evaluated before settling on Level 3 (ML-DSA-65). ML-DSA-44 (~2.4 KB signatures, ~1.3 KB public keys) was rejected as having an insufficient security margin; ML-DSA-87 (~4.6 KB signatures, ~2.6 KB public keys) was rejected as too large to fit the chain's bandwidth and block-sync budget. ML-DSA-65 (~3.3 KB signatures, ~1.9 KB public keys) was selected as the balance point. The team noted that these signatures are approximately 52× larger than Ed25519, a constraint that shaped committee size, bandwidth budget, and block synchronisation design.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA-65** (FIPS 204 / Dilithium3) | ECDSA / Ed25519 | Tx Signatures | In Development (mainnet launched 2026-05-13) |
| **ML-DSA-65** (FIPS 204 / Dilithium3) | ECDSA / Ed25519 | Consensus | In Development (mainnet launched 2026-05-13) |

## Transaction Signatures

**Grade: B 🔧**

Asentum uses **ML-DSA-65** (Dilithium3, FIPS 204 Level 3) for transaction signing. This was confirmed in the validator onboarding application: "Your Dilithium3 keypair is encrypted locally and never leaves this machine." Mainnet launched on May 13, 2026, with the $ASE token simultaneously launched as an ERC-20 on Uniswap with a 1:1 native swap available at launch.

**Current state.** ML-DSA-65 transaction signatures on mainnet since 2026-05-13 per published [launch coverage](https://www.globenewswire.com/news-release/2026/05/12/3293137/0/en/Asentum-Nears-ASE-Launch-as-Global-Validator-Participation-Accelerates-Across-Its-Post-Quantum-Blockchain.html). No independent cryptographic audit of the implementation has been published.

**Planned future work.** Address derivation details, multi-signature support, and full protocol documentation are not yet publicly available.

## Consensus

**Grade: B 🔧**

Asentum uses a Tendermint-style BFT consensus with ~2-second claimed finality. Validator block signing uses ML-DSA-65 / Dilithium3, consistent with the "every layer" design claim. The testnet ran for more than 20,000 finalized blocks across five validators on three continents before the May 18 testnet reset with updated tooling.

**Current state.** ML-DSA-65 validator signing on mainnet since 2026-05-13. Raspberry Pi 4 hardware floor claimed. No independent verification of the ML-DSA-65 consensus implementation has been published.

**Planned future work.** Full protocol documentation and independent audit pending.

## P2P Networking

**Grade: D ⚠️**

If Asentum's design achieves "every layer" PQC coverage as claimed, node identity would use ML-DSA-65 keys. However, transport encryption specifics, handshake protocols, and peer discovery mechanisms are not documented in available public sources.

**Current state.** P2P details unconfirmed in public documentation.

**Planned future work.** No specific P2P PQC documentation published.

## On-Chain Logic

**Grade: D ⚠️**

Asentum smart contracts run in a JavaScript environment via Hardened JavaScript / SES. What cryptographic primitives are available to contracts — including whether any post-quantum signature verification is accessible on-chain — is not documented in currently available public sources.

**Current state.** JavaScript/SES execution model confirmed; available crypto primitives unconfirmed.

**Planned future work.** On-chain scheduling and cron functionality were introduced in the May 18 testnet update. PQC verification primitive availability is undocumented.

## Other Features

➖ No chain-specific PQC features beyond core signing have been identified.

## EC Sunset

**Grade: A ✅**

Adding PQC alongside EC is not the same as retiring EC. For reference, Asentum's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus 🔧, P2P ⚠️, On-Chain ⚠️, Other ➖.

Asentum was designed as a PQC-native chain from genesis. Based on available evidence, no elliptic-curve cryptography is used in the transaction signing or consensus layers. There is no inherited EC legacy to retire, which distinguishes it from established chains that launched with ECDSA and are now migrating.

**Current state.** No ECC present in transaction signing or consensus per available evidence.

**Planned future work.** No EC retirement plan needed under the stated design; EC may appear in cross-chain compatibility contexts not yet documented.

## Governance

Asentum is a recently launched network. On-chain governance via the $ASE token is claimed, but the proposal process and upgrade mechanisms have not been publicly documented.

Reference sources:

- [GlobeNewswire: Asentum Unveils Post-Quantum Blockchain Testnet (2026-04-30)](https://www.globenewswire.com/news-release/2026/04/30/3285129/0/en/asentum-unveils-post-quantum-blockchain-testnet-introducing-a-new-foundation-for-secure-and-accessible-on-chain-systems.html)
- [GlobeNewswire: Asentum Announces $ASE Token Presale (2026-05-04)](https://www.globenewswire.com/news-release/2026/05/04/3286981/0/en/Asentum-Announces-ASE-Token-Presale-Ahead-of-Post-quantum-Mainnet-Release.html)
- [GlobeNewswire: Asentum Nears ASE Launch (2026-05-12)](https://www.globenewswire.com/news-release/2026/05/12/3293137/0/en/Asentum-Nears-ASE-Launch-as-Global-Validator-Participation-Accelerates-Across-Its-Post-Quantum-Blockchain.html)
- [Asentum Project Site](https://www.asentum.com/)
- [Quantum Zeitgeist coverage](https://quantumzeitgeist.com/asentum-launches-post-quantum-blockchain-testnet/)

---

_Generated on 01 Jun 2026 based on information as of 01 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
