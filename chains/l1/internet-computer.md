# Internet Computer (ICP) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Internet Computer |
| **Ticker** | ICP |
| **Website** | https://internetcomputer.org/ |
| **GitHub** | https://github.com/dfinity |
| **Twitter / X** | https://x.com/dfinity |
| **On-chain environment** | WASM |
| **Mainnet genesis** | 2021-05-10 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Internet Computer's cryptographic architecture is built entirely on elliptic-curve primitives, with [chain-key cryptography](https://learn.internetcomputer.org/hc/en-us/articles/34209486239252-Chain-Key-Cryptography) forming the foundation of its consensus, cross-chain interoperability, and key management systems. The chain uses threshold BLS12-381 for subnet consensus, Ed25519 and ECDSA for user-facing transactions, and EC-based protocols for all special features including [chain-key signatures](https://learn.internetcomputer.org/hc/en-us/articles/34209497587732-Chain-Key-Signatures), [vetKD](https://internetcomputer.org/docs/building-apps/network-features/vetkeys/introduction), and [HTTPS outcalls](https://docs.internetcomputer.org/references/https-outcalls-how-it-works).

DFINITY Foundation filed a [long-term R&D proposal for post-quantum security](https://forum.dfinity.org/t/long-term-r-d-pq-security-proposal/9395) in December 2021 and published an [RFP seeking experienced canister developers](https://forum.dfinity.org/t/building-post-quantum-cryptography-on-icp-seeking-experienced-canister-developers/61101) for PQC work in December 2025. Neither effort has produced protocol-level changes, and no public timeline exists for migrating any component away from EC cryptography.

Internet Computer does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Internet Computer in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

Internet Computer's consensus relies entirely on [threshold BLS12-381 signatures](https://docs.internetcomputer.org/building-apps/network-features/vetkeys/bls-signatures). Each subnet operates a custom BFT protocol where validators hold shares of a threshold BLS private key, produced through Distributed Key Generation. Blocks are committed when more than two-thirds of subnet nodes agree via threshold BLS signature. The [consensus protocol](https://eprint.iacr.org/2021/632.pdf) additionally uses BLS-derived randomness beacons for leader selection.

BLS12-381 is a pairing-based elliptic-curve scheme vulnerable to Shor's algorithm. Because the entire subnet model — block signing, cross-subnet message verification, and network state agreement — depends on BLS12-381, a quantum break would compromise the chain at its most fundamental layer. No post-quantum replacement for threshold BLS has been proposed for the Internet Computer protocol.

**Current state.** All subnet consensus operations use threshold BLS12-381. Validator identity is BLS12-381 public keys with private key shares distributed via DKG.

**Planned future work.** No published roadmap addresses consensus-layer migration away from EC.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Internet Computer in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Internet Computer runs [WebAssembly (WASM) canisters](https://docs.internetcomputer.org/building-apps/essentials/canisters) as its smart contract environment. The platform provides several native cryptographic APIs — [threshold ECDSA](https://learn.internetcomputer.org/hc/en-us/articles/34209497587732-Chain-Key-Signatures) (secp256k1 and P-256), [threshold Schnorr](https://internetcomputer.org/docs/building-apps/network-features/signatures/t-schnorr) (BIP340 secp256k1), and [vetKD](https://internetcomputer.org/docs/references/vetkeys-overview) — all of which are EC-based. Canister developers can [verify Ed25519, ECDSA, and BLS12-381 signatures](https://docs.internetcomputer.org/building-apps/authentication/independently-verifying-ic-signatures) via imported crypto libraries.

No NIST PQC algorithms are available as canister builtins. Third-party canister developers could theoretically import PQC libraries compiled to the wasm32 target, but this is not a first-class feature and performance characteristics are uncharacterized.

The December 2025 [RFP for PQC canister developers](https://forum.dfinity.org/t/building-post-quantum-cryptography-on-icp-seeking-experienced-canister-developers/61101) targets a 12-month project to implement PQC verification in canisters, but no code has materialized in the IC repository.

**Current state.** All native canister cryptographic APIs rely exclusively on EC cryptography. No PQC verification is available as a platform feature.

**Planned future work.** The December 2025 RFP seeks to build PQC verification capabilities in canisters over a 12-month engagement. The scope likely includes PQC signature verification and performance evaluation, but details are limited.

## 5. Other Features

**Grade: F ❌**

### Chain-Key Signatures (Cross-Chain Interoperability)

[Chain-key signatures](https://learn.internetcomputer.org/hc/en-us/articles/34209497587732-Chain-Key-Signatures) allow canisters to sign transactions on Bitcoin, Ethereum, and other chains without custodial risk, using the same chain-key infrastructure as consensus. The protocol supports threshold ECDSA (secp256k1 for Bitcoin/Ethereum, P-256 for other chains) and [threshold Schnorr](https://internetcomputer.org/docs/building-apps/network-features/signatures/t-schnorr) (BIP340 secp256k1 for Taproot-compatible Bitcoin signing). If EC is broken, ICP cannot sign cross-chain transactions, and Bitcoin/Ethereum wallets held by ICP canisters become inaccessible. Cross-chain signing requires the external chain to support the signature scheme, so ICP is locked into EC for interoperability as long as Bitcoin and Ethereum only support ECDSA/Schnorr.

**Current state.** All cross-chain signing uses threshold ECDSA or threshold Schnorr. No post-quantum alternatives are scoped.

**Planned future work.** None documented.

### Verifiable Encrypted Threshold Key Derivation (vetKD)

[vetKD](https://internetcomputer.org/docs/building-apps/network-features/vetkeys/introduction) is a distributed key derivation protocol allowing canisters to derive user-specific encryption keys with [verifiable guarantees](https://internetcomputer.org/docs/references/vetkeys-overview). It uses DKG based on [threshold BLS](https://docs.internetcomputer.org/building-apps/network-features/vetkeys/bls-signatures), ElGamal PKE for encryption, and BLS threshold signatures for proof of correctness — all on elliptic curves. If ElGamal or BLS breaks, derived keys can be recovered by an attacker, and users lose confidentiality of encrypted data. This presents a retroactive decryption threat.

**Current state.** vetKD is entirely EC-based. No post-quantum migration path has been documented.

**Planned future work.** None documented.

### HTTPS Outcalls and X.509 Verification

Internet Computer canisters can make [HTTP(S) requests](https://docs.internetcomputer.org/references/https-outcalls-how-it-works) to external servers. The network collectively verifies the response and commits it to state. Certificate chains are typically signed with ECDSA or RSA, and ECDH is used for TLS key exchange. Boundary nodes validate responses across the network (2/3 quorum required), providing some resilience, but the underlying cryptographic foundation is EC-dependent.

**Current state.** HTTPS outcalls rely on EC-based TLS. Boundary nodes are not known to support post-quantum hybrid TLS proposals.

**Planned future work.** HTTPS outcalls may eventually benefit from TLS 1.3 post-quantum support in the broader web infrastructure, but no ICP-specific plans are documented.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

DFINITY Foundation has filed a [long-term R&D proposal](https://forum.dfinity.org/t/long-term-r-d-pq-security-proposal/9395) (December 2021) and is [actively seeking canister developers](https://forum.dfinity.org/t/building-post-quantum-cryptography-on-icp-seeking-experienced-canister-developers/61101) for a 12-month PQC engagement (December 2025). Community members have [raised concerns](https://forum.dfinity.org/t/concern-about-quantum-resistance-and-the-longevity-of-the-icp-protocol/38826) about quantum resistance and the longevity of the ICP protocol. However, no public timeline or hard commitment exists for removing EC from any layer of the protocol.

The R&D proposal's current status is unclear. The RFP targets on-chain PQC verification in canisters, not consensus migration — the most critical and difficult component to address. No EC deprecation schedule has been announced for any category.

**Current state.** EC cryptography is embedded in every layer of the Internet Computer protocol. No category has a published sunset plan.

**Planned future work.** The December 2025 RFP represents the only concrete activity, scoped to canister-level PQC verification rather than protocol-level EC retirement.

## Governance

Internet Computer governance operates through the Network Nervous System (NNS), an on-chain DAO where ICP token holders vote on proposals. DFINITY Foundation leads core protocol development and sets the technical agenda, while the NNS can vote to accept or reject proposals.

PQC-related governance activity consists of:

- **Long Term R&D: PQ security** — A motion filed on the [DFINITY Developer Forum](https://forum.dfinity.org/t/long-term-r-d-pq-security-proposal/9395) in December 2021, proposing DFINITY Foundation research into post-quantum security. The current status of this motion is not publicly documented.
- **RFP: Building Post-Quantum Cryptography on ICP** — Published on the [DFINITY Developer Forum](https://forum.dfinity.org/t/building-post-quantum-cryptography-on-icp-seeking-experienced-canister-developers/61101) in December 2025. Seeks canister developers for a 12-month PQC backend project with immediate start. Scope includes PQC signature verification and threshold lattice signing research.
- **Community concern thread** — A forum discussion on [quantum resistance and the longevity of ICP](https://forum.dfinity.org/t/concern-about-quantum-resistance-and-the-longevity-of-the-icp-protocol/38826), raising questions about ICP's long-term security model.

---

_Generated on 07 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
