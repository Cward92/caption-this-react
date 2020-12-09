import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory, Link, useParams } from 'react-router-dom';
import AxiosHelper from '../Components/Helper/AxiosHelper';
import AppContext from '../Components/Helper/AppContext';

export default function Image() {

    const { userData } = useContext(AppContext);

    let { id } = useParams();

    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');

    const imageHelper = (res) => {
        return setImage(res.data);
    }

    useEffect(() => {
        AxiosHelper({ method: 'get', route: `/images/${id}`, fun: imageHelper });
    }, []);

    const clickHandler = () => {
        let data = {
            user_id: userData.id,
            image_id: id,
            caption: caption,
        }
        AxiosHelper({ method: 'post', route: `/images/store`, data });
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div class="text-center">
                        <img src={image.src} class="rounded" alt="..." />
                    </div>
                </div>
            </div>
            <form>
                <div class="form-row text-center">
                    <div class="col-6 offset-3">
                        <input type="text" class="form-control" onChange={e => setCaption(e.target.value)} value={caption} placeholder="Your Caption Here!" />
                        <button type="submit" class="btn btn-primary" onClick={clickHandler}>Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}