import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AxiosHelper from '../Components/Helper/AxiosHelper';
import AppContext from '../Components/Helper/AppContext';

export default function Profile() {

    const { token, userData } = useContext(AppContext);

    let { id } = useParams();

    let history = useHistory();

    const backHelper = () => {
        history.push('/');
    }

    useEffect(() => {
        const profileHelper = (res) => {
            return res.data;
        }

        if (token.length > 0) {
            AxiosHelper({ method: 'get', route: '/helloUser', fun: profileHelper, token });
        }
    }, [token]);
    return (
        <div class="row">
            <div class="col-5">
                <div class="card" style={{ marginTop: '1em', width: "18rem" }}>
                    <img class="card-img-top" src="https://lorempixel.com/640/480/?86926" alt="Card image cap"></img>
                    <div class="card-body">
                        <h4 class="card-text">{userData.name}</h4>
                        <form action="buttonFunctions.php" method="post">
                            <button class='btn btn-outline-primary' type="submit" name="edit" value="link to edit profile page">Edit</button>
                            <button class='btn btn-outline-danger' type="submit" name="delete" value="link to 'are you sure?' alert + delete route">Delete</button>
                            <button class='btn btn-outline-success' type="submit" name="back" onClick={backHelper}value=''>Back</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card" style={{ marginTop: '1em'}}>
                    <h5 class="card-header">Info</h5>
                    <div class="card-body">
                        <h5 class="card-title">Captions Made</h5>
                        <p class="card-text"># of captions</p>
                        <hr />
                        <h5 class="card-title">Rating Score</h5>
                        <p class="card-text">Score of Caption Ratings</p>
                        <hr />
                        <h5 class="card-title">Date Joined</h5>
                        <p class="card-text">date profile created</p>
                    </div>
                </div>
            </div>
        </div>
    );
}