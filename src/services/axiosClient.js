import axios from "axios";

const BASE_URL_DATO = "https://graphql.datocms.com/";

const client = axios.create({
  baseURL: BASE_URL_DATO,
});

export default client;
