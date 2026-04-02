import React from "react";

const Insights = ({ transactions }) => {
  if (!transactions.length) return <p>No data available</p>;

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const categories = {};
  transactions.forEach(t => {
    if (t.type === "expense") {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    }
  });

  const topCategory = Object.keys(categories).reduce((a, b) =>
    categories[a] > categories[b] ? a : b
  );

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-lg font-semibold">Insights</h2>
      <p>💸 Total Expenses: ₹{totalExpense}</p>
      <p>🔥 Highest Spending Category: {topCategory}</p>
    </div>
  );
};

export default Insights;