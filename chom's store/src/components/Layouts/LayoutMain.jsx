import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Pages/Accounts/Login';
import Register from '../Pages/Accounts/Register';
import Carts from '../Pages/Carts/Carts';
import Checkout from '../Pages/Checkout/Checkout';
import Home from '../Pages/Home/Home';
import ProductsCommon from '../Pages/ProductsCommon/ProductsCommon';
import ProductsDetail from '../Pages/ProductsDetail/ProductsDetail';
import RedirectLogin from './RedirectLogin';
import DefaultLayout from './DefaultLayout';
import CheckoutLayout from './CheckoutLayout';


export default function LayoutMain() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DefaultLayout>
            <Home />
          </DefaultLayout>
        }
      />
      <Route
        path="/products"
        element={
          <DefaultLayout>
            <ProductsCommon />
          </DefaultLayout>
        }
      />
      <Route
        path="/products/:id"
        element={
          <DefaultLayout>
            <ProductsDetail />
          </DefaultLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <DefaultLayout>
            <Carts />
          </DefaultLayout>
        }
      />
      <Route
        path="/account/login"
        element={
          <DefaultLayout>
            <RedirectLogin>
              <Login />
            </RedirectLogin>
          </DefaultLayout>
        }
      />
      <Route
        path="/account/register"
        element={
          <DefaultLayout>
            <Register />
          </DefaultLayout>
        }
      />

      <Route
        path="/checkout"
        element={
          <CheckoutLayout>
            <Checkout />
          </CheckoutLayout>
        }
      />
    </Routes>
  );
}
