import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import icon from "../assets/images/img.svg";
import useAuth from "../hooks/useAuth";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth(); // Sử dụng trạng thái từ hook
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-800 z-[555] sticky top-0 text-white">
      <div className="mx-auto max-w-7xl px-2 custom:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/home"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={icon} className="h-20" alt="Cooking mama Logo" />
              <span className="relative  top-2 right-4 self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-300">
                Todo
              </span>
            </Link>
          </div>

          <div className="right-0 text-[18px] gap-3 flex items-center mr-2">
            {isAuthenticated ? (
              <Menu as="div" className="rel inline-block text-left">
                <MenuButton className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-600 p-2 text-white shadow-inner shadow-white/10 hover:bg-gray-700">
                  <FontAwesomeIcon icon={faUser} />
                </MenuButton>
                <MenuItems className="absolute mt-3 w-32 origin-top-right rounded-xl border border-white bg-gray-600 p-1 text-sm text-white transition z-[9999]">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                          active ? "bg-white/10" : ""
                        }`}
                        onClick={handleLogout}
                      >
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          className="size-4 text-gray-400"
                        />
                        Logout
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-white px-2 py-1 rounded-md hover:bg-gray-300 hover:text-black"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-white px-2 py-1 rounded-md hover:bg-gray-300 hover:text-black"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
