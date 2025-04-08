// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OasisNFT is ERC721, Ownable {
    uint256 private _tokenIds;

    constructor() ERC721("OasisNFT", "OASIS") Ownable(msg.sender){
        // The Ownable constructor is automatically called with no args
        // no extra code is required here unless you want custom logic
    }

    function mintNFT(address recipient) external onlyOwner returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;

        _safeMint(recipient, newItemId);
        return newItemId;
    }
}
