// contracts/NFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract NFTTraider {
  struct Order {
    address tokenAddress;
    uint256 tokenId;
    address sellerAddress;
    uint256 price;
  }

  mapping(address => mapping(uint256 => Order)) _orders;

  address[] _addreses;

  constructor() {}

  event Sell(
    address _tokenAddress,
    uint256 _tokenId,
    address _sellerAddress,
    uint256 price
  );
  event Buy(
    address _tokenAddress,
    uint256 _tokenId,
    address _buyerAddress,
    uint256 price
  );

  function setAddress(address _address) private {
    bool has_address = false;
    for (uint256 index = 0; index < _addreses.length; index++) {
      if (_addreses[index] == _address) has_address = true;
    }
    if (!has_address) _addreses.push(_address);
  }

  function create(
    address _tokenAddress,
    uint256 _tokenId,
    uint256 _price
  ) public {
    setAddress(_tokenAddress);
    ERC721 _contract = ERC721(_tokenAddress);

    require(_price > 0, 'Price must be above zero');
    require(
      msg.sender == _contract.ownerOf(_tokenId),
      'You are`nt owner currency nft'
    );
    require(
      address(this) == _contract.getApproved(_tokenId),
      'You must approve current nft'
    );

    _orders[_tokenAddress][_tokenId] = Order(
      _tokenAddress,
      _tokenId,
      msg.sender,
      _price
    );
  }

  function buy(address _tokenAddress, uint256 _tokenId) public payable {
    ERC721 _contract = ERC721(_tokenAddress);
    Order memory order = _orders[_tokenAddress][_tokenId];

    require(msg.value == order.price, 'Invalid price');
    require(msg.sender != order.sellerAddress, 'You must buy your nft');

    payable(order.sellerAddress).transfer(msg.value);

    _contract.transferFrom(order.sellerAddress, msg.sender, _tokenId);
  }

  function getOrders() public view returns (Order[] memory) {
    uint256 size = 0;
    for (uint256 _addr = 0; _addr < _addreses.length; _addr++) {
      uint256 local_index = 0;
      while (
        _orders[_addreses[_addr]][local_index].sellerAddress != address(0)
      ) {
        local_index = local_index + 1;
        size = size + 1;
      }
    }

    Order[] memory orders = new Order[](size);
    uint256 order_index = 0;

    for (uint256 _addr = 0; _addr < _addreses.length; _addr++) {
      uint256 local_index = 0;
      while (
        _orders[_addreses[_addr]][local_index].sellerAddress != address(0)
      ) {
        orders[order_index] = _orders[_addreses[_addr]][local_index];
        local_index = local_index + 1;
        order_index = order_index + 1;
      }
    }
    return orders;
  }
}
