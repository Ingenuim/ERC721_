const hre = require("hardhat");

async function main() {
  // Connect to the Goerli Ethereum Testnet
  const network = hre.network.name;
  console.log("Connected to network:", network);

  // Retrieve the deployed contract
  const UniqueArtNFT = await hre.ethers.getContractFactory("UniqueArtNFT");
  const uniqueart = await UniqueArtNFT.attach("0x91F46DD9D9912C802F6d0D46AdC08bEe5502EC1D");
  console.log("Contract address:", uniqueart.address);

  // Place you IPFS URLs from the pinata.cloud
  const ipfsUrls = [
    "https://gateway.pinata.cloud/ipfs/QmQ2QMstqKYahSk7GbaaRFQ1FWkhUn7EKDe1zMvF9v6h27",
    "https://gateway.pinata.cloud/ipfs/QmctjbyoAXbd6dtTPrsd7DKEfNQB2HNXmmYjm33gQsnXPR",
    "https://gateway.pinata.cloud/ipfs/QmZffU4VK4hLvRNWNMSXYipnBuGhXZ3SP7CQYa7ft1hjJK",
    "https://gateway.pinata.cloud/ipfs/QmX9fy5W6a7JmDERJP8vYfoozQTNaLNV1d5ma35RTyxMiD",
    "https://gateway.pinata.cloud/ipfs/QmRdrhrs6EUqbs4Nh5xkqUwnDhJ9oxDStjKowKMyGqJaEB"
  ];

  // execute all NFTS
  for (let i = 0; i < ipfsUrls.length; i++) {
    const recipient = await hre.ethers.provider.getSigner().getAddress();
    const tx = await uniqueart.mintNFTS(recipient, ipfsUrls[i]);
    const receipt = await tx.wait();
    const tokenId = receipt.events[0].args.tokenId;
    console.log(`Executed NFT with the Token's ID ${tokenId}`);
  }
   
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });