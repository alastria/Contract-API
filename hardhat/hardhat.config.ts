import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import dotenvx from "@dotenvx/dotenvx";

dotenvx.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10,
      },
      evmVersion: "berlin",
    },
  },
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
  },
  networks: {
    redB: {
      url: process.env.NETWORK_URL,
      accounts: [process.env.NETWORK_WALLET_PRIV_KEY]
    },
  },
};

export default config;
