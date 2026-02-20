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

    const [user, setUser] = useState(() => {          //This runs ONCE when the app loads prevent relaod
        const savedUser = localStorage.getItem("user");
        if (!savedUser) return null;
        try {
            return JSON.parse(savedUser);
        } catch (error) {
            localStorage.removeItem("user");
            return null;
        }
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // If we have a token we are authenticated
        return !!localStorage.getItem("token");
    })
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