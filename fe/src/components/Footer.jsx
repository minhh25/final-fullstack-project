// src/components/Footer.jsx
import React from "react";



const SocialIcon = ({ children, href = "#" }) => (
  <a href={href} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-transparent hover:bg-white/10 transition">
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-[#e11414] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1 - Logo + Contact */}
          <div>
            <div className="text-3xl font-extrabold mb-6">Clovers.</div>

            <div className="font-semibold text-lg mb-2">Need Help?</div>
            <p className="text-sm text-white/90 mb-4">
              Visit our <a className="underline" href="#">Customer Support</a> for assistance or call us at
            </p>
            <div className="text-xl font-bold tracking-wide mb-6">123-456-7890</div>

            <div className="flex gap-3 mt-2">
              <SocialIcon>
                {/* Facebook */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.92v-7.03H8.08v-2.89h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62.  . 1. ???" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SocialIcon>

              <SocialIcon>
                {/* Instagram */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.2"/>
                  <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.2"/>
                  <circle cx="18.3" cy="5.7" r="0.6" fill="white"/>
                </svg>
              </SocialIcon>

              <SocialIcon>
                {/* Twitter */}
                <svg width="16" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M23 4.999c-.8.35-1.66.59-2.56.7a4.48 4.48 0 001.97-2.48 9.07 9.07 0 01-2.86 1.1 4.51 4.51 0 00-7.69 4.11A12.82 12.82 0 013 4.79a4.5 4.5 0 001.4 6.01c-.66-.02-1.28-.2-1.82-.5v.05c0 2.2 1.57 4.04 3.65 4.46-.38.1-.78.14-1.2.14-.29 0-.57-.03-.84-.08a4.52 4.52 0 004.21 3.13A9.05 9.05 0 012 19.54 12.8 12.8 0 008.29 21c7.55 0 11.68-6.25 11.68-11.66v-.53A8.18 8.18 0 0023 4.999z" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SocialIcon>

              <SocialIcon>
                {/* YouTube */}
                <svg width="18" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M22.54 6.42a2.8 2.8 0 00-1.97-1.98C18.88 4 12 4 12 4s-6.88 0-8.57.44a2.8 2.8 0 00-1.97 1.98C1.72 8.15 1.72 12 1.72 12s0 3.85.74 5.58a2.8 2.8 0 001.97 1.98C5.12 20 12 20 12 20s6.88 0 8.57-.44a2.8 2.8 0 001.97-1.98c.74-1.73.74-5.58.74-5.58s0-3.85-.74-5.58z" stroke="white" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 15l5-3-5-3v6z" fill="white"/>
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Column 2 - Menu */}
          <div>
            <div className="font-semibold text-lg mb-6">Menu</div>
            <ul className="space-y-3 text-sm text-white/90">
              <li>Deals</li>
              <li>Food</li>
              <li>Beverages</li>
              <li>Household</li>
              <li>Personal Care</li>
              <li>My Orders</li>
            </ul>
          </div>

          {/* Column 3 - Categories */}
          <div>
            <div className="font-semibold text-lg mb-6">Categories</div>
            <ul className="space-y-3 text-sm text-white/90">
              <li>Vegetables</li>
              <li>Bakery</li>
              <li>Wine</li>
              <li>Dairy & Eggs</li>
              <li>Meat & Poultry</li>
              <li>Soft Drinks</li>
              <li>Cleaning Supplies</li>
              <li>Cereal & Snacks</li>
            </ul>
          </div>

          {/* Column 4 - Info */}
          <div>
            <div className="font-semibold text-lg mb-6">Info</div>
            <ul className="space-y-3 text-sm text-white/90">
              <li>FAQ</li>
              <li>About Us</li>
              <li>Customer Support</li>
              <li>Locations</li>
            </ul>
          </div>

          {/* Column 5 - My Choice */}
          <div>
            <div className="font-semibold text-lg mb-6">My Choice</div>
            <ul className="space-y-3 text-sm text-white/90">
              <li>Favorites</li>
              <li>My Orders</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
