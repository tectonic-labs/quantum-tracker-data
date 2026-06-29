# Helium (HNT) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Helium |
| **Ticker** | HNT |
| **Asset class** | Utility |
| **Issuer** | Helium Foundation (steward); Nova Labs (lead implementer / operator) |
| **Host chain(s)** | Solana (canonical SPL token, post-HIP-70) |
| **Website** | https://www.helium.foundation/ |
| **GitHub** | https://github.com/helium |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | ➖ | ➖ | Not Applicable |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Helium is a DePIN utility token. Since the HIP-70 migration in April 2023, Helium no longer runs a chain of its own — HNT is a canonical SPL token on Solana, and the IoT and Mobile subDAOs plus all reward, governance, and entity-management logic run as Solana programs. That makes Solana the inherited ceiling for HNT's quantum posture: a token cannot be more quantum-safe than the chain it executes on, and HNT's transaction signing, consensus, and networking exposure are all Solana's.

On top of the host-chain inheritance, Helium carries genuine token-specific cryptography that the issuer does control — and it is uniformly elliptic-curve based. Hotspot identity, Proof of Coverage beacon/witness signatures, and location assertions are produced by ECC P-256 keys held in Microchip ATECC608-TNGHNT hardware secure elements, while program upgrade authority and governance signing use Solana-native Ed25519. We found no Helium Foundation or Nova Labs statement, HIP, or implementation effort proposing post-quantum migration on any of these surfaces, and the deployed-hardware floor in fielded hotspots is a binding constraint on any future change.

## Proposed and Implemented PQC Algorithms

Helium does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

HNT is the canonical SPL token of the Helium network on [Solana](../chains/l1/solana.md) mainnet-beta, following the HIP-70 migration in April 2023. The IoT and Mobile subDAOs (IOT, MOBILE) and all reward, governance, and entity-management logic run as Solana programs; Helium operates no chain of its own, so the "node" is Solana's validator software. Because of that, HNT's transaction-signing, consensus, and networking exposure belong to the host chain, not to the token issuer — the token cannot be more quantum-safe than the chain it executes on.

Solana is the single evaluated host, so there is no multi-host distribution to report. The aggregate inherits Solana's worst category rating across the host-chain categories, which is ❌, set by Solana's peer-to-peer networking layer.

**Current state.** HNT is a single-host SPL token on Solana; its host-chain exposure is whatever Solana's is today.

**Planned future work.** Any migration on this surface is the host chain's to make. See the [Solana report](../chains/l1/solana.md) for its current posture and any roadmapped work.

Sources:
- https://docs.helium.com/ — Helium runs on Solana post-HIP-70
- https://github.com/helium/HIP/blob/main/0070-scaling-helium.md — the architectural change that ended Helium's native L1

## 2. Admin / Privileged Roles

**Grade: F ❌**

Helium's on-chain logic is a portfolio of Solana programs (Lazy Distributor, Helium Entity Manager, Data Credits, Treasury Management, voter-stake-registry, and others). These upgrade through Solana's BPF upgradeable loader, gated by an upgrade authority, and are governed upstream by veHNT / veIOT / veMOBILE votes via Realms (SPL-Governance): a supermajority over a roughly seven-day window approves a change, after which the upgrade authority deploys it.

**Current state.** All privileged-role cryptography is Solana-native elliptic curve — Ed25519 for the governance envelope and upgrade-authority signing, with secp256k1 / secp256r1 syscalls available to programs. No concrete post-quantum proposal currently exists for the upgrade authority or governance signing: no HIP, no pull request across the helium GitHub org, and no Foundation statement addresses it.

Sources:
- https://github.com/helium/helium-program-library — Anchor/Rust Solana programs, BPF upgradeable loader
- https://github.com/helium/HIP — governance via Realms (SPL-Governance)
- https://docs.helium.com/ — veHNT/veIOT/veMOBILE governance model

## 3. Cross-Chain Mechanism

**Grade: ➖**

HNT is canonical and single-chain on Solana, so there is no ongoing cross-chain transfer mechanism to rate and this category does not apply. The only cross-chain event in Helium's history was the one-time HIP-70 migration in April 2023, which moved legacy Helium L1 state into Solana programs; the legacy chain is frozen and no longer block-producing, so it is not a standing bridge surface. No issuer-operated burn-and-mint path and no canonical third-party bridge surfaces as a primary deployment path.

