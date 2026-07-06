# Falcon (FN-DSA) — PQC Adoption Across L1s

| | |
|---|---|
| **Type** | Signature |
| **Cryptographic family** | Lattice (NTRU) |
| **NIST standardization** | FN-DSA / FIPS 206 (draft) |
| **Typically replaces** | ECDSA / EdDSA |
| **L1 blockchains tracked** | 13 |

Falcon -- being standardized by NIST as FN-DSA in the draft FIPS 206 -- is a lattice-based signature scheme built on NTRU lattices. Its compact signatures make it attractive where transaction size or on-chain verification cost is the binding constraint, at the cost of a more delicate constant-time implementation.

## Adoption summary

| Status | L1s |
|--------|----:|
| ✅ Implemented | 1 |
| 🧪 Testnet Live | 1 |
| 🔧 In Development | 0 |
| 🗺️ On Roadmap | 2 |
| ⚠️ Discussed | 9 |
| **Total** | **13** |

Each L1 is counted once, in its furthest-along adoption status. A chain listed under a given status may still be earlier-stage in some categories; the per-chain detail below shows every category each chain applies the algorithm to.

## L1 blockchains (13)

- ✅ **[Algorand](../chains/l1/algorand.md)**
  - On-Chain — Shipped (`falcon_verify` opcode live on mainnet since AVM v12 / consensus v41, Sept 2024)
  - Other (State Proofs) — Shipped (live since 2022)
  - Tx Signatures — Roadmapped (opt-in live on mainnet since Nov 2025 via CLI; native PQ account PR #6639 open; no retail wallet ships PQC signing)
- 🧪 **[TRON](../chains/l1/tron.md)** — Tx Signatures, Consensus, P2P, On-Chain — Testnet Live
- 🗺️ **[Ethereum](../chains/l1/ethereum.md)** — Tx Signatures, On-Chain — On Roadmap (EIP-7619, EIP-7592, EIP-8052 draft precompiles; ZKNox/ETHFALCON pure-Solidity demos)
- 🗺️ **[Solana](../chains/l1/solana.md)** — On-Chain (verification syscall) — On Roadmap (SIMD-0461 syscall proposal closed unmerged June 2026; client PRs firedancer#9446 and solana-sdk#537 stale)
- ⚠️ **[Avalanche](../chains/l1/avalanche.md)** — Tx Signatures, Consensus, On-Chain — Discussed
- ⚠️ **[Bitcoin](../chains/l1/bitcoin.md)** — Tx Signatures, On-Chain — Discussed (named in earlier BIP-360 drafts; algorithm spec factored out)
- ⚠️ **[Cardano](../chains/l1/cardano.md)** — Tx Signatures, On-Chain — Discussed (CIP #1144 survey)
- ⚠️ **[Dogecoin](../chains/l1/dogecoin.md)** — Tx Signatures — SDK-layer only ([libdogecoin#294](https://github.com/dogecoinfoundation/libdogecoin/pull/294), open)
- ⚠️ **[IOTA](../chains/l1/iota.md)** — Other (IOTA Identity) — Discussed
- ⚠️ **[Kaspa](../chains/l1/kaspa.md)** — Tx Signatures — Discussed (open draft PR [rusty-kaspa#761](https://github.com/kaspanet/rusty-kaspa/pull/761), stale since Dec 2025)
- ⚠️ **[Sei](../chains/l1/sei.md)** — Tx Signatures, Consensus — Discussed
- ⚠️ **[Sonic](../chains/l1/sonic.md)** — Tx Signatures, Consensus — Discussed
- ⚠️ **[Zilliqa](../chains/l1/zilliqa.md)** — Tx Signatures, On-Chain — Discussed

---

_Generated on 06 July 2026 from the L1 chain reports in this dataset._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_
