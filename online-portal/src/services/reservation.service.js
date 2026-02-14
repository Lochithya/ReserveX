import api from "./api";
import { ENDPOINTS } from "./api.endpoints";
import {
  MOCK_RESERVATION_SUCCESS,
  MOCK_RESERVATION_FAIL,
} from "../common/ReservationResponses";

const USE_MOCK_DATA = false;

export const createReservation = async (selectedStalls) => {
  // 1. Prepare Payload (Convert objects to just IDs)
  // Backend expects: { stall_ids: [1, 5, 8] }
  const payload = {
    stall_ids: selectedStalls.map((stall) => stall.stall_id),
  };

  //MOCK MODE
  if (USE_MOCK_DATA) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a random failure (e.g., 10% chance a stall was stolen)
        const isSuccess = Math.random() > 0.1;

        if (isSuccess) {
          resolve(MOCK_RESERVATION_SUCCESS);
        } else {
          reject(MOCK_RESERVATION_FAIL.message);
        }
      }, 2000); // 2 second delay
    });
  }

  //BACKEND MODE
  try {
    const response = await api.post(ENDPOINTS.RESERVE, payload);

    if (response.data?.status === "success") {
      return response.data;
    }

    throw response.data?.message || "Reservation failed";
  } catch (error) {
    console.error("Reservation Error:", error);
    throw error.response?.data?.message || "Server connection failed";
  }
};
