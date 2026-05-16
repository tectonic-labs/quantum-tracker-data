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
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

USDC is a centrally-issued, fiat-backed stablecoin run by Circle. It is natively issued on more
than sixteen chains — Circle deploys an independent USDC contract on each chain rather than
wrapping one canonical token. Because of that design, USDC's quantum exposure is the sum of two
things: what Circle controls directly (the per-chain admin keys and the cross-chain transfer
infrastructure) and what every USDC deployment inherits from the chain it sits on. A token cannot
be more quantum-safe than the chain it executes on — host-chain inheritance is the ceiling, and
right now every evaluated USDC host has at least one quantum-vulnerable surface, so the ceiling is
already at the floor.

On the surfaces Circle does control, the picture is also flat. Each USDC deployment is an
upgradeable proxy governed by Circle-held multisigs that sign with elliptic-curve keys, and the
Cross-Chain Transfer Protocol (CCTP) hinges on a single Circle attestation key that is likewise
elliptic-curve. We located no Circle statement, regulatory filing, or vendor proof-of-concept that
proposes post-quantum cryptography for any of these surfaces, and no published plan to retire
elliptic-curve cryptography from them. Circle's public crypto posture is described in operational
terms — production-grade hardware security modules with key rotation — and is silent on
post-quantum migration.

## Proposed and Implemented PQC Algorithms

USDC does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

USDC is natively issued on 16-plus chains, and Circle deploys a separate USDC contract on each one
instead of wrapping a single token. That means USDC's transaction signing, consensus, and
networking exposure are not the token's own — they belong to whichever host chain a given USDC
balance lives on. The token cannot be more quantum-safe than the chain it executes on, so this
inherited rating is the ceiling for everything else in this report.

