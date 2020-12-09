import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import AxiosHelper from '../Components/Helper/AxiosHelper';
import AppContext from '../Components/Helper/AppContext';

export default function Home() {

    const { userData, images, setImages } = useContext(AppContext);

    const imageHelper = (res) => {
        let imageSet = [];
        res.data.map(x => imageSet.push(x));
        setImages(imageSet);
    }
    
    const clickHandler = () => {
        AxiosHelper({ method: 'get', route: '/images', fun: imageHelper })
    }
    
    useEffect(() => {
        if (images.length <= 0) {
            console.log('working');
            AxiosHelper({ method: 'get', route: '/images', fun: imageHelper })
        }
    }, [images.length]);

    return (
        <>
            <div className="row">
                <div className="col-sm">
                    <div class="jumbotron">
                        <h1 class="display-4">
                            {userData.name ? `Hello, ${userData.name}!` : `Hello, New User!`}
                        </h1>
                        <p class="lead">Join the exciting world of captioning random images for meaningless points!</p>
                        <hr class="my-4"></hr>
                        <p class="lead">
                        <Link className='btn btn-primary btn-large' to='/register'>Register Now!</Link>
                        </p>
                    </div>
                    <hr></hr>
                    <h3 className="text-center">Gallery</h3>
                </div>
            </div>
            <div className="row pt-3">
                {
                    images.map((item, index) => {
                        return (
                            <div className="col-4 pb-2">
                                <div className="card-group">
                                    <div className="card text-center">
                                        <img className="card-img" src={images[index].src} alt=''></img>
                                        <div className="card-img-overlay">
                                        <Link className='btn btn-outline-success btn-large' to={`/images/${images[index].id}`}>Caption!</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <button className='btn btn-primary pt-2' onClick={clickHandler} type="submit" name="images" value="generate images">Generate Images</button>
        </>
    )
}