# ADI — Public PQC Readiness Report

| | |
|---|---|
| **Name** | ADI |
| **Asset class** | Utility |
| **Issuer** | ADI Foundation |
| **Host chain(s)** | Ethereum (canonical ERC-20) |
| **Website** | https://www.adi.foundation/ |
| **Contract address** | `0x8b1484d57abbe239bb280661377363b03c89caea` (Ethereum) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | D | ⚠️ | Discussed |
| EC Sunset | F | ❌ | Not Discussed |

ADI is the base and gas token of ADI Chain, an Ethereum Layer 2 zk rollup, and is canonically issued on Ethereum as an upgradeable ERC-20 at `0x8b1484d57abbe239bb280661377363b03c89caea`. Because the token executes on Ethereum, its transaction-signing, consensus, and networking exposure are inherited from Ethereum — a token cannot be more quantum-safe than the chain it runs on, so the host chain is the ceiling on ADI's overall posture. On the surfaces the ADI Foundation directly controls — the upgradeable token contract, the multisig administrators, and the L1↔L2 bridge — the cryptography in use today is classical: secp256k1 ECDSA for multisig and validator signing, and BLS12-381 pairings in the on-chain proof verifier.

Where ADI stands out is its proving stack: ADI Chain's Airbender prover is a STARK/FRI system over the Mersenne31 prime field with hash-based commitments, a design whose security reduces to hash-function collision resistance rather than to discrete-log or pairing hardness. That inner proving system is plausibly post-quantum-secure. However, the final on-chain settlement proof is wrapped into an EC-pairing-based SNARK before posting to Ethereum, so the on-chain settlement path remains quantum-vulnerable. No ADI Foundation-attributable PQC roadmap, migration plan, or EC-retirement schedule was found across the foundation's site, documentation portal, or whitepaper.

## Proposed and Implemented PQC Algorithms

ADI does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

ADI is canonically issued on **Ethereum** as an upgradeable ERC-20, and it doubles as the base and gas token of ADI Chain, an Ethereum Layer 2 zk rollup built on the ZK Stack. The token's transaction signing, consensus participation, and peer-to-peer networking are properties of Ethereum, not of the ADI Foundation — these surfaces belong to the host chain's evaluation, not the token's. This is the host-chain-is-the-ceiling principle in practice: ADI cannot be more quantum-safe than Ethereum, the chain it executes on.

