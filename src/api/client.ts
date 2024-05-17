import axios from "axios";
import { setAccessToken } from "./interceptors/request";
import { logError, logResponse, unwrapResponse } from "./interceptors/response";
import {CommonRequest, CustomAxiosResponse} from "./types/@shared";

export const isDevelopment = import.meta.env.MODE === "development";
export const VERIFY_EMAIL = "benchlink_verify_email";

const axiosInterface = axios.create({
	baseURL: import.meta.env.VITE_BENCHLINK_API_URL,
	timeout: 10000,
	validateStatus: (status) => status >= 200 && status < 400,
});



axiosInterface.interceptors.request.use(
	(config) => setAccessToken(config),
	(error) => Promise.reject(error)
);

axiosInterface.interceptors.response.use(
	(response) => {
		isDevelopment && logResponse(response as CustomAxiosResponse);

		return unwrapResponse(response as CustomAxiosResponse);
	},
	async (error) => {
		isDevelopment && logError(error);

		return Promise.reject(error);
	}
);


export const axiosInstance = {
	...axiosInterface,
	get<R>(url : string, payload : undefined | CommonRequest) {
		return axiosInterface.get<typeof payload, R>(url, payload)
	},
	delete<R>(url : string, payload : undefined | CommonRequest) {
		return axiosInterface.delete<typeof payload, R>(url, {data: payload})
	},
	post<R>(url : string, payload : undefined | CommonRequest){
		return axiosInterface.post<typeof payload, R>(url, payload)
	},
	patch<R>(url : string, payload : undefined | CommonRequest){
		return axiosInterface.patch<typeof payload, R>(url, payload)
	},
}
