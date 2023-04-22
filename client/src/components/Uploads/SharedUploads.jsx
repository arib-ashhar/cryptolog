import React, { useContext } from 'react'
import UploadCard from './UploadCard/UploadCard'
import { EthContext } from '../../contexts/EthContext';

const SharedUploads = () => {
  
  const context = useContext(EthContext);
  const { allSharedUserBlocks } = context;
 

  return (
    <div className="container py-5">
      <div className='d-flex flex-wrap'>
        {allSharedUserBlocks?.map((e , i)=>{
          return <UploadCard block={e} key={i} />
        })}
      </div>
    </div>
  )
}

export default SharedUploads