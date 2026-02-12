import API from "./api";

export const createReservation = (stallIds) => {
  return API.post("/reservations", {
    stallIds: stallIds,
  });
};
