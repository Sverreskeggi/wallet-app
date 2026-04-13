# Web3 Wallet

A decentralized wallet interface built with React and wagmi. Connects to MetaMask and interacts directly with the Ethereum blockchain — no backend, no middleman.

## Live Demo

[Add your Vercel URL here]

## Features

- Connect MetaMask wallet with one click
- Display real-time ETH balance from the blockchain
- Send ETH to any address
- View transaction confirmation on Etherscan

## Tech Stack

- React + Vite
- wagmi — React hooks for Ethereum
- viem — TypeScript interface for Ethereum
- Alchemy RPC — reliable blockchain connection

## How It Works

This app does not store any keys or funds. It communicates with the user's MetaMask extension to sign transactions and read blockchain data. All transaction signing happens inside MetaMask — the app never has access to private keys.

## Getting Started

```bash
git clone https://github.com/yourusername/wallet-app
cd wallet-app
npm install
npm run dev
```

Add your Alchemy API key in `main.jsx`:

```js
http("https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY");
```

## Requirements

- MetaMask browser extension
- Node.js 18+
