import React from "react";
import { Routes, Route } from "react-router-dom";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Landing from "./pages/Landing/Landing";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Auth from "./pages/Auth/Auth";
import {CheckoutProvider, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe('pk_test_51RVSWsQBh7Nx5mykGXyss3rHokppa8Pv860HvFuc2S8a6YKw7kiQKI10Th5PAc8R3ji1ETWiOLJ3CAwsyd0XDQ4l006a7d5o5o')
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/payments" element={
        <ProtectedRoute msg={'you must log in to pay'} redirect={'/payments'}>
        <Elements stripe={stripePromise}>          
          <Payment />
        </Elements>
        </ProtectedRoute>
        } />
      <Route path="/orders" element={
        <ProtectedRoute msg={'you must log in to access your orders'} redirect={'/orders'}>
          <Orders /> 
        </ProtectedRoute>
        }/>
      <Route path="/category/:categoryName" element={<Results />} />
      <Route path="/products/:productId" element={<ProductDetail />} />

      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRouter;