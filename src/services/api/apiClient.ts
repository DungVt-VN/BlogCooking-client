import getInstanceAxios from "./getInstanceAxios";
const BASE_API = "http://localhost:5029";
const apiClient = getInstanceAxios(BASE_API);

export default apiClient;
