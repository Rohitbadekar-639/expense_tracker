import React from 'react';
import '../styles/dashboard.css';

const SummaryCard = ({ categories, amounts }) => {
  const totalExpenses = amounts.reduce((sum, value) => sum + value, 0);
  const highestCategory = categories[amounts.indexOf(Math.max(...amounts))];
  const lowestCategory = categories[amounts.indexOf(Math.min(...amounts))];

  return (
    <div className="summary-card">
      <h2>Total Expenses: ₹{totalExpenses}</h2>
      <p>Highest: {highestCategory} - ₹{Math.max(...amounts)}</p>
      <p>Lowest: {lowestCategory} - ₹{Math.min(...amounts)}</p>
    </div>
  );
};

export default SummaryCard;
