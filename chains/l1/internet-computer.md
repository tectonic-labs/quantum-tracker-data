# Internet Computer (ICP) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Internet Computer |
| **Ticker** | ICP |
| **Website** | https://internetcomputer.org/ |
| **GitHub** | https://github.com/dfinity |
| **Twitter / X** | https://x.com/dfinity |
| **On-chain environment** | WASM (WebAssembly canisters via Wasmtime runtime) |
| **Mainnet genesis** | 2021-05-10 |

## Summary Table

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Summary

The Internet Computer (ICP) is built around **chain-key cryptography** — a system of threshold BLS12-381 signatures where each subnet maintains a fixed public key whose corresponding private key is distributed in shares across all subnet nodes via Distributed Key Generation (DKG). This architecture is what gives ICP its distinctive capabilities: canisters can sign transactions on Bitcoin, Ethereum, and other chains without holding private keys, and cross-subnet message verification is handled transparently by the protocol.

The same architecture that makes ICP uniquely powerful also creates an acute post-quantum challenge. BLS12-381 is a pairing-based elliptic-curve scheme; there is no published drop-in post-quantum replacement for threshold BLS that preserves ICP's consensus model. DFINITY has acknowledged the issue: a long-term R&D motion was filed in [December 2021](https://forum.dfinity.org/t/long-term-r-d-pq-security-proposal/9395), and in [December 2025](https://forum.dfinity.org/t/building-post-quantum-cryptography-on-icp-seeking-experienced-canister-developers/61101) DFINITY published a Request for Proposals seeking canister developers to build PQC verification backends, scoped as a 12-month project. Neither initiative carries a public timeline for migrating the consensus layer away from BLS12-381.

## Proposed and Implemented PQC Algorithms

> Internet Computer does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

Transaction and canister-call signatures on ICP use Ed25519 (Curve25519), ECDSA on secp256k1, and ECDSA on P-256 (secp256r1). All three are elliptic-curve schemes. Threshold ECDSA and Threshold Schnorr — native chain-key features that let canisters sign transactions on external chains — are also EC-based. No post-quantum signature scheme is available for user-facing transactions.

**Current state.** All transaction authentication schemes are elliptic-curve-based. No post-quantum signing option is available.

