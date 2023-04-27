import React, { useContext, useRef, useState } from 'react'
import "./UploadCard.css"
import { EthContext } from '../../../contexts/EthContext';
import parse from 'html-react-parser';
import Loader from '../../Loader/Loader';

const UploadCard = ({ block, shareable }) => {

  const context = useContext(EthContext);
  const { setCurrentBlock, getFileFromBlock , makeFilePublic , accessPublicFile } = context;
  const [isLoading, setIsLoading] = useState(false);
  const shareBtn = useRef();
  const description = useRef();
  const showShareableModal = () => {
    if (!shareable) {
      return;
    }
    setCurrentBlock(block);
    shareBtn.current.click();
  }

  const downloadFile = async (block) => {
    try {
      setIsLoading(true);
      const file = await getFileFromBlock(block);
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = block.description.filename;
      a.click();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }


  return (
    <div className='p-2' > 
      <div class="card ">
        {/* <img src={block.imgsrc} class="card-img-top" alt="Preview" /> */}
        <div class="card-body d-flex justify-content-between flex-column">
          { parseInt(block?.isShared) === 2 && <span className="public">Public</span>}
          <pre ref={description} class="card-title">
            <div>Filename : {block.description.filename}</div>
            <div>Upload Time(ms) : {block.description.uploadTime} </div>
            <div>Type : {block.description.type}</div>
            <div>Size : ({(block.description.size)}) </div>
            {shareable && <div>Key : ({(block.ipfsHashKey)}) </div>}
            {/* {(block.description)} */}
          </pre>
          <div className="d-flex mt-3">
            <a href="#!" onClick={() => downloadFile(block)} class="btn btn-primary" >Open</a>
            {shareable && parseInt(block?.isShared) !== 2 && <a href="#!" class="btn btn-primary ms-1" onClick={() => showShareableModal()} >Share</a>}
            {shareable && parseInt(block?.isShared) !== 2 && <a href="#!" class="btn btn-primary ms-1" onClick={() => makeFilePublic(block)} >Make Public</a>}
          </div>
          {shareable && <button type="button" ref={shareBtn} className="btn btn-primary d-none" data-mdb-toggle="modal" data-mdb-target="#shareModal">
          </button>}
        </div>
      </div>
      {isLoading && <Loader value={1} />}
    </div>
  )
}

export default UploadCard