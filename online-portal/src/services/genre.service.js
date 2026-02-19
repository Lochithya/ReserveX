import api from "./api";

/**
 * Get literary genres added by the current user for the exhibition.
 */
export const getMyGenres = async () => {
  const { data } = await api.get("/genres");
  return data;
};

/**
 * Add a genre for the current user.
 * @param {string} genreName - e.g. "Fiction", "Children's"
 */
export const addGenre = async (genreName) => {
  const { data } = await api.post("/genres", { genreName });
  return data;
};

/**
 * Replace all genres for the current user.
 * @param {string[]} genreNames - Array of genre names
 */
export const setGenres = async (genreNames) => {
  const { data } = await api.put("/genres", genreNames);
  return data;
};

export const getAllGenres = async () => {
  const { data } = await api.get("/genres");
  return data;
};