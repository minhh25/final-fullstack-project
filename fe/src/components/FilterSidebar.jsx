export default function FilterSidebar({
  selectedTags,
  maxPrice,
  onChange,
}) {
  const categories = [
    { label: "Fresh Finds", value: "fresh-finds" },
    { label: "Most Popular", value: "most-popular" },
    { label: "Best Deal", value: "best-deal" },
  ];

  const toggleTag = (tag) => {
    const nextTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    onChange(nextTags, maxPrice);
  };

  const handlePriceChange = (value) => {
    onChange(selectedTags, value);
  };

  return (
    <aside className="w-64 pr-8">
      <h2 className="text-lg mb-6">Filter by</h2>

      {/* CATEGORY */}
      <div className="mb-8">
        <h3 className="font-medium mb-4">Category</h3>

        {categories.map((c) => (
          <label
            key={c.value}
            className="flex items-center gap-2 text-sm mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedTags.includes(c.value)}
              onChange={() => toggleTag(c.value)}
            />
            {c.label}
          </label>
        ))}
      </div>

      {/* PRICE */}
      <div>
        <h3 className="font-medium mb-4">Price</h3>
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={maxPrice}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full"
        />
        <p className="mt-2 text-sm text-gray-600">
          Up to ${maxPrice.toFixed(2)}
        </p>
      </div>
    </aside>
  );
}
