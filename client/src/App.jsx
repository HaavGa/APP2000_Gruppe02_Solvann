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
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";

function App() {
  const auth = useAuthUser();
  //! Hmmmmmmmmmm
  // axios.defaults.withCredentials = true;
  // axios.defaults.baseURL = "http://localhost:5000/api";
  // axios.defaults.headers.common["Authorization"] = auth().token;

  const isAuthenticated = useIsAuthenticated();
  return (
    <>
      {isAuthenticated() && <Navbar />}
      <div>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated() ? <Home auth={auth} /> : <Login />}
          />
          <Route
            path="/admin"
            element={isAuthenticated() ? <Admin auth={auth} /> : <Login />}
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
