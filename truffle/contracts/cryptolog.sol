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

    // function getDataOwnerByBlockHash( 
    //     string memory accountAddress
    // ) public returns (DataOwner memory) {
    //     return dataOwners;
    // }

    function addFile(
        string memory _dataOwner_acc_Address,
        string memory _ipfsReturn
    ) public {
        DataOwner storage _dataOwner = dataOwners[_dataOwner_acc_Address];
        _dataOwner.filesCount = _dataOwner.filesCount + 1;
        _dataOwner.ipfsHashes.push(_ipfsReturn);
        dataOwners[_dataOwner_acc_Address] = _dataOwner;
    }

    function addOwner(string memory _accountAddress) public {
        dataOwnerCount++;
        dataOwners[_accountAddress] = DataOwner(
            dataOwnerCount,
            _accountAddress,
            0,
            new string[](0)
        );
    }
}
