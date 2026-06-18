# X Layer (OKB) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | X Layer |
| **Ticker** | OKB |
| **Website** | https://www.okx.com/xlayer |
| **Stack** | Polygon CDK (zkEVM, AggLayer) |
| **Settlement layer** | Ethereum |
| **Data availability** | Ethereum blobs (EIP-4844) |
| **Proof type** | ZK-SNARK (FFLONK over BN254; eSTARK inner proofs recursed to FFLONK for L1 verification) |
| **Sequencer model** | Centralized (OKX-operated) |
| **On-chain environment** | EVM (zkEVM, EVM-equivalent) |

## Summary Table

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Settlement Layer | C | 🗺️ | Roadmapped |
| Data Availability | C | 🗺️ | Roadmapped |
| Proof / Verification | F | ❌ | Not Discussed |
| Transaction Signatures | F | ❌ | Not Discussed |
| Networking | F | ❌ | Not Discussed |
| On-Chain Environment | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

## Summary

X Layer is OKX's Ethereum Layer 2, built on the Polygon Chain Development Kit (CDK) as a zkEVM validity rollup. It settles to Ethereum and connects to the Polygon AggLayer unified bridge. Cryptographically, X Layer is the same stack as Polygon zkEVM — every category is rated identically, with the only deviations being that OKX operates the sequencer and OKB is the gas token. Settlement and DA posture are inherited from Ethereum, which has planned (but not yet shipped) PQC migration work, giving both a roadmapped grade.

The proof system is where X Layer has its most significant L2-specific quantum exposure. The Polygon CDK prover generates eSTARK proofs internally — these inner proofs are hash-based and quantum-favorable — but then compresses them into a final FFLONK SNARK verified on Ethereum L1. FFLONK is a KZG-style SNARK over BN254 elliptic-curve pairings, which is quantum-vulnerable. The same pattern applies to the AggLayer pessimistic proof, which aggregates member-chain proofs into a SNARK for Ethereum. X Layer also carries a notable centralization caveat: L2BEAT reports that X Layer's proof system is not yet fully functional, meaning state updates currently rely on the trusted OKX-controlled operator rather than a live, enforced validity proof. This is a centralization concern rather than a PQC concern, but it means the OKX-controlled sequencer and admin keys are presently the primary security backstop — all EC-keyed.

## Proposed and Implemented PQC Algorithms

X Layer does not currently propose or implement any post-quantum cryptographic algorithms.

## Settlement Layer

**Grade: C 🗺️**

X Layer settles to Ethereum: the OKX-operated sequencer batches transactions and submits validity proofs to a rollup contract on Ethereum L1. Final settlement is confirmed once Ethereum L1 accepts the proof. Ethereum has PQC migration work on its roadmap — including planned KZG replacement for blob commitments and active work on post-quantum transaction signature EIPs — but none of this has shipped to mainnet. The settlement grade reflects Ethereum's roadmapped PQC trajectory.

The upgrade authority over X Layer's L1 rollup contracts and bridge contracts is held by OKX via EC-keyed admin keys. These are not covered by Ethereum's PQC migration plans; forging those keys via quantum attack would allow protocol takeover independently of Ethereum's own security.

## Data Availability

**Grade: C 🗺️**

X Layer uses Ethereum blobs (EIP-4844) for data availability, so DA security inherits from Ethereum. Blob commitments use KZG polynomial commitments over BLS12-381 pairings — an EC-pairing-based scheme that is quantum-vulnerable. Ethereum's roadmap includes replacing KZG with a quantum-safe commitment scheme, but that work is planned rather than implemented. There is no separate DA committee; availability is fully Ethereum-native.

## Proof / Verification

**Grade: F ❌**

X Layer uses the Polygon CDK proving stack. Internally, the prover generates eSTARK proofs using FRI (hash-based, quantum-favorable) to attest to correct execution of L2 batches. However, these inner proofs are then recursed and compressed into a final FFLONK SNARK for on-chain verification at the Ethereum L1 rollup contract. FFLONK is a KZG-style SNARK over BN254 elliptic-curve pairings — a construction broken by Shor's algorithm. The quantum-favorable eSTARK inner layer provides no protection while the BN254 FFLONK outer wrapper remains the L1 verification bottleneck.

