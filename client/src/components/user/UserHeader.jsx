import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
const navigation = [
  { name: "About Us", href: "/about", key: "about" },
  { name: "Restaurants", href: "/all-restuarant", key: "restaurants" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UserHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const userLogout = async () => {
    try {
      await axiosInstance({ method: "POST", url: "user/logout" });
      if (!Cookies.get("token")) toast.success("Logout successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-r from-teal-800 to-teal-900 shadow-lg"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 hover:rotate-90">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <div className="logo hover:scale-105 transition-transform duration-300">
                <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.key}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-white/10 text-white"
                        : "text-white hover:bg-white/10 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Notification Bell, Cart, and Profile */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="relative rounded-full p-1 text-white hover:bg-white/10 hover:rotate-12 transition-all duration-300"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            <Link
              to="/cart"
              className="relative rounded-full p-1 text-white hover:bg-white/10 hover:rotate-12 transition-all duration-300"
            >
              <FaCartShopping className="size-6" />
            </Link>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="relative rounded-full p-1 text-white hover:bg-white/10 hover:rotate-12 transition-all duration-300">
                <span className="sr-only">Open user menu</span>
                <FaUserCircle className="size-6" />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <MenuItem>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:translate-x-2 transition-all duration-300"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/order"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:translate-x-2 transition-all duration-300"
                  >
                    Your Order
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={userLogout}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:translate-x-2 transition-all duration-300 text-left"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.key}
                as={Link}
                to={item.href}
                className={classNames(
                  location.pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-white hover:bg-white/10",
                  "block rounded-md px-3 py-2 text-base font-medium transition-all duration-300 hover:translate-x-2"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
}

export default UserHeader;
