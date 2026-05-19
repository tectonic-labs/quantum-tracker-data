# SLH-DSA (SPHINCS+) — PQC Adoption Across L1s

| | |
|---|---|
| **Type** | Signature |
| **Cryptographic family** | Hash-based (stateless) |
| **NIST standardization** | FIPS 205 |
| **Typically replaces** | ECDSA / EdDSA |
| **L1 blockchains tracked** | 10 |

SLH-DSA, standardized by NIST as FIPS 205 and developed as SPHINCS+, is a stateless hash-based signature scheme. Its security rests only on the underlying hash function, giving it the most conservative assumptions of the standardized post-quantum signatures, at the cost of larger signatures.

## Adoption summary

| Status | L1s |
|--------|----:|
| ✅ Implemented | 3 |
| 🔧 In Development | 2 |
| 🗺️ On Roadmap | 1 |
| ⚠️ Discussed | 4 |
| **Total** | **10** |

Each L1 is counted once, in its furthest-along adoption status. A chain listed under a given status may still be earlier-stage in some categories; the per-chain detail below shows every category each chain applies the algorithm to.

## L1 blockchains (10)

- ✅ **[Arc](../chains/l1/arc.md)** — Tx Signatures, On-Chain — Implemented (Phase 1: opt-in PQC wallets and EVM precompile)
- ✅ **[Cellframe](../chains/l1/cellframe.md)** — Tx Signatures — Implemented (multi-algorithm option)
- ✅ **[Nervos Network](../chains/l1/nervos-network.md)** — Tx Signatures, On-Chain — Implemented (Quantum-Resistant Lock Script, mainnet 2025)
- 🔧 **[Aptos](../chains/l1/aptos.md)** — Tx Signatures — In Development (mainline integration, 43+ files)
- 🔧 **[Sui](../chains/l1/sui.md)** — Tx Signatures — Library building blocks merged; top-level API not yet available
- 🗺️ **[Quantum Resistant Ledger](../chains/l1/qrl.md)** — Tx Signatures, On-Chain Logic — Planned (deferred to post-Zond-mainnet)
- ⚠️ **[Bitcoin](../chains/l1/bitcoin.md)** — Tx Signatures, On-Chain — Discussed (named in earlier BIP-360 drafts; Project Eleven's "Quantum-Safe Taproot" SLH-DSA fallback)
- ⚠️ **[Cardano](../chains/l1/cardano.md)** — Tx Signatures, On-Chain — Discussed (CIP #1144 survey)
- ⚠️ **[IOTA](../chains/l1/iota.md)** — Other (IOTA Identity) — Discussed
- ⚠️ **[Ripple](../chains/l1/ripple.md)** — Tx Signatures (test-suite scope) — Discussed (rippled#6971 PQC readiness tests)

---

_Generated on 18 May 2026 from the L1 chain reports in this dataset._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_
