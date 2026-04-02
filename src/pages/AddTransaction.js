import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';

const AddTransaction = ({ onAddTransaction, role }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ✅ BLOCK ACCESS IF NOT ADMIN
  if (role !== "admin") {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-red-500">
          Access Denied 🚫
        </h2>
        <p className="text-gray-600 mt-2">
          Only Admin can add transactions.
        </p>
      </div>
    );
  }

  const handleSubmit = async (transaction) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onAddTransaction(transaction);
      navigate('/');
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Add New Transaction
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
      </div>

      {/* CARD */}
      <div className="card">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <TransactionForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AddTransaction;