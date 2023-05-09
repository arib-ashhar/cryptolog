// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract cryptolog {
    struct DataOwner {
        // uint filesCount;
        string blockHash;
        string dataOwner_id;
        string accountAddress;
        string ipfsHash;
        string ipfsHashKey;
        string description;
        uint isShared;
        uint timestamp;
    }

    struct PublicSharedFiles {
        string dataOwnerBlockHash;
    }

    mapping(string => DataOwner) public dataOwners;
    mapping(string => PublicSharedFiles) public publicSharedFiles;
    // uint public filesCount;
    mapping(string => uint) public dataOwnersFilesCount;

    constructor() public {
        //addOwner("1384D2C26c8830312A32B6b106cA585D512a5A5d");
    }

    function addFileWithOwner(
        // string memory _blockAddress,
        string memory _dataOwnerId,
        string memory _accountAddress,
        string memory _ipfsReturn,
        string memory _ipfsKey,
        string memory _description
    ) public {
        // filesCount++;
        dataOwnersFilesCount[_dataOwnerId]++;
        string memory _blockAddress = concatenate(
            _dataOwnerId,
            dataOwnersFilesCount[_dataOwnerId]
        );

        dataOwners[_blockAddress] = DataOwner(
            _blockAddress,
            _dataOwnerId,
            _accountAddress,
            _ipfsReturn,
            _ipfsKey,
            _description,
            0,
            block.timestamp
        );
    }

    function shareFile(
        string memory _fromblockAddress,
        string memory _dataOwnerId
    ) public {
        dataOwnersFilesCount[_dataOwnerId]++;
        string memory _toblockAddress = concatenate(
            _dataOwnerId,
            dataOwnersFilesCount[_dataOwnerId]
        );

        DataOwner storage _dataOwner = dataOwners[_fromblockAddress];
        dataOwners[_toblockAddress] = _dataOwner;
        dataOwners[_toblockAddress] = DataOwner(
            _toblockAddress,
            _dataOwnerId,
            _dataOwner.accountAddress,
            _dataOwner.ipfsHash,
            _dataOwner.ipfsHashKey,
            _dataOwner.description,
            1,
            block.timestamp
        );
    }

    function makeFilePublic(
        string memory _key,
        string memory _dataOwnerBlockHash
    ) public {
        require(
            bytes(publicSharedFiles[_key].dataOwnerBlockHash).length == 0,
            "This file already made public"
        );
        publicSharedFiles[_key] = PublicSharedFiles(_dataOwnerBlockHash);
        dataOwners[_dataOwnerBlockHash].isShared = 2;
    }

    function uintToString(uint number) internal pure returns (string memory) {
        if (number == 0) {
            return "0";
        }
        uint temp = number;
        uint digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (number != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint(number % 10)));
            number /= 10;
        }
        return string(buffer);
    }

    function concatenate(
        string memory text,
        uint number
    ) public pure returns (string memory) {
        string memory numberAsString = uintToString(number);

        bytes memory textBytes = bytes(text);
        bytes memory colonBytes = bytes(":");
        bytes memory numberBytes = bytes(numberAsString);

        string memory result = new string(
            textBytes.length + colonBytes.length + numberBytes.length
        );
        bytes memory resultBytes = bytes(result);

        uint index = 0;
        for (uint i = 0; i < textBytes.length; i++) {
            resultBytes[index++] = textBytes[i];
        }
        for (uint i = 0; i < colonBytes.length; i++) {
            resultBytes[index++] = colonBytes[i];
        }
        for (uint i = 0; i < numberBytes.length; i++) {
            resultBytes[index++] = numberBytes[i];
        }

        return string(resultBytes);
    }
}
