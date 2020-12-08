import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AxiosHelper from '../Components/Helper/AxiosHelper';
import AppContext from '../Components/Helper/AppContext';

export default function Profile() {

    const { token, userData } = useContext(AppContext);

    let { id } = useParams();

    useEffect(() => {
        const profileHelper = (res) => {
        }

        if (token.length > 0) {
            AxiosHelper({ method: 'get', route: '/helloUser', fun: profileHelper, token });
        }
    }, [token]);
    return (
        <div class="row mt-5">
            <div class="col-12">
                <div class="card" style={{ marginTop: '1em', width: "18rem" }}>
                    <img class="card-img-top" src="https://lorempixel.com/640/480/?86926" alt="Card image cap"></img>
                    <div class="card-body">
                        <h4 class="card-text">Name</h4>
                        <form action="buttonFunctions.php" method="post">
                            <button class='btn btn-primary' type="submit" name="edit" value="link to edit profile page">Edit</button>
                            <button class='btn btn-danger' type="submit" name="delete" value="link to 'are you sure?' alert + delete route">Delete</button>
                            <button class='btn btn-success' type="submit" name="back" value="history.pop">Back</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col-12">
                    <div class="card">
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
        </div>
    );
}