# Naoris Protocol (NAORIS) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Naoris Protocol |
| **Ticker** | NAORIS |
| **Website** | https://www.naorisprotocol.com/ |
| **Twitter / X** | https://x.com/NaorisProtocol |
| **Blog** | https://www.naorisprotocol.com/blog |
| **Mainnet launch** | 2026-04-01 |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | A | ✅ | Shipped |
| Consensus | A | ✅ | Shipped |
| P2P Networking | D | ⚠️ | Discussed |
| On-Chain Logic | D | ⚠️ | Discussed |
| Other Features | D | ⚠️ | Discussed |
| EC Sunset | ➖ | ➖ | Not Applicable |

Naoris Protocol is a post-quantum-native L1 whose [quantum-resistant mainnet](https://www.coindesk.com/markets/2026/04/03/naoris-protocol-s-quantum-resistance-blockchain-goes-live-as-bitcoin-and-ethereum-face-q-day-threats/) went live on April 1, 2026. All transaction signatures and validator identities use **ML-DSA** (Dilithium-5), the NIST-standardized lattice signature scheme published as FIPS 204. There is no elliptic-curve cryptography anywhere in Naoris's own protocol: signing is post-quantum from genesis, and the protocol enforces an "irreversible security transition" whereby, once an account adopts post-quantum keys, any later attempt to transact with classical keys is blocked at the protocol level, preventing downgrade attacks.

Transaction Signatures and Consensus are rated A (Shipped) because both ship ML-DSA in production: every on-chain transaction is signed with ML-DSA, and the dPoSec ("Decentralized Proof of Security") consensus binds validator identity and block signing to post-quantum keys. The remaining categories — P2P Networking, On-Chain Logic, and Other Features — are rated D (Discussed) because the underlying mechanisms (the "Sub-Zero Layer" networking stack, the cross-ecosystem security-overlay verification model, and the broader security-layer value proposition) are described as using NIST-approved PQC but are not yet fully documented publicly, and the mainnet is recent and unproven at scale. These ratings reflect the project's claims as stated by the project where independent detail is not yet available.

EC Sunset is **Not Applicable** rather than a failure: Naoris's own protocol contains no elliptic curve to retire. ML-DSA secures all signatures from launch, and classical key usage is blocked once post-quantum keys are adopted, so there is no EC sunset obligation within the protocol itself.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** (Dilithium-5 / FIPS 204) | n/a (no EC in protocol) | Tx Signatures | Shipped (live on mainnet since April 2026; all transactions) |
| **ML-DSA** (Dilithium-5 / FIPS 204) | n/a (no EC in protocol) | Consensus | Shipped (dPoSec validator identity and block signing) |

## 1. Transaction Signatures

**Grade: A ✅**

Naoris signs all on-chain transactions with **ML-DSA** (Dilithium-5), the NIST FIPS 204 standardized post-quantum signature scheme. Addresses are derived from ML-DSA public keys, and the network reports having processed over 106 million transactions with ML-DSA signatures since the April 2026 mainnet launch. The project states its ML-DSA usage is aligned with NIST, NATO, and ETSI standards.

**Current state.** ML-DSA (Dilithium-5) is the native and only transaction signature scheme; no EC-based alternative exists. The protocol enforces an irreversible security transition: once an account adopts post-quantum keys, subsequent attempts to transact with classical cryptographic methods are blocked, preventing downgrade attacks. Pre-launch validation reportedly processed over 100 million test transactions.

**Planned future work.** None required for transaction signing; the chain is post-quantum from genesis. Multi-signature and threshold variants are not yet documented publicly.

## 2. Consensus

**Grade: A ✅**

Naoris uses a novel consensus mechanism it calls dPoSec (Decentralized Proof of Security). Block signing and validator identity use **ML-DSA** (Dilithium-5) post-quantum keys. Under dPoSec, nodes continuously validate network and device security state and must demonstrate an active security posture before participating in consensus.

**Current state.** Validator identity and block signing use ML-DSA from launch. The validator operator set was invite-only at mainnet launch, with the project claiming a large network of security nodes. Randomness-beacon and finality details are not yet publicly documented.

**Planned future work.** The project describes dPoSec specifics as evolving with mainnet production experience, and an expansion of the validator set from invite-only toward a permissionless model is anticipated, though no timeline has been published.

## 3. P2P Networking

**Grade: D ⚠️**

Naoris describes a "Sub-Zero Layer" networking stack that operates beneath the traditional blockchain layers and claims to use NIST-approved PQC algorithms for all node-to-node communications. The specific algorithms, handshake construction, and peer-discovery details have not been fully documented publicly.

**Current state.** PQC networking is claimed across the Sub-Zero Layer, but the underlying specifics are not yet verifiable from public documentation. Because the design is novel and the mainnet is recent, this category is rated Discussed.

**Planned future work.** The project indicates that Sub-Zero Layer architecture details are expected to be clarified as the mainnet matures. If a published specification or implementation detail exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: D ⚠️**

Naoris is primarily a security layer for other blockchains rather than a conventional smart-contract platform. It is described as validating transactions and smart-contract logic at the Sub-Zero Layer and enabling PQC signature verification across ecosystems, integrating with existing chains without requiring hard forks on those chains.

**Current state.** On-chain PQC signature verification is claimed as part of the security-overlay model, but the architecture is novel, not fully documented, and unproven at scale on a mainnet that launched in April 2026. Whether a standalone VM or smart-contract environment exists is not publicly detailed.

**Planned future work.** The project indicates on-chain verification specifics will be clarified as the mainnet matures and integrations expand.

## 5. Other Features

**Grade: D ⚠️**

Naoris positions itself as a quantum-resistant security layer for existing blockchains during their transition away from elliptic-curve cryptography, rather than as a replacement chain. The NAORIS token powers the network for securing transactions, enforcing rules, and maintaining trust. The project reports a large security-node network at launch and pre-launch testing figures (over 100 million transactions validated and over 600 million security threats reportedly detected and blocked).

**Current state.** The security-layer value proposition and cross-ecosystem integration model are novel and, with a mainnet launched April 2026, remain unproven at scale. The project's launch was timed to [March 2026 research](https://www.coindesk.com/markets/2026/04/03/naoris-protocol-s-quantum-resistance-blockchain-goes-live-as-bitcoin-and-ethereum-face-q-day-threats/) estimating that breaking Bitcoin's EC cryptography would require fewer than 500,000 qubits.

**Planned future work.** Anticipated work includes expanding the validator set from invite-only toward permissionless, broadening integrations with additional blockchain ecosystems, and building a production track record. No firm timelines have been published.

## 6. EC Sunset

**Grade: ➖ Not Applicable**

Naoris Protocol's own protocol contains no elliptic-curve cryptography, so there is nothing to retire. **ML-DSA** (Dilithium-5) secures all signatures from genesis — transaction signing and consensus alike — and the protocol blocks classical key usage once an account adopts post-quantum keys. Because there was never an EC component in the protocol, an EC sunset does not apply.

This is distinct from any elliptic-curve cryptography on the separate chains that Naoris is designed to secure as an overlay: Naoris has no authority over those chains' own EC retirement timelines, and that is a property of those chains, not of Naoris's protocol.

---

_Generated on 24 Jun 2026 based on information as of 30 Apr 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
