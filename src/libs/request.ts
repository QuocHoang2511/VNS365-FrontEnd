import { default as Axios } from "axios";
import { API_URL } from "./utils/constants";

export const request = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
