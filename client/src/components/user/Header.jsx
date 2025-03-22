import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import LoginPage from "../../pages/shared/Login";
import SignUpPage from "../../pages/shared/Signup";

const navigation = [
  { name: "About Us", href: "/about", current: false },
  { name: "Restaurants", href: "/all-restuarant", key: "restaurants" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openSignUp = () => setIsSignUpOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);

  return (
    <>
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
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
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

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={openLogin}
                className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 hover:translate-y-[-2px] hover:shadow-md transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={openSignUp}
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-teal-800 hover:bg-white/90 hover:translate-y-[-2px] hover:shadow-md transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                className={classNames(
                  item.current
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
      </Disclosure>

      {/* Login and Sign-Up Pages */}
      <LoginPage
        isOpen={isLoginOpen}
        onClose={closeLogin}
        onOpenSignUp={openSignUp}
      />
      <SignUpPage isOpen={isSignUpOpen} onClose={closeSignUp} />
    </>
  );
}
