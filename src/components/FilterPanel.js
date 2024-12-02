import React from 'react';
import '../styles/dashboard.css';

const FilterPanel = ({ onFilterChange }) => {
  const handleDateChange = (e) => {
    onFilterChange({ dateRange: e.target.value });
  };

  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  return (
    <div className="filter-panel">
      <label>
        Date Range:
        <input type="date" onChange={handleDateChange} />
      </label>
      <label>
        Category:
        <select onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>
    </div>
  );
};

export default FilterPanel;