Additionally, L2BEAT notes that X Layer's proof system is not yet fully functional — state updates currently rely on the trusted OKX-operated sequencer rather than a fully enforced validity proof on-chain. This means the EC-signed sequencer batch submissions are the de facto security backstop until the proof system is fully operational.

No PQC proof system migration has been announced by OKX or Polygon.

> We have found no public information indicating migration activity for X Layer in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Transaction Signatures

**Grade: F ❌**

All user transactions on X Layer use ECDSA over secp256k1, identical to the standard EVM transaction format. Address derivation follows the Ethereum standard (last 20 bytes of keccak-256 of the public key). ERC-4337 account abstraction is supported at the application layer, but application-layer PQC wallets do not constitute a protocol-level migration. No PQC transaction type has been published by OKX or the Polygon CDK team.

> We have found no public information indicating migration activity for X Layer in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Networking

**Grade: F ❌**

X Layer operates a single centralized sequencer (OKX-operated). There is no permissionless peer-to-peer gossip network of consensus nodes. RPC endpoints and the sequencer/aggregator/bridge service mesh communicate over TLS (classical ECDHE key exchange). Any execution-layer node sync uses standard devp2p with RLPx (ECIES), also EC-based. Node identities use secp256k1 keys. No PQC-hardened transport or node identity work has been published by OKX or Polygon.

> We have found no public information indicating migration activity for X Layer in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## On-Chain Environment

**Grade: F ❌**

X Layer runs a full EVM-equivalent environment with the standard Ethereum precompile set: `ecrecover` (0x01), `ecAdd`/`ecMul`/`ecPairing` over BN254 (0x06–0x08), `modexp` (0x05), SHA-256 (0x02), RIPEMD-160 (0x03), `identity` (0x04), and `blake2f` (0x09). No PQC signature verification primitive (ML-DSA, Falcon, SPHINCS+, or similar) is available on-chain. X Layer would inherit any future Polygon CDK precompile additions, but no PQC precompile work is in progress in the CDK.

> We have found no public information indicating migration activity for X Layer in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Other Features

**Grade: F ❌**

**zkEVM validity proof (Polygon CDK)**: The FFLONK SNARK verified on Ethereum L1 is the chain's primary validity proof. As described in the Proof / Verification section, the inner eSTARK/FRI proofs are hash-based and quantum-favorable, but the final L1-verified proof uses BN254 EC pairings and is quantum-vulnerable. A cryptographically relevant quantum computer forging a FFLONK proof could finalize invalid L2 state on Ethereum.

**AggLayer unified bridge / pessimistic proof**: X Layer connects to Polygon's AggLayer unified bridge. The AggLayer pessimistic proof is a ZK-SNARK (EC-pairing-based) that provides an ecosystem-wide guarantee that no connected chain can withdraw more than was deposited. The pessimistic proof and the underlying settlement transactions are all EC-based. A quantum attack forging the pessimistic proof could enable cross-chain theft across the entire AggLayer-connected set.

> We have found no public information indicating migration activity for X Layer in this category. If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## EC Sunset

**Grade: F ❌**

No OKX or Polygon plan to retire EC from the sequencer keys, proof system, bridge, or any other X Layer component has been published.

Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Settlement 🗺️, DA 🗺️, Proof ❌, Tx Sigs ❌, Networking ❌, On-Chain ❌, Other ❌.

## Governance

X Layer is operationally centralized. OKX controls the sequencer, bridge services, and upgrade keys for the X Layer rollup contracts. Polygon Labs controls the Polygon CDK codebase and AggLayer proving stack. There is no on-chain OKB-holder vote with cryptographic authority over rollup contracts. Protocol changes are announced via OKX channels; stack-level changes follow Polygon CDK and AggLayer development. No formal public proposal process exists for X Layer protocol changes, and no PQC-related proposals have been filed.

---

_Generated on 18 Jun 2026 based on information as of 18 Jun 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
