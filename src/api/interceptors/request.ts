import { InternalAxiosRequestConfig } from "axios";
import { printRequestLog } from "@/utils/interceptor/logger";

export async function setAccessToken(config: InternalAxiosRequestConfig) {
	return config;
}

export function logRequest(config: InternalAxiosRequestConfig) {
	printRequestLog({
		method: config.method,
		endPoint: config.url,
		requestParams: config.params,
		requestData: config.data,
		config,
	});

	return config;
}
