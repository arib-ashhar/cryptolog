import React, { useContext, useEffect } from 'react'
import { EthContext } from '../contexts/EthContext'; 
import ImageUpload from './ImageUpload/ImageUpload';
import Auth from './AUTH/Auth';
import Navbar from './Navbar/Navbar';



const Home = () => {
    const context = useContext(EthContext);
    const { init , tab , tabs , getIpfsHashes } = context;

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
            <Navbar/>
            {tab == tabs.UPLOAD_FILE && <ImageUpload />}
            {(tab == tabs.LOGIN || tab == tabs.CREATE_ACCOUNT)  && <Auth />}
            <button onClick={()=>getIpfsHashes()} >Get</button>
        </div>
    );
}

export default Home