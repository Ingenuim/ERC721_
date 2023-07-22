const hre = require("hardhat");
async function main() {
  // Connect with the Testnet
  if (hre.network.name !== "mumbai") {
    throw new Error("Please run the script on the Mumbai network.");
  }
  console.log("Connected to network:", hre.network.name);
  const bridgeAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de"; //address for bridge
  const uniqueartAddress = "0xd9692f0d44e79E9085b3584a8ea7C89342a84A32"; //address of deployed contract

  
  const UniqueArtNFT = await hre.ethers.getContractFactory("UniqueArtNFT");
  const uniqueArtContract = await UniqueArtNFT.attach(uniqueartAddress);
  console.log("Contract address:", uniqueArtContract.address);

  // Token IDs of the NFTs you want to send
  const tokenIds = [95, 96, 97, 98, 99];
  const wallet = "0x91F46DD9D9912C802F6d0D46AdC08bEe5502EC1D"; //Wallet address
  let nftCount = 0; // Store the count of NFTs owned by the wallet

  // Approve and deposit each token to the FxPortal Bridge for sending
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    console.log(`Confirm token with token ID ${tokenId} for transfer`);
    await uniqueArtContract.approve(bridgeAddress, tokenId);

    console.log(`Store token with token ID ${tokenId} on the Bridge`);  //Fx portal Bridge
    await uniqueArtContract["safeTransferFrom(address,address,uint256)"](wallet, bridgeAddress, tokenId);

    // Increment the NFT count for each successful transfer
    nftCount++;
  }
  console.log("Transfer of token executed completely");
  console.log(`Total token owned by the wallet (${wallet}):`, nftCount);


  // Print the balance of the wallet
  const walletBalance = await hre.ethers.provider.getBalance(wallet);
  console.log("Balance of wallet", wallet, "is:", walletBalance.toString());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
