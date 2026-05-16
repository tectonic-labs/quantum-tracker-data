# Figure Heloc (FIGR_HELOC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Figure Heloc |
| **Ticker** | FIGR_HELOC |
| **Asset class** | RWA |
| **Issuer** | Figure Technology Solutions (merged with Figure Markets) |
| **Host chain(s)** | Provenance Blockchain |
| **Contract address** | `scope1qrm5d0wjzamyywvjuws6774ljmrqu8kh9x` (a Provenance Metadata scope identifier, not an EVM contract) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | ➖ | ➖ | Not Applicable |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

FIGR_HELOC is a tokenized real-world asset representing home-equity lines of credit originated by Figure. It is issued natively on [Provenance Blockchain](https://www.coingecko.com/en/coins/figure-heloc), a Cosmos SDK / CometBFT proof-of-stake L1, where the token exists as a Marker-module asset and each underlying HELOC is recorded in a Provenance Metadata `scope` object. Because a token cannot be more quantum-safe than the chain it executes on, the host chain is the ceiling for FIGR_HELOC's post-quantum posture — and Provenance currently has no published PQC roadmap, so its transaction-signature, consensus, and networking surfaces are all elliptic-curve based today.

On the surfaces Figure itself controls — the marker-admin keys that mint, burn, freeze, and withdraw the token, and the [DART](https://www.figure.com/dart/) lien-registry signing path — there is no public information indicating any post-quantum migration activity. All of these authenticate through Cosmos SDK accounts using secp256k1 ECDSA signatures and Ed25519 keys, the chain's stock primitives. As of the date of this report, neither Figure nor the Provenance Blockchain Foundation has published a PQC roadmap, proposal, or statement covering FIGR_HELOC's controlling keys.

## Proposed and Implemented PQC Algorithms

Figure Heloc does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

FIGR_HELOC is deployed natively and exclusively on Provenance Blockchain, as a Marker-module asset whose underlying instrument records live in Metadata-module `scope` objects. The token's transaction signing, consensus participation, and peer-to-peer networking exposure are all properties of Provenance itself, not of the token issuer — a token inherits its host chain's cryptographic posture and cannot be more quantum-safe than the chain it runs on.

**Current state.** Provenance is a Cosmos SDK / CometBFT proof-of-stake L1 that uses secp256k1 signatures for transactions, Ed25519 keys for validators, and CometBFT for peer-to-peer transport. The chain has no published post-quantum roadmap. Because FIGR_HELOC runs only on Provenance, the host-chain inheritance is a single-host (1 of 1) case rather than a worst-of-several outlier — the exposure described here is the entirety of the token's host-chain surface, not a partial one. Provenance has no public report in this tracker, so it is named here in plain text.

**Planned future work.** The source records no host-chain migration activity for Provenance.

## 2. Admin / Privileged Roles

**Grade: F ❌**

We have found no public information indicating migration activity for Figure Heloc in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## 3. Cross-Chain Mechanism

**Grade: ➖**

FIGR_HELOC is a single-chain token. It is canonically deployed only on Provenance Blockchain and has no documented native bridging mechanism to any other chain, so there is no cross-chain transfer surface to rate and this category does not apply.

## 4. Reserve / Custody

**Grade: ➖**

FIGR_HELOC is a real-world-asset token whose underlying instruments are home-equity lines of credit originated by Figure. The off-chain legal layer — note custody and originator paperwork — is out of scope; this category rates only the cryptographic linkage between off-chain custody and the on-chain contract. Figure has not published a separate custody-to-chain attestation flow, HSM configuration, or MPC arrangement; in practice the keys that push reserve-balance changes onto the chain collapse into the marker-admin keys. With no disclosed distinct custody-to-chain cryptographic linkage, there is no separate surface to rate and the category does not apply. If Figure later discloses an audit-signed or HSM-backed mint-attestation flow, this category would warrant re-rating.

## 5. Other Token-Specific Crypto

**Grade: F ❌**

The HELOC-instrument-to-token mapping on Provenance rests on two surfaces. First, [Provenance Metadata `scope` records](https://developer.provenance.io/docs/learn/asset-lifecycle/assets-overview/): each HELOC is recorded as a scope object — the "contract address" CoinGecko lists for FIGR_HELOC is in fact a Metadata scope identifier — and scope ownership and updates are authenticated by Cosmos SDK secp256k1 ECDSA signatures. Second, [DART](https://medium.com/provenanceblockchain/what-is-dart-ff0099917e21), the Figure-operated Digital Asset Registration Technologies lien and eNote registry, which listens to Provenance for loan transactions and maintains the linkage to the off-chain legal record; DART's own attestations onto Provenance are signed by Cosmos SDK accounts.

**Current state.** Both surfaces sit fully on Provenance and use the chain's stock secp256k1 / Ed25519 primitives. Figure has published no post-quantum proposal for the scope, marker, or DART signing path.

**Planned future work.** The source records no migration activity for this category.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to *retire* elliptic-curve cryptography on the token's own surfaces — Figure's marker-admin keys, DART signing keys, and any FIGR_HELOC-specific multisig or HSM keys — which is distinct from rating whether the token is adopting post-quantum cryptography.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ➖, Reserve & Custody ➖, Other ❌.

There is no public Figure statement on retiring elliptic-curve cryptography for any of these surfaces — no timeline, no governance proposal, no vendor commitment. Provenance's own EC sunset posture is assessed separately on the host-chain side and is not folded into the token's rating.

## Issuer & Governance

FIGR_HELOC is a centrally-issued security token. Figure Technology Solutions — now merged with Figure Markets — is the originator, tokenizer, and primary administrator; it originates the HELOCs, controls the marker admin, and operates the DART registry. The token is classified as a security under U.S. law and is restricted to accredited and institutional investors. There is no public DAO or token-holder governance over the marker configuration; control sits with Figure. The Provenance Blockchain Foundation governs the underlying L1 separately from FIGR_HELOC issuance.

Figure has not published a multisig roster, threshold, HSM or key-custody configuration for the marker-admin accounts, nor a key configuration for DART's signing path. Public sources describe the marketplace, settlement, and registry operations but disclose nothing about the cryptographic configuration of the admin keys. Readers looking for any future PQC commitment would expect it to surface through Figure's own product disclosures or through Provenance Blockchain Foundation governance.

---

_Generated on 16 May 2026 based on information as of 13 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
