// CustomerSupport.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const CustomerSupport = () => {
  return (
    <><Header />
        <main className="w-full bg-white">
      {/* Title */}
      <section className="w-full text-center py-16 px-4">
        <h1 className="text-5xl font-bold mb-4">Customer Support</h1>
        <p className="max-w-2xl mx-auto text-gray-600">
          Support for groceries, beverages, household essentials, and personal
          care products. Orders, returns, and product questions handled here.
        </p>
      </section>

      {/* Main layout */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 px-4 pb-24">
        {/* Left image */}
        <div className="w-full h-full">
          <img
            src="https://static.wixstatic.com/media/c837a6_20a90c3de2774dbebbad3ac2cd6a73e9~mv2.jpg/v1/fill/w_766,h_983,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_20a90c3de2774dbebbad3ac2cd6a73e9~mv2.jpg"
            alt="Shopping products"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right big box (FORM + CHAT INSIDE ONE BOX) */}
        <div className="border border-gray-300 flex flex-col">
          {/* Form area */}
          <div className="p-10">
            <h2 className="text-3xl font-bold mb-4">We’re Here to Help</h2>
            <p className="text-gray-600 mb-8">
              Ask us anything about products, availability, delivery, or your
              recent order.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full border border-gray-400 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full border border-gray-400 px-3 py-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input className="w-full border border-gray-400 px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Phone</label>
                  <input className="w-full border border-gray-400 px-3 py-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  rows="4"
                  className="w-full border border-gray-400 px-3 py-2"
                />
              </div>

              <button className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700">
                Submit
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300" />

          {/* Chat section INSIDE SAME BOX */}
          <div className="p-10">
            <h3 className="text-2xl font-bold mb-3">
              Chat with Our Support Team
            </h3>
            <p className="text-gray-600 mb-6">
              Get instant help with product recommendations, order tracking, and
              store policies.
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800">
              Message Us
            </button>
          </div>
        </div>
      </section>
    </main>
    <Footer /></>
  );
};

export default CustomerSupport;
