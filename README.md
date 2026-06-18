# Quantum Tracker Data

CSV data files consumed by the Quantum Tracker website at runtime.

## Layout

CSV files are organized by segment (one CSV per segment):

- `chains.csv` + `chains_commentary.csv` -- top 200 L1 blockchains -- *populated*
- `l2s.csv` + `l2s_commentary.csv` -- L2 networks (rollups, sidechains, payment channels) -- *populated*
- `coins.csv` -- top 200 coins and tokens -- *pending*
- `wallets.csv` + `wallets_commentary.csv` -- wallets -- *populated*
- `nfts.csv` -- top 100 NFT projects -- *pending*

Each segment that has commentary annotations splits status and commentary across two files. See the schema sections below for the column layouts.

Each segment has a matching subdirectory carrying long-form public reports and per-segment notes:

- `chains/l1/` -- L1 chain PQC readiness reports (populated; see [`chains/l1/README.md`](chains/l1/README.md))
- `chains/l2/` -- L2 chain PQC readiness reports -- *populated*
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

## l2s.csv schema

L2 networks use a different column set than L1 chains. The L1 `consensus_exposure` column is replaced by three L2-specific columns: `settlement_exposure`, `data_availability_exposure`, and `proof_exposure`. The `p2p_exposure` column is omitted from the CSV (most L2s have centralized sequencers with no meaningful p2p surface) but is still tracked in intel files and public reports.

| # | Column | Type | Notes |
|---|--------|------|-------|
| 1 | `project` | string | Chain deployment name (e.g. "Base", "Arbitrum One", "StarkNet"). |
| 2 | `ticker` | string | Symbol if applicable. |
| 3 | `tier` | enum | Overall PQC-readiness grade: `S`–`F` or empty. Same scale as chains.csv. |
| 4 | `category` | enum | `L2 (optimistic)`, `L2 (zk-snark)`, `L2 (zk-stark)`, `L2 (payment-channel)`, `L2 (ephemeral)`. |
| 5 | `settlement_exposure` | status | PQC exposure of the parent settlement chain. Inherited from the settlement layer's overall posture. |
| 6 | `data_availability_exposure` | status | PQC exposure of the DA layer. Blobs inherit settlement; DAC/EigenDA have independent EC exposure. |
| 7 | `proof_exposure` | status | PQC exposure of the proof/verification system. SNARK (BN254) = vulnerable; STARK (hash) = favorable. |
| 8 | `tx_signature_exposure` | status | Same as chains.csv — user transaction signature scheme. |
| 9 | `onchain_exposure` | status | Same as chains.csv — availability of PQC verification on-chain. |
| 10 | `other_exposure` | status | Bridges, DAC details, cross-chain messaging, sequencer keys. |
| 11 | `ec_sunset` | status | Plans to remove EC. |
| 12 | `date_last_updated` | date | ISO `YYYY-MM-DD`. |
| 13 | `audit` | string | URL or empty. |
| 14 | `report` | string | Relative URL to public report (e.g. `chains/l2/base.md`). Empty = lock icon. |

### L2 category values

| Category | Meaning |
|----------|---------|
| `L2 (optimistic)` | Optimistic rollup with fraud proofs (OP Stack, Arbitrum Nitro, Metis, etc.). |
| `L2 (zk-snark)` | ZK rollup using EC-pairing-based SNARKs for L1 verification (zkSync, Scroll, Linea, Taiko, Polygon CDK). |
| `L2 (zk-stark)` | ZK rollup using hash-based STARKs all the way to L1 verification (StarkNet). Note: most "STARK" L2s actually wrap to SNARK for L1 — those are `L2 (zk-snark)`. |
| `L2 (payment-channel)` | Payment channel network (Lightning Network). |
| `L2 (ephemeral)` | Ephemeral rollup (MagicBlock). |

### Settlement vs DA vs Proof — the L2-specific columns

These three columns replace the L1 `consensus_exposure` column because L2 security decomposes differently:

- **Settlement**: The L2 cannot be more secure than its settlement layer. This is an inherited ceiling. Ethereum-settling L2s inherit Ethereum's B-tier posture.
- **Data Availability**: Where tx data is published. Ethereum blobs = inherits settlement (KZG on roadmap). AnyTrust DAC / EigenDA = independent EC exposure (BLS12-381).
- **Proof / Verification**: The L2's own crypto surface. SNARK proofs (BN254/BLS12-381 pairings) are quantum-vulnerable. STARK proofs (hash-based FRI) are quantum-favorable. Most ZK L2s use STARK inner provers but wrap to SNARK for L1 — rated by the L1-facing proof.

