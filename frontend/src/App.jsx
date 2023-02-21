import { useState } from "react";
import ApiData from "./components/ApiData";

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-700">
        <ApiData />
      </div>
    </>
  );
}

export default App;
