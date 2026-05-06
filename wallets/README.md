# Wallets

Public PQC readiness reports for individual wallets. *Pending.*

When populated, this directory will carry one markdown report per evaluated wallet, referenced from [`../wallets.csv`](../wallets.csv) via a `report` column. Reports follow the same layout as the chain reports under [`../chains/l1/`](../chains/l1/) — info table, summary table, per-category sections, governance / vendor-process notes, footer.

Wallet evaluations differ in scope from chain evaluations. The categories of interest typically include:

- **Key generation and storage** — algorithm, entropy source, hardware-backed storage support.
- **Signing schemes supported** — what the wallet can sign with (ECDSA, Ed25519, Schnorr, PQ schemes).
- **Recovery and backup** — seed-phrase formats, key-derivation paths, social / threshold recovery.
- **Transport** — communication channels with chains (RPC, WalletConnect, hardware bridge), and whether those channels are PQ-ready.
- **Update and supply-chain posture** — code-signing keys, build reproducibility, vendor-driven update channels.

The same six-state stoplight legend used for chain reports applies (✅ / 🔧 / 🗺️ / ⚠️ / ❌ / ➖).
