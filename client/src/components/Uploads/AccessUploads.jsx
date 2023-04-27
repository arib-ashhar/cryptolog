import React, { useContext, useState } from 'react'
import { EthContext } from '../../contexts/EthContext';
import Loader from '../Loader/Loader';

const AccessUploads = () => {

    const context = useContext(EthContext);
    const { accessPublicFile } = context;
    const [isLoading, setIsLoading] = useState(false);
    const [key, setKey] = useState('');


    const downloadFile = async () => {
        setIsLoading(true);
        try {
            await accessPublicFile(key);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }


    return (
        <div className="container py-5">
            <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
            <a href="#!" onClick={() => downloadFile()} class="btn btn-primary mt-3" >Open</a>
            {isLoading && <Loader value={1} />}
        </div>
    )
}

export default AccessUploads