# Ethereum (ETH) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Ethereum |
| **Ticker** | ETH |
| **Website** | <https://ethereum.org> |
| **GitHub** | <https://github.com/ethereum> |
| **On-chain environment** | EVM |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | C | 🗺️ | Roadmapped |
| Consensus | B | 🔧 | In Development |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | C | 🗺️ | Roadmapped |
| Other Features | C | 🗺️ | Roadmapped |
| EC Sunset | F | ❌ | Not Discussed |

Ethereum is the most-coordinated PQC migration in the L1 space, with a published [Post-Quantum hub](https://pq.ethereum.org/), a dedicated EF Post-Quantum team formed in early 2026, and a strategic priority commitment in the [2026 Protocol Priorities](https://blog.ethereum.org/en/2026/02/18/protocol-priorities-update-2026). All three of the EF's 2026 protocol tracks (Scale, Improve UX, Harden the L1) touch PQ work. The [Strawmap](https://strawmap.org/) — authored by EF Protocol team members and published as a strawman, not an official EF roadmap — sketches a PQC adoption sequence across multiple forks with milestones I*/J*/L*/M* spanning PQ key registries, attestations, sig aggregation, and PQ blobs. The Ethereum Foundation targets L1 PQC adoption by 2029.

Implementation has progressed furthest on the consensus layer. The [Lean Consensus / leanEthereum roadmap](https://leanroadmap.org/) coordinates eight client teams building a hash-based replacement stack: **leanSig** (generalized XMSS / Winternitz signatures using Poseidon1), **leanMultisig** (aggregate signatures over leanSig), and **leanVM** (a minimal zkVM for recursive aggregation). Four PQ devnets have shipped between October 2025 and February 2026, and pq-devnet-4 (recursive PQ aggregation via leanVM) is planned for March 2026. Transaction-layer migration is structured around account abstraction: [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) shipped in Pectra (May 2025), and [a series of draft EIPs](https://ethresear.ch/t/the-road-to-post-quantum-ethereum-transaction-is-paved-with-account-abstraction-aa/21783) (8141, 7701, 7932, plus precompile drafts 7619/7592/8051/8052) define the path for native protocol-level PQC support. None of these has shipped to mainnet.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **leanSig** (generalized XMSS / Winternitz, Poseidon1-based) | BLS12-381 | Consensus | In Development (integrated across 5+ clients on PQ devnets) |
| **leanMultisig** (XMSS-based aggregate signatures) | BLS12-381 aggregation | Consensus | In Development (integrated on pq-devnet-2+; perf targets in flight) |
| **leanVM** (zkVM for recursive PQ aggregation) | BLS pairing-based aggregation | Consensus, On-Chain | In Development (planned for pq-devnet-4) |
| **Falcon / FN-DSA** | ECDSA secp256k1 | Tx Signatures, On-Chain | On Roadmap (EIP-7619, EIP-7592, EIP-8052 draft precompiles; ZKNox/ETHFALCON pure-Solidity demos) |
| **ML-DSA** (Dilithium) | ECDSA secp256k1 | Tx Signatures, On-Chain | On Roadmap (EIP-8051 draft precompile) |
| **STARK / hash-based commitments** | KZG on BLS12-381 | Other (DA blobs) | On Roadmap (Strawmap M* milestone, "PQ blobs") |

## 1. Transaction Signatures

**Grade: C 🗺️**

Ethereum's protocol-level transaction signatures are still ECDSA secp256k1 only. The migration path is structured around account abstraction: existing externally-owned accounts (EOAs) delegate to contract code that can implement arbitrary verification logic, including PQC schemes. [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) (shipped in Pectra, May 2025) is the structural enabler — it allows EOAs to set delegation code, opening the door for per-tx PQC verification logic.

Several draft EIPs converge on the protocol-level path. [EIP-8141](https://eips.ethereum.org/EIPS/eip-8141) ("Frame Transactions," 2026-01-29) introduces a new transaction type whose validity and fee logic are arbitrary EVM code, providing what the EIP describes as "a native off-ramp from the elliptic curve based cryptographic system used to authenticate transactions today, to post-quantum (PQ) secure systems." It received CFI status for Hegota but was [dropped from headliners](https://bitcoinethereumnews.com/ethereum/ethereum-hegota-upgrade-drops-framework-transactions-over-complexity-concerns/) over implementation complexity concerns; it remains under review for a future fork. [EIP-7932](https://eips.ethereum.org/EIPS/eip-7932) defines a registry and decoder precompile framework for adding PQ algorithms via separate companion EIPs. [EIP-7701](https://eips.ethereum.org/EIPS/eip-7701) covers protocol-level native AA.

At the smart-contract-wallet level, PQC is already feasible without a fork: pure-Solidity **Falcon-1024** verification has been [demonstrated under ~10M gas](https://ethresear.ch/t/the-road-to-post-quantum-ethereum-transaction-is-paved-with-account-abstraction-aa/21783), and ZKNox's ETHFALCON dropped the cost from ~24M to ~3.6M gas, making PQC via ERC-4337 practical today.

**Current state.** Mainnet transactions are exclusively ECDSA secp256k1. EIP-7702 shipped in Pectra (May 2025) as the AA enabler.

**Planned future work.** EIP-8141 (Draft, dropped from Hegota), EIP-7701 (Draft), EIP-7932 (Draft, 2025-04-12). Precompile drafts 7619, 7592, 8051, 8052 are tracked under On-Chain Logic. The Ethereum Foundation targets L1 PQC adoption by 2029.

## 2. Consensus

**Grade: B 🔧**

Ethereum's consensus is Gasper (Casper FFG finality + LMD-GHOST fork choice), with block and attestation signing on BLS12-381 aggregated signatures, validator identity on BLS12-381 public keys, and RANDAO randomness. BLS12-381 is EC-pairing-based and quantum-vulnerable.

The replacement is a hash-based stack designed for PQ security plus scalability via SNARK aggregation. **leanSig** is a generalized XMSS-style hash-based signature scheme (Winternitz variant) using Poseidon1 tweakable hashing; signing benchmarks at ~160μs (target ~150μs), verification at ~75μs (well under the 190μs target). **leanMultisig** is an aggregate signature scheme over leanSig, designed for compact validator-set aggregation, with [aggregate sizes currently 313–391% of target](https://github.com/leanEthereum/leanMultisig). **leanVM** is a minimal zkVM used to recursively aggregate PQ signatures into a single proof per message, replacing BLS aggregation's "free" pairing-based property.

PQ devnet progression to date ([leanroadmap.org](https://leanroadmap.org/)):

- pq-devnet-0 (Oct 2025) — leanSpec + 3-client interop, 4-second slots.
- pq-devnet-1 (Dec 2025) — **leanSig** signing/verification across 5 clients.
- pq-devnet-2 (Jan 2026) — **leanMultisig** aggregation integrated.
- pq-devnet-3 (Feb 2026) — decoupled aggregator role; aggregate propagation protocol.
- pq-devnet-4 (Mar 2026, planned) — recursive PQ aggregation via **leanVM**.

Eight client teams are building the PQ consensus layer (Ream, Zeam, Qlean-mini, Lantern, Lighthouse PQ fork, ethlambda, gean, Peam), with Grandine also running PQ devnets. The [theory paper](https://eprint.iacr.org/2025/055.pdf) (Khovratovich, Wagner et al., eprint 2025/055) and [reference implementations](https://github.com/leanEthereum/leanSig) are public.

**Current state.** Mainnet consensus is BLS12-381. Four PQ devnets have shipped; the fifth (recursive aggregation) is planned for March 2026. None of the PQ stack has reached production audit.

**Planned future work.** Strawmap milestones I* (PQ key registry), L* (PQ attestations + real-time CL proofs + leanVM), and M* (PQ aggregation + PQ blobs). EF target: L1 PQC by 2029.

## 3. P2P Networking

**Grade: F ❌**

Ethereum's networking layer covers two transports: devp2p on the execution layer (RLPx with ECIES, secp256k1 node identity) and libp2p on the consensus layer (Noise XX framework, secp256k1 / Ed25519 node identity). Peer discovery uses Kademlia DHT (discv5) and gossipsub. All node identity and key exchange is EC-based.

No specific PQC plan for P2P has been published. Gossipsub v2.0 work in [libp2p/specs](https://leanroadmap.org/) is scaling and censorship-resistance work, not PQ. The expectation in published material is that P2P migration follows after consensus and tx signatures land.

**Current state.** secp256k1 / Ed25519 node identity, ECIES/Noise XX handshakes. No PQ alternatives drafted.

**Planned future work.** No EIP, working-group thread, or specification is currently published for PQC P2P transport.

## 4. On-Chain Logic

**Grade: C 🗺️**

The EVM offers ecrecover (secp256k1), ecAdd/ecMul/ecPairing (BN254), BLS12-381 ops via [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537), and KZG point evaluation (EIP-4844). Hash precompiles include SHA-256, RIPEMD-160, Keccak-256, and Blake2f. No precompile currently verifies a PQC signature scheme. Pure-Solidity **Falcon-1024** verification has been demonstrated below 10M gas; **ML-DSA** work is in flight at the same level.

A precompile-based path is on the published roadmap (Strawmap J* milestone, "PQ sig precompiles") with multiple competing draft EIPs:

- [EIP-7619](https://ethereum-magicians.org/t/eip-7619-falcon-512-precompiled-generic-signature-verifier/18569) — **Falcon-512** generic verifier (Magicians draft).
- [EIP-7592](https://ethereum-magicians.org/t/eip-7592-falcon-signature-verification-pre-compile/18053) — **Falcon** precompile (Magicians draft).
- [EIP-8051](https://ethereum-magicians.org/t/eip-8051-ml-dsa-verification/25857) — **ML-DSA** verification (Magicians draft, Mar 2026).
- [EIP-8052](https://ethereum-magicians.org/t/eip-8052-precompile-for-falcon-support/25860) — **Falcon** precompile (Magicians draft, Mar 2026).
- [EIP-7932](https://eips.ethereum.org/EIPS/eip-7932) — generic signature-algorithm registry + decoder precompile.

[poqeth](https://eprint.iacr.org/2025/091.pdf) (eprint 2025/091) is the cited research on practical PQC sig verification inside the EVM. **leanVM** is also under exploration as a more efficient host for PQ verification than monolithic precompiles.

**Current state.** No PQC precompile shipped. Pure-Solidity demos exist for **Falcon-1024**.

**Planned future work.** Multiple draft EIPs above. Strawmap J* milestone targets PQ sig precompiles, with no specific fork date pinned beyond the 2029 PQ-by L1 target.

## 5. Other Features

### KZG Commitments (Blobs / EIP-4844 / Danksharding)

KZG polynomial commitments on BLS12-381 are used for data availability for rollups (blob data committed via KZG, EIP-4844). The setup required a trusted setup ceremony. A quantum adversary could forge blob commitments and undermine rollup DA guarantees.

**Current state.** KZG on BLS12-381 in production via EIP-4844; PeerDAS / EIP-7594 shipped in Fusaka (December 2025). The PQ alternative is **STARK / hash-based commitments** — no trusted setup, quantum-resistant.

**Planned future work.** Strawmap M* milestone targets PQ blobs via STARK-based commitments. No specific fork date pinned beyond the 2029 PQ-by L1 target.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Ethereum's PQC-adoption ratings per category are: Tx Signatures 🗺️, Consensus 🔧, P2P ❌, On-Chain 🗺️, Other 🗺️.

The [published Strawmap](https://strawmap.org/) is a PQC *adoption* roadmap, not an EC *retirement* schedule. PQ signatures, precompiles, and aggregation are sequenced into specific Strawmap forks (I* / J* / L* / M*), but no fork carries a commitment to disable ECDSA tx submission, deprecate ecrecover/BN254/BLS12-381 precompiles, or reject EC validators. Account abstraction makes PQC opt-in; ECDSA-bound EOAs are explicitly preserved indefinitely.

The Ethereum Foundation targets L1 PQC adoption by 2029. Full execution-layer migration (every account migrated off ECDSA) is described in EF materials as "additional years beyond" — aspirational, not scheduled. No retirement date for ECDSA acceptance has been proposed.

**Current state.** No EC removal scheduled. PQC-adoption ratings (above) progress unevenly across categories, but each is additive rather than substitutive.

**Planned future work.** None published. Moving this rating would require a fork-specific commitment such as "as of fork N, ECDSA-signed txs are rejected," "ecrecover deprecated as of fork N+k," or "new validators must use PQ keys." None of these exist today.

## Governance

Ethereum's protocol changes follow off-chain rough consensus via [All Core Devs (ACD) calls](https://github.com/ethereum/pm). Proposals are filed in the [EIP repo](https://github.com/ethereum/EIPs) and discussed on [Ethereum Magicians](https://ethereum-magicians.org/), [ethresear.ch](https://ethresear.ch/), and EF blog posts. Client team maintainers collectively hold merge power; the EF has influence but no veto. Hard forks ship roughly 1–2 per year.

PQ-relevant proposals on the EIP repo and Magicians forum:

- [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) — EOA delegation. Status: Final. Shipped: Pectra, May 2025.
- [EIP-7701](https://eips.ethereum.org/EIPS/eip-7701) — Native account abstraction with EOF. Status: Draft.
- [EIP-8141](https://eips.ethereum.org/EIPS/eip-8141) — Frame Transactions. Status: Draft. CFI for Hegota; [dropped from Hegota headliners](https://bitcoinethereumnews.com/ethereum/ethereum-hegota-upgrade-drops-framework-transactions-over-complexity-concerns/) over complexity concerns; remains "considered for inclusion" for future forks. Filed 2026-01-29.
- [EIP-7932](https://eips.ethereum.org/EIPS/eip-7932) — Secondary Signature Algorithms registry. Status: Draft. Filed 2025-04-12.
- [EIP-7619](https://ethereum-magicians.org/t/eip-7619-falcon-512-precompiled-generic-signature-verifier/18569) — Falcon-512 precompile. Status: Magicians draft.
- [EIP-7592](https://ethereum-magicians.org/t/eip-7592-falcon-signature-verification-pre-compile/18053) — Falcon precompile. Status: Magicians draft.
- [EIP-8051](https://ethereum-magicians.org/t/eip-8051-ml-dsa-verification/25857) — ML-DSA verification precompile. Status: Magicians draft. Filed Mar 2026.
- [EIP-8052](https://ethereum-magicians.org/t/eip-8052-precompile-for-falcon-support/25860) — Falcon precompile. Status: Magicians draft. Filed Mar 2026.
- [EIP-7766](https://ethresear.ch/t/the-road-to-post-quantum-ethereum-transaction-is-paved-with-account-abstraction-aa/21783) — ERC-4337 signature aggregation. Status: Draft.
- [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) — BLS12-381 precompiles. Status: Final, 2024.

EF process and venue activity:

- 2026-01-24: EF [makes post-quantum security a top strategic priority](https://pq.ethereum.org/) and forms a dedicated PQ team.
- 2026-02-18: EF publishes the [Protocol Priorities Update for 2026](https://blog.ethereum.org/en/2026/02/18/protocol-priorities-update-2026); the "Harden the L1" track explicitly names PQ security; "Improve UX" ties native AA to PQ migration.
- 2026-02-26: EF Protocol team publishes the [Strawmap](https://strawmap.org/) as a strawman, not an official EF position; [press coverage](https://www.coindesk.com/tech/2026/02/26/vitalik-buterin-unveils-ethereum-roadmap-to-counter-quantum-computing-threat) at the time attributed it to Vitalik Buterin.
- 2026-03-25: EF launches [pq.ethereum.org](https://pq.ethereum.org/) as a public PQ hub ([CoinDesk coverage](https://www.coindesk.com/tech/2026/03/25/ethereum-foundation-prepares-for-quantum-threat-with-new-cryptography-roadmap)).
- 2026 (Hegota planning): EIP-8141 dropped from Hegota headliners; remains under review for future forks.

Implementation tracking:

- [Lean Consensus Roadmap](https://leanroadmap.org/) — devnet schedule, eight-client status, research tracks.
- [pq.ethereum.org](https://pq.ethereum.org/) — EF post-quantum hub.

Research and supporting material:

- [asanso et al., "The Road to Post-Quantum Ethereum: Transactions Paved with Account Abstraction"](https://ethresear.ch/t/the-road-to-post-quantum-ethereum-transaction-is-paved-with-account-abstraction-aa/21783) (ethresear.ch).
- [Khovratovich, Wagner et al., "Hash-Based Multi-Signatures for Post-Quantum Ethereum"](https://eprint.iacr.org/2025/055.pdf) (eprint 2025/055).
- ["poqeth: Practical PQC signature verification on EVM"](https://eprint.iacr.org/2025/091.pdf) (eprint 2025/091).
- [leanEthereum/leanSig](https://github.com/leanEthereum/leanSig) and [leanEthereum/leanMultisig](https://github.com/leanEthereum/leanMultisig) reference implementations.

---

_Generated on 5 May 2026 based on information as of 30 Apr 2026._

_Corrections and additions: contact channel pending launch._

_Editorial policy: none currently published._
