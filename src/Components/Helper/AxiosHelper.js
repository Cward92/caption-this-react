import Axios from 'axios';


export default function AxiosHelper({ method, route, fun = r => console.log(r) , data = {}, token = '' }) {
    const API_URL = 'http://localhost:8000';
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    return Axios(
        {
            method,
            headers,
            url: API_URL + route,
            data
        }
    ).then(res => fun(res))
     .catch(e => console.log(e));
}
