//imports 
const { expect } = require ("chai");
const { ethers } = require ("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

//Arrange
async function deployChild(){

    const ChildContract = await ethers.getContractFactory("Child");
    const childContract = await ChildContract.deploy();
    await childContract.waitForDeployment();

    return {childContract};
}

async function deployParent_f(){

    const Parent_f = await ethers.getContractFactory("Parent_f");
    const parent_f = await Parent_f.deploy();
    await parent_f.waitForDeployment();

    return {parent_f};
}

async function deployChild_f() {

    const Child_f = await ethers.getContractFactory("Child_f");
    const child_f = await Child_f.deploy(await deployParent_f.getAddress());
    await child_f.waitForDeployment();

    return {child_f};
}

async function deployFullSchoolSystem() {
    const [owner, otherAccount] = await ethers.getSigner();

    const FullSchoolSystem = await ethers.getContractFactory("FullSchoolSystem");
    const fullSchoolSytem = await FullSchoolSystem.deploy("Bonwelong Primary School");
    await fullSchoolSytem.waitForDeployment();

    return {fullSchoolSytem, owner, otherAccount};
}

describe("Child contract", function(){
    it("Get greeting from Parent", async function () {

        const {childContract} = await loadFixture(deployChild());

        expect(await deployChild.sayHello()).to.equal("Hello from Parent");
    });

    it("Get greeting from Child", async function(){

        const {childContract} = await loadFixture(deployChild);

        expect(await childContract.sayHelloFromChild()).to.equal("Hello from Child");
    });
});


describe("Child_f Contract", function(){
    it("Get message from Parent_f", async function(){
        const {child_f} = await loadFixture(deployChild);

        expect(await child_f.callExternalFunction()).to.equal("Called from another contract");
    });
});


describe("School Contract", function(){
    it("Get school name", async function(){
        const {fullSchoolSystem} = await loadFixture(deployFullSchoolSystem);
        const schoolName = await fullSchoolSystem.getSchoolName();

        expect(schoolName).to.equal("Bonwelong Primary School");
    });
});


describe("Student system Contract", function(){
    it("Get student details", async function(){
        const {fullSchoolSystem} = await loadFixture(deployFullSchoolSystem);
        const addStudentDetails = await fullSchoolSystem.addStudent(1, "Zkhona", 89, 76);
        const getStudentInfo = await fullSchoolSystem.getStudent(1);

        expect(getStudentInfo[0]).to.equal("Zikhona");
        expect(getStudentInfo[1]).to.equal(89);
        expect(getStudentInfo[2]).to.equal(76);
    });
});


describe("Admin control Conract", function(){
    it("Should revert when I try to change admin and I am not the contract owner", async function(){
        const {fullSchoolSystem, otherAccount} = await loadFixture(deployFullSchoolSystem);

        await expect(fullSchoolSystem.connect(otherAccount).changeAdmin(otherAccount.address)).to.be.revertedWith("Not admin");
    });

    it("Should successfully change the admin", async function(){
        const {fullSchoolSystem, otherAccount} = await loadFixture(deployFullSchoolSystem);
        await fullSchoolSystem.changeAdmin(otherAccount);
        const newAdmin = await fullSchoolSystem.getAdmin();

        expect(newAdmin).to.equal(otherAccount.address);
    });
});


describe("Full school system Contract", function(){
    it("Get full school details", async function(){
        const {fullSchoolSystem, owner} = await loadFixture(deployFullSchoolSystem);

        await fullSchoolSystem.addStudent(1, "Zikhona", 89, 81);

        const getFullDetails = await fullSchoolSystem.getFullDetails(1);

         expect(getFullDetails[0]).to.equal("Zikhona");
        expect(getFullDetails[1]).to.equal(89);
        expect(getFullDetails[2]).to.equal(81);
        expect(getFullDetails[3]).to.equal("Bonwelong Primary School");
        expect(getFullDetails[4]).to.equal(owner.address);
    });
});




