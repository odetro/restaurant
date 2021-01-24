import React from 'react';
import './menuItem.scss'

export function MenuItem (props) {
    return (
        <div className="menu-item-container">
            <div>
                {props.name}
            </div>
            <div>
                {props.price.toFixed(2)} $
            </div>
        </div>
    )
}