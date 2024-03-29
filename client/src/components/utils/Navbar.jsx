import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/solvann-logo.png";
import { Menu } from "@headlessui/react";
import { HiOutlineUser } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { useSignOut } from "react-auth-kit";
import ModalChangePassword from "./ModalChangePassword";

/**
 * Bygger ut navbaren
 * @source https://github.com/WebDevSimplified/react-navbar/blob/main/src/Navbar.js
 * @param {objekt} auth objekt tilbudt av "react-auth-kit" for å
 * håndtere autentisering
 * @returns Navbar
 */
const Navbar = ({ auth }) => {
  const [isShown, setIsShown] = useState(false);
  const signOut = useSignOut();

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };
  const editPassword = () => {
    setIsShown((prevIsShown) => !prevIsShown);
  };

  const CustomLink = ({ to, children, ...props }) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
      <li
        className={
          isActive
            ? "rounded-xl text-logo"
            : "hover:rounded-xl hover:bg-gray-700"
        }
      >
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  };

  return (
    <>
      {isShown && <ModalChangePassword />}
      <nav className="flex h-28 bg-bg-nav px-8 text-white">
        <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img
                className="h-16 w-auto translate-y-3 translate-x-3 scale-[2] lg:block"
                src={logo}
                alt="Solvann logo"
              />
            </Link>
            <Link to="/" className="text-4xl">
              Solvann
            </Link>
          </div>
        </div>
        <ul className="flex list-none items-center gap-8 px-10 text-2xl">
          <CustomLink to="/" className="navLink">
            Hjem
          </CustomLink>
          <CustomLink to="/grafer" className="navLink">
            Grafer
          </CustomLink>
          <CustomLink to="/rapporter" className="navLink">
            Rapporter
          </CustomLink>
          {auth().isAdmin && (
            <CustomLink to="/admin" className="navLink">
              Admin
            </CustomLink>
          )}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900">
                <HiOutlineUser
                  className="h-9 w-9 rounded-full stroke-[1.5] p-1 text-white ring-[1.5px] ring-white hover:rounded-full
              hover:ring-[2.5px]"
                />
              </Menu.Button>
            </div>
            <Menu.Items className=" absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-2">
                <Menu.Item>
                  <p className="py-2 text-center text-lg font-bold text-gray-900">
                    {`${auth().firstName} ${auth().lastName}`}
                  </p>
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={editPassword}
                      className={classNames(
                        active
                          ? "bg-gray-200 font-medium text-gray-900"
                          : "font-medium text-gray-700",
                        "block px-4 py-2"
                      )}
                    >
                      <i
                        className={classNames(
                          active ? "text-amber-600" : " ",
                          "float-left py-2 pr-4"
                        )}
                      >
                        <BiEdit />
                      </i>
                      <span className="text-base">Bytt passord</span>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => signOut()}
                      className={classNames(
                        active
                          ? "bg-gray-200 font-medium text-gray-900"
                          : "font-medium text-gray-700",
                        "block px-4 py-2"
                      )}
                    >
                      <i
                        className={classNames(
                          active ? "text-rose-700" : " ",
                          "float-left py-2 pr-4"
                        )}
                      >
                        <TbLogout />
                      </i>
                      <span className="text-base">Logg ut</span>
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
