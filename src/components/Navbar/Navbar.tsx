import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed w-full z-10 top-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <a href="#" className="text-3xl font-semibold text-red-500">
              Hypergro
            </a>
          </div>
          <div className="flex ml-4">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search"
                className="w-48 sm:w-64 md:w-96 py-2 rounded-full px-4 border border-gray-800 border-r-0 focus:outline-none focus:border-gray-500 bg-gray-800"
              />

              <button className="absolute right-0 top-0 mt-2 mr-2 focus:outline-none">
                <IoSearchOutline className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
