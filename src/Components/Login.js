import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import AxiosHelper from '../Components/Helper/AxiosHelper';
import AppContext from '../Components/Helper/AppContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setToken, setUserId } = useContext(AppContext);

    let history = useHistory();

    const loginHelper = (res) => {
        console.log('working');
        sessionStorage.setItem('token', res.data.access_token);
        setToken(res.data.access_token);
    }

    const clickHandler = () => {
        const data = {
            username: email,
            password,
            client_id: '2',
            client_secret: '9mEAAYWiCTbjpLThJ8qe5ZjyrXEzXA42lHCKFLrt',
            grant_type: 'password',
            scope: ''
        };


        AxiosHelper({ method: 'post', route: '/v1/oauth/token', fun: loginHelper, data });

        history.push('/');

    }

    // const logout = () => {
    //     sessionStorage.clear();
    //     setToken('');
    //     // still need to delete bearer token from db
    // }

    return (
        <>
            <h1>Login</h1>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} value={email} aria-describedby="emailHelpId" placeholder="" />
                <small id="emailHelpId" className="form-text text-muted">Help text</small>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} value={password} placeholder="" />
            </div>
            <button className="btn btn-success btn-large" onClick={clickHandler}>Submit</button>
            <Link className='btn btn-secondary btn-large' to='/register'>Register as a New User</Link>
        </>
    )
}