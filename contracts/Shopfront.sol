pragma solidity ^0.4.15;

contract Shopfront {

  struct Product {
    uint id;
    uint price;
    uint stock;
  }

  mapping(uint => Product) public productLine;
  mapping(address => uint) public carts;

  // not sure
  mapping(address => uint) public administrators;

  uint public productIds;
  address public owner;

  function Shopfront() {
    owner = msg.sender;
    productIds = 0;
  }

  event NewProductAdded(address administrator, uint productId);
  event ProductBought(address buyer, uint productId);

  function addNewProduct(uint price, uint stock) returns (uint) {
    // only administrators can add products
    /*require();*/
    Product memory product;
    productIds++;
    product.id = productIds;
    product.price = price;
    product.stock = stock;
    productLine[product.id] = product;
    NewProductAdded(msg.sender, product.id);
    return product.id;
  }

  function viewProduct(uint id) public constant returns (uint productId, uint price, uint stock){
    Product memory product = productLine[id];
    productId = product.id;
    price = product.price;
    stock = product.stock;
  }

  function purchaseProduct(uint id) payable returns (bool){
    // might need a check to see if a product with that id even exists
    require(productLine[id].stock > 0);
    require(productLine[id].price < msg.value);
    productLine[id].stock--;
    carts[msg.sender] = id;
    ProductBought(msg.sender, id);
    return true;
  }

}
