import { Routes, Route } from "react-router-dom";

import PostFeed from "./page/PostFeed";

function App() {
  return (
    <Routes>

      <Route path="/" element={<PostFeed />} />


    </Routes>
  );
}

export default App;