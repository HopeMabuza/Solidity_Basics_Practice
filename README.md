# solidity_basics

## commands for hardhat console:

- const [owner, user] = await ethers.getSigners()

- owner.address
- user.address

- await ethers.provider.getBalance(owner.address)

- const hardhat = new ethers.providers.JsonRpcProvider("http://localhost:8545")
