pragma solidity ^0.4.15;

import "./Owned.sol";

contract Administration is Owned {
  uint public productIds;
  mapping(uint => Product) public productLine;

  enum Role { Admin, Regular }

  struct Product {
    uint id;
    uint price;
    uint stock;
    bool active;
  }

  modifier isAdmin {
      require(admins[msg.sender]);
      _;
  }

  event NewProductAdded(address administrator, uint productId);
  event ProductRemoved(address administrator, uint productId);
  event ProductStockChanged(address administrator, uint productId, uint oldStock, uint newStock);
  event ProductPriceChanged(address administrator, uint productId, uint oldPrice, uint newPrice);

  function addNewProduct(uint price, uint stock)
      public
      isAdmin
      returns (uint)

  {
      // only administrators can add products
      Product memory product;
      productIds++;
      product.id = productIds;
      product.price = price;
      product.stock = stock;
      product.active = true;
      productLine[product.id] = product;
      NewProductAdded(msg.sender, product.id);
      return product.id;
  }

  function removeProduct(uint productId)
      public
      isAdmin
    {
      productLine[productId].active = false;
    }

  function changeStock(uint productId, uint newStock)
      public
      isAdmin
    {
      productLine[productId].stock = newStock;
    }

  function changePrice(uint productId, uint newPrice)
      public
      isAdmin
    {
      productLine[productId].stock = newPrice;
    }

}
