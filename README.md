PolDot Space
PD Logo
A lightweight, fully client-side Polkadot staking and governance hub

##Overview

PolDot Space is a lightweight, user-friendly web application designed to simplify interaction with the Polkadot ecosystem. It provides an intuitive interface for staking operations and governance participation directly from your browser, without requiring any backend servers or centralized infrastructure.

##Key Features

-- Staking Management: Nominate validators, view your staking info, and claim rewards

-- Governance: View and vote on active referenda

-- Fully Client-Side: All blockchain interactions happen directly from your browser

-- Self-Custody: Connect with existing Polkadot wallets like Polkadot.js, Talisman, or SubWallet

-- Responsive Design: Works seamlessly on desktop and mobile devices

##Getting Started

Prerequisites

    Node.js 18+ and npm
    Any Polkadot wallet extension (Polkadot.js, Talisman, SubWallet, etc.)

Installation

    Clone the repository:

    git clone https://github.com/yourusername/dotflow.git
    cd dotflow

Install dependencies:

npm install

Start the development server:

npm run dev

    Open your browser and navigate to http://localhost:3000

##Architecture

PolDot is built with a modern web stack:

    Frontend: React + TypeScript
    State Management: React Query + React Context
    UI Framework: Custom UI components with Tailwind CSS
    Blockchain Integration: @polkadot/api and @polkadot/extension-dapp
    Build Tools: Vite + esbuild

The application is organized into several key modules:

    Wallet Connection: Integration with browser extension wallets for signing transactions
    Staking Module: Features for managing validator nominations and rewards
    Governance Module: UI for browsing and voting on referenda
    Light Client: Status indicators for network connection and synchronization

##Usage Guide

Connecting Your Wallet

    Click on "Connect Wallet" in the application header
    Approve the connection request in your Polkadot wallet extension
    Your wallet address and balance will appear in the header

Staking Operations

    Navigate to the "Staking" tab
    View your current nominations and staking rewards
    Browse available validators and nominate new validators
    Claim rewards or adjust your staked amount

Participating in Governance

    Navigate to the "Governance" tab
    Browse the list of active and closed referenda
    Click on a referendum to view detailed information
    Vote "Aye" or "Nay" on active referenda using your connected wallet

## Development Guidelines

Code Organization

    client/src/components: UI components organized by feature
    client/src/hooks: Custom React hooks for blockchain interaction
    client/src/lib: Utility functions and API setup
    client/src/pages: Application pages and routes
    client/src/types: TypeScript type definitions

Adding New Features

    Create new components in the appropriate folder
    Add any required hooks in the hooks directory
    Update the relevant module (Staking or Governance)
    Add any new types to the types directory

##Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

    Fork the repository
    Create your feature branch (git checkout -b feature/amazing-feature)
    Commit your changes (git commit -m 'Add some amazing feature')
    Push to the branch (git push origin feature/amazing-feature)
    Open a Pull Request

##License

This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgements

    Polkadot Network for creating an amazing ecosystem
    Polkadot.js for their excellent JavaScript libraries
    All the validators and nominators who secure the Polkadot network
