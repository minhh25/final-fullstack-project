import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';
import ProductCard from '../components/ProductCard.jsx';
import {useMemo, useState} from "react";
export default function Food() {
    const PRODUCTS = [
  {
    id: 1,
    name: "Lancaster Farm Fresh Carrots - 1lb",
    price: 5.99,
    image: "https://static.wixstatic.com/media/c837a6_1993656162b14850b0786905ccf45723~mv2.jpg/v1/fill/w_238,h_357,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_1993656162b14850b0786905ccf45723~mv2.jpg",
    tags: ["food", "fresh-finds"],
  },
  {
    id: 2,
    name: "Red Greenhouse Bell Pepper - 1lb",
    price: 4.49,
    image: "https://static.wixstatic.com/media/c837a6_1993656162b14850b0786905ccf45723~mv2.jpg/v1/fill/w_238,h_357,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_1993656162b14850b0786905ccf45723~mv2.jpg",
    tags: ["food"],
  },
  {
    id: 3,
    name: "Beefsteak Tomatoes, Large - 1lb",
    price: 3.99,
    image: "https://static.wixstatic.com/media/c837a6_1993656162b14850b0786905ccf45723~mv2.jpg/v1/fill/w_238,h_357,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_1993656162b14850b0786905ccf45723~mv2.jpg",
    tags: ["most-popular"],
  },
  {
    id: 4,
    name: "Greenhouse Cucumber - 1lb",
    price: 0.99,
    image: "https://static.wixstatic.com/media/c837a6_1993656162b14850b0786905ccf45723~mv2.jpg/v1/fill/w_238,h_357,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_1993656162b14850b0786905ccf45723~mv2.jpg",
    tags: ["food"],
  },
  {
    id: 5,
    name: "Hass Avocados, Ready-to-Eat - 1lb",
    price: 2.69,
    oldPrice: 2.99,
    image: "https://static.wixstatic.com/media/c837a6_1993656162b14850b0786905ccf45723~mv2.jpg/v1/fill/w_238,h_357,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_1993656162b14850b0786905ccf45723~mv2.jpg",
    tags: ["best-deal"],
  },
];

 const [selectedTags, setSelectedTags] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10);

  /* ===== FILTER LOGIC ===== */
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchTag =
        selectedTags.length === 0 ||
        selectedTags.some((t) => p.tags.includes(t));
      const matchPrice = p.price <= maxPrice;
      return matchTag && matchPrice;
    });
  }, [selectedTags, maxPrice]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };
    return (
        <>
    <Header />
   
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* ===== TITLE (CENTERED EXACTLY) ===== */}
      <h1 className="text-5xl font-bold text-center mb-12">
        Vegetables
      </h1>

      <div className="grid grid-cols-12 gap-10">
        {/* ===== FILTER SIDEBAR ===== */}
        <aside className="col-span-3">
          <h2 className="text-xl font-medium mb-6">Filter by</h2>

          {/* CATEGORY */}
          <div className="mb-8">
            <h3 className="font-medium mb-4">Category</h3>
            {[
              { label: "Food", value: "food" },
              { label: "Fresh Finds", value: "fresh-finds" },
              { label: "Most Popular", value: "most-popular" },
              { label: "Best Deal", value: "best-deal" },
            ].map((c) => (
              <label
                key={c.value}
                className="flex items-center gap-3 mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(c.value)}
                  onChange={() => toggleTag(c.value)}
                />
                <span>{c.label}</span>
              </label>
            ))}
          </div>

          {/* PRICE */}
          <div>
            <h3 className="font-medium mb-4">Price</h3>
            <input
              type="range"
              min={0}
              max={10}
              step={0.5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <p className="mt-2 text-sm text-gray-600">
              Up to ${maxPrice.toFixed(2)}
            </p>
          </div>
        </aside>

        {/* ===== PRODUCTS GRID ===== */}
        <section className="col-span-9 grid grid-cols-3 gap-8">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="border p-4 flex flex-col justify-between"
            >
              {/* TAG */}
              {p.tags.includes("most-popular") && (
                <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full self-start mb-2">
                  Most Popular
                </span>
              )}
              {p.tags.includes("best-deal") && (
                <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full self-start mb-2">
                  Best Deal
                </span>
              )}

              {/* IMAGE */}
              <img
                src={p.image}
                alt={p.name}
                className="h-40 object-contain mx-auto"
              />

              {/* NAME */}
              <p className="mt-4 text-sm">{p.name}</p>

              {/* PRICE */}
              <div className="mt-2">
                {p.oldPrice && (
                  <span className="line-through text-gray-400 mr-2">
                    ${p.oldPrice}
                  </span>
                )}
                <span className="text-red-600 font-semibold">
                  ${p.price}
                </span>
              </div>

              {/* ACTION */}
              <button className="mt-4 bg-black text-white py-2 rounded-full">
                Add to Cart
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
}   
