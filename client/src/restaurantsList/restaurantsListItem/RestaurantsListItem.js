import React from 'react';
import { NavLink } from 'react-router-dom';
import './restaurantsListItem.scss'

export function RestaurantsListItem (props) {
    return (
        <div className="restaurant-item-container">
            <NavLink className="styled-navlink" to={`/${props.name}-${props.id}`} >
                <div className="image-container" style={{
                    backgroundImage: `url(${props.image})`
                    }}>
                </div>
                <div className="restaurant-details">
                    <h2 className="restaurant-name">{props.name}</h2>
                    <ul className="restaurant-item">
                        <li> { props.telephone } </li>
                        <li> { props.address } </li>
                    </ul>
                </div>
            </NavLink>
        </div>
    )
}