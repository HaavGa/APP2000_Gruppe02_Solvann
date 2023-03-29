import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../images/solvann-logo.png";

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
        <CustomLink to="/minside" className="navLink">
          Min side
        </CustomLink>
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
          ? "active rounded-xl border bg-white text-black"
          : "hover:underline"
      }
    >
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}