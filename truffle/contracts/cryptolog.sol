// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract cryptolog {
    struct DataOwner {
        uint filesCount;
        string dataOwner_id;
        string accountAddress;
        string ipfsHash;
        string description;
        string sharableTo;
        uint timestamp;
    }

    mapping(uint => DataOwner) public dataOwners;
    uint public filesCount;

    constructor() public {
        //addOwner("1384D2C26c8830312A32B6b106cA585D512a5A5d");
    }

    // function addFile(
    //     string memory _dataOwner_acc_Address,
    //     string memory _ipfsReturn
    // ) public {
    //     DataOwner storage _dataOwner = dataOwners[_dataOwner_acc_Address];
    //     _dataOwner.filesCount = _dataOwner.filesCount + 1;
    //     _dataOwner.ipfsHashes = _ipfsReturn;
    //     dataOwners[_dataOwner_acc_Address] = _dataOwner;
    // }

    function addFileWithOwner(string memory _dataOwnerId , string memory _accountAddress , string memory _ipfsReturn , string memory _description) public {
        filesCount++;
        
        dataOwners[filesCount] = DataOwner(
            filesCount,
            _dataOwnerId,
            _accountAddress,
            _ipfsReturn,
            _description,
            "[]",
            block.timestamp
        );
    }

    function shareFile(uint _fileNumber , string memory _sharableTo) public {
        DataOwner storage _dataOwner = dataOwners[_fileNumber];
        _dataOwner.sharableTo = _sharableTo;
        dataOwners[_fileNumber] = _dataOwner;
    }
}
