// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import {console2} from "forge-std/Test.sol";
import { UD60x18, convert, div, mul } from "@prb/math/UD60x18.sol";

error Claim__RewardPeriodHasntEnded(uint current, uint end);
error Claim__AlreadyClaimed();
error Claim__InvalidProof();
error Claim__InvalidTimestamps();
error Claim__RewardTransferFailed();
error Claim__MustProvideRootIfContestIsOver();
error Claim__InvalidSigner();
error Claim__MustSendRewardAmount();
error Claim__InvalidCaller();

/**@title Claim
 *@author Rohan Nero
 *@notice This contract allows anyone claim rewards earned during a `RewardEvent 
 *@notice This contract allows anyone to create a `RewardEvent` and/or claim rewards earned during events
 *@dev Only compatible with ERC-721 compliant contracts
 */
contract Claim {

    /**@notice Each struct outlines the details of a reward event
     *@dev nftContract - the ERC721 contract
     *@dev rewardToken - the current that reward will be in, set to 0 address to use ETH
     *@dev blockStart - the block number that the reward event starts at
     *@dev blockEnd - the block number that the reward event ends at
     *@dev rewardAmount - the amount of ETH
     *@dev nfts - total amount of different NFTs
     *@dev
     */
    struct RewardEvent {
        address nftContract;
        address rewardToken;
        address creator;
        bytes32 merkleRoot;
        uint startBlock;
        uint endBlock;
        uint rewardAmount;
        uint nfts;
        uint totalHeld;
        uint eventId;
    }

    /**@notice Used to avoid stack-too-deep error
     *@param holder is the address that held the NFT
     *@param to is the address that will be sent the rewards
     *@param tokenId is the NFT's tokenId
     *@param eventId is the `RewardEvent` index in the `eventMap`
     *@param heldUntil is the block number the NFT was held until*/
    struct ClaimInfo {
        address holder;
        address to;
        uint tokenId;
        uint eventId;
        uint heldUntil;
    }

    /**@notice Array from eventId to RewardEvent */
    RewardEvent[] public eventMap;

    /**@notice Tracks whether or not rewards have been claimed for an NFT or not
     *@dev Set to true inside `claim()` */
    mapping(uint eventId => mapping(uint tokenId => bool hasClaimed))
        public claimMap;


    /**@notice Emitted when a new `RewardEvent` is created with `createRewardEvent()` */
    event EventCreated(uint eventId);

    /**@notice Emitted when a user claims with `claim()` or `claimWithSignature()` */
    event Claimed(uint portion);

    /**@notice Emitted when a creator updates their event */
    event EventUpdated(uint eventId, uint totalHeld, bytes32 root);

    /**@notice Anyone can claim after the endTime
     *@dev This uses `MerkleProof` lib to verify that the caller can receieve funds
     *@dev The signature must belong to the holder of the NFT
     *@param proof is an array of proofs that can be used to verifiy the user's claim
     *@param signature contains hash of address rewards will be sent to
     *@param info is the ClaimInfo struct containing information about the claim
     */
    function claimWithSignature(
        bytes32[] memory proof,
        bytes memory signature,
        ClaimInfo memory info
    ) public returns (uint) {
        // ensure the event has ended
        if (block.number < eventMap[info.eventId].endBlock) {
            revert Claim__RewardPeriodHasntEnded(
                block.number,
                eventMap[info.eventId].endBlock
            );
        }
        // ensure the user hasn't already claimed for this event and tokenId
        if (claimMap[info.eventId][info.tokenId]) {
            revert Claim__AlreadyClaimed();
        }

        // Recover the signer's address

        // create the message hash
        bytes32 messageHash = keccak256(abi.encodePacked(info.to));
        // format the message hash 
        bytes32 signedMessageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );
        // recover the signer
        address signer = _recoverSigner(signedMessageHash, signature);

        // revert if signer address isn't the holder
        if (signer != info.holder) {
            revert Claim__InvalidSigner();
        }

        uint portion = _claim(proof, info);

        // Emit Claimed event with portion
        emit Claimed(portion);

        // Finally return the portion value
        return portion;
    }

    /**@notice Anyone can claim after the endTime
     *@dev This uses `MerkleProof` lib to verify that the caller can receieve funds
     *@dev msg.sender must be the address that held the NFT
     *@param proof is an array of proofs that can be used to verifiy the user's claim
     *@param info is the ClaimInfo struct containing information about the claim
     */
    function claim(
        bytes32[] memory proof,
        ClaimInfo memory info
    ) public returns (uint) {
        // Ensure the event has ended
        if (block.number < eventMap[info.eventId].endBlock) {
            revert Claim__RewardPeriodHasntEnded(
                block.number,
                eventMap[info.eventId].endBlock
            );
        }
        // Ensure the user hasn't already claimed for this event and tokenId
        if (claimMap[info.eventId][info.tokenId]) {
            revert Claim__AlreadyClaimed();
        }
        // Set user claimed value to true to prevent reentrancy/double claiming
        claimMap[info.eventId][info.tokenId] = true;
        // Ensure that msg.sender is the holder of the NFT
        if (msg.sender != info.holder) {
            revert Claim__InvalidCaller();
        }
        uint portion = _claim(proof, info);

         // Emit Claimed event with portion
        emit Claimed(portion);

        // Finally return the portion value
        return portion;
    }

    /**@notice Anyone can call this function to create a reward event
     *@dev _root may be set to 0 if waiting until reward period to add
     *@param _nftContract is the ERC-721 contract associated with the Reward Event
     *@param _rewardToken is the token to be sent as rewards
     *@param _creator is the address that created the Reward Event
     *@param _root is the Merkle Root of the Reward Event (can be zero if the event is created before _blockEnd)
     *@param _blockStart is the block number that the Reward Event started at
     *@param _blockEnd is the block number that the Reward Event ended at
     *@param _rewardAmount is the amount of reward token to be sent to the holders
     *@param _nfts is the total amount of NFTs eligible for rewards
     *@param _totalHeld is the total amount of blocks NFTs were held by any NFT during the event (can be zero if the event is created before _blockEnd)
     */
    function createRewardEvent(
        address _nftContract,
        address _rewardToken,
        address _creator,
        bytes32 _root,
        uint _blockStart,
        uint _blockEnd,
        uint _rewardAmount,
        uint _nfts,
        uint _totalHeld
    ) public payable returns(uint eventId) {
        // if event period is over, root has to be set
        if (block.number > _blockEnd && _root == 0) {
            revert Claim__MustProvideRootIfContestIsOver();
        }
        // conditional to ensure that the creator sends the funds

        // msg.value if native ETH
        if (_rewardToken == address(0)) {
            if (msg.value < _rewardAmount) {
                revert Claim__MustSendRewardAmount();
            }
        }
        // `transferFrom` for ERC-20
        else {
            IERC20(_rewardToken).transferFrom(
                _creator,
                address(this),
                _rewardAmount
            );
        }

        // Add the struct to the eventMap (its secretly an array, shhh)
        eventMap.push(
            RewardEvent(
                _nftContract,
                _rewardToken,
                _creator,
                _root,
                _blockStart,
                _blockEnd,
                _rewardAmount,
                _nfts,
                _totalHeld,
                eventMap.length
            )
        );

        // Emit event with eventId
        emit EventCreated(eventMap.length - 1);

        // Implicitly return the created event's `eventId` (`-1` since we just incremented the length with the `.push`)
        eventId = eventMap.length - 1;
    }

    /**@notice This function is used to set the `merkleRoot` and `totalHeld` variables after an event has ended */
    function updateEvent(uint _eventId, uint _totalHeld, bytes32 _root) public {
        if(msg.sender != eventMap[_eventId].creator) {
            revert Claim__InvalidCaller();
        }
        eventMap[_eventId].totalHeld = _totalHeld;
        eventMap[_eventId].merkleRoot = _root;
        
        // Emit event with new event values
        emit EventUpdated(_eventId, _totalHeld, _root);
    }

    /** View / pure functions */

    /**@notice Returns a RewardEvent object at `eventId` */
    function viewEvent(uint eventId) public view returns(RewardEvent memory) {
        return eventMap[eventId];
    }

    /**@notice Returns the duration of the reward period in blocks */
    function viewRewardPeriodDuration(uint _eventId) public view returns (uint) {
        return eventMap[_eventId].endBlock - eventMap[_eventId].startBlock;
    }

    /**@notice Returns this contract's entire eth balance */
    function viewEthBalance() public view returns (uint) {
        return address(this).balance;
    }

    /**@notice Returns length of `eventMap` */
    function viewEventMapLength() public view returns (uint) {
        return eventMap.length;
    }

    /**@notice Recovers the signer
     *@dev from SMP's signature recovery */
    function _recoverSigner(
        bytes32 _signedMessageHash,
        bytes memory _signature
    ) internal pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = _splitSignature(_signature);

        return ecrecover(_signedMessageHash, v, r, s);
    }

    /**@notice Splits the signature
     *@dev From SMP's signature recovery */
    function _splitSignature(
        bytes memory sig
    ) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");

        assembly {
            /*
            First 32 bytes stores the length of the signature

            add(sig, 32) = pointer of sig + 32
            effectively, skips first 32 bytes of signature

            mload(p) loads next 32 bytes starting at the memory address p into memory
            */

            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        // implicitly return (r, s, v)
    }

    /**@notice Internal claim function that actually verifies `proof` and sends rewards */
    function _claim(
        bytes32[] memory proof,
        ClaimInfo memory info
    ) internal returns (uint) {
        // Shouldn't the user's leaf hash be calculated with what is inside a leaf?
        // AKA: info.holder, eventMap[info.eventId].nftContract, info.tokenId, info.heldUntil
        // Leaf data doesn't include the eventId...

        // Calculate the user's `leaf` hash
        // bytes32 leaf = keccak256(
        //     bytes.concat(
        //         keccak256(
        //             abi.encode(
        //                 info.holder,
        //                 info.tokenId,
        //                 info.eventId,
        //                 info.heldUntil
        //             )
        //         )
        //     )
        // );
        bytes32 leaf = keccak256(
            bytes.concat(
                keccak256(
                    abi.encode(
                        info.holder,
                        eventMap[info.eventId].nftContract,
                        info.tokenId,
                        info.heldUntil
                    )
                )
            )
        );
        // Console logs used in testing
        //console2.log("leaf:");
        //console2.logBytes32(leaf);
        //console2.log("root:");
        //console2.logBytes32(eventMap[info.eventId].merkleRoot);
        //console2.log("proof:");
        //console2.logBytes32(proof[0]);
        //console2.logBytes32(proof[1]);

        // Use MerkleProof lib to verify proof with root and leaf
        bool verified = MerkleProof.verify(
            proof,
            eventMap[info.eventId].merkleRoot,
            leaf
        );

        // Revert if the verification returns false
        if (!verified) {
            revert Claim__InvalidProof();
        }

        // Reward calculation
        uint reward = _calculateReward(info.eventId, info.heldUntil);
        //console2.log("reward:", reward);

        // Now that we know the `reward` amount is, we can send it to the user

        // Transfer ETH if rewardToken isn't set
        if (eventMap[info.eventId].rewardToken == address(0)) {
            //console2.log("Transfer ETH");
            (bool success, ) = info.to.call{value: reward}("");
            // Ensure call went through
            if (!success) {
                revert Claim__RewardTransferFailed();
            }
        }
        // Transfer token if its an ERC20
        else {
            bool success = IERC20(eventMap[info.eventId].rewardToken).transfer(
                info.to,
                reward
            );
            if (!success) {
                revert Claim__RewardTransferFailed();
            }
        }
        claimMap[info.eventId][info.tokenId] == true;
        return reward;
    }

    /**@notice This function calculates how many rewards a user earned
      *@param eventId corresponds to the `eventMap` where the event details are
      *@param heldUntil is the `ClaimInfo` variable which is specific to each user */
    function _calculateReward(uint eventId, uint heldUntil) public view returns(uint) {
        // Get variables from the event map
        uint totalReward = eventMap[eventId].rewardAmount;
        uint start = eventMap[eventId].startBlock;
        uint held = eventMap[eventId].totalHeld;
        //console2.log("held:", held);
        //console2.log("totalReward:", totalReward);


        // Calculate how many blocks the user held for 
        uint userHeld = heldUntil - start;
        //console2.log("userHeld:", userHeld);
        // Calculate the user's portion compared to `held`
        UD60x18 portion = div(convert(userHeld), convert(held));
        uint test = convert(portion);
        //console2.log("test:", test);
        ////console2.log("portion:", portion);
        // Calculate the reward amount based on the user's portion
        uint reward = convert(mul(portion, convert(totalReward)));
    

        // Explicitly return the reward
        return reward;

    }
}