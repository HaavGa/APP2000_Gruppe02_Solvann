import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hjem from "./routes/hjem";
import Admin from "./routes/admin";
import Grafer from "./routes/grafer";
import Rapporter from "./routes/rapporter";
import Minside from "./routes/minside";
import ErrorPage from "./routes/error-page";


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
