import { Routes, Route } from "react-router-dom";

import Dashboard from "./page/Dashboard";
import Countor from "./page/Countor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/counter" element={<Countor />} />

    </Routes>
  );
}

export default App;