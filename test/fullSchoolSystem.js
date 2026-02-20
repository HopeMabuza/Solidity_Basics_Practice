//import chai, hardhat and nomia-something
const { expect } = require ("chai");
const { ethers } = require ("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")


//set up 
async function setUp(){
    //Deploy Parent contract
    const getParentFactory = await ethers.getContractFactory("Parent");
    const deployParentContract = await getParentFactory.deploy();
    await deployParentContract.waitForDeployment();

    //deploy Child contract
    const getChildFactory = await ethers.getContractFactory("Child");
    const deployChildContract = await getChildFactory.deploy();
    await deployChildContract.waitForDeployment();



    return {deployParentContract, deployChildContract}
};

//assertions inside decsribe
describe("Test for Parent contract", function (){
    it("Get greeting from Parent", async function(){

        //get deployed contract from setUp using loadFixture
        const{ deployParentContract} = await loadFixture(setUp);
        //call sayHello function from Parent Contract
        const greeting = await deployParentContract.sayHello();
        //assert parent
        expect(greeting).to.equal("Hello from Parent");

    });
});

describe("Test for Child contract", function(){
    it("Get greeting from Child", async function(){
        const {deployChildContract} = await loadFixture(setUp);
        const greeting2 = await deployChildContract.sayHelloFromChild();

        expect(greeting2).to.equal("Hello from Child");
    });
});




