import API from "./api";

export const getAllStalls = () => {
  return API.get("/stalls");
};
