# XRP Ledger (XRP) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | XRP Ledger |
| **Ticker** | XRP |
| **Website** | https://xrpl.org |
| **GitHub** | https://github.com/XRPLF |
| **Twitter / X** | https://x.com/ripplexdev |
| **On-chain environment** | XRPL native transactions; Hooks (WebAssembly) under development |
| **Mainnet genesis** | 2012-01-01 |
| **Current mainnet version** | rippled v3.1.3 (released 2026-05-08) |

> The XRP Ledger is an independent, decentralized, open-source blockchain. Ripple Labs is a significant contributor and ecosystem participant but does not own or control the network ([FAQ](https://xrpl.org/about/faq#is-xrpl-a-private-blockchain-owned-by-ripple)).

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | B | 🔧 | In Development |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

> **Testnet activity**: AlphaNet, a research prototype launched in December 2025, runs **ML-DSA** (Dilithium) as the sole signature scheme across transactions, accounts, and consensus — with elliptic-curve signatures fully removed. AlphaNet is a hard fork of rippled, not a staging environment for mainnet; its progress does not directly imply mainnet deployment.

The XRP Ledger has one of the more visible post-quantum research efforts among major blockchains. Ripple published a [4-phase PQC migration roadmap](https://ripple.com/insights/post-quantum-readiness-on-the-xrp-ledger/) in April 2026, targeting full transition by 2028, and has partnered with Project Eleven for validator testing. The AlphaNet testnet demonstrated end-to-end quantum-resistant operations as early as December 2025, covering transaction signatures, account keys, and consensus voting using **ML-DSA**.

However, none of this work has reached mainnet yet. The mainnet codebase has not merged any PQC libraries — the primary integration PR ([rippled#5131](https://github.com/XRPLF/rippled/pull/5131)) has been stalled with merge conflicts since September 2024. A separate [PQC readiness test suite](https://github.com/XRPLF/rippled/pull/6971) (April 2026) verifies that rippled correctly handles oversized PQC key and signature inputs, which is groundwork for eventual integration. Mainnet protocol changes require amendment voting, where 80% of default UNL validators must signal support for two consecutive weeks before activation.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA** (Dilithium) | ECDSA secp256k1, Ed25519 | Tx Signatures | In Development |
| **ML-DSA** (Dilithium) | ECDSA secp256k1, Ed25519 | Consensus | In Development |

## Transaction Signatures

**Grade: B 🔧**

The XRP Ledger currently supports two elliptic-curve signature schemes for transaction signing: ECDSA with secp256k1 (the default) and Ed25519. Both are used for master account keys, regular (delegated) keys, payment channel claims, and signer list entries. Both are vulnerable to quantum computers via Shor's algorithm.

**Current state.** Mainnet transactions are signed exclusively with [ECDSA or Ed25519](https://xrpl.org/docs/concepts/accounts/cryptographic-keys). No post-quantum signature scheme is available on mainnet today. The primary mainnet integration PR ([rippled#5131](https://github.com/XRPLF/rippled/pull/5131)) has been stalled with merge conflicts since September 2024.

**Planned future work.** On AlphaNet (December 2025), accounts can use **ML-DSA** (Dilithium) signatures — carrying approximately 2,420-byte signatures compared to 64 bytes for ECDSA. Ripple's [4-phase PQC roadmap](https://ripple.com/insights/post-quantum-readiness-on-the-xrp-ledger/) (April 2026) targets Phase 2 (assessment and testing under real XRPL workloads) in 1H 2026, Phase 3 (controlled integration with dual-scheme support) in 2H 2026, and Phase 4 (full transition) by 2028. The [quantum-resistant signatures discussion](https://github.com/XRPLF/XRPL-Standards/discussions/295) on the XRPL Standards repository tracks community input on algorithm selection and deployment strategy.

## Consensus

**Grade: B 🔧**

The XRP Ledger uses the Ripple Protocol Consensus Algorithm (RPCA), a federated Byzantine agreement protocol where validators sign proposals using ECDSA or Ed25519 ephemeral keys each ledger round. Consensus requires approximately 80% supermajority agreement among validators on each node's Unique Node List (UNL). Ledgers close every 3–5 seconds.

**Current state.** Mainnet consensus signing uses [ECDSA secp256k1 or Ed25519](https://xrpl.org/docs/concepts/consensus-protocol). A quantum attacker who could forge validator signatures could impersonate UNL members and disrupt consensus.

**Planned future work.** AlphaNet (December 2025) demonstrated full **ML-DSA** (Dilithium)-based [consensus signing](https://coinedition.com/xrp-ledger-alphanet-tests-quantum-resistant-security-upgrade/), with validator communications and vote signing migrated end-to-end. Mainnet consensus migration would require all validators to upgrade simultaneously and is not yet scheduled. Ripple's 4-phase roadmap covers consensus under the same Phase 3–4 timeline as transaction signatures (controlled integration in 2H 2026, full transition by 2028).

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for the XRP Ledger in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

The XRP Ledger's [peer protocol](https://xrpl.org/docs/concepts/networks-and-servers/peer-protocol) uses HTTPS connection upgrade to the XRPL/2.0 protocol on IANA port 2459. Node identity is derived from ECDSA secp256k1 public keys. All peer-to-peer communication is encrypted via TLS/HTTPS. AlphaNet testing focused on consensus and transaction signatures and did not address peer protocol upgrades.

## On-Chain Logic

**Grade: ➖**

The XRP Ledger's on-chain environment does not expose signature-verification primitives to application-layer code. [Hooks](https://hooks.xrpl.org/) (XLS-22, under development) are bounded WebAssembly modules that gate transaction logic but cannot call external cryptographic operations. The native [AMM](https://xrpl.org/blog/2024/deep-dive-into-amm-integration) (XLS-30, live on mainnet) and other built-in transaction types inherit their signature verification from the transaction-signing layer. [Escrow conditions](https://xrpl.org/docs/concepts/payment-types/escrow) are time-based or SHA-256 hash-preimage-based, not signature-based.

Because no on-chain signature-verification API is exposed to developers, this category is not applicable.

## Other Features

**Grade: F ❌**

The XRP Ledger has several features that rely on elliptic-curve cryptography beyond transaction signatures and consensus.

### Payment Channels

**Current state.** [Payment channels](https://xrpl.org/docs/concepts/payment-types/payment-channels) use signed claim objects (ECDSA or Ed25519) to authorize fund release. Claim signatures are verified on-ledger, making them quantum-vulnerable.

**Planned future work.** No dedicated migration plan exists for payment channel signatures. They would inherit from the mainnet transaction signature upgrade if and when it activates.

### Cross-Chain Bridges and Interledger Protocol

**Current state.** Bridge consensus and ILP atomic swaps rely on ECDSA/Ed25519 transaction signatures for bridge validator coordination. ILP escrow conditions themselves use hash-preimage and timelock constructions (quantum-safe), but bridge validator identity is EC-dependent.

**Planned future work.** No dedicated migration plan exists. Bridge validator credentials would depend on the same mainnet consensus upgrade timeline.

## EC Sunset

**Grade: F ❌**

No mainnet EC retirement date has been announced. Ripple has committed to maintaining ECDSA and Ed25519 support indefinitely, and the current design philosophy favors gradual upgrade paths. AlphaNet (December 2025) fully removed EC signatures — **ML-DSA** is the only scheme on that network — but AlphaNet is a research hard fork, separate from mainnet.

The proposed mainnet migration path envisions parallel operation (new accounts created with quantum key types while existing EC accounts continue to work), followed by a migration window with possible incentives, and eventual full transition dependent on amendment governance and ecosystem readiness. The 38x signature size increase (2,420 bytes vs. 64 bytes) creates practical pressure to retain EC signatures for lightweight clients and high-throughput use cases.

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus 🔧, P2P ❌, On-Chain ➖, Other ❌.

A [quantum exposure analysis](https://www.coindesk.com/tech/2026/04/10/xrp-may-be-less-exposed-to-quantum-threats-than-bitcoin-experts-say) published in April 2026 by an XRPL validator found that approximately 300,000 accounts holding 2.4 billion XRP have never exposed their public keys via outgoing transactions, making them structurally quantum-safe. Only about 0.03% of total XRP supply was identified as meaningfully at risk from public-key exposure. The XRP Ledger's account model — which allows key rotation without changing the account address — provides structural mitigation compared to chains where the account address directly encodes the public key.

## Governance

The XRP Ledger's protocol changes are governed through an **amendment voting** process. Features are implemented in rippled with a disabled amendment hash, shipped in a release, and activated permanently when at least 80% of validators on the default UNL signal support for two consecutive weeks (~20,160 ledgers). Amendments cannot be deactivated once activated.

Active PQC-related governance threads and proposals:

- **[XRPLF/XRPL-Standards Discussion #295](https://github.com/XRPLF/XRPL-Standards/discussions/295)**: Quantum-Resistant Signatures discussion thread on the XRPL Standards repository. Community discussion on algorithm selection and integration approach.
- **[XRPLF/XRPL-Standards Discussion #79](https://github.com/XRPLF/XRPL-Standards/discussions/79)**: Next-Generation Cryptography discussion.
- **[XRPLF/rippled#5131](https://github.com/XRPLF/rippled/pull/5131)**: Draft PR updating the Dilithium submodule for mainnet integration. Opened September 2024; currently stalled with merge conflicts.
- **[XRPLF/rippled#6971](https://github.com/XRPLF/rippled/pull/6971)**: PQC readiness test suite (10 test cases, 51 assertions). Opened April 2026. Defensive hardening verifying that rippled correctly rejects oversized PQC key and signature sizes.
- **Ripple's 4-phase PQC roadmap**: [Published April 21, 2026](https://ripple.com/insights/post-quantum-readiness-on-the-xrp-ledger/) via Ripple Insights. Targets full transition by 2028 with a Project Eleven validator testing partnership. No amendment proposals have been submitted for mainnet PQC activation as of June 2026.

The amendment dashboard at [xrpscan.com/amendments](https://xrpscan.com/amendments) tracks live voting status for all amendments. The [canonical amendment registry](https://xrpl.org/docs/concepts/networks-and-servers/amendments) on xrpl.org lists all amendments with their hashes and activation dates.

---

_Generated on 04 Jun 2026 based on information as of 04 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
