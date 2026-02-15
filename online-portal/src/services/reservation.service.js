import api from "./api";
import { ENDPOINTS } from "./api.endpoints";
import {
  MOCK_RESERVATION_SUCCESS,
  MOCK_RESERVATION_FAIL,
} from "../common/ReservationResponses";
import {
  MOCK_MY_RESERVATIONS,
  MOCK_NO_RESERVATIONS,
} from "../common/mockReservationDetails";
import {
  MOCK_ALL_GENRES,
  MOCK_NO_GENRES,
  MOCK_UPDATE_GENRES_SUCCESS,
} from "../common/GenreResponses";

const USE_MOCK_DATA = true;

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

export const getMyReservations = async () => {
  //MOCK
  if (USE_MOCK_DATA) {
    return new Promise(
      (resolve) => setTimeout(() => resolve(MOCK_MY_RESERVATIONS.data), 800),
      // (resolve) => setTimeout(() => resolve(MOCK_NO_RESERVATIONS.data), 800),
    );
  }

  //BACKEND
  try {
    const response = await api.get(ENDPOINTS.DASHBOARD);

    if (response.data?.status === "success") {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("Fetch History Error[getMyReservations service]:", error);
    throw error.response?.data?.message || "Server Connection failed";
  }
};

export const getAllGenres = async () => {
  if (USE_MOCK_DATA) {
    return new Promise(
      (resolve) => setTimeout(() => resolve(MOCK_ALL_GENRES.data), 500),
      // setTimeout(() => resolve(MOCK_NO_GENRES.data), 500),
    );
  }

  try {
    const response = await api.get(ENDPOINTS.GET_ALL_GENRES);

    if (response.data?.status === "success") {
      return response.data.data; // Returns: [{id:1, name:"Fiction"}, ...]
    }
    throw response.data?.message || "Not available";
    return [];
  } catch (error) {
    console.error("Error in getAllgenre Servie:", error);
    throw error || "Failed to load genre list";
  }
};

export const updateReservationGenres = async (reservationId, genreList) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_UPDATE_GENRES_SUCCESS), 1000),
    );
  }

  try {
    // URL: /api/reservations/501/genres
    const url = ENDPOINTS.UPDATE_GENRES(reservationId);

    // Body: { genres: ["Fiction", "Science"] }
    const response = await api.post(url, { genres: genreList });

    if (response.data?.status === "success") {
      return response.data;
    }
  } catch (error) {
    console.error("Error in updateGenre Service:", error);
    throw error.response?.data?.message || "Server connection failed";
  }
};
