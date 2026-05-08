# QuStream (QST) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | QuStream |
| **Ticker** | QST |
| **Website** | https://qustream.com/ |
| **Twitter / X** | https://x.com/qu_stream |
| **Parent chain** | Solana (token currently issued on Solana pending native mainnet launch) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | D | ⚠️ | Discussed |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

QuStream positions itself as a [PQC-native L1](https://qustream.com/) built around a patent-pending "dynamic key fragmentation" model: rather than holding a fixed private key, an account is associated with ephemeral, cryptographically linked keys that are distributed across a Master Node and Proxy Node topology, and a fresh key is generated for each use. The project advertises a "504-bit quantum hardness" figure and claims information-theoretic security ("operational perfect secrecy") for the construction. As of the cutoff for this report, the native QuStream chain is pre-mainnet — the QST token lives on Solana today, with a stated 1:1 migration to a native chain planned at mainnet launch.

The protocol design has been [published in the Springer Nature *Lecture Notes in Networks and Systems* series as part of the FTC 2025 conference proceedings](https://link.springer.com/book/10.1007/978-3-032-07989-3), which is the strongest external touchpoint currently available. The cryptographic primitives sit outside the NIST post-quantum standardization track, no independent security audit of a production implementation has been published, and key sub-system specifics (consensus algorithm, transport encryption, peer discovery, on-chain VM) remain undocumented in public materials. Across the board, this report grades QuStream's PQC posture on the basis of stated architecture and peer-reviewed protocol design rather than shipped or in-flight production code.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **Dynamic key fragmentation** (proprietary, patent-pending) | Ed25519 / EC transaction signing | Tx Signatures | Discussed |
| **Dynamic key fragmentation** (proprietary, patent-pending) | EC-based validator / block signing | Consensus | Discussed |
| **QRNG-based key derivation** | Deterministic EC key derivation | Other | Discussed |

## Transaction Signatures

**Grade: D ⚠️**

QuStream's transaction-signing story is the **dynamic key fragmentation** scheme: fixed private keys are replaced with ephemeral, cryptographically linked keys distributed across the Master Node / Proxy Node topology, with a new key produced for each use. The project [claims 504 bits of quantum hardness and information-theoretic security properties for this construction](https://qustream.com/), and the [protocol has been peer-reviewed in the Springer Nature FTC 2025 proceedings](https://link.springer.com/book/10.1007/978-3-032-07989-3). The scheme is patent-pending and is not based on NIST-standardized post-quantum signature algorithms.

**Current state.** The QST token transacts today on Solana using Solana's Ed25519 signing path, not QuStream's own scheme. The native dynamic key fragmentation design has been peer-reviewed at the protocol level but not yet shipped as a production network, and address-derivation, multi-sig, threshold, and account-abstraction details are not publicly documented. No independent security audit of a production implementation has been published.

**Planned future work.** Native QuStream mainnet is the gating milestone for transaction signing on the project's own scheme; no public target date has been announced. Integration with a [Polkadot Rollup via the Asphere partnership](https://qustream.com/) is also stated as a forthcoming venue for the signing scheme.

## Consensus

**Grade: D ⚠️**

QuStream describes a [Proof-of-Stake consensus with a Master Node / Proxy Node validator topology that distributes the ephemeral keys used for block signing](https://qustream.com/). Validator identity is stated as being tied to the distributed dynamic-key infrastructure rather than a fixed signing key. The specific consensus algorithm (BFT family, longest-chain, finality gadget, randomness beacon construction) is not detailed in public documentation.

**Current state.** Native consensus is not yet live. The QST token currently relies on Solana's Proof-of-History consensus and Ed25519 validator signing, not QuStream's own design. The Master Node / Proxy Node architecture is described as in development for the eventual mainnet.

**Planned future work.** Mainnet launch is stated as the milestone at which the dynamic-key validator model becomes operational. Concrete consensus-algorithm choice, finality mechanism, and randomness-beacon design have not been published.

## P2P Networking

**Grade: D ⚠️**

QuStream's networking architecture centers on the [Master Node / Proxy Node topology, which the project describes as performing "zero-latency" key distribution and entropy sharing across the validator set](https://qustream.com/). Node identity is stated to be tied to the distributed dynamic-key infrastructure. The transport protocol (TCP, QUIC, or other), the handshake construction, the encryption primitives in use on the wire, and the peer-discovery mechanism are not documented in publicly available materials.

**Current state.** The pre-mainnet token relies on Solana's P2P stack, which uses elliptic-curve primitives. The native QuStream networking layer exists at the architectural-description level rather than as a deployed, inspectable transport.

**Planned future work.** A full decentralized P2P network using the Master / Proxy node topology is on the path to mainnet, with entropy distribution across validator nodes as a stated design goal. Specifics of transport encryption, authentication, and peer discovery remain to be published.

## On-Chain Logic

**Grade: D ⚠️**

QuStream does not currently operate a native smart-contract VM. The [stated path to on-chain logic is a Polkadot Rollup integration via the Asphere partnership](https://qustream.com/), with planned support for verifying QuStream's dynamic-key signatures inside that environment. QRNG-based key derivation is described as a forthcoming primitive for applications.

**Current state.** No native VM, EC precompile inventory, or hash-precompile inventory exists on QuStream itself today; QST on Solana uses the Sealevel VM and Solana's EC-based signature verification. The Polkadot Rollup integration is described as in development rather than deployed.

**Planned future work.** Stated work items include the Asphere-led Polkadot Rollup deployment, a native smart-contract VM on QuStream mainnet, on-chain verification of dynamic-key signatures, and QRNG-derived keys for application use. None of these have public target dates at the time of writing.

## Other Features

### Information-theoretic security and 504-bit quantum hardness claim

**Current state.** QuStream's [headline differentiator is a claimed 504 bits of quantum hardness and an "operational perfect secrecy" / information-theoretic security property](https://qustream.com/) for the dynamic key fragmentation construction. The claim is that no key reuse occurs by design, since each transaction uses an ephemeral, cryptographically linked key. The construction is patent-pending, has been [peer-reviewed at the protocol level in the Springer Nature FTC 2025 proceedings](https://link.springer.com/book/10.1007/978-3-032-07989-3), and is distinct from the lattice-based and hash-based constructions on the NIST post-quantum standardization track. No independent security audit of a production implementation has been published.

**Planned future work.** A production-implementation security audit is identified as forthcoming but is not publicly scheduled. Public technical specifications elaborating the construction beyond the conference paper and marketing materials remain to be published.

### Defense and enterprise deployments

**Current state.** QuStream has [announced a NATO-member armed-forces deployment in April 2026 for drone communications, working with a prime defense contractor and operating under hardware-level power constraints](https://qustream.com/). The CEO presented at Nokia Swiss Innovation Day in March 2026 on quantum-proof security for telecom infrastructure. These deployments use the dynamic-key construction outside the public blockchain context.

**Planned future work.** Expanded defense and enterprise pilots are described as following from the NATO engagement; no specific further deployments have been publicly named.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ⚠️, Consensus ⚠️, P2P ⚠️, On-Chain ⚠️, Other ⚠️.

The headline EC-Sunset rating is F because the user-facing token, QST, is currently issued on Solana — a chain that uses Ed25519 for transaction signatures and EC primitives throughout — and the project's own native chain that would replace this dependency is not yet live. Until a native QuStream mainnet ships and the [stated 1:1 migration from Solana to the native chain](https://qustream.com/) executes, every QST holder's exposure surface is the underlying Solana EC stack, not QuStream's dynamic-key construction.

**Current state.** QST trades on Solana with Solana's Ed25519 signatures and Proof-of-History consensus as the de facto signing surface. The native QuStream chain is described as designed without elliptic-curve primitives, but this design point has no production force until mainnet exists.

**Planned future work.** Mainnet launch with a full 1:1 token migration off Solana is the stated EC-sunset path for QST holders. No public target date has been announced. Once migrated, the native chain is described as operating entirely on dynamic key fragmentation without EC dependency.

## Governance

QuStream's development is company-led at this pre-mainnet stage. Decision-making — including the choice of dynamic key fragmentation as the signing scheme, the Master Node / Proxy Node topology, the planned Polkadot Rollup integration with [Asphere](https://qustream.com/), and the migration plan from Solana — sits with the QuStream company. There is no on-chain proposal or voting system, and no community-governance process is documented at this stage.

Public venues for following the project are the [project website](https://qustream.com/), the [project's X account](https://x.com/qu_stream), the [project Discord](https://discord.com/invite/qustream), and the [project Medium blog](https://medium.com/@qustream). The principal external technical milestone on the public record is the [Springer Nature FTC 2025 publication of the Q-Stream protocol](https://link.springer.com/book/10.1007/978-3-032-07989-3).

---

_Generated on 08 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
