import React, { useContext, useEffect } from 'react'
import { EthContext } from '../contexts/EthContext';
import { Buffer } from 'buffer';



const Home = () => {
    const context = useContext(EthContext);
    const { init, setbuffer, ipfsHash, account, onUpload } = context;
    const captureFile = (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            //console.log('before: ', Buffer(reader.result))
            setbuffer(Buffer(reader.result));
            //console.log('After state: ', state.buffer)
            //console.log('after: ', Buffer(reader.result))
        }
    }

    useEffect(() => {
        init();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    return (
        <div id="App">
            <div className="container">
                <hr />
            </div>
            <div className="pure-u-1-1">
                <p>Ethereum Account: {account}</p>
                <h1>Your File</h1>
                <p>This File is stored on IPFS & The Ethereum Blockchain!</p>
                <img alt='preview' src={`https://ipfs.io/ipfs/${ipfsHash}`} />
                <h2>Upload File</h2>
                <form onSubmit={onUpload}>
                    <input type='file' onChange={captureFile} />
                    <input type='submit' />
                </form>
                <hr />
            </div>
        </div>
    );
}

export default Home