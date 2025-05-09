# PolDot Space

*A lightweight, fully client-side Polkadot staking and governance hub.*

---

## 🌐 Overview

**PolDot Space** is a streamlined, browser-based interface for engaging with the Polkadot ecosystem. Whether you're managing your staking or participating in on-chain governance, PolDot Space offers a user-friendly, self-custodial experience without requiring a backend server.

---

## 🚀 Key Features

* **Staking Management**: Nominate validators, view staking details, and claim rewards.
* **Governance**: Explore and vote on active referenda.
* **Fully Client-Side**: All interactions are executed directly in the browser.
* **Self-Custody**: Connect seamlessly with wallet extensions like [Polkadot.js](https://polkadot.js.org/), [Talisman](https://talisman.xyz/), or [SubWallet](https://subwallet.app/).
* **Responsive Design**: Optimized for both desktop and mobile devices.

---

## 🛠 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) v18 or higher
* A Polkadot-compatible browser wallet extension (Polkadot.js, Talisman, SubWallet, etc.)

### Installation

```bash
git clone https://github.com/kaanyinaele/PolDot.git
cd PolDot
npm install
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🧱 Architecture

PolDot Space is built using modern web technologies for optimal performance and flexibility:

* **Frontend**: React + TypeScript
* **State Management**: React Query + React Context
* **UI Framework**: Custom components with Tailwind CSS
* **Blockchain Integration**: [`@polkadot/api`](https://polkadot.js.org/docs/api/) + `@polkadot/extension-dapp`
* **Build Tooling**: Vite + esbuild

### Core Modules

* **Wallet Connection**: Secure integration with browser wallets for transaction signing.
* **Staking**: Manage nominations, view rewards, and interact with validators.
* **Governance**: Browse and vote on referenda.
* **Light Client Indicators**: Real-time network status and sync indicators.

---

## 📘 Usage Guide

### Connecting Your Wallet

1. Click **"Connect Wallet"** in the top navigation.
2. Approve the connection in your wallet extension.
3. Your address and balance will appear in the header.

### Staking

1. Navigate to the **Staking** tab.
2. View your nominations and rewards.
3. Select validators and nominate.
4. Claim rewards or adjust your stake.

### Governance

1. Go to the **Governance** tab.
2. Browse active and closed referenda.
3. Click a referendum for more info.
4. Vote "Aye" or "Nay" using your connected wallet.

---

## 🧑‍💻 Development Guidelines

### Project Structure

```
client/
├── src/
│   ├── components/     # UI components grouped by feature
│   ├── hooks/          # Custom React hooks for Polkadot interactions
│   ├── lib/            # Utility functions and API setup
│   ├── pages/          # Application routes and views
│   ├── types/          # TypeScript type definitions
```

### Adding Features

* Add UI components under `components/`
* Create any necessary hooks in `hooks/`
* Update the corresponding module (Staking or Governance)
* Define new types in `types/` if needed

---

## 🤝 Contributing

We welcome contributions from the community!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
