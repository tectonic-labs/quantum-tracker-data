# ML-DSA (Dilithium) — PQC Adoption Across L1s

| | |
|---|---|
| **Type** | Signature |
| **Cryptographic family** | Lattice (module-LWE) |
| **NIST standardization** | FIPS 204 |
| **Typically replaces** | ECDSA / EdDSA |
| **L1 blockchains tracked** | 22 |

ML-DSA, standardized by NIST as FIPS 204 and developed under the name CRYSTALS-Dilithium, is a lattice-based digital signature scheme. It is the most widely referenced post-quantum signature across the L1 blockchains tracked here, favored for its balance of moderate signature size and fast verification.

## Adoption summary

| Status | L1s |
|--------|----:|
| ✅ Implemented | 3 |
| 🔧 In Development | 8 |
| 🗺️ On Roadmap | 2 |
| ⚠️ Discussed | 9 |
| **Total** | **22** |

Each L1 is counted once, in its furthest-along adoption status. A chain listed under a given status may still be earlier-stage in some categories; the per-chain detail below shows every category each chain applies the algorithm to.

## L1 blockchains (22)

- ✅ **[Cellframe](../chains/l1/cellframe.md)** — Tx Signatures, Consensus — Implemented
- ✅ **[Naoris Protocol](../chains/l1/naoris-protocol.md)**
  - Tx Signatures — Implemented
  - Consensus — Implemented
- ✅ **[QANplatform](../chains/l1/qanplatform.md)** — Tx Signatures, Consensus, On-Chain — Implemented
- 🔧 **[Asentum](../chains/l1/asentum.md)**
  - Tx Signatures — In Development (mainnet launched 2026-05-13)
  - Consensus — In Development (mainnet launched 2026-05-13)
- 🔧 **[Bitcoin](../chains/l1/bitcoin.md)** — Tx Signatures, On-Chain — In Development (BTQ third-party fork only)
- 🔧 **[BNB Chain](../chains/l1/bnb-chain.md)**
  - Tx Signatures — In Development
  - Consensus — In Development
  - On-Chain — In Development
- 🔧 **[Canton](../chains/l1/canton.md)**
  - Tx Signatures — In Development
  - Consensus — Discussed
- 🔧 **[NEAR Protocol](../chains/l1/near-protocol.md)** — Tx Signatures — In Development (testnet Q2 2026; [nearcore#15731](https://github.com/near/nearcore/pull/15731))
- 🔧 **[Quantum Resistant Ledger](../chains/l1/qrl.md)** — On-Chain Logic — In Development (Zond Testnet V2, March 2026)
- 🔧 **[Ravencoin](../chains/l1/ravencoin.md)** — Tx Signatures — In Development (open PR, not merged)
- 🔧 **[XRP Ledger](../chains/l1/xrp-ledger.md)** — Tx Signatures, Consensus — In Development (live on AlphaNet testnet; mainnet integration PR stalled)
- 🗺️ **[Arc](../chains/l1/arc.md)** — Tx Signatures — On Roadmap (candidate, not yet selected)
- 🗺️ **[Ethereum](../chains/l1/ethereum.md)** — Tx Signatures, On-Chain — On Roadmap (EIP-8051 draft precompile)
- ⚠️ **[Cardano](../chains/l1/cardano.md)** — Tx Signatures, On-Chain — Discussed (CIP #1144 survey)
- ⚠️ **[Cosmos Hub](../chains/l1/cosmos-hub.md)** — Consensus — Discussed
- ⚠️ **[Dogecoin](../chains/l1/dogecoin.md)** — Tx Signatures — SDK-layer only ([libdogecoin#294](https://github.com/dogecoinfoundation/libdogecoin/pull/294), open)
- ⚠️ **[Ethereum Classic](../chains/l1/ethereum-classic.md)** — On-Chain — Discussed
- ⚠️ **[Flare](../chains/l1/flare.md)** — On-Chain — Discussed
- ⚠️ **[Hedera](../chains/l1/hedera.md)** — Tx Signatures — Discussed (ecosystem project only — third-party agent identity, not core protocol)
- ⚠️ **[IOTA](../chains/l1/iota.md)** — Other (IOTA Identity) — Discussed
- ⚠️ **[Solana](../chains/l1/solana.md)** — Tx Signatures — Discussed (Project Eleven prototype testnet, December 2025)
- ⚠️ **[Tezos](../chains/l1/tezos.md)** — Tx Signatures — Discussed (tz5 proposal preview, Feb 2026)

---

_Generated on 04 June 2026 from the L1 chain reports in this dataset._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_
