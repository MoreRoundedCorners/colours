import React, { useEffect, useState } from "react";
import { Navbar, Button, Text, useTheme } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const Nav = () => {
  const navigate = useNavigate();
  const counter = useSelector((state) => state.cart.cart.length);

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`text-black w-full z-20 top-0 left-0 border-2 border-gray-100 dark:border-gray-100 animate-slideleft delay-500 ${
        isScrolled ? "hidden" : ""
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap lg:justify-between justify-center mx-auto p-4">
        <div
          className={`flex items-center ${
            isOpen ? "justify-center" : "justify-between "
          }`}
        >
          <a href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:">
              Colour
            </span>
            <img
              src="../../public/misimg/kael.jpg"
              className="h-10 object-contain mt-1"
            />
          </a>
          <div className="flex md:order-2">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 mx-4 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 "
              aria-controls="navbar-sticky"
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`${
            isOpen ? "" : "hidden"
          } w-full md:flex md:w-auto md:order-1 md:justify-center`}
          id="navbar-sticky"
        >
          <ul className="flex ul-list flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transperant dark:bg-transperant  dark:border-gray-700">
            <Link to="/">
              <a className="block li-nav py-2 pl-3 pr-4 text-gray-900 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-neutral-900 dark:hover: md:dark:hover:bg-transparent dark:border-gray-700">
                Home
              </a>
            </Link>

            <Link to="/shop">
              <a className="block li-nav py-2 pl-3 pr-4 text-gray-900 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-neutral-900 dark:hover: md:dark:hover:bg-transparent dark:border-gray-700">
                Shop
              </a>
            </Link>

            <Link to="/contact" className="">
              <a className="block li-nav py-2 pl-3 pr-4 text-gray-900 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-neutral-900 dark:hover: md:dark:hover:bg-transparent dark:border-gray-700">
                Contact
              </a>
            </Link>
            <div className="flex">
              <Link
                to="/cart"
                className="block li-nav py-2 pl-3 pr-4 text-gray-900 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-neutral-900 dark:hover: md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <a>
                  <p className="fixed pl-7 ">
                    {counter > 0 ? (
                      <p className="animate-slidedown">{counter}</p>
                    ) : (
                      ""
                    )}
                  </p>
                  <img
                    src="../../public/misImg/shop.png"
                    className="h-auto w-6 object-cover cursor-pointer"
                  />
                </a>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};
