import {CommonRequest, CommonResponse} from "@/api/types/@shared.ts";

export interface DeleteMemberPayload extends CommonRequest {
	verificationId: string;
	email: string;
}

export interface DeleteMemberResponse extends CommonResponse {
	isDeleted: boolean
}
