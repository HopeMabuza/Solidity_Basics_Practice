const hre = require("hardhat");

async function main() {
  console.log("Deploying FullSchoolSystem contract...");

  // Get the contract factory
  const Parent = await hre.ethers.getContractFactory("Parent");//*important
  
  const parent = await Parent.deploy();//*important

  await  parent.waitForDeployment();//*important
  
  const address = await parent.getAddress();
   console.log(`Parent deployed to: ${address}`);
  
  return address;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });