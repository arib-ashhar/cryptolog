const cryptolog = artifacts.require("./cryptolog.sol");

contract('cryptolog', (accounts) => {
    let cryptologInstance
    before(async () => {
        cryptologInstance = await cryptolog.deployed();
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            //const cryptologInstance = await cryptolog.deployed();
            const address = cryptologInstance.address
            console.log(address)
        });
    });

    // describe('adding DataOwner', async () => {
    //     it('adds new DataOwner successfully', async () => {
    //         //DO_id = await cryptolog.addOwner('accountAddress')
    //         DOCount = await cryptolog.dataOwnerCount();
    //         assert.equal(DOCount, 1, "conatains correct data-Owner-Count")
    //         DO = cryptolog.dataOwners(DOCount)
    //         assert.equal(DO[2], 0, "contains correct no of files")
    //     });
    // });

    describe('adding File', async () => {
        it('adds ipfsHash successfully', async () => {
            cryptologInstance = await cryptolog.deployed();
            await cryptologInstance.addFile(3, 'new IPFSHASH');
            setTimeout(async () => {
                fileHash = await cryptologInstance.accessFile(3, 'new IPFSHASH');
                assert.equal(fileHash, 'new IPFSHASH', "correct files HASH");
            }, 1000);
        });
    });

});