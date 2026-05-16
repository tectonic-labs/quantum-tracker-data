# LEO Token (LEO) — Public PQC Readiness Report

| | |
|---|---|
| **Name** | LEO Token |
| **Ticker** | LEO |
| **Asset class** | Exchange Token |
| **Issuer** | iFinex Inc. (parent of Bitfinex) |
| **Host chain(s)** | Ethereum (primary), Vaulta (secondary issuance); also listed on Sora |
| **Website** | https://leo.bitfinex.com/ |
| **Twitter / X** | https://x.com/bitfinex |
| **Contract address** | `0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3` (Ethereum ERC-20) |

## Summary

| Category | Grade | Icon | Status |
|----------|:-----:|:----:|--------|
| Host Chain Aggregate | F | ❌ | Not Discussed |
| Admin / Privileged Roles | F | ❌ | Not Discussed |
| Cross-Chain Mechanism | F | ❌ | Not Discussed |
| Reserve / Custody | ➖ | ➖ | Not Applicable |
| Other Token-Specific Crypto | ➖ | ➖ | Not Applicable |
| EC Sunset | F | ❌ | Not Discussed |

LEO is an exchange token issued by iFinex, the parent company of the Bitfinex exchange. It exists primarily as an ERC-20 on Ethereum, with a secondary issuance on Vaulta (the chain formerly known as EOS) and an additional listing on Sora. Every cryptographic surface that LEO touches today — the keys that mint and burn tokens, the issuer-operated bridge that moves supply between chains, and the signatures that secure the underlying networks — relies on classical elliptic-curve cryptography. We have found no public iFinex or Bitfinex statement, roadmap, or proposal addressing post-quantum cryptography for any LEO-controlled surface.

A token cannot be more quantum-safe than the chain it runs on: host-chain inheritance sets the ceiling, and LEO's primary host is Ethereum. On top of that ceiling, the token-issuer surfaces — the privileged controller key and the cross-chain conversion mechanism — set the floor, and both are currently classical-EC only with no migration disclosed. As of this report, LEO has no published post-quantum migration plan.

## Proposed and Implemented PQC Algorithms

LEO does not currently propose or implement any post-quantum cryptographic algorithms.

## 1. Host Chain Aggregate

**Grade: F ❌**

LEO's transaction signing, consensus participation, and peer-to-peer networking exposure are properties of the chains it runs on, not of the token itself. The dominant host is Ethereum, where LEO is deployed as an ERC-20 token at contract `0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3`. Following the June 2025 EOS-to-Vaulta rebrand, a secondary leg of supply lives on Vaulta, and CoinGecko additionally lists a Sora deployment. Because a token can be no more quantum-safe than the chain it executes on, the host chain sets the ceiling for LEO's overall posture.

The aggregate rating inherits the worst host-chain exposure. Ethereum's worst category is its peer-to-peer networking layer, which is currently quantum-exposed — see the [Ethereum PQC Readiness Report](../chains/l1/ethereum.md) for the full breakdown. Vaulta and Sora do not have their own published readiness reports; adding unevaluated chains to the aggregate can only hold the rating where it is or worsen it, never improve it. The aggregate therefore lands at the Ethereum floor.

**Current state.** LEO inherits Ethereum's exposure profile, with its weakest point being the networking layer. Vaulta and Sora are not separately evaluated here.

**Planned future work.** Any improvement to this category would come from host-chain migrations. Ethereum's own post-quantum work is tracked in its [readiness report](../chains/l1/ethereum.md); LEO itself records no host-chain migration of its own.

## 2. Admin / Privileged Roles

**Grade: F ❌**

The LEO ERC-20 contract is built on Giveth's MiniMe Token framework with a custom controller. It is not an upgradeable proxy, so there is no implementation-swap surface — but the controller pattern concentrates extensive privileged authority in a single role. The controller can mint tokens (`generateTokens`), burn tokens (`destroyTokens` — used to execute the scheduled monthly buyback burns funded by 27% of iFinex consolidated gross revenue), and the owner can transfer the controller seat (`changeController`). Transfer-control and lost-token-recovery functions also route through the controller.

