import React, { useEffect, useContext } from 'react'
import AxiosHelper from './Helper/AxiosHelper';
import AppContext from './Helper/AppContext';

export default function UserHello() {

    const { token } = useContext(AppContext);

    useEffect(() => {
        if (token.length > 0) {
            AxiosHelper({ method: 'get', route: '/helloUser', token });
        }
    }, [token]);

    return (
        <h1>
            Hello *
        </h1>
    )
}
