import React, { useContext, useEffect } from 'react'
import { EthContext } from '../contexts/EthContext'; 
import ImageUpload from './ImageUpload/ImageUpload';



const Home = () => {
    const context = useContext(EthContext);
    const { init } = context;

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div> 
            {/* <div className="pure-u-1-1">
                <p>Ethereum Account: {account}</p>
                <h1>Your File</h1>
                <p>This File is stored on IPFS & The Ethereum Blockchain!</p>
                <img alt='preview' src={`https://ipfs.io/ipfs/${ipfsHash}`} />
                <h2>Upload File</h2>
                <form onSubmit={onUpload}>
                    <input type='file'  />
                    <input type='submit' />
                </form>
                <hr />
            </div> */}
            <ImageUpload />
        </div>
    );
}

export default Home