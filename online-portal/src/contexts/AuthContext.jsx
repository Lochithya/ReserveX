import { Children, createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ Children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {Children}
        </AuthContext.Provider>
    );
};