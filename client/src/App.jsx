import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import { Buffer } from 'buffer';
import React, { Component } from 'react';
import {create as IPFSHTTPClient} from 'ipfs-http-client';
import { encryptFile, encryptText, decryptFile, decryptText } from './AES';
import Web3 from 'web3';
import cryptolog from './contracts/cryptolog.json'

//const ipfsClient = require('ipfs-http-client');

const PROJECT_ID = '2NO47KGXiYHIo3rT8UanDRaRZn7'
const API_SECRET_KEY = 'c786f408153305f1fea5d1ad94dd496a'
const auth = 'Basic ' + Buffer.from(PROJECT_ID + ":" + API_SECRET_KEY).toString('base64')

const client = IPFSHTTPClient({
  host:'ipfs.infura.io',
  port:5001,
  protocol:'https',
  headers: {
    authorization: auth,
  }
})

class App extends Component {
  //UNCOMMENT
  async componentWillMount() {
    //await this.loadWeb3()
    //await this.loadBlockchainData()
  }

  // async loadWeb3() {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum)
  //     await window.ethereum.enable()
  //   }
  //   else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider)
  //   }
  //   else {
  //     window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  //   }
  // }

  // async loadBlockchainData() {
  //   const web3 = window.web3
  //   // Load account
  //   const accounts = await web3.eth.getAccounts()
  //   this.setState({ account: accounts[0] }, () => {
  //     console.log(this.state.account)
  //   })
  //   const networkId = await web3.eth.net.getId()
  //   console.log(networkId)
  //   const networkData = cryptolog.networks[networkId]
  //   console.log(networkData)
  //   if(networkData) {
  //     const contract = new web3.eth.Contract(cryptolog.abi, networkData.address)
  //     console.log(contract)
  //     this.setState({ contract })
  //   } else {
  //     window.alert('Smart contract not deployed to detected network.')
  //   }
  // }

  constructor(props) {
    super(props)

    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      account: null,
      account_id: null,
      contract: null,
      encryptedData: null,
      k1: null,
    }
    this.captureFile = this.captureFile.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }

  

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      //console.log('before: ', Buffer(reader.result))
      this.setState({ buffer: Buffer(reader.result) }, () => {
        console.log('state: ', this.state.buffer)
        const EDATA = encryptFile(this.state.buffer);
        console.log("in app.js", EDATA);
        //const DDATA = decryptFile(EDATA);
        //console.log("in app.js -> ", DDATA);
        this.setState({encryptedData: EDATA}, () => {
          console.log("STATE: -> ", this.state.encryptedData);
        });
        // this.setState({encryptedWA: EDATA}, () => {
        //   console.log("STATE WA: ", this.state.encryptedWA);
        // })
      });
      //console.log('After state: ', this.state.buffer)
      
      
      //console.log('after: ', Buffer(reader.result))
    }
  }

  

  //API ENDPOINT: "https://ipfs.io/ipfs/ipfsHash"
  onSubmit = async (event) => {
    event.preventDefault()
    console.log('submitting the form')
    try{
      const added = await client.add(this.state.buffer);
      console.log("IPFS: ", added.path)
      console.log("LENGTH: ", added.path.length);
      this.setState({ipfsHash: added.path}, async () => {
        console.log("IPFS STATE: ", this.state.ipfsHash)
        var response = encryptText(this.state.ipfsHash, this.state.encryptedData.key_k1);
        console.log(response);
        var response2 = decryptText(response.encrypted_Hash, response.key_k2);
        console.log("in appjs: ", response2);
        var response3 = decryptFile(this.state.encryptedData.encrypted, response2.key_k1)
        console.log(response3);
        //const id = await this.state.contract.methods.addOwner(this.state.account).send({from: this.state.account})
        //console.log(id)
        //const addedFile = await this.state.contract.methods.addFile(this.state.account, this.state.ipfsHash).send({from: this.state.account})
        //console.log(addedFile)


        // var APIurl = "https://ipfs.io/ipfs/"+this.state.ipfsHash
        // let response = await fetch(APIurl)
        // console.log(response)
      })
    } catch (error) {
      console.log(error)
    }
    // console.log('IPFS: ', res)
    
  }

  render() {
    return (
      <EthProvider>
        <div id="App">
          <div className="container">
            <Intro />
            <hr />
          </div>
          <div className="pure-u-1-1">
            <p>Ethereum Account: {this.state.account}</p>
            <h1>Your File</h1>
            <p>This File is stored on IPFS & The Ethereum Blockchain!</p>
            <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} />
            <h2>Upload File</h2>
            <form onSubmit={this.onSubmit}>
              <input type='file' onChange={this.captureFile} />
              <input type='submit' />
            </form>
            <hr />
          </div>
        </div>
      </EthProvider>
    );
  }
}


export default App;
