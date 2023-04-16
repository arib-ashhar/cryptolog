import React, { useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import cryptolog from '../../contracts/cryptolog.json'
import { create as IPFSHTTPClient } from 'ipfs-http-client';
import { ipfsClient } from "../../environment";
// import { generateContract } from "client-node";
// import contract  from "truffle-contract";

const client = IPFSHTTPClient(ipfsClient)
const JWT_TOKEN = 'jwtToken';
const CONTRACT_TOKEN = 'CONTRACT_TOKEN';
const EMAIL = 'EMAIL';

const EthProvider = ({ children }) => {

  const [ipfsHash, setipfsHash] = useState();
  const [web3, setweb3] = useState();
  const [buffer, setbuffer] = useState();
  const [account, setaccount] = useState();
  const [account_id, setaccount_id] = useState();
  const [contract, setcontract] = useState();
  const [cryptologs, setCryptologs] = useState();
  const [encryptedWA, setencryptedWA] = useState();

  const tabs = {
    UPLOAD_FILE: "UPLOAD_FILE",
    LOGIN: "LOGIN",
    CREATE_ACCOUNT: "CREATE_ACCOUNT"
  }
  const [tab, setTab] = useState(tabs.LOGIN);

  async function init() {
    configureLogin();
    await loadWeb3()
    await loadBlockchainData();
  }

  function configureLogin() {
    if (!localStorage.getItem(JWT_TOKEN)) {
      setTab(tabs.LOGIN);
    } else {
      setTab(tabs.UPLOAD_FILE);
    }
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
      let contract = new web3.eth.Contract(cryptolog.abi, localStorage.getItem(CONTRACT_TOKEN) || networkData.address)
      contract.setProvider(window.web3);
      // const crContract = TruffleContract(cryptolog)
      // crContract.setProvider(web3.currentProvider)
      // const myCr = await contract.deployed();
      // setCryptologs(await contract.deployed());
      // const files = await myCr.dataOwners();
      // generateContract()

      if (!localStorage.getItem(CONTRACT_TOKEN)) {
        const bytecode = cryptolog.bytecode;
        contract = await contract.deploy({
          data: bytecode,
          arguments: [] // pass constructor arguments here
        }).send({ from: accounts[0] })
        // console.log("here", contract)
        localStorage.setItem(CONTRACT_TOKEN, contract.options.address);
      }
      setcontract(contract)


      // Hydrate the smart contract with values from the blockchain

    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }


  //API ENDPOINT: "https://ipfs.io/ipfs/ipfsHash"
  const onUpload = async () => {
    console.log('submitting the form')
    try {
      const acountAddress = (await getUser()).id;
      console.log(acountAddress);
      const added = await client.add(buffer);
      console.log("IPFS: ", added.path)
      setipfsHash(added.path);
      console.log("IPFS STATE: ", ipfsHash)
      const addedFile = await contract.methods.addFile(acountAddress, added.path).send({ from: account })
      console.log(addedFile)

    } catch (error) {
      console.log(error)
    }

  }

  async function getIpfsHashes() {
    const accountAddress = (await getUser()).id;
    console.log(accountAddress)
    const result = await contract.methods.dataOwnerCount().call({ from: account });
    const result1 = await contract.methods.dataOwners(accountAddress).call({ from: account });
    console.log(result, result1, "here");
  }

  async function login(email, password) {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const { authtoken } = await response.json();

    // Save the token to local storage
    localStorage.setItem(JWT_TOKEN, authtoken);
  }

  async function createUser(name, password, email) {

    try {

      const response = await fetch('http://localhost:5000/api/auth/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password, email, hashid: "hashid" })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { authtoken, id } = await response.json();
      (await contract.methods.addOwner(id).send({ from: account }));

      localStorage.setItem(JWT_TOKEN, authtoken);

    } catch (error) {
      console.error('There was a problem with the createUser request:', error);
    }
  }

  async function getUser() {
    const token = localStorage.getItem(JWT_TOKEN);

    try {
      const response = await fetch('http://localhost:5000/api/auth/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // handle response data
      return data;
    } catch (error) {
      console.error('There was a problem with the getUser request:', error);
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
      tabs, tab, setTab, getIpfsHashes,
      login, configureLogin, createUser, getUser,
      init
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
