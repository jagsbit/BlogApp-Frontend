import React, { useEffect, useState } from 'react';
import { loadAllCategories } from '../../services/category-service';
import { Link, useLocation } from 'react-router-dom';

const CategoryNav = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    loadAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Failed to load categories", error));
  }, []);

  const isActive = (catId) => {
    return location.pathname === `/private/category/${catId}`;
  };

  return (
    <div className="w-full lg:w-64">
      {/* Mobile View - Top horizontal scroll */}
      <div className="bg-white shadow-md p-4 mb-6 block lg:hidden overflow-x-auto whitespace-nowrap">
        <h2 className="text-lg font-semibold text-blue-700 mb-3">Categories</h2>
        <div className="flex gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.catId}
              to={`/private/category/${cat.catId}`}
              className={`px-4 py-2 rounded-full text-sm transition 
                ${isActive(cat.catId)
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
            >
              {cat.catName}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop View - Vertical sidebar */}
      <div className="hidden lg:block bg-white shadow-md rounded-md p-4 sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.catId}>
              <Link
                to={`/private/category/${cat.catId}`}
                className={`block px-3 py-2 rounded transition 
                  ${isActive(cat.catId)
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-800 hover:bg-blue-100'}`}
              >
                {cat.catName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryNav;
