import api from "./api";

export const submissionApi = {
  create: async (data) => await api.post("/api/submissions", data),
};
