"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";
import { LogInIcon, LogOutIcon, SettingsIcon, ShoppingCart, User, UserCog } from "lucide-react";
import { useState } from "react";

function Dropdown({ items, onItemSelect, label }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggle = () => setIsOpen(!isOpen);
  
  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="flex items-center p-2 text-gray-900 hover:bg-gray-200 rounded-md transition-colors duration-300"
      >
        {label}
        <svg
          className={`ml-2 w-4 h-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-2">
            {items.map(item => (
              <li
                key={item.id}
                onClick={() => {
                  onItemSelect(item.path);
                  setIsOpen(false);
                }}
                className="cursor-pointer px-4 py-2 text-gray-900 hover:bg-gray-100 transition-colors duration-300"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


function NavItems({ isModalView = false, isAdminView, router }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto transition-all duration-300 ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView ? (
          <Dropdown
            items={adminNavOptions}
            onItemSelect={(path) => router.push(path)}
            label="Admin Menu"
          />
        ) : (
          <Dropdown
            items={navOptions}
            onItemSelect={(path) => router.push(path)}
            label="Products Menu"
          />
        )}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal
  } = useContext(GlobalContext);

  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    )
      setCurrentUpdatedProduct(null);
  }, [pathName]);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const isAdminView = pathName.includes("admin-view");

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 shadow-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800 transition-transform transform hover:scale-105 duration-300">
              <img src="/logo.svg" alt="logo" srcset="" />
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button
                  className="mt-1.5 inline-block px-5 py-3 text-xs font-medium uppercase tracking-wide transition-transform transform hover:scale-105 duration-300"
                  onClick={() => router.push("/account")}
                >
                  <SettingsIcon/>
                </button>
                <button
                  className="mt-1.5 inline-block px-5 py-3 text-xs font-medium uppercase tracking-wide transition-transform transform hover:scale-105 duration-300"
                  onClick={() => setShowCartModal(true)}
                >
                  <ShoppingCart/>
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  className="mt-1.5 inline-block text-blue-500 px-5 py-3 text-xs font-medium uppercase tracking-wide transition-transform transform hover:scale-105 duration-300"
                  onClick={() => router.push("/")}
                >
                  <User/>
                </button>
              ) : (
                <button
                  onClick={() => router.push("/admin-view")}
                  className="mt-1.5 inline-block text-green-500 px-5 py-3 text-xs font-medium uppercase tracking-wide transition-transform transform hover:scale-105 duration-300"
                >
                  <UserCog/>
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                onClick={handleLogout}
                className="mt-1.5 inline-block px-5 py-3 text-xs font-medium uppercase tracking-wide text-red-500 transition-transform transform hover:scale-105 duration-300"
              >
                <LogOutIcon/>
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="mt-1.5 inline-block  px-5 py-3 text-xs font-medium uppercase tracking-wide text-green-500 transition-transform transform hover:scale-105 duration-300"
              >
                <LogInIcon/>
              </button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-transform transform hover:scale-105 duration-300"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
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
            </button>
          </div>
          <NavItems router={router} isAdminView={isAdminView} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
