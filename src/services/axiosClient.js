import axios from "axios";

const BASE_URL_DATO = process.env.DATO_API_URL;

const client = axios.create({
  baseURL: BASE_URL_DATO,
});

export default client;
