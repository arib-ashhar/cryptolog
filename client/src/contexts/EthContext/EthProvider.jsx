import React, { useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import cryptolog from '../../contracts/cryptolog.json'
import { create as IPFSHTTPClient } from 'ipfs-http-client';
import { ipfsClient } from "../../environment";

const client = IPFSHTTPClient(ipfsClient)


const EthProvider = ({ children }) => {

  const [ipfsHash, setipfsHash] = useState();
  const [web3, setweb3] = useState();
  const [buffer, setbuffer] = useState();
  const [account, setaccount] = useState();
  const [account_id, setaccount_id] = useState();
  const [contract, setcontract] = useState();
  const [encryptedWA, setencryptedWA] = useState();
  async function init() {
    console.log("here")
    await loadWeb3()
    await loadBlockchainData()
  }

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setaccount(accounts[0])

    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const networkData = cryptolog.networks[networkId]
    console.log(networkData)
    if (networkData) {
      const contract = new web3.eth.Contract(cryptolog.abi, networkData.address)
      console.log("here", contract)
      setcontract(contract)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }


  //API ENDPOINT: "https://ipfs.io/ipfs/ipfsHash"
  const onUpload = async () => { 
    console.log('submitting the form')
    try {
      const added = await client.add(buffer);
      console.log("IPFS: ", added.path)
      setipfsHash(added.path);
      console.log("IPFS STATE: ", ipfsHash)
      const id = await contract.methods.addOwner(account).send({ from: account })
      console.log(id)
      const addedFile = await contract.methods.addFile(account, added.path).send({ from: account })
      console.log(addedFile)

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <EthContext.Provider value={{
      // state, setState,
      ipfsHash, setipfsHash,
      web3, setweb3,
      buffer, setbuffer,
      account, setaccount,
      account_id, setaccount_id,
      contract, setcontract,
      encryptedWA, setencryptedWA, onUpload,
      init
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
