import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from './pages/HomePage';
import ReservationPage from "./pages/ReservationPage";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./contexts/AuthContext";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <AuthProvider>
      <NavBar />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/stalls" element={<ReservationPage />} />
        <Route path="/my-reservations" element={<div>My Reservations Page</div>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