The contract was [deployed](https://etherscan.io/address/0xe1F3C653248De6894d683cB2f10DE7CA2253046f) by an externally owned account — a single classical-EC key, with no multisig wrapping at the deployer level. From the [contract's](https://etherscan.io/token/0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3) perspective the owner and controller roles are EOA-shaped, regardless of any off-chain operational signing process Bitfinex layers over them. Bitfinex describes a multi-party HSM cold-storage architecture at the [exchange-wallet level](https://www.bitfinex.com/security-policy/), but that disclosure is not LEO-specific: there is no public statement tying the LEO controller key to that HSM quorum, and no post-quantum HSM commitment.

**Current state.** Mint and burn authority for LEO sits behind a classical-EC controller key. No issuer-attributable post-quantum work on this key has been disclosed.

**Planned future work.** No concrete post-quantum proposal currently exists for the LEO controller authority. We found nothing on the public record indicating a planned migration.

## 3. Cross-Chain Mechanism

**Grade: F ❌**

LEO was issued at launch across two chains — 660M tokens on Ethereum and 340M on EOS — with [Bitfinex operating a proprietary cross-chain mechanism](https://support.bitfinex.com/hc/en-us/articles/360023617554-Unus-Sed-LEO-Token-Conversion) that burns LEO on one chain and re-issues an equivalent amount on the other. This was [described at launch](https://medium.com/bitfinex/unus-sed-leo-launches-on-ethereum-eos-76fe5987995c) as a dual-chain issuance. In June 2025 the EOS leg was migrated 1:1 to Vaulta, and Bitfinex resumed LEO conversions on the new chain.

The mechanism is issuer-operated rather than a third-party bridge protocol: iFinex is the operator, so post-quantum considerations are in scope across every path it authorizes. The burn/mint authority on the Ethereum side runs through the same controller functions described above — a classical-EC-signed transaction from the controller key. The Vaulta side runs through the equivalent issuer-controlled account, also EC-secured, since Vaulta inherits the EOS secp256k1/secp256r1 lineage. Volume on Sora and any other listed deployment is negligible relative to the Ethereum–Vaulta path.

**Current state.** Cross-chain transfers of LEO depend on classical-EC signing on both legs and on off-chain reconciliation that pairs burn events to mint events.

**Planned future work.** No published post-quantum migration plan exists for either leg of the mechanism or for the off-chain reconciliation process.

## 4. Reserve / Custody

**Grade: ➖**

LEO is not a reserve-backed claim on an off-chain asset. It is a discretionary buyback-and-burn token whose floor is set by iFinex's commitment to spend 27% of consolidated gross revenue on open-market repurchases. Bitfinex publishes monthly [transparency disclosures](https://leo.bitfinex.com/) listing repurchase and burn volumes, and described this practice in its [transparency initiative](https://medium.com/bitfinex/bitfinex-presents-unus-sed-leo-transparency-initiative-4d94ebf95356). These are after-the-fact disclosures, not on-chain-gated attestations — nothing in the LEO contract verifies a reserve signature before allowing balance changes. There is no disclosed cryptographic linkage between the reserve/custody side and the on-chain mint/burn behavior beyond the controller key already covered under Admin / Privileged Roles, so there is no separate custody-to-chain surface to rate here.

## 5. Other Token-Specific Crypto

**Grade: ➖**

The LEO contract embeds no zero-knowledge verifier, no oracle dependency, no application-layer cryptography, and no signed off-chain mapping. The MiniMe framework's historical-balance snapshot capability (`balanceOfAt`, `totalSupplyAt`) is a storage feature, not a cryptographic primitive. LEO carries no extra token-specific cryptography beyond the surfaces already rated, so this category does not apply.

## 6. EC Sunset

**Grade: F ❌**

EC Sunset rates whether the issuer has a credible plan to retire elliptic-curve cryptography on the token's own surfaces — the controller key, the cross-chain mechanism authority, and the upstream exchange HSMs that may sign controller transactions. That is distinct from rating whether the token is adopting post-quantum cryptography.

We have found no public Bitfinex or iFinex commitment — in white paper, blog, transparency report, regulator filing, or executive statement — to retire elliptic-curve signing on any LEO-controlled surface. Retiring EC is a strictly stronger commitment than adopting post-quantum cryptography alongside it, and neither is on the published record.

> Adding PQC alongside EC is not the same as retiring EC. For reference, this token's PQC-adoption ratings per category are: Host Chain ❌, Admin ❌, Cross-Chain ❌, Reserve & Custody ➖, Other ➖.

If we are mistaken and a proposal, draft, working group, or implementation effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Issuer & Governance

LEO governance is fully centralized. iFinex Inc., the parent company of Bitfinex, controls the LEO contract owner and controller roles unilaterally; there is no on-chain LEO holder vote, DAO, or council. The LEO contract is non-upgradeable, so operational change happens via controller-role transactions or, in extremis, via deployment of a new contract with a coordinated token swap — the approach already used for the EOS-to-Vaulta migration.

iFinex operates Bitfinex out of the British Virgin Islands. LEO was issued via a 2019 private sale. Product disclosures, including the monthly buyback and burn figures, are published through the [LEO token portal](https://leo.bitfinex.com/) and Bitfinex's blog and help-centre channels; this is where any post-quantum commitment would be expected to surface. No public Bitfinex or iFinex post-quantum proposals were located.

---

_Generated on 16 May 2026 based on information as of 13 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
