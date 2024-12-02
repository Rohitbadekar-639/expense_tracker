import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const TrendChart = ({ trendData }) => {
  const { months, amounts } = trendData;

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: amounts,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default TrendChart;
