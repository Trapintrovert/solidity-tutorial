const { ethers} = require('hardhat')
const { expect, assert} = require('chai')

describe('SimpleStorage', function () {
  let SimpleStorageFactory
  beforeEach(async function() {
     SimpleStorageFactory = await ethers.deployContract("SimpleStorage")
    await SimpleStorageFactory.waitForDeployment()
  })

  it("Should start with a favorite of 0", async function() {
    const currentValue = await SimpleStorageFactory.retrieve()
    const expectedValue  = '0'
    assert.equal(currentValue.toString(), expectedValue)
  }) 
  
  it('Should update when we call store', async function() {
    const expectedValue = '7'
  const transactionResponse = await SimpleStorageFactory.store(expectedValue)
  await transactionResponse.wait(1)

  const currentValue = await SimpleStorageFactory.retrieve()
  assert.equal(currentValue.toString(), expectedValue)



  })
})