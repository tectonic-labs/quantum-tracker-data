# Concordium (CCD) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Concordium |
| **Ticker** | CCD |
| **Website** | [concordium.com](https://www.concordium.com/build/technology) |
| **GitHub** | [Concordium](https://github.com/Concordium) |
| **On-chain environment** | Custom WASM VM (contracts authored in Rust and compiled to WASM) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Concordium is a Foundation-stewarded L1 with an [identity-bound account model](https://docs.concordium.com/en/mainnet/docs/network/web3-id/index.html): every account is tied to an off-chain-issued identity object held by a Foundation-curated Identity Provider, and each identity carries an *anonymity-revocation envelope* — pairing-based ciphertext that lets a registered Anonymity Revoker re-link a pseudonymous account to its real-world identity under a valid legal order. Transactions sign with Ed25519, validator finality uses BLS12-381 aggregate signatures via [Concordium BFT](https://docs.concordium.com/en/mainnet/docs/network/concepts/consensus.html), and the identity layer rests on BLS12-381 pairings together with [Bulletproofs and Sigma protocols](https://medium.com/concordium/zero-knowledge-proofs-for-self-sovereign-id-on-concordium-ae8bff277165).

This produces a quantum exposure that is qualitatively different from a pure-privacy chain. A break of BLS12-381 pairings would let an attacker decrypt the anonymity-revocation envelopes *without* the Anonymity Revoker's cooperation and *without* a legal order — re-linking every pseudonymous account back to its real-world legal identity, retroactively, all the way to mainnet launch in June 2021. Past pseudonymity is not preserved by any future migration. As of this writing, no public post-quantum roadmap, working-group document, or in-repo migration effort has been located from the Concordium Foundation; published cryptographic content from the Foundation focuses on Web3 ID, selective-disclosure proofs, compliance, and onboarding without quantum-threat coverage.

## Proposed and Implemented PQC Algorithms

Concordium does not currently propose or implement any post-quantum cryptographic algorithms.

## Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for Concordium in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for Concordium in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Concordium in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: F ❌**

Concordium's smart-contract surface is a [custom WASM virtual machine](https://github.com/Concordium) that runs Rust contracts compiled to WASM. Host functions exposed to contracts include Ed25519 verification and the primitives supporting the identity / Web3 ID flows; SHA-256 and Keccak hash families are available. No protocol-provided post-quantum signature verifier is exposed as a host function or shipped as a published bytecode library. The WASM substrate is structurally well-suited to host a contract-level post-quantum verifier — a Rust verifier compiled to WASM is a natural fit, and no protocol fork would be required — but no such work is publicly visible.

**Current state.** Native verifier surface covers Ed25519 only; no protocol-provided post-quantum primitive exists.

**Planned future work.** None located. No Concordium Improvement Proposal or Foundation statement proposing a post-quantum primitive has been identified.

## Other Features

### Concordium identity layer (Identity Objects, Anonymity Revocation, Web3 ID)

Concordium's distinguishing feature is its [identity layer](https://docs.concordium.com/en/mainnet/docs/network/web3-id/index.html). Every account is bound to an off-chain-issued identity object embedding an anonymity-revocation envelope — a pairing-based ciphertext of the holder's identity attributes encrypted to a registered Anonymity Revoker. Under a valid legal order, the Anonymity Revoker can decrypt the envelope and bind the on-chain account to a real-world identity. Web3 ID layers selective-disclosure zero-knowledge proofs (e.g. age, residency) on top of the same identity object using [Bulletproofs and Sigma protocols](https://medium.com/concordium/zero-knowledge-proofs-for-self-sovereign-id-on-concordium-ae8bff277165) over BLS12-381, with Pedersen commitments throughout. The construction is pairing-based, not Groth16; all assumptions reduce to discrete-log and bilinear-pairing hardness.

A sufficiently capable quantum attacker would break this layer in two independent ways: discrete-log breaks let them forge or unbind past zero-knowledge identity proofs, and the same break against the pairing-based encryption opens every anonymity-revocation envelope without the Revoker's keys. The result is retroactive deanonymization of the *legal-identity binding* of every account that has ever transacted on Concordium — a different shape of risk from financial-privacy chains, where the retroactive break exposes shielded amounts and graph linkage rather than the formal identity attached to an account. The chain's BLS12-381 finality signatures are exposed in the same break, undermining historical block-finality non-repudiation.

A migration would require redesigning the identity-layer cryptography (e.g. moving the proof system to a hash-based ZK construction, and the anonymity-revocation envelope to a lattice-based KEM) *and* coordinating re-keying with Identity Providers and Anonymity Revokers — off-chain regulated entities whose key material lives outside the chain. This is more involved than a chain-internal signature swap.

**Current state.** No post-quantum alternative for the identity layer is documented, prototyped, or roadmapped.

**Planned future work.** None published.

## EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating migration activity for Concordium in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

The Concordium protocol is governed by the [Concordium Foundation](https://www.concordium.com/about-us), a Swiss non-profit, which holds chain-governance authority and curates the registries of Identity Providers and Anonymity Revokers. The engineering subsidiary ships the [node and wallet clients](https://github.com/Concordium) under Apache-2.0. We have not located a formal CIP / EIP-style numbered improvement-proposal process; protocol updates are decided by the Foundation in consultation with stakers and activated via on-chain protocol-update transactions signed by Foundation governance keys.

No post-quantum-relevant proposals, working-group documents, or scheduled discussions have been located. Recent governance milestones include the Concordium mainnet launch (June 2021), with the identity layer live from genesis, and the Concordium BFT (Consensus 2.0) upgrade in 2024 that introduced deterministic finality with BLS12-381 aggregate signatures. None of these venues has produced a public statement on quantum migration as of the date below.

---

_Generated on 09 May 2026 based on information as of 09 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
