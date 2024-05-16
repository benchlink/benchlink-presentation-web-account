

import {axiosInstance} from "@/api/client.ts";
import {
	GetVerifyEmailStatusRequest,
	GetVerifyEmailStatusResponse,
	PatchVerifyEmailStatusPayload,
	PatchVerifyEmailStatusResponse,
	PostVerifyEmailPayload, PostVerifyEmailResponse
} from "@/api/types/Auth";
import Singleton from "@/decorators/Singleton.ts";

@Singleton
class AuthService {
	postVerifyEmail(payload: PostVerifyEmailPayload) {
		return axiosInstance.post<PostVerifyEmailResponse>(`/member/verify/email/v1`, payload);
	}
	getVerifyEmailStatus(payload: GetVerifyEmailStatusRequest) {
		if(payload.uuid)
			return axiosInstance.get<GetVerifyEmailStatusResponse>(`/member/verify/email/v1`, {uuid: payload.uuid});
		else
			throw new Error('Invalid Request')
	}
	patchVerifyEmailStatus (payload: PatchVerifyEmailStatusPayload): Promise<PatchVerifyEmailStatusResponse>{
		return axiosInstance.patch(`/member/verify/email/v1`, payload);
	}
}

export const AuthClient = new AuthService()


export default AuthClient
