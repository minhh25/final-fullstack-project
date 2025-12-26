import { useState } from 'react'
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import CustomerSupport from './pages/CustomerSupport.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductListingPage from './pages/ProductListingPage.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/food" element={<ProductListingPage />} />
          <Route path="/food/:category" element={<ProductListingPage />} />
          <Route path="/beverages" element={<ProductListingPage />} />
          <Route path="/beverages/:category" element={<ProductListingPage />} />

          <Route path="/household" element={<ProductListingPage />} />
          <Route path="/household/:category" element={<ProductListingPage />} />

          <Route path="/personal-care" element={<ProductListingPage />} />
          <Route path="/personal-care/:category" element={<ProductListingPage />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
