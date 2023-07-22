// SPDX-License-Identifier: MIT 
 
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract UniqueArtNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    string private _promptDescription;

    constructor(string memory name, string memory symbol, string memory promptDescription) ERC721(name, symbol) {
        _promptDescription = promptDescription;
    }

    function getArtDescription() public view returns (string memory) {
        return _promptDescription;
    }

    function mintArtNFT(address recipient, string memory tokenURI) public returns (uint256) {
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}