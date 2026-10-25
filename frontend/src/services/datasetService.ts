import { api } from "../api/axios";

const baseEndpoint = "/api/words";

export const getAll = async () => {
  const res = await api.get(baseEndpoint);
  return res.data.words;
};

export const getExamples = async (id: Number) => {
  const res = await api.get(baseEndpoint);
  return res.data.routes;
};
