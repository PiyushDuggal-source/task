import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PrimaryButton from "./common/PrimaryButton";

const links = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "Deals",
    href: "#",
  },
  {
    name: "New Arrivals",
    href: "#",
  },
  {
    name: "Packages",
    href: "#",
  },
];

const Nav = () => {
  const [isOpen, setisOpen] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext?.setIsAuthenticated(false);
    authContext?.setUser(null);
    navigate("/logout");
  };

  return (
    <nav className="w-full bg-white border-gray-200 py-2.5">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <h3 className="text-3xl volkhov-regular text-[#484848]">FASCO</h3>
        <div className="flex lg:order-2">
          <PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
          <button
            onClick={() => setisOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="items-center w-full sm:ml-52 lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-col mt-4 font-medium lg:flex-row lg:flex lg:space-x-8 lg:mt-0`}
          >
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-sm poppins-regular">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
