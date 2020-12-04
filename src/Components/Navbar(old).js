import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
class Navbar extends Component {
    render(){
        return(
            <nav className="navBar">
                <ul>
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/register/">Register</NavLink></li>
                    <li><NavLink to="/login/">Login</NavLink></li>
                </ul>
            </nav>
        );
    }
}
export default Navbar;