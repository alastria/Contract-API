// SPDX-License-Identifier: MIT
// Alastria Contracts (last updated v0.0.1) (token/ERC721/ERC721.sol)

pragma solidity ^0.8.24;

import {ERC721} from "../../../OpenZeppelin/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "../../../OpenZeppelin/token/ERC721/extensions/ERC721Enumerable.sol";
import {Ownable} from "../../../OpenZeppelin/access/Ownable.sol";

contract ERC721MintableAndBurnable is ERC721Enumerable, Ownable {
    uint256 private nextToken;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(_msgSender()) {
        nextToken = 0;
    }

    function mint() public onlyOwner returns(uint256) {
        return mintTo(_msgSender());
    }

    function mintTo(address to) public onlyOwner returns(uint256) {
        uint256 tokenId = nextToken;
        super._safeMint(to, tokenId);
        nextToken++;
        return tokenId;
    }

    function burn(uint256 tokenId) public onlyOwner {
        super._burn(tokenId);
    }

    function transfer(address to, uint256 tokenId) public {
        super.safeTransferFrom(_msgSender(), to, tokenId);
    }

    function _isAuthorized(address owner, address spender, uint256 tokenId) internal view override returns (bool) {
        return spender == this.owner() || ERC721._isAuthorized(owner, spender, tokenId);
    }
}
