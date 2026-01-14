// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {V2CERC20} from "./V2CERC20.sol";

contract V2Contract is Initializable, OwnableUpgradeable, UUPSUpgradeable { //

    string public contractVersion;
    uint256 public commissionFee;

    event TokenDeployed(address indexed tokenAddress, address indexed owner, string version);
    event CommissionFeeUpdated(uint256 newFee);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(string memory _version) public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        contractVersion = _version;
        commissionFee = 0;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    function setCommissionFee(uint256 newFee) external onlyOwner {
        commissionFee = newFee;
        emit CommissionFeeUpdated(newFee);
    }

    function setContractVersion(string memory newVersion) external onlyOwner {
        contractVersion = newVersion;
    }

    function withdrawERC20(address tokenAddress, address to) external onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No token balance to withdraw");
        token.transfer(to, balance);
    }

    function deployToken(
        string memory name,
        string memory symbol,
        uint256 maxSupply
    ) external payable returns (address) {
        require(msg.value >= commissionFee, "Insufficient commission fee");
        uint256 scaled = maxSupply * (10 ** 18);
        V2CERC20 token = new V2CERC20(name, symbol, msg.sender, scaled);
        emit TokenDeployed(address(token), msg.sender, contractVersion);
        return address(token);
    }
}
