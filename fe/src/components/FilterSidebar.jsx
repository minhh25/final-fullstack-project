export default function FilterSidebar() {
  return (
    <aside className="w-64 pr-8">
      <h2 className="text-lg mb-4">Filter by</h2>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Category</h3>
        {["Deals", "Food", "Fresh Finds", "Most Popular"].map((c) => (
          <label key={c} className="flex items-center gap-2 text-sm mb-2">
            <input type="checkbox" />
            {c}
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-medium mb-2">Price</h3>
        <input type="range" className="w-full" />
      </div>
    </aside>
  );
}
