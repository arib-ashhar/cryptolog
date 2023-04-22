import React from 'react'
import Share from '../Share'

const ShareModal = ({selectedBlock}) => {
    return (
        <div>
            <div className="modal fade" id="shareModal" tabIndex={-1} aria-labelledby="shareModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="shareModalLabel">Share file</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body"><Share selectedBlock={selectedBlock || null} ></Share></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareModal