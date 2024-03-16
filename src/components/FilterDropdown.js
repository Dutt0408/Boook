// FilterDropdown.js
function FilterDropdown({ categoryFilter, onCategoryChange }) {
  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    console.log("Selected category:", selectedCategory); // Debugging
    onCategoryChange(selectedCategory);
  };

  return (
    <select
      value={categoryFilter}
      onChange={handleChange}
      className="border border-gray-300 p-2 rounded"
    >
      <option value="">All Categories</option>
      <option value="Painting">Painting</option>
      <option value="Sculpture">Sculpture</option>
      <option value="Print">Print</option>
    </select>
  );
}

export default FilterDropdown;
