import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from './pages/HomePage';
import ReservationPage from "./pages/ReservationPage";
import NavBar from "./components/NavBar";
import StallMap from "./pages/StallMap";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reserve" element={<ReservationPage />} />
        <Route path="/stallmap" element={<StallMap />} />
      </Routes>
    </>
  );
}

export default App;
