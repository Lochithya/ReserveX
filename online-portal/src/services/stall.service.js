<<<<<<< Updated upstream
import api from "../services/api";
import { ENDPOINTS } from "../services/api.endpoints";
import { mockStalls2, mockStalls, mockStallE } from "../common/mockData";

const USE_MOCK_DATA = true; //Make it false to use api

// EXPECTED DATA FORMAT:
//    * This component expects 'StallService.getAllStalls()' to return a
//    * simple Array of Objects.
//    * * Required Object Structure:
//    * [
//    * {
//    * id: string | number,       // Unique ID (e.g., "A1")
//    * gridRow: number,           // Y Position (1-based index)
//    * gridCol: number,           // X Position (1-based index)
//    * size: "Small" | "Medium" | "Large",
//    * price: number,             // Price in cents or basic unit
//    * isConfirmed: 0 | 1,        // 0 = Available, 1 = Reserved
//    * description?: string       // Optional text for tooltip
//    * },
//    * ...
//    * ]

//Get All Stalls
export const getAllStalls = async () => {
  if (USE_MOCK_DATA) {
    // return mockStalls;
    // Simulate API delay (500ms) to test loading states
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockStalls), 800);
    });
  }

  try {
    const response = await api.get(ENDPOINTS.GET_ALL_STALLS);

    // Standard struture
    if (response.data && response.data.status === "success") {
      return response.data.data; // We return ONLY the list
    }

    //If Backend sent raw array
    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (response.data.status === "error") {
      throw response.data?.message || response.message; //in response
    }

    return []; //for safety
  } catch (error) {
    console.error("Service Error [getAllStalls]:", error); //Real error
    throw (
      error.response?.message ||
      error.response?.data?.message ||
      "Server connection failed"
    ); //What user see
  }
=======
import API from "./api";

/**
 * Fetch all stalls with availability (reserved or not).
 * Used to display the exhibition map with available stalls.
 */
export const getAllStalls = async () => {
  const { data } = await API.get("/stalls");
  return data;
>>>>>>> Stashed changes
};
