import { axiosInstance } from "../client";
import { QueryClient } from "../types/Query";

export const QueryService: QueryClient = {
	getQueryDetail: async ({ id }) => {
		return await axiosInstance.get(`/query/${id}/v1`);
	},
};
