import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory, Link, useParams } from 'react-router-dom';
import AxiosHelper from '../Components/Helper/AxiosHelper';
import AppContext from '../Components/Helper/AppContext';
import { get } from 'jquery';

export default function Image() {

    const { token, userData } = useContext(AppContext);

    let { id } = useParams();

    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const [captions, setCaptions] = useState([]);

    const imageHelper = (res) => {
        setImage(res.data);
    }


    useEffect(() => {
        AxiosHelper({ method: 'get', route: `/images/${id}`, fun: imageHelper });
    }, []);

    const captionHelper = (res) => {
        setCaptions(res.data);
        setCaption('');
    }

    useEffect(() => {
        AxiosHelper({ method: 'get', route: `/captions/${id}`, fun: captionHelper })
    }, []);

    const submitHandler = () => {
        const data = {
            user_id: userData.id,
            image_id: parseInt(id),
            text: caption,
        }
        AxiosHelper({ method: 'post', route: `/captions/create`, fun: captionHelper, data, token });
    }

    const likeHandler = (caption_id) => {
        const data = {
            image_id: parseInt(id),
        }
        AxiosHelper({ method: 'put', route: `/captions/${caption_id}/update`, fun: captionHelper, data, token})
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div class="text-center">
                        <img src={image.src} class="rounded  p-4" style={{ backgroundColor: "#61A5F2" }} alt="..." />
                    </div>
                </div>
            </div>
            <div class="form-row text-center">
                <div class="col-6 offset-3">
                    <input type="text" class="form-control" onChange={e => setCaption(e.target.value)} value={caption} placeholder="Your Caption Here!" />
                    <button type="submit" class="btn btn-primary" onClick={submitHandler}>Submit</button>
                </div>
            </div>
            <hr></hr>
            {
                captions.sort((a,b) => b.rating - a.rating).map(x => {
                    return (
                        <>
                            <div className="row">
                                <div className="col-8 offset-2">
                                    <h4>{x.text}</h4>
                                    <p className="text-muted ml-4">- {x.user.name}</p>
                                    <p>Rating: {x.rating}</p>
                                    <button type="submit" class="btn btn-success btn-sm" onClick={e => likeHandler(x.id)}>Like</button>
                                </div>
                            </div>
                            <hr></hr>
                        </>
                    );
                })
            }
        </>
    )
}