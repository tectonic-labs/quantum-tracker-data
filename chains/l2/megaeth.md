# MegaETH (MEGA) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | MegaETH |
| **Ticker** | MEGA |
| **Website** | https://www.megaeth.com/ |
| **GitHub** | https://github.com/megaeth-labs |
| **Stack** | OP Stack (real-time execution variant) |
| **Settlement layer** | Ethereum |
| **Data availability** | EigenDA |
| **Proof type** | Fraud proofs (OP Stack Cannon / RISC-V) |
| **Sequencer model** | Centralized (MegaETH team-operated) |
| **On-chain environment** | EVM (EVM-equivalent) |
| **Mainnet launch** | 2026-02-09 |

## Summary Table

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | B | 🔧 | In Development |
| Data Availability | F | ❌ | Not Discussed |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Summary

MegaETH is a high-performance optimistic rollup built on the OP Stack, designed for real-time execution with mini-blocks at approximately 10ms intervals. It settles to Ethereum, which means it inherits Ethereum's in-progress PQC trajectory for the settlement layer — but cannot exceed it. For every other category, MegaETH's PQC posture is entirely unaddressed.

The most notable deviation from a standard OP Stack deployment is MegaETH's choice of EigenDA rather than Ethereum blobs for data availability. This is a meaningful PQC distinction: where Ethereum blob-based DA chains inherit the Ethereum roadmap's planned KZG replacement, EigenDA uses BLS12-381 aggregated operator attestations — a pairing-based signature scheme that is equally vulnerable to quantum attack — and has published no PQC migration plan. Fraud proofs use the OP Stack Cannon system, whose internal Keccak/SHA-256 Merkle steps are hash-based, but the output root assertions that trigger the dispute game are signed with secp256k1 ECDSA, making them quantum-vulnerable at the point that matters most. Transaction signatures, on-chain environment, networking, and bridge mechanics are all standard EVM with no PQC consideration.

## Proposed and Implemented PQC Algorithms

MegaETH does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: B 🔧**

MegaETH settles to Ethereum via the OP Stack `DisputeGameFactory` and `FaultDisputeGame` contracts. Output roots are proposed and bonded on Ethereum L1; after a 7-day challenge window (or resolved dispute), withdrawals finalize. Ethereum's PQC migration is actively in progress across its consensus layer, execution layer, and transaction signature surface, giving the settlement layer an in-development rating.

MegaETH itself adds EC-signed output root proposals on top of the Ethereum settlement layer — these are secp256k1 ECDSA signatures by the MegaETH team's proposer key, and they are not covered by Ethereum's PQC migration work. Until on-chain governance launches (planned within 18 months of the February 2026 mainnet), the MegaETH team holds the OP Stack upgrade proxy admin key unilaterally. This is a single EC keypair with no quantum hardening and no published transition plan.

## Data Availability

**Grade: F ❌**

MegaETH uses EigenDA for data availability rather than Ethereum's native blobs. EigenDA operators attest to batch availability using BLS12-381 aggregated signatures. BLS12-381 is an elliptic-curve pairing-based scheme broken by Shor's algorithm, the same family of attack that threatens secp256k1 and other EC cryptography. Critically, this is not an inherited Ethereum concern — it is a MegaETH-specific vulnerability introduced by the EigenDA choice.

A cryptographically relevant quantum computer forging EigenDA operator attestations could falsify batch availability certificates, potentially enabling withdrawal fraud during the fraud-proof window. EigenDA has not published any PQC roadmap for its BLS12-381 attestation scheme, and MegaETH has not addressed this exposure.

> We have found no public information indicating migration activity for MegaETH in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Proof / Verification

**Grade: F ❌**

