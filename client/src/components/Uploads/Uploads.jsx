import React, { useContext, useEffect, useState } from 'react'
import UploadCard from './UploadCard/UploadCard'
import { EthContext } from '../../contexts/EthContext';
import Loader from '../Loader/Loader';

const Uploads = () => {

  const context = useContext(EthContext);
  const { allUserBlocks, getIpfsHashes } = context;
  const [isLoading, setIsLoading] = useState(false);


  const init = async () => {
    setIsLoading(true);
    try {
      await getIpfsHashes();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    init()
  }, [])


  return (
    <div className="container py-5">
      <div className='d-flex flex-wrap'>
        {allUserBlocks?.map((e, i) => {
          return <UploadCard shareable={e.isShared} block={e} key={i} />
        }).reverse()}
      </div>
      {isLoading && <Loader background={false} value={1} />}

    </div>
  )
}

export default Uploads