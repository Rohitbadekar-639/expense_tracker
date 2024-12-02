import React, { useState } from 'react';
import ExpenseChart from './ExpenseChart';
import TrendChart from './TrendChart';
import SummaryCard from './SummaryCard';
import FilterPanel from './FilterPanel';
import ThemeToggle from './ThemeToggle';
import '../styles/dashboard.css';

const Dashboard = ({ darkMode, toggleDarkMode }) => {
  const [setFilters] = useState({ dateRange: null, category: null });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const dummyData = {
    categories: ['Food', 'Travel', 'Shopping', 'Health', 'Misc'],
    amounts: [5000, 8000, 3000, 2000, 1000],
    trends: { months: ['Jan', 'Feb', 'Mar', 'Apr'], amounts: [4000, 7000, 6000, 8000] },
  };

  return (
    <div className="dashboard-container">
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <SummaryCard
        categories={dummyData.categories}
        amounts={dummyData.amounts}
      />
      <FilterPanel onFilterChange={handleFilterChange} />
      <div className="charts-container">
        <ExpenseChart
          categoryNames={dummyData.categories}
          categoryAmounts={dummyData.amounts}
        />
        <TrendChart trendData={dummyData.trends} />
      </div>
    </div>
  );
};

export default Dashboard;