MegaETH uses OP Stack Cannon fraud proofs (RISC-V based). Internally, Cannon's execution trace uses Keccak and SHA-256 Merkle proofs — hash-based operations that are quantum-safe in isolation. However, the output root proposals that initiate the dispute game are signed by the proposer's secp256k1 ECDSA key. A cryptographically relevant quantum computer forging that key could submit fraudulent output roots without triggering a valid dispute, enabling bridge theft during the challenge window. The hash-based internals of Cannon provide no protection once the outer output root assertion can be forged.

No PQC fraud proof roadmap exists in MegaETH or OP Stack documentation.

> We have found no public information indicating migration activity for MegaETH in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Transaction Signatures

**Grade: F ❌**

All user transactions on MegaETH use ECDSA over secp256k1, identical to Ethereum's transaction format. Address derivation follows the Ethereum standard (last 20 bytes of keccak-256 of the public key). ERC-4337 account abstraction is available at the application layer, but application-layer PQC wallets do not constitute a protocol-level migration. Any future PQC transaction type would require upstream Ethereum EIP adoption (such as EIP-7932 or EIP-8051/8052) followed by OP Stack adoption — neither of which is in MegaETH's roadmap.

> We have found no public information indicating migration activity for MegaETH in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Networking

**Grade: F ❌**

MegaETH operates a single centralized sequencer (MegaETH team), a deliberate architectural choice for its real-time ~10ms mini-block design. The p2p layer is OP Stack-derived, using libp2p with secp256k1 node identity and gossipsub for block propagation. RPC transport uses standard TLS 1.3 with classical ECDHE cipher suites. The centralized sequencer means the primary networking exposure is the sequencer's own EC keypair — a single secp256k1 key with no quantum hardening. Decentralization plans are described as TBD.

> We have found no public information indicating migration activity for MegaETH in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Environment

**Grade: F ❌**

MegaETH runs a standard EVM-equivalent environment with the full Ethereum precompile set: `ecrecover` (secp256k1), `ecAdd`/`ecMul`/`ecPairing` over BN254 (EIP-196/197), BLS12-381 operations (EIP-2537), and the standard hash precompiles (SHA-256, Keccak-256, Blake2b, RIPEMD-160). No PQC signature verification primitive is available on-chain. Adding PQC precompiles (such as ML-DSA or Falcon verification) would require upstream Ethereum EIP activation and subsequent OP Stack adoption. No such EIP is finalized at the Ethereum layer.

> We have found no public information indicating migration activity for MegaETH in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

**Grade: F ❌**

**EigenDA attestation layer**: EigenDA operators attest to batch availability using BLS12-381 aggregated signatures. A quantum attack forging these attestations could suppress legitimate availability proofs or create false ones, undermining the DA guarantee independently of Ethereum's security.

**OP Stack canonical bridge**: The StandardBridge and CrossDomainMessenger contracts enable L1↔L2 asset transfers. L2→L1 withdrawals are anchored to EC-signed output roots (secp256k1). Forging the output root proposer key would allow a quantum attacker to submit fraudulent withdrawal roots and drain bridge funds during the challenge window. This is the highest-impact single-key quantum vulnerability for MegaETH.

**Admin key**: The MegaETH team holds the OP Stack upgrade proxy admin key unilaterally until on-chain governance launches. This secp256k1 key controls sequencer contracts, bridge contracts, and protocol parameters. Compromise via quantum attack would allow complete protocol takeover. No transition timeline to quantum-hardened governance has been published.

> We have found no public information indicating migration activity for MegaETH in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## EC Sunset

**Grade: F ❌**

MegaETH has not published any PQC migration statement or EC sunset plan. On-chain governance is not yet live, and PQC is not mentioned in the published post-mainnet roadmap.

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Settlement 🔧, DA ❌, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

## Governance

MegaETH is currently core-team controlled. The MegaETH team holds the OP Stack upgrade proxy admin key and controls all protocol parameters unilaterally. On-chain governance is planned post-mainnet within approximately 18 months of the February 2026 launch, but is not yet live as of June 2026. Protocol changes are announced via blog and documentation. No formal proposal process exists. No PQC-related proposals have been filed.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
