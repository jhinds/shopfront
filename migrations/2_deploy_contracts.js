var Administration = artifacts.require("./Administration.sol");
var Merchant = artifacts.require("./Merchant.sol");
var Owned = artifacts.require("./Owned.sol");
var Shopfront = artifacts.require("./Shopfront.sol");
var Stoppable = artifacts.require("./Stoppable.sol");

module.exports = function(deployer) {
  deployer.deploy(Administration);
  deployer.deploy(Merchant);
  deployer.deploy(Owned);
  deployer.deploy(Shopfront);
  deployer.deploy(Stoppable);
};
