import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.jpeg";   

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
        
<div className="flex-shrink-0 -ml-9">
  <Link to="/" className="flex items-center">
    <img
      src={logo}
      alt="ReserveX Logo"
      className="h-16 w-auto object-contain rounded-lg"
    />
  </Link>
</div>

         
          <div className="hidden md:flex md:items-center md:space-x-8">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="text-white">
                  About Us
                </Link>
                <Link to="/contact" className="text-white">
                  Contact Us
                </Link>
                <Link
                  to="/login"
                  className="inline-block px-5 py-2 bg-white text-blue-600 rounded-full text-sm font-medium"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                
                <Link to="/home" className="text-white">
                  Home
                </Link>
                <Link to="/" className="text-white">
                  About Us
                </Link>
                <Link to="/contact" className="text-white">
                  Contact Us
                </Link>
                <Link
                  to="/stallMap"
                  className="inline-block px-5 py-2 bg-white text-blue-600 rounded-full text-sm font-medium"
                >
                  Reserve a stall
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white px-3 py-2 rounded-md text-sm"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>

         
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="p-2 text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white"
                >
                  Contact Us
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-3 py-2 bg-white text-blue-600 rounded-full"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                
                <Link
                  to="/home"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white"
                >
                  Home
                </Link>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white"
                >
                  Contact Us
                </Link>
                <Link
                  to="/stallMap"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-3 py-2 bg-white text-blue-600 rounded-full"
                >
                  Reserve a stall
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-white rounded-md"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );

};

export default NavBar;
