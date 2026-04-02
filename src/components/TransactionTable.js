import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TransactionTable = ({ transactions, showCategory = true, role }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // ✅ EMPTY STATE
  if (!transactions.length) {
  return <p className="text-gray-500">No transactions available</p>;
}

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        
        {/* HEADER */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>

            {showCategory && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
            )}

            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Amount
            </th>

            {/* ✅ ACTION COLUMN ONLY FOR ADMIN */}
            {role === "admin" && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50 transition">
              
              {/* DESCRIPTION */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'income' ? <FaArrowUp /> : <FaArrowDown />}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {transaction.title}
                    </div>
                  </div>
                </div>
              </td>

              {/* DATE */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(transaction.date)}
              </td>

              {/* CATEGORY */}
              {showCategory && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {transaction.category}
                  </span>
                </td>
              )}

              {/* AMOUNT */}
              <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </td>

              {/* ✅ ACTIONS (ONLY ADMIN) */}
              {role === "admin" && (
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-blue-600 hover:underline text-sm">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline text-sm">
                    Delete
                  </button>
                </td>
              )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;