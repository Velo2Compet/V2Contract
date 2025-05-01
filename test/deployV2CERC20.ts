import { ethers } from "hardhat";
import { expect } from "chai";
import * as dotenv from "dotenv";
import { Log } from "ethers";

dotenv.config();

describe("V2Contract Token Deployment", function () {
  let factory: any;
  const name = "MyToken";
  const symbol = "MTK";
  const maxSupply = ethers.parseUnits("1000000", 18);

  before(async function () {
    const factoryAddress = process.env.FACTORY_ADDRESS;
    if (!factoryAddress) {
      throw new Error("❌ FACTORY_ADDRESS not set in .env");
    }

    console.log("🔗 Loading factory at:", factoryAddress);
    factory = await ethers.getContractAt("V2Contract", factoryAddress);
  });

  it("should deploy a token with correct parameters", async function () {
    const [deployer] = await ethers.getSigners();
    console.log("👤 Deployer address:", deployer.address);

    const fee = await factory.commissionFee();
    console.log("💰 Commission fee required:", ethers.formatEther(fee), "ETH");

    console.log("🚀 Deploying token via factory...");
    const tx = await factory.deployToken(name, symbol, maxSupply, {
      value: fee,
    });

    const receipt = await tx.wait();
    console.log("📬 Transaction confirmed in block:", receipt.blockNumber);

    const event = receipt?.logs
      .map((log: Log) => {
        try {
          return factory.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find((log: any) => log?.name === "TokenDeployed");

    expect(event).to.not.be.undefined;
    const tokenAddress = event!.args.tokenAddress;
    console.log("✅ Token deployed at:", tokenAddress);

    const token = await ethers.getContractAt("V2CERC20", tokenAddress);

    console.log("🔍 Checking token properties...");
    expect(await token.name()).to.equal(name);
    expect(await token.symbol()).to.equal(symbol);
    expect(await token.totalSupply()).to.equal(maxSupply);
    expect(await token.balanceOf(deployer.address)).to.equal(maxSupply);
    expect(await token.maxSupply()).to.equal(maxSupply);

    console.log("✅ Token deployment test passed.");
  });
});