require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: {
    version: "0.8.1",
  },
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/3f347357e9474fdb9ecd8b8ab81c724c",
      accounts: ['bf021429e06c7c77f9bae744c219552b71b6c1d9c26c4fc0f5c2d911c7197946'],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: ['bf021429e06c7c77f9bae744c219552b71b6c1d9c26c4fc0f5c2d911c7197946'],
    },
  },
};

