import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false); 
  };

  const navLinks = !isAuthenticated ? (
    <>
      <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors duration-200">
        Login
      </Link>
      <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors duration-200">
        Register
      </Link>
      <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors duration-200">
        About Us
      </Link>
      <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors duration-200">
        Contact Us
      </Link>
    </>
  ) : (
    <>
      <Link to="/home" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors duration-200">
        Home
      </Link>
      <Link to="/stalls" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors duration-200">
        Stalls
      </Link>
      <Link to="/my-reservations" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors duration-200">
        My Reservations
      </Link>
      <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors duration-200">
        About Us
      </Link>
      <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors duration-200">
        Contact Us
      </Link>
      <button 
        onClick={handleLogout}
        className="w-full mt-2 px-3 py-2 rounded-md text-base font-semibold text-white border-2 border-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
      >
        Logout
      </button>
    </>
  );

  return (
    <nav className="bg-[var(--primary-color)] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 text-2xl font-bold tracking-wider hover:opacity-80 transition-opacity duration-200">
            ReserveX
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <Link to="/" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200">
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200">
                  Register
                </Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200">
                  About Us
                </Link>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200">
                  Contact Us
                </Link>
              </>
            ) : (
              <>
                <Link to="/home" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200">
                  Home
                </Link>
                <Link to="/stalls" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200">
                  Stalls
                </Link>
                <Link to="/my-reservations" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200">
                  My Reservations
                </Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200">
                  About Us
                </Link>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200">
                  Contact Us
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-[var(--primary-color)] border-t border-blue-500 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
