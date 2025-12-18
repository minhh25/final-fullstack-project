import { useState } from 'react'
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import CustomerSupport from './pages/CustomerSupport.jsx';
import Beverages from './pages/Beverages.jsx';
import Deals from './pages/Deals.jsx';
import Food from './pages/Food.jsx';
import Household from './pages/Household.jsx';
import PersonalCare from './pages/PersonalCare.jsx';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/beverages" element={<Beverages />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/food" element={<Food />} />
          <Route path="/household" element={<Household />} />
          <Route path="/personal-care" element={<PersonalCare />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
