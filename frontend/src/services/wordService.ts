import { api } from "../api/axios";

const baseEndpoint = "/api/words";

export const getAllWords = async () => {
  const res = await api.get("/api/words");

  return res.data.words;
};

export const getById = async (id: Number) => {
  const res = await api.get(baseEndpoint);
  return res.data.routes;
};

export const getByFilter = async (filter: String) => {
  const res = await api.get(baseEndpoint);
  return res.data;
};

export const addWord = async (data) => {
  const res = await api.post(baseEndpoint, data);
  return res.data;
};

export const editWord = async (id: number, data) => {
  console.log("Id", id, data);
  const res = await api.patch(`${baseEndpoint}/${id}`, data);
  console.log("res", res);
  return res.data;
};

export const deleteWord = async (id: Number) => {
  const res = await api.delete(`${baseEndpoint}/${id}`);
  return res.data;
};
