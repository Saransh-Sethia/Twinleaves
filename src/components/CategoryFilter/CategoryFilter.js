import React from "react";
import "./CategoryFilter.css";

const CategoryFilter = ({
  categories,
  selectedCategory,
  handleCategoryChange,
  setSelectedCategory,
}) => {
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    <div className="category-filter">
      <h2>
        <label htmlFor="category-select" className="category-label">
          Category
        </label>
      </h2>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={handleChange}
        className="category-select"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
