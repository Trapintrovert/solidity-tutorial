const { ethers } = require('hardhat')
async function main() {
  const SimpleStorageFactory = await ethers.deployContract("SimpleStorage")
  console.log("Deploying contract...")
  await SimpleStorageFactory.waitForDeployment()
  console.log("Deployed contract to ", SimpleStorageFactory.target)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
 