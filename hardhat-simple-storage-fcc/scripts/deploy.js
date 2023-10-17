const { ethers, run, network } = require('hardhat')
async function main() {
  const SimpleStorageFactory = await ethers.deployContract("SimpleStorage")
  console.log("Deploying contract...")
  await SimpleStorageFactory.waitForDeployment()
  console.log("Deployed contract to ", SimpleStorageFactory.target)
  // what happens when we deploy our hardhat network
  if(network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY){
    console.log('Waiting for block confirmations...')
    await SimpleStorageFactory.deployTransaction.wait(6)
   await verify(SimpleStorageFactory.target, [])
  }

  const currentValue = await SimpleStorageFactory.retrieve()
  console.log('Current Value is:', currentValue)
 
  // Update the current value
  const transactionResponse = await SimpleStorageFactory.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await SimpleStorageFactory.retrieve()
  console.log('Updated Value is:', updatedValue)
}

async function verify(contractAddress,args){
  console.log("Verifying contract...")

  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args
    })
  } catch (e) {
    if(e.message.toLowerCase().includes("already verified")){
      console.log('Already Verified')
    }else{
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
 