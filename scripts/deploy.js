// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const NFT = await hre.ethers.getContractFactory("OasisNFT");
  const nft = await NFT.deploy();
  await nft.deployed();

  console.log("OasisNFT deployed to:", nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
