import api from "./api";

export const submissionsApi = {
  getById: async (id) => await api.get(`/api/submissions/${id}`),
  get: async () => await api.get("/api/submissions?populateTest=true"),
};
