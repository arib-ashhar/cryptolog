import React, { useContext } from 'react'
import "./Navbar.css"
import { EthContext } from '../../contexts/EthContext';
const Navbar = () => {

    const context = useContext(EthContext);
    const { tabs, tab, setTab, getIpfsHashes, user } = context;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light flex-nowrap p-0">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Crypto Log
                </a>
                <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className={`nav-link ${tab === tabs.UPLOAD_FILES && 'active'}`} href="#" onClick={() => setTab(tabs.UPLOAD_FILE)}>Upload Files</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${tab === tabs.UPLOADED_FILES && 'active'}`} href="#" onClick={async () => {
                                await getIpfsHashes()
                                setTab(tabs.UPLOADED_FILES)
                            }}>All Files</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${tab === tabs.SHARED_FILES && 'active'}`} href="#" onClick={async () => {
                                setTab(tabs.SHARED_FILES)
                            }}>Shared Files</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#"
                                onClick={async () => {
                                    localStorage.clear();
                                    window.location.reload();
                                }}
                            >Logout</a>
                        </li>
                    </ul>
                    <div class="d-flex align-items-center">
                        Userid : {user?.id}
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar