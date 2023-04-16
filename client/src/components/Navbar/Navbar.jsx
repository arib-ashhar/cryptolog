import React, { useContext } from 'react'
import "./Navbar.css"
import { EthContext } from '../../contexts/EthContext';
const Navbar = () => {
    
    const context = useContext(EthContext);
    const { tabs, setTab } = context;

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
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={()=>setTab(tabs.UPLOAD_FILE)}>Upload Files</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled">Disabled</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar