import { axiosInstance } from "../client";
import { AuthClient } from "../services/Auth";

export const AuthService: AuthClient = {
	postVerifyEmail: async (payload) => {
		return await axiosInstance.post(`/member/verify/email/v1`, payload);
	},
	getVerifyEmailStatus: async ({ uuid }) => {
		return await axiosInstance.get(`/member/verify/email/v1?uuid=${uuid}`);
	},
	patchVerifyEmailStatus: async (payload) => {
		return await axiosInstance.patch(`/member/verify/email/v1`, payload);
	},
};
