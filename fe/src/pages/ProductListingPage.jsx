import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import { useMemo, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function ProductListingPage() {
  const { department, category } = useParams(); // vegetables, fruit, etc.
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]); //list product lấy về từ be
  
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [])
  

  // ===== READ FILTERS FROM URL =====
  const selectedTags = searchParams.get("tags")
    ? searchParams.get("tags").split(",")
    : [];

  const maxPrice = Number(searchParams.get("maxPrice")) || 100;

  // ===== FILTER LOGIC =====
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const pTags = product.tags || [];

      if(department == "deals"){
        return (
          pTags.includes("best-deal") && product.price <= maxPrice
        )
      }

      const matchDepartment = department === product.department;
      const matchCategory = category === product.category || !category;
      const matchTags = selectedTags.length
        ? selectedTags.some((tag) => pTags.includes(tag))
        : true;
      const matchPrice = product.price <= maxPrice;
      return matchDepartment && matchCategory && matchTags && matchPrice;
    });
  }, [products, category, selectedTags, maxPrice, department]);

  // ===== UPDATE URL =====
  const updateFilters = (nextTags, nextPrice) => {
    const params = {};
    if (nextTags.length) params.tags = nextTags.join(",");
    if (nextPrice !== 100) params.maxPrice = nextPrice;
    setSearchParams(params);
  };

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-5xl font-bold text-center mb-12 capitalize">
            {(category || department || "Products").replaceAll("-", " ")}
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
