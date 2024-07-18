// SPDX-License-Identifier: MIT
// Alastria Contracts (last updated v0.0.1) (token/ERC721/ERC721.sol)

pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

struct ERC721Data {
  string storedHash;
  uint256 number;
}

contract ERC721WithStructData is ERC721Enumerable, Ownable {
    mapping (uint256 => ERC721Data) private tokenData;
    uint256 private nextToken;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(_msgSender()) {
        nextToken = 0;
    }

    function mint(ERC721Data memory data) public onlyOwner returns(uint256) {
        return mintTo(_msgSender(), data);
    }

    function mintTo(address to, ERC721Data memory data) public onlyOwner returns(uint256) {
        uint256 tokenId = nextToken;
        super._safeMint(to, tokenId);
        tokenData[tokenId] = data;
        nextToken++;
        return tokenId;
    }

    function burn(uint256 tokenId) public onlyOwner {
        super._burn(tokenId);
        delete tokenData[tokenId];
    }

    function transfer(address to, uint256 tokenId) public {
        super.safeTransferFrom(_msgSender(), to, tokenId);
    }

    function getData(uint256 tokenId) public view returns(ERC721Data memory) {
        return tokenData[tokenId];
    }

    function updateData(uint256 tokenId, ERC721Data memory data) public {
        require(_msgSender() == owner() || ownerOf(tokenId) == _msgSender(), "ERC721WithStructDataError: Cannot update data of token not owned by the caller.");
        tokenData[tokenId] = data;
    }

    function _isAuthorized(address owner, address spender, uint256 tokenId) internal view override returns (bool) {
        return spender == this.owner() || ERC721._isAuthorized(owner, spender, tokenId);
    }
}
