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

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/grafer" element={<Grafer />} />
          <Route path="/rapporter" element={<Rapporter />} />
          <Route path="/minside" element={<MinSide />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
