### Contract description:
- The contract is a Factory to deploy a classic ERC-20 token. It uses openzeppelin library and a proxy to permit updates on contract  
- Mainnet contract address : ```0xA3f715E53b4fe8BA5E73757665848C4F6e37f0d4``` 

## How to verify deployed factory proxy ?
- npx hardhat verify --network baseSepolia --contract contracts/V2Contract.sol:V2Contract factoryProxyAddress
## How to verify deployed token ?
- npx hardhat verify --network baseSepolia tokenAddress "MyToken" "MTK" ownerAddress "maxSupply"
