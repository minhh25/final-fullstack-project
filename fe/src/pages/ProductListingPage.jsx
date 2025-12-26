import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import PRODUCTS from "../../mock_data/data.js";
import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function ProductListingPage() {
  const { category } = useParams(); // vegetables, fruit, etc.
  const [searchParams, setSearchParams] = useSearchParams();

  // ===== READ FILTERS FROM URL =====
  const selectedTags = searchParams.get("tags")
    ? searchParams.get("tags").split(",")
    : [];

  const maxPrice = Number(searchParams.get("maxPrice")) || 10;

  // ===== FILTER LOGIC =====
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCategory = category
        ? p.tags.includes(category)
        : true;

      const matchTag =
        selectedTags.length === 0 ||
        selectedTags.some((t) => p.tags.includes(t));

      const matchPrice = p.price <= maxPrice;

      return matchCategory && matchTag && matchPrice;
    });
  }, [category, selectedTags, maxPrice]);

  // ===== UPDATE URL =====
  const updateFilters = (nextTags, nextPrice) => {
    const params = {};
    if (nextTags.length) params.tags = nextTags.join(",");
    if (nextPrice !== 10) params.maxPrice = nextPrice;
    setSearchParams(params);
  };

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-5xl font-bold text-center mb-12 capitalize">
          {category?.replace("-", " ") || "Products"}
        </h1>

        <div className="grid grid-cols-12 gap-10">
          <aside className="col-span-3">
            <FilterSidebar
              selectedTags={selectedTags}
              maxPrice={maxPrice}
              onChange={updateFilters}
            />
          </aside>

          <section className="col-span-9">
            <ProductGrid products={filteredProducts} />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
