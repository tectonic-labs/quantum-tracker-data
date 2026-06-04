# WEMIX3.0 (WEMIX) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | WEMIX3.0 |
| **Ticker** | WEMIX |
| **Website** | <https://www.wemix.com> |
| **GitHub** | <https://github.com/wemixarchive> |
| **On-chain environment** | EVM (go-ethereum fork; client `gwemix`) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

WEMIX3.0 is a gaming-focused EVM Layer 1 maintained as a [go-ethereum fork](https://github.com/wemixarchive/go-wemix) (the client is renamed from `geth` to `gwemix`). It runs a custom Stake-based Proof of Authority engine ("WBFT") across 40 Node Council Partners — the [WONDERS](https://docs.wemix.com/en) — with deterministic finality and a stated 4,000 TPS target. The cryptographic stack is inherited wholesale from upstream go-ethereum: secp256k1 ECDSA for accounts, block signing, and node identity; BN254 pairing precompiles in the EVM; SHA-256, Keccak-256, RIPEMD-160, and Blake2 hashes.

No post-quantum migration work has been identified in the chain's repositories, documentation, [WEMIX Improvement Proposal](https://beincrypto.com/learn/wemix-explained-guide-web3-ecosystem/) process, or recent foundation announcements. The 2026 strategic direction described in public materials around the [Brioche hard fork](https://www.wemix.com/news/era-of-change-the-dawn-of-new-tokenomics-with-brioche-hard-fork-759a064f2a1d) and [Q1 2026 results](https://www.blockchaingamer.biz/news/42236/wemade-q1-2026-financials/) centres on tokenomics, gaming pipeline, and payments — none of which reference post-quantum or elliptic-curve retirement work.

## Proposed and Implemented PQC Algorithms

WEMIX3.0 does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for WEMIX3.0 in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

WEMIX3.0's consensus is described in the [WEMIX3.0 consensus documentation](https://docs.wemix.com/en/design/consensus): a Stake-based Proof of Authority ("SPoA") engine branded WBFT, with 40 Node Council Partners (NCPs / WONDERS) each required to stake 1.5M WEMIX. Blocks carry an ECDSA signature over the header binding the block to the elected NCP's secp256k1 operator key, with the NCP registry maintained on-chain. Leader rotation is coordinated via ETCD (a RAFT implementation) running between NCPs over standard TLS, and finality is deterministic once the elected NCP's block is accepted by the cohort. There is no BLS aggregation, no VRF beacon, and no validator-identity key outside the secp256k1 operator key.

**Current state.** All on-chain consensus signatures use ECDSA over secp256k1, and the off-chain coordination layer authenticates NCPs through EC-bound TLS certificates. No post-quantum verification path is wired into the WBFT engine.

**Planned future work.** No concrete post-quantum proposal currently exists. Public commits to [`go-wemix`](https://github.com/wemixarchive/go-wemix) through early 2026 are focused on tokenomics and operational changes rather than consensus cryptography.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for WEMIX3.0 in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: F ❌**

The EVM exposed by `gwemix` carries the upstream go-ethereum precompile set — `ecrecover` (secp256k1), `sha256`, `ripemd160`, `identity`, `modexp`, the BN254 pairing trio (`bn256Add` / `bn256ScalarMul` / `bn256Pairing`), and `blake2f`. No post-quantum verification precompile, hash-based signature opcode, or STARK verifier has been added on top of upstream.

**Current state.** All in-EVM signature verification is EC-based: secp256k1 signature recovery for account authentication and BN254 pairings for downstream pairing-based applications. There is no on-chain primitive a contract can call to verify a post-quantum signature.

**Planned future work.** No concrete post-quantum proposal currently exists for the precompile set or for an EVM-level PQ verification primitive.

## 5. Other Features

### WEMIX$ → USDC.e stablecoin transition

**Current state.** The chain originally hosted a USD-pegged stablecoin **WEMIX\$** backed by a reserve mechanism, and in 2025 the ecosystem [migrated to USDC.e](https://www.wemix.com/news/d05bfbd1-953c-43b7-b5ce-0b3d9f934873) bridged from Ethereum via [Circle's burn-and-mint flow paired with Chainlink CCIP](https://wemade.com/news/eng122). Both the legacy WEMIX\$ contracts and the burn-and-mint bridge rely on EC signatures end-to-end — Circle's attestation keys and Chainlink CCIP's oracle signatures are ECDSA over secp256k1.

**Planned future work.** No post-quantum alternative has been proposed for the stablecoin attestation or bridge-oracle paths.

### NILE governance and NFT platform

**Current state.** [NILE](https://beincrypto.com/learn/wemix-explained-guide-web3-ecosystem/) is the DAO and NFT marketplace anchored on WEMIX3.0. Governance votes and NFT transfers are ECDSA-signed transactions inheriting the base-layer signature scheme; no separate cryptographic envelope is layered on top.

**Planned future work.** No PQ alternative drafted.

### Cross-chain bridging

**Current state.** Earlier cross-chain liquidity routed through [Multichain (formerly Anyswap)](https://medium.com/@multichainorg/multichain-x-wemix3-0-cross-chain-campaign-starts-now-6782f399d3f0), whose SMPC network was ECDSA-keyed; Multichain itself wound down in 2023, and remaining cross-chain routes use other EC-based bridges. The Play Bridge service is custodial and ECDSA-keyed throughout.

**Planned future work.** No PQ bridge proposal has been published.

### Korean-won-pegged stablecoin ("Stable One")

**Current state.** A [Korean-won-pegged stablecoin mainnet, "Stable One"](https://cointelegraph.com/press-releases/wemix-unveils-stable-one-mainnet-for-korean-won-pegged-stablecoin), has been announced in the WEMIX ecosystem. As described publicly, it uses standard EVM cryptography.

**Planned future work.** No PQ-specific cryptographic design has been published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, WEMIX3.0's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

No EC retirement schedule has been published by the WEMIX Foundation or Wemade. The [Brioche hard fork](https://www.wemix.com/news/era-of-change-the-dawn-of-new-tokenomics-with-brioche-hard-fork-759a064f2a1d), which introduced a 590M capped supply and Project Mining Reward (PMR) halving, makes no reference to cryptographic changes. The [2026 strategic direction](https://www.blockchaingamer.biz/news/42236/wemade-q1-2026-financials/) summarised as "gaming + payments + public chain upgrades" likewise contains no post-quantum or EC-retirement milestone.

**Current state.** Every cryptographic primitive on WEMIX3.0 — account signatures, NCP block signatures, P2P node identity, EVM precompiles, bridge custody — remains EC-based. No deprecation is scheduled.

**Planned future work.** None published.

## Governance

WEMIX3.0 protocol changes are coordinated by the WEMIX Foundation alongside the 40 NCPs (WONDERS), who are split into *Technology Sponsors* and *Ecosystem Sponsors* and required to stake 1.5M WEMIX. The proposal vehicle is the WEMIX Improvement Proposal (WIP) process, which is [described as a port of Ethereum's EIP process](https://beincrypto.com/learn/wemix-explained-guide-web3-ecosystem/).

PQ-relevant proposals filed in the WIP repository:

- None identified. As of the most recent scan there is no WIP proposing post-quantum adoption for transaction signatures, consensus, P2P, on-chain verification, or any other layer.

No fork has been scheduled or signalled for post-quantum work on WEMIX3.0.

---

_Generated on 03 Jun 2026 based on information as of 14 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
