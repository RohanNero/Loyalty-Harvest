## Notes

10/7 notes:

1. Adding js scripts from legacy LH repo.
   - converting to ts
   - removing excess code

Need to test `createLeaves` and `createMerkle` with the forms on the frontend

2. `createProof` and `createSignature` need to be tested and hooked up to frontend

   - will have to create frontend component forms for these

3. You're doing a great job! Keep up the good work!
   - start by setting up `createLeavesForm`

10/9 notes:

Converted legacy scripts to ts and connected `createLeaves` and `createMerkle` to frontend

1. Need to setup `createEventForm` component and the `createEvent` page.tsx
   - after interacting with the smart contract, let's store the merkle tree in a database.
   - after storing tree in the db, any user can reference it when using `createProof`

Flow of user interactions with LH will look like

      1.  Creator creates leaves based on desired input

      2.  Creator then creates a tree based on the leaves
      3.  Creator finally creates `RewardEvent` based on the tree
      4.  User's create proofs based on the tree
         4.5. OPTIONAL: User creates signature with `createSig`
      5.  User calls `Claim` contract with the proof

In final product this might be refactored to make it more simple on users, or I may create a bundle function that wraps the 3 creator functions
Meaning a Creator makes a single call with desired input that in turn calls `createLeaves`, `createMerkle`, and `createEvent`
Then a user can call a single function that will create a proof, (signature maybe), and then claim.

This allows the creator and user to only interact with Loyalty Harvest once.

Need to set up `createEventForm` first, this form should

1.  call `createRewardEvent()` in `Claim` contract
2.  after ensuring this event was created correctly, then we should store the merkle tree in a database.

10/11 notes:

thoughts before getting into the work listed above: should rewards be capped at certain value for each user or does it depend on what the users do.
To put it into perspective:

**METHOD A:**

creator funds event with 10 ETH amongst 10 NFTs, the most 1 NFT could earn is 1 ETH

**METHOD B:**

creator funds event with 10 ETH amongst 10 NFTs, the most 1 NFT could earn is dependent on how long the users hold for, meaning if 9 users sell instantly as the event begins, the final user could earn 9.99~ ETH.

The difference in these two scenarios is that in example A, there will likely be leftover funds in the reward contract that the creator will have to either withdraw or handle in another way (could add to `extraRewards` pool that anyone gets or something like that).
In example B, all 10 ETH is dispursed to the users everytime regardless of how long users held for.
To calculate this, you would need to view how much time a user held compared to the total amount of time all users held.
I.e. Reward is 10 ETH, NFTs 1-9 were held for 10 seconds, NFT 10 was held for 100 seconds. This means the total time held was 190 seconds, each user's reward portion can be calculated using this denominator:

NFTs 1-9 = 10/190 = .0526 of reward = .526 ETH
NFT 10 = 100/190 = .526 of reward = 5.26 ETH

(.526 x 9) + (1 x .526) = 10 ETH

This ensures that all of the rewards alotted for the event are always distributed.

Same example above but shown using method A

NFTs 1-9 = 10/100 = .1 of portioned reward reward = .1 ETH
NFT 10 = 100/100 = 100% of portioned reward = 1 ETH

(.1 x 9) + (1 x 1) = 1.9 ETH

Using method A, less than 20% of the alotted reward was actually distributed, meaning 7.1 ETH are stuck/waiting for creator to withdraw.

After internal discussion, Rohan and I have decided to go forward with Method A. It's more elegant and requires less manual interaction

1. Fix logic to fit above **OR** continue with `createEvent` page/components
   - I suppose we should finish the smart contract logic first and foremost
   - but then again, I want to ensure the database works correctly...

**OFF TOPIC**: new project idea: allow users to input an array of addresses on frontend, then get returned a piechart showing the representation of their portfolio. 1. user input address 2. we call `balanceOf` for a list of tokens 3. using balances we assemble the chart

10/12 notes:

