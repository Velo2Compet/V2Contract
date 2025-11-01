// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract V2CERC20 is ERC20, Ownable { 
    uint256 public immutable maxSupply;

    constructor(
        string memory name_,
        string memory symbol_,
        address owner_,
        uint256 maxSupply_
    ) ERC20(name_, symbol_) Ownable(owner_) {
        require(maxSupply_ > 0, "Max supply must be greater than 0");
        maxSupply = maxSupply_;
        _mint(owner_, maxSupply_);
    }

    function mint(address, uint256) public pure {
        revert("Minting is disabled");
    }
}
