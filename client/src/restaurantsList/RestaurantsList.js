import React, { useState, useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import queryString from 'query-string';
import { RestaurantsListItem } from './restaurantsListItem/RestaurantsListItem';
import './restaurantsList.scss'
import { GrNext, GrPrevious } from "react-icons/gr";

async function getRests(pageNum, pageLimit) {
    const result = await fetch(`/api/rests?page=${pageNum}&limit=${pageLimit}`);
    return result.json();
}

async function getRestCount() {
    const result = await fetch(`/api/rests/restCount`);
    return result.json();
}

export function RestaurantsList() {

    const [ restRaw, setRestRaw] = useState([]);
    const [ pageNum, setPageNum ] = useState("1");
    const [ restCount, setRestCount ] =  useState(0);
    let pageLimit = 3;

    useEffect(() => {
        const get = async () => {
            const result = await trackPromise(getRests(pageNum, pageLimit));
            setRestRaw(result);
            const count = await trackPromise(getRestCount());
            setRestCount(count);
            }
        get();
    },[pageNum, restCount]);

    useEffect(() => {
        const values = queryString.parse(window.location.search);
        if (values.page) {
            setPageNum(values.page);
        }
    } , [])

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

    function updateUrl(num) {
        let values = queryString.parse(window.location.search);
        values.page = num;
        window.location.search = queryString.stringify(values);
    }

    function nextPage() {
        if (restCount > ((pageNum * pageLimit))) {
            return (
                <button className="pageBtn" onClick={() => {
                    let num = (parseInt(pageNum, 10) + 1).toString();
                    setPageNum(num);
                    updateUrl(num);
                    }}>
                    <GrNext size={16} style={{ color: 'white' }}/>
                </button>
            )
         }
    }

    function previousPage() {
        if ( restCount < ((pageNum * pageLimit)+pageLimit)) {
            return (
                <button className="pageBtn" onClick={() => {
                    let num = (parseInt(pageNum, 10) - 1).toString();
                    setPageNum(num);
                    updateUrl(num);
                }}>
                    <span className="icon"><GrPrevious /></span>
                </button>
            )
         }
    }
    
    return (
        <div>
            <div className="restaurants-container">
                {isMenu()}
            </div>
            <div className="pages">
                {previousPage()}
                {nextPage()}
            </div>
        </div>
    )
}