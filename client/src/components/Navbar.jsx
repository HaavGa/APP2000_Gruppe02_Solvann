import {Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className=" bg-gray-800 p-10 text-3xl text-white">
        <ul className="flex justify-between">
          <li>
            <Link to="/">Hjem</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/grafer">Grafer</Link>
          </li>
          <li>
            <Link to="/rapporter">Rapporter</Link>
          </li>
          <li>
            <Link to="/minside">Min side</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
