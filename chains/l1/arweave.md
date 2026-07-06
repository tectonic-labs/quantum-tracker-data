# Arweave (AR) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Arweave |
| **Ticker** | AR |
| **Website** | https://www.arweave.org |
| **GitHub** | https://github.com/ArweaveTeam |
| **On-chain environment** | None at L1 (data chain); SmartWeave and AO Computer / HyperBEAM provide off-chain compute over signed message logs |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | A | ✅ | Shipped |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | ➖ | ➖ | Not Applicable |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Arweave is a permanent-storage L1 whose consensus is hash-based ([SPoRA — Succinct Proofs of Random Access](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-103.md), combining SHA-256, RandomX / RandomXSquared, and a hash-based VDF) and whose user-facing cryptography is entirely classical. Wallets sign with [RSA-PSS-4096](https://cookbook.arweave.net/fundamentals/wallets-and-keyfiles/index.html) by default, and the [2.9.1 hard fork at block 1,602,350 (3 Feb 2025)](https://github.com/ArweaveTeam/arweave/releases) added ECDSA over secp256k1 as a second wallet signing option at the L1 transaction layer. The [ANS-104 bundling format](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md) used by Bundlr / Irys additionally accepts Ed25519 data-item signatures. All three families are broken by Shor.

No proposal — no ANS, no GitHub issue on `ArweaveTeam/arweave`, no public Forward Research roadmap item — currently introduces a post-quantum signature scheme to either L1 transactions or ANS-104 bundles, and no published plan retires the existing classical schemes. Because Arweave's headline guarantee is multi-decade permanence, signatures committed to the weave today remain visible (and forgeable, once a sufficiently capable quantum computer exists) for the chain's entire lifetime, which is a distinguishing concern for this chain.

## Proposed and Implemented PQC Algorithms

Arweave does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

Arweave L1 transactions are signed with one of three classical schemes: [RSA-PSS-4096 with public exponent 65537](https://docs.arweave.org/developers/arweave-node-server/http-api) (encoded `PS256_65537`, the original and still-default wallet format stored as a JWK per RFC 7517), [ECDSA over secp256k1](https://docs.arweave.org/developers/wallets/wallet-faq) (`ES256K`, accepted at the L1 tx layer since the [2.9.1 hard fork activated 3 Feb 2025](https://github.com/ArweaveTeam/arweave/releases) at block height 1,602,350; the format-2 tx leaves `owner` empty and uses a 65-byte recoverable signature from which the node recovers the compressed public key), and [Ed25519](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md) (`EdDSA`, accepted at the ANS-104 data-item / bundle layer for Solana-style signers, not yet at the L1 tx layer). Addresses are derived as Base64URL(SHA-256(public-key material)). RSA-4096 is not quantum-safe; [Shor's algorithm scales near-linearly in key size](https://qtonicquantum.com/quantum-safe/rsa-4096), so 4096 vs 2048 doubles the qubit budget rather than providing any structural defense, and [resource estimates put RSA-4096 in the ~8,000–20,000 logical-qubit range](https://kudelskisecurity.com/research/quantum-attack-resource-estimate-using-shors-algorithm-to-break-rsa-vs-dh-dsa-vs-ecc).

There is no native protocol-level multisig; threshold approaches such as [Safeheron's open-source TSS-RSA](https://safeheron.com/blog/safeheron-tss-rsa-algorithm-officially-open-source/) are application-layer and do not change the underlying signature scheme. Account abstraction is similarly absent at L1 — [AO Computer](https://permaweb-journal.arweave.net/reference/ao.html) processes can implement arbitrary signing policies in WASM, but the underlying ANS-104 message envelope still carries one of the three classical signatures above.

**Current state.** Every supported wallet signing scheme is quantum-vulnerable. No post-quantum signature scheme is implemented or referenced in any [Arweave Network Standard](https://github.com/ArweaveTeam/arweave-standards) or open GitHub issue against the reference client. The most recent signature-related change — [the 2.9 hard fork](https://www.storagenewsletter.com/2025/01/29/arweave-2-9-upgrade-introduces-breakthrough-data-preparation-algorithm/) — added another classical scheme rather than a post-quantum one.

**Planned future work.** No concrete post-quantum proposal currently exists for either the L1 transaction layer or ANS-104. The closest historical analogue is [PR #309 (2021)](https://github.com/ArweaveTeam/arweave/pull/309), which proposed adding ECDSA and Ed25519 to L1 transactions; it was closed unmerged when the author deleted their fork in 2023, but the underlying design eventually shipped via the 2.9 hard fork in 2025. There is no analogous PR or draft for a post-quantum scheme.

## 2. Consensus

**Grade: A ✅**

Arweave secures consensus with SPoRA (Succinct Proofs of Random Access) proof-of-work. Proof-of-work is hash-based, so it is not exposed to Shor's algorithm the way elliptic-curve signature schemes are — the consensus layer is quantum-resistant by construction and requires no migration.

**Current state.** SPoRA (Succinct Proofs of Random Access) proof-of-work; no elliptic-curve dependency in the consensus mechanism.

**Planned future work.** None required for quantum resistance at the consensus layer.

## 3. P2P Networking

**Grade: F ❌**

Arweave's peer-to-peer layer is [plain HTTP over TCP, with optional HTTPS (TLS 1.3)](https://docs.arweave.org/developers/mining-node-ops/tls); the node is an Erlang/cowboy HTTP server rather than a libp2p or devp2p stack. Per the official TLS guide, transport encryption is optional and most miners run plain HTTP. When TLS is enabled, the cipher suites are whatever the operator's OpenSSL build negotiates — in practice ECDHE-RSA or ECDHE-ECDSA. No post-quantum hybrid KEM is offered by default in either the cowboy configuration or any chain-attributable patch. Nodes do not carry a long-term cryptographic identity in the libp2p sense; peers are tracked by IP / hostname, exchanged via the documented `GET /peers` endpoint, and a node's reward address (its RSA or ECDSA mining payout key) is the closest analogue to identity but is not used in any handshake.

**Current state.** When transport encryption is in use it is EC-based and quantum-vulnerable; when it isn't, traffic is in cleartext, which is its own problem but not a post-quantum problem.

**Planned future work.** No public proposal, draft, or working-group activity currently exists for a post-quantum handshake or post-quantum node identity in the Arweave or HyperBEAM repositories.

## 4. On-Chain Logic

**Grade: ➖ Not Applicable**

Arweave L1 has no protocol-level smart-contract VM, no precompiles, and no opcodes; the chain stores opaque transaction payloads and exposes no signature-verification primitive to on-chain code. The two compute environments — [SmartWeave](https://docs.arweave.org/developers/wallets/wallet-faq) (lazy-evaluation JS contracts that clients download and execute locally over the contract's input-transaction history) and [AO Computer / HyperBEAM](https://permaweb-journal.arweave.net/reference/ao.html) (a hyper-parallel WASM-based compute network whose state is implied by Arweave-anchored, ANS-104-signed message logs) — both run *off* the L1 chain. Cryptographic primitives available to those environments are properties of the runtime, not of an Arweave precompile. Because there is no on-chain signature-verification API at the protocol layer, this category does not apply; the related off-chain signing machinery is covered under Other Features.

## 5. Other Features

### ANS-104 Data-Item Bundles (Bundlr / Irys)

**Grade: F ❌**

[ANS-104](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md) aggregates many user-signed "data items" into a single Arweave L1 transaction, dramatically lowering per-upload cost; the bundling service (originally Bundlr, now Irys) batches and posts the bundle, and each inner data item carries its own signature. ANS-104 data items today support at least three signature families — RSA-PSS-4096 (`PS256_65537`, native Arweave wallets), ECDSA secp256k1 (`ES256K`, Ethereum / Polygon / Base wallets), and Ed25519 (Solana wallets) — with additional EC-family types in some downstream implementations. The `signature_type` field is a 2-byte registry, so adding a post-quantum code point is on paper a backward-compatible extension; no such proposal is currently filed.

**Current state.** Every signature family currently supported in ANS-104 is quantum-vulnerable. Identity systems that build on these signatures (see [Perma DAO's wallet / DID survey](https://medium.com/@perma_dao/wallet-and-did-in-the-arweave-ecosystem-5714877fe745)) inherit the same exposure.

**Planned future work.** No published proposal extends the ANS-104 `signature_type` registry with a post-quantum entry.

### AO Computer / HyperBEAM Signatures

**Grade: F ❌**

[AO Computer](https://permaweb-journal.arweave.net/reference/ao.html) is a decentralized message-passing compute environment whose components — Scheduler Units (SU) ordering messages, Messenger Units (MU) delivering them, and Compute Units (CU) evaluating state transitions — sign assignments and attestations using ANS-104-family signatures. [HyperBEAM](https://hyperbeam.arweave.net/), the from-scratch AO node implementation released as AO-Core in March 2025, additionally uses [RFC 9421 HTTP Message Signatures](https://hyperbeam.arweave.net/) to authenticate every HTTP request and response in the AO mesh, plus TEE attestations for confidential compute. The asymmetric side of every layer in this stack — the ANS-104 envelope signatures, the RFC 9421 signing suites configured by operators, and the EC vendor PKI underlying TEE attestation chains — is quantum-vulnerable.

**Current state.** AO process histories are anchored to Arweave forever, and the signatures binding them are RSA or EC. No published research targets a post-quantum SU / MU / CU signing pipeline or a post-quantum HTTP Message Signatures suite.

**Planned future work.** No post-quantum alternatives are proposed for the AO message envelope, HyperBEAM HTTP signing, or TEE attestation chain.

### Retroactive Permanence

**Grade: F ❌**

Arweave's value proposition is that data, once paid for, is stored *forever* by the endowment-backed mining incentive; the chain is [advertised as a multi-decade storage medium](https://whitepaper.arweave.net/). Every byte ever uploaded carries a signature, and that signature lives on the weave for the chain's lifetime. Unlike a typical L1 where state can be reorganized, pruned, or migrated, Arweave's design *forbids* erasing history. The post-quantum consequence is that once a sufficiently capable quantum computer exists, every historical signature on the weave is forgeable in retrospect: the stored bytes themselves remain integrity-protected (the weave is content-addressed by SHA-256, which Grover only weakens by half), but anyone can produce a forged signature dated to any pre-quantum block height, claiming authorship of any pre-quantum upload, and AO process histories prior to that point cannot be distinguished post-hoc from parallel signed logs constructed by an attacker. This sits separately from the standard "harvest-now-decrypt-later" framing because Arweave's headline guarantee and its cryptographic substrate are on different time horizons.

**Current state.** Every historical signature on the weave is RSA, ECDSA, or Ed25519. There is no mechanism by which a 2019 signature on a 2019 upload can be rotated, re-signed, or replaced.

**Planned future work.** No proposal addresses retroactive forgeability of historical Arweave signatures.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, Arweave's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ✅, P2P ❌, On-Chain ➖, Other ❌.

The trajectory is the opposite of EC sunset: the [2.9.1 hard fork (3 Feb 2025)](https://github.com/ArweaveTeam/arweave/releases) *added* ECDSA secp256k1 as a second EC scheme alongside RSA-PSS at the L1 tx layer, and [ANS-104](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md) continues to onboard additional EC families (Ethereum, Solana, and downstream Cosmos / Aptos types) rather than retiring any. No published plan deprecates RSA-PSS or ECDSA at the protocol layer; no statement from the Digital History Association (the foundation coordinating Arweave protocol releases) or Forward Research proposes an EC retirement schedule; no migration strategy or timeline has been disclosed.

Externally, [Reno et al. (Wiley *Engineering Reports*, 2025)](https://onlinelibrary.wiley.com/doi/full/10.1002/eng2.70259) propose SHA-384 as a quantum-resilience target and **SLH-DSA** (SPHINCS+) as a post-quantum backup signature scheme for an Arweave-like design. This is an external academic proposal layered on top of Arweave's design rather than a commitment from the chain's maintainers.

**Current state.** The EC surface is expanding, not contracting. Consensus has no EC to retire (hash-based SPoRA is unaffected). On-Chain has no protocol-layer surface to retire. P2P, ANS-104, and AO signing all use EC or RSA today with no deprecation in progress.

**Planned future work.** No EC retirement schedule has been published for any category.

## Governance

Arweave does not have on-chain governance. Protocol changes follow off-chain rough consensus among core developers; the reference client lives at [`ArweaveTeam/arweave`](https://github.com/ArweaveTeam/arweave) (Erlang) and hard forks are coordinated by client-version release plus activation block height (the 2.9.1 fork activated at block 1,602,350, [3 Feb 2025](https://github.com/ArweaveTeam/arweave/releases)).

There is no formal proposal series equivalent to EIPs. The closest venues are:

- [Arweave Network Standards (ANS) repository](https://github.com/ArweaveTeam/arweave-standards) — application-layer specs; [ANS-103](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-103.md) documents SPoRA and [ANS-104](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md) documents bundling.
- GitHub issues and pull requests on [`ArweaveTeam/arweave`](https://github.com/ArweaveTeam/arweave) — where consensus-affecting changes are discussed.
- [Arweave releases](https://github.com/ArweaveTeam/arweave/releases) — where fork activation block heights are recorded.

The one historical proposal touching transaction signatures is [PR #309 (2021)](https://github.com/ArweaveTeam/arweave/pull/309), "Support alternative transaction signing methods," which proposed adding ECDSA and Ed25519 to L1 transactions; it was closed unmerged in 2023 when the author deleted their fork, and the underlying design later shipped via the 2.9 hard fork in 2025. No post-quantum signature proposal, EC retirement proposal, or post-quantum ANS-104 `signature_type` proposal currently sits in the Arweave standards repository or the reference client's issue tracker.

---

_Generated on 03 Jun 2026 based on information as of 14 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml) — contact channel pending launch._

_Editorial policy: none currently published._
