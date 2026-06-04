# USDC (USDC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | USDC |
| **Ticker** | USDC |
| **Asset class** | Stablecoin |
| **Issuer** | Circle Internet Financial Inc. |
| **Host chain(s)** | Ethereum (canonical), Solana, Avalanche, Algorand, Stellar, Flow, Hedera, TRON, Polygon PoS, Base, Arbitrum, Optimism, Noble (Cosmos), Sui, Near, and others |
| **Website** | https://www.circle.com/usdc |
| **GitHub** | https://github.com/circlefin |
| **Contract address** | `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (Ethereum) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | D | ⚠️ | Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | C | 🗺️ | Roadmapped |

USDC is a centrally-issued, fiat-backed stablecoin run by Circle. It is natively deployed on more than sixteen chains — Circle issues an independent USDC contract on each chain rather than wrapping a single canonical token. That design means USDC's quantum exposure has two components: what Circle controls directly (per-chain admin keys and the cross-chain transfer infrastructure), and what every deployment inherits from the chain it sits on. A token cannot be more quantum-safe than the chain it executes on — host-chain inheritance is the ceiling, and every evaluated USDC host currently has at least one quantum-vulnerable surface.

Circle published a [Post-Quantum Security Roadmap paper](https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/PDFs/quantum_paper.pdf) in 2026 (co-authored with Dan Boneh of Stanford) that explicitly names USDC in its EC retirement commitment: "Arc and USDC smart contracts will reject transactions signed with ECDSA." That commitment, and the engineering path described to get there (including an ECRecoverOverride mechanism on Arc), moves EC Sunset from no plan to a published roadmap. The surfaces Circle has not yet addressed — per-chain admin multisigs on all other host chains and the CCTP attestation key — remain at the floor.

## Proposed and Implemented PQC Algorithms

USDC does not currently propose or implement any post-quantum cryptographic algorithms on its own surfaces. The EC retirement commitment in Circle's roadmap paper names a mechanism (ECRecoverOverride) and a target (USDC on Arc) but does not yet specify a post-quantum signing algorithm for USDC contract administration or CCTP attestation.

## 1. Host Chain Aggregate

**Grade: F ❌**

USDC is natively issued on sixteen-plus chains. Circle deploys a separate contract on each one rather than wrapping a single token, which means the token's transaction signing, consensus, and networking exposure are those of each individual host chain — the token inherits them, it does not own them. The token cannot be more quantum-safe than the chain it executes on, so the worst host-chain exposure sets the ceiling for this category.

**Current state.** Every evaluated host chain has at least one quantum-vulnerable surface among the core protocol categories. The exposure is uniform — there is no outlier that stands clear of the floor — so the aggregate sits at the worst level with no distribution qualifier needed. Where a host has its own public PQC report, the substance of that chain's exposure is documented there: [Ethereum](../chains/l1/ethereum.md), [Solana](../chains/l1/solana.md), [TRON](../chains/l1/tron.md), [BNB Chain](../chains/l1/bnb-chain.md), [Algorand](../chains/l1/algorand.md), [Hedera](../chains/l1/hedera.md), [Sui](../chains/l1/sui.md), [NEAR Protocol](../chains/l1/near-protocol.md), and [Flow](../chains/l1/flow.md). USDC is also issued on Avalanche and Stellar, and on the Ethereum-settled networks Polygon PoS, Base, Arbitrum, and Optimism, which inherit Ethereum's settlement-layer posture. Circle's full list of supported chains and canonical contract addresses is on the [USDC overview](https://www.circle.com/usdc) and the [per-chain contract list](https://developers.circle.com/stablecoins/usdc-contract-addresses).

**Planned future work.** Any host-chain migration toward post-quantum cryptography is the work of each individual host, tracked on those chains' own reports.

## 2. Admin / Privileged Roles

**Grade: F ❌**

Each USDC deployment is an upgradeable proxy contract. The privileged-role surface is essentially identical on every host: a `masterMinter` that authorises minter accounts and their allowances; the minter accounts themselves (which mint USDC up to their allowance and include the CCTP transfer contracts); a `blacklister` for compliance; a `pauser` that can halt all transfers; and a proxy admin that can upgrade the implementation contract. The role model is visible in Circle's [FiatToken source repository](https://github.com/centrehq/centre-tokens), and the live Ethereum deployment can be inspected on its [Etherscan page](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48).

**Current state.** All Circle-held privileged accounts are multisigs that sign with elliptic-curve keys — secp256k1 ECDSA on EVM hosts, and the host's native elliptic-curve scheme (such as Ed25519 on Solana, Algorand, Stellar, and Sui) on non-EVM hosts. Circle's [transparency page](https://www.circle.com/transparency) describes its operational key handling but does not address post-quantum migration. We found no Circle statement, regulatory filing, or vendor proof-of-concept proposing a post-quantum scheme for any of these privileged-role keys.

## 3. Cross-Chain Mechanism

**Grade: D ⚠️**

USDC moves between chains through CCTP, the Circle-operated [Cross-Chain Transfer Protocol](https://www.circle.com/cross-chain-transfer-protocol). CCTP is a burn-and-mint system: a user burns USDC on the source chain, Circle's off-chain attestation service observes the burn and signs an attestation, and that signed attestation is submitted on the destination chain to mint fresh USDC. The mechanism is documented in Circle's [CCTP developer documentation](https://developers.circle.com/cctp) and the [CCTP EVM contract source](https://github.com/circlefin/evm-cctp-contracts).

The cryptographic linchpin is the attestation signature — a single Circle ECDSA secp256k1 key. A quantum attacker able to derive that key could mint unbacked USDC on any CCTP-connected chain. [CCTP V2](https://www.circle.com/blog/cctp-v2-the-future-of-cross-chain), launched in March 2025, adds faster transfers and post-transfer automation but does not change the underlying signature scheme.

Circle's [Post-Quantum Security Roadmap paper](https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/PDFs/quantum_paper.pdf) is the first Circle-attributable source to explicitly identify CCTP as a quantum-risk surface and link it to the USDC migration path. The paper's Switch phase commits to USDC smart contracts rejecting ECDSA-signed transactions, implying the CCTP attestation verification path is in scope for migration. No concrete algorithm or specification for a post-quantum CCTP attestation mechanism has been published.

**Current state.** The CCTP attestation key is ECDSA secp256k1. Circle has acknowledged the quantum risk publicly in the context of USDC migration but has not published a concrete post-quantum CCTP proposal.

**Planned future work.** Circle's roadmap paper identifies CCTP migration as part of the USDC PQ transition. The paper does not specify an algorithm or timeline for a post-quantum attestation scheme. Every CCTP message-verification contract on every chain would also need to be upgraded to verify a post-quantum signature when the time comes.

## 4. Reserve / Custody

**Grade: ➖**

USDC is backed 1:1 by cash and short-duration US Treasuries held by the Circle Reserve Fund (a BlackRock-managed, SEC-registered government money market fund) and by bank deposits at BNY Mellon and other regulated counterparties, with monthly proof-of-reserve attestations. There is no separate cryptographic signature pushed on-chain from the custody side: the custody-to-chain mint linkage is the Circle `masterMinter` and minter-account key chain, which is already rated under Admin / Privileged Roles. With no distinct custody-to-chain cryptographic surface to score, this category does not apply. The proof-of-reserve audit attestations are off-chain and do not gate on-chain mint behaviour.

## 5. Other Token-Specific Crypto

**Grade: ➖**

USDC is a standard fiat-backed ERC-20 (and its equivalent on non-EVM hosts) with EIP-2612 `permit` support for gasless approvals. It embeds no zero-knowledge verifier, no oracle-gated mint logic, no verifiable random function, and no on-chain real-world-asset mapping. Circle's Mint API is an off-chain banking integration rather than on-chain cryptography. With no token-specific cryptographic component beyond the categories already rated, this category does not apply.

## 6. EC Sunset

**Grade: C 🗺️**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ⚠️, Reserve & Custody ➖, Other ➖.

Circle's [Post-Quantum Security Roadmap paper](https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/PDFs/quantum_paper.pdf) contains the first published EC retirement commitment that directly names USDC: "Arc and USDC smart contracts will reject transactions signed with ECDSA." The paper describes a Transition phase in which an ECRecoverOverride contract is deployed via hard fork to support both ECDSA and post-quantum schemes at the `ecrecover` precompile address, followed by a Switch phase in which `ecrecover` transitions to post-quantum-only mode. This commitment covers USDC on Arc. USDC deployments on other host chains are not explicitly addressed in the paper's EC retirement scope.

The remaining elliptic-curve surfaces — per-chain `masterMinter`, minter, `blacklister`, `pauser`, and proxy admin multisigs across all 16+ host chains, and the CCTP attestation key — are not covered by a published EC retirement commitment.

**Current state.** ECDSA is the default signing scheme for USDC admin operations and CCTP attestation on all host chains. No EC retirement has occurred on any surface.

**Planned future work.** Circle's roadmap describes a phased path: an ECRecoverOverride mechanism in the Transition phase (supporting both ECDSA and post-quantum signing on Arc), followed by ECDSA rejection in the Switch phase. No algorithm, schedule, or equivalent commitment for USDC on Ethereum or other non-Arc host chains has been published.

## Issuer & Governance

Circle Internet Financial Inc. is a private, US-regulated company holding a NYDFS BitLicense, money transmitter licenses across US states, and MiCA authorisation in the EU. USDC governance is not on-chain: contract upgrades, mint authority, and CCTP attestation infrastructure are decisions made by Circle management and executed through Circle-controlled multisig signers. The Centre Consortium, which formerly co-governed USDC alongside Coinbase, was wound down in 2023, leaving Circle as the sole issuer. Coinbase retains a commercial reserve-yield revenue-sharing arrangement but no governance role.

Because governance is off-chain and corporate, any post-quantum migration of the CCTP attestation key, the mint keys, or the proxy admin keys would be a Circle corporate decision, executed through key rotation on its custody infrastructure plus a contract upgrade on every chain USDC is deployed on. Where Circle's product and cryptographic commitments are disclosed, they surface on the [Circle blog](https://www.circle.com/blog), the [Circle developer hub](https://developers.circle.com), the [transparency page](https://www.circle.com/transparency), and the [Post-Quantum Security Roadmap paper](https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/PDFs/quantum_paper.pdf).

---

_Generated on 01 Jun 2026 based on information as of 01 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
