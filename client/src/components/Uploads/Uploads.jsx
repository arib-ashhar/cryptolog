import React, { useContext } from 'react'
import UploadCard from './UploadCard/UploadCard'
import { EthContext } from '../../contexts/EthContext';

const Uploads = () => {
  
  const context = useContext(EthContext);
  const { allUserBlocks } = context;
 

  return (
    <div className="container py-5">
      <div className='d-flex flex-wrap'>
        {allUserBlocks?.map((e , i)=>{
          return <UploadCard shareable={true} block={e} key={i} />
        }).reverse()}
      </div>
    </div>
  )
}

export default Uploads