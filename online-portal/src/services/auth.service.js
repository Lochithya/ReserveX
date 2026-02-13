import api from "./api";
import { ENDPOINTS } from "./api.endpoints";
import { MOCK_LOGIN_SUCCESS, MOCK_LOGIN_FAIL } from "../common/LoginResponses";

const USE_MOCK_DATA = true;

export const loginUser = async (email, password) => {
  //MOCK MODE
  if (USE_MOCK_DATA) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "student@uni.com" && password === "123") {
          resolve(MOCK_LOGIN_SUCCESS.data); // Return { token, user }
        } else {
          reject(MOCK_LOGIN_FAIL.message); // Return "Invalid email..."
        }
      }, 1000);
    });
  }

  //BACKEND MODE
  try {
    const response = await api.post(ENDPOINTS.LOGIN, { email, password });

    if (response.data?.status === "success") {
      return response.data?.data; //Returns { token, user{ data: } }
    }

    throw response.data?.message || "Login failed";
  } catch (error) {
    console.error("Failed Send the request [loginUser Service]:", error);
    throw error || "Server connection failed"; //TODO
  }
};

export const register = () => {};
