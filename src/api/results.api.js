import api from "./api";

export const resultsApi = {
  get: async () => await api.get("/api/results?populateTest=true"),
  getById: async (id) => await api.get(`/api/results/${id}?populateTest=true`),
};
