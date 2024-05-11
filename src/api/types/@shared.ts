/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosResponse } from "axios";

export type Nullable<T> = T | null | undefined;

export type Pagination = {
	page: number;
	size: number;
};

export type CommonResponse = {
	id: number;
	sortKey: number;
};

export interface AxiosResData<T = any> {
	statusCode: number;
	body: T;
}

export interface CustomAxiosResponse<T = any, D = any>
	extends Omit<AxiosResponse<T, D>, "data"> {
	data: AxiosResData<T>;
}
export interface CustomAxiosError<T = unknown, D = any>
	extends Omit<AxiosError<T, D>, "response"> {
	response: CustomAxiosResponse<T, D>;
	_retry?: boolean;
}

export type ApiStatus = "idle" | "loading" | "succeeded" | "failed";
