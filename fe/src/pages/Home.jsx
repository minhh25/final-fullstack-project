import { useState } from 'react'
import '../Home.css'
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Feature from '../components/Feature.jsx';
import {
  Truck,
  Storefront,
  Headset,
  DeviceMobile
} from "phosphor-react";

function Home() {

  return (
    <>
      <Header />

      <section
  className="bg-center bg-cover bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://static.wixstatic.com/media/c837a6_a02137ecf3104b38aba5c61bbdf6356f~mv2.jpg/v1/fill/w_1183,h_580,q_90,enc_avif,quality_auto/c837a6_a02137ecf3104b38aba5c61bbdf6356f~mv2.jpg')",
  }}
>
  <div >
    <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20 grid lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-6">
        <div className="max-w-xl">
          <p className="text-lg text-gray-700">Easy, Fresh & Convenient</p>
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mt-4 text-black">
            Stock Up on<br />Daily Essentials
          </h1>
          <p className="text-xl text-gray-800 mt-6">
            Save Big on Your<br />Favorite Brands
          </p>
          <button className="mt-8 bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  </div>
</section>


      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <Feature title="Free Delivery" subtitle="To Your Door">
            <Truck size={40} weight="light" />
          </Feature>

          <Feature title="Local Pickup" subtitle="Check Out Locations">
            <Storefront size={40} weight="light" />
          </Feature>

          <Feature title="Available for You" subtitle="Online Support 24/7">
            <Headset size={40} weight="light" />
          </Feature>

          <Feature title="Order on the Go" subtitle="Download Our App">
            <DeviceMobile size={40} weight="light" />
          </Feature>

        </div>
      </section>
      <Footer />

    </>
  )
}

export default Home