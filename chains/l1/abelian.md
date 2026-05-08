# Abelian (ABEL) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Abelian |
| **Ticker** | ABEL |
| **Website** | https://www.pqabelian.io/ |
| **GitHub** | https://github.com/pqabelian |
| **Twitter / X** | https://x.com/pqabelian |
| **On-chain environment** | None on L1; QDay L2 (planned) is EVM-compatible |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | A | ✅ | Shipped |
| EC Sunset | A | ✅ | Shipped |

Abelian is a [post-quantum, privacy-focused L1](https://www.pqabelian.io/) that has been lattice-based since genesis rather than retrofitting from elliptic-curve cryptography. Transaction signing, address derivation, and the privacy stack all use [a lattice-based linkable ring signature scheme inspired by CRYSTALS-Dilithium](https://download.abelian.info/release/docs/whitepaper.pdf), and the consensus layer is GPU-friendly Proof-of-Work whose security rests on hash functions rather than on EC primitives.

The chain has no general-purpose smart-contract VM on L1; an EVM-compatible Layer-2 called QDay using zero-knowledge rollups is planned but not yet live. Documentation around the P2P transport and node-identity cryptography is sparse, so those layers are presented as architecturally consistent with the chain's PQC stance but not yet independently confirmed.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **Lattice-based linkable ring signatures** (CRYSTALS-Dilithium–inspired) | EC-based signing / ring-signature schemes | Tx Signatures | Implemented |
| **Lattice-based commitments and zero-knowledge proofs** (MLP101) | EC-pairing-based privacy primitives | Other (privacy) | Implemented |

## Transaction Signatures

**Grade: A ✅**

Abelian's transaction signing is fully lattice-based and has been since mainnet genesis. The chain offers three privacy modes — Pseudonym, Full Privacy, and Super Privacy — and [all three rely on the same lattice-based linkable ring signature scheme](https://www.pqabelian.io/) inspired by NIST-standardized **CRYSTALS-Dilithium**, with stealth address generation per transaction. There is no ECDSA / Ed25519 / Schnorr fallback or hybrid path.

**Current state.** Lattice-based ring signatures live on mainnet across all transaction types. Address derivation produces one-time stealth addresses from lattice keys. Multi-sig and threshold schemes are not documented in public materials; the documented focus is single-user privacy via ring sigs.

**Planned future work.** No transaction-signing migration is needed. The planned QDay L2 will need to specify whether it inherits the L1 lattice-based signature path or introduces a rollup-specific signature scheme; that decision is not yet documented.

## Consensus

**Grade: A ✅**

Consensus is GPU-friendly Proof-of-Work whose cryptographic security rests on [hash-based block commitments](https://download.abelian.info/release/docs/whitepaper.pdf), not on elliptic-curve signatures. Miners have no validator key material in the EC-signing sense, which removes the usual quantum exposure for block authorship.

**Current state.** PoW with longest-chain rule and difficulty adjustment, in production since genesis. No validator signing keys, no EC-based block authentication, no separate randomness beacon tied to EC-VRF.

**Planned future work.** No consensus-layer migration is contemplated; the design is hash-based by construction.

## P2P Networking

**Grade: D ⚠️**

The P2P layer is implemented in the `abec` node software, but the documentation made public does not pin down the transport handshake or peer-authentication primitives. The architecture is consistent with PQC node identities and a PQC handshake — given the rest of the stack is lattice-based — but that has not been independently confirmed.

**Current state.** Standard P2P discovery mechanism. Node identity and handshake cryptography are not explicitly documented in publicly available sources; there is no evidence of EC dependence in the P2P layer, but neither is there published evidence that rules it out.

**Planned future work.** No specific P2P PQC upgrades are announced. The state is "documentation gap" rather than "no plan to migrate"; clarification from the Abelian Foundation would resolve the rating.

## On-Chain Logic

**Grade: D ⚠️**

Abelian's L1 has no general-purpose smart-contract VM, so there is no on-chain signature-verification API to grade against in the usual sense. The chain's own privacy logic is implemented at the protocol layer, not as user-deployable contracts. The forthcoming [QDay L2](https://www.pqabelian.io/) is intended to bring EVM-compatible smart contracts via zero-knowledge rollups; whether QDay's contract-layer signature verification will inherit the L1 lattice-based scheme or rely on ECDSA-style verification is not yet documented.

**Current state.** No L1 contract layer; protocol-native privacy logic in production. No EC precompiles or builtins exposed.

**Planned future work.** QDay L2 is in development, not live. The PQC inheritance story for L2 contract-level signatures is the open question that keeps this category from being rated higher.

## Other Features

### Multi-Layer Privacy (MLP101)

**Current state.** Abelian's flagship privacy stack combines lattice-based linkable ring signatures, commitment schemes that hide transaction amounts, and lattice-based zero-knowledge proofs. Stealth addresses and metadata-obfuscation features sit on top. The entire privacy surface is lattice-based; no EC-based ring signatures, no Groth16-style EC-pairing ZK proofs are present.

Quantum-break risk for privacy chains is retroactive: a break to the underlying primitives does not just compromise future transactions, it potentially deanonymizes the entire historical ledger. Abelian's lattice-based foundation puts it in a different posture from EC-based privacy chains on this dimension.

**Planned future work.** No migration is required for the existing privacy stack; it is PQC-native. The QDay L2 will need its own treatment if it introduces additional privacy primitives.

## EC Sunset

**Grade: A ✅**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ✅, Consensus ✅, P2P ⚠️, On-Chain ⚠️, Other ✅.

**Current state.** Abelian never adopted elliptic-curve cryptography. Lattice-based signatures, commitments, and ZK proofs have been the only signing and privacy primitives since mainnet genesis. There is no EC retirement timeline because there is no EC to retire.

**Planned future work.** Not applicable. Any future L2 or compatibility surface that introduces EC dependencies would change this rating; nothing of the kind is currently announced.

## Governance

Abelian uses a foundation-led governance model; the [Abelian Foundation](https://www.pqabelian.io/) directs core development and research, and there is no public on-chain proposal or voting system documented. PQC-relevant decisions appear in the project's documentation, GitHub repositories at https://github.com/pqabelian, and the [community site](https://community.pqabelian.io/) rather than through formal proposals.

---

_Generated on 08 May 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