1. To refactor the contract code in order to calculate rewards in the new way, we need to know the entire duration of time NFTs were held for.

   - this variable needs to be added to the `RewardEvent` struct as `totalHeld`
   - creators can add this when they add the merkle root, before or after the event has ended/reached `blockEnd`
   - This means we need to update `createLeaves` to return this variable (`createLeaves` should also ensure `blockEnd` < current block)
   - NOTE: RIGHT NOW THE CONTRACT CAN ONLY HANDLE 18 DECIMAL TOKENS, WE CAN ADJUST FOR OTHER DECIMAL TOKENS LATER
   - NOTE: USING IERC INTERFACE MAKES THIS NON-COMPLIANT WITH TOKENS THAT VIOLATE THE STANDARD (_COUGH COUGH USDT COUGH_)

2. Tested briefly to ensure it works, next steps include

   - further testing
   - deploy script
   - connect database to `createEvent` page
   - create claim events on frontend
   - create `createSig` page for users
   - create `createProof` page for users (`createEvent` must be finished first)

10/15 notes:

1. will there be a single `Claim` contract for anyone to use or will people deploy their own? **Yes to first option**
   - current structure is built to have single `Claim` contract that anyone calls, we can obviously add support for additional functionality later, such as personalized `Claim` contracts that can be deployed using a factory contract

In order to be able to call `createRewardEvent()`, the contract must be actually deployed. Meaning we need to write deploy script

Deploy script created but we need to create a helper object to track which `Claim` contract address to use depending on the `chainId`

2. `updateEvent()` function should ensure the event period has ended before being allowed to update the data
   - should also ensure that `root` and `totalHeld` are both default values
   - should also ensure that `root` and `totalHeld` input parameters aren't default values

LEFT OFF:

dealing with web3 issue during `createRewardEvent()` tx call.

localhost - unrecognized function selector
sepolia - alchemy doesnt support `eth_sendTransaction`

Alright this step is taking far too long to figure out, we need to connect to the contract and send a simle transaction

Hopefully after a good nights sleep you can figure it out.

Took all day because I'm a dumbass, the issue was a custom error being called. I need to figure out how to debug these better without manually calling the function on etherscan

10/17 notes:

1. added events to `Claim` so we can view return values (return variable not inside receipt)
2. Next step is to store the merkle tree in the prisma database so that it can be used when creating proofs
   - technically users could've just created the tree to proof for themselves but this is easier on the users.
   - need to store the merkle tree in a way that allows it to be used for calculating proof
3. Probably should convert our classic web3 contract interaction into a `useScaffoldWrite` hook... eventually

   Alright what if, instead of requiring the merkle tree as input to create Event, we just look up the variables from the contract, reconstruct the tree, and validate the proof that way. This negates the need for a postgresql database completely

Figure out that annoying scaffold eth error where the page shows behind/under the LoyaltyHarvest page. Frustrating!

^ gave up on that for now

Next steps are to flesh out User side of the frontend and then add RPC URL input support so users can provide their own.

Then need to figure out how I can have users connect their wallets and decide what chain to use.

Build:

1. User side
2. Dynamic wallet/chain connection

10/18 notes:

Think through the create proof logic

Currently we use:

      frontend input form -> fetch api -> web3js backend

But we should use scaffold-eth hooks or atleast wagmi

Fuck scaffold-eth! Too much shit too cluttered too messy!

FUck fuck fuck sacffold fucking eth fucking stupid shit

1. `createLeaves` errors when provided number values for blockStart/blockEnd
   - string input works fine, needs to be refined though.

left off setting up `createProof` and `createSignature`, just need to

1. style these pages to match the User color scheme as opposed to creator
2. create the `createClaimForm.tsx` component to call `Claim.claim()`
3. revise and style
4. do a little Irish jig

left off on number 2

10/19 notes:

1. `createClaimForm` is set up but not tested, that should be the first step to begin on
2. Once this is finished, I should either:
   - revise website to use connected wallet address as sender for contract calls and detect what chainId the user is on
   - create a new `User` page that allows input of `tokenId` and ` eventId`, then returns the `heldUntil` variable for the user
3. post to buidl guidl and talk to scaffold-eth guys in telegram channel
4. add this to resume
5. get money

10/20 notes:

1. issue coming from function call, parameters must not be set correctly.
   - research `encodeParameters` web3js method

10/21 notes

1. Need to setup auto connector for chains so that swapping networks are seamelss
2. `createLeaves.ts`'s `getOwnerAtBlock()` function doesn't work on hardhat network for some reason

