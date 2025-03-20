import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC721MintableAndBurnable", function () {
  let ERC721: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const ERC721Factory = await ethers.getContractFactory("ERC721MintableAndBurnable");
    ERC721 = await ERC721Factory.deploy("TestToken", "TTK");
    await ERC721.deployed();
  });

  it("Deploy the contract and set the right owner", async function () {
    expect(await ERC721.owner()).to.equal(owner.address);
  });

  it("Mint a new token to the owner", async function () {
    const tx = await ERC721.mint();
    const receipt = await tx.wait();

    // Find the Transfer event and extract the tokenId
    const event = receipt.events.find((e: any) => e.event === "Transfer");
    const tokenId = event.args.tokenId;

    expect(await ERC721.ownerOf(tokenId)).to.equal(owner.address);
  });

  it("Mint a new token to a specific address", async function () {
    const tx = await ERC721.mintTo(addr1.address);
    const receipt = await tx.wait();

    // Find the Transfer event and extract the tokenId
    const event = receipt.events.find((e: any) => e.event === "Transfer");
    const tokenId = event.args.tokenId;

    expect(await ERC721.ownerOf(tokenId)).to.equal(addr1.address);
  });

  it("Burn a token", async function () {
    // Mint a new token
    const tx = await ERC721.mint();
    const receipt = await tx.wait();
    const tokenId = receipt.events.find((e: any) => e.event === "Transfer").args.tokenId;
  
    const ownerAddress = await owner.getAddress();
    const balanceBefore = await ERC721.balanceOf(ownerAddress);
  
    // Burn the token
    await ERC721.burn(tokenId);
  
    const balanceAfter = await ERC721.balanceOf(ownerAddress);
    expect(balanceAfter).to.deep.equal(balanceBefore.sub(1));
  });

  it("Transfer a token", async function () {
    // Mint a new token
    const tx = await ERC721.mint();
    const receipt = await tx.wait();
    const tokenId = receipt.events.find((e: any) => e.event === "Transfer").args.tokenId;

    // Transfer the token to addr1
    await ERC721.transfer(addr1.address, tokenId);
    expect(await ERC721.ownerOf(tokenId)).to.equal(addr1.address);
  });

  it("Allow only the owner to mint", async function () {
    try {
      // Attempt to mint a token from a non-owner account
      await ERC721.connect(addr1).mint();
      expect.fail("Minting should have failed for non-owner");
    } catch (error: any) {
      // Check that the error message includes the expected unauthorized account message
      expect(error.message).to.include('OwnableUnauthorizedAccount');
      expect(error.message).to.include(addr1.address); 
    }
  });

  it("Allow only the owner to burn", async function () {
    // Mint a new token
    const tx = await ERC721.mint();
    const receipt = await tx.wait();
    const tokenId = receipt.events?.find((e: any) => e.event === "Transfer")?.args.tokenId;
  
    if (!tokenId) {
      throw new Error("Token ID not found in Transfer event");
    }
  
    try {
      // Attempt to burn the token from a non-owner account
      await ERC721.connect(addr1).burn(tokenId);
      expect.fail("Burning should have failed for non-owner");
    } catch (error: any) {
      // Check that the error message includes the expected unauthorized account message
      expect(error.message).to.include('OwnableUnauthorizedAccount');
      expect(error.message).to.include(addr1.address); 
    }
  });
});
