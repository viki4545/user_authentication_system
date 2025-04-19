import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[#012647] text-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-white">
        MyApp
      </Link>

      <div className="flex gap-4 items-center">
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-[#75000e] hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-md text-white border border-white hover:bg-white hover:text-[#012647] transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md text-white border border-white hover:bg-white hover:text-[#012647] transition-colors duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
