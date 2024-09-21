
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Pricing from './Pages/Pricing';
import Homepage from './Pages/Homepage';
import Product from './Pages/Product';
import PageNotFound from './Pages/PageNotFound';
import AppLayout from './Pages/AppLayout';
import Login from './Pages/Login';
import CityList from './Components/CityList';
import CountriesList from "./Components/CountriesList";
import City from './Components/City';
import Form from './Components/Form';

import { useState,useEffect } from 'react';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {

 
  return (
    <>
    <AuthProvider>
<CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={
            
            <ProtectedRoute>
                            <AppLayout />

              </ProtectedRoute>}>
            <Route index element={<Navigate replace to = "cities"/>} />
          

            <Route path='cities' element={<CityList/>} />
            <Route path='cities/:id' element={<City/>}/>
            <Route path='countries' element={<CountriesList/>} />
            <Route path="form" element={<Form/>} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      </CitiesProvider>
      </AuthProvider>
    </>
  )
}

export default App
