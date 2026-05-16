# Worldcoin (WLD) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Worldcoin |
| **Ticker** | WLD |
| **Asset class** | Identity |
| **Issuer** | World Foundation (Cayman Islands), with Tools for Humanity as the contributor / development arm and World Assets, Ltd. as the issuing subsidiary. |
| **Host chain(s)** | Ethereum, Optimism (OP Mainnet), World Chain. |
| **Website** | https://world.org/worldcoin-token |
| **GitHub** | https://github.com/worldcoin |
| **Contract address** | `0x163f8C2467924be0ae7B5347228CABF260318753` (canonical issuance on Ethereum). |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

WLD is the identity and grant token of the World project. It is canonically issued on Ethereum and bridged to Optimism (OP Mainnet) and World Chain. A token cannot be more quantum-safe than the chain it runs on — host-chain inheritance sets the ceiling for what WLD's posture can be, and the surfaces the issuer directly controls (the contract owner key, the bridge paths, the World ID claim machinery) set the floor. Today both are exposed: Ethereum, the only host with a stand-alone evaluation, is rated ❌, and every issuer-controlled surface relies on elliptic-curve cryptography with no migration on the public record.

The WLD contract itself is a non-upgradable ERC-20 with a narrow but high-impact privileged surface — a single owner multisig that can mint the initial supply and assign a future inflation minter. Beyond the token contract, WLD's grant-claim flow depends on World ID, a zero-knowledge identity system built on the Semaphore protocol with a Groth16 proving system over the BN254 pairing curve, which is quantum-vulnerable. We found no World Foundation or Tools for Humanity statement, governance proposal, audit, or roadmap committing to post-quantum cryptography for any of these surfaces.

## Proposed and Implemented PQC Algorithms

WLD does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

WLD is canonically issued on [Ethereum](../chains/l1/ethereum.md) and bridged to Optimism (OP Mainnet) and World Chain via the OP Stack Standard Bridge. The token's transaction-signing, consensus, and networking exposure are properties of those host chains, not of the token issuer — and a token cannot be more quantum-safe than the chain it executes on. The host chain is the ceiling.

