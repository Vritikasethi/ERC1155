// SPDX-License-Identifier: MIT
pragma solidity <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MyToken is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    uint256 public maxSupply;
    uint public currentPrice = 1000000000000000;

    constructor(string memory _uri, uint _maxSupply) ERC1155(_uri) Ownable(msg.sender) {
        maxSupply = _maxSupply;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function deductAmount(uint256 _id) private {
        uint256 amount = totalSupply(_id);
        currentPrice = (1000000000000000 * amount * amount)/16000;
    }

    function mint(address account, uint256 id, uint256 amount)
        public
        payable
    {
        require(totalSupply(id) + amount <= maxSupply, "MyToken: Max supply exceed");
        _mint(account, id, amount, "");
        deductAmount(id);
    }

    function burnToken(uint256 id, uint256 balance) public {
        burn(msg.sender, id, balance);
        deductAmount(id);
        payable(msg.sender).transfer(currentPrice);
    }

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}