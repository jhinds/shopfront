var Shopfront = artifacts.require("./Shopfront.sol");

contract('Shopfront', (accounts) => {

  var contract;
  var owner = accounts[0];
  var buyer = accounts[1];
  var admin = accounts[2];
  // look into how I can make this into a Product
  // var product = {id: 1, price: 20, stock: 5};

  beforeEach(() => {
    return Shopfront.new({from: owner})
    .then((instance) => {
      contract = instance;
    });
  });

  it("should allow administrators to add products", () => {
    var priceItem1 = 10;
    var stockItem1 = 20;

    var priceItem2 = 100;
    var stockItem2 = 50;

    return contract.addNewProduct.call(priceItem1, stockItem1, {from: owner})
    .then((_txn) => {
      console.log(_txn);
      return contract.addNewProduct.call(priceItem2, stockItem2, {from: owner})
      .then((_txn) => {
        console.log(_txn);
        return
      });
    });
  });

  it("should allow users to purchase a product", () => {
    var priceItem1 = 10;
    var stockItem1 = 20;

    var priceItem2 = 100;
    var stockItem2 = 50;

    // return contract.addNewProduct(priceItem1, stockItem1, {from: owner})
    // .then((_txn) => {
    //   return contract.viewProduct(1, {from: buyer1})
    //   .then((_txn) => {
    //     return contract.purchaseProduct(1, {from: buyer1}).
    //     then((success) => {
    //       return;
    //     });
    //   });
    // });
  });

  it("should allow owners to add and remove value from the contract", () => {
  });

  it("should allow removal of a product", () => {
  });

  it("should allow products to be co-purchased", () => {
  });

});
