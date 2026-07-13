# Chainlink (LINK) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | Chainlink |
| **Ticker** | LINK |
| **Asset class** | Utility |
| **Issuer** | Chainlink Labs (protocol developer) / Chainlink Foundation (Swiss steward of protocol assets) |
| **Host chain(s)** | Ethereum (canonical ERC-677), plus 60+ chains via CCIP-native LINK deployments |
| **Website** | https://chain.link/ |
| **Contract address** | 0x514910771AF9Ca656af840dff83E8264EcF986CA (Ethereum) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | D | ⚠️ | Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | F | ❌ | Not Discussed |
| EC Sunset | F | ❌ | Not Discussed |

Chainlink's LINK token is a utility token that powers the Chainlink oracle network and its Cross-Chain Interoperability Protocol (CCIP). Its quantum exposure comes from two directions. What it *inherits*: LINK is canonically an Ethereum ERC-677 token and is also issued on 60+ other chains, so it inherits each host chain's transaction-signing, consensus, and networking cryptography. What the issuer *controls*: the elliptic-curve keys behind Chainlink's operational treasury, the CCIP admin contracts, and the oracle/cross-chain attestation networks that give the token its utility. Both are elliptic-curve today.

A token can never be more quantum-safe than the chain it runs on — host-chain inheritance is the ceiling, and the issuer's own admin, bridge, and oracle keys are the floor. Chainlink Labs has published quantum-awareness material — its [Quantum-Safe Cryptography](https://chain.link/article/quantum-safe-cryptography) article discusses the NIST post-quantum standards and positions the platform as "designed to be future-proof" — which puts the cross-chain mechanism into the Discussed band. But at the time of writing there is no migration schedule, no named post-quantum algorithm shipping in any Chainlink product, and no plan to retire elliptic-curve keys on any token-controlled surface, so the remaining applicable categories sit at F.

## Proposed and Implemented PQC Algorithms

Chainlink does not currently propose or implement any post-quantum cryptographic algorithms on a token-issuer surface.

## 1. Host Chain Aggregate

**Grade: F ❌**

LINK is canonically issued on Ethereum as an ERC-677 token and is additionally deployed on 60+ other chains through Chainlink's native multi-chain LINK contracts. Because a token executes with its host chain's cryptography, LINK's transaction-signing, consensus, and networking exposure are the host chains' — not attributes Chainlink Labs sets at the token layer. This makes the host chain the ceiling on how quantum-safe LINK can be: the token cannot be more secure than the chain underneath it.

This category takes the worst grade across all the host chains LINK runs on — a token is only as quantum-safe as the least-safe chain that carries it. The grade is set by [Sui](../chains/l1/sui.md), which is the most-exposed host: it carries elliptic-curve exposure across its consensus, networking, on-chain, and other cryptographic surfaces, with no plan to retire elliptic curve. That single chain pins the aggregate at F, and because LINK is a first-class asset on Sui via CCIP, LINK's holders there inherit that exposure directly.

The floor is not an isolated case. Every evaluated host holds an F in at least one category, and none has published a plan to retire elliptic-curve cryptography. The better-positioned hosts still do not lift the aggregate: [TRON](../chains/l1/tron.md) and [NEAR Protocol](../chains/l1/near-protocol.md) have post-quantum work underway on some layers but no EC-retirement plan, and [Ethereum](../chains/l1/ethereum.md) — the canonical LINK chain — [BNB Chain](../chains/l1/bnb-chain.md), [Solana](../chains/l1/solana.md), [Avalanche](../chains/l1/avalanche.md), [Aptos](../chains/l1/aptos.md), and Polygon PoS each carry an F on one or more categories. Because the aggregate is a floor, one exposed host is enough to hold it down.

**Current state:** The worst-rated host, Sui, is F across most of its cryptographic surfaces; every other host carries elliptic-curve exposure on at least one category. The aggregate floor is F.

**Planned future work:** Individual host chains are pursuing their own migrations at varying speeds — see each host chain's own report for details — but none has retired elliptic curve cryptography, so the inherited floor remains F.

## 2. Admin / Privileged Roles

**Grade: F ❌**

