import axios from "axios";

const urlbase = process.env.NEXT_PUBLIC_URL_BACKEND || "http://localhost:5050";
export const backend = axios.create({
  baseURL: urlbase,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
