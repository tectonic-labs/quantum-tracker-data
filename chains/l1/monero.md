# Monero (XMR) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Monero |
| **Ticker** | XMR |
| **Website** | https://getmonero.org |
| **GitHub** | https://github.com/monero-project/monero |
| **Twitter / X** | https://x.com/monero |
| **On-chain environment** | None (no smart contracts) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Monero's protocol is built end-to-end on elliptic-curve cryptography. [Ed25519 spend authorization](https://www.moneroinflation.com/ring_signatures_clsag), [CLSAG ring signatures](https://www.moneroinflation.com/ring_signatures_clsag), [stealth addresses via ECDH](https://eprint.iacr.org/2020/548.pdf) on Curve25519, [Pedersen commitments](https://web.getmonero.org/library/Zero-to-Monero-2-0-0.pdf), and [Bulletproofs+ range proofs](https://www.getmonero.org/2020/12/24/Bulletproofs+-in-Monero.html) on Ristretto are all curve-based. A quantum break against the underlying discrete-log problem would be retroactive: recorded ring signatures, encrypted note ciphertexts, and Pedersen commitments stored on chain today could be re-analyzed to identify true signers, link stealth addresses, and recover hidden amounts across the historical ledger. Past privacy is not preserved by any future migration; transactions made today carry forward the post-quantum risk.

