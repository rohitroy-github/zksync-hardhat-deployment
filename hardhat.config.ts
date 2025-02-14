import "@matterlabs/hardhat-zksync-solc"; // Plugin for zkSync Solidity compiler
import "@matterlabs/hardhat-zksync-deploy"; // Plugin for deploying contracts on zkSync
import "@matterlabs/hardhat-zksync-verify"; // Plugin for verifying contracts on zkSync
import { HardhatUserConfig } from "hardhat/config"; // Hardhat configuration type
import dotenv from "dotenv"; // Module to load environment variables

// Load environment variables from .env file
dotenv.config();

const config: HardhatUserConfig = {
  // zkSync Solidity compiler settings (using default settings here)
  zksolc: {},

  // Solidity compiler version configuration
  solidity: {
    version: "0.8.17",
  },

  // Set the default network for deployments
  defaultNetwork: "zkTestnet",

  networks: {
    // zkSync testnet configuration
    zkTestnet: {
      url: "https://sepolia.era.zksync.dev", // zkSync Era testnet RPC URL

      // Ethereum Web3 RPC URL for L1 interactions (can use Infura, Alchemy, etc.)
      // ethNetwork: "https://sepolia.infura.io/v3/<API_KEY>", // Alternative way to define L1 network
      ethNetwork: "sepolia", // Use predefined network alias

      zksync: true, // Required flag to indicate this is a zkSync network
    },
  },

  etherscan: {
    apiKey: {
      // API key for zkSync contract verification, fetched from environment variables
      zksyncsepolia: process.env.ZKSYNC_API_KEY || "",
    },
  },
};

// Export the Hardhat configuration
export default config;
