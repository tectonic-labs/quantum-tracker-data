# Aleo (ALEO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Aleo |
| **Ticker** | ALEO |
| **Website** | [aleo.org](https://aleo.org/) |
| **GitHub** | [ProvableHQ](https://github.com/ProvableHQ) |
| **On-chain environment** | snarkVM (custom register-based VM; Aleo programs are R1CS circuits compiled from the Leo DSL) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Aleo is a privacy-focused L1 whose every transaction is wrapped in a zero-knowledge proof under the [Marlin / Varuna SNARK](https://eprint.iacr.org/2019/1047) over [BLS12-377 pairings](https://developer.aleo.org/concepts/advanced/the_aleo_curves/bls12-377/). User accounts sign with [Schnorr over Edwards-BLS12](https://developer.aleo.org/concepts/advanced/the_aleo_curves/edwards_bls12/) (a.k.a. Decaf377), and on-chain "records" — Aleo's unit of private state — are encrypted with EC Diffie-Hellman keyed off the recipient's view key. All of these layers depend on elliptic-curve discrete-log hardness.

This makes Aleo's quantum exposure two-layered: a sufficiently capable quantum attacker would break both the user-signature layer (Schnorr-over-Edwards-BLS12) *and* the proof-system layer (Marlin/Varuna pairings) independently, and could decrypt historical record material via the EC handshake. Past privacy is not preserved by any future migration. As of this writing, no public migration plan, working-group document, or in-repo post-quantum effort has been located from the [Aleo Network Foundation](https://aleo.org/), [Provable Inc.](https://provable.com/blog/provable-acquires-leo-wallet) (which operates much of the core infrastructure), or Demox Labs (Leo Wallet's original builder). The recently-launched [Shield wallet](https://aleo.org/post/introducing-shield-the-private-crypto-wallet/) (February 2026) is silent on quantum threat, and the [Aleo VM Specification](https://developer.aleo.org/specs/aleovm.pdf) (November 2025) does not enumerate post-quantum primitives.

## Proposed and Implemented PQC Algorithms

Aleo does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Aleo in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Aleo in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Aleo in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

Aleo programs are SNARK circuits authored in the Leo DSL and compiled to R1CS over the BLS12-377 scalar field. The protocol provides native Schnorr-over-Edwards-BLS12 verification (`sign.verify`) along with broad hash-family primitives (Poseidon, BHP, Pedersen, Keccak, SHA-3) — but no protocol-level post-quantum signature verifier. Because Aleo programs are general circuits, a developer *could* in principle deploy a hash-based or lattice-based verifier as an Aleo program — analogous to a vault contract on a non-PQC chain — but no such verifier program has been located on Aleo mainnet, and lattice-signature verification in-circuit would be expensive in proving cost.

**Current state.** Native verifier surface covers only Schnorr-over-Edwards-BLS12; no protocol-provided post-quantum primitive exists.

**Planned future work.** The [Aleo VM Specification (November 2025)](https://developer.aleo.org/specs/aleovm.pdf) does not list post-quantum verifier primitives as planned snarkVM instructions. We have located no in-repo work in [snarkVM](https://github.com/ProvableHQ/snarkVM) or [snarkOS](https://github.com/ProvableHQ/snarkOS) toward a protocol-level PQ verifier.

## Other Features

### Marlin / Varuna SNARK proof system

Every Aleo transaction is wrapped in a [Marlin / Varuna](https://eprint.iacr.org/2019/1047) zero-knowledge proof attesting to correct execution of the invoked Aleo program(s) under private inputs. Marlin / Varuna is a universal updateable preprocessing SNARK — the same trusted setup serves all circuits up to a size bound. The construction uses KZG-style polynomial commitments over [BLS12-377 pairings](https://developer.aleo.org/concepts/advanced/the_aleo_curves/bls12-377/), and the universal SRS was generated via a multi-party "powers-of-tau" ceremony.

A break of BLS12-377 pairings would forge proof soundness independently of the user-signature layer: an attacker could produce a valid-looking SNARK proof for any state transition without needing to recover any user's signing key. Addressing the user-signature layer alone would not rescue this layer. Hash-based STARKs avoid elliptic curves entirely and are the natural conceptual target for a post-quantum proof-system replacement — but no such migration plan or working group has been published for Aleo, and any path forward would be a significant snarkVM redesign requiring recompilation of every existing Aleo program against the new circuit shape.

**Current state.** Marlin / Varuna is the load-bearing primitive of the protocol. No post-quantum replacement is in development.

**Planned future work.** None published.

### Encrypted records (privacy substrate)

Aleo's "records" are the unit of private state: each record is an encrypted blob posted on-chain together with a SNARK proof that the encrypted contents satisfy the program's public predicate. Only the holder of the view key can decrypt the record contents. Encryption is symmetric, keyed off an Edwards-BLS12 ECDH handshake between the sender's randomness and the recipient's view key, with key derivation via Poseidon / BHP.

A quantum break of Edwards-BLS12 lets an attacker reconstruct view-key material from public on-chain handshake data and decrypt the entire historical record set. Combined with a proof-system break, the attacker recovers the full transaction graph, record contents, and the ability to forge future state transitions. Past privacy is not preserved by any future migration of the encryption layer alone.

**Current state.** Record encryption is tied to the same EC substrate as the rest of the chain. No post-quantum replacement located.

**Planned future work.** None published.

### Universal updateable trusted setup

The Marlin / Varuna structured reference string was generated via a multi-party ceremony and remains updateable — additional contributors can extend the setup, and only one honest contributor is required for soundness. This protects against classical setup compromise but is not a defense against a quantum attacker, because the attacker can simulate the trapdoor by breaking discrete log directly rather than needing the original ceremony's secret randomness.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Aleo in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

The Aleo protocol is stewarded by the [Aleo Network Foundation](https://aleo.org/). [Provable Inc.](https://provable.com/blog/provable-acquires-leo-wallet) operates much of the core infrastructure, contributes to [snarkVM](https://github.com/ProvableHQ/snarkVM) and [snarkOS](https://github.com/ProvableHQ/snarkOS), and acquired Leo Wallet from Demox Labs in November 2025. We have not located a formal numbered improvement-proposal process (CIP / AIP-style); protocol changes appear to flow through the Foundation and Provable engineering channels.

No post-quantum-relevant proposals, working-group documents, or scheduled discussions have been located. Recent governance milestones include the Aleo mainnet launch (September 2024), the publication of the [Aleo VM Specification](https://developer.aleo.org/specs/aleovm.pdf) (November 2025), Provable Inc.'s [acquisition of Leo Wallet](https://provable.com/blog/provable-acquires-leo-wallet) (17 November 2025), and the [launch of Shield](https://aleo.org/post/introducing-shield-the-private-crypto-wallet/), the multi-chain Leo Wallet successor (17 February 2026). None of these venues has produced a public statement on quantum migration as of the date below.

---

_Generated on 03 Jun 2026 based on information as of 09 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
