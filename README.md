## How to verify deployed factory proxy ?
- npx hardhat verify --network baseSepolia --contract contracts/V2Contract.sol:V2Contract factoryProxyAddress
## How to verify deployed token ?
- npx hardhat verify --network baseSepolia tokenAddress "MyToken" "MTK" ownerAddress "maxSupply"