import axios from "axios";
import { setAccessToken } from "./interceptors/request";
import { logError, logResponse, unwrapResponse } from "./interceptors/response";
import { CustomAxiosResponse } from "./types/@shared";

export const isDevelopment = import.meta.env.MODE === "development";
export const VERIFY_EMAIL = "benchlink_verify_email";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BENCHLINK_API_URL,
	timeout: 10000,
	validateStatus: (status) => status >= 200 && status < 400,
});

axiosInstance.interceptors.request.use(
	(config) => setAccessToken(config),
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => {
		isDevelopment && logResponse(response as CustomAxiosResponse);

		return unwrapResponse(response as CustomAxiosResponse);
	},
	async (error) => {
		isDevelopment && logError(error);

		return Promise.reject(error);
	}
);
