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
import { useState } from 'react';
function App() {
  const mark = Math.floor(Math.random() * 31) + 30;
  const [familiar, setFamiliar] = useState(mark);
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path='/inventory'>
            <h3 style={{textAlign: 'center'}}>Assignment Average = {mark}</h3>
            <button style={{ textAlign: 'center', marginLeft: '46%'}} onClick={() => setFamiliar(!familiar)}>Toggle Average</button>
            <Inventory mark={mark}></Inventory>
          </Route>
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
     
     
    </div>
  );
}

export default App;
