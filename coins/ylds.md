# YLDS (YLDS) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | YLDS |
| **Ticker** | YLDS |
| **Asset class** | RWA |
| **Issuer** | Figure Certificate Company (FCC), a wholly-owned subsidiary of Figure Markets, part of Figure Technology Solutions (Nasdaq: FIGR). |
| **Host chain(s)** | Provenance Blockchain (primary, native marker `uylds.fcc`), Solana, Stellar, and Sui. |
| **GitHub** | [FigureTechnologies](https://github.com/FigureTechnologies) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

YLDS is a SEC-registered yield-bearing security issued by Figure Certificate Company (FCC). It runs natively on four chains — Provenance Blockchain (its primary host, as the Cosmos SDK marker `uylds.fcc`), plus Solana, Stellar, and Sui — and on each one the token's transaction signing, consensus, and networking exposure are inherited entirely from the host chain. A token cannot be more quantum-safe than the chain it runs on: host-chain inheritance is the ceiling. All four hosts currently rely on elliptic-curve cryptography with no production post-quantum migration, so YLDS inherits that exposure on every chain it touches.

On the surfaces the issuer itself controls — the marker and mint-authority keys, the cross-chain authorization path, and the on-chain mapping between an on-chain YLDS unit and the off-chain certificate — FCC has not published any post-quantum plan, roadmap, governance proposal, or vendor commitment. The keys that authorize minting, burning, and freezing on every host chain are elliptic-curve, and no public statement commits FCC to retiring them. YLDS does not currently maintain a public PQC roadmap or statement.

## Proposed and Implemented PQC Algorithms

YLDS does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

YLDS is issued natively on Provenance Blockchain as a Cosmos SDK marker (`uylds.fcc`), and since 2025 has additionally been minted natively on Solana (2025-11-12), Stellar (2026-05-05), and Sui (announced 2025-10-14). On every one of these chains, the token's transaction signing, consensus participation, and peer-to-peer networking are properties of the host chain, not of the token issuer. The token cannot be more quantum-safe than the chain it executes on — host-chain inheritance sets the ceiling for YLDS's overall posture.

**Current state.** Provenance is a Cosmos SDK / CometBFT proof-of-stake L1 using secp256k1 transaction signatures, Ed25519 validator keys, and CometBFT peer-to-peer transport. Solana uses Ed25519 transaction signatures, Stellar uses Ed25519, and Sui uses a multi-scheme set of Ed25519, secp256k1, and secp256r1. All four host chains rely on elliptic-curve cryptography and have no production post-quantum protections, so the aggregate is the worst case across all four hosts — every host is at the same exposed level (4/4), not an outlier. Public PQC readiness reports are available for two of the hosts: [Solana](../chains/l1/solana.md) and [Sui](../chains/l1/sui.md). Provenance Blockchain and Stellar do not have public reports at this time.

**Planned future work.** The intel record shows no published post-quantum migration roadmap for Provenance, Solana, Stellar, or Sui that would change this host-chain inheritance.

## 2. Admin / Privileged Roles

**Grade: F ❌**

YLDS on Provenance is a restricted marker: its regulatory profile — a SEC-registered security with accredited-investor gating and transfer-agent recordkeeping — requires the issuer to retain mint, burn, withdraw, freeze, and transfer-authorization grants on the marker. Per [Provenance's marker module documentation](https://docs.provenance.io/modules/marker-module), marker access is granted to individual addresses or CosmWasm contracts that authenticate transactions using Cosmos SDK accounts — that is, secp256k1 ECDSA signatures. On Solana, Stellar, and Sui, the equivalent role is the freeze authority / issuer / regulated-asset controller on each chain's native token primitive, each authenticating with that chain's stock elliptic-curve primitives (Ed25519 across the three).

**Current state.** Figure Certificate Company, Figure Markets, and Figure Technology Solutions have not published the multisig roster, threshold, HSM vendor, MPC configuration, or any other cryptographic detail of the YLDS marker-admin accounts. The [SEC Form 497 filing](https://www.sec.gov/Archives/edgar/data/1974395/000149315225018198/form497.htm) describes the security structure but discloses no cryptographic configuration of the issuer keys. No Figure, FCC, or Provenance Foundation statement, blog post, governance proposal, vendor proof-of-concept, or working-group output proposes a post-quantum scheme for the marker or issuer admin keys.

**Planned future work.** We have found no public information indicating migration activity for the YLDS admin keys.

## 3. Cross-Chain Mechanism

**Grade: F ❌**

YLDS is actively deployed on four chains — Provenance, Solana, Stellar, and Sui — with FCC as the single source of mint authorization. Press releases consistently frame each deployment as a native mint by FCC on the target chain rather than a lock-and-bridge arrangement: FCC will [mint YLDS natively on Solana](https://www.globenewswire.com/news-release/2025/11/12/3186286/0/en/Figure-brings-YLDS-to-Solana-unlocking-real-RWA-utility-for-DeFi.html), [YLDS launched on Stellar](https://stellar.org/press/figure-announces-launch-of-ylds-on-stellar-network), and a [Sui deployment](https://csimarket.com/news/sui-and-figure-technology-revolutionize-finance-with-ylds-deployment-on-sui-blockchain2025-10-14133346) was announced. Because the issuer authorizes mints on multiple chains, the issuer's signing path is itself the cross-chain mechanism.

**Current state.** FCC holds an admin key on each chain — Cosmos SDK secp256k1 on Provenance, Ed25519 mint/freeze authority on Solana, an Ed25519 issuer account on Stellar, and an Ed25519/secp256k1/secp256r1 key on Sui. All four keys are elliptic-curve. There is no public design document describing how mint quotas are reconciled across chains. No post-quantum proposal has been published by FCC, Figure, or any host-chain foundation for the YLDS-specific issuer key set.

**Planned future work.** We have found no public information indicating migration activity for the YLDS cross-chain authorization path.

## 4. Reserve / Custody

**Grade: ➖**

YLDS is backed by short-duration U.S. Treasuries and Treasury repurchase agreements held by Figure Certificate Company, and press materials describe it as an unsecured face-amount certificate issued by FCC. This category rates only the cryptographic linkage between off-chain custody and the on-chain contract — the keys FCC uses to push reserve-balance changes onto the chains. In practice that collapses onto the marker and mint-authority keys already covered in Admin / Privileged Roles; FCC has published no separate custody-to-chain attestation flow, HSM configuration, MPC arrangement, or vendor stack. With no disclosed distinct custody-to-chain cryptographic linkage, there is no separate custody-to-chain surface to rate, so this category does not apply.

## 5. Other Token-Specific Crypto

**Grade: F ❌**

YLDS has several token-specific on-chain mapping surfaces. The Provenance marker (`uylds.fcc`) is the native asset record, with admin, mint, burn, withdraw, and transfer-approval grants all authenticating via Cosmos SDK secp256k1 ECDSA. Provenance Metadata `scope` records, used for some structured products, are authenticated by secp256k1 owner / value-owner accounts. [DART](https://medium.com/provenanceblockchain/what-is-dart-ff0099917e21) (Digital Asset Registration Technologies), a Figure-controlled registry that listens to Provenance and maintains the linkage to off-chain legal records, signs its own attestations onto Provenance with Cosmos SDK accounts. Figure also publishes a [restricted-marker-transfer CosmWasm contract](https://github.com/FigureTechnologies/restricted-marker-transfer-smart-contract) implementing transfer gating, which trusts caller signatures authenticated by Cosmos SDK ECDSA. On the other three host chains the equivalent surfaces are each chain's native issued-asset primitive (SPL token, Stellar issued asset, Sui Coin), gated by that chain's stock elliptic-curve primitives.

**Current state.** The binding between an on-chain YLDS unit and the off-chain face-amount certificate is elliptic-curve across every surface: secp256k1 on Provenance, Ed25519 on Solana and Stellar, and Ed25519/secp256k1/secp256r1 on Sui. No post-quantum alternative has been drafted for any of these mapping surfaces.

**Planned future work.** We have found no public information indicating migration activity for the YLDS token-specific mapping surfaces.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to retire elliptic-curve cryptography on the token's own surfaces — the marker / freeze-authority / issuer keys across Provenance, Solana, Stellar, and Sui; DART signing keys; and any FCC-internal HSM or MPC keys. That is distinct from rating whether the token is adopting post-quantum cryptography.

There is no public Figure, FCC, or Figure Markets statement on retiring elliptic-curve cryptography for any of these surfaces — no timeline, no governance proposal, no vendor commitment, and no SEC filing language committing FCC to a migration. The elliptic-curve sunset of the underlying chains (Provenance, Solana, Stellar, Sui) is rated on each chain's own report and is not folded in here.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ❌.

## Issuer & Governance

YLDS is a centrally-issued, SEC-registered security. The registered issuer is Figure Certificate Company (FCC), a wholly-owned subsidiary of Figure Markets, which is in turn part of Figure Technology Solutions (Nasdaq: FIGR). The product is offered under SEC registration via Form S-1 and Form 497 filings, with the initial registration effective in February 2025. Transfer is restricted to onboarded / accredited holders through Figure Markets' KYC process. There is no DAO or token-holder governance over the marker configuration — control sits with FCC. The Provenance Blockchain Foundation, and the Solana, Stellar, and Sui foundations respectively, govern the underlying L1s separately from YLDS issuance.

Product and regulatory commitments for YLDS surface through SEC filings (the [Form 497 filing](https://www.sec.gov/Archives/edgar/data/1974395/000149315225018198/form497.htm) and related S-1 documents) and through Figure's own announcements (the [YLDS launch announcement](https://www.figure.com/newsroom/announcement/figure-markets-announces-ylds-first-yield-bearing-stablecoin/)). Figure Markets has also made a [submission to the SEC Crypto Task Force](https://www.sec.gov/files/ctf-input-figure-markets-040825.pdf). No dated, on-record post-quantum milestone has been published by the issuer.

---

_Generated on 16 May 2026 based on information as of 13 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