Sources:
- https://github.com/helium/HIP/blob/main/0070-scaling-helium.md — one-time migration to Solana
- https://en.wikipedia.org/wiki/Helium_Network — single-chain SPL token post-migration

## 4. Reserve / Custody

**Grade: ➖**

HNT is an unbacked DePIN utility token, so there is no reserve or custody-to-chain surface to rate and this category does not apply. There is no off-chain reserve, no audited backing, and no custody-to-chain mint-attestation pipeline — emissions are produced on-chain by the subDAO programs on governance-set schedules.

Sources:
- https://github.com/helium/HIP/blob/main/0138-return-of-hnt.md — HNT emissions / reward-token model
- https://docs.helium.com/ — no reserve attestations

## 5. Other Token-Specific Crypto

**Grade: F ❌**

This is where Helium has cryptography distinct from inherited Solana behavior, and it is uniformly elliptic-curve based:

- **Proof of Coverage (PoC).** Hotspots beacon and witness RF packets to prove physical coverage. Each beacon/witness report is signed by the hotspot's ECC P-256 (secp256r1) private key stored in the Microchip ATECC608-TNGHNT secure element. Public keys are pinned at manufacture and form the hotspot's network identity and on-chain NFT mapping.
- **Location assertion.** Signed by the same hotspot ECC key, gated by Data Credits.
- **Onboarding / Maker attestation.** Factory-provisioned P-256 keys; Maker keys are elliptic curve.
- **Oracle / Lazy Distributor reward attestation.** PoC oracles sign Solana transactions with Ed25519; the underlying witness data is signed with the hotspot's ECC P-256 key.

**Current state.** All of these surfaces rely on classical elliptic-curve keys. Migration is constrained at the hardware level: the ATECC608-TNGHNT cannot be field-upgraded, and current post-quantum signature schemes do not drop cleanly into current ATECC variants given key/signature size, signing speed, and arithmetic requirements. No issuer-attributable post-quantum work exists on any of these surfaces, and no concrete proposal is currently drafted.

Sources:
- https://docs.helium.com/iot/proof-of-coverage/ — beacon/witness flow
- https://ww1.microchip.com/downloads/aemDocuments/documents/SCBU/ProductDocuments/DataSheets/ECC608-Trust-and-GO-For-Helium-Network-Data-Sheet-DS40002389.pdf — ECC P-256 hardware secure element
- https://github.com/helium/gateway-mfr-rs — hotspot manufacturing / ATECC608 provisioning
- https://github.com/helium/helium-program-library — Lazy Distributor oracle reward attestation

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ➖, Reserve & Custody ➖, Other ❌.

EC Sunset rates whether the issuer has a credible plan to retire elliptic-curve cryptography on the token's own surfaces. We found no Helium Foundation or Nova Labs plan to retire EC on the Solana program upgrade authority and governance signing (Ed25519), on hotspot identity (ATECC608-TNGHNT / ECC P-256), location assertion, and onboarding, or on PoC oracle reward attestations (Ed25519 plus hotspot P-256). No HIP proposes deprecating the hotspot identity hardware or oracle signing. The dominant constraint is the deployed-hardware floor: fielded ATECC608-TNGHNT hotspots cannot be re-keyed without device replacement.

Sources:
- https://github.com/helium/HIP — no EC-sunset HIP
- https://www.helium.foundation/ — no quantum-readiness statement
- https://ww1.microchip.com/downloads/aemDocuments/documents/SCBU/ProductDocuments/DataSheets/ECC608-Trust-and-GO-For-Helium-Network-Data-Sheet-DS40002389.pdf — hardware floor

## Issuer & Governance

Helium governs on-chain via Realms (SPL-Governance) with veHNT (vote-escrowed HNT), plus per-subDAO veIOT and veMOBILE. Proposals are Helium Improvement Proposals (HIPs) at [helium/HIP](https://github.com/helium/HIP); binding decisions go to on-chain votes. The Helium Foundation stewards the protocol and brand, and Nova Labs is a major implementer and subDAO operator. PQC commitments, if any were made, would surface as a HIP in that repository or as a statement on the Helium Foundation site. As of this report, no HIP addresses post-quantum primitives for any component.

---

_Generated on 29 Jun 2026 based on information as of 29 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
