import React, { useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import cryptolog from '../../contracts/cryptolog.json'
import { create as IPFSHTTPClient } from 'ipfs-http-client';
import { contract_token, ipfsClient } from "../../environment";
import { toast } from 'react-toastify';

const client = IPFSHTTPClient(ipfsClient)
const JWT_TOKEN = 'jwtToken';
const CONTRACT_TOKEN = 'CONTRACT_TOKEN';
const EMAIL = 'EMAIL';

const EthProvider = ({ children }) => {

  const [ipfsHash, setipfsHash] = useState();
  const [allUserBlocks, setAllUserBlocks] = useState();
  const [web3, setweb3] = useState();
  const [buffer, setbuffer] = useState();
  const [account, setaccount] = useState();
  const [account_id, setaccount_id] = useState();
  const [contract, setcontract] = useState();
  const [encryptedWA, setencryptedWA] = useState();
  const [currentBlock, setCurrentBlock] = useState();
  const [allSharedUserBlocks, setAllSharedUserBlocks] = useState();
  const [user, setUser] = useState();

  const tabs = {
    UPLOAD_FILE: "UPLOAD_FILE",
    UPLOADED_FILES: "UPLOADED_FILES",
    LOGIN: "LOGIN",
    CREATE_ACCOUNT: "CREATE_ACCOUNT",
    SHARED_FILES: "SHARED_FILES",
  }
  const [tab, setTab] = useState(tabs.LOGIN);

  async function init() {
    configureLogin();
    await loadWeb3()
    await loadBlockchainData();
    await getUser();
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
      let contract = new web3.eth.Contract(cryptolog.abi, contract_token || localStorage.getItem(CONTRACT_TOKEN) || networkData.address)
      contract.setProvider(window.web3);

      // if (!localStorage.getItem(CONTRACT_TOKEN)) {
      //   const bytecode = cryptolog.bytecode;
      //   contract = await contract.deploy({
      //     data: bytecode,
      //     arguments: [] // pass constructor arguments here
      //   }).send({ from: accounts[0] })
      //   localStorage.setItem(CONTRACT_TOKEN, contract.options.address);
      // }
      setcontract(contract)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }


  //API ENDPOINT: "https://ipfs.io/ipfs/ipfsHash"
  const onUpload = async (description) => {
    console.log('submitting the form')
    try {
      const _dataOwnerId = (await getUser()).id;
      console.log(_dataOwnerId, description);
      const added = await client.add(buffer);
      console.log("IPFS: ", added.path)
      setipfsHash(added.path);
      const addedFile = await contract.methods.addFileWithOwner(_dataOwnerId, account, added.path, description).send({ from: account })
      console.log(addedFile)
    } catch (error) {
      console.log(error)
    }

  }

  async function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  }

  async function getIpfsHashes() {
    if (!allUserBlocks) {
      const _dataOwnerId = (await getUser()).id;
      console.log(_dataOwnerId)
      let filesCount = await contract.methods.filesCount().call({ from: account });
      console.log(filesCount);
      let userBlocks = [];
      for (let i = 1; i <= filesCount; i++) {
        let block = await contract.methods.dataOwners(i).call({ from: account });
        console.log(block);
        if (block.dataOwner_id === _dataOwnerId) {
          const imgsrc = `https://ipfs.io/ipfs/${block.ipfsHash}`;
          block.imgsrc = imgsrc;
          userBlocks.push(block)
        }
      }
      setAllUserBlocks(userBlocks);
    }
  }

  async function getSharedBlocks() {
    if (!allSharedUserBlocks) {
      const _dataOwnerId = (await getUser()).id;
      let filesCount = await contract.methods.filesCount().call({ from: account });
      console.log(filesCount);
      let userBlocks = [];
      for (let i = 1; i <= filesCount; i++) {
        let block = await contract.methods.dataOwners(i).call({ from: account });
        const sharedTo = JSON.parse(block.sharableTo);
        console.log(sharedTo);
        if (sharedTo.includes(_dataOwnerId)) {

          let imgsrc = `https://ipfs.io/ipfs/${block.ipfsHash}`;
          try {
            imgsrc = await loadImage(`https://ipfs.io/ipfs/${block.ipfsHash}`);
          } catch (error) {
            console.log(error);
          }
          
          block.imgsrc = imgsrc;
          userBlocks.push(block)
        }
      }
      setAllSharedUserBlocks(userBlocks);
    }
  }

  async function shareBlockData(userid, block) {
    let sharedTo = JSON.parse(block.sharableTo || '[]');
    if (!sharedTo.includes(userid)) {
      console.log(sharedTo);
      sharedTo.push(userid);
      console.log(block.filesCount, JSON.stringify(sharedTo));
      sharedTo = JSON.stringify(sharedTo);
      await contract.methods.shareFile(block.filesCount, sharedTo).send({ from: account });
      toast.success('Successfully shared with ' + userid, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn('Already shared with ' + userid, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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

      localStorage.setItem(JWT_TOKEN, authtoken);

    } catch (error) {
      console.error('There was a problem with the createUser request:', error);
    }
  }

  async function getUser() {
    const token = localStorage.getItem(JWT_TOKEN);

    if (user) {
      return user;
    }

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
      setUser(data);
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
      login, configureLogin, createUser,
      user, getUser,
      allUserBlocks,
      setAllUserBlocks,
      shareBlockData,
      currentBlock, setCurrentBlock,
      allSharedUserBlocks, setAllSharedUserBlocks,
      getSharedBlocks,
      init
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
