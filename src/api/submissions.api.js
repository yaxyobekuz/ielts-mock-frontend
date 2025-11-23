import api from "./api";

export const submissionsApi = {
  getById: async (id) => await api.get(`/api/submissions/${id}`),
  create: async (data) => await api.post("/api/submissions", data),
  get: async () => await api.get("/api/submissions?populateTest=true&mine=true"),
};
