import axios from "axios";
export const apiKey = "300b3be80de95e00dc76ca35532db985";

export const heroesApi = axios.create({
  baseURL: "https://gateway.marvel.com:443/v1/public/",
});
