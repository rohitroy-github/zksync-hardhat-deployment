import { Wallet } from "zksync-ethers";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import dotenv from "dotenv";

dotenv.config();

// Retrieve the private key from environment variables.
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

// Ensure that the private key is configured before proceeding.
if (!PRIVATE_KEY) {
  throw new Error("Wallet private key is not configured in .env file!");
}

// Deploy script for the SimpleStorage contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the SimpleStorage contract`);

  // Initialize the wallet with the private key.
  const wallet = new Wallet(PRIVATE_KEY);

  // Create a deployer instance with the Hardhat runtime environment and the wallet.
  const deployer = new Deployer(hre, wallet);

  // Load the artifact for the contract "SimpleStorage".
  const artifact = await deployer.loadArtifact("SimpleStorage");

  // Estimate the deployment fee in Wei.
  const deploymentFee = await deployer.estimateDeployFee(artifact, []);

  // Convert the estimated fee from Wei to Ether and log it.
  const parsedFee = ethers.formatEther(deploymentFee);
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  // Deploy the contract without any constructor arguments.
  const simpleStorageContract = await deployer.deploy(artifact, []);

  // Retrieve the deployed contract's address.
  const contractAddress = await simpleStorageContract.getAddress();
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);

  // Retrieve and log the transaction hash of the deployment.
  const deploymentTx = simpleStorageContract.deploymentTransaction();
  if (deploymentTx) {
    console.log(`Transaction Hash: ${deploymentTx.hash}`);
  } else {
    console.log("Transaction hash not available.");
  }

  // Verify the deployed contract on the blockchain using Hardhat's verification task.
  await hre.run("verify:verify", {
    address: contractAddress,
    contract: artifact.contractName,
    constructorArguments: [],
  });
}
