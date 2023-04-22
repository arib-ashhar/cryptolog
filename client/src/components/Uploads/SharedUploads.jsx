import React, { useContext, useEffect, useState } from 'react'
import UploadCard from './UploadCard/UploadCard'
import { EthContext } from '../../contexts/EthContext';
import Loader from '../Loader/Loader';

const SharedUploads = () => {

  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(EthContext);
  const { allSharedUserBlocks, getSharedBlocks } = context;

  const init = async () => {
    setIsLoading(true);
    try {
      await getSharedBlocks();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    init();
  }, []);


  return (
    <div className="container py-5">
      <div className='d-flex flex-wrap'>
        {allSharedUserBlocks?.map((e, i) => {
          return <UploadCard block={e} key={i} />
        }).reverse()}
      </div>
      {isLoading && <Loader background={false} value={1} />}
    </div>
  )
}

export default SharedUploads