import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import {
  Admin,
  ErrorPage,
  Grafer,
  Home,
  Login,
  MinSide,
  Rapporter,
} from "./pages/index";
import { useIsAuthenticated } from "react-auth-kit";

function App() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <>
      {isAuthenticated() && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={isAuthenticated() ? <Home /> : <Login />} />
          <Route
            path="/admin"
            element={isAuthenticated() ? <Admin /> : <Login />}
          />
          <Route
            path="/grafer"
            element={isAuthenticated() ? <Grafer /> : <Login />}
          />
          <Route
            path="/rapporter"
            element={isAuthenticated() ? <Rapporter /> : <Login />}
          />
          <Route
            path="/minside"
            element={isAuthenticated() ? <MinSide /> : <Login />}
          />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
