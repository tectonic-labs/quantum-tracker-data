# PQC Algorithms Across L1 Blockchains

Which post-quantum cryptographic algorithms are actually being adopted by Layer-1 blockchains — and how far along each adoption is.

This view inverts the per-chain reports: instead of one row per blockchain, it has one row per algorithm. The counts show how many L1 blockchains have each algorithm **in use** or **in flight**, aggregated from the "Proposed and Implemented PQC Algorithms" tables in the individual [L1 chain reports](../chains/l1/README.md).

Machine-readable data: [`../algorithms.csv`](../algorithms.csv).

## How adoption status is counted

Each L1 is counted once per algorithm, in its furthest-along status across every category that chain applies it to:

| Icon | Status | Meaning |
|------|--------|---------|
| ✅ | Implemented | Live in production on mainnet |
| 🧪 | Testnet Live | Live on a public mainnet-path testnet; not yet on mainnet |
| 🔧 | In Development | Code in flight — private devnet, audit, or open implementation PR |
| 🗺️ | On Roadmap | Published plan; implementation not yet started |
| ⚠️ | Discussed | Raised in governance / proposals; no roadmap commitment |

"In use" is the ✅ and 🧪 columns (mainnet and mainnet-path testnet). "In flight" is the 🔧 and 🗺️ columns. A chain counted under ✅ may still be earlier-stage for some uses — open each algorithm's file for the per-chain breakdown.

## Signature algorithms

| Algorithm | Family | Standardization | ✅ | 🧪 | 🔧 | 🗺️ | ⚠️ | L1s |
|---|---|---|:--:|:--:|:--:|:--:|:--:|:--:|
| [ML-DSA (Dilithium)](ml-dsa.md) | Lattice (module-LWE) | FIPS 204 | 0 | 2 | 4 | 3 | 14 | 23 |
| [Falcon (FN-DSA)](falcon.md) | Lattice (NTRU) | FN-DSA / FIPS 206 (draft) | 1 | 1 | 0 | 2 | 9 | 13 |
| [SLH-DSA (SPHINCS+)](slh-dsa.md) | Hash-based (stateless) | FIPS 205 | 1 | 0 | 2 | 0 | 6 | 9 |
| [LMS / LM-OTS](lms.md) | Hash-based (stateful) | NIST SP 800-208 | 0 | 0 | 0 | 0 | 2 | 2 |
| [IronCAP](ironcap.md) | Code-based (vendor) | Vendor-claimed NIST-aligned | 0 | 0 | 0 | 0 | 1 | 1 |
| [leanMultisig](leanmultisig.md) | Hash-based (aggregate) | Research (no NIST track) | 0 | 0 | 1 | 0 | 0 | 1 |
| [leanSig](leansig.md) | Hash-based | Research (no NIST track) | 0 | 0 | 1 | 0 | 0 | 1 |
| [Raccoon](raccoon.md) | Lattice (masked) | Submitted to NIST additional-signatures call | 0 | 0 | 0 | 0 | 1 | 1 |
| [Unspecified lattice scheme (Cardano)](unspecified-lattice-scheme.md) | Lattice | Undetermined (research) | 0 | 0 | 0 | 0 | 1 | 1 |
| [WOTS+](wots.md) | Hash-based (one-time) | RFC 8391 component | 0 | 0 | 0 | 0 | 1 | 1 |
| [XMSS](xmss.md) | Hash-based (stateful) | NIST SP 800-208 | 0 | 0 | 0 | 0 | 1 | 1 |

## Other PQC primitives

Key-encapsulation mechanisms, proof systems, and schemes whose algorithm is not yet selected — included for completeness; the focus of this dataset is signature algorithms.

| Algorithm | Type | Family | Standardization | ✅ | 🧪 | 🔧 | 🗺️ | ⚠️ | L1s |
|---|---|---|---|:--:|:--:|:--:|:--:|:--:|:--:|
| [ML-KEM (Kyber)](ml-kem.md) | KEM | Lattice (module-LWE) | FIPS 203 | 1 | 0 | 1 | 0 | 0 | 2 |
| [Streamlined NTRU Prime](ntru-prime.md) | KEM | Lattice (NTRU) | Not NIST-standardized | 1 | 0 | 0 | 0 | 0 | 1 |
| [STARK / hash-based proofs](stark.md) | Proof system | Hash-based | No NIST track | 0 | 0 | 1 | 1 | 1 | 3 |
| [leanVM](leanvm.md) | Proof system | Hash-based zkVM | Research (no NIST track) | 0 | 0 | 1 | 0 | 0 | 1 |
| [CSIDH-1024](csidh-1024.md) | Other | -- | -- | 0 | 0 | 0 | 0 | 1 | 1 |
| [Hybrid PQ PKE](hybrid-pq-pke.md) | Other | -- | -- | 0 | 0 | 1 | 0 | 0 | 1 |
| [Lamport-OTS (Lamport One-Time Signatures, RIPEMD-160-based PoC)](lamport-ots-lamport-one-time-signatures-ripemd-160-based-poc.md) | Other | -- | -- | 0 | 0 | 0 | 0 | 1 | 1 |
| [OTAK-PQ (hash-based one-time access keys)](otak-pq-hash-based-one-time-access-keys.md) | Other | -- | -- | 0 | 0 | 0 | 0 | 1 | 1 |
| [Unspecified lattice scheme](unspecified-lattice-scheme.md) | Other | -- | -- | 0 | 0 | 0 | 0 | 1 | 1 |

---

_Generated on 06 July 2026 from the L1 chain reports in this dataset._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_
