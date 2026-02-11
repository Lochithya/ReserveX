import api from "./api";

export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (daata) => api.post("/auth/register", data);