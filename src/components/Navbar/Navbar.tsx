import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed w-full z-10 top-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <a href="/" className="text-3xl font-semibold text-red-500">
              Hypergro
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
