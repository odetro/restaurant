import React, { useState } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { RestaurantsList } from './restaurantsList/RestaurantsList';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RestaurantPage } from './restaurantPage/RestaurantPage';
import { RestaurantEditPage } from './restaurantEditPage/RestaurantEditPage';
import { AppContext } from './AppContext';
import './App.css';

function App() {

  const [ admin, setAdmin ] = useState("false");
  const [restaurant, setRestaurant] = useState({});

  const appContextValues = {
    admin,
    setAdmin,
    restaurant,
    setRestaurant
  }

  const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress && 
        <div className="loading-status">
            <Loader type="ThreeDots" color="rgb(113, 113, 113)" height={80} width={80} />
        </div>
    );  
  }

  return (
    <AppContext.Provider value={appContextValues}>
      <BrowserRouter>
        <div className="top-bar">
          <div className={ admin==="true" ? "is-admin" : "hidden"} >
            <span>Admin mode</span>
          </div>
        </div>
        <Switch>
          <Route path={`/edit/:rest`} >
              <RestaurantEditPage />
          </Route>
          <Route path={`/:rest`} >
              <RestaurantPage />
          </Route>
          <Route path={`/`} >
              <RestaurantsList />
          </Route>
        </Switch>
        <LoadingIndicator />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
