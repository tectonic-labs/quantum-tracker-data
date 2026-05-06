# Coins and Tokens

Public PQC readiness reports for individual coins and tokens. *Pending.*

When populated, this directory will carry one markdown report per top-200 coin / token, referenced from [`../coins.csv`](../coins.csv) via a `report` column. Reports follow the same layout as the chain reports under [`../chains/l1/`](../chains/l1/) — chain-info table, summary table, per-category sections, governance, footer.

A coin or token tied to a specific blockchain typically inherits that chain's transaction-signature, consensus, and P2P exposures. Reports here focus on token-specific exposure: issuer key custody, contract upgradeability, bridge dependencies, governance over upgrades, and any token-layer cryptography (e.g. confidential-transfer schemes, on-chain proofs).

The same six-state stoplight legend used for chain reports applies (✅ / 🔧 / 🗺️ / ⚠️ / ❌ / ➖).
