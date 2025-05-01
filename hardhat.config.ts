import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "@openzeppelin/hardhat-upgrades";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const etherscanApiKey = process.env.BASESCAN_API_KEY;
const networkUrl = process.env.NETWORK_URL;
const chainId = parseInt(process.env.CHAIN_ID!);
const network = process.env.NETWORK_API;
const apiURL = process.env.URL_API;
const browserURL = process.env.BROWSER_URL_API;

if (!privateKey) {
  throw new Error("❌ PRIVATE_KEY is missing in .env file");
}
if (!etherscanApiKey) {
  throw new Error("❌ BASESCAN_API_KEY is missing in .env file");
}

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    baseSepolia: {
      url: networkUrl!,
      chainId: chainId,
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: {
      baseSepolia: etherscanApiKey,
    },
    customChains: [
      {
        network: network!,
        chainId: chainId!,
        urls: {
          apiURL: apiURL!,
          browserURL: browserURL!,
        },
      },
    ],
  },
};

export default config;
