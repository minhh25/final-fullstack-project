import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const decCartQty = () => setQty((q) => Math.max(1,q-1));
  const incCartQty = () => setQty((q) => q+1);
  const hasDiscount = product.discountPrice !== null;
  const navigate = useNavigate();
  const {department, category} = useParams();

  const toDetail = () => {
    const id = product.id || product._id;
    navigate(`/${department}/${category}/${id}`);
  }
  
  return (
    <div className="border p-4 flex flex-col justify-between">
      {product.tags.includes("most-popular") && (
        <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full self-start mb-2">
          Most Popular
        </span>
      )}

      {product.tags.includes("best-deal") && (
        <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full self-start mb-2">
          Best Deal
        </span>
      )}

      <img
        onClick={toDetail}
        src={product.image}
        alt={product.name}
        className="h-40 object-contain hover:cursor-pointer mx-auto"
      />

      <p className="mt-4 text-sm hover:cursor-pointer hover:text-red-600" onClick={toDetail}>{product.name}</p>

      <div className="mt-2 flex items-baseline gap-2">
        {hasDiscount ? (
          <>
          <span className="line-through text-gray-400">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-red-600 font-semibold">
            ${product.discountPrice.toFixed(2)}
          </span>
          </>
        ) : (
          <span className="text-red-600 font-semibold">
            ${product.price.toFixed(2)}
          </span>
        )
      }
      </div>

      <div className="mt-4 border h-12 flex items-center justify-between px-4">
        <button
          className="text-2xl text-gray-400 hover:text-black"
          onClick={decCartQty}
          aria-label="decrease"
        >
          –
        </button>

        <span className="text-lg">{qty}</span>

        <button
          className="text-2xl text-gray-700 hover:text-black"
          onClick={incCartQty}
          aria-label="increase"
        >
          +
        </button>
      </div>

      <button
       className="mt-4 bg-black text-white py-2 rounded-full"
       onClick={() => addToCart(product,qty)}
       >
        Add to Cart
      </button>
    </div>
  );
}
