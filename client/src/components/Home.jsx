import React, { useContext, useEffect } from 'react'
import { EthContext } from '../contexts/EthContext';
import ImageUpload from './ImageUpload/ImageUpload';
import Auth from './AUTH/Auth';
import Navbar from './Navbar/Navbar';
import Uploads from './Uploads/Uploads';
import { ToastContainer } from 'react-toastify';
import ShareModal from './Share/ShareModal/ShareModal';
import SharedUploads from './Uploads/SharedUploads';



const Home = () => {
    const context = useContext(EthContext);
    const { init, tab, tabs, currentBlock } = context;

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='home'>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <Navbar />
            {tab == tabs.UPLOAD_FILE && <ImageUpload />}
            {(tab == tabs.LOGIN || tab == tabs.CREATE_ACCOUNT) && <Auth />}
            {(tab == tabs.LOGIN || tab == tabs.UPLOADED_FILES) && <Uploads />}
            {(tab == tabs.LOGIN || tab == tabs.SHARED_FILES) && <SharedUploads />}
            <ShareModal selectedBlock={currentBlock} />

        </div>
    );
}

export default Home