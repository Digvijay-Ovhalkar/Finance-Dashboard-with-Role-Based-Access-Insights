import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ role, setRole }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Add Transaction', path: '/add-transaction' },
    { name: 'Transactions', path: '/transactions' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary-700">
              Finance Dashboard
            </span>
          </div>

          {/* Nav Links + Role Switch */}
          <div className="flex items-center space-x-4">

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    location.pathname === item.path
                      ? 'text-primary-700 bg-primary-100'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* ✅ ROLE DROPDOWN */}
            <div className="flex items-center">
              <span className="text-sm mr-2 text-gray-600">Role:</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;