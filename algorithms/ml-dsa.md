# ML-DSA (Dilithium) — PQC Adoption Across L1s

| | |
|---|---|
| **Type** | Signature |
| **Cryptographic family** | Lattice (module-LWE) |
| **NIST standardization** | FIPS 204 |
| **Typically replaces** | ECDSA / EdDSA |
| **L1 blockchains tracked** | 23 |

ML-DSA, standardized by NIST as FIPS 204 and developed under the name CRYSTALS-Dilithium, is a lattice-based digital signature scheme. It is the most widely referenced post-quantum signature across the L1 blockchains tracked here, favored for its balance of moderate signature size and fast verification.

## Adoption summary

| Status | L1s |
|--------|----:|
| ✅ Implemented | 0 |
| 🧪 Testnet Live | 2 |
| 🔧 In Development | 4 |
| 🗺️ On Roadmap | 3 |
| ⚠️ Discussed | 14 |
| **Total** | **23** |

Each L1 is counted once, in its furthest-along adoption status. A chain listed under a given status may still be earlier-stage in some categories; the per-chain detail below shows every category each chain applies the algorithm to.

## L1 blockchains (23)

- 🧪 **[NEAR Protocol](../chains/l1/near-protocol.md)** — Tx Signatures — Testnet Live (active on public testnet at protocol v85; [nearcore#15878](https://github.com/near/nearcore/pull/15878))
- 🧪 **[TRON](../chains/l1/tron.md)** — Tx Signatures, Consensus, P2P, On-Chain — Testnet Live
- 🔧 **[Bitcoin](../chains/l1/bitcoin.md)** — Tx Signatures, On-Chain — In Development (BTQ third-party fork only)
- 🔧 **[BNB Chain](../chains/l1/bnb-chain.md)**
  - Consensus — In Development
  - On-Chain — In Development
  - Tx Signatures — Roadmapped
- 🔧 **[Ravencoin](../chains/l1/ravencoin.md)** — Tx Signatures — In Development (open PR, not merged)
- 🔧 **[XRP Ledger](../chains/l1/xrp-ledger.md)**
  - Consensus — In Development (AlphaNet prototype)
  - Tx Signatures — Roadmapped (AlphaNet prototype; mainnet PR stalled)
- 🗺️ **[Canton](../chains/l1/canton.md)**
  - Tx Signatures — Roadmapped
  - Consensus — Discussed
- 🗺️ **[Casper Network](../chains/l1/casper-network.md)** — Tx Signatures — On Roadmap
- 🗺️ **[Ethereum](../chains/l1/ethereum.md)** — Tx Signatures, On-Chain — On Roadmap (EIP-8051 draft precompile)
- ⚠️ **[Avalanche](../chains/l1/avalanche.md)** — Tx Signatures, Consensus, On-Chain — Discussed
- ⚠️ **[Cardano](../chains/l1/cardano.md)** — Tx Signatures, On-Chain — Discussed (CIP #1144 survey)
- ⚠️ **[Cosmos Hub](../chains/l1/cosmos-hub.md)**
  - Tx Signatures — Discussed
  - Consensus — Discussed
- ⚠️ **[Dogecoin](../chains/l1/dogecoin.md)** — Tx Signatures — SDK-layer only ([libdogecoin#294](https://github.com/dogecoinfoundation/libdogecoin/pull/294), open)
- ⚠️ **[Ethereum Classic](../chains/l1/ethereum-classic.md)** — On-Chain — Discussed
- ⚠️ **[Flare](../chains/l1/flare.md)** — On-Chain — Discussed
- ⚠️ **[Hedera](../chains/l1/hedera.md)** — Tx Signatures — Discussed (ecosystem project only — third-party agent identity, not core protocol)
- ⚠️ **[IOTA](../chains/l1/iota.md)** — Other (IOTA Identity) — Discussed
- ⚠️ **[Sei](../chains/l1/sei.md)** — Tx Signatures, Consensus — Discussed
- ⚠️ **[Solana](../chains/l1/solana.md)** — Tx Signatures — Discussed (Project Eleven prototype testnet, December 2025)
- ⚠️ **[Sonic](../chains/l1/sonic.md)** — Tx Signatures, Consensus — Discussed
- ⚠️ **[Stellar](../chains/l1/stellar.md)** — On-Chain — Discussed ([CAP-0084](https://github.com/stellar/stellar-protocol/pull/1946), open 2026-06-08)
- ⚠️ **[Tezos](../chains/l1/tezos.md)** — Tx Signatures — Discussed (tz5 proposal preview, Feb 2026)
- ⚠️ **[Zilliqa](../chains/l1/zilliqa.md)** — Tx Signatures, On-Chain — Discussed

---

_Generated on 06 July 2026 from the L1 chain reports in this dataset._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_
