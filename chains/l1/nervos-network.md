# Nervos Network (CKB) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Nervos Network |
| **Ticker** | CKB |
| **GitHub** | https://github.com/nervosnetwork |
| **On-chain environment** | RISC-V (CKB-VM) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | A | ✅ | Shipped |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Nervos CKB has a [Quantum-Resistant Lock Script using SPHINCS+](https://docs.nervos.org/docs/ckb-features/native-quantum-resistance) deployed in production on mainnet since 2025, accompanied by the ["Quantum Purse" wallet](https://talk.nervos.org/t/quantum-purse-a-wallet-light-client-in-your-browser/8758). The chain's NC-Max consensus is hash-based — using the Eaglesong mining hash — and is therefore already quantum-resistant on the consensus side. Because CKB-VM is a RISC-V virtual machine that treats every signature verifier as deployable bytecode rather than a protocol-level precompile, additional PQC families can be added as new lock scripts without a hard fork. This same property is what makes the on-chain logic layer green: SPHINCS+ verification is live in production via bytecode.

The remaining gaps are the P2P networking layer, where node identity is still elliptic-curve based with no published quantum-resistant handshake, and EC sunset: the original secp256k1 lock script remains available for new accounts and has no scheduled retirement.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **SPHINCS+** (SLH-DSA family / FIPS 205) | secp256k1 ECDSA | Tx Signatures, On-Chain | Implemented (Quantum-Resistant Lock Script, mainnet 2025) |

## 1. Transaction Signatures

**Grade: A ✅**

CKB accounts are identified by a "lock script" — RISC-V bytecode that defines the spending condition for that account. Two production lock scripts coexist on mainnet today:

- The original **secp256k1 ECDSA** lock script (default; quantum-vulnerable).
- A [Quantum-Resistant Lock Script using **SPHINCS+**](https://github.com/nervosnetwork/quantum-resistant-lock-script) deployed in 2025, supporting 12 selectable parameter sets.

The standard ["Quantum Purse" wallet](https://talk.nervos.org/t/quantum-purse-a-wallet-light-client-in-your-browser/8758) lets users hold post-quantum keys. The underlying scheme is standardized as FIPS 205 (SLH-DSA).

**Current state.** Both ECDSA and **SPHINCS+** lock scripts are live on mainnet. Users choose at account creation; new ECDSA accounts can also still be created.

**Planned future work.** Cryptape and the CKB team continue to extend PQC parameter set coverage and improve migration tooling. As FIPS 204 (**ML-DSA**) and FIPS 206 (**Falcon**) mature, additional PQC families could be deployed as new lock scripts without a protocol fork.

## 2. Consensus

**Grade: A ✅**

CKB uses [NC-Max consensus](https://github.com/nervosnetwork/ckb), a Nakamoto Consensus variant that adds a two-step confirmation process for selfish-mining resistance. Mining uses **Eaglesong**, a sponge-construction hash. Because consensus is hash-based PoW and there are no validator signatures to forge, the consensus layer is already quantum-resistant; Grover's algorithm provides only quadratic speedup against hash functions, which difficulty adjustment absorbs.

**Current state.** Hash-based PoW with the Eaglesong mining hash. No EC cryptography in the consensus mechanism.

**Planned future work.** None needed for the consensus layer specifically.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Nervos Network in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: A ✅**

CKB-VM is a RISC-V virtual machine. Cryptographic primitives are not provided as protocol-level precompiles; they are deployed as bytecode "system scripts" or "lock scripts." The secp256k1 verifier is a deployed system script, and the **SPHINCS+** verifier is a deployed lock script live in production. Because verifier code is data, new PQC families (lattice-based, code-based, or others) can be added by deploying new lock scripts — no hard fork required.

**Current state.** [**SPHINCS+** verification is live](https://blog.cryptape.com/quantum-computation-new-challenge-to-ckbs-security) in production via the Quantum-Resistant Lock Script. Hash-based PQ verification is therefore available on-chain today.

**Planned future work.** Active addition of further PQC families is referenced in Cryptape and CKB documentation. Additional schemes can ship as new lock scripts without protocol changes.

## 5. Other Features

Nervos Network does not support any special features.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Nervos Network's PQC-adoption ratings per category are: Tx Signatures ✅, Consensus ✅, P2P ❌, On-Chain ✅, Other ➖.

The secp256k1 lock script remains available for new accounts and has no announced retirement schedule. The migration model is user-driven and requires no hard fork — a strength of the bytecode-script design — but it means EC will continue to be accepted indefinitely until users individually migrate. To schedule EC retirement, CKB would need a governance proposal or planned fork to retire the secp256k1 system script.

**Current state.** No deprecation timeline for the secp256k1 lock script. Both lock scripts coexist; users choose at account creation.

**Planned future work.** No public retirement schedule, fork plan, or governance proposal targeting EC removal has been announced.

## Governance

Protocol-level discussion happens on the [Nervos Talk forum](https://talk.nervos.org/) and through the [nervosnetwork GitHub organization](https://github.com/nervosnetwork). The [native quantum resistance documentation](https://docs.nervos.org/docs/ckb-features/native-quantum-resistance) and the [Cryptape blog](https://blog.cryptape.com/quantum-computation-new-challenge-to-ckbs-security) are the principal venues for PQC status updates.

Because new signature schemes ship as bytecode lock scripts rather than protocol upgrades, adding PQC families does not require a governance vote. Retiring the secp256k1 system script would require coordinated protocol-level action, but no such proposal is currently on the public record.

---

_Generated on 06 May 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
