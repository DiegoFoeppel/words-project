import type { QuizUpdate } from "@/types";
import { api } from "../api/axios";

const baseEndpoint = "/api/quiz";

export const getAll = async () => {
  const res = await api.get(baseEndpoint);
  return res.data.words;
};

export const getWordById = async (id: number) => {
  const res = await api.get(`${baseEndpoint}/${id}`);
  return res.data;
};

export const getRandomWord = async () => {
  const res = await api.get(`${baseEndpoint}/random`);
  console.log("res", res.data);
  return res.data;
};

export const updateExample = async (data: QuizUpdate) => {
  const res = await api.patch(`${baseEndpoint}/${data.id}`, data);
  return res.data;
};

export const deleteExample = async (id: number) => {
  const res = await api.patch(`${baseEndpoint}/${id}`);
  return res.data;
};
