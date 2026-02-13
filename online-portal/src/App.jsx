import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from './pages/HomePage';
import ReservationPage from "./pages/ReservationPage";
import NavBar from "./components/NavBar";
import StallMap from "./pages/StallMap";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <NavBar />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/reserve" element={<ReservationPage />} />
        <Route path="/stallmap" element={<StallMap />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
