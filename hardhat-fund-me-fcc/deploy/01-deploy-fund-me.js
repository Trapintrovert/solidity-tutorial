// import
// main function
// calling of main function

// function deployFunc(href) {
//     console.log("Hi!")
// }

// module.exports.default = deployFunc

const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // if chainId is X use address Y
    // if chainId is Z use address A

    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    // if the contact doesn't exist, we deploy a minimal version for pur local testing

    // well what happens when we wants to change chains
    // when going for localhost or hardhat network we want to use a mock
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }

    log("------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
