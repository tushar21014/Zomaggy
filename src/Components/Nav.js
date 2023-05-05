import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import '../Css/Nav.css'


function Nav() {
    const navigate = useNavigate();
    const location = useLocation();
    function handleLogout() {
        localStorage.clear();
        navigate('/');

    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/" id='Nav-title'>Zomaggy</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto HomeNav">
                        <li className={`nav-item ${location.pathname === "/" ? "active" : ""} mr-2`}>
                            <Link className="nav-link" id="HomeNav" to="/">Home <span className="sr-only"></span></Link>
                            {/* <Link className="nav-link" id="HomeNav" to="/"><i className="fa-solid fa-house mr-2"></i>Home <span className="sr-only">(current)</span></Link> */}
                        </li>
                        {/* <li className={`nav-item ${location.pathname === "/About" ? "active" : ""} mr-2`}>
                            <Link className="nav-link" id="HomeNav" to="/About">About Author <span className="sr-only"></span></Link> */}
                            {/* <Link className="nav-link" id="HomeNav" to="/"><i className="fa-solid fa-house mr-2"></i>Home <span className="sr-only">(current)</span></Link> */}
                        {/* </li> */}
                        {!localStorage.getItem('auth-Token') ? <><li className="nav-item">
                            <Link className="nav-link" id="LoginNav" to="/Login">Login</Link>
                        </li></> :
                            <>
                                <li className="nav-item ml-3">
                                    <div className="nav-link" onClick={() => navigate('/Anothercart')}><i className="fa-solid fa-xs fa-cart-shopping mr-2"></i>My Cart</div>
                                </li>

                                <li className="nav-item" id='myact'>
                                    <div className="nav-link" onClick={() => navigate('/MyAccount')}><i className="fa-solid fa-user mr-2 fa-xs"></i>My Account</div>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nav