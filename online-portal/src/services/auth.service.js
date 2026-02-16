import api from "./api";
import { ENDPOINTS } from "./api.endpoints";
import { MOCK_LOGIN_SUCCESS, MOCK_LOGIN_FAIL } from "../common/LoginResponses";
import {
  MOCK_REGISTER_SUCCESS,
  MOCK_REGISTER_FAIL,
} from "../common/RegisterResponses";

const USE_MOCK_DATA = true;

export const loginUser = async (email, password) => {
  //MOCK MODE
  if (USE_MOCK_DATA) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "saman@example.com" && password === "123") {
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
      return response.data?.data; //Returns { token, user{ data: } } with 200OK
    }

    if (response.data.status === "error") {
      throw response.data?.message || "Login failed"; //in response it should send 400 code
    }
  } catch (error) {
    console.error("Failed Send the request [loginUser Service]:", error);
    throw (
      error.response?.message ||
      error.response?.data?.message ||
      "Server connection failed"
    ); //What user see
  }
};

export const registerUser = async (userData) => {
  //MOCK MODE
  if (USE_MOCK_DATA) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email === "exist@test.com") {
          reject(MOCK_REGISTER_FAIL.message);
        } else {
          resolve(MOCK_REGISTER_SUCCESS);
        }
      }, 1000);
    });
  }

  //BACKEND MODE
  try {
    const payload = {
      ...userData,
      roles: "vendor", //force the role to 'vendor' here for security
    };

    const response = await api.post(ENDPOINTS.REGISTER, payload);

    if (response.data?.status === "success") {
      return response.data;
    }

    throw response.data?.message || "Registration Failed";
  } catch (error) {
    console.error("Register Service Error: ", error);
    throw error.response?.data?.message || "Server Connection Failed";
  }
};
