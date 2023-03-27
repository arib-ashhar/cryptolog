// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract cryptolog {

  struct DataOwner {
    uint dataOnwer_id;
    string accountAddress;
    uint filesCount;
    string[] ipfsHashes;
  }

  mapping(string => DataOwner) public dataOwners;
  uint public dataOwnerCount;

  constructor() public {
    //addOwner("1384D2C26c8830312A32B6b106cA585D512a5A5d");
  }
  //string ipfsHash;

  function accessFile (string memory _dataOwner_acc_Address, string memory _ipfsHash) public view returns (string memory) {
    uint256 addressBytes = bytes(_dataOwner_acc_Address).length;
    require(addressBytes > 0);
    uint256 ipfsBytes = bytes(_ipfsHash).length;
    require(ipfsBytes > 0);
    require(dataOwners[_dataOwner_acc_Address].filesCount != 0);
    for(uint i=0;i<dataOwners[_dataOwner_acc_Address].filesCount;i++) {
        if(keccak256(abi.encodePacked(dataOwners[_dataOwner_acc_Address].ipfsHashes[i])) == keccak256(abi.encodePacked(_ipfsHash))) {
            return dataOwners[_dataOwner_acc_Address].ipfsHashes[i];
        }
    }
    return "";
  }

  function addFile (string memory _dataOwner_acc_Address, string memory _ipfsReturn) public {
    dataOwners[_dataOwner_acc_Address].filesCount++;
    dataOwners[_dataOwner_acc_Address].ipfsHashes.push(_ipfsReturn);
  }

  function addOwner (string memory _accountAddress) public {
    dataOwnerCount++;
    dataOwners[_accountAddress] = DataOwner(dataOwnerCount, _accountAddress, 0, new string[](0));
  }
}
