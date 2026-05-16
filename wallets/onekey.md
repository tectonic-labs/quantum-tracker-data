# OneKey — Public PQC Readiness Report

| | |
|---|---|
| **Name** | OneKey |
| **Vendor** | OneKey |
| **Category** | Hardware |
| **Custody model** | Hardware secure element; BIP-39 seed phrase generated and stored on-device. EOA-only — no MPC, no smart-contract accounts, no social recovery. |
| **Website** | https://onekey.so/ |
| **GitHub** | https://github.com/OneKeyHQ |
| **Platforms** | Hardware devices (five signing SKUs plus two backup-only products), companion apps for mobile (iOS, Android), desktop (macOS, Windows, Linux), and a browser extension (Chrome, Firefox, Edge, Brave). |
| **Open source** | Firmware repositories are published on GitHub under GPL-3.0 (with a secondary, unspecified `LICENSE.md` file alongside). |
| **First release** | 2021 (original OneKey Classic hardware wallet). |

## Summary

| Column | Rating | Icon | Status |
|--------|:------:|:----:|--------|
| PQC Stance | Yes | ✅ | Shipped |
| Crypto Agility | Yes-but | *️⃣ | In Progress |
| Protocol PQC | N/A | ➖ | Not Applicable |
| Contract PQC Support | No | ❌ | Not Engaged |
| Off-Chain PQC | No | ❌ | Not Engaged |

PQC Stance and Crypto Agility are posture/architecture columns; Protocol PQC, Contract PQC Support, and Off-Chain PQC measure what the wallet delivers in production today.

