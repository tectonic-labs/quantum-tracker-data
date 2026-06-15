# Zcash (ZEC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Zcash |
| **Ticker** | ZEC |
| **Website** | https://z.cash |
| **GitHub** | https://github.com/zcash/zcash |
| **Twitter / X** | https://x.com/zcash |
| **Derived from** | Bitcoin (inspired, not a direct fork) |
| **On-chain environment** | Bitcoin Script (variant) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | ➖ | ➖ | Not Applicable |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | B | 🔧 | In Development |
| EC Sunset | C | 🗺️ | Roadmapped |

Zcash is a privacy-focused cryptocurrency using [Equihash](https://profincognito.me/blog/privacy/zcash-protocol/) Proof-of-Work (hash-based, quantum-safe) for consensus, with shielded transactions powered by [Groth16 SNARKs](https://zips.z.cash/zip-0224) (Sapling pool, BN254 pairings) and [Halo 2](https://kudelskisecurity.com/research/on-the-security-of-halo2-proof-system/) (Orchard pool, Pallas/Vesta curves). Both proof systems are EC-based and quantum-vulnerable. Because shielded transaction proofs are stored on-chain, a quantum break would [retroactively deanonymize the entire historical shielded ledger](https://www.quantumcanary.org/insights/zcash-quantum-challenges-could-be-looming).

Zcash has the most active PQC specification effort of any chain in this survey. The NU7 network upgrade has 7 open ZIPs focused on "quantum recoverability" — allowing users to recover funds if EC breaks. At Consensus Miami (May 8, 2026), ZODL CEO Josh Swihart [announced](https://www.coindesk.com/tech/2026/05/08/zcash-to-roll-out-quantum-recoverable-wallets-within-a-month-go-quantum-proof-by-2027) that Zcash will ship quantum-recoverable wallets within one month (June 2026) and reach [full post-quantum status within 12 to 18 months](https://decrypt.co/367250/zcash-targeting-post-quantum-crypto-milestone-by-2027) (mid-2027 to late-2027). This is the second-fastest stated PQ-completion timeline among non-PQ-native chains.

Zcash does not currently propose or implement any post-quantum cryptographic algorithms. The NU7 "quantum recoverability" effort is a mitigation strategy (fund recovery if EC breaks) rather than a full cryptographic migration.

## 1. Transaction Signatures

**Grade: F ❌**

Zcash supports two transaction types. Transparent addresses (t-addr) use secp256k1 ECDSA, identical to Bitcoin. Shielded addresses (z-addr) use EdDSA (ed25519) for spend authorization in both Sapling and Orchard pools. Both are EC-based and vulnerable to Shor's algorithm. No post-quantum signature scheme has been proposed for either transaction type.

**Current state.** All transaction signing is EC-based (secp256k1 for transparent, ed25519 for shielded).

**Planned future work.** The full PQ roadmap (12-18 months) may eventually address transaction signatures, but no specific proposal has been published for this category.

## 2. Consensus

Not rated — hash-based proof-of-work is quantum-resistant since genesis. This tracker covers PQC migrations.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Zcash in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

Zcash's on-chain proof verification uses [Groth16 SNARKs](https://zips.z.cash/zip-0224) (Sapling pool, BN254 pairings) and [Halo 2](https://kudelskisecurity.com/research/on-the-security-of-halo2-proof-system/) (Orchard pool, Pallas/Vesta curves). Both rely on elliptic-curve hardness assumptions and are vulnerable to Shor's algorithm. No post-quantum proof system is available on-chain.

**Current state.** All on-chain proof verification uses EC-based SNARKs. No PQC verification capability exists.

**Planned future work.** Hash-based STARKs are a potential future replacement for Halo 2, but no concrete proposal or timeline has been published.

## 5. Other Features

**Grade: B 🔧**

**Current state.** Zcash's defining feature is its shielded pools, which use zero-knowledge proofs to hide sender, recipient, and amount. The Sapling pool uses [Groth16 SNARKs over BN254 pairings](https://zips.z.cash/zip-0224); the Orchard pool uses [Halo 2](https://zips.z.cash/zip-0224) over the Pallas/Vesta curve cycle. Both proof systems are elliptic-curve-based. A quantum break of the underlying curve would let an attacker forge proofs and, more critically, retroactively decrypt the historical shielded ledger — recovering amounts, memo fields, and the sender/recipient relationships that the shielded design was built to protect. Past privacy is not preserved by any future migration; transactions made today carry forward the post-quantum risk.

Zcash's core privacy feature stores zero-knowledge proofs of shielded transactions on-chain. [Sapling](https://zips.z.cash/zip-0224) uses Groth16 SNARKs on BN254 pairings (with a trusted setup). [Orchard](https://kudelskisecurity.com/research/on-the-security-of-halo2-proof-system/) uses Halo 2 on Pallas/Vesta curves (transparent setup). Both are EC-based.

A quantum adversary could retroactively recover private input values from historical proofs, [deanonymizing the entire shielded ledger](https://www.quantumcanary.org/insights/zcash-quantum-challenges-could-be-looming). This "harvest now, decrypt later" threat is unique to privacy chains: transparent-transaction chains only expose future transactions or already-revealed public keys, while Zcash's stored ciphertexts and proofs expose the complete historical record.

**Current state.** Both Groth16 and Halo 2 are EC-based. The NU7 network upgrade has 7 open ZIPs focused on "quantum recoverability" — a mitigation strategy that enables fund recovery if EC breaks, rather than replacing the underlying proof system. ZIP 2005 defines the quantum recoverability deployment plan, and ZIP 248 introduces a forward-compatible, extensible transaction format.

**Planned future work.** [Quantum-recoverable wallets within one month](https://www.coindesk.com/tech/2026/05/08/zcash-to-roll-out-quantum-recoverable-wallets-within-a-month-go-quantum-proof-by-2027) (June 2026). [Full post-quantum status within 12 to 18 months](https://crypto-economy.com/zcash-sets-one-month-timeline-for-quantum-recoverable-wallets-full-pq-upgrade-in-12-18-months/) (mid-2027 to late-2027). The longer-term vision includes replacing Halo 2 with hash-based STARKs to eliminate EC dependencies entirely, but no timeline has been published for the proof-system migration.

## 6. EC Sunset

**Grade: C 🗺️**

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ➖, P2P ❌, On-Chain ❌, Other 🔧.

Zcash's NU7 network upgrade is the most explicitly quantum-focused specification effort of any chain in this survey. ZIP 248 introduces a forward-compatible transaction format designed to accommodate future post-quantum signature schemes. ZIP 2005 defines the quantum recoverability deployment plan. The [announced commitment to full post-quantum status within 12 to 18 months](https://decrypt.co/367250/zcash-targeting-post-quantum-crypto-milestone-by-2027) represents a concrete timeline — the second-fastest among non-PQ-native chains.

Existing shielded transactions would remain EC-based even after a migration, meaning the retroactive deanonymization risk for historical transactions persists regardless of future upgrades. The quantum recoverability work addresses fund safety (users can recover assets) but not historical privacy.

**Current state.** NU7 specification work is active with 7 open ZIPs. No node code changes deployed yet.

**Planned future work.** Quantum-recoverable wallets targeted for June 2026. Full PQ within 12-18 months. STARK migration for shielded proofs remains a longer-horizon goal without a published timeline.

## Governance

Zcash governance involves the Zcash Open Development Lab (ZODL, formerly Electric Coin Company), the Zcash Foundation, and community forums.

PQC-related governance activity:

- **NU7 Network Upgrade** — 7 open ZIPs focused on quantum recoverability:
  - **ZIP 2005** — Quantum Recoverability deployment plan. Status: Open.
  - **ZIP 248** — Forward-compatible, extensible transaction format. Status: Open (waiting on review).
  - **ZIP 307** — Light client protocol update for NU7.
  - **ZIP 312** — Key generation and randomizer handling (labeled Post-quantum).
  - Additional ZIPs for Orchard Proof-of-Balance and Private Information Retrieval for Nullifier Exclusion Proofs.
- **Consensus Miami announcement** (May 8, 2026) — Josh Swihart (ZODL CEO) committed to quantum-recoverable wallets within one month and full PQ within 12-18 months. Sources: [CoinDesk](https://www.coindesk.com/tech/2026/05/08/zcash-to-roll-out-quantum-recoverable-wallets-within-a-month-go-quantum-proof-by-2027), [Decrypt](https://decrypt.co/367250/zcash-targeting-post-quantum-crypto-milestone-by-2027).

---

_Generated on 03 Jun 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
