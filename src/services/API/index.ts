import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_TMDB_API;
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const API = axios.create({
  baseURL: baseUrl,
});

API.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${apiKey}`;

  return config;
});
