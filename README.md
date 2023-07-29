
# ERC721_
## DESCRIPTION
Welcome to the UniqueArtNFT Project!

UniqueArtNFT is a straightforward ERC-721-compliant smart contract designed for creating and managing non-fungible tokens (NFTs) on the Polygon blockchain. With this contract, users can easily mint new NFTs, define their metadata through URIs, and effortlessly track the total supply and individual balances of NFTs.

## Prerequisites

Before you start, make sure you have the following installed:

Node.js and npm (Node Package Manager)
Hardhat (development framework for Ethereum smart contracts)
## FEATURES

Key Features:
- ERC-721 Compliance: The contract follows the widely accepted ERC-721 standard, ensuring seamless interoperability with other NFT applications and platforms.
- Minting Functionality: Users have the ability to mint new unique NFTs, making it ideal for artists and collectors looking to showcase their exclusive artwork and digital assets.
- Customizable Metadata: Each NFT can have its metadata set through URIs, enabling users to associate additional information or media with their tokens.
- Supply and Balance Tracking: Easily monitor the total supply of NFTs in circulation and check individual wallet balances to keep track of token ownership.
## Deployment Steps

Follow the steps below to deploy the UniqueArtNFT contract on both the Goerli and Mumbai test networks:

Install Dependencies

Install the project dependencies using npm:

- npm install
- Configure Hardhat

In the root directory of the project, update the hardhat.config.js file with your Infura project ID and the private key of your Ethereum wallet. These configurations are necessary to connect to the Goerli and Mumbai test networks and deploy the contract.

- after that create your contract with the name you want and make sure to put  .sol at the end so that it can be recognized by your compiler as it is a Solidity file.- after that execute your js file on the Goerli contract to get the address

      `npx hardhat run scripts/fileName.js --network goerli`

- after that create another file for checking the balance of your token, and deploy it again but this time on the Mumbai test network

      `npx hardhat run scripts/fileName.js --network mumbai`


## Contributing

Please note that this project is intended for educational and testing purposes. Before deploying it on a live network, ensure proper testing and auditing to avoid potential risks. Feel free to explore the code and extend the functionalities to suit your specific needs.

We hope UniqueArtNFT will serve as a useful starting point for your NFT projects on the Polygon blockchain. Happy creating and collecting!


## License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.


