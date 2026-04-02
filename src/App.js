import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import TransactionHistory from './pages/TransactionHistory';
import Navbar from './components/Navbar';

// ✅ RANDOM DATE FUNCTION
const getRandomDate = () => {
  const start = new Date(2026, 0, 1); // Jan 1, 2026
  const end = new Date(); // today
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toISOString().split("T")[0];
};

// Initial mock data (UPDATED)
const initialTransactions = [
  { id: 1, title: 'Grocery Shopping', amount: 125.75, category: 'Food', type: 'expense', date: getRandomDate() },
  { id: 2, title: 'Freelance Work', amount: 1200.00, category: 'Salary', type: 'income', date: getRandomDate() },
  { id: 3, title: 'Electric Bill', amount: 78.90, category: 'Utilities', type: 'expense', date: getRandomDate() },
  { id: 4, title: 'New Laptop', amount: 899.99, category: 'Electronics', type: 'expense', date: getRandomDate() },
  { id: 5, title: 'Restaurant Dinner', amount: 65.50, category: 'Food', type: 'expense', date: getRandomDate() },
  { id: 6, title: 'Gym Membership', amount: 45.00, category: 'Health', type: 'expense', date: getRandomDate() },
  { id: 7, title: 'Uber Rides', amount: 32.75, category: 'Transport', type: 'expense', date: getRandomDate() },
  { id: 8, title: 'Salary', amount: 3200.00, category: 'Salary', type: 'income', date: getRandomDate() },
  { id: 9, title: 'Rent Payment', amount: 1200.00, category: 'Housing', type: 'expense', date: getRandomDate() },
  { id: 10, title: 'Internet Bill', amount: 64.99, category: 'Utilities', type: 'expense', date: getRandomDate() },
];

// Load transactions
const loadTransactions = () => {
  try {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  } catch (error) {
    console.error('Failed to load transactions:', error);
    return initialTransactions;
  }
};

function App() {
  const [transactions, setTransactions] = useState(loadTransactions);

  // Role state
  const [role, setRole] = useState("viewer");

  useEffect(() => {
    try {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Failed to save transactions:', error);
    }
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    setTransactions(prevTransactions => [
      {
        ...newTransaction,
        id: Date.now(),
        amount: parseFloat(newTransaction.amount),
        date: getRandomDate() // ✅ ALSO RANDOM DATE FOR NEW ENTRY
      },
      ...prevTransactions
    ]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        
        <Navbar role={role} setRole={setRole} />

        <main className="container mx-auto px-4 py-8">
          <Routes>

            <Route 
              path="/" 
              element={<Dashboard transactions={transactions} role={role} />} 
            />

            <Route 
              path="/add-transaction" 
              element={
                role === "admin" ? (
                  <AddTransaction onAddTransaction={addTransaction} role={role} />
                ) : (
                  <p className="text-red-500 text-center">
                    Access Denied: Only Admin can add transactions
                  </p>
                )
              } 
            />

            <Route 
              path="/transactions" 
              element={<TransactionHistory transactions={transactions} role={role} />} 
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;