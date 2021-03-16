import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { createContext, useState } from 'react';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';

export const userContext = createContext()
function App() {
  const mark = Math.floor(Math.random() * 31) + 30;
  const [familiar, setFamiliar] = useState(mark);

  const [ loggedInUser, setLoggedInUser ] = useState({})
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>Email: {loggedInUser.email}</h3>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivetRoute path="/shipment">
            <Shipment></Shipment>
          </PrivetRoute>
          <PrivetRoute path='/inventory'>
            <h3 style={{textAlign: 'center'}}>Assignment Average = {mark}</h3>
            <button style={{ textAlign: 'center', marginLeft: '46%'}} onClick={() => setFamiliar(!familiar)}>Toggle Average</button>
            <Inventory mark={mark}></Inventory>
          </PrivetRoute>
          <Route exact path="/">
              <Shop></Shop>
          </Route>
          <Route path="/product/:ProductKey">
              <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
              <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
     
     
    </userContext.Provider>
  );
}

export default App;
