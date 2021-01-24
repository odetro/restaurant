import React, { useState, useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { RestaurantsListItem } from './restaurantsListItem/RestaurantsListItem';
import './restaurantsList.scss'

async function getRests() {
    const result = await fetch(`/api/rests`);
    return result.json();
}

export function RestaurantsList() {

    const [ restRaw, setRestRaw] = useState([]);

    useEffect(() => {
        const get = async () => {
            const result = await trackPromise(getRests());
            setRestRaw(result);
            }
        get();
    },[]);

    function isMenu () {
        if (restRaw) {
            return restRaw.map(rest => 
                <RestaurantsListItem
                    key = { rest._id }
                    id = { rest._id }
                    name = { rest.name }
                    telephone={ rest.telephone } 
                    address={ rest.address }
                    menu={ rest.menu }
                    image = { rest.image }
                />
            )
        }
    }
    
    return (
        <div className="restaurants-container">
            {isMenu()}
        </div>
    )
}