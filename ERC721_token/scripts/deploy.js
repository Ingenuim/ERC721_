const { ethers } = require("hardhat");

async function main() {
  const UniqueArtNFT = await ethers.getContractFactory("UniqueArtNFT");
  const uniqueart = await UniqueArtNFT.deploy("Ingenuin's Token", "INFT", "Details of NFT");
  await uniqueart.deployed();

  console.log("ERC_NFT contract deployed to:", uniqueart.address);
}

// Running the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

