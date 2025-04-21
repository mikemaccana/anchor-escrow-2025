# Anchor Escrow 2025

## 🆕 Updated for Solana Kit, Kite, and Codama

![CI Badge](https://github.com/mikemaccana/anchor-escrow-2025/actions/workflows/tests.yaml/badge.svg)

**Start here for your first real Solana program.** As the saying goes, "All Solana programs are variations of an escrow." This makes **Anchor Escrow 2025** the perfect starting point for anyone diving into Solana development with a practical, real-world application.

**Anchor Escrow 2025** provides:

- Full compatibility with the latest Rust, Agave CLI, Node.js, Anchor, and Solana Kit.
- Clean builds with zero warnings or errors for a smooth, distraction-free experience.
- Testing via npm and Node.js, avoiding third-party package managers or test runners.

## Animated walk through

Check out the **full animated explanation** of the Escrow program from mySolana TURBIN3 video:

[![Full animated explanation of the Escrow program](https://img.youtube.com/vi/ZMB_OqLIeGw/maxresdefault.jpg)](https://www.youtube.com/watch?v=ZMB_OqLIeGw)

This repository is [designed for teaching and learning](CHANGELOG.md).

## Introduction

This Solana program implements an **escrow**, enabling secure token swaps between users. For example, Alice can offer 10 USDC in exchange for 100 WIF.

Without an escrow, users face significant risks:

- **Traditional finance** charges 1-6% in fees, eating into your funds.
- **Manual swaps** are prone to fraud. If Bob takes Alice's 10 USDC but doesn't send the 100 WIF, or if Alice fails to deliver after receiving Bob's tokens, someone gets burned.

The **Anchor Escrow 2025** program acts as a trusted intermediary, releasing tokens only when both parties meet the agreed terms. This ensures Alice and Bob each receive 100% of their desired tokens, securely and without middleman fees.

## Versions

Verify your local environment with:

```bash
npm run show-versions
```

This repository was tested with:

```
Solana CLI: solana-cli 2.1.0 (src:c1080de4; feat:3176011155, client:Agave)
Anchor: anchor-cli 0.31.1
Node: v22.11.0
Rust: rustc 1.86.0 (05f9846f8 2025-03-31)
```

Using different versions may cause compatibility issues.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/mikemaccana/anchor-escrow-2025.git
   cd anchor-escrow-2025
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run tests:

   ```bash
   RUSTUP_TOOLCHAIN=nightly-2025-04-16 anchor test
   ```

4. Deploy the program:
   ```bash
   anchor deploy
   ```

## Changelog and Credits

See the [CHANGELOG](CHANGELOG.md) for updates and contributor credits.
