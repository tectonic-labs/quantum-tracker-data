# MultiversX (EGLD) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | MultiversX |
| **Ticker** | EGLD |
| **Website** | https://multiversx.com |
| **GitHub** | https://github.com/multiversx |
| **On-chain environment** | WASM (Wasmer-based MultiversX VM; Rust, C, AssemblyScript) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Transaction Signatures | F | ❌ | Not Discussed |
| Consensus | F | ❌ | Not Discussed |
| P2P Networking | F | ❌ | Not Discussed |
| On-Chain Logic | F | ❌ | Not Discussed |
| Other Features | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

MultiversX (formerly Elrond, rebranded November 2022) is a Secure Proof-of-Stake (SPoS) chain with Adaptive State Sharding — three execution shards plus a coordinating metachain — described in the [MultiversX whitepaper](https://multiversx.com/assets/files/multiversx-whitepaper.pdf). All user transactions are signed with Ed25519, consensus uses BLS12-381 multi-signature aggregation, and the WASM VM exposes built-in verifiers for Ed25519, BLS, secp256k1, and (after Spica) secp256r1 / P-256. Every layer of the stack relies on classical elliptic-curve cryptography and is therefore vulnerable to a sufficiently capable quantum adversary.

No MultiversX Foundation post, release note, governance proposal, or improvement-proposal track addressing post-quantum migration has been identified across the [MultiversX blog](https://multiversx.com), [documentation](https://docs.multiversx.com), [agora.multiversx.com governance forum](https://agora.multiversx.com), or the [mx-chain-go](https://github.com/multiversx/mx-chain-go) and [mx-chain-core-go](https://github.com/multiversx/mx-chain-core-go) repositories. MultiversX does not currently propose or implement any post-quantum cryptographic algorithms.

## Proposed and Implemented PQC Algorithms

MultiversX does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Transaction Signatures

**Grade: F ❌**

MultiversX user transactions are signed with Ed25519 (EdDSA over Curve25519) as the sole user-facing signing scheme, per the [signing-transactions documentation](https://docs.multiversx.com/developers/signing-transactions/). Bech32 addresses (`erd1...`) are derived directly from the Ed25519 public key, and the SDK HD derivation path is `m/44'/508'/0'/0'/index'`. There is no native EOA-level multi-signature primitive; multi-signature wallets are implemented as smart contracts on top of the standard Ed25519 account.

MultiversX has a comparatively rich set of protocol-level account-abstraction primitives — all of which add classical Ed25519 signatures rather than replacing them. [Relayed transactions v3](https://docs.multiversx.com/developers/relayed-transactions/) adds a `relayer` and `relayerSignature` field (both Ed25519) so a third party can pay gas. [Guardian accounts](https://docs.multiversx.com/developers/guard-accounts/) attach a second Ed25519 co-signature from a guardian address (with a 20-day activation delay), giving on-chain 2FA. Ed25519 is broken by Shor's algorithm, so each of these surfaces inherits the underlying quantum exposure.

**Current state.** All user transactions, relayed transactions, and guarded transactions use Ed25519. No post-quantum signing scheme is available on mainnet or testnet.

**Planned future work.** No post-quantum transaction-signature proposal has been published. Recent protocol upgrades — Sirius (2024), [Spica v1.8.x](https://multiversx.com/release/release-spica-v1-8-4-0) (2024), and Andromeda (2025) — have focused on scaling, account-abstraction UX, and developer experience, and do not introduce a post-quantum signing path.

## 2. Consensus

**Grade: F ❌**

MultiversX uses [Secure Proof-of-Stake (SPoS) with Adaptive State Sharding](https://multiversx.com/assets/files/multiversx-whitepaper.pdf). The network is partitioned into three execution shards plus a metachain that coordinates cross-shard activity. Each round (~6 seconds), a consensus group of roughly 400 validators per shard is randomly re-selected, and a 2/3+ threshold of signatures finalizes the block in a pBFT-style instant-finality round.

The binding cryptography across this design is BLS12-381 multi-signature aggregation. The block proposer collects BLS signatures from the consensus group and produces an aggregated BLS multi-signature that finalizes the block. Validator identity is itself a BLS public key, registered via the staking smart contract on the metachain — distinct from the Ed25519 key used to sign the operator's transactions ([validators overview](https://docs.multiversx.com/validators/overview/)). The randomness beacon that drives the next round's consensus-group selection is constructed by treating the previous block's aggregated BLS signature as a verifiable random function output.

Because the same BLS12-381 primitive simultaneously underwrites block production, validator identity, the randomness beacon, and metachain notarization of shard headers, a single quantum-capable break of BLS12-381 would compromise consensus signing, the randomness used to assign validators, and cross-shard finality all at once. The blast radius of one cryptographic break is broader than on chains that separate these duties across distinct schemes.

**Current state.** All consensus signing, validator identity, randomness, and metachain notarization rely on BLS12-381 multi-signature aggregation.

**Planned future work.** No post-quantum consensus proposal has been identified in MultiversX release notes, governance posts, or the [mx-chain-go](https://github.com/multiversx/mx-chain-go) repository.

## 3. P2P Networking

**Grade: F ❌**

MultiversX node-to-node networking uses [libp2p](https://github.com/multiversx/mx-chain-go) (Go implementation) with Kademlia-style DHT for peer discovery. Validator nodes carry two distinct keypairs: a BLS keypair for consensus signing, and a separate classical libp2p peer-identity key (Ed25519 or secp256k1, per libp2p convention). Transport security uses libp2p's standard Noise / TLS 1.3 handshake stack, which combines X25519 ECDH for key agreement with Ed25519 or secp256k1 for peer-ID authentication. All of these components are elliptic-curve based and quantum-vulnerable.

**Current state.** Peer identity, handshake, and transport encryption rely on classical EC primitives via the standard libp2p configuration.

**Planned future work.** No post-quantum handshake or peer-identity proposal has been identified for `mx-chain-go` or `mx-chain-core-go`.

## 4. On-Chain Logic

**Grade: F ❌**

MultiversX smart contracts execute in a Wasmer-based WASM VM (originally branded **Arwen**, renamed the MultiversX VM after the rebrand). Contracts are typically compiled from Rust. The VM exposes signature-verification host functions documented under [built-in functions](https://docs.multiversx.com/developers/built-in-functions/): `managedVerifyEd25519`, the `managedVerifyBLS` family (single, share, and aggregated), `managedVerifySecp256k1`, and — after the Spica upgrade — `managedVerifySecp256r1` / `managedVerifyP256` for secp256r1 / P-256 verification. Hash built-ins cover SHA-256, Keccak-256, and RIPEMD-160. No post-quantum signature-verification primitive is currently exposed as a built-in.

There is one architectural detail worth flagging for future work. The [Spica on-chain passkeys release](https://multiversx.com/blog/what-are-onchain-passkeys) (v1.8.x, 2024) explicitly added VM opcodes so smart contracts can verify additional signature schemes beyond the original Ed25519 / BLS / secp256k1 set — the immediate target being P-256 / WebAuthn passkeys. The same opcode surface could in principle host a post-quantum verifier as an additional supported scheme, without requiring a hardfork to introduce a new built-in. No such verifier has been deployed or announced, but the surface area for adding one exists.

**Current state.** Built-in signature verification is limited to Ed25519, BLS12-381, secp256k1, and (post-Spica) secp256r1 / P-256. No post-quantum verifier is shipped as a built-in or as a deployed smart contract.

**Planned future work.** No post-quantum on-chain verifier has been proposed in MultiversX blog posts, release notes, or governance threads. The architectural extension point added by Spica is documented as a passkey / WebAuthn capability, not a post-quantum one.

## 5. Other Features

### Adaptive State Sharding

**Current state.** Adaptive State Sharding splits state and execution across three shards plus a coordinating metachain. Validators are re-shuffled across shards each epoch, cross-shard transactions are routed via miniblocks, and shard headers are notarized on the metachain. Block-level finality inside a shard uses BLS12-381 aggregate signatures; cross-shard finality is achieved by metachain BLS notarization of shard headers. A quantum break of BLS12-381 would therefore compromise not just one shard but the consistency of the sharded state across the whole system.

**Planned future work.** No post-quantum signature-aggregation scheme is proposed or implemented for shard or metachain finality.

### EGLD Bridge

**Current state.** The EGLD bridge (Safe / ERC-20 bridge between MultiversX and Ethereum-style chains) is a lock-and-mint bridge. On the MultiversX side, an n-of-m relayer set signs smart-contract calls with Ed25519. On the Ethereum side, a Safe-style multi-signature of relayer addresses signs with secp256k1 ECDSA. Both halves are classical EC, so a quantum break on either chain compromises the relayer set and could allow forged bridge attestations and unbacked mints on the destination chain.

**Planned future work.** No post-quantum bridge-attestation scheme has been published.

### ESDT (MultiversX Standard Digital Token)

**Current state.** ESDT is the protocol-level fungible and non-fungible token standard. It does not introduce cryptography beyond the chain's transaction-signing scheme (Ed25519) and consensus (BLS12-381), and therefore inherits — rather than amplifies — those exposures.

**Planned future work.** No ESDT-specific cryptographic change is proposed.

### Sovereign Chains

**Current state.** [Sovereign Chains](https://docs.multiversx.com/sovereign/overview/) are application-specific sidechains based on the MultiversX stack that settle to MultiversX mainnet. Public design materials describe them as reusing the same BLS-based SPoS consensus and Ed25519 user-transaction signing as mainnet. There is no documented configuration option in the Sovereign Chains specification to swap in alternative signature schemes, so any Sovereign Chain deployment today inherits the full classical EC surface of mainnet.

**Planned future work.** No post-quantum configuration option for Sovereign Chains has been announced.

## 6. EC Sunset

**Grade: F ❌**

> Adding PQC alongside EC is not the same as retiring EC. For reference, this chain's PQC-adoption ratings per category are: Tx Signatures ❌, Consensus ❌, P2P ❌, On-Chain ❌, Other ❌.

We have found no public information indicating an EC retirement plan for MultiversX. No deprecation timeline has been published for Ed25519 user transactions, BLS12-381 consensus signing, libp2p classical peer identity, or the EC-based VM built-ins. The Sirius, Spica, and Andromeda release tracks are oriented toward scaling, account-abstraction UX, and developer experience, and do not include EC-retirement milestones.

If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Governance

MultiversX governance is foundation-led, with protocol upgrades developed by MultiversX core maintainers on [mx-chain-go](https://github.com/multiversx/mx-chain-go) and ratified by an on-chain validator and staker vote at fork activation. Community discussion takes place on the [agora.multiversx.com forum](https://agora.multiversx.com) and via release-note blog posts on [multiversx.com](https://multiversx.com).

There is no formal MultiversX Improvement Proposal (MIP) repository analogous to EIPs or BIPs; protocol proposals surface as release-note posts and GitHub pull requests, with on-chain votes gating activation. Recent upgrade milestones on the public record include the Sirius release (2024), the [Spica v1.8.x release](https://multiversx.com/release/release-spica-v1-8-4-0) (2024) — which added on-chain passkey opcodes and was ratified by an on-chain vote per the release announcement — and the Andromeda release (2025). No proposal targeting post-quantum migration has been identified in this venue.

---

_Generated on 14 May 2026 based on information as of 14 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_contact channel pending launch_

_Editorial policy: none currently published._