The most concrete PQC development is the selection of **CSIDH-1024** (an isogeny-based post-quantum scheme) for the [Jamtis addressing scheme](https://gist.github.com/tevador/50160d160d24cfc6c52ae02eb3d17024), which would embed a CSIDH-1024 public key in every transaction's tx_extra field and produce 400-character addresses. This is a concrete algorithm selection with a backwards-compatible design, but it has no deployment timeline. The recently activated [FCMP++](https://www.getmonero.org/2024/04/27/fcmps.html) upgrade improves privacy set size but maintains EC dependencies.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **CSIDH-1024** | ECDH (Curve25519) | Tx Signatures (Jamtis addressing) | Discussed |

## 1. Transaction Signatures

**Grade: D ⚠️**

Monero transaction signing relies on [Ed25519](https://web.getmonero.org/library/Zero-to-Monero-2-0-0.pdf) for transaction authorization and [CLSAG ring signatures](https://www.moneroinflation.com/ring_signatures_clsag) (built on Ed25519 elliptic-curve operations) for sender anonymity. Both are vulnerable to Shor's algorithm.

The [Jamtis addressing scheme](https://gist.github.com/tevador/50160d160d24cfc6c52ae02eb3d17024) has selected **CSIDH-1024** (standard parameters, Option A) as the post-quantum key exchange primitive. All transactions would embed a CSIDH-1024 public key in tx_extra; legacy wallets would ignore it with no scan-time change. Addresses would be 400 characters. An optional interactive symmetric-crypto payment protocol is also being designed. CSIDH is an isogeny-based scheme — distinct from the NIST-standardized lattice families that most other chains are converging on — and carries its own cryptanalytic history.

**Current state.** All transaction signing uses Ed25519 and CLSAG. No post-quantum signatures are deployed.

**Planned future work.** Jamtis with **CSIDH-1024** is the concrete next step for post-quantum key exchange in stealth addresses. No deployment timeline has been announced.

## 2. Consensus

**Grade: A ✅**

Monero uses [RandomX](https://www.getmonero.org/resources/moneropedia/randomx.html), a CPU-optimized proof-of-work algorithm based on random code execution and memory-hard operations. RandomX is hash-based (SHA-3, BLAKE2) with no elliptic-curve component. Quantum computers cannot efficiently attack memory-hard PoW, and Grover's algorithm provides at most a quadratic speedup against hash functions — leaving security well within safe bounds.

**Current state.** Mining and block validation are entirely hash-based. Validator identity does not depend on EC.

**Planned future work.** None needed for the consensus layer specifically.

## 3. P2P Networking

**Grade: F ❌**

Monero's [Levin protocol](https://monero-book.cuprate.org/p2p_network/levin.html) uses Ed25519 for node identity and authentication. [Dandelion++](https://resilience365.com/dandelion-for-monero/) provides transaction-origin obfuscation but relies on EC-based node identity for routing. No post-quantum networking alternative has been documented.

**Current state.** All node signing and authentication uses Ed25519.

**Planned future work.** None documented.

## 4. On-Chain Logic

Monero is not a smart contract platform. There are no precompiles, no on-chain VM, and no need to verify PQC signatures on-chain. This category does not apply.

## 5. Other Features

**Grade: F ❌**

### Ring Signatures (CLSAG)

[CLSAG ring signatures](https://www.moneroinflation.com/ring_signatures_clsag) hide the sender by including decoys; they prove one of N keys signed the transaction without revealing which. Built on Ed25519, a quantum attacker could identify the real signer among ring members by solving discrete-log.

**Current state.** CLSAG is EC-based. [FCMP++](https://www.getmonero.org/2024/04/27/fcmps.html) (activated Q1 2026) replaces ring signatures with zero-knowledge membership proofs but [still uses elliptic-curve point commitments](https://ccs.getmonero.org/proposals/fcmp++-development.html). The [FCMP++ + CARROT stressnet v2.0](https://github.com/seraphis-migration/monero) was released by the Monero Research Lab in May 2026; CARROT is a new addressing protocol but remains EC-based.

**Planned future work.** Research-phase alternatives include GLYPH (hash-based ring signatures) and MatRiCT (alternative confidential transaction protocol). Neither has an implementation timeline. Open discussion continues at [MRL GitHub issues #151](https://github.com/monero-project/research-lab/issues/151) and [#131](https://github.com/monero-project/research-lab/issues/131).

### Stealth Addresses

[Stealth addresses](https://eprint.iacr.org/2020/548.pdf) use ECDH (Curve25519) to generate unique one-time destination addresses per transaction. A quantum attacker can derive shared secrets and identify recipient addresses retroactively.

**Current state.** ECDH-based stealth addresses. The Jamtis scheme with **CSIDH-1024** would replace the classical ECDH component with post-quantum key exchange.

**Planned future work.** Jamtis/CSIDH-1024 addresses this specific primitive, but has no deployment timeline.

### Pedersen Commitments and Bulletproofs+

[Pedersen commitments](https://www.getmonero.org/library/RctCheatsheet20210604.pdf) hide transaction amounts using EC point operations. [Bulletproofs+](https://risencrypto.github.io/Bulletproofs/) prove amounts are in valid range using inner-product arguments on EC points. A quantum attacker could recover all committed values, revealing all transaction amounts, and forge range proofs.

**Current state.** EC-based. No post-quantum alternative deployed or planned.

**Planned future work.** None documented.

### Retroactive Deanonymization Risk

Because all privacy primitives are EC-based, a [quantum break would retroactively deanonymize the entire historical Monero ledger](https://www.quantumcanary.org/insights/is-monero-quantum-secure-explore-the-leading-privacy-coin): recovering sender identities from ring signatures, decrypting stealth addresses, and revealing all transaction amounts from Pedersen commitments. This is fundamentally different from transparent-transaction chains, where a quantum break only affects future transactions or exposed public keys.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ✅, P2P ❌, On-Chain ➖, Other ❌.

No production EC retirement plan exists. [FCMP++](https://xgram.io/blog/monero-fcmp) (Q1 2026) improves privacy but maintains EC dependencies. The Jamtis/CSIDH-1024 research targets one specific primitive (stealth-address key exchange) but does not address ring signatures, Pedersen commitments, Bulletproofs+, or node identity. [Community-funded post-quantum research](https://ccs.getmonero.org/proposals/research-post-quantum-monero.html) continues but acknowledges there is no complete, production-ready plan to make every component PQC-safe.

**Current state.** EC cryptography underpins every privacy primitive. No category has a published EC retirement timeline. The [FCMP++ + CARROT stressnet v2.0](https://github.com/seraphis-migration/monero), released by the Monero Research Lab in May 2026, continues this pattern: CARROT is a new addressing protocol, and the v2.0 stressnet is still discrete-log based. It is a meaningful privacy-primitive improvement but not a PQC migration.

**Planned future work.** Jamtis/CSIDH-1024 for stealth addresses; GLYPH and MatRiCT remain in research phase for other primitives.

## Governance

Monero governance is informal and community-driven, centered on the [Monero Research Lab (MRL)](https://github.com/monero-project/research-lab/issues/151) GitHub and the Community Crowdfunding System (CCS).

PQC-related governance activity:

- **MRL GitHub Issue #151** — [Post-quantum cryptography discussion](https://github.com/monero-project/research-lab/issues/151). Open.
- **MRL GitHub Issue #131** — [Post-quantum security and ethics discussion](https://github.com/monero-project/research-lab/issues/131). Open.
- **CCS: Research post-quantum strategies** — [Community-funded research proposal](https://ccs.getmonero.org/proposals/research-post-quantum-monero.html) for post-quantum Monero strategies.
- **Jamtis addressing scheme** — [Tevador's proposal](https://gist.github.com/tevador/50160d160d24cfc6c52ae02eb3d17024) with CSIDH-1024 selected as Option A (standard parameters). No formal governance action; research-stage design.

---

_Generated on 01 Jun 2026 based on information as of 01 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
