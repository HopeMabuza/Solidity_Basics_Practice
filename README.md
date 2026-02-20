1. On my terminal run : `npm i` or `npm install`. But since we have the package.json and hardhat.connfig.js for local testing. We should use `npm i`.

2. After you are done initializing your project you can add your contracts/contract_name.sol, tests/test_file.js and scripts/deploy.js. scripts/deploy.js is a JavaScript file used to deploy our contract.

3. Now you can add code for your contracs and tests.

4. Then add code for deploy.js. How do write simple deploy script:
    - Define method 
    => `async function main(){}`
    - Inside your main function, create a variable to get contract factory
    => `const smart_contract_name = await ethers.getContractFactory("smart_contract_name");`
    - After that, start the deployment. Returning a promise that resolves to a contract object
    => `const deploy_contract = await.smart_contract_name.delpoy(put parameter if your contract has parameters);`
    - Then, wait for deployment transaction to be confirmed
    => `await deploy_contract.waitForDeployement();`
    - Add this pattern at the bottom to be able to asyn  or wait everywhere and also handle errors.
    ` main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }); `

5. Now you can deploy your contract, since we are working locally. when we are deploing we are going to use the local network
=> `npx hardhat run scripts/deploy.js --network localhost`

6. Before we deploy we ,ust run the local node you get an address from the random 20 that are provided.
=> `npx hardhat node`

N.B do not close the terminal running the node, rather split the terminal and run command 5 and 6 at the same time. But command 6 should be run first.

7. If your contract was deployed successfully, you will see message on the terminal where you ran the node. It will show the contract address and transcaction address.

8. Now lets write tests. Your tests should be in a JavaScript or TypeScript file inside the tests folder we created at number 2 of our guide.
Syntax => first we import essential tool to interact with the blockchain and validate results
        `const { expect } = require ("chai");` for assertions
        `const { expect } = require ("ethers");` to interact with the blockchain
       => describe function is like a label for which tests belong where. inside you can deploy the contract once and call it in every testcase using *deployFixture*.
       `describe ("nameOfContract", function(){
            //describe how to set up the contract
            async function deployFixture(){
                const contractName = await ethers.deployContract("contractName");
                return { contractName };}

            it("Statement of what assertion should do",  async function () {
                //call method with deployFixture
                const { contractName} = await deployFixture();
                expect(await contractName.assertedFunction()).to.equal(expected Output)
       }); //wraps whole it testcase
                
            
       });//outbrackes cover the whole testcases using this describe


NOTE: to see the test coverage `npx hardhat coverage`