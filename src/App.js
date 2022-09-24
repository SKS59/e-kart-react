import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import {Provider} from 'react-redux';
import Store from "./store/Store";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Profile from "./components/Profile";
import ConfirmOrder from "./components/ConfirmOrder";
import Orders from "./components/Orders";

import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import Wishlist from "./components/Wishlist";
import SearchProduct from "./components/SearchProduct";
// import Checkout from "./components/Checkout";
function App() {
  let persistor=persistStore(Store)
  return (
    <>
      <Provider store={Store}>
      <BrowserRouter>
      <PersistGate persistor={persistor}>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/> }/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/confirm-order' element={<ConfirmOrder/>}/>
          <Route path='/search-product' element={<SearchProduct/>}/>
        </Routes>
        <ToastContainer/>
        </PersistGate>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
