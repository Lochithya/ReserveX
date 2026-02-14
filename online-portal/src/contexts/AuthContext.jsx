import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    

    // {
    //   "user_id": 101,                  
    //   "username": "saman_pub"
    //   "business_name": "Saman Publishers",
    //   "email": "saman@example.com",
    //   "roles": "vendor",
    //   "no_of_current_bookings": 1      // Used for UI validation (Max 3)
    // }

    const [user, setUser] = useState(null);    
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true);   //TODO: prevent Login Page Flash when refresh

    const login = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData)
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null)
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};