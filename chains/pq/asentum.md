# Asentum (ASE) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Asentum |
| **Ticker** | ASE |
| **Website** | https://www.asentum.com/ |
| **Twitter / X** | https://x.com/Asentum |
| **On-chain environment** | JavaScript smart contracts via Hardened JavaScript / SES (no EVM) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | B | 🔧 | In Development |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | ➖ | ➖ | Not Applicable |

Asentum is a from-scratch Layer-1 blockchain that integrates post-quantum digital signatures (**ML-DSA-65** / Dilithium3, FIPS 204 Level 3) into its core design across transaction signing, consensus, and node identity. It uses Tendermint-style BFT consensus with claimed ~2-second finality and a JavaScript execution model based on Hardened JavaScript / SES (the same isolation primitive used by Agoric) rather than the EVM. The native token, $ASE, is used for fees, staking, and governance. Mainnet [launched on 13 May 2026](https://www.globenewswire.com/news-release/2026/05/12/3293137/0/en/Asentum-Nears-ASE-Launch-as-Global-Validator-Participation-Accelerates-Across-Its-Post-Quantum-Blockchain.html), following a public testnet that has been live since 30 April 2026.

Because Asentum is a young chain and several of its cryptographic claims have not yet been independently verified, this report distinguishes confirmed facts from claimed properties. **ML-DSA-65** at the signing layer is confirmed in a validator onboarding application that states "Your Dilithium3 keypair is encrypted locally and never leaves this machine." ML-DSA-65 validator signing at the consensus layer is claimed by the project but has not been confirmed by an independent third party — no independent cryptographic audit of the implementation has been published. The peer-to-peer transport, node identity, and on-chain cryptographic primitives are not yet documented in enough detail to evaluate, so those surfaces are graded as discussed only. There is no elliptic-curve cryptography in Asentum's signing or consensus per the available evidence, so the EC Sunset category does not apply: there is nothing to retire.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA-65** / Dilithium3 (FIPS 204, Level 3) | (PQC-native; no EC predecessor) | Transaction Signatures | In Development (confirmed at signing layer; mainnet live, audit pending) |
| **ML-DSA-65** / Dilithium3 (FIPS 204, Level 3) | (PQC-native; no EC predecessor) | Consensus | In Development (claimed; pending independent verification) |

## 1. Transaction Signatures

**Grade: B 🔧**

**Current state.** Transactions are signed with **ML-DSA-65** / Dilithium3 (FIPS 204, Level 3). This is confirmed in a validator onboarding application that explicitly references local Dilithium3 keypair generation. Mainnet launched 13 May 2026 with this scheme at the signing layer. Address derivation, multi-signature/threshold support, and account-abstraction details are not yet publicly documented. No independent third-party cryptographic audit of the implementation has been published, so the implementation remains pending verification.

**Planned future work.** Independent cryptographic audit and publication of signing-layer documentation (address derivation, multi-signature support) would allow this category to be re-evaluated.

## 2. Consensus

**Grade: B 🔧**

**Current state.** Asentum uses Tendermint-style BFT consensus with claimed instant finality of approximately 2 seconds. The project states that block signing and validator identity both use **ML-DSA-65** / Dilithium3 keys. The public testnet has finalized 20,000+ blocks across a small validator set (reported as 5–27 validators across three continents), and mainnet launched 13 May 2026. ML-DSA at the consensus layer is a notable claim, as most existing chains still rely on elliptic-curve schemes for validator signing; however, this property is claimed by the project and has not been independently verified, and no cryptographic audit has been published.

**Planned future work.** Independent verification of ML-DSA-65 validator signing and a published audit would confirm the consensus-layer claim.

## 3. P2P Networking

**Grade: D ⚠️**

**Current state.** The peer-to-peer transport protocol, node identity scheme, handshake/encryption, and peer-discovery mechanism are not publicly documented. The project's stated "post-quantum at every layer" design suggests node identity may also use ML-DSA-65, but the transport-layer specifics are unconfirmed. This surface has been discussed in the project's design framing but cannot yet be evaluated against published detail.

**Planned future work.** Publication of networking-layer documentation specifying the transport protocol, node identity scheme, and any key-exchange mechanism would allow this category to be graded on evidence.

## 4. On-Chain Logic

**Grade: D ⚠️**

**Current state.** Asentum supports smart contracts written in JavaScript via Hardened JavaScript / SES (Agoric-style isolation), providing deterministic execution without an EVM. The availability of cryptographic primitives to contracts — including any on-chain signature-verification interface or post-quantum verification capability — is not yet publicly documented. On-chain scheduling and cron features were rolled out in a testnet update. The execution model is a notable departure from EVM/Move/WASM, but its cryptographic capabilities remain undocumented and so can only be treated as discussed.

**Planned future work.** Documentation of the cryptographic primitives available to contracts (hashing, signature verification, post-quantum verification) would allow this category to be evaluated.

## 5. Other Features

**Grade: ➖ Not Applicable**

No chain-specific PQC features have been identified beyond the core signing and consensus design. This category does not apply.

## 6. EC Sunset

**Grade: ➖ Not Applicable**

Asentum is designed to use post-quantum signatures from genesis, and there is no elliptic-curve cryptography in its transaction signing or consensus per the available evidence. Because there is no legacy elliptic-curve dependency to remove, this category does not apply: there is nothing to retire.

## Governance

Asentum uses on-chain governance via the $ASE token, in which validators and token holders propose and vote on protocol changes that execute automatically after a timelock. Certain foundational parameters — including the maximum supply, the post-quantum cryptographic requirements, and the JavaScript execution model — are described as permanently fixed and not alterable by governance. As of mainnet launch the validator set is small and the team retains effective operational control.

- Website: https://www.asentum.com/
- Design spec / research: https://asentum.com/research
- Testnet block explorer: https://testnet.asentum.com/

---

_Generated on 24 Jun 2026 based on information as of 01 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
