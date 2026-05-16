# H (Humanity Protocol) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | H (Humanity Protocol) |
| **Asset class** | Identity |
| **Issuer** | Human Institute (with the Humanity Protocol Foundation as community/ecosystem steward) |
| **Host chain(s)** | Ethereum and BNB Smart Chain (ERC-20 / BEP-20 representations); the native chain is the Humanity Mainnet zkEVM L2 (Polygon CDK). |
| **Website** | https://www.humanity.org/h-token |
| **GitHub** | https://github.com/humanity-org |
| **Contract address** | Ethereum: `0xcf5104D094e3864CfCBDa43B82e1cEFD26A016eB`; BNB Smart Chain: `0x44f161ae29361e332dea039dFa2F404e0bc5b5cc` |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

H is the identity and governance token of Humanity Protocol, a proof-of-personhood network. It is natively issued on the Humanity Mainnet zkEVM L2 and is also deployed as an ERC-20 on Ethereum and a BEP-20 on BNB Smart Chain. A token cannot be more quantum-safe than the chain it runs on, so the host chains set the ceiling for H's posture — and both Ethereum and BNB Smart Chain currently carry quantum-vulnerable surfaces. On top of that inherited exposure, the surfaces the issuer itself controls — the token contracts' upgrade and mint authority, the bridges H rides between chains, and the Human ID credential cryptography that is part of the token's intended utility — are all built on classical elliptic-curve cryptography today.

Across every category the issuer controls, no public migration plan was found. The token contracts on both chains are upgradeable proxies whose owner and proxy-admin authority is a `secp256k1` multisig; cross-chain movement runs over elliptic-curve-signed bridges; and the Human ID identity and credential path relies on the Baby Jubjub curve and Groth16 zk-SNARK proofs over BN254 pairings, both of which are broken by Shor's algorithm. We found no Human Institute or Humanity Protocol Foundation statement, governance proposal, or roadmap that commits to post-quantum cryptography or to retiring elliptic-curve cryptography on any H-controlled surface.

## Proposed and Implemented PQC Algorithms

H does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

H is canonically issued on the Humanity Mainnet zkEVM L2 (a Polygon CDK chain) and is also deployed as an ERC-20 on [Ethereum](../chains/l1/ethereum.md) — contract `0xcf5104D094e3864CfCBDa43B82e1cEFD26A016eB` — and a BEP-20 on [BNB Smart Chain](../chains/l1/bnb-chain.md) — contract `0x44f161ae29361e332dea039dFa2F404e0bc5b5cc`. A token's transaction signing, consensus, and networking exposure are properties of the chain it executes on, not of the token issuer. H inherits whatever quantum exposure those host chains carry, and it cannot be more quantum-safe than the least-ready chain it runs on.

**Current state.** Of the two host chains evaluated, BNB Smart Chain is the worse: it has unmigrated exposure across peer-to-peer networking, on-chain verification capability, other chain-specific surfaces, and elliptic-curve sunset. Ethereum's worst surface is its peer-to-peer node identity, which still uses `secp256k1`. Because the two chains do not sit at the same level — BNB Smart Chain is the single worst host — the aggregate is anchored to BNB Smart Chain. The native Humanity Mainnet L2 is a Polygon CDK zkEVM and is not separately evaluated here; its sequencer and aggregator signing inherit Polygon CDK's `secp256k1` ECDSA posture.

**Planned future work.** Ethereum has roadmap and in-development activity on several of its surfaces. BNB Smart Chain has in-development work on transaction signatures and consensus. Readers should consult the individual chain reports for the current detail on each host.

