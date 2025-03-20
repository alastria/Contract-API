# Hardhat Instructions

This project is a Hardhat-based project for deploying and testing smart contracts. Below are the steps to follow to use the scripts defined in the `package.json` file and a brief explanation of what each script does.

## Prerequisites

- Node.js v20.13.1 or higher
- npm (Node Package Manager)

## Installation

First, clone the repository and navigate to the project directory:

```sh
git clone <repository-url>
cd Contract-API/hardhat
```

Then, install the dependencies:

```sh
npm install --force
```

## Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

You can copy the `.env.sample` file and rename it to `.env`:

```sh
cp .env.sample .env
```

Modify `.env` and set `NETWORK_URL` to a valid network URL that allows Hardhat to connect to the blockchain node of your choosing. Also, set `{ContractName}_CONSTRUCTOR_PARAMS` to construct the contracts however you want.

## Hardhat Instructions

In order to use Hardhat to both compile and deploy the smart contracts here, you have to do the following steps:

1. Copy `.env.sample` and rename it to `.env`
2. Modify `.env` and set `NETWORK_URL` to a valid network URL that allows Hardhat to connect to the blockchain node of your choosing
3. Modify `{ContractName}_CONSTRUCTOR_PARAMS` to construct the contracts however you want.
4. Modify `scripts/deploy.ts` to choose which contracts you wish to deploy.
5. Run the following command to install all NPM packages: `npm install`
6. Run the deploy or compile script: `npm run deploy` or `npm run compile`

And you are done!

If you deployed the contracts, the contract addresses will be saved in `addresses-{NETWORK_NAME}.json`
If you compiled, the compiled contracts will be saved in `artifacts/contracts`

## Scripts

### Compile

The compile script compiles the smart contracts using Hardhat.

This script runs the following command:

```sh
npm run compile
```

### Deploy

The deploy script deploys the smart contracts to a specified network. By default, it uses the `redB` network.

```sh
npm run deploy
```

Make sure to set the necessary environment variables in a `.env` file before running this script. The required variables are:

- `NETWORK_URL`: The URL of the network to deploy to.
- `NETWORK_WALLET_PRIV_KEY`: The private key of the wallet to use for deployment.

Modify `deploy.ts` to choose which contracts you wish to deploy.

If you deployed the contracts, the contract addresses will be saved in `addresses-{NETWORK_NAME}.json`.

### Test

The test script runs the tests for the smart contracts using Hardhat.

This script runs the following command:

```sh
npm run test
```

## Project Structure

- `contracts/`: Contains the Solidity smart contracts.
- `scripts/`: Contains the deployment scripts.
- `test/`: Contains the test files for the smart contracts.
- `hardhat.config.ts`: The Hardhat configuration file.

## Dependencies

The project uses the following dependencies:

- `@dotenvx/dotenvx` (1.5.0): For managing environment variables.
- `@nomicfoundation/hardhat-chai-matchers` (^2.0.8): Chai matchers for Hardhat.
- `@nomiclabs/hardhat-ethers` (^2.2.3): Ethers.js integration for Hardhat.
- `@nomiclabs/hardhat-waffle` (^2.0.6): Waffle integration for Hardhat.
- `@openzeppelin/contracts` (^5.2.0): OpenZeppelin smart contract library.
- `@types/node` (20.12.11): TypeScript definitions for Node.js.
- `chai` (^4.3.6): Assertion library for testing.
- `eslint` (9.2.0): Linter for JavaScript and TypeScript.
- `ethereum-waffle` (^3.4.0): Testing framework for Ethereum.
- `ethers` (^5.7.2): Library for interacting with the Ethereum blockchain.
- `hardhat` (^2.22.8): Ethereum development environment.
- `ts-node` (10.9.2): TypeScript execution environment for Node.js.
- `typescript` (5.4.5): TypeScript language.

## License

This project is licensed under the MIT License.

