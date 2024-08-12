import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          TUF
        </Link>
        <div>
          <Link to="/" className="text-white hover:text-gray-200 mx-4">
            Home
          </Link>
          <Link to="/dashboard" className="text-white hover:text-gray-200 mx-4">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
    // <div>navbar</div>
  );
};

export default Navbar;
