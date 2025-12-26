export default function ProductCard({ product }) {
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
        src={product.image}
        alt={product.name}
        className="h-40 object-contain mx-auto"
      />

      <p className="mt-4 text-sm">{product.name}</p>

      <div className="mt-2">
        {product.oldPrice && (
          <span className="line-through text-gray-400 mr-2">
            ${product.oldPrice}
          </span>
        )}
        <span className="text-red-600 font-semibold">
          ${product.price}
        </span>
      </div>

      <button className="mt-4 bg-black text-white py-2 rounded-full">
        Add to Cart
      </button>
    </div>
  );
}
