// contracts/NFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFTContract is ERC721URIStorage {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;

  constructor() ERC721('MyNFT', 'NFT') {}

  function mint(string memory _uri) public {
    _mint(msg.sender, _tokenIdCounter.current());
    _setTokenURI(_tokenIdCounter.current(), _uri);
    _tokenIdCounter.increment();
  }

  function burn(uint256 _tokenId) public {
    require(_exists(_tokenId), "You are'nt burn this nft");
    _burn(_tokenId);
  }
}
