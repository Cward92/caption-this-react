import React, { useContext } from "react";
import { useLocation, Link } from 'react-router-dom';
import AppContext from './Helper/AppContext';

function NavBar() {

    const { pages, token, logout } = useContext(AppContext);
    const { pathname } = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark brand fixed-top">
            <div className="container">
                <a className="navbar-brand" href="/">Caption This!</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        {
                            pages.filter((item, index) => {
                                if (token.length > 0) {
                                    if (item.url !== '/login') {
                                        return item;
                                    }
                                }
                                else {
                                    if (item.url !== '/logout') {
                                        return item;
                                    }
                                }
                            }).map((item, index) => {
                                return (
                                    <li key={index} className="nav-item">
                                        { item.url === '/logout' ?
                                            <a href='#' className="nav-link" onClick={logout}>Logout</a> :
                                            <Link
                                                to={item.url}
                                                className={"nav-link " + (pathname === item.url ? "active" : "")}>
                                                {item.name}
                                            </Link>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar