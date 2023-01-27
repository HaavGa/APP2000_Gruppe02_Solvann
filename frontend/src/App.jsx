import { useState } from "react";

function App() {
  // random testkode
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-700">
        {visible && <h1 className="text-3xl text-white">Hallo!</h1>}
        <button
          onClick={toggle}
          className="btn translate-y-10 bg-red-300 hover:bg-red-400"
        >
          Trykk
        </button>
      </div>
    </>
  );
}

export default App;
