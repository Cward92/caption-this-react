import React, { useContext } from "react";
import { useLocation, Link, useHistory } from 'react-router-dom';
import AppContext from './Helper/AppContext';

function NavBar() {

    const { pages, token, userId, logout } = useContext(AppContext);
    const { pathname } = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark brand fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Caption This!</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        {
                            pages.filter((item, index) => {
                                if (item.url == '/') {
                                    return item;
                                }
                                if (token.length > 0) {
                                    if (item.user) {
                                        return item;
                                    }
                                }
                                else {
                                    if (!item.user) {
                                        return item;
                                    }
                                }
                            }).map((item, index) => {
                                return (
                                    <li key={index} className="nav-item">
                                        { item.url === '/logout' ?
                                            <a href='#' className="nav-link" onClick={logout}>Logout</a> : 
                                            item.url === '/profile/{id}' ? 
                                            <Link
                                                to={`/profile/${userId}`}
                                                className={"nav-link " + (pathname === item.url ? "active" : "")}>
                                                {item.name}
                                            </Link> : 
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