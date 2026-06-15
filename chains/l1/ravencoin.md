# Ravencoin (RVN) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Ravencoin |
| **Ticker** | RVN |
| **Website** | https://ravencoin.org |
| **GitHub** | https://github.com/RavenProject/Ravencoin |
| **On-chain environment** | Bitcoin Script (extended with asset opcodes) |
| **Mainnet genesis** | 2018-01-03 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | ➖ | ➖ | Not Applicable |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

Ravencoin is a Bitcoin-code fork (launched 2018) focused on native asset issuance — tokens, securities, and collectibles are created and transferred as tagged UTXOs using extended script opcodes, without a general smart-contract VM. Mining uses KAWPOW (a ProgPoW-derived, ASIC-resistant algorithm) with 1-minute blocks and a 21-billion total coin supply.

The most significant PQC development is [RIP-25](https://github.com/RavenProject/Ravencoin/pull/1281), an open pull request proposing ML-DSA-44 (FIPS 204) transaction signatures via a Witness v2 soft fork. This is one of the most complete PQC code artifacts across UTXO-model chains as of May 2026, though it has not yet been merged or deployed to a testnet.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA-44** (FIPS 204) | ECDSA secp256k1 | Tx Signatures | In Development (open PR, not merged) |

## 1. Transaction Signatures

**Grade: B 🔧**

Ravencoin transactions today are signed with ECDSA secp256k1, inherited from Bitcoin. Shor's algorithm breaks this scheme. Like Bitcoin, funds in hash-based addresses do not reveal the public key until first spend, but address reuse is common in practice.

[RIP-25](https://github.com/RavenProject/Ravencoin/pull/1281) (RavenProject/Ravencoin#1281), created 2026-04-06, proposes a Witness v2 soft fork adding **ML-DSA-44** (FIPS 204) post-quantum signatures via liboqs. The PR spans +2,296/-36 lines across 50 files and includes 20 unit tests plus a 10-scenario regtest suite, all reported passing. Key design elements:

- **ML-DSA-44** as a clean, non-hybrid signature scheme (1,312 B pubkey, 2,420 B signature).
- **BIP9 activation** (bit 11, 85% threshold) with phased block weight increases (8, 12, 16 MWU) and an 8x witness discount (`PQ_WITNESS_SCALE_FACTOR=8`).
- New **Bech32m** (BIP-350) address format: `rvn1z...` (mainnet), `trvn1z...` (testnet), `rcrt1z...` (regtest).
- `getnewpqaddress` RPC command; encrypted PQ key persistence; PQ-aware fee estimation.
- `NODE_PQ_HYBRID` service flag (bit 5); 16 MB protocol message limit.

**Current state.** Mainnet transactions are exclusively ECDSA secp256k1. No PQC option is available on mainnet or any public testnet.

**Planned future work.** RIP-25 remains an open PR. No merge timeline or testnet deployment schedule has been published.

## 2. Consensus

Not rated — hash-based proof-of-work is quantum-resistant since genesis. This tracker covers PQC migrations.

## 3. P2P Networking

**Grade: F ❌**

Ravencoin inherits Bitcoin's legacy peer-to-peer networking over TCP. Connections are unencrypted by default. Bitcoin Core's BIP-324 v2 transport encryption (which itself uses an EC-based ECDH handshake) has not been ported to Ravencoin. No PQC handshake or transport encryption proposal exists.

**Current state.** Unencrypted plaintext connections; no PQ transport layer.

**Planned future work.** No proposal, specification, or discussion thread has been published for PQ transport encryption on Ravencoin.

## 4. On-Chain Logic

Ravencoin uses Bitcoin Script extended with asset-specific opcodes (for creating, transferring, and reissuing native assets). There is no general smart-contract VM or programmable on-chain verification beyond standard script operations. This category is not applicable.

## 5. Other Features

Ravencoin's native asset issuance protocol (assets are tagged UTXOs) does not introduce any cryptographic primitives beyond the standard ECDSA transaction signatures already covered above. This category is not applicable.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Ravencoin's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus ➖, P2P ❌, On-Chain ➖, Other ➖.

No EC removal plan or timeline has been published by the Ravencoin Foundation or core development team. RIP-25 adds ML-DSA-44 as an *additional* signature option alongside ECDSA; it does not propose retiring ECDSA secp256k1 signatures.

**Current state.** ECDSA secp256k1 is the only signature scheme on mainnet. No EC sunset discussion has been identified.

**Planned future work.** None published.

## Governance

Ravencoin's protocol changes follow the RIP (Ravencoin Improvement Proposal) process. Proposals are submitted as pull requests to the [RavenProject/Ravencoin](https://github.com/RavenProject/Ravencoin) GitHub repository. Activation of consensus changes uses the BIP9 signaling mechanism inherited from Bitcoin.

PQ-relevant proposals:

- [RIP-25](https://github.com/RavenProject/Ravencoin/pull/1281) — ML-DSA-44 Witness v2 soft fork. Status: Open PR (not merged). Created 2026-04-06.

No soft fork has been scheduled or signaled for PQC support.

---

_Generated on 07 May 2026 based on information as of 06 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