**Current state.** Ethereum is the sole evaluated host for the canonical ERC-20 ([CoinGecko](https://www.coingecko.com/en/coins/adi-token) lists Ethereum as the only host platform). The token contract lives at [`0x8b1484d57abbe239bb280661377363b03c89caea`](https://etherscan.io/token/0x8b1484d57abbe239bb280661377363b03c89caea). ADI Chain (the L2) consumes the same token for gas, but the L2-side representation is the L1 ERC-20 bridged through the standard ZK Stack base-token vault — it is not a separate host listing. Because there is a single evaluated host, the host-chain aggregate rating reflects Ethereum's worst category exposure, which is at the F level. There is no multi-host distribution to interpret.

**Planned future work.** No host-chain migration milestone is recorded in the source material for ADI's relationship to its host chain.

## 2. Admin / Privileged Roles

**Grade: F ❌**

The ADI ERC-20 is not a fixed-bytecode token. It is an OpenZeppelin ERC1967 / UUPS upgradeable proxy, with an implementation contract at `0x9cb8142aebbcdc60af7c97af897a67a8f3ca71c2` that has been upgraded at least twice since the November 2025 deployment. AccessControl roles on the implementation gate mint, pause, and upgrade operations, which means the parties holding those roles can change the token's behavior.

**Current state.** Per ADI's [published L1 contract roster](https://docs.adi.foundation/how-to-start/network-contracts), the control stack includes the Base Token, a ZK Stack Diamond Proxy, a Governance contract, a Chain Admin, a Proxy Admin, and a Validator Timelock. [L2BEAT](https://l2beat.com/scaling/projects/adi) reports that ADI Chain is administered by two 2-of-3 Gnosis Safe multisigs that share the same three signers, and that a security-council externally owned account can execute upgrades without delay. The documented upgrade delay is currently zero seconds, which L2BEAT flags as a critical risk. ADI token holders have no on-chain governance role over the contract. All of this admin cryptography — Gnosis Safe owner signatures, the security-council account, and validator timelock submissions — uses secp256k1 ECDSA. No ADI-attributable governance proposal, vendor proof-of-concept, or audit recommendation discussing a post-quantum migration of these admin keys was located, so no concrete post-quantum proposal currently exists for this surface. The ERC1967 proxy and AccessControl structure can be inspected via [Etherscan](https://etherscan.io/token/0x8b1484d57abbe239bb280661377363b03c89caea#code).

## 3. Cross-Chain Mechanism

**Grade: F ❌**

ADI is canonical on Ethereum, and its cross-chain surface is the ADI Chain L1↔L2 bridge itself: the Ethereum ERC-20 is the asset vaulted by the L2 to mint gas and settle withdrawals.

**Current state.** Deposits push the ERC-20 into the L1 ERC20 Bridge; withdrawals are gated by L2 state-root commitments posted by the multisig-controlled ADI validator set and verified on L1 by an SNARK verifier. That verifier — the on-chain Dual Verifier — is built on BLS12-381 elliptic-curve pairings, which are quantum-vulnerable, and validator submissions to the timelock are ECDSA-signed. The bridge, asset router, diamond proxy, dual verifier, and validator timelock addresses are listed in ADI's [L1 contract roster](https://docs.adi.foundation/how-to-start/network-contracts), and the proof-system and validator-set details are described by [L2BEAT](https://l2beat.com/scaling/projects/adi) and the [Airbender documentation](https://docs.adi.foundation/adi-network-components/airbender). ADI does not appear, as of this evaluation, on third-party generic bridges; [CoinGecko](https://www.coingecko.com/en/coins/adi-token) lists Ethereum as the sole host platform. No ADI-attributable post-quantum work on the L1↔L2 bridge cryptography, the validator attestation scheme, or the on-chain verifier was located, so no concrete post-quantum proposal currently exists for this surface.

## 4. Reserve / Custody

**Grade: ➖**

ADI is an unbacked Layer 2 base and gas token with a fixed-supply genesis mint of roughly one billion ADI. There is no off-chain reserve, no audited backing, and no custody-to-chain attestation pipeline — the L1 ERC-20 is itself the canonical token, not a representation of an off-chain claim. The mint authority that does exist is a property of the upgradeable proxy and is covered under Admin / Privileged Roles. Because there is no off-chain custody linked to the on-chain contract, this category does not apply. See [Etherscan](https://etherscan.io/token/0x8b1484d57abbe239bb280661377363b03c89caea) for total supply and the absence of reserve attestations, and the [ADI whitepaper](https://docs.adi.foundation/whitepaper) for the base-token model.

## 5. Other Token-Specific Crypto

**Grade: D ⚠️**

The Airbender prover that secures ADI Chain — and therefore gates L2-to-L1 withdrawals of the ADI ERC-20 — is a **STARK/FRI** system over the Mersenne31 prime field with Blake2s and Blake3 hashing. A STARK/FRI construction over a prime field with collision-resistant hashes reduces its security to hash-function collision resistance rather than to discrete-log or pairing hardness, which is the canonical profile of a plausibly post-quantum-secure proof system.

**Current state.** The inner proving system is hash-based, but the final on-chain settlement proof is not a STARK. Airbender wraps the FRI proof into an EC-pairing-based SNARK before posting to Ethereum, and the on-chain Dual Verifier is a pairing-based pair built on BLS12-381. The pairing-based outer wrapper on the settlement path is quantum-vulnerable regardless of the inner STARK's properties. ADI's [Airbender documentation](https://docs.adi.foundation/adi-network-components/airbender) describes the proving stack in technical detail but does not surface a post-quantum posture statement, a STARK-only settlement roadmap, or a plan to replace the pairing-based outer wrapper with a pairing-free verifier; the on-chain Dual Verifier topology is described by [L2BEAT](https://l2beat.com/scaling/projects/adi). The choice of a hash-based proving system reads as partial post-quantum awareness — the transparent, post-quantum security model for STARKs is set out in the [foundational STARK paper](https://eprint.iacr.org/2018/046.pdf) — but the EC-pairing wrapper on the settlement path limits the net post-quantum benefit.

**Planned future work.** No ADI-attributable plan to replace the pairing-based settlement wrapper with a pairing-free verifier was located in the source material.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to retire elliptic-curve cryptography on the token's own surfaces — multisig signers, bridge attestors, and custody-to-chain signing — which is distinct from whether the token is adding post-quantum cryptography.

**Current state.** No ADI Foundation-attributable plan to retire elliptic-curve cryptography was found for the Gnosis Safe multisig signers (secp256k1 ECDSA), the security-council account, the validator timelock submissions (ECDSA), the on-chain Dual Verifier (BLS12-381 pairings), or the L1 ERC20 Bridge and asset-router attestation pathway. The [ADI Foundation site](https://docs.adi.foundation/), documentation portal, and [whitepaper](https://docs.adi.foundation/whitepaper) do not present an EC-retirement milestone for any of these surfaces. The Mersenne31 hash-based STARK core is the closest thing to a post-quantum-positive design choice on the stack, but it does not retire any elliptic-curve surface — it keeps the inner proving system quantum-friendly while the settlement path and admin keys remain EC-based ([L2BEAT](https://l2beat.com/scaling/projects/adi) describes the multisig and verifier topology).

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ⚠️.

## Issuer & Governance

ADI is stewarded by the **ADI Foundation**, which operates ADI Chain and controls the upgrade multisigs.

Governance of ADI Chain is off-chain to the ADI token: per [L2BEAT](https://l2beat.com/scaling/projects/adi), the governance process does not involve ADI token holders. Upgrades are managed by the L1 Governance smart contract (`0x7200b8b09950b27bdf785c4c8e592c4ab141e5f7`), driven by one of the 2-of-3 Gnosis Safe multisigs; the other multisig handles operator roles, fees, censorship parameters, and data-availability mode. The security-council account can fast-track proposals with zero delay, and L2BEAT flags the absence of a real upgrade delay as a critical trust assumption.

The ADI Foundation publishes a [whitepaper](https://docs.adi.foundation/whitepaper), [ecosystem documentation](https://docs.adi.foundation/), and a [public-facing site](https://www.adi.foundation/), positioning ADI Chain as infrastructure for government, enterprise, and institutional deployments. Product and contract details — including the L1 contract roster — are disclosed through the documentation portal, which is where any future post-quantum commitment would be expected to surface. No post-quantum posture, migration plan, or EC-retirement schedule appears in the surfaced material.

---

_Generated on 16 May 2026 based on information as of 14 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