**Planned future work.** The December 2025 [RFP](https://forum.dfinity.org/t/building-post-quantum-cryptography-on-icp-seeking-experienced-canister-developers/61101) scopes PQC verification as a canister-level project — on-chain verification of PQC signatures by smart contracts — rather than a protocol-envelope change. No base-layer transaction-signature migration has been proposed.

## Consensus

**Grade: F ❌**

ICP's chain-key cryptography uses **threshold BLS12-381** throughout. Each subnet produces a threshold BLS signature over every finalized block, and this signature serves as the subnet's canonical state root, the basis for cross-subnet message authentication, and the source of the chain's randomness beacon. The threshold key is generated via a custom DKG protocol; its security model depends entirely on the hardness of the discrete logarithm problem on BLS12-381, which Shor's algorithm would break.

This is the most EC-critical consensus design of any major blockchain. No quantum-safe replacement for threshold BLS has been identified in the published DFINITY roadmap or research output.

**Current state.** Threshold BLS12-381 is the foundational primitive for all consensus, cross-subnet messaging, and chain-key features. No migration plan has been published.

**Planned future work.** DFINITY's [2021 R&D motion](https://forum.dfinity.org/t/long-term-r-d-pq-security-proposal/9395) identifies post-quantum security as a long-term research priority. No concrete roadmap for replacing threshold BLS has been published.

## P2P Networking

**Grade: F ❌**

ICP uses a QUIC-based transport layer for inter-node communication, with a custom Abortable Broadcast protocol for subnet message relay. QUIC relies on ECDH for key establishment; node identity keys are Ed25519. No PQC hybrid key exchange (such as ML-KEM) or post-quantum node identity scheme has been documented in the DFINITY architecture.

**Current state.** QUIC transport uses ECDH for session keys; node identity is Ed25519. No post-quantum transport layer has been proposed.

**Planned future work.** None published.

## On-Chain Logic

**Grade: F ❌**

ICP's execution environment is WebAssembly (WASM) canisters via the Wasmtime runtime. Native canister APIs — [Threshold ECDSA](https://learn.internetcomputer.org/hc/en-us/articles/34209497587732-Chain-Key-Signatures), Threshold Schnorr (BIP340 secp256k1), and [vetKD](https://internetcomputer.org/docs/building-apps/network-features/vetkeys/introduction) (verifiable encrypted threshold key derivation) — all rely on EC cryptography. Canisters can import WASM-compiled Rust crypto libraries to implement arbitrary cryptography, but this is not a first-class platform feature: there are no PQC verification builtins, syscalls, or host functions.

**Current state.** All native canister cryptographic APIs are EC-based. Third-party canister developers can implement PQC algorithms in WASM (e.g., via a wasm32-compiled liboqs), but this is unoptimized and carries no platform-level guarantees.

**Planned future work.** The December 2025 [RFP](https://forum.dfinity.org/t/building-post-quantum-cryptography-on-icp-seeking-experienced-canister-developers/61101) explicitly targets PQC signature verification at the canister level and explores threshold lattice-based signing as a future possibility. This is a 12-month scoped engagement; no results have been published yet.

## Other Features

**Grade: F ❌**

### Chain-Key Signatures (Cross-Chain Interoperability)

[Chain-key signatures](https://learn.internetcomputer.org/hc/en-us/articles/34209497587732-Chain-Key-Signatures) let canisters sign transactions on Bitcoin, Ethereum, and other chains without custodial risk, using the same threshold key infrastructure as ICP's consensus. The signing primitives are Threshold ECDSA (secp256k1 for Bitcoin/Ethereum, P-256 for others) and [Threshold Schnorr](https://internetcomputer.org/docs/building-apps/network-features/signatures/t-schnorr) (BIP340 secp256k1 for Taproot-compatible Bitcoin signing). Because the external chains accept only ECDSA and Schnorr, ICP is constrained to EC signing for cross-chain interoperability regardless of any internal migration.

**Current state.** Chain-key cross-chain signing is entirely EC-based and depends on the external chain's accepted signature schemes.

**Planned future work.** None published; migrating cross-chain signing would require the external chains (Bitcoin, Ethereum) to support post-quantum signature schemes first.

### vetKD (Verifiable Encrypted Threshold Key Derivation)

[vetKD](https://internetcomputer.org/docs/building-apps/network-features/vetkeys/introduction) is a distributed key-derivation protocol that lets canisters derive user-specific encryption keys with verifiable correctness. The construction relies on threshold BLS12-381 for DKG and proof of correctness, and additive threshold ElGamal (on elliptic curves) for the encryption envelope. If either the BLS or the ElGamal layer were broken, an attacker could recover derived keys and access encrypted user data retroactively.

**Current state.** vetKD is entirely EC-based. No post-quantum vetKD design has been published.

**Planned future work.** None published.

### HTTPS Outcalls

[HTTPS outcalls](https://docs.internetcomputer.org/references/https-outcalls-how-it-works) allow canisters to make HTTP/HTTPS requests to external Web 2.0 servers. The ICP network collectively verifies the response (requiring a 2/3 subnet quorum) and commits it to state. The TLS session and X.509 certificate verification depend on ECDH for key exchange and ECDSA or RSA for certificate signatures.

**Current state.** HTTPS outcall TLS relies on EC-based key exchange and certificate signing. ICP's boundary nodes are not known to support post-quantum TLS hybrids.

**Planned future work.** Post-quantum hybrid TLS (e.g., ECDH + ML-KEM) is an active area of IETF standardization and may benefit HTTPS outcalls as upstream TLS libraries adopt it, but no specific DFINITY commitment on this front has been published.

## EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

> We have found no public information indicating migration activity for Internet Computer in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

ICP protocol upgrades are proposed and voted on by the **Network Nervous System (NNS)**, an on-chain DAO where staked ICP holders vote through NNS neurons. Approved proposals push new replica binaries to subnets automatically with no manual binary swap required. DFINITY Foundation controls the core development roadmap and sets the agenda for NNS proposals; community neurons can vote on proposals but typically do not initiate them.

PQC-relevant public record:

- [Motion: Long Term R&D — PQ security](https://forum.dfinity.org/t/long-term-r-d-pq-security-proposal/9395) — Filed December 2021 on the DFINITY Developer Forum. Proposes DFINITY Foundation research into post-quantum security, acknowledging the quantum threat to the discrete-logarithm assumption. Current status is not publicly confirmed.
- [RFP: Building Post-Quantum Cryptography on ICP](https://forum.dfinity.org/t/building-post-quantum-cryptography-on-icp-seeking-experienced-canister-developers/61101) — Published December 2025. Seeks canister developers for a 12-month engagement covering PQC signature verification backends and initial exploration of threshold lattice-based signing. Immediate start; no results published as of the date of this report.

Readers following the discussion can track the [DFINITY Developer Forum](https://forum.dfinity.org/) and the [dfinity GitHub organization](https://github.com/dfinity).

---

_Generated on 03 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
