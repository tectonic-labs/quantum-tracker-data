# Ripple (XRP) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Ripple (XRP Ledger) |
| **Ticker** | XRP |
| **Website** | https://xrpl.org |
| **GitHub** | https://github.com/XRPLF |
| **On-chain environment** | XRPL native transactions; Hooks (WebAssembly) under development |
| **Mainnet genesis** | 2012-01-01 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | B | 🔧 | In Development |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

The XRP Ledger has shipped end-to-end PQC on a separate research network. The [AlphaNet testnet](https://coinedition.com/xrp-ledger-alphanet-tests-quantum-resistant-security-upgrade/), launched in December 2025, runs Quantum Accounts, Quantum Transactions, and Quantum Consensus using **ML-DSA / Dilithium** as the only signature scheme — no ECDSA or Ed25519. AlphaNet is a fork; the production rippled codebase remains EC-only and there is no announced mainnet activation date.

Mainnet groundwork is in flight. [XRPLF/rippled#5131](https://github.com/XRPLF/rippled/pull/5131) tracks the **ML-DSA** submodule integration into the production codebase but has been stalled with merge conflicts since September 2024. [XRPLF/rippled#6971](https://github.com/XRPLF/rippled/pull/6971), opened April 2026, adds a 51-assertion PQC readiness test suite verifying that rippled correctly handles oversized PQC key/signature sizes across publicKeyType, serialization, consensus, and signing code paths — defensive hardening rather than integration. An [April 2026 quantum-exposure analysis](https://themarketperiodical.com/2026/04/09/ripple-news-xrp-validator-says-300k-xrpl-accounts-with-2-4b-xrp-remain-safe/) of all 7.8M XRPL accounts found roughly 0.03% of XRP supply has revealed public keys on-chain, a lower exposure than most chains due to XRPL's account-rotation model.

Ripple published a formal [4-phase PQC migration roadmap](https://xrpl.org/blog) on April 21, 2026, with a Project Eleven validator testing partnership in place. The roadmap targets full transition by 2028. RippleX engineers have also begun making public appearances discussing quantum security posture, including a [May 2026 interview](https://youtu.be/wpPP4hdEhpw) on the Paul Barron Network.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** (Dilithium / FIPS 204) | ECDSA secp256k1, Ed25519 | Tx Signatures, Consensus | In Development (live on AlphaNet testnet; mainnet integration PR stalled) |
| **Falcon / FN-DSA** | ECDSA secp256k1, Ed25519 | Tx Signatures (test-suite scope) | Discussed (rippled#6971 PQC readiness tests) |
| **SLH-DSA** (SPHINCS+) | ECDSA secp256k1, Ed25519 | Tx Signatures (test-suite scope) | Discussed (rippled#6971 PQC readiness tests) |

## 1. Transaction Signatures

**Grade: B 🔧**

Mainnet XRPL transactions are signed with ECDSA secp256k1 (default) or Ed25519. Both are exposed by Shor's algorithm. XRPL's account model lets an account rotate its key without changing its address, so a key that has never signed an outgoing transaction is not exposed in the public ledger — a structural mitigation, not a migration. The April 2026 validator analysis confirmed that roughly 300,000 accounts holding approximately 2.4 billion XRP have never exposed their public key on-chain.

The [AlphaNet testnet](https://cryptoslate.com/xrpl-flips-to-quantum-safe-signatures-2420-byte-proofs-replace-elliptic-curves/) demonstrates a working **ML-DSA** transaction path end-to-end: Quantum Accounts hold Dilithium identities, Quantum Transactions carry Dilithium signatures (~2,420 bytes versus 64 bytes for ECDSA), and Quantum Consensus signs validator votes with the same scheme. AlphaNet does not preserve EC backwards compatibility — Dilithium is the sole signature scheme there.

Ripple's formal 4-phase roadmap (published April 21, 2026) with Project Eleven outlines: Phase 1 Q-Day Readiness; Phase 2 Assessment + Testing (1H 2026) under real XRPL workloads; Phase 3 Controlled Integration (2H 2026) with phased validator rollout; Phase 4 Full Transition (by 2028). The 38x signature-size penalty (2,420 bytes versus 64) is a known engineering constraint under active evaluation.

**Current state.** Mainnet uses ECDSA secp256k1 / Ed25519 only. AlphaNet runs **ML-DSA** end-to-end as a separate research network.

**Planned future work.** [XRPLF/rippled#5131](https://github.com/XRPLF/rippled/pull/5131) tracks the ML-DSA submodule integration into rippled itself, currently stalled on merge conflicts. [XRPLF/rippled#6971](https://github.com/XRPLF/rippled/pull/6971) lands a defensive PQC readiness test suite. Mainnet activation is unscheduled and would require XRPL amendment governance. Full transition targeted by 2028 per published roadmap.

## 2. Consensus

**Grade: B 🔧**

XRPL uses the [Ripple Protocol Consensus Algorithm (RPCA)](https://xrpl.org/docs/concepts/consensus-protocol), a federated Byzantine agreement protocol. Validators do not mine; they participate in voting rounds using ECDSA or Ed25519 ephemeral keys, and ledgers close every 3–5 seconds when ~80% of a validator's Unique Node List agrees. Validator vote forgery is the quantum break path.

The AlphaNet testnet replaces validator vote signing with **ML-DSA**, demonstrating an end-to-end Quantum Consensus path. Mainnet rollout requires coordinated validator-set upgrade and amendment passage; no date has been announced. Coordination cost is higher than the transaction-signature path because all validators must upgrade together.

**Current state.** Mainnet validator votes use ECDSA / Ed25519. AlphaNet runs Quantum Consensus on **ML-DSA** end-to-end.

**Planned future work.** Phase 3 of the published 4-phase roadmap targets controlled validator integration in 2H 2026. No mainnet activation timeline confirmed.

## 3. P2P Networking

**Grade: F ❌**

XRPL peers gossip over an HTTPS upgrade to the [XRPL/2.0 protocol](https://xrpl.org/docs/concepts/networks-and-servers/peer-protocol) (formerly RTXP/1.2) on IANA port 2459. Node identity is derived from ECDSA secp256k1 public keys. AlphaNet's PQ work scope covered consensus and transaction signatures; no peer-protocol changes were made.

**Current state.** secp256k1 node identity, no PQ alternative drafted.

**Planned future work.** No standards proposal, working-group thread, or specification is currently published for PQ peer protocol or node-identity migration on XRPL.

## 4. On-Chain Logic

**Grade: Not Applicable (➖)**

XRPL has limited smart-contract capability and does not expose general-purpose cryptographic precompiles. The Automated Market Maker (XLS-30) is native and uses inherited transaction signatures. [Hooks (XLS-22)](https://hooks.xrpl.org/) — small WebAssembly modules executing before or after transactions — are deliberately bounded and do not expose signature-verification primitives in their API. Escrow conditions are time-based or hash-preimage-based (SHA-256), not signature-based.

Because there is no general PQC-verification primitive to grade, this category is Not Applicable.

## 5. Other Features

**Grade: F ❌**

### Payment Channels and Escrow

**Current state.** Payment channels authorize fund release via signed claim objects (ECDSA / Ed25519); claim signatures are verified on-ledger and would be forgeable under a quantum break. Escrow conditions support time-locks and SHA-256 hash-preimage conditions; both are quantum-safe in isolation, with the broader account security still tied to the transaction-signature scheme.

**Planned future work.** No PQ-specific roadmap for payment channels or escrow. Both inherit whatever signature scheme the transaction layer uses, so a mainnet ML-DSA migration would propagate automatically.

### Cross-Chain Bridges and Interledger Protocol

**Current state.** Bridge consensus relies on validator-set signatures (ECDSA / Ed25519) and Interledger Protocol atomic swaps use SHA-256 hash-preimage plus time-lock conditions. Bridge validator forgery is the dominant quantum risk.

**Planned future work.** No bridge-specific PQ proposal published; bridge security tracks the consensus-layer migration.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, XRP Ledger's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus 🔧, P2P ❌, On-Chain ➖, Other ❌.

Ripple has committed publicly to maintaining ECDSA / Ed25519 on mainnet indefinitely. AlphaNet hard-cuts EC support on its testnet, but no equivalent step is scheduled for mainnet — the proposed mainnet path is parallel operation between EC and PQ accounts, not a deprecation. The 38x signature-size penalty (2,420 bytes versus 64) is cited in [public coverage](https://cryptorank.io/news/feed/2e33c-quantum-threat-to-crypto-overstated-says-ripple-cto-david-schwartz) as a reason to retain EC for lightweight clients.

**Current state.** No mainnet EC retirement scheduled. AlphaNet is EC-free but is a separate testnet, not a deprecation milestone.

**Planned future work.** None published. Migration path described in public material is voluntary parallel operation — quantum keys for new accounts, EC keys still valid — gated on amendment governance.

## Governance

XRPL protocol changes follow the XRPLF amendment process. Amendments are proposed in the [XRPL-Standards repo](https://github.com/XRPLF/XRPL-Standards) and the [rippled repo](https://github.com/XRPLF/rippled), debated openly, and require validator supermajority (>=80%) sustained for two weeks to activate.

Active PQ-relevant work:

- [XRPLF/rippled#5131](https://github.com/XRPLF/rippled/pull/5131) — ML-DSA / Dilithium submodule integration. Status: Draft with conflicts (opened 2024-09-13).
- [XRPLF/rippled#6971](https://github.com/XRPLF/rippled/pull/6971) — PQC readiness test suite (10 cases, 51 assertions across ML-DSA / Falcon / SLH-DSA size handling). Status: Open (2026-04-18).
- [XRPL-Standards Discussion #79](https://github.com/XRPLF/XRPL-Standards/discussions/79) — Next-Generation Cryptography.
- [XRPL-Standards Discussion #295](https://github.com/XRPLF/XRPL-Standards/discussions/295) — Quantum-Resistant Signatures.

Implementation tracking:

- [AlphaNet testnet](https://coinedition.com/xrp-ledger-alphanet-tests-quantum-resistant-security-upgrade/) — Quantum Accounts, Quantum Transactions, Quantum Consensus on **ML-DSA** since December 2025.
- [Quantum-exposure analysis (April 2026)](https://www.coindesk.com/tech/2026/04/10/xrp-may-be-less-exposed-to-quantum-threats-than-bitcoin-experts-say) of all 7.8M XRPL accounts.
- [Ripple 4-phase PQC roadmap](https://xrpl.org/blog) — published April 21, 2026; full transition targeted by 2028.

No mainnet amendment vote has been scheduled.

---

_Generated on 07 May 2026 based on information as of 07 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
