import getInstanceAxios from "./getInstanceAxios";
const BASE_API = "http://localhost:5001";
const apiClient = getInstanceAxios(BASE_API);

export default apiClient;
