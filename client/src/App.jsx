import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hjem from "./pages/Home";
import Admin from "./pages/Admin";
import Grafer from "./pages/Grafer";
import Rapporter from "./pages/Rapporter";
import Minside from "./pages/MinSide";
import ErrorPage from "./pages/ErrorPage";


function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Hjem />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/grafer" element={<Grafer />} />
          <Route path="/rapporter" element={<Rapporter />} />
          <Route path="/minside" element={<Minside />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
