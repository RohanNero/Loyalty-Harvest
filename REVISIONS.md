### List of known revisions that need to be implemented

## Create Leaves

1. change logic pertaining to `totalSupply`/`nfts` variable, currently you can specify the total amount of nfts to include in the event, however this just means 0 - x tokenIds will be included. Which is strange and probably never will be preferred method.

   - possible solutions:
     - allow users to specify certain meta data they would like to include in the reward event, i.e. only red background nfts.
     - remove nfts variable for contracts with `ERC721Enumerable` and instead use `totalSupply()`

2. allow use of block numbers OR normal timestamps to be used.

   - potentially need to write an additional script that converts a date/timestamp into a block number, maybe an API already exists for this?

3.

## Create Merkle

1. The command behind this needs to be updated to approve the reward token before it can be `transferFrom`'d to the `Claim.sol` contract.
   Also we should ensure that users may send

## Create Claim

1. Don't make users input `heldUntil`, this can be calculated using the rest of the input.
   - we need a new script `getHeldUntil`, this will take the holder's address, the nft address, and the block start/end.
