import React, { useState, useEffect, useContext} from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useParams } from 'react-router-dom';
import { MenuItem } from './menuItem/MenuItem';
import queryString from 'query-string';
import { AppContext } from '../AppContext';
import { NavLink } from 'react-router-dom';
import './restaurantPage.scss';

async function getRestMenu(restName) {
    let restId = restName.split("-").pop();
    const result = await fetch(`/api/rests/${restId}`);
    return result.json();
}

export function RestaurantPage () {

    const paramsURL = useParams();
    const context = useContext(AppContext);

    const [ restName, setRestName ] = useState(paramsURL.rest);

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

    useEffect(() => {
        const values = queryString.parse(window.location.search);
        if (values.isAdmin) {
            context.setAdmin(values.isAdmin);
        }
    } , [context])

    function editBtn() {
        if (context.admin === 'true') {
            return <NavLink to={`/edit/${paramsURL.rest}`} className="editBtn"><span>Edit</span></NavLink>
        }
    }

    if (context.restaurant.menu && context.restaurant.menu.items.length > 0) {
        return (
            <div className="restaurant-page-container">
                <div className="image-container" style={{
                    backgroundImage: `url(${context.restaurant.image})`
                    }}>
                </div>
                <div className="restaurant-page-details-container">
                    <div className="restaurant-page-details">
                        <h1>{context.restaurant.name}</h1>
                        <h3>{context.restaurant.menu.name}</h3>
                        <div className="menu">
                            { context.restaurant.menu.items.map( (item, index) => <MenuItem
                                    key = { index }
                                    name = { item.name }
                                    price = { item.price } 
                            /> )}
                        </div>
                        {editBtn()}
                    </div>
                </div>
            </div>
        )
    }
    else return <p>Loading...</p>
}