# Quantum Tracker Data

CSV data files consumed by the Quantum Tracker website at runtime.

## Layout

CSV files are organized by segment (one CSV per segment):

- `chains.csv` -- top 200 blockchains (L1 + L2) -- *populated*
- `coins.csv` -- top 200 coins and tokens -- *pending*
- `wallets.csv` -- wallets -- *pending*
- `nfts.csv` -- top 100 NFT projects -- *pending*

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

Note: in `chains_commentary.csv`, the status columns are structural placeholders and remain empty; the authoritative status value lives in `chains.csv`.

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

## Update flow

Status ratings are mirrored from upstream research dashboards into this repo. Updates flow research → dashboards → CSV. The website reads the CSV directly.
