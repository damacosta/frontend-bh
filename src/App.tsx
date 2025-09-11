import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BasicGrid from "./pages/BasicGrid";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/grid" element={<BasicGrid />} />
      </Routes>
    </Router>
  );
}
export default App;