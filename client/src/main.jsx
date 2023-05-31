import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import "./index.css";
import App from "./App";

/**
 * @author Håvard Garsrud
 * Metoden henter et element med ID "root" og legger hele
 * applikasjonen inni denne.
 * AuthProvider: Provider tilbudt av pakken react-auth-kit som
 * hjelper med autentisering av frontend
 */
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider
      authType="cookie"
      authName="auth"
      cookieDomain={window.location.hostname}
      cookieSecure={import.meta.env.PROD}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
