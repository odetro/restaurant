import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';
import './menuEditItem.scss';

export function MenuEditItem (props) {

    const context = useContext(AppContext);
    const index = context.restaurant.menu.items.findIndex( item => item.name === props.name);

    let name = "";
    let price = 0;

    const handleNameChange = (e) => {        
        name = e.target.value;
    };

    const handlePriceChange = (e) => {        
        price = e.target.value;
    };

    const capture = (e) => {
        let tempRestaurant = context.restaurant;
        if (name.length > 0) {
            tempRestaurant.menu.items[index].name = name;
        }
        if (parseFloat(price) > 0) {
            tempRestaurant.menu.items[index].price = parseFloat(price);
        }
        context.setRestaurant(tempRestaurant);
    }

    return (
            <div className="menu-item-container">
                <div className="item-input">
                    <input type="text" onChange={handleNameChange} onBlur={capture} defaultValue={props.name}  />
                </div>
                <div className="item-input">
                    <input type="number" onChange={handlePriceChange} onBlur={capture} defaultValue={props.price.toFixed(2)} />
                </div>
            </div>
        )
}