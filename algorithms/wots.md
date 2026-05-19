# WOTS+ — PQC Adoption Across L1s

| | |
|---|---|
| **Type** | Signature |
| **Cryptographic family** | Hash-based (one-time) |
| **NIST standardization** | RFC 8391 component |
| **Typically replaces** | ECDSA / EdDSA / Schnorr |
| **L1 blockchains tracked** | 3 |

WOTS+ (Winternitz One-Time Signature Plus) is a hash-based one-time signature primitive. It underpins XMSS and SPHINCS+, and is also used directly by chains that accept the one-time-use constraint in exchange for minimal cryptographic assumptions.

## Adoption summary

| Status | L1s |
|--------|----:|
| ✅ Implemented | 1 |
| 🔧 In Development | 1 |
| 🗺️ On Roadmap | 0 |
| ⚠️ Discussed | 1 |
| **Total** | **3** |

Each L1 is counted once, in its furthest-along adoption status. A chain listed under a given status may still be earlier-stage in some categories; the per-chain detail below shows every category each chain applies the algorithm to.

## L1 blockchains (3)

- ✅ **[Mochimo](../chains/l1/mochimo.md)** — Tx Signatures — Shipped (mainnet genesis, June 2018)
- 🔧 **[Quip Network](../chains/l1/quip-network.md)** — Tx Signatures — In Development (testnet)
- ⚠️ **[Bitcoin](../chains/l1/bitcoin.md)** — On-Chain — Discussed (conduition's OP_CAT-Winternitz construction; Kudinov & Nick paper; Quip.Network WOTS+ wallet)

---

_Generated on 18 May 2026 from the L1 chain reports in this dataset._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_
