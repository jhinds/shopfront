var Shopfront = artifacts.require("./Shopfront.sol");
var ShopfrontHub = artifacts.require("./ShopfrontHub.sol");

contract('Shopfront', (accounts) => {

  var contract;
  var owner = accounts[0];
  var buyer = accounts[1];
  var admin = accounts[2];

  beforeEach(() => {
    return Shopfront.new({from: owner})
    .then((instance) => {
      contract = instance;
    });
  });

  it("should allow administrators to add products", async () => {
    var priceItem1 = 10;
    var stockItem1 = 20;

    var priceItem2 = 100;
    var stockItem2 = 50;

    await contract.addNewProduct(priceItem1, stockItem1, {from: owner})
    const id2 = await contract.addNewProduct.call(stockItem2, priceItem2, {from: owner})
    assert.equal(id2, 2, "Second product added should have an id of 2.")
  });

  it("should allow users to purchase a product", async () => {
    var priceItem1 = 10;
    var stockItem1 = 20;

    await contract.addNewProduct(priceItem1, stockItem1, {from: owner});
    const bought = await contract.purchaseProduct(1, {from: buyer, value: priceItem1});
    const product = await contract.viewProduct(1, {from: buyer});
    console.log(product[2], 19, 'Stock should be one less than initially added due to purchase.');
  });

  it("should allow administrators to remove products", async () => {
    var priceItem1 = 10;
    var stockItem1 = 20;
    var id = 1;

    await contract.addNewProduct(priceItem1, stockItem1, {from: owner});
    const productAdded = await contract.viewProduct(id, {from: buyer});
    console.log(product[3], true, 'Newly added product should be active.');
    await contract.removeProduct(id, {from: owner});
    const productRemoved = await contract.viewProduct(id, {from: buyer});
    console.log(product[3], false, 'Removed product should be inactive.');

  });

});
