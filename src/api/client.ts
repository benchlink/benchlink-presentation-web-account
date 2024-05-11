import axios from "axios";
import { setAccessToken } from "./interceptors/request";
import { logError, logResponse, unwrapResponse } from "./interceptors/response";
import { CustomAxiosResponse } from "./types/@shared";

export const isDevelopment = import.meta.env.MODE === "development";
export const ACCESS_TOKEN = "benchlink_access_token";
export const REFRESH_TOKEN = "benchlink_refresh_token";
export const EMAIL = "benchlink_email";
export const USER_SIGNUP_INFO = "user_sign_up_info";
export const EMAIL_REQUEST_ID = "email_request_id";
export const FCM_TOKEN = "fcm_token";

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

		// // 401 Unauthorized: 토큰 갱신 시도
		// if (error.response?.status === 401) {
		// 	if (error.config && !error.config._retry) {
		// 		error.config._retry = true;
		// 		const result = await AuthService.renewAccessToken();

		// 		if (result?.accessToken) {
		// 			cookies.set(ACCESS_TOKEN, result.accessToken, {
		// 				path: "/",
		// 				secure: true,
		// 				sameSite: "strict",
		// 			});

		// 			error.config.headers.Authorization = `${result.accessToken}`;

		// 			return axiosInstance(error.config);
		// 		}

		// 		// 갱신 실패 시 로그인 페이지로 리다이렉트
		// 		redirectToSignIn();
		// 	}
		// }

		return Promise.reject(error);
	}
	// flow([logResponse, renewToken, unwrapResponse]),
	// flow([logError, processError])
);
