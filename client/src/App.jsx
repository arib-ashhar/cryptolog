import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import { Buffer } from 'buffer';
import React, { Component } from 'react';
import {create as IPFSHTTPClient} from 'ipfs-http-client';
import {encryptAES, getbackIPFS} from './AES';

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
  constructor(props) {
    super(props)

    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      account: null,
      encryptedWA: null
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
        // const EDATA = encryptAES(this.state.buffer);
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
      this.setState({ipfsHash: added.path}, async () => {
        console.log("IPFS STATE: ", this.state.ipfsHash)
        //await getbackIPFS(this.state.ipfsHash);
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
            <h1>Your File</h1>
            <p>This File is stored on IPFS & The Ethereum Blockchain!</p>
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
