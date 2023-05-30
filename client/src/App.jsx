import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/utils/Navbar";
import {
  Admin,
  ErrorPage,
  Grafer,
  Home,
  Login,
  Rapporter,
} from "./pages/index";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";

function App() {
  const auth = useAuthUser();

  const isAuthenticated = useIsAuthenticated();
  return (
    <>
      {isAuthenticated() && <Navbar auth={auth} />}
      <div>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated() ? <Home auth={auth} /> : <Login />}
          />
          <Route
            path="/admin"
            element={
              isAuthenticated() && auth().isAdmin ? (
                <Admin />
              ) : isAuthenticated() && !auth().isAdmin ? (
                <ErrorPage />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/grafer"
            element={isAuthenticated() ? <Grafer /> : <Login />}
          />
          <Route
            path="/rapporter"
            element={isAuthenticated() ? <Rapporter /> : <Login />}
          />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
