import React, { useContext, useRef } from 'react'
import "./UploadCard.css"
import { EthContext } from '../../../contexts/EthContext';
import parse from 'html-react-parser';

const UploadCard = ({ block, shareable }) => {

  const context = useContext(EthContext);
  const { setCurrentBlock } = context;
  const shareBtn = useRef();
  const description = useRef();
  const showShareableModal = () => {
    if(!shareable){
      return;
    }
    setCurrentBlock(block);
    shareBtn.current.click();
  }

  
  return (
    <div className='p-2' >
      <div class="card ">
        <img src={block.base64String} class="card-img-top" alt="Preview" />
        <div class="card-body d-flex justify-content-between flex-column">
          <pre ref={description} class="card-title">{parse(block.description)}</pre>
          <div className="d-flex mt-3">
            {shareable && <a href="#!" class="btn btn-primary ms-1" onClick={() => showShareableModal()} >Share</a>}
          </div>
          {shareable && <button type="button" ref={shareBtn} className="btn btn-primary d-none" data-mdb-toggle="modal" data-mdb-target="#shareModal">
          </button>}
        </div>
      </div>
    </div>
  )
}

export default UploadCard