// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");


async function main() {
  const MyNft = await hre.ethers.deployContract("MyToken",["https://red-secret-crayfish-678.mypinata.cloud/ipfs/QmY24oR9Ue4G6YHSRYveeA4Us3Pd3nARynz7aTQrLyiVKY",1000]);
  
  await MyNft.waitForDeployment();
  console.log("contract address" ,await MyNft.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


//0x45DF7A5172FadF94D6E608518ec350aFfAE6AfFc