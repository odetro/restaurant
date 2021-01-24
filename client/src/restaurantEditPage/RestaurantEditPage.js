import React, { useState, useEffect, useContext } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { MenuEditItem } from './menuEditItem/MenuEditItem';
import 'react-toastify/dist/ReactToastify.css';
import './restaurantEditPage.scss';

async function getRestMenu(restName) {
    const result = await fetch(`/api/rests/${restName}`);
    return result.json();
}

async function updateRestMenu(restDetail, id) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restDetail)
    };
    const result = await fetch(`/api/rests/${id}`, requestOptions);
    return result.json();    
}

export function RestaurantEditPage () {

    const context = useContext(AppContext);
    const paramsURL = useParams();

    const [ restName, setRestName ] = useState(paramsURL.rest);
    let menuName = "";
        
    useEffect(() => {
        if (paramsURL && paramsURL.rest) {
            setRestName(paramsURL.rest);
        }
    } , [paramsURL])
    
    useEffect(() => {
        const get = async () => {
            const results = await trackPromise(getRestMenu(restName));
            if (results) {
                context.setRestaurant(results[0]);
            }
        }
        get();
    },[restName]);

    const handleChange = (e) => {        
        menuName = e.target.value;
    };

    const capture = (e) => {
        let tempRestaurant = context.restaurant;
        if (menuName.length > 0) {
            tempRestaurant.menu.name = menuName;
            context.setRestaurant(tempRestaurant);
        }
    }

    async function upadteMenu () {
        await trackPromise(updateRestMenu(context.restaurant, context.restaurant._id));
        toast.error("🎉 menu's been updated", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    if (context.admin === 'true') {
        if (context.restaurant.menu && context.restaurant.menu.items.length > 0) {
            return (
                <div className="restaurant-page-container">
                    <div className="image-container" style={{
                        backgroundImage: `url(${context.restaurant.image})`
                    }} />
                    <div className="restaurant-page-details-container">
                        <div className="restaurant-page-details">
                            <h1>Edit {context.restaurant.name}</h1>
                            <h3><input type="text" onChange={handleChange} onBlur={capture} defaultValue={context.restaurant.menu.name} /></h3>
                            <div className="menu">
                                <div>
                                    { context.restaurant.menu.items.map( (item, index) => <MenuEditItem
                                        key = {index}
                                        name = { item.name }
                                        price = { item.price } 
                                    /> )}
                                </div>
                            </div>
                            <button className="submitBtn" onClick={upadteMenu}>Submit</button>
                            <ToastContainer
                                position="top-right"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                />
                        </div>
                    </div>
                </div>
            )
        }
        else return <p>Loading...</p>
    }
    else return <h3>Only admins can edit menus</h3>
}