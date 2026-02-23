//import chai, hardhat and nomia-something
const { expect } = require ("chai");
const { ethers } = require ("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")


//set up 
async function setUp(){
    //get signers
    const [owner, otherAccount] = await ethers.getSigners();

    //Deploy Parent contract
    const getParentFactory = await ethers.getContractFactory("Parent");
    const deployParentContract = await getParentFactory.deploy();
    await deployParentContract.waitForDeployment();

    //deploy Child contract
    const getChildFactory = await ethers.getContractFactory("Child");
    const deployChildContract = await getChildFactory.deploy();
    await deployChildContract.waitForDeployment();

    //deploy Parent_f contract
    const getParent_fFactory = await ethers.getContractFactory("Parent_f");
    const deployParent_fContract = await getParent_fFactory.deploy();
    await deployParent_fContract.waitForDeployment();

    //deploy Child_f contract
    const getChild_fFactory = await ethers.getContractFactory("Child_f");
    const deployChild_fContract= await getChild_fFactory.deploy(deployParent_fContract.getAddress());
    await deployChild_fContract.waitForDeployment();

    //deploy School contract
    const getSchoolFactory = await ethers.getContractFactory("School");
    const deploySchoolContract= await getSchoolFactory.deploy("Bonwelong Primary School");
    await deploySchoolContract.waitForDeployment();

    //deploy StudentsSystem contract
    const getStudentsSystemFactory = await ethers.getContractFactory("StudentsSystem");
    const deployStudentsSystemContract= await getStudentsSystemFactory.deploy("Bonwelong Primary School");
    await deployStudentsSystemContract.waitForDeployment();

    //deploy AdminControl contract
    const getAdminControlFactory = await ethers.getContractFactory("AdminControl");
    const deployAdminControlContract= await getAdminControlFactory.deploy();
    await deployAdminControlContract.waitForDeployment();

    //deploy FullSchoolSystem contract
    const getFullSchoolSystemFactory = await ethers.getContractFactory("FullSchoolSystem");
    const deployFullSchoolSystemContract= await getFullSchoolSystemFactory.deploy("Bonwelong Primary School");
    await deployFullSchoolSystemContract.waitForDeployment();


    return { owner, otherAccount,
            deployParentContract, deployChildContract, 
            deployParent_fContract, deployChild_fContract,
            deploySchoolContract, deployStudentsSystemContract,
            deployFullSchoolSystemContract, deployAdminControlContract}
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

    it("Get greeting inherited from Parent", async function(){
        const {deployChildContract} = await loadFixture(setUp);
        const greeting2_ = await deployChildContract.sayHello();

        expect(greeting2_).to.equal("Hello from Parent");
    })
});

describe("Test for Parent_f contract", function(){
    it("Get message from Parent_f", async function () {
        const {deployParent_fContract} = await loadFixture(setUp);
        const message = await deployParent_fContract.externalFunction();

        expect(message).to.equal("Called from another contract");
    })
});

describe("Test for Child_f contract", function(){
    it("Get message from Child_f", async function(){
        const {deployChild_fContract} = await loadFixture(setUp);
        const messageFromParent = await deployChild_fContract.callExternalFunction();

        expect(messageFromParent).to.equal("Called from another contract");
    })
});

describe("Test for School contract", function(){
    it("Get school name", async function(){
        const {deploySchoolContract} = await loadFixture(setUp);
        const schoolName = await deploySchoolContract.getSchoolName();

        expect(schoolName).to.equal("Bonwelong Primary School");
    })
});

describe("Test for StudentsSystem contract", function(){
    it("Get student information", async function(){
        const {deployStudentsSystemContract} = await loadFixture(setUp);
        const addStudentInfo = await deployStudentsSystemContract.addStudent(1, "Zikhona", 89, 77);
        const getStudentInfo = await deployStudentsSystemContract.getStudent(1);

        expect(getStudentInfo[0]).to.equal("Zikhona");
        expect(getStudentInfo[1]).to.equal(89);
        expect(getStudentInfo[2]).to.equal(77);

    })
});

describe("Test for AdminControl contract", function(){
    it("Contract should revert when I try to change admin and I am not the contract owner", async function(){
        const {deployAdminControlContract, otherAccount} = await loadFixture(setUp);

        //.connect tells ethers to pretend this call is coming from otherAccount not the owner
        await expect(deployAdminControlContract.connect(otherAccount).changeAdmin(otherAccount.address)).to.be.revertedWith("Not admin");
    })

    it("Should successfully change the admin", async function(){
        const {deployAdminControlContract, otherAccount} = await loadFixture(setUp);
        await deployAdminControlContract.changeAdmin(otherAccount.address);
        const newAdmin = await deployAdminControlContract.getAdmin();

        expect(newAdmin).to.equal(otherAccount.address);
    })
});

describe("Test for FullSchoolSystem contract", function(){
    it("Get school full details", async function(){
        const [owner] = await ethers.getSigners();

        const {deployFullSchoolSystemContract} = await loadFixture(setUp);

        await deployFullSchoolSystemContract.addStudent(1, "Zikhona", 89, 77);

        const getFullDetails = await deployFullSchoolSystemContract.getFullDetails(1);

        expect(getFullDetails[0]).to.equal("Zikhona");
        expect(getFullDetails[1]).to.equal(89);
        expect(getFullDetails[2]).to.equal(77);
        expect(getFullDetails[3]).to.equal("Bonwelong Primary School");
        expect(getFullDetails[4]).to.equal(owner.address);
    })
});





