import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Analytics from "./components/Analytics";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/analytics" replace={true} />}
      ></Route>
      <Route path="analytics" element={<Analytics />} />
    </Routes>
  );
}

export default App;
