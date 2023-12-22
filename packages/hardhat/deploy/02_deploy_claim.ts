import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "Claim" using the deployer account and
 * constructor arguments set to nothing
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployClaim: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy the `Claim.sol` contract
  try {
    const contract = await deploy("Claim", {
      from: deployer,
      log: true,
      // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
      // automatically mining the contract deployment transaction. There is no effect on live networks.
      waitConfirmations: 5,
      autoMine: true,
    });

    // Verify the contract
    console.log("Verifying contract...");
    await hre.run("verify:verify", {
      address: contract.address,
      contract: "contracts/Claim.sol:Claim",
    });
  } catch (error) {
    // I wanted to simply log this, but the error is still thrown before this is logged :(
    if (error.message.includes("insufficient funds for gas")) {
      console.log("Insufficient funds for gas!");
      return;
    }
  }
};

export default deployClaim;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployClaim.tags = ["claim", "dev"];