**Current state.** Every evaluated host chain — Ethereum, Solana, TRON, BNB Chain, Avalanche,
Algorand, Stellar, Hedera, Sui, and NEAR — has at least one quantum-vulnerable surface among the
core protocol categories. The exposure is uniform across all of them: there is no outlier and no
host that stands clear of the floor, so the aggregate is rated at the worst level with no
distribution qualifier needed. Where a host has its own public PQC readiness report, the substance
of that chain's exposure is documented there:
[Ethereum](../chains/l1/ethereum.md),
[Solana](../chains/l1/solana.md),
[TRON](../chains/l1/tron.md),
[BNB Chain](../chains/l1/bnb-chain.md),
[Algorand](../chains/l1/algorand.md),
[Hedera](../chains/l1/hedera.md),
[Sui](../chains/l1/sui.md),
[NEAR Protocol](../chains/l1/near-protocol.md), and
[Flow](../chains/l1/flow.md). USDC is also issued on Avalanche and Stellar, and on the
Ethereum-settled networks Polygon PoS, Base, Arbitrum, and Optimism, which inherit Ethereum's
settlement-layer signing posture. Circle lists its full set of supported chains on its
[USDC overview](https://www.circle.com/usdc) and its
[canonical per-chain contract list](https://developers.circle.com/stablecoins/usdc-contract-addresses).

**Planned future work.** Any host-chain migration toward post-quantum cryptography is the work of
each individual host chain, not of Circle, and is tracked on those chains' own reports.

## 2. Admin / Privileged Roles

**Grade: F ❌**

Each USDC deployment is an upgradeable proxy contract controlled by Circle. The privileged-role
surface is essentially identical on every host: a `masterMinter` that authorises minter accounts
and their allowances, the minter accounts themselves (which mint USDC up to their allowance and
include the CCTP transfer contracts), a `blacklister` that can blacklist addresses for compliance,
a `pauser` that can halt all transfers, and a proxy admin that can upgrade the implementation
contract. The role model is visible in Circle's
[FiatToken source repository](https://github.com/centrehq/centre-tokens), and the live Ethereum
deployment can be inspected on its
[Etherscan contract page](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48).

**Current state.** All of these Circle-held privileged accounts are multisigs that sign with
elliptic-curve keys — secp256k1 ECDSA on the EVM hosts, and the host's native elliptic-curve
scheme (such as Ed25519 on Solana, Algorand, Stellar, and Sui) on the non-EVM hosts. We found no
Circle statement, regulatory filing, or vendor proof-of-concept proposing a post-quantum scheme
for the `masterMinter`, minter accounts, `blacklister`, `pauser`, or proxy admin keys. Circle's
[transparency page](https://www.circle.com/transparency) describes its operational key handling
but does not address post-quantum migration. No concrete post-quantum proposal currently exists
for this surface.

## 3. Cross-Chain Mechanism

**Grade: F ❌**

USDC moves between chains through CCTP, the Circle-operated
[Cross-Chain Transfer Protocol](https://www.circle.com/cross-chain-transfer-protocol). CCTP is a
burn-and-mint system: a user burns USDC on the source chain, Circle's off-chain attestation
service observes the burn and signs an attestation, and that signed attestation is submitted on
the destination chain to mint fresh USDC. The mechanism is structurally simpler than a
wrapped-token bridge, but it has a single cryptographic linchpin — the attestation signature. The
flow is documented in Circle's [CCTP developer documentation](https://developers.circle.com/cctp)
and the [CCTP EVM contract source](https://github.com/circlefin/evm-cctp-contracts).

**Current state.** The attestation is signed with an elliptic-curve (ECDSA secp256k1) key, and the
destination-chain contract verifies that signature against a registered Circle attester address
before minting. A quantum attacker able to derive that key could mint unbacked USDC on any
CCTP-connected chain. Circle, as a centralised operator, could rotate that key without
protocol-wide coordination — but every CCTP message-verification contract on every chain would
also need to be upgraded to verify a post-quantum signature, and no such migration is on Circle's
published roadmap.
[CCTP V2](https://www.circle.com/blog/cctp-v2-the-future-of-cross-chain), launched in March 2025,
adds faster transfers and post-transfer automation but does not change the underlying signature
scheme — the attestation remains ECDSA secp256k1. USDC that moves over third-party bridges outside
CCTP carries those bridges' own quantum exposure. No concrete post-quantum proposal currently
exists for the CCTP attestation surface.

## 4. Reserve / Custody

**Grade: ➖**

USDC is backed 1:1 by cash and short-duration US Treasuries held by the Circle Reserve Fund (a
BlackRock-managed, SEC-registered government money market fund) and by bank deposits at BNY Mellon
and other regulated counterparties, with monthly proof-of-reserve attestations. However, there is
no separate cryptographic signature pushed on-chain from the custody side: the custody-to-chain
mint linkage *is* the Circle `masterMinter` and minter-account key chain, which is already rated
under Admin / Privileged Roles. With no distinct custody-to-chain cryptographic surface to score,
this category does not apply. The proof-of-reserve audit attestations are off-chain and do not gate
on-chain mint behaviour.

## 5. Other Token-Specific Crypto

**Grade: ➖**

USDC is a standard fiat-backed ERC-20 (and its equivalent on non-EVM hosts) with EIP-2612 `permit`
support for gasless approvals. It embeds no zero-knowledge verifier, no oracle-gated mint logic, no
verifiable random function, and no on-chain real-world-asset mapping. Circle's Mint API is an
off-chain banking integration rather than on-chain cryptography. With no token-specific
cryptographic component beyond the categories already rated, this category does not apply.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to *retire* elliptic-curve cryptography on
the token's own surfaces, which is distinct from whether the token is adopting post-quantum
cryptography.

**Current state.** We located no Circle-attributable plan to retire elliptic-curve cryptography
from the CCTP attestation key, the per-chain `masterMinter`, minter, `blacklister`, `pauser`, and
proxy admin multisigs, or the custody-to-chain signing path. Circle's published roadmaps — covering
CCTP V2, Circle Mint, Programmable Wallets, and Circle Layer — name no elliptic-curve sunset
milestone, algorithm choice, or schedule, and we found no post-quantum or elliptic-curve-retirement
posts on the [Circle blog](https://www.circle.com/blog) or in the
[Circle developer hub](https://developers.circle.com).

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption
ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ➖.

## Issuer & Governance

Circle Internet Financial Inc. is a private, US-regulated company holding a NYDFS BitLicense, money
transmitter licenses across US states, and MiCA authorisation in the EU. USDC governance is not
on-chain: contract upgrades, mint authority, and CCTP attestation infrastructure are decisions made
by Circle management and executed through the Circle-controlled multisig signers. The Centre
Consortium, which formerly co-governed USDC, was wound down in 2023, leaving Circle as the sole
issuer; Coinbase retains a commercial reserve-yield revenue-sharing arrangement but no governance
role.

Because governance is off-chain and corporate, any post-quantum migration of the CCTP attestation
key, the mint keys, or the proxy admin keys would be a Circle corporate decision, executed through
key rotation on its custody infrastructure plus a contract upgrade on every chain USDC is deployed
on. Where Circle's product and crypto commitments are disclosed, they surface on the
[Circle blog](https://www.circle.com/blog), the [Circle developer hub](https://developers.circle.com),
the [transparency page](https://www.circle.com/transparency), and US regulatory filings such as its
[S-1](https://www.sec.gov/Archives/edgar/data/1876042/000119312524071758/d709499ds1.htm). As of
this report, no post-quantum commitment has been made public through any of those channels.

---

_Generated on 16 May 2026 based on information as of 15 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