Sources:
- [H Ethereum contract](https://etherscan.io/token/0xcf5104d094e3864cfcbda43b82e1cefd26a016eb)
- [H BNB Smart Chain contract](https://bscscan.com/token/0x44f161ae29361e332dea039dfa2f404e0bc5b5cc)
- [H token page](https://www.humanity.org/h-token)
- [Polygon CDK launch context](https://cointelegraph.com/news/animoca-polygon-humanity-protocol-zkp)

## 2. Admin / Privileged Roles

**Grade: F ❌**

Both the Ethereum and BNB Smart Chain H token contracts are `BMToken` instances deployed behind OpenZeppelin's [TransparentUpgradeableProxy](https://github.com/humanity-org/hp-basic-token). The user-facing address delegates to a separate implementation, and a separate ProxyAdmin contract is the only address that can repoint the proxy at a new implementation. The `BMToken` implementation is a standard OpenZeppelin `Ownable` ERC-20 with `mint` and `burn` restricted to the owner. There is no on-chain pause, no blacklist, and no time-locked governance contract sitting in front of the owner — privilege concentrates in the multisig and in the ProxyAdmin it controls.

**Current state.** Humanity Protocol's published tokenomics documentation states that the [Human Institute uses a 3-of-5 multisig wallet](https://humanity-protocol.gitbook.io/humanity-protocol-w-tokenomics/tokenomics) to execute treasury and protocol operations, and the same 3-of-5 multisig pattern is described as the owner of the `BMToken` proxy and proxy-admin pair on both chains. That multisig is a `secp256k1` Safe-style wallet on each host. The fixed 10B H supply is split across team, investor, foundation, ecosystem, and liquidity buckets released through vesting wallets — with the next on-schedule [unlock noted for 25 May 2026](https://www.kucoin.com/news/articles/humanity-protocol-token-unlock-strategic-market-supply-dynamics-for-h-holders) — and those vesting beneficiaries are EOAs and multisigs that are all `secp256k1`. The same `BMToken` architecture appears on both Ethereum and BNB Smart Chain. We found no Human Institute or Humanity Protocol Foundation statement, governance proposal, audit, or roadmap that commits to post-quantum cryptography for the owner multisig, the ProxyAdmin owner, or the upgrade path.

Sources:
- [Ethereum proxy](https://etherscan.io/address/0xcf5104d094e3864cfcbda43b82e1cefd26a016eb)
- [BNB Smart Chain proxy](https://bscscan.com/token/0x44f161ae29361e332dea039dfa2f404e0bc5b5cc)
- [`BMToken` source — proxy / proxy-admin / multisig-Safe architecture](https://github.com/humanity-org/hp-basic-token)
- [3-of-5 Human Institute multisig](https://humanity-protocol.gitbook.io/humanity-protocol-w-tokenomics/tokenomics)
- [Vesting / supply schedule](https://tokenomist.ai/humanity)
- [25 May 2026 unlock](https://www.kucoin.com/news/articles/humanity-protocol-token-unlock-strategic-market-supply-dynamics-for-h-holders)

## 3. Cross-Chain Mechanism

**Grade: F ❌**

H has three relevant cross-chain surfaces.

**Current state.** The native deployment on the Humanity Mainnet zkEVM bridges to Ethereum over the [Polygon CDK Unified Bridge](https://docs.polygon.technology/cdk/concepts/bridging/) (also known as the LxLy bridge), a shared smart contract on Ethereum that handles asset and message claims for every Polygon CDK chain. Its signing surfaces — sequencer, aggregator, and the data-availability committee if the chain is a validium — are `secp256k1` ECDSA, and its on-chain verifier checks Groth16 zk-SNARK proofs over BN254 pairings. As a Polygon CDK chain, Humanity Mainnet also inherits [AggLayer](https://www.agglayer.dev/blogs/aggregated-blockchains-fix-the-layer-1-vs-layer-2-debate-by-unifying-web3) cross-chain semantics, whose [unified-bridge contract and pessimistic proof system](https://support.polygon.technology/support/solutions/articles/82000917039-bridging-interoperability-cdk-lxly-bridge-unified-bridge-agglayer-) are likewise ECDSA- and BN254-Groth16-based.

For movement between the Ethereum ERC-20 and the BNB Smart Chain BEP-20, no issuer-published canonical burn-and-mint bridge links the two `BMToken` proxies. Mint authority on each chain is the Human Institute multisig described in the previous section, and supply on each chain is administered independently from the issuer side. Users moving H between Ethereum and BNB Smart Chain rely on third-party generic bridges, whose attestor sets are ECDSA. We found no Humanity Protocol or Human Institute statement that commits to post-quantum cryptography for the Unified Bridge, the L2 sequencer and aggregator signing keys, or any third-party bridge path that H rides.

Sources:
- [CDK Unified (LxLy) Bridge architecture](https://docs.polygon.technology/cdk/concepts/bridging/)
- [Unified Bridge / AggLayer overview](https://support.polygon.technology/support/solutions/articles/82000917039-bridging-interoperability-cdk-lxly-bridge-unified-bridge-agglayer-)
- [AggLayer cross-chain model](https://www.agglayer.dev/blogs/aggregated-blockchains-fix-the-layer-1-vs-layer-2-debate-by-unifying-web3)
- [ETH-side proxy](https://etherscan.io/token/0xcf5104d094e3864cfcbda43b82e1cefd26a016eb)
- [BNB Smart Chain-side proxy](https://bscscan.com/token/0x44f161ae29361e332dea039dfa2f404e0bc5b5cc)
- [Canonical `BMToken` source](https://github.com/humanity-org/hp-basic-token)

## 4. Reserve / Custody

**Grade: ➖**

H is an unbacked token. Its fixed 10B supply was minted at genesis and is administered through vesting wallets and the foundation multisig; there is no off-chain reserve — no treasury bills, cash, real-world asset, or wrapped underlying — that would need a cryptographic attestation pushed onto the chain. The only custody-to-chain link is the `BMToken` owner mint and burn key, which is the Human Institute 3-of-5 multisig already rated under Admin / Privileged Roles. Because there is no separate reserve-to-chain cryptographic surface, this category does not apply to H.

Sources:
- [10B fixed supply, allocation table](https://www.humanity.org/h-token)
- [Tokenomics / vesting](https://humanity-protocol.gitbook.io/humanity-protocol-w-tokenomics/tokenomics)
- [Vesting schedule](https://tokenomist.ai/humanity)

## 5. Other Token-Specific Crypto

**Grade: F ❌**

Beyond the contract, admin, and bridge surfaces, H has a meaningful token-specific cryptographic surface: the Human ID claim and credential path that gates network usage and is part of the token's intended utility (verification fees, zkProofer and Validator staking, governance voting).

**Current state.** Humanity Protocol's [whitepaper](https://docs.humanity.org/whitepaper) describes an identity wallet based on a [Baby Jubjub keypair](https://docs.iden3.io/getting-started/babyjubjub/) that is deterministically generated for each user and used to sign decentralized identifiers and Verifiable Credentials. Baby Jubjub is an Edwards-form curve embedded inside the BN254 scalar field — the same curve used by the iden3 / Polygon ID stack — and it is a discrete-log curve, so Shor's algorithm breaks it; every credential signature under the [BJJSignature2021](http://iden3-communication.io/BJJSignature2021/) suite (or related Baby Jubjub-based suites) becomes forgeable once a cryptographically relevant quantum computer exists, retroactively. Human ID verification uses zero-knowledge proofs of claims about credentials; the protocol is built on the Polygon CDK / iden3 stack, which ships **Groth16 zk-SNARKs over BN254 pairings** as the production proof system, and Shor's algorithm breaks BN254 pairings, allowing a quantum attacker to forge credential-validity proofs. Verifiable Credential payloads are encrypted with per-user AES-256 keys and stored under user-controlled encrypted Merkle trees; AES-256 has reduced effective strength against Grover's algorithm but is not quantum-broken, and Merkle trees are post-quantum-friendly, so this is the only piece of the Humanity-specific stack not in active discrete-log or pairing territory. Palm-scan features are reduced to an irreversible hash on the user's device; that local transform is not a network-verified cryptographic guarantee. Operator keys for zkProofer and Validator staking on the Humanity Mainnet are EVM `secp256k1`, and slashing and unbonding signatures are ECDSA.

We found no Humanity Protocol or Human Institute statement that commits to migrating the Baby Jubjub identity keys, the Groth16 / BN254 verifier, or any of the credential-signing schemes to a post-quantum alternative.

Sources:
- [Whitepaper — BJJ keypair identity wallet; AES-256 + encrypted Merkle credential storage](https://docs.humanity.org/whitepaper)
- [Baby Jubjub curve](https://docs.iden3.io/getting-started/babyjubjub/)
- [BJJSignature2021 VC suite](http://iden3-communication.io/BJJSignature2021/)
- [Palm-scan flow, local hashing, ZK proofs](https://www.humanity.org/blog/how-do-palm-scans-work-on-the-humanity-protocol)
- [ZK-based proof-of-personhood description](https://www.gate.com/learn/articles/proof-of-humanity-and-the-biometric-engine-how-humanity-protocol-establishes-a-verifiable-human-layer/16427)
- [Protocol overview](https://messari.io/report/humanity-protocol-bringing-identity-verification-onchain)

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to retire elliptic-curve cryptography on the token's own surfaces — distinct from whether the token is adopting post-quantum cryptography. Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ❌.

We found no Human Institute or Humanity Protocol Foundation statement that commits to retiring elliptic-curve primitives on any H-controlled surface: the `BMToken` owner multisig (a 3-of-5 `secp256k1` Safe on Ethereum and BNB Smart Chain) has no announced rotation plan; the ProxyAdmin owner — the same multisig — keeps an ECDSA-gated upgrade path; the CDK Unified Bridge attestation is accepted as-is from Polygon CDK upstream; the Baby Jubjub identity keypairs and BJJSignature2021 credential suite have no announced migration; the Groth16 / BN254 proof verifier in the Human ID claim path has no announced migration; and the third-party bridge paths used for cross-chain movement are accepted as-is, all ECDSA-attested.

Sources:
- [`hp-basic-token` repository — no PQC-tagged issues or PRs](https://github.com/humanity-org/hp-basic-token)
- [Protocol documentation — no EC-retirement commitments located](https://docs.humanity.org/)
- [Humanity Protocol blog — no EC-sunset announcements located](https://www.humanity.org/blog/)

## Issuer & Governance

The Humanity Protocol ecosystem is organized around two principal entities. The **Human Institute** is the development and operations arm; it holds the 3-of-5 multisig that executes governance-approved proposals and owns the `BMToken` proxies on Ethereum and BNB Smart Chain. The **Humanity Protocol Foundation**, referenced in the tokenomics governance documentation, has a steward role for the community and ecosystem allocation and for the on-chain governance launch scheduled for 2026.

On-chain governance of the `BMToken` contracts is minimal: there is no `Governor` contract in the upgrade or mint path, and execution authority sits on the 3-of-5 multisig. At time of writing, on-chain voting is not yet live; off-chain proposals require 100,000 H to draft, or community endorsement to submit. Once the on-chain governance framework launches, H holders are expected to be able to vote on protocol upgrades, validator rules, and treasury allocations, with the multisig remaining the execution layer.

Where PQC commitments would surface, were any made: the issuer's published documentation at https://docs.humanity.org/, the [tokenomics governance documentation](https://humanity-protocol.gitbook.io/humanity-protocol-w-tokenomics/tokenomics), the [project blog](https://www.humanity.org/blog/), and the [`hp-basic-token` repository](https://github.com/humanity-org/hp-basic-token). We found no governance proposal or developer-blog post that surfaces post-quantum migration or elliptic-curve retirement as a commitment-track topic for any H-controlled surface. The protocol's published privacy framing centers on biometric data confidentiality — palm scans never leaving the device, and zero-knowledge proofs over irreversible hashes — rather than on the quantum durability of the identity keypairs, credential signatures, or proof verifiers.

---

_Generated on 16 May 2026 based on information as of 13 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
