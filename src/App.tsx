import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import LoginPage from "@/pages/LoginPage";
import History from "@/pages/History";
import PrivateRoute from "@/components/features/auth/PrivateRoute";
import { TempoProvider } from "./TempoContext";

function App() {
  return (
    <TempoProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/historico"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
      </Routes>
    </TempoProvider>
  );
}

export default App;
