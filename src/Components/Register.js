import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import AxiosHelper from '../Components/Helper/AxiosHelper';
import AppContext from '../Components/Helper/AppContext';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setToken } = useContext(AppContext);

    let history = useHistory();

    const registerHelper = (res) => {
        sessionStorage.setItem('token', res.data.data.token);
        setToken(res.data.data.token);

    }

    const clickHandler = () => {
        const data = { name, email, password };
        AxiosHelper({ method: 'post', route: '/register', fun: registerHelper, data })
        history.push('/');
    }

    return (
        <div className="row">
            <div className="col-6 offset-3 p-4 rounded" style={{ backgroundColor: "#61A5F2" }}>
                <h1>Register</h1>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text"
                        className="form-control" onChange={e => setName(e.target.value)} value={name} aria-describedby="helpId" placeholder="" />
                    <small id="helpId" className="form-text text-muted">Help text</small>
                </div>
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
            </div>
        </div>
    )
}