### Networking — not in CSV, in reports

Networking is tracked in intel files and included in public reports but omitted from the CSV. Most L2s have centralized sequencers with no p2p to rate; decentralized sequencing is still rare. This avoids a column that's `n-not-applicable.svg` for 80%+ of rows.

## wallets.csv schema

Mirrors the `chains.csv` + `chains_commentary.csv` split with wallet-specific columns. `wallets.csv` carries the status values; `wallets_commentary.csv` carries the commentary annotations with status cells as empty placeholders. The full schema (status + commentary) is documented below; each file populates only its half.

Each wallet gets one row per vendor — multi-SKU vendors consolidated to a single row — scoring two meta-columns and three "is it live" columns plus identifying metadata.

| # | Column | Type | Notes |
|---|--------|------|-------|
| 1 | `wallet` | string | Wallet product name. |
| 2 | `vendor` | string | Parent organization or company. |
| 3 | `category` | enum | Constrained: `Software`, `Hardware`, `MPC`, `Smart Contract`, `Identity`. |
| 4 | `category_commentary` | string | Optional caveat about classification, SKU coverage, or product status. |
| 5 | `pqc_stance` | status (meta) | Wallet vendor's public PQC posture. Four-state. |
| 6 | `pqc_stance_commentary` | string | |
| 7 | `crypto_agility` | status (meta) | Whether the wallet's code accepts new sig schemes without a vendor PR. Four-state. |
| 8 | `crypto_agility_commentary` | string | |
| 9 | `protocol_pqc` | status (live) | Does the wallet actually sign with the chain's protocol-level PQC scheme? Three-state. |
| 10 | `protocol_pqc_commentary` | string | |
| 11 | `contract_pqc_support` | status (live) | Does the wallet actually generate live PQC signatures verified by smart-contract bytecode on-chain — or is committed integration work in flight? Four-state. |
| 12 | `contract_pqc_support_commentary` | string | |
| 13 | `offchain_pqc` | status (live) | Does the wallet ship PQC anywhere in the wallet flow that doesn't bind on-chain (TLS, MPC handshake, passkey ceremony, hybrid TLS, PQC backup)? Four-state. |
| 14 | `offchain_pqc_commentary` | string | |
| 15 | `date_last_updated` | date | ISO `YYYY-MM-DD`. |
| 16 | `audit` | string | URL or empty. |
| 17 | `report` | string | Relative URL to long-form public report (e.g. `wallets/metamask.md`). Empty if no public report is available. |

### Wallet status values

Wallets use a different rating vocabulary than chains. All five status columns are four-state (`yes` / `yes-but` / `no` / `not-applicable`); the `yes-but` semantics differ between meta and live columns.

#### Meta columns (`pqc_stance`, `crypto_agility`) — four-state

| Value | Meaning |
|-------|---------|
| `yes.svg` | Full credit. Stance: dated commitment / shipping PQC code. Agility: ships a pluggable-signer mechanism today, demonstrated by hosting at least one non-default classical sig scheme. |
| `yes-but.svg` | Partial credit. Stance: publicly discussed without commitment (or marketed claims with substance gap). Agility: vendor commitment / code in-flight / architecture exists but unproven / chain-side-only mechanism. |
| `no.svg` | Stance: explicit deprioritization statement. Agility: operates on chains that could host such mechanisms but ships plain EOA / fixed signer. |
| `not-applicable.svg` | Stance: silent on PQC. Agility: only operates on chains where the question doesn't apply (UTXO-only Bitcoin / Lightning / Nostr wallets where the chain itself provides no mechanism). |

#### Live columns (`protocol_pqc`, `contract_pqc_support`, `offchain_pqc`) — four-state

| Value | Meaning |
|-------|---------|
| `yes.svg` | Wallet actually does it on at least one supported chain today, in production. |
| `yes-but.svg` | In development but not deployed: committed integration work in flight (announced testnet, public branch, dated implementation roadmap) targeting a chain where the necessary PQC infrastructure is live or on the watch list. |
| `no.svg` | A supported chain has the necessary PQC infrastructure live AND the wallet doesn't engage AND has no in-flight integration work. |
| `not-applicable.svg` | No supported chain has the necessary PQC infrastructure live, and no in-flight wallet-side work targets a watch-list chain. |

For live columns, `yes-but` covers integration work that is committed but pre-deployment; it does not cover vendor posture (which lives in `pqc_stance`) or architectural readiness without targeted PQC integration work (which lives in `crypto_agility`).

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
