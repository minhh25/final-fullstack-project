export default function ProductCard({ image, name, price, oldPrice, tag }) {
  return (
    <div className="border p-4 flex flex-col">
      {tag && (
        <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full self-start mb-2">
          {tag}
        </span>
      )}

      <img src={image} alt={name} className="h-40 object-contain mx-auto" />

      <div className="mt-4 text-sm">{name}</div>

      <div className="mt-2">
        {oldPrice && (
          <span className="line-through text-gray-400 mr-2">
            ${oldPrice}
          </span>
        )}
        <span className="text-red-600 font-semibold">${price}</span>
      </div>

      <div className="flex items-center border mt-4">
        <button className="px-3">−</button>
        <span className="flex-1 text-center">1</span>
        <button className="px-3">+</button>
      </div>

      <button className="mt-4 bg-black text-white py-2 rounded-full">
        Add to Cart
      </button>
    </div>
  );
}
