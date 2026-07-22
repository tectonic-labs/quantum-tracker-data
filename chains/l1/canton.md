# Canton (CC) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Canton Network |
| **Ticker** | CC |
| **Website** | [canton.network](https://www.canton.network/) |
| **GitHub** | [digital-asset/canton](https://github.com/digital-asset/canton) |
| **Twitter / X** | [@CantonNetwork](https://x.com/CantonNetwork) |
| **On-chain environment** | Daml (extended UTXO; proprietary smart contract language) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | B | 🔧 | In Development |
| Consensus | D | ⚠️ | Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Canton is an enterprise distributed ledger built on the Daml smart contract language, designed for institutional participants including major financial firms. In May 2026, Digital Asset merged experimental **ML-DSA-65** (NIST FIPS 204) signing support directly into Canton's main branch, making Canton one of the first enterprise DLTs to ship post-quantum cryptographic code in its mainline. The implementation includes JCE-backed configurations that allow nodes to operate with ML-DSA-65 as the default or sole signing scheme, gated behind an experimental feature flag. Cross-version compatibility between Canton 3.5 and 3.6 handles the presence or absence of ML-DSA-65 gracefully.

Despite this significant step, most of Canton's cryptographic surface remains classical. P2P networking, sub-transaction privacy authorization, and the broader EC retirement plan have not yet been addressed. The ML-DSA-65 work is additive — elliptic curve schemes remain available alongside the new post-quantum option. The signing scheme is behind an experimental flag and the user-facing Daml SDK integration is still in progress, so it is not yet reachable through standard end-user workflows.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Category | Status |
|-----------|----------|----------|--------|
| **ML-DSA-65** | Ed25519, ECDSA | Tx Signatures | In Development |
| **ML-DSA-65** | Ed25519, ECDSA | Consensus | Discussed |

## Transaction Signatures

**Grade: B 🔧**

Canton currently supports Ed25519 (primary) and ECDSA with NIST curves (secondary) for all transaction signing. Parties in multi-party Daml contracts are authorized through [topology-based key management](https://docs.daml.com/canton/usermanual/identity_management.html) tied to these schemes.

**Current state.** On 2026-05-20, [commit `8d252e65`](https://github.com/digital-asset/canton) merged experimental **ML-DSA-65** signing into Canton's main branch. The implementation adds `SigningKeySpec.MlDsa65` and `SigningAlgorithmSpec.MlDsa65` case objects, with JCE provider configurations supporting both ML-DSA-65-as-default and ML-DSA-65-only modes. Activation requires setting `<node>.crypto.enable-experimental = true`. The code directly references [NIST FIPS 204](https://www.nist.gov/). Test fixtures covering participant, sequencer, and mediator roles in PQC-only configurations ship alongside the implementation. The change includes cross-version compatibility handling so that Canton 3.5 nodes that do not speak ML-DSA-65 can still interoperate with Canton 3.6 nodes that do.

**Why grade B, not A.** The ML-DSA-65 signing scheme is merged into Canton's mainline (not merely proposed), and the user-facing integration into the Daml SDK is actively in progress — so a post-quantum signing path is being wired toward standard developer workflows. It stays In Development rather than Shipped because the scheme is behind an experimental flag, is not the default or mandatory scheme, and end users cannot yet generate or use ML-DSA-65 keys through standard Canton SDK workflows.

**Planned future work.** Promotion from experimental to default or mandatory status has not been scheduled. The backing JCE provider library (likely Bouncy Castle PQC or a custom provider) has not been publicly confirmed. The ML-DSA-65 changes are already cascading into the Daml SDK.

## Consensus

**Grade: D ⚠️**

Canton uses a Proof-of-Stakeholder consensus model with BFT ordering via a 2/3 majority threshold among [Super Validators](https://www.canton.network/global-synchronizer). Transactions are signed by participating stakeholders using Ed25519 or ECDSA, and the sequencer orders transactions for deterministic finality.

**Current state.** The ML-DSA-65 signing implementation merged in May 2026 includes test fixtures for sequencer-PQC-only (`seqPqcOnly`) and mediator-PQC-only (`medPqcOnly`) configurations, indicating that consensus-layer signing roles can use **ML-DSA-65**. However, this capability remains behind experimental gating and has not been deployed in production validators.

**Planned future work.** No timeline has been published for mandatory ML-DSA-65 adoption in the consensus layer. The experimental availability represents an option, not a commitment.

## P2P Networking

**Grade: F ❌**

We have found no public information indicating migration activity for Canton in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Logic

**Grade: ➖**

Canton does not expose cryptographic primitives or precompiles to smart contracts. [Daml contracts](https://docs.daml.com/canton/usermanual/security.html) focus on business logic and authorization rules; all signature and proof verification happens in the protocol layer, not in smart contracts. This category is not applicable.

## Other Features

**Grade: F ❌**

### Sub-Transaction Privacy

Canton's defining feature is [sub-transaction privacy](https://www.canton.network/blog/how-canton-network-delivers-institutional-grade-privacy). In a multi-party transaction, each party sees only the portions that apply to them — for example, in a Delivery-vs-Payment, the bank sees the cash leg while the securities registrar sees only the asset transfer.

**Current state.** The privacy model uses Merkle tree commitments (SHA-256, which is hash-based and believed quantum-safe) and symmetric encryption (AES-128-GCM) for confidential data. However, the authorization of who can see which parts of a transaction depends on Ed25519 signatures. If a quantum computer breaks Ed25519, an attacker could forge authorization signatures to gain unauthorized visibility into confidential transaction parts — retroactively deanonymizing the entire historical ledger.

**Planned future work.** No migration plan has been published for replacing Ed25519 in the privacy authorization layer. The **ML-DSA-65** implementation in the transaction signing layer could theoretically be extended to cover privacy authorization, but this has not been documented.

## EC Sunset

**Grade: F ❌**

Although **ML-DSA-65** was shipped experimentally in May 2026, this is an additive change — EC schemes remain available and there is no stated policy or plan to remove them. EC Sunset requires an explicit commitment to retiring elliptic-curve cryptography, not merely offering a post-quantum alternative alongside it.

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures 🔧, Consensus ⚠️, P2P ❌, On-Chain ➖, Other ❌.

A full EC sunset would require updating all Super Validator nodes, a hard fork to change the default transaction signature scheme, re-issuance of key material across all participants, and managing a dual-signature transition period in an enterprise setting with strict governance requirements.

## Governance

Canton's governance is a hybrid model. [Digital Asset](https://www.canton.network/) leads protocol development, the [Canton Foundation](https://canton.foundation/) (Linux Foundation-backed) coordinates Super Validators, and on-chain governance handles parameter changes. Super Validators vote on governance changes via 2/3 BFT majority.

No formal proposal system comparable to Ethereum's EIP process has been published. Proposals arise from Digital Asset's core development, Super Validator discussions, or Canton Foundation initiatives. No public PQC-specific governance proposal has been filed.

Key dates on the public record:

- **2024-06-07**: Global Synchronizer MainNet went live with 2/3 BFT consensus.
- **2024-07**: Canton Coin (CC) launched; 45+ Super Validators active.
- **2026-05-20**: ML-DSA-65 experimental signing support merged to Canton main.

---

_Generated on 22 Jul 2026 based on information as of 22 Jul 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
