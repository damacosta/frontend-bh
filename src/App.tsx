import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/historico" element={<History />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
export default App;