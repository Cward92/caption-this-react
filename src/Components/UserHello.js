import React, { useState, useEffect, useContext } from 'react'
import AxiosHelper from './Helper/AxiosHelper';
import AppContext from './Helper/AppContext';

export default function UserHello() {

    const { token } = useContext(AppContext);   
    const [name, setName] = useState(''); 

    useEffect(() => {
        const helloHelper = (res) => {
            console.log(res);
            setName(res.data.name);
        }

        if (token.length > 0) {
            AxiosHelper({ method: 'get', route: '/helloUser', fun: helloHelper, token });
        }
    }, [token]);

    return (
        <h1>
            Hello {name}!?
        </h1>
    )
}
