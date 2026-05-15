# MemeCore (M) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | MemeCore |
| **Ticker** | M |
| **Website** | https://memecore.com/ |
| **GitHub** | https://github.com/memecore-foundation |
| **On-chain environment** | EVM (go-ethereum fork, `gmeme` client) |
| **Mainnet genesis** | 2025-02-12 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

[MemeCore](https://memecore.com/) is an EVM-compatible Layer 1 (chain ID 4352) built on a [go-ethereum fork called `gmeme`](https://github.com/memecore-foundation/Go-MemeCore), with mainnet activation in February 2025 and a public L1 launch in September 2025. Consensus is a Proof of Staked Authority engine marketed as "Proof of Meme," with a top-7 rotating validator set on a [Clique-derived signer-seal model](https://raw.githubusercontent.com/memecore-foundation/Go-MemeCore/master/consensus/posa/posa.go). The 2026-03-25 hard fork brought in a Pectra/Dencun port — EIP-4844 blob transactions, account abstraction primitives, and BLS12-381 precompiles — all of which expand the chain's elliptic-curve surface rather than reduce it.

No post-quantum migration plan, EC retirement schedule, or in-repo PQC research has been published by the MemeCore Foundation. The published 2026 roadmap focuses on Asian VASP/ISMS regulatory registration, account abstraction, gas-fee reductions, and broadening Proof-of-Meme eligibility across MRC-20 tokens; cryptography is not addressed.

## Proposed and Implemented PQC Algorithms

MemeCore does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for MemeCore in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for MemeCore in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for MemeCore in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

We have found no public information indicating migration activity for MemeCore in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 5. Other Features

**Grade: F ❌**

### EIP-4844 KZG blob storage

The [`Go-MemeCore` v1.15.1 release](https://github.com/memecore-foundation/Go-MemeCore/releases) brought EIP-4844 Proto-Danksharding into the chain as part of the 2026-03-25 Pectra/Dencun port, with blob-sidecar storage running in a single-layer architecture (no beacon chain). Blob commitments are KZG polynomial commitments over BLS12-381 — the same pairing-friendly curve targeted by Shor's algorithm. A quantum break of the discrete-log problem on BLS12-381 would invalidate the binding properties of the KZG commitments and let an adversary forge blob-availability proofs.

**Current state.** Blob commitments are KZG over BLS12-381. No post-quantum replacement is drafted in the MemeCore repository or release notes.

**Planned future work.** None published. Future EVM work tracks Ethereum's upstream mainnet schedule.

### Meson Finance HTLC bridge

The [Meson Finance HTLC bridge](https://docs.memecore.com/guides/bridging-stablecoins-to-memecore) is the documented path for moving stablecoins (USDC, USDT) into MemeCore as USDC.e. The hash time-locked contract itself is hash-based and quantum-tolerant on the preimage side, but each end's settlement chain authenticates transactions and contract state with elliptic-curve signatures (ECDSA, BLS, or Ed25519 depending on the peer). Atomic-swap security therefore collapses to the weakest endpoint's signature scheme, and a quantum break on any endpoint chain would let an adversary forge the swap-side authorization. MemeCore's documentation explicitly disclaims operational control of the Meson contracts.

**Current state.** Bridge security is bounded by EC security on every chain involved.

**Planned future work.** None published; bridge security tracks each peer chain's own transaction-signature migration.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No PQC roadmap and no EC retirement schedule have been published by the MemeCore Foundation. The 2026 hard fork added BLS12-381 precompiles and KZG blob commitments alongside the existing secp256k1 transaction, consensus, and P2P paths, expanding rather than reducing the chain's EC surface. The published 2026 roadmap is regulatory and ecosystem-focused (Korean VASP / ISMS registration, Japan/Singapore expansion, Proof-of-Meme eligibility broadening, account abstraction); cryptography migration is not addressed.

**Current state.** secp256k1 is embedded in transaction signing, PoSA signer seals, devp2p node identity and handshake, and the `ecrecover` precompile. BLS12-381 and BN254 are present in the EVM precompile set and in KZG blob commitments. No EC deprecation plan exists.

**Planned future work.** None published.

## Governance

MemeCore protocol changes ship via [`Go-MemeCore` client releases](https://github.com/memecore-foundation/Go-MemeCore/releases) coordinated by the MemeCore Foundation; there is no formal EIP-like document series. Release notes on the `memecore-foundation/Go-MemeCore` repository are the primary record of protocol-affecting change, and roadmap items are announced through the [project documentation](https://docs.memecore.com/) and foundation communications. $M holders vote on parameters and reward-pool decisions, but core protocol changes are coordinated by the foundation. No PQC-related proposals have been identified in the public release-notes record or repository as of the information cutoff for this report.

---

_Generated on 14 May 2026 based on information as of 14 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml) — contact channel pending launch._

_Editorial policy: none currently published._
