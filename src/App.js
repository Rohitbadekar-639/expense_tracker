import React, { useState, useMemo } from 'react';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend } from 'recharts';

const expenseCategories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Rent', 'Utilities', 'Other'];
const incomeCategories = ['Salary', 'Freelancing', 'Investments', 'Business', 'Other'];

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);

  const handleAddTransaction = () => {
    if (!amount || !category || !type) {
      setAlertMessage('Please select amount, category, and type.');
      return;
    }

    const newTransaction = {
      _id: new Date().getTime(),
      amount,
      category,
      type,
      date: new Date().toLocaleDateString(),
    };

    setTransactions([...transactions, newTransaction]);
    resetForm();
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setAmount(transaction.amount);
    setCategory(transaction.category);
    setType(transaction.type);
  };

  const handleUpdateTransaction = () => {
    if (!amount || !category || !type) {
      setAlertMessage('Please select amount, category, and type.');
      return;
    }

    const updatedTransactions = transactions.map((txn) =>
      txn._id === editingTransaction._id
        ? { ...txn, amount, category, type }
        : txn
    );

    setTransactions(updatedTransactions);
    resetForm();
  };

  const resetForm = () => {
    setEditingTransaction(null);
    setAmount('');
    setCategory('');
    setType('expense');
    setAlertMessage('');
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction._id !== id));
  };

  const totalIncome = useMemo(() => transactions.filter(transaction => transaction.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0), [transactions]);
  const totalExpense = useMemo(() => transactions.filter(transaction => transaction.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0), [transactions]);
  const balance = totalIncome - totalExpense;

  const chartData = useMemo(() => {
    const data = [];
    const monthMap = {};
    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
      if (!monthMap[month]) {
        monthMap[month] = { income: 0, expense: 0 };
      }
      if (transaction.type === 'income') {
        monthMap[month].income += Number(transaction.amount);
      } else {
        monthMap[month].expense += Number(transaction.amount);
      }
    });

    for (const [month, { income, expense }] of Object.entries(monthMap)) {
      data.push({ month, income, expense });
    }

    return data;
  }, [transactions]);

  const pieData = useMemo(() => {
    const incomeData = incomeCategories.map((category) => {
      return {
        name: category,
        value: transactions.filter((t) => t.type === 'income' && t.category === category).reduce((acc, curr) => acc + Number(curr.amount), 0),
      };
    });

    const expenseData = expenseCategories.map((category) => {
      return {
        name: category,
        value: transactions.filter((t) => t.type === 'expense' && t.category === category).reduce((acc, curr) => acc + Number(curr.amount), 0),
      };
    });

    return [...incomeData, ...expenseData];
  }, [transactions]);

  // Pie Chart Colors
  const COLORS = ['#28a745', '#f44336', '#ff9800', '#9c27b0', '#2196f3', '#c2185b', '#3f51b5', '#ff5722'];

  return (
    <div className="app-container">
      <h1>Expense & Income Tracker</h1>

      {/* Alert Message */}
      {alertMessage && <div className="alert">{alertMessage}</div>}

      {/* Form for Adding/Editing Transaction */}
      <div className="transaction-form">
        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Amount"
            className="input-field"
          />
        </div>
        <div className="input-group">
          <select value={category} onChange={handleCategoryChange} className="input-field">
            <option value="">Select Category</option>
            {(type === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <select value={type} onChange={handleTypeChange} className="input-field">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        {editingTransaction ? (
          <>
            <button onClick={handleUpdateTransaction} className="btn edit-btn">
              Update Transaction
            </button>
            <button onClick={resetForm} className="btn cancel-btn">
              Cancel Edit
            </button>
          </>
        ) : (
          <button onClick={handleAddTransaction} className="btn add-btn" disabled={!amount || !category || !type}>
            Add Transaction
          </button>
        )}
      </div>

      {/* Balance Section */}
      <div className="balance-container">
        <h2>Balance</h2>
        <p>Total Income: ₹{totalIncome}</p>
        <p>Total Expense: ₹{totalExpense}</p>
        <p className="balance-amount">Balance: ₹{balance}</p>
      </div>

      {/* Transaction Lists */}
      <div className="transactions-container">
        <div className="transactions">
          <h3>Expenses</h3>
          <ul>
            {transactions.filter((transaction) => transaction.type === 'expense').map((transaction) => (
              <li key={transaction._id} className="expense">
                - ₹{transaction.amount} - {transaction.category} ({transaction.date})
                <button onClick={() => handleEditTransaction(transaction)} className="btn edit-btn">Edit</button>
                <button onClick={() => handleDeleteTransaction(transaction._id)} className="btn delete-btn">Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="transactions">
          <h3>Incomes</h3>
          <ul>
            {transactions.filter((transaction) => transaction.type === 'income').map((transaction) => (
              <li key={transaction._id} className="income">
                + ₹{transaction.amount} - {transaction.category} ({transaction.date})
                <button onClick={() => handleEditTransaction(transaction)} className="btn edit-btn">Edit</button>
                <button onClick={() => handleDeleteTransaction(transaction._id)} className="btn delete-btn">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-container">
        <h3>Transaction Overview (Monthly)</h3>
        <div className="charts">
          <div className="chart">
            <h4>Income vs Expense</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#28a745" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="expense" stroke="#f44336" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart">
            <h4>Income vs Expense Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <PieTooltip />
                <PieLegend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
