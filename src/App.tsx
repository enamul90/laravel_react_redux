import { Routes, Route } from "react-router-dom";

import Dashboard from "./page/Dashboard";
import Countor from "./page/Countor";
import PostFeed from "./page/PostFeed";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/post" element={<PostFeed />} />
      <Route path="/counter" element={<Countor />} />

    </Routes>
  );
}

export default App;