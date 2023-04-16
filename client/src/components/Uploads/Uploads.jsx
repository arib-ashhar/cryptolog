import React from 'react'
import UploadCard from './UploadCard/UploadCard'

const Uploads = () => {
  return (
    <div className="container py-5">
      <div className='d-flex flex-wrap'>
        <UploadCard />
        <UploadCard />
        <UploadCard />
        <UploadCard />
      </div>
    </div>
  )
}

export default Uploads