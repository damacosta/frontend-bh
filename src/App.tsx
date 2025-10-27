import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BasicGrid from "./pages/BasicGrid";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/grid" element={<BasicGrid />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
export default App;