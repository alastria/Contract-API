import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC20MintableAndBurnable", function () {
  let ERC20: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    // Get the signers (accounts) to use in the tests
    [owner, addr1, addr2] = await ethers.getSigners();
    // Get the contract factory and deploy the contract
    const ERC20Factory = await ethers.getContractFactory("ERC20MintableAndBurnable");
    ERC20 = await ERC20Factory.deploy("TestToken", "TTK", 100);
    await ERC20.deployed();
  });

  it("Deploy the contract and set the right owner", async function () {
    // Check that the owner of the contract is set correctly
    expect(await ERC20.owner()).to.equal(owner.address);
  });

  it("Mint new tokens to the owner", async function () {
    // Mint new tokens to the owner's address
    await ERC20.mint(5);
    // Check that the owner's balance is updated correctly
    expect(await ERC20.balanceOf(owner.address)).to.be.deep.equal(ethers.BigNumber.from(105));
  });

  it("Mint new tokens to a specific address", async function () {
    // Mint new tokens to addr1's address
    await ERC20.mintTo(addr1.address, 50);
    // Check that addr1's balance is updated correctly
    expect(await ERC20.balanceOf(addr1.address)).to.be.deep.equal(ethers.BigNumber.from(50));
  });

  it("Burn tokens from the owner", async function () {
    // Burn tokens from the owner's address
    await ERC20.burn(50);
    // Check that the owner's balance is updated correctly
    expect(await ERC20.balanceOf(owner.address)).to.be.deep.equal(ethers.BigNumber.from(50));
  });

  it("Burn tokens from a specific address", async function () {
    // Mint new tokens to addr1's address
    await ERC20.mintTo(addr1.address, 50);
    // Burn tokens from addr1's address
    await ERC20.burnFrom(addr1.address, 50);
    // Check that addr1's balance is updated correctly
    expect(await ERC20.balanceOf(addr1.address)).to.be.deep.equal(ethers.BigNumber.from(0));
  });

  it("Spend allowance correctly", async function () {
    // Approve addr1 to spend 50 tokens from the owner's address
    await ERC20.approve(addr1.address, 50);
    // Transfer tokens from the owner's address to addr2's address using addr1
    await ERC20.connect(addr1).transferFrom(owner.address, addr2.address, 50);
    // Check that addr2's balance is updated correctly
    expect(await ERC20.balanceOf(addr2.address)).to.be.deep.equal(ethers.BigNumber.from(50));
  });
});