The canonical Ethereum LINK contract is itself non-upgradeable: the full supply was minted at deployment in 2017, there is no callable mint function, no proxy, and no pause/blacklist/rescue admin. The privileged surface is the Chainlink stack *around* the token. The Chainlink Foundation and Chainlink Labs hold the protocol-reserved LINK supply in multisig custody, and the CCIP administrative contracts — the [`Router`, `TokenAdminRegistry`, and per-lane `OnRamp`/`OffRamp`](https://docs.chain.link/ccip/architecture) owner roles that decide which tokens move over CCIP and how they are minted or released — are controlled by Chainlink-Labs multisigs. All of these are secp256k1 ECDSA.

No governance proposal, vendor proof-of-concept, working-group output, or public roadmap proposes a post-quantum scheme for the operational treasury or the CCIP admin keys.

**Current state:** Treasury and CCIP admin keys are elliptic-curve (secp256k1 ECDSA) multisigs.

**Planned future work:** None on the public record.

## 3. Cross-Chain Mechanism

**Grade: D ⚠️**

LINK moves between chains using CCIP itself, and LINK is also the fee token for CCIP transactions. CCIP uses a defence-in-depth design with two independent attestation networks. The [Committing DON](https://docs.chain.link/ccip/concepts) runs Chainlink's OCR 2.0 off-chain consensus and posts a Merkle root of confirmed messages to the destination chain, signed by an aggregate of oracle signatures. A separate [Risk Management Network](https://blog.chain.link/risk-management-network) independently "blesses" or "curses" those roots. The Merkle proof layer is hash-based (Keccak-256) and quantum-resistant, but the *signing* layer of both the Committing DON and the Risk Management Network is secp256k1 ECDSA. The dual-network design increases the work an attacker must do, but does not change the underlying algorithmic exposure.

What lifts this category above the "nothing on the record" floor is that the issuer has publicly acknowledged post-quantum cryptography as relevant to its cross-chain stack. Chainlink Labs' first-party [Quantum-Safe Cryptography](https://chain.link/article/quantum-safe-cryptography) article describes CCIP as "designed to be future-proof" and a "standard connectivity layer that can evolve alongside cryptographic advancements," references the NIST post-quantum standards, and notes a partner integrating fully homomorphic encryption plus "quantum-resistant security" with CCIP. Because that article is attributable to the issuer and explicitly frames CCIP's cryptographic future, the cross-chain mechanism clears the Discussed bar.

It does not go further than Discussed. The article is educational and forward-looking positioning, not a plan: it names no migration timeline for the OCR or Risk Management Network signing keys, no post-quantum algorithm shipping or scheduled in CCIP, and the partner integration is confidential-compute (FHE), not a post-quantum signature migration of the attestation layer. Crypto-agility language is not a commitment to migrate a specific CCIP surface, so there is no roadmap to point at. CCIP v1.6, which added non-EVM support, did not change the signature scheme.

**Current state:** CCIP attestation signing (Committing DON and Risk Management Network) is elliptic-curve (secp256k1 ECDSA); the proof layer is hash-based. The issuer has publicly acknowledged post-quantum cryptography as relevant to CCIP.

**Planned future work:** No concrete post-quantum proposal, timeline, or algorithm for the CCIP signing layer currently exists; the issuer has published quantum-awareness material but no schedule or commitment.

## 4. Reserve / Custody

**Grade: ➖**

LINK is an unbacked utility token. There is no off-chain reserve, no proof-of-reserve pipeline, and no custody-to-chain mint authority — the supply was minted at genesis. The Foundation's treasury holds LINK but is not a backing reserve with an on-chain attestation pipeline, so there is no custody-to-chain surface to rate.

## 5. Other Token-Specific Crypto

**Grade: F ❌**

The LINK contract has no token-specific cryptographic surface of its own beyond what the categories above cover, but the token's value depends on the Chainlink oracle stack that consumes it: OCR 2.0 oracle reports, Data Feeds, and VRF. These use secp256k1 ECDSA-signed oracle reports and, for [VRF](https://docs.chain.link/vrf), on-chain verifiable randomness over secp256k1. A quantum break of these keys would not directly steal LINK, but it would undercut the network products that give the token its purpose.

No post-quantum proposal for the OCR reporting keys, Data Feeds signing, or VRF currently exists on the public record.

**Current state:** The oracle attestation stack (OCR 2.0, Data Feeds, VRF) is elliptic-curve (secp256k1).

**Planned future work:** None on the public record.

## 6. EC Sunset

**Grade: F ❌**

Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ⚠️, Reserve & Custody ➖, Other ❌.

There is no Chainlink-attributable plan to retire elliptic-curve cryptography on any token-controlled surface — not the CCIP admin multisigs, not the Committing DON or Risk Management Network signing keys, not the Foundation treasury, and not the VRF/Data Feeds product keys. Chainlink Labs' published roadmap covers Smart Value Recapture, the Chainlink Runtime Environment, Payment Abstraction, and CCIP non-EVM support; none of these touch elliptic-curve retirement. The 2026 [Quantum-Safe Cryptography](https://chain.link/article/quantum-safe-cryptography) article demonstrates awareness and crypto-agility positioning but commits to no retirement schedule.

**Current state:** No EC-retirement plan on any token-controlled surface.

**Planned future work:** None on the public record.

## Issuer & Governance

Chainlink is built by Chainlink Labs, a private company, with the Chainlink Foundation, a Swiss-registered entity, stewarding protocol assets. There is no on-chain LINK-holder governance over the oracle network, the decentralized oracle networks (DONs), or CCIP; decisions about protocol upgrades, OCR versions, DON membership, Risk Management Network composition, and CCIP lane admissions are made by Chainlink Labs in coordination with the node-operator set. Any post-quantum migration of the OCR, Risk Management Network, or CCIP admin keys would therefore be a Chainlink-Labs-led decision executed through the smart-contract upgrade authority on each chain.

Where post-quantum commitments would surface, if made: the Chainlink Labs [blog](https://blog.chain.link/), the [Chainlink roadmap](https://chain.link/roadmap), and first-party articles such as the 2026 [Quantum-Safe Cryptography](https://chain.link/article/quantum-safe-cryptography) piece. As of this report, those venues carry quantum-awareness material but no dated post-quantum milestone for any token-controlled surface.

---

_Generated on 07 Jul 2026 based on information as of 07 Jul 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
