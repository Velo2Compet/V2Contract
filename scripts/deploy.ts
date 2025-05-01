// scripts/deploy-factory.ts
import { ethers, upgrades } from "hardhat";

async function main() {
  const version = "1.0.0";

  const factoryContract = await ethers.getContractFactory("V2Contract");
  const factory = await upgrades.deployProxy(factoryContract, [version], {
    kind: "uups",
  });
  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();

  console.log("✅ V2Contract deployed at:", factoryAddress);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
