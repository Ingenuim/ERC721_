const hre = require("hardhat");

// Replace this with the actual ABI of the FxRoot contract
const fxRootABI = [{"inputs":[{"internalType":"address","name":"_checkpointManager","type":"address"},{"internalType":"address","name":"_fxRoot","type":"address"},{"internalType":"address","name":"_fxERC721Token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"rootToken","type":"address"},{"indexed":true,"internalType":"address","name":"depositor","type":"address"},{"indexed":true,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"FxDepositERC721","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"rootToken","type":"address"},{"indexed":true,"internalType":"address","name":"childToken","type":"address"},{"indexed":true,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"FxWithdrawERC721","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"rootToken","type":"address"},{"indexed":true,"internalType":"address","name":"childToken","type":"address"}],"name":"TokenMappedERC721","type":"event"},{"inputs":[],"name":"DEPOSIT","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAP_TOKEN","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SEND_MESSAGE_EVENT_SIG","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkpointManager","outputs":[{"internalType":"contract ICheckpointManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"childTokenTemplateCodeHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"salt","type":"bytes32"},{"internalType":"bytes32","name":"bytecodeHash","type":"bytes32"},{"internalType":"address","name":"deployer","type":"address"}],"name":"computedCreate2Address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"rootToken","type":"address"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fxChildTunnel","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fxRoot","outputs":[{"internalType":"contract IFxStateSender","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"rootToken","type":"address"}],"name":"mapToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"processedExits","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"inputData","type":"bytes"}],"name":"receiveMessage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rootToChildTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_fxChildTunnel","type":"address"}],"name":"setFxChildTunnel","outputs":[],"stateMutability":"nonpayable","type":"function"}];

async function main() {
  // Connect with the Goerli Testnet
  if (hre.network.name !== "goerli") {
    throw new Error("Please run the script on the Goerli network.");
  }
  console.log("Connected to network:", hre.network.name);

  const bridgeAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de"; // Replace with the actual FxRoot contract address on Ethereum Mainnet
  const uniqueartAddress = "0x0D512B3704452fFA239e37C6009B3292fBDAc371"; // Replace with the actual UniqueArtNFT contract address on Goerli

  const WalletAddress = "0x91F46DD9D9912C802F6d0D46AdC08bEe5502EC1D";
  const UniqueArtNFT = await hre.ethers.getContractFactory("UniqueArtNFT");
  const uniqueArtContract = await UniqueArtNFT.attach(uniqueartAddress);
  console.log("Contract address:", uniqueArtContract.address);

  const FxRootContract = await hre.ethers.getContractAt(fxRootABI, bridgeAddress);
  console.log("FxRoot contract address:", FxRootContract.address);

  // Token IDs of the NFTs you want to send
  const tokenIds = [11,12,13,14,15]; // Replace with the actual token IDs of the NFTs you want to send

  // Approve and deposit each token to the FxRoot Bridge for sending
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];

    const approveTx = await uniqueArtContract.approve(bridgeAddress, tokenId);
    await approveTx.wait();

    console.log(`approval confirmed with token ID ${tokenId} to the bridge`);


    const depositTx = await FxRootContract.deposit(uniqueartAddress, WalletAddress, tokenId, "0x6556");
    await depositTx.wait();

    console.log(`Deposit token with token ID ${tokenId} to the Bridge`); // FxRoot Bridge
  }

  console.log("Transfer of tokens executed completely");
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
