// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract fileStore {

  struct DataOwner {
    string accountAddress;
    uint filesCount;
    string[] ipfsHashes;
  }

  mapping(string => DataOwner) public dataOwners;
  uint public dataOwnerCount;

  constructor() public {
    adddataOwner("27D380412C6903B0C34451a6FcB052A9ADCE5C2b");
  }
  //string ipfsHash;

  function adddataOwner (string memory _accountAddress) private {
    dataOwnerCount++;
    dataOwners[_accountAddress].accountAddress = _accountAddress;
  }

  function accessFile (string memory _accountAddress, string memory _ipfsHash) public returns (string memory) {
    bytes memory accAddressSize = bytes(dataOwners[_accountAddress].accountAddress);
    require(accAddressSize.length != 0);
    for(uint i=0;i<dataOwners[_accountAddress].filesCount;i++) {
        if(keccak256(abi.encodePacked(dataOwners[_accountAddress].ipfsHashes[i])) == keccak256(abi.encodePacked(_ipfsHash))) {
            return dataOwners[_accountAddress].ipfsHashes[i];
        }
    }
    return "";
  }

  function addFile (string memory _ipfsReturn, string memory _accountAddress) public {
    dataOwners[_accountAddress].filesCount++;
    dataOwners[_accountAddress].ipfsHashes.push(_ipfsReturn);
  }
}
