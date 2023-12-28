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

1. Creator constructs merkle leaves based on

   - an NFT contract address
   - a block starting number
   - a block ending number
   - the total number of NFTs

2. Creator constructs merkle tree using the leaves

3. Creator calls `createRewardEvent()` function in the `Claim.sol` contract with

   - the merkle root
   - an NFT contract address
   - the creator address
   - reward token address
   - reward token amount
   - a block starting number
   - a block ending number
   - the total number of NFTs
   - the total number of blocks NFTs were held for

![creator flow diagram](/packages/nextjs/public/creatorFlow.jpg)

### User Flow

1. User creates merkle proof using

   - user address
   - reward event Id

2. Optional: User creates signature with

   - the address of who will claim it
   - the reward event Id
   - the NFT token Id

3. User calls `claim()` or `claimWithSignature()` to claim their rewards with input
   - the merkle proof
   - the holder address
   - the address to send rewards to
   - the event Id
   - the token Id
   - the block you held your NFT until
   - the signature if claiming from a different address from the holder

![user flow diagram](/packages/nextjs/public/userFlow.jpg)
