# Quantum Tracker Data

CSV data files consumed by the Quantum Tracker website at runtime.

## Layout

CSV files are organized by segment (one CSV per segment):

- `chains.csv` + `chains_commentary.csv` -- top 200 blockchains (L1 + L2) -- *populated*
- `coins.csv` -- top 200 coins and tokens -- *pending*
- `wallets.csv` + `wallets_commentary.csv` -- wallets -- *populated*
- `nfts.csv` -- top 100 NFT projects -- *pending*

Each segment that has commentary annotations splits status and commentary across two files. See the schema sections below for the column layouts.

Each segment has a matching subdirectory carrying long-form public reports and per-segment notes:

- `chains/l1/` -- L1 chain PQC readiness reports (populated; see [`chains/l1/README.md`](chains/l1/README.md))
- `coins/` -- *pending* (see [`coins/README.md`](coins/README.md))
- `wallets/` -- *pending* (see [`wallets/README.md`](wallets/README.md))
- `nfts/` -- *pending* (see [`nfts/README.md`](nfts/README.md))

## Status Indicator Values

Status cells (the six `*_exposure` and `ec_sunset` columns in `chains.csv`) carry one of the following SVG filenames. The frontend resolves these to the corresponding icon. Status cells must always be populated — empty is no longer a permitted value; use `n-not-applicable.svg` to mark categories that don't apply.

| Value | Meaning |
|-------|---------|
| `a-done.svg` | Done / Pass — PQC-secure, or category not applicable in a quantum-safe way (e.g. PoW hashing for Consensus). For EC Sunset: EC removed. |
| `b-dev.svg` | In Development — migration is actively being implemented (code in flight, testnet, audit). |
| `c-planned.svg` | On Roadmap — published roadmap with credible plan; implementation not started. For EC Sunset: credible plan to retire EC. |
| `d-discussed.svg` | Discussed — topic is being discussed in governance / EIPs / forums; no formal roadmap commitment. |
| `f-nothing.svg` | Exposed — quantum-vulnerable, no migration shipped. For EC Sunset: no plans to remove EC. |
| `n-not-applicable.svg` | Not Applicable — category does not apply to this entity. |

Note: in `chains_commentary.csv` and `wallets_commentary.csv`, the status columns are structural placeholders and remain empty; the authoritative status value lives in `chains.csv` and `wallets.csv` respectively.

## chains.csv schema

Columns mirror the Quantum Tracker product table, with a `_commentary` cell inserted after `category` and after each of the six status cells. Commentary content is rendered by the frontend as a hover tooltip (e.g. on a `*` indicator) so caveats can be surfaced without crowding the row.

| # | Column | Type | Notes |
|---|--------|------|-------|
| 1 | `project` | string | Project name. |
| 2 | `ticker` | string | Symbol if applicable; empty otherwise. |
| 3 | `tier` | enum | Overall PQC-readiness grade: `S`, `A`, `B`, `C`, `D`, or `F`. Empty for chains not on the tier list (genesis-PQC chains, unevaluated chains). See "Tier values" below. |
| 4 | `category` | enum | Constrained vocabulary. L1 values: `L1`, `L1 (Privacy)`, `L1 (Enterprise)`, `L1 (PQC-native)`. L2 values follow the same pattern (e.g. `L2 (optimistic)`, `L2 (zk)`). Any further qualifier (`— claims unverified`, `— marketed`, sub-classification) belongs in `category_commentary`, not the category cell. |
| 5 | `category_commentary` | string | Optional caveat about classification (e.g. "marketed as PQC-native but blockchain layer is standard EC", "claims unverified", "enterprise DLT"). |
| 6 | `tx_signature_exposure` | status | See status values above. |
| 7 | `tx_signature_commentary` | string | Optional caveat (e.g. "Falcon implemented for state proofs but not user txs"). |
| 8 | `consensus_exposure` | status | |
| 9 | `consensus_commentary` | string | |
| 10 | `p2p_exposure` | status | |
| 11 | `p2p_commentary` | string | |
| 12 | `onchain_exposure` | status | Availability of PQC sig algorithms for on-chain use. |
| 13 | `onchain_commentary` | string | |
| 14 | `other_exposure` | status | KZG, randomness beacons, bridges, privacy tech, etc. |
| 15 | `other_commentary` | string | |
| 16 | `ec_sunset` | status | Credible plan to retire EC? |
| 17 | `ec_sunset_commentary` | string | |
| 18 | `date_last_updated` | date | ISO `YYYY-MM-DD`; auto-stamped from the source evaluation file. |
| 19 | `audit` | string | URL or empty. Empty → frontend uses default booking URL behind a "Book" button. |
| 20 | `report` | string | Relative URL to the full project report (e.g. `chains/l1/bitcoin.md`). Empty → frontend renders a lock icon. |

### Tier values

| Tier | Meaning |
|------|---------|
| `S` | Quantum Fortress — fully quantum-safe across all bands, EC sunset locked in before Q-Day. |
| `A` | Ahead of the Curve — multiple bands already running PQC in production. |
| `B` | Building It — PQC code written and deployed to testnets or actively integrated. |
| `C` | Charting the Course — roadmap exists, funding allocated, but no code running on any network yet. |
| `D` | Discussing It — some awareness, maybe a PoC or governance thread; no roadmap from protocol owners. |
| `F` | Future Victims — no PQC discussion, roadmap, or proposals visible. |
| *(empty)* | Not on the tier list — genesis-PQC chains (built quantum-resistant from day 1) and unevaluated chains. |

