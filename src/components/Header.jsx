import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path as needed
import { doLogout } from '../auth'; // Handles logout logic (e.g. clearing token)



const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, user, logoutContext } = useAuth();

  const handleLogout = () => {
    doLogout();
    logoutContext(); // update context
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition ${
      isActive ? 'text-blue-700' : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-blue-600">TechTales</div>

          <div className="hidden md:flex space-x-4">
            <NavLink to="/" className={linkClass}>Discover</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/private/user-dash" className={linkClass}>Home</NavLink>
                <NavLink to="/private/add-post" className={linkClass}>Create Post</NavLink>
                <NavLink to="/private/user-profile" className={linkClass}>Profile</NavLink>
                <button onClick={handleLogout} className="text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md">Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClass}>Login</NavLink>
                <NavLink to="/register" className={linkClass}>Signup</NavLink>
              </>
            )}
           
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-3 space-y-1">
          <NavLink to="/" className={linkClass} onClick={() => setIsOpen(false)}>Discover</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/private/user-dash" className={linkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
              <NavLink to="/private/add-post" className={linkClass}>Create Post</NavLink>
              <NavLink to="/private/user-profile" className={linkClass} onClick={() => setIsOpen(false)}>Profile</NavLink>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass} onClick={() => setIsOpen(false)}>Login</NavLink>
              <NavLink to="/register" className={linkClass} onClick={() => setIsOpen(false)}>Signup</NavLink>
            </>
          )}
          
        </div>
      )}
    </nav>
  );
};

export default Header;
