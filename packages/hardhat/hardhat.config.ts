import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";
import "@nomicfoundation/hardhat-foundry";
import claimAbi from "./abi/Claim";

// This task creates a RewardEvent
task("createEvent", "calls `createRewardEvent()` in `Claim.sol`")
  .addParam("chain", "specifies which chain to use")
  .setAction(async taskArgs => {
    let claim;

    if (taskArgs.chain == "localhost") {
      console.log("grab contract");
      claim = await ethers.getContractAt(claimAbi, "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9");
      //console.log("claim:", claim);
      console.log("claim:", claim);
      const tx = await claim.createRewardEvent(
        "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        "0x0000000000000000000000000000000000000000",
        "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        "0x2339686dc2aa15ee5a5916238b2d53185bea092778524f4cacd6ad7a4fd9f67a",
        2,
        4,
        0,
        4,
        8,
      );
      console.log("tx:", tx);
    }
  });

// This task creates a signature on avalanche
task("createSig", "calls `createRewardEvent()` in `Claim.sol`")
  .addParam("chain", "specifies which chain to use")
  .setAction(async taskArgs => {
    if (taskArgs.chain == "avalancheFuji") {
      function hashMessage(message: string) {
        const mBuf: Buffer = Buffer.from(message, "utf8");
        const msgSize: Buffer = Buffer.alloc(4);
        msgSize.writeUInt32BE(mBuf.length, 0);
        const msgBuf: Buffer = Buffer.from(`0x1AAvalanche Signed Message:\n${msgSize}${message}`, "utf8");
        const hash: Buffer = createHash("sha256").update(msgBuf).digest();
        const hashex: string = hash.toString("hex");
        const hashBuff: Buffer = Buffer.from(hashex, "hex");
        const messageHash: string = "0x" + hashex;
        console.log("hashBuff:", hashBuff);
        console.log("messageHash:", messageHash);
        return { hashBuff, messageHash };
      }
      hashMessage("0xe4A98D2bFD66Ce08128FdFFFC9070662E489a28E");
    }
  });
// If not set, it uses ours Alchemy's default API key.
// You can get your own at https://dashboard.alchemyapi.io
const providerApiKey = process.env.ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";
// If not set, it uses the hardhat account 0 private key.
const deployerPrivateKey =
  process.env.DEPLOYER_PRIVATE_KEY ?? "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
// If not set, it uses ours Etherscan default API key.
const etherscanApiKey = process.env.ETHERSCAN_API_KEY || "DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        // https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
        runs: 200,
      },
    },
  },
  defaultNetwork: "localhost",
  namedAccounts: {
    deployer: {
      // By default, it will take the first Hardhat account as the deployer
      default: 0,
    },
  },
  networks: {
    // View the networks that are pre-configured.
    // If the network you are looking for is not here you can add new network settings
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`,
        enabled: process.env.MAINNET_FORKING_ENABLED === "true",
      },
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    arbitrum: {
      url: `https://arb-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    arbitrumGoerli: {
      url: `https://arb-goerli.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    optimism: {
      url: `https://opt-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    optimismGoerli: {
      url: `https://opt-goerli.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    polygonZkEvm: {
      url: `https://polygonzkevm-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    polygonZkEvmTestnet: {
      url: `https://polygonzkevm-testnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    zkSyncTestnet: {
      url: "https://testnet.era.zksync.dev",
      zksync: true,
      accounts: [deployerPrivateKey],
      verifyURL: "https://zksync2-testnet-explorer.zksync.dev/contract_verification",
    },
    zkSync: {
      url: "https://mainnet.era.zksync.io",
      zksync: true,
      accounts: [deployerPrivateKey],
      verifyURL: "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
    },
    gnosis: {
      url: "https://rpc.gnosischain.com",
      accounts: [deployerPrivateKey],
    },
    chiado: {
      url: "https://rpc.chiadochain.net",
      accounts: [deployerPrivateKey],
    },
    base: {
      url: "https://mainnet.base.org",
      accounts: [deployerPrivateKey],
    },
    baseGoerli: {
      url: "https://goerli.base.org",
      accounts: [deployerPrivateKey],
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: [deployerPrivateKey],
    },
    scroll: {
      url: "https://rpc.scroll.io",
      accounts: [deployerPrivateKey],
    },
    avalancheFuji: {
      url: "https://avalanche-fuji.drpc.org/",
      accounts: [deployerPrivateKey],
    },
  },
  verify: {
    etherscan: {
      apiKey: `${etherscanApiKey}`,
    },
  },
};

export default config;
