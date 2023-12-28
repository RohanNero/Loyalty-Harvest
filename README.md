## Loyalty Harvest

Built with [Scaffold-ETH 2](https://scaffoldeth.io/)

The goal of this project is to allow anyone to create a `reward event` for **any** ERC-721 token, in which any address that holds the NFT during the period will receive rewards.

Incentivizes users to hold NFTs that they currently own, and other users to buy an NFT if they don't hold one.

[Inspiration for Loyalty Harvest](https://ethereum.stackexchange.com/q/154207/97149)

### Tech

Under the hood this project consists of a few different pieces:

1. an ERC-721 contract
2. a claim contract
   - contains a merkle root
   - ECDSA recover
   - and some amount of ETH or token to send to holders as reward
3. off-chain script to create the **Merkle tree**
4. off-chain script that allows user's to create a `proof` using their `leaf` and the `root`
5. Paul Razvan Berg's [PRB Math library](https://github.com/PaulRBerg/prb-math)

### Testing/POC

For testing values for the proof of concept, see the [POC.md](POC.md) file.

This protocol currently lives on Ethereum Sepolia, Polygon, Polygon Mumbai, and Avalanche Fuji. Additional `Claim.sol` contracts will need to be deployed for this to work on more chains. Once deployed, the contract address must be added to the `chainData` object inside `networks.ts`.

### Creator Flow

![creator flow diagram](/packages/nextjs/public/creatorFlow.jpg)

### User Flow

![user flow diagram](/packages/nextjs/public/userFlow.jpg)
