pragma solidity ^0.4.15;

contract Owned {
    address public owner;
    uint public cashRegister;
    mapping(address => bool) admins;

    event LogNewOwner(address sender, address oldOwner, address newOwner);
    event LogFundsWithdrawn(address sender);

    function Owned() {
        owner = msg.sender;
        admins[owner] = true;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function() payable {}

    function changeOwner(address newOwner)
        public
        onlyOwner
        returns (bool success)
    {
        require(newOwner == 0);
        LogNewOwner(msg.sender, owner, newOwner);
        owner = newOwner;
        return true;
    }

    function addAdmin(address newAdmin)
        public
        onlyOwner
        returns (bool success)
    {
        require(newAdmin != 0);
        admins[newAdmin] = true;
        return true;
    }

    function removeAdmin(address revokedAdmin)
      public
      onlyOwner
      returns (bool success)
    {
      require(revokedAdmin == 0);
      admins[revokedAdmin] = false;
      return true;
    }

    function withdrawFunds(uint amount)
      public
      onlyOwner
      returns (bool)
    {
      cashRegister -= amount;
      msg.sender.transfer(amount);
      owner.transfer(this.balance);
      LogFundsWithdrawn(owner);
      return true;
    }

    function makePayment()
      public
      payable
      onlyOwner
      returns (bool)
    {
      cashRegister += msg.value;
      return true;
    }


}