- need to test everything on sepolia I suppose, maybe try anvil? I think its the same as hardhat though, not sure.

I've set up Anvil and a deploy script for `NFT.sol` and `Claim.sol`, also altered the `createLeaves.ts` script to get the holder address in a different manner, the only issue is the format of the address being returned. Currently its left-padded with zeros to be 32 bytes. Format this shit and it should be good to go!

10/23 notes

_Didn't spend much time today_

1. Addresses returned in `createLeaves.ts` are formatted correctly as of 10/21

10/24 notes:

1. Keep encountering `InvalidProof` error when trying to claim.
   - forge test works
   - yarn hardhat test fails
   - sepolia fails
   - must be due to how we are calculating the proof and the root

I think i've massively fucked up somewhere along the development process in the aspect of the smart contract logic being consitent with the frontend logic. We need to take a step back and maybe consider creating a visual for this in figma.

then from there pinpoint what the issue is and how to fix it.

10/25 notes:

1. I think the issue was that I decided not to use `eventId` in leaf data since you couldn't know this until the `RewardEvent` was actually created, but I never updated the logic inside of the actual Claim contract.
   - forge test working was really a mindfuck, must've been using old values from before revision
   - will now try to get this working with `yarn hardhat test` on hardhat network

You did it! _smile and cry_ I'm go proud of you! You defeated the terrored merkle tree!

10/26 notes:

Since I was able to get it working on hardhat and foundry, I will start by doing a quick run through on Sepolia

10/27 notes:

while creating an event on Sepolia, this error usually is encountered: `Error: TransactionBlockTimeoutError: Transaction started at 4574434 but was not mined within 50 blocks. Please make sure your transaction was properly sent and there no pervious pending transaction for the same account. However, be aware that it might still be mined!`

The function logic works, I could `claim()` on etherscan, but there is a bug in the `createClaim.ts` script causing the transaction to revert

- is the issue because of how the parameters are being passed/formatted? _need to locate the error_

Can't find where the error is being caused, going to try and walk through the flow on the frontend on hardhat/anvil

Encountering a different error on `anvil` now: **reason: 'unknown field `v`, expected one of `from`, `to`, `gasPrice`, `maxFeePerGas`, `maxPriorityFeePerGas`, `gas`, `value`, `data`, `nonce`, `chainId`, `accessList`, `type`'**

start off by trying to test on hardhat localhost. - need to update your script or just use `forge script NFTScript --rpc-url http://127.0.0.1:8545/ --broadcast`

It works! (Hardhat localhost only)

Steps to reproduce

1. `yarn chain`
2. `yarn deploy`
3. `yarn hardhat createEvent --chain localhost`
4. Fill out `createClaim` form on frontend with the input parameters defined in `POC.md`

Doesn't work on `anvil`, returns the same error listed above.

Attempt on Sepolia again and if this errors:

- cry cry cry
- try to connect to wagmi hooks?
- debug and change web3 syntax?
- swap to ethers js?
- TrY aNd CoNnEcT tO sCaFfOlD eTh HoOkS???

10/29 notes:

Probably best to re-work the flow to use scaffold-eth/wagmi hooks as opposed to **RAW** web3js.
When I encountered issues initially using the hooks, it is either human-error (my fault), or caused by this scaffold-eth branch I am using.

Start by trying to use a scaffold-eth hook for `claim`.
(the only places that would need to `useScaffoldWrite` are `createClaim` and `createEvent`)

Probably be easier to start with `createEvent` as opposed to claim.

1. import useScaffoldWrite
2. define write async createEvent function
3. make the form's submit button point to the function call

then run the three basic scaffold-eth commands to test it on frontend

10/30 notes:

1. trying to get the `createEvent()` scaffold write call to work

   - currently testing by adding logs on frontend

   scaffold-eth branch does weird stuff with `useScaffoldWrite` hook, try merging into a new up-to-date version of the main scaffold-eth 2

11/2 notes:

1. Alright, finally going to bite the bullet and swap over to a new scaffold-eth 2 repo using page routing.
   - first will swap over the `createEvent` page to test using `useScaffoldWrite`
