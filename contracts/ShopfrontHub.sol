pragma solidity ^0.4.15;

import "./Shopfront.sol";

contract ShopFrontHub is Stoppable {
    address[] public shopfronts;
    mapping(address => bool) shopfrontExists;

    event LogNewShopfront(address shopfront, address sender);
    event LogShopfrontClosed(address shopfront, address sender);
    event LogShopfrontReopened(address shopfront, address sender);
    event LogOwnerChanged(address shopfront, address sender, address newOwner);
    event LogHubDestroyed(address sender);

    function ShopFrontHub() {
      owner = msg.sender;
    }

    modifier onlyIfShopfront(address shopfront) {
        require(shopfrontExists[shopfront] != true);
        _;
    }

    function createShop()
        returns(address shopfront)
      {
        address shopAddress = new Shopfront();
        assert(!shopfrontExists[shopAddress]);
        shopfrontExists[shopAddress] = true;
        LogNewShopfront(shopAddress, msg.sender);
        return shopAddress;
    }

    function changeShopOwner(address shopfront, address newOwner)
        onlyOwner
        returns(bool)
      {
        require(newOwner != address(0x0));
        require(newOwner != owner);
        Shopfront s = Shopfront(shopfront);
        s.changeOwner(newOwner);
        LogOwnerChanged(shopfront, msg.sender, newOwner);
        return true;
    }

    function closeShop(address shopfront)
        onlyOwner
        onlyIfShopfront(shopfront)
        returns(bool success)
    {
        Shopfront trustedShopfront = Shopfront(shopfront);
        LogShopfrontClosed(shopfront, msg.sender);
        return(trustedShopfront.runSwitch(false));
    }

    function reOpenShop(address shopfront)
        onlyOwner
        onlyIfShopfront(shopfront)
        returns(bool success)
    {
        Shopfront trustedShopfront = Shopfront(shopfront);
        LogShopfrontReopened(shopfront, msg.sender);
        return(trustedShopfront.runSwitch(true));
    }

    function killSwitch()
        onlyOwner
    {
        LogHubDestroyed(msg.sender);
        selfdestruct(msg.sender);
    }

}
