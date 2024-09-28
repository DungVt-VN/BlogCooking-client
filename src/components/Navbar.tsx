import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { faBars, faChevronDown, faChevronUp, faMagnifyingGlass, faRightFromBracket, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import icon from '../assets/images/icon.png';
import useAuth from "../hooks/useAuth";
import { PencilIcon } from '@heroicons/react/16/solid';
import { useState } from "react";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpenRecipes, setIsOpenRecipes] = useState(false);
  const isAuthenticated = false;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMouseEnter = () => {
    setIsOpenRecipes(true);
  };

  const handleMouseLeave = () => {
    setIsOpenRecipes(false);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 z-[555] sticky top-0">
      {({ open }) => (
        <div className="mx-auto max-w-7xl px-2 custom:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <div className="flex min-h-max items-center custom:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-xl ml-3 p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
                </DisclosureButton>
              </div>
              <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={icon} className="h-20" alt="Cooking mama Logo" />
                <span className="relative top-2 right-4 self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-300">Cook</span>
              </Link>
              <div className="ml-3 custom:flex gap-x-4 text-[16px] hidden">
                <Link to="/home" className="hover:text-gray-500 border-r-2 border-gray-400 pr-1">Home</Link>
                {/* Dropdown for Recipes */}
                <div
                  className="relative "
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="text-left hover:text-gray-500 border-r-2 border-gray-400 pr-1 flex items-center cursor-pointer" onClick={() => { navigate('/recipes'); handleMouseLeave }}>
                    <span>Recipes</span>
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </div>
                  {isOpenRecipes && (
                    <div className="absolute z-10 top-full">
                      <div className="mt-2 w-44 bg-white shadow-lg rounded-lg">
                        <div className="py-2">
                          {["Breakfast", "Greens", "Soups", "Grains/Pasta/Spuds", "Beans", "Eggs/Meat/Seafood", "Ferment/Pickles", "Desserts"].map((item, index) => (
                            <Link key={index} to={`/recipes/${item.toLowerCase()}`} className="block px-4 py-2 text-sm text-black hover:bg-gray-100" onClick={handleMouseLeave}>
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Link to="/popular" className="hover:text-gray-500 border-r-2 border-gray-400 pr-1">Popular</Link>
                <Link to="/about" className="hover:text-gray-500 text-nowrap border-r-2 border-gray-400 pr-1">About Me</Link>
              </div>
            </div>

            {/* Search box */}
            <div className="relative px-4 flex w-80">
              <div className='relative flex w-full'>
                <input
                  type="text"
                  id="search-navbar"
                  className="block w-full p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
                <div className="relative block">
                  <div className="absolute inset-y-0 right-0 px-4 bg-slate-400 hover:bg-white text-white hover:text-black rounded-r-full flex items-center cursor-pointer">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <span className="sr-only">Search icon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User dropdown */}
            <div className="right-0 text-[18px] gap-3 flex items-center mr-2">
              {isAuthenticated ? (
                <Menu as="div" className="rel inline-block text-left">
                  <MenuButton className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-600 p-2 text-white shadow-inner shadow-white/10 hover:bg-gray-700">
                    <FontAwesomeIcon icon={faUser} />
                  </MenuButton>
                  <MenuItems className="absolute mt-3 w-32 origin-top-right rounded-xl border border-white bg-gray-600 p-1 text-sm text-white transition z-[99]">
                    <MenuItem>
                      <Link to="/profile" className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10">
                        <PencilIcon className="size-4 text-gray-400" />
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} className="size-4 text-gray-400" />
                        Logout
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <>
                  <Link to="/login" className="border border-white px-2 py-1 rounded-md hover:bg-gray-300 hover:text-black">Login</Link>
                  <Link to="/register" className="border border-white px-2 py-1 rounded-md hover:bg-gray-300 hover:text-black">Register</Link>
                </>
              )}
            </div>
          </div>


          <DisclosurePanel className="custom:hidden">
            {({ close }) => (
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Link
                  to="/home"
                  className="block rounded-sm px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-red-600"
                  onClick={() => {
                    close();
                  }}
                >
                  Home
                </Link>

                {/* Recipes Dropdown */}
                <div className="bg-gray-950 md:hidden p-4 sticky top-0 z-[999]">
                  <Disclosure>
                    {({ open, close }) => (
                      <>
                        <DisclosureButton className="w-full flex place-content-between px-3">
                          <p className="text-white text-base font-medium text-nowrap">Recipes</p>
                          {open ? (
                            <FontAwesomeIcon icon={faChevronUp} />
                          ) : (
                            <FontAwesomeIcon icon={faChevronDown} />
                          )}
                        </DisclosureButton>

                        <DisclosurePanel>
                          <div className="space-y-1 px-2 pb-3 pt-2">
                            {["Breakfast", "Greens", "Soups", "Grains/Pasta/Spuds", "Beans", "Eggs/Meat/Seafood", "Ferment/Pickles", "Desserts"].map((item, index) => (
                              <Link
                                key={index}
                                to={`/${item.toLowerCase()}`}
                                className="block rounded-sm px-3 py-2 text-base font-medium text-gray-100 hover:bg-gray-700 hover:text-red-600"
                                onClick={() => {
                                  close();
                                }}
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                </div>

                <Link
                  to="/popular"
                  className="block rounded-sm px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-red-600"
                  onClick={() => {
                    close();
                  }}
                >
                  Popular
                </Link>

                <Link
                  to="/about"
                  className="block rounded-sm px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-red-600"
                  onClick={() => {
                    close();
                  }}
                >
                  About Me
                </Link>
              </div>
            )}
          </DisclosurePanel>


        </div >
      )}
    </Disclosure >
  );
};

export default Navbar;
