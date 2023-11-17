import axios from "axios";
import { constants } from "../utils/constants";

export const client = axios.create({
  baseURL: constants.API_SERVICE_URL
});