Tier assignments are sourced upstream and mirrored into this repo.

### Commentary conventions

- One short sentence per cell. Don't reproduce the full evaluation file — link via `report`.
- Use commentary to flag QT viewpoints that aren't obvious from the rating alone, e.g.:
  - Short-exposure mitigations are **not** counted as acceptable migration.
  - Published code does not match marketing material.
  - Roadmap exists but is not credible / has slipped repeatedly.
  - State proof / overlay layer uses PQC but the user-transaction path does not.
- Empty commentary is the default; a star (`*`) appears in the UI only when a row has commentary.

## wallets.csv schema

Mirrors the `chains.csv` + `chains_commentary.csv` split with wallet-specific columns. `wallets.csv` carries the status values; `wallets_commentary.csv` carries the commentary annotations with status cells as empty placeholders. The full schema (status + commentary) is documented below; each file populates only its half.

Each wallet gets one row per vendor — multi-SKU vendors consolidated to a single row — scoring two meta-columns and four detail columns plus identifying metadata.

| # | Column | Type | Notes |
|---|--------|------|-------|
| 1 | `wallet` | string | Wallet product name. |
| 2 | `vendor` | string | Parent organization or company. |
| 3 | `category` | enum | Constrained: `Software`, `Hardware`, `MPC`, `Smart Contract`, `Identity`. |
| 4 | `category_commentary` | string | Optional caveat about classification, SKU coverage, or product status. |
| 5 | `pqc_stance` | status | Wallet vendor's public PQC posture (meta-column). See wallet status values below. |
| 6 | `pqc_stance_commentary` | string | |
| 7 | `crypto_agility` | status | Whether the wallet's code accepts new sig schemes without a vendor PR (meta-column). |
| 8 | `crypto_agility_commentary` | string | |
| 9 | `protocol_pqc` | status | Does the wallet sign with the chain's protocol-level PQC scheme? |
| 10 | `protocol_pqc_commentary` | string | |
| 11 | `contract_pqc` | status | Does the wallet engage with a deployed on-chain PQC primitive? |
| 12 | `contract_pqc_commentary` | string | |
| 13 | `contract_pqc_support` | status | Architectural plumbing for a Contract PQC verifier on the chains the wallet supports. |
| 14 | `contract_pqc_support_commentary` | string | |
| 15 | `offchain_pqc` | status | Off-chain PQC mechanisms (TLS, MPC handshake, passkey ceremony). Editorial: absence is a passing grade. |
| 16 | `offchain_pqc_commentary` | string | |
| 17 | `date_last_updated` | date | ISO `YYYY-MM-DD`. |
| 18 | `audit` | string | URL or empty. |
| 19 | `report` | string | Relative URL to long-form public report (e.g. `wallets/metamask.md`). Empty if no public report is available. |

### Wallet status values

Wallets use a different rating vocabulary than chains. Wallet ratings reflect *engagement breadth across applicable chains*, not migration state:

| Value | Meaning |
|-------|---------|
| `yes.svg` | Yes — wallet engages at this tier across all applicable chains for the column. |
| `yes-but.svg` | Yes-but — wallet engages partially; some applicable chains covered, others not. |
| `no.svg` | No — applicable chains exist but the wallet engages with none. |
| `not-applicable.svg` | N/A — no applicable chains for this column (and for `offchain_pqc`: also when the wallet ships no off-chain PQC, since absence is the editorial passing grade). |

The meta-columns have slightly different semantics:

- `pqc_stance`: `yes` = public PQC roadmap, dated commitment, or shipping PQC code; `yes-but` = publicly discussed but no commitment (or marketed claims with substance gap); `no` = explicit deprioritization statement; `not-applicable` = silent.
- `crypto_agility`: `yes` = ships a pluggable-signer / swappable-validator mechanism today; `yes-but` = vendor commitment / in-flight / partial coverage; `no` = operates on chains that could host such mechanisms but ships plain EOA / fixed signer / no plugin path; `not-applicable` = only on chains where the question doesn't apply (e.g., a UTXO-only Bitcoin wallet).

### Wallet row ordering

Wallet rows are ordered by overall user-base prominence (sourced from an upstream wallet survey). New wallets added after the initial survey are appended at the end in alphabetical order until a richer ordering source is available.

### Inclusion criteria

The wallets table tracks **products actively migrating toward PQC or holding architectural readiness for it**. The following are excluded:

- **Sunsetting / discontinued / archived wallets** — products that have publicly committed to shutdown, archived their repositories, or stopped shipping releases for an extended period (12+ months without updates with no committed roadmap). Wallets confirmed as not doing PQC migrations (typically because they are closing down or pivoting away from wallet product) are removed rather than scored. The table reflects the active wallet universe, not archival history.
- **Backup-only devices** — products like passive metal seed-phrase plates that do not sign transactions.
- **Custodial-exchange wallets** — the PQC question lives at the exchange's HSM/KMS layer; only the exchange's non-custodial Web3 wallet product is in scope.
- **Pre-mainnet / research-only artifacts** — products that have not shipped against a mainnet a wallet can sign for.

A wallet that stops shipping releases is removed from the table on its next refresh. If a previously-tracked wallet resumes development with a PQC commitment, it can be re-added.

## Update flow

Status ratings are mirrored from upstream research dashboards into this repo. Updates flow research → dashboards → CSV. The website reads the CSV directly.
