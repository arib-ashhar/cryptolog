import React, { useContext, useState } from 'react'
import "./ImageUpload.css"
import { EthContext } from '../../contexts/EthContext';
import { Buffer } from 'buffer';
import Loader from '../Loader/Loader';

const ImageUpload = () => {

    const context = useContext(EthContext);
    const { setbuffer, ipfsHash, onUpload, addedFile } = context;
    const [img, setImg] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const captureFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImg({ src: URL.createObjectURL(file), name: file.name });
        }

        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            //console.log('before: ', Buffer(reader.result))
            setbuffer(Buffer(reader.result));
            //console.log('After state: ', state.buffer)
            //console.log('after: ', Buffer(reader.result))
        }
    }

    const onUploadimg = async () => {
        setIsLoading(true);
        await onUpload();
        setIsLoading(false);

    }


    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <div className="upload-files-container">
                <div className="drag-file-area cp" >
                    <input onChange={captureFile} type="file" className="default-file-input" />
                    {img &&
                        <>
                            <div style={{ backgroundImage: `url(${img.src})` }} className='img'></div>
                            <span>{img.name}</span>
                        </>
                    }

                    {!img && <div><span className="material-icons-outlined upload-icon"> file_upload </span>
                        <h3 className="dynamic-message"> Drag &amp; drop any file here </h3>
                        <span className="label">
                            <span>or </span>
                            <span className="browse-files">
                                <span className="browse-files-text">browse file </span>
                                <span>from device</span>
                            </span>
                        </span></div>}
                    {isLoading && <Loader value={3} />}
                </div>
                <span className="cannot-upload-message"> <span className="material-icons-outlined">error</span> Please select a file first <span className="material-icons-outlined cancel-alert-button">cancel</span> </span>
                <div className="file-block">
                    <div className="file-info"> <span className="material-icons-outlined file-icon">description</span> <span className="file-name"> </span> | <span className="file-size"></span> </div>
                    <span className="material-icons remove-file-icon">delete</span>
                    <div className="progress-bar"> </div>
                </div>
                {!ipfsHash && <button type="button" onClick={onUploadimg} disabled={img ? false : true} className="upload-button"> Upload </button>}
                {ipfsHash && <div className='img-info' >
                    <span>Your image has been successfuly uploaded on</span>
                    <span>
                        {ipfsHash}
                    </span>
                </div>}
            </div>
        </div>
    )
}

export default ImageUpload