import API from "./api";

/**
 * Employee login. Use email as username.
 * Backend returns JWT; store token in localStorage after login.
 */
export const login = async (username, password) => {
  return API.post("/auth/login", { username, password });
};

export const logout = () => {
  localStorage.removeItem("token");
};
