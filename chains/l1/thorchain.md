# THORChain (RUNE) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | THORChain |
| **Ticker** | RUNE |
| **Website** | https://docs.thorchain.org/ |
| **On-chain environment** | App-specific Cosmos SDK chain (no general smart-contract VM) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

THORChain is a Cosmos SDK / CometBFT application-specific chain designed for native cross-chain swaps — enabling direct swaps of, for example, native BTC for native ETH without bridges or wrapped assets. The mechanism is a GG20 ECDSA Threshold Signature Scheme (TSS), where approximately 100 Node Operators collectively hold threshold keys over Bitcoin, Ethereum, BNB Chain, and other supported network addresses. RUNE is the hub asset paired with every supported chain's asset in liquidity pools. As of the most recent research pass, no post-quantum migration plan has been published.

## Proposed and Implemented PQC Algorithms

THORChain does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

We have found no public information indicating migration activity for THORChain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 2. Consensus

**Grade: F ❌**

We have found no public information indicating migration activity for THORChain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for THORChain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 4. On-Chain Logic

**Grade: ➖**

THORChain is an application-specific chain; it does not provide a general smart-contract VM. Application logic for vaults, swaps, liquidity pools, and savers is implemented as Cosmos SDK modules rather than user-deployable smart contracts. This category is not applicable.

## 5. Other Features

### GG20 ECDSA Threshold Signature Scheme

**Current state.** THORChain's cross-chain custody is built on the [GG20 Distributed Key Generation and Threshold Signature Scheme](https://docs.thorchain.org/native-cross-chain-swaps). Each supported chain's vault has an on-chain address (Bitcoin, Ethereum, BNB Chain, etc.) whose private key is sharded among a two-thirds threshold of Node Operators using GG20 ECDSA on secp256k1. A quorum-threshold signing run is required to send funds out of any vault.

GG20 TSS is a threshold-ECDSA construction built on secp256k1. A break of secp256k1 either via forging ECDSA signatures on the partner chain or recovering enough threshold key-share material to forge a TSS signature would allow an attacker to drain every vault. THORChain's migration to post-quantum vault custody is also externally bottlenecked: each supported chain would need to support post-quantum signatures on its own address scheme before THORChain's TSS vaults could protect those assets.

**Planned future work.** No post-quantum equivalent of GG20 has been proposed for THORChain. Lattice-based threshold signature schemes are still in active research and have not reached production maturity equivalent to GG20. No timeline has been published.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, THORChain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ➖, Other ❌.

EC sunset on THORChain is structurally dependent on EC sunset across every chain it custodies. Until chains such as Bitcoin and Ethereum support post-quantum address schemes, THORChain's vault custody cannot be post-quantum regardless of internal changes.

We have found no public information indicating migration planning for THORChain in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

THORChain protocol changes are coordinated by the THORChain developer team (Nine Realms) and deployed as hard forks at pre-announced block heights. The versioning scheme distinguishes consensus-breaking minor releases from non-breaking patches. Upgrade readiness is signaled by node operators upgrading their binaries before the target block height; coordination happens via GitLab and community channels. There is no on-chain governance vote for protocol changes.

No PQC-related proposals have been identified as of the most recent research pass.

---

_Generated on 03 Jun 2026 based on information as of 05 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