OneKey is one of the few hardware-wallet vendors to have published a documented post-quantum roadmap commitment. In a November 2025 blog post, [Can Quantum Computing Break BTC?](https://onekey.so/blog/learn/can-quantum-computing-break-btc-a-clear-guide-to-post-quantum-security/), the vendor states it is "already preparing the next phase of upgrades: adopting ML-KEM for key agreement, migrating signatures to ML-DSA, increasing hash strength." An earlier September 2025 post, [Crypto And Quantum Computing – Is it a Threat?](https://onekey.so/blog/ecosystem/crypto-and-quantum-computing-is-it-a-threat/), frames OneKey's firmware-update mechanism as the lever for adapting to evolving threats including quantum computing.

What ships today is classical. Every OneKey signing device signs with ECDSA over secp256k1, Schnorr (BIP-340) for Bitcoin Taproot, and EdDSA over Ed25519 for chains such as Solana, Cardano, and the Cosmos and Move ecosystems. No post-quantum signature scheme is shipping on any OneKey device, and the November 2025 roadmap statement carries no published timeline, milestone, or target device. The roadmap is a real, on-record commitment; the delivery date is not yet public.

## Proposed and Implemented PQC Algorithms

| Algorithm | Replaces | Column | Status |
|-----------|----------|--------|--------|
| **ML-DSA** | ECDSA secp256k1, Schnorr secp256k1, Ed25519 | PQC Stance | Committed |
| **ML-KEM** | X25519/ECDH key agreement (BLE / NFC pairing) | PQC Stance | Committed |

Both entries are vendor commitments drawn from OneKey's November 2025 blog post; neither is implemented or shipping on any device, and no shipping date has been published.

## PQC Stance

**Rating: Yes** ✅

OneKey has publicly engaged with post-quantum cryptography. Its November 2025 blog post, [Can Quantum Computing Break BTC?](https://onekey.so/blog/learn/can-quantum-computing-break-btc-a-clear-guide-to-post-quantum-security/), states the vendor is preparing upgrades that adopt **ML-KEM** for key agreement, migrate signatures to **ML-DSA**, and increase hash strength. The same post also asserts that OneKey's existing AES-256 with PBKDF2-HMAC-SHA256 key derivation already provides post-quantum-grade symmetric security strength. An earlier September 2025 post, [Crypto And Quantum Computing – Is it a Threat?](https://onekey.so/blog/ecosystem/crypto-and-quantum-computing-is-it-a-threat/), positions the firmware-update mechanism as OneKey's adaptation path. The OneKey Pro product page additionally markets a "post-quantum cryptography ready architecture" — a hardware-readiness framing rather than a specific algorithm commitment.

**Current state.** OneKey has a documented, on-record statement naming the post-quantum signature and key-agreement algorithms it intends to adopt. This places it among the minority of hardware-wallet vendors with any published post-quantum position at all.

**Planned future work.** The November 2025 commitment names **ML-DSA**, **ML-KEM**, and a hash-strength increase as planned upgrades. No timeline, milestone, or target device has been published alongside that commitment.

## Crypto Agility

**Rating: Yes-but** *️⃣

OneKey's signing devices are closed signers: there is no plugin system, no custom keyring API, and no third-party extension marketplace. New chain support and any new signature scheme reach a device only through a vendor-published firmware update. That firmware path is the sole agility lever, and OneKey does control it — the vendor publishes firmware on its [GitHub organization](https://github.com/OneKeyHQ) and documents an [attestation flow](https://help.onekey.so/en/articles/11461223-authenticate-the-consistency-of-firmware-files-with-the-open-source-code-released-by-onekey) for verifying shipped firmware against published source.

**Current state.** Agility is partial. At the firmware layer, OneKey can extend the algorithm catalog and has committed to adding **ML-DSA** and **ML-KEM**. The constraint sits below the firmware: each device's secure element bounds which cryptographic primitives can run inside the certified, side-channel-resistant boundary. The OneKey Pro uses a multi-chip secure-element architecture (four EAL6+ secure elements, one identified by the vendor as a TMC THD89); other signing SKUs use a single EAL6+ secure element whose vendor OneKey has not disclosed. Whether those secure elements support post-quantum primitives has not been publicly characterized. OneKey's deterministic BIP-39 / BIP-32 seed model is also a structural factor: post-quantum signature keys are substantially larger than classical seed-derived keys, so a post-quantum migration would require a new keystore format rather than reusing the existing one.

**Planned future work.** The committed **ML-DSA** and **ML-KEM** additions are the agility work in flight at the posture level. Their delivery depends on firmware support and on the secure-element capabilities described above; no shipping date has been published.

## Protocol PQC

**Rating: N/A** ➖

This column measures whether the wallet signs user transactions with a chain's protocol-level post-quantum scheme on a post-quantum-native chain. None of the post-quantum-native chains tracked appear in OneKey's coin catalog, so there is no supported chain on which a protocol-level post-quantum transaction could be signed. Algorand is in OneKey's catalog, but Algorand's post-quantum element is a validator-side in-protocol feature; user transactions on Algorand use Ed25519, which is what OneKey signs. With no supported chain offering a protocol-level post-quantum signature path for user transactions, this column does not apply.

## Contract PQC Support

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for OneKey in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Off-Chain PQC

**Rating: No** ❌

We have found no public information indicating post-quantum migration activity for OneKey in this column. If we are mistaken and an effort exists that we have missed, we would like to hear about it — see the contact link in the footer.

## Vendor & Governance

OneKey is built by OneKey Limited, a privately held company based in Hong Kong. Product direction is company-led; there is no DAO or token governing hardware or firmware decisions, and community engagement runs through Discord, X, and GitHub issues.

Post-quantum and product commitments surface on the [OneKey blog](https://onekey.so/blog/), which is where the November 2025 and September 2025 post-quantum statements were published. Firmware source is published on the [OneKey GitHub organization](https://github.com/OneKeyHQ), and OneKey documents a [firmware attestation flow](https://help.onekey.so/en/articles/11461223-authenticate-the-consistency-of-firmware-files-with-the-open-source-code-released-by-onekey) so users can verify a shipped binary against released source.

For security, OneKey directs bug reports through its help center and a `security@onekey.so` address; no public bug-bounty program was located in this research pass. On audit history, the OneKey Pro was audited by SlowMist, with an overall conclusion of "Low Risk" ([SlowMist audit report](https://github.com/slowmist/Knowledge-Base/blob/master/open-report-V2/blockchain-application/SlowMist%20Audit%20Report%20-%20OneKey%20Pro_en-us.pdf)); the Classic 1S is also reported as SlowMist-audited.

---

_Generated on 16 May 2026 based on information as of 11 May 2026._

_[Propose a correction or update](https://github.com/tectonic-labs/quantum-tracker-data/issues/new?template=data-correction.yml)_

_Editorial policy: none currently published._