Of WLD's three hosts, only Ethereum has a stand-alone public evaluation, and it is rated ❌ — its worst category is its peer-to-peer networking layer, where node identity uses `secp256k1`, while signatures, consensus, and on-chain verification carry a roadmapped status. Optimism and World Chain are OP Stack Layer 2s; neither has a stand-alone evaluation in this knowledge base. They inherit Ethereum's settlement-signing posture for the canonical bridge, and their sequencer, proposer, and challenger key sets are ECDSA `secp256k1`. World Chain runs a standard OP Stack with a centralized sequencer/proposer operated by the project; [L2BEAT](https://l2beat.com/scaling/projects/world) notes only one entity is currently allowed to propose blocks.

**Current state.** The aggregate is the worst stoplight across the evaluated hosts. Ethereum rates ❌, and the unrated OP Stack Layer 2s do not change the floor, so the aggregate is ❌.

**Planned future work.** Ethereum carries a roadmapped status on its signature, consensus, and on-chain verification categories — see its [public report](../chains/l1/ethereum.md) for detail. No host-chain migration is recorded for Optimism or World Chain.

WLD's contract addresses are `0x163f8C2467924be0ae7B5347228CABF260318753` on [Ethereum](https://etherscan.io/token/0x163f8c2467924be0ae7b5347228cabf260318753), `0xdc6ff44d5d932cbd77b52e5612ba0529dc6226f1` on [Optimism](https://optimistic.etherscan.io/token/0xdc6ff44d5d932cbd77b52e5612ba0529dc6226f1), and `0x2cfC85d8E48F8EAB294be644d9E25C3030863003` on [World Chain](https://worldscan.org/address/0x2cfc85d8e48f8eab294be644d9e25c3030863003); the project [completed its migration to OP Mainnet in 2023](https://world.org/blog/announcements/worldcoin-completes-migration-op-mainnet).

## 2. Admin / Privileged Roles

**Grade: F ❌**

The WLD token contract on Ethereum ([`worldcoin/worldcoin-token`](https://github.com/worldcoin/worldcoin-token)) is a non-upgradable ERC-20 inheriting OpenZeppelin's `Ownable2Step`. There is no proxy, no blacklist, no freeze, and no pause. The privileged surface is narrow but high-impact:

- `mintOnce` — an owner-only initial mint, capped at the initial supply cap, already exercised at deployment to populate the foundation, community, team, and investor allocations.
- `setMinter` — owner-only; sets a single address eligible to call `mintInflation` after a 15-year inflation-unlock time (post-2038). Until then, no inflation can be minted at all, subject to an annual cap of at most 1.5% once it unlocks.
- `renounceOwnership` — explicitly reverts; ownership cannot be renounced.

**Current state.** The on-chain owner of the WLD contract is `0x59a0f98345f54bAB245A043488ECE7FCecD7B596`, identified by [third-party analysis](https://medium.com/@MetatrustL/only-1-owner-of-multi-signed-contract-worldcoin-may-involve-centralized-risks-12e1f5b1d570) as a 1-of-1 Gnosis Safe with a single signer EOA, `0xc534a745bFfaF9466Ed7B47fA23B0177b99A3e77`. Both are standard `secp256k1` ECDSA. The 1-of-1 configuration was flagged in 2023 as a centralization risk; no public rotation to a higher-threshold Safe has been announced. The team, investor, community, and reserve allocations sit in passive `VestingWallet` contracts that release tokens linearly; their beneficiary addresses are EOAs and multisigs controlled by the project's entities, all `secp256k1`. The Optimism and World Chain representations are `OptimismMintableERC20` instances whose mint and burn authority is the L2 Standard Bridge predeploy rather than a separate owner — that authority is rated in Category 3. No World Foundation, Tools for Humanity, or World Assets statement, governance proposal, audit, or roadmap addresses the owner key or the minter slot, and no concrete post-quantum proposal currently exists for these surfaces.

## 3. Cross-Chain Mechanism

**Grade: F ❌**

WLD's canonical cross-chain rail is the [OP Stack Standard Bridge](https://docs.optimism.io/app-developers/bridging/standard-bridge) to its two OP Stack host Layer 2s, Optimism and World Chain.

**Current state.** On the Ethereum side, the L1 Standard Bridge contract escrows WLD on lock and releases it on withdrawal finalization, with standard Optimism `secp256k1` ECDSA signing across the sequencer, batcher, proposer, and challenger roles. On the Layer 2 side, the L2 Standard Bridge predeploy mints and burns the bridged representation, and bridge messages are settled through the L1 fault-proof system per the [OP Stack bridges spec](https://specs.optimism.io/protocol/bridges.html); [World Chain](https://l2beat.com/scaling/projects/world) currently runs permissioned fault proofs with a small challenger set. Canonical withdrawals carry roughly a 7-day fault-proof window. For faster transfers, World Foundation documentation names [Across as the recommended third-party bridge](https://docs.world.org/world-chain/providers/bridges) for WLD; Across uses an ECDSA-attested optimistic relayer model, and other advertised third-party paths include Brid.gg, Superbridge, Synapse, Hyperlane, LayerZero, Chainlink CCIP, and Thirdweb Universal Bridge. The cryptographic chokepoint for canonical transfers is the OP Stack sequencer/proposer key set and Ethereum L1 ECDSA signing. No World Foundation or Tools for Humanity commitment exists to migrate the OP Stack signing roles or any third-party bridge attestation scheme WLD is exposed to, and no concrete post-quantum proposal currently exists for this surface.

## 4. Reserve / Custody

**Grade: ➖**

WLD is unbacked. Its circulating supply does not expand from external reserves; it grows through orb-verified user grant claims and the linear unlocking of team, investor, contributor, and reserve allocations from `VestingWallet` contracts, with no further mint authority until 2038. There is no off-chain reserve — no T-bills, cash, or real-world assets — whose holdings need to be cryptographically pushed on-chain, so there is no custody-to-chain surface to rate. The only privileged signing surface, the owner key, is rated in Category 2.

## 5. Other Token-Specific Crypto

**Grade: F ❌**

WLD has a meaningful token-specific cryptographic surface beyond the categories above: the World ID claim path that gates user-side WLD grants.

**Current state.** World ID uses the **Semaphore** protocol with a Groth16 proving system over the BN254 pairing curve. Two anonymity sets are maintained — one for orb-verified humans and one for phone-verified devices. To claim a WLD grant, a user submits a Semaphore proof of inclusion in the orb anonymity set without revealing their identity commitment, and the on-chain verifier accepts only valid Groth16 proofs. BN254 is a pairing-friendly curve whose security rests on the discrete logarithm problem, which Shor's algorithm breaks; because the verifier accepts any valid Groth16 proof, a quantum attacker able to forge membership proofs could affect the claim mechanism retroactively, not just future grants. Merkle-root updates for the World ID anonymity sets propagate from Ethereum to the Layer 2 deployments through the [`world-id-state-bridge`](https://github.com/worldcoin/world-id-state-bridge) repository, which uses standard ECDSA-attested Layer 2 bridge primitives and is part of the same claim path. Separately, the project's off-chain Anonymized Multi-Party Computation (AMPC) system, run with academic compute partners, processes iris codes using information-theoretically secure secure multi-party computation; the [World Foundation describes AMPC as "quantum secure"](https://world.org/blog/engineering/introducing-ampc-another-leap-privacy-performance-world-id), but that claim is specific to off-chain biometric processing and does not extend to the on-chain Semaphore Groth16 verifier or to any EC keys in the token, bridge, or admin paths. The Worldcoin protocol cryptography has been the subject of a [Least Authority audit](https://leastauthority.com/wp-content/uploads/2023/07/Worldcoin_Protocol_Cryptography_Final_Audit_Report.pdf). No World Foundation or Tools for Humanity statement commits to migrating Semaphore off its current proving system to a post-quantum proof system, and no concrete post-quantum proposal currently exists for this surface. Background on the Semaphore design is in the project's [World ID overview](https://world.org/blog/world/intro-zero-knowledge-proofs-semaphore-application-world-id) and the [L2BEAT ZK Catalog entry](https://l2beat.com/zk-catalog/worldcoin-semaphore).

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to retire elliptic-curve cryptography on the token's own surfaces — the admin keys, the bridge attestors, and the custody-to-chain signing path — which is distinct from whether the token is adopting post-quantum cryptography.

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ❌.

**Current state.** We found no World Foundation, Tools for Humanity, or World Assets statement committing to retire EC primitives on any token-controlled surface. The owner key remains a `secp256k1` Gnosis Safe with no rotation plan; the foundation, contributor, investor, and team vesting beneficiary EOAs have no rotation plan; the Layer 2 bridge representations accept the OP Stack ECDSA sequencer, proposer, and challenger set as-is; the Semaphore Groth16 verifier over BN254 has no announced migration; and the World ID state bridge has no announced migration. The "quantum secure" framing for the off-chain AMPC iris-data pipeline is a property of that biometric pipeline and is not an EC-retirement commitment for any of these surfaces. We reviewed the [token repository](https://github.com/worldcoin/worldcoin-token), the [project documentation](https://docs.world.org/), and the [project blog](https://world.org/blog/) and located no EC-sunset commitments.

## Issuer & Governance

The World ecosystem has three primary entities. **Tools for Humanity** is a Delaware corporation with a German subsidiary, acting as the contributor and development arm of the protocol and maintaining the [`worldcoin-token` repository](https://github.com/worldcoin/worldcoin-token). The **World Foundation** (formerly Worldcoin Foundation) is a Cayman Islands exempted limited-guarantee foundation company, described as memberless, acting as steward of the community-allocated WLD until the protocol becomes self-sufficient, and is the sole member and director of **World Assets, Ltd.**, the subsidiary responsible for issuing the community-allocated WLD and operating a designated multisig wallet for settlement transactions.

On-chain governance of the WLD token contract itself is minimal: the contract is non-upgradable and has no on-chain voting. There is no DAO, no `ERC20Votes`, and no governance proposals dictating token contract behavior — the owner multisig's single signer controls the already-exercised initial mint and the future minter slot. Product and protocol information is disclosed through the [project blog](https://world.org/blog/) and [documentation](https://docs.world.org/). We found no World Foundation governance proposal, improvement-proposal-equivalent, or developer-blog post that surfaces PQC migration or EC retirement as a commitment-track topic for any WLD-controlled surface, and no dated, on-record PQC milestone published by the issuer. The closest adjacent statement is the AMPC "quantum secure" framing for off-chain iris-data SMPC, which is scoped to biometric privacy rather than the token, admin keys, or Semaphore verifier.

---

_Generated on 16 May 2026 based on information as of 13 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
