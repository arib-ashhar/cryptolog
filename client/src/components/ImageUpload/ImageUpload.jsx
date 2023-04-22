import React, { useContext, useRef, useState } from 'react'
import "./ImageUpload.css"
import { EthContext } from '../../contexts/EthContext';
import { Buffer } from 'buffer';
import Loader from '../Loader/Loader';

const ImageUpload = () => {

    const context = useContext(EthContext);
    const { setbuffer, ipfsHash, onUpload } = context;
    const [img, setImg] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const description = useRef();

    const captureFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImg({ src: URL.createObjectURL(file), name: file.name, file: file });
        }

        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => { 
            setbuffer(Buffer(reader.result)); 
        }
    }

    const onUploadimg = async () => {
        setIsLoading(true);
        await onUpload(description.current.innerHTML);
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
                {img?.file && <div className="">
                    <div className="file-info">
                        <pre ref={description}>
                            <div>Filename : {img.file.name}</div>
                            <div>Upload Time(ms) : {Date.now()} </div>
                            <div>Type : {img.file.type}</div>
                        </pre>
                    </div>
                </div>}
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