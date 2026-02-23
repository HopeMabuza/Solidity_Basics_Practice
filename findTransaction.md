1. Add the network in your hardhat.config.js
- Add it under networks. For example:
```
module.exports = {
  solidity: "0.8.24",
  networks: {
    polygon: {
      url: "https://polygon.drpc.org",
      // Optional: add your private key here if you want to send transactions later
      // accounts: [`0x${YOUR_PRIVATE_KEY}`] 
    }
  }
};
```

2. In order to be able to get a block by its day and time we have to install Ethereum helper library below:
- `npm install ethereum-block-by-date`

3. On my terminal I must run : `npx hardhat console --network polygon`. To get to the polygon network.

4. Now that I am in the console, I have to write the following commands:
- `const EthDater = require('ethereum-block-by-date');` => get the tools from the ethereum helper library.
- `const dater = new EthDater(ethers.provider);` => plug the tools into Polygon so that it knows where to look.
- `const targetTime = "2021-01-01T00:01:00Z";` => give the tools a specific time and date.
- `const result = await dater.getDate(targetTime);` => find the block in that specific timestamp.
- `const block = await ethers.provider.getBlock(result.block);` => ask Polygon to give me the data of the block.
- `console.log("Success! Block Number:", block.number)` => print the Block number.
- `console.log("Number of Transactions:", block.transactions.length);` => print out the transaction list.
- `myPolygonBlock = await ethers.provider.getBlock(9013787, true);` => use a new variable to get the full details of the block.
- `const tx2 = myPolygonBlock.prefetchedTransactions[0];` => get the only transaction from the block.
- `console.log({ hash: tx2.hash, from: tx2.from, ... });` => print the transaction details.

See below the whole process:
```
    wtc@pop-os:~/Documents/Blockchain-Elective/Solidity_Basics_Practice$ npx hardhat console --network polygon
Welcome to Node.js v24.13.1.
Type ".help" for more information.
> const EthDater = require('ethereum-block-by-date');
undefined
> const dater = new EthDater(ethers.provider);
undefined
> const targetTime = "2021-01-01T00:01:00Z";
undefined
> const result = await dater.getDate(targetTime);
undefined
> const block = await ethers.provider.getBlock(result.block);
undefined
> console.log("Success! Block Number:", block.number);
Success! Block Number: 9013787
undefined
> console.log("Number of Transactions:", block.transactions.length);
Number of Transactions: 1
undefined
> const block = await ethers.provider.getBlock(9013787, true);
Uncaught SyntaxError: Identifier 'block' has already been declared
> // Fetch your specific block with full transaction detailsconst myBlock = await ethers.provider.getBlock(90
> 
> const tx = myBlock.prefetchedTransactions[0];
Uncaught ReferenceError: myBlock is not defined
> myPolygonBlock = await ethers.provider.getBlock(9013787, true);
Block {
  provider: HardhatEthersProvider {
    _hardhatProvider: LazyInitializationProviderAdapter {
      _providerFactory: [AsyncFunction (anonymous)],
      _emitter: [EventEmitter],
      _initializingPromise: [Promise],
      provider: [BackwardsCompatibilityProviderAdapter]
    },
    _networkName: 'polygon',
    _blockListeners: [],
    _transactionHashListeners: Map(0) {},
    _eventListeners: []
  },
  number: 9013787,
  hash: '0x04b9adc08a0f1e074fca648fcc706fb6e17b0fec9fc8928295128aaf99740661',
  timestamp: 1609459260,
  parentHash: '0xed6d7dfe29feadd42d1085be6ac2f4a9d0bdd8aa8be9deda2701094f39dc1ba7',
  parentBeaconBlockRoot: undefined,
  nonce: '0x0000000000000000',
  difficulty: 5n,
  gasLimit: 20000000n,
  gasUsed: 131370n,
  stateRoot: undefined,
  receiptsRoot: undefined,
  blobGasUsed: undefined,
  excessBlobGas: undefined,
  miner: '0x0000000000000000000000000000000000000000',
  prevRandao: null,
  extraData: '0xd78301091883626f7288676f312e31352e35856c696e7578000000000000000099ffd0283fcfaf457e99ef92a96a53a64faf9a2372c631de0a8f8a325fabfa226ed8cbfdaa0dc35121ca988eb9bf4e5d06191441d8c1c38e2963e7f23870e8df01',
  baseFeePerGas: null
}
> const tx = myPolygonBlock.prefetchedTransactions[0];
Uncaught SyntaxError: Identifier 'tx' has already been declared
> const tx2 = myPolygonBlock.prefetchedTransactions[0];
undefined
> console.log({  hash: tx.hash,  from: tx.from,  to: tx.to,  value: ethers.formatEther(tx.value) + " MATIC",  gasPrice: ethers.formatUnits(tx.gasPrice, "gwei") + " gwei"});
Uncaught ReferenceError: tx is not defined
> console.log({  hash: tx2.hash,  from: tx2.from,  to: tx2.to,  value: ethers.formatEther(tx2.value) + " MATIC",  gasPrice: ethers.formatUnits(tx2.gasPrice, "gwei") + " gwei"});
{
  hash: '0x59fcca3c6af1a1c207019043e8896c3aed7863afb94a80ec2299515694f83b78',
  from: '0x8A8C076Ad2e974B12223Fa5A09F62275CFa0C2c0',
  to: '0x2b2180a92a686cfC03599b9E5027E35b9448E9F3',
  value: '0.0 MATIC',
  gasPrice: '1.0 gwei'
}
undefined
> 
```
