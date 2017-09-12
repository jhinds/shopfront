pragma solidity ^0.4.15;

import './Administration.sol';
import './Stoppable.sol';

contract Shopfront is Administration, Stoppable {
  uint public productIds;
  address public owner;
  bool public active;

  function Shopfront() {
    productIds = 0;
  }

  event ProductBought(address buyer, uint productId);

  function() payable { }

  function viewProduct(uint id)
      public
      constant
      returns (uint productId, uint price, uint stock, bool isActive)
  {
      ProductBought(msg.sender, id);
      Product memory product = productLine[id];
      productId = product.id;
      price = product.price;
      stock = product.stock;
      isActive = product.active;
      return (productId, price, stock, isActive);
  }

  function purchaseProduct(uint id)
      public
      payable
      returns (bool)
  {
      require(productLine[id].active);
      require(productLine[id].stock > 0);
      require(productLine[id].price == msg.value);
      cashRegister += msg.value;
      productLine[id].stock--;
      ProductBought(msg.sender, id);
      return true;
  }

}
