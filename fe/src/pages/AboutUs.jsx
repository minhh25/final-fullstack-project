import { Truck, Leaf, HandHeart } from "lucide-react";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function AboutUs() {
  return (
    <>
    <Header />
    <main className="w-full">
      {/* Hero / About Us section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="w-full h-full">
            <img
              src="https://static.wixstatic.com/media/c837a6_a223ba44b110498aae61e3e6195fb387~mv2.jpg/v1/fill/w_766,h_606,al_r,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_a223ba44b110498aae61e3e6195fb387~mv2.jpg"
              alt="Our story"
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          {/* Text */}
          <div className="border border-gray-300 p-8 h-full">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              I'm a paragraph. Click here to add your own text and edit me. It's
              easy. Just click “Edit Text” or double click me to add your own
              content and make changes to the font. Feel free to drag and drop
              me anywhere you like on your page.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This is a great space to write a long text about your company and
              your services. You can use this space to go into a little more
              detail about your company, your team, and what makes you
              different from your competitors.
            </p>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-300 p-8 text-center">
            <Truck className="mx-auto mb-4 text-red-600" size={36} />
            <h3 className="font-semibold text-lg mb-3">
              Delivering Freshness Every Day at a Time
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              I'm a paragraph. Click here to add your own text and edit me. It's
              easy. Just click “Edit Text” or double click to add content.
            </p>
          </div>

          <div className="border border-gray-300 p-8 text-center">
            <Leaf className="mx-auto mb-4 text-red-600" size={36} />
            <h3 className="font-semibold text-lg mb-3">
              We Take Sustainability Seriously
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              This is a great space to write a long text about your company and
              your services. You can use this space to go into more detail.
            </p>
          </div>

          <div className="border border-gray-300 p-8 text-center">
            <HandHeart className="mx-auto mb-4 text-red-600" size={36} />
            <h3 className="font-semibold text-lg mb-3">
              Supporting Local Products
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              I'm a paragraph. Click here to add your own text and edit me. It's
              easy. Just click “Edit Text” or double click to add content.
            </p>
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="bg-[#fff1d6] py-16">
<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
{/* Left products image */}
<div className="flex justify-center">
<img
src="https://static.wixstatic.com/media/c837a6_c6d9a1d20e71405b898602ee778d603f~mv2.jpg/v1/fill/w_1534,h_395,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_c6d9a1d20e71405b898602ee778d603f~mv2.jpg"
alt="Left products"
className="max-w-full"
/>
</div>


{/* Center text */}
<div className="text-center">
<h2 className="text-4xl font-bold mb-4">Save every day!</h2>
<p className="text-gray-700 mb-6">
Help lower the cost of your shopping cart with our daily specials
</p>
<button className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition">
Shop Deals
</button>
</div>


{/* Right products image */}
<div className="flex justify-center">
<img
src="https://static.wixstatic.com/media/c837a6_c6d9a1d20e71405b898602ee778d603f~mv2.jpg/v1/fill/w_1534,h_395,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_c6d9a1d20e71405b898602ee778d603f~mv2.jpg"
alt="Right products"
className="max-w-full"
/>
</div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
