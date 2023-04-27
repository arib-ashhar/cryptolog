import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { EthContext } from '../../contexts/EthContext';

const Share = ({ selectedBlock }) => {
    const [userid, setUserid] = useState();


    const context = useContext(EthContext);
    const { shareBlockData } = context;
    const shareFile = async () => {
        if (!userid) {
            toast.warn('Enter userid!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        await shareBlockData(userid, selectedBlock);
    }

    return (
        <div>
            <div className="form-outline border">
                <input type="text" value={selectedBlock?.ipfsHash || ''} disabled className="form-control" />
            </div>
            <div className="form-outline border-bottom mt-2">
                <input type="text" placeholder='Enter user id shared with you' value={userid} onInput={(e) => setUserid(e.target.value)} id="form12" className="form-control" />
            </div>
            <div>
                <div className="d-flex mt-3">
                    <button type="button" className="btn btn-secondary me-3" data-mdb-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={()=>shareFile()}>Share</button>
                </div>
            </div>
        </div>
    )
}

export default Share