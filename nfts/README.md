# NFT Projects

Public PQC readiness reports for individual NFT projects. *Pending.*

When populated, this directory will carry one markdown report per top-100 NFT project, referenced from [`../nfts.csv`](../nfts.csv) via a `report` column. Reports follow the same layout as the chain reports under [`../chains/l1/`](../chains/l1/) — info table, summary table, per-category sections, governance, footer.

An NFT project's PQC exposure depends on the host chain plus any project-specific cryptographic dependencies. The categories of interest typically include:

- **Host chain inheritance** — most exposure flows from the underlying L1 / L2.
- **Issuer / minter keys** — controlling which keys can mint, freeze, or upgrade.
- **Metadata signatures** — off-chain or on-chain attestations, signed metadata, IPFS-pinning operator keys.
- **Royalty enforcement** — on-chain mechanisms (signature checks, allowlist contracts) versus marketplace-side enforcement.
- **Custody / multisig over treasury** — for projects with a project-controlled treasury.

The same six-state stoplight legend used for chain reports applies (✅ / 🔧 / 🗺️ / ⚠️ / ❌ / ➖).
