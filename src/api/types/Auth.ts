import {CommonRequest, CommonResponse} from "@/api/types/@shared.ts";

export interface PostVerifyEmailResponse {
    requestId: string
}

export interface PostVerifyEmailPayload extends CommonRequest {
    email: string
}

export interface PatchVerifyEmailStatusResponse extends PostVerifyEmailResponse {
}

export interface GetVerifyEmailStatusRequest extends CommonRequest {
    uuid: string
}

export interface GetVerifyEmailStatusResponse extends CommonResponse {
    id: string;
    email: string
    isVerified: boolean
}

export interface PatchVerifyEmailStatusPayload extends CommonRequest {
    uuid: string
    password: string
}
