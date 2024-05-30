import React from 'react';
import { RiLogoutBoxRLine } from "react-icons/ri";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Issue Tracker</h1>
      {isLoggedIn && (
        <button
        className="text-white hover:text-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center"
        onClick={handleLogout}
      >
        <RiLogoutBoxRLine className="mr-2" size={20} />
        Logout
      </button>
      )}
    </div>
  );
};
export default Header;
