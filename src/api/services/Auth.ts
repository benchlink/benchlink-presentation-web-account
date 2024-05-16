

import {axiosInstance} from "@/api/client.ts";
import {
	GetVerifyEmailStatusParams,
	GetVerifyEmailStatusResponse,
	PatchVerifyEmailStatusPayload,
	PatchVerifyEmailStatusResponse,
	PostVerifyEmailPayload, PostVerifyEmailResponse
} from "@/api/types/Auth";
import Singleton from "@/decorators/Singleton.ts";
import {AxiosRequestConfig} from "axios";

@Singleton
class AuthService {
	postVerifyEmail (payload: AxiosRequestConfig<PostVerifyEmailPayload>): Promise<PostVerifyEmailResponse> {
		return axiosInstance.post(`/member/verify/email/v1`, payload);
	}
	getVerifyEmailStatus(payload: AxiosRequestConfig<GetVerifyEmailStatusParams>): Promise<GetVerifyEmailStatusResponse> {
		if(payload.data?.uuid)
			return axiosInstance.get(`/member/verify/email/v1?uuid=${payload.data.uuid}`);
		else
			throw new Error('Invalid Request')
	}
	patchVerifyEmailStatus (payload: AxiosRequestConfig<PatchVerifyEmailStatusPayload>): Promise<PatchVerifyEmailStatusResponse>{
		return axiosInstance.patch(`/member/verify/email/v1`, payload);
	}
}

export const AuthClient = new AuthService()


export default AuthClient
