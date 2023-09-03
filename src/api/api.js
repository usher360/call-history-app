import axios from "axios";

const API_URL = "/api";

export const createServerAPI = () => {
  let headers = {
    "Content-Type": "application/json",
  };

  return axios.create({
    baseURL: API_URL,
    headers,
  });
};
