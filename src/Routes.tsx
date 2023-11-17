
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}
