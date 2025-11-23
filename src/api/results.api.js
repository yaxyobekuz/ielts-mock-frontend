import api from "./api";

export const resultsApi = {
  get: async () => await api.get("/api/results?populateTest=true&mine=true"),
  getById: async (id) => await api.get(`/api/results/${id}?populateTest=true`),
  getLeaderboard: async (limit = 10) =>
    await api.get(`/api/results/leaderboard?limit=${limit}`),
};
