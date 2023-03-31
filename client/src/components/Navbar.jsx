import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../images/solvann-logo.png";
import { UserIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className="flex h-28 bg-gray-800 px-8 text-white">
      <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              className="h-16 w-auto lg:block"
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
        <CustomLink to="/rapporter" className="navLink">
          Rapporter
        </CustomLink>
        <CustomLink to="/grafer" className="navLink">
          Grafer
        </CustomLink>
        <CustomLink to="/admin" className="navLink">
          Admin
        </CustomLink>
        <CustomImg to="minside">
          <UserIcon className="h-9 w-9 p-1" />
        </CustomImg>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li
      className={
        isActive
          ? "rounded-xl text-amber-400"
          : "hover:rounded-xl hover:bg-gray-700"
      }
    >
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

function CustomImg({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li
      className={
        isActive
          ? "rounded-full ring-2 ring-amber-500"
          : "rounded-full ring-1 ring-white hover:rounded-full hover:ring-2"
      }
    >
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}