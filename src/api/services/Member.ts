

import {DeleteMemberPayload, DeleteMemberResponse} from "@/api/types/Member.ts";
import {axiosInstance} from "@/api/client.ts";
import { AxiosRequestConfig } from "axios";
import Singleton from "@/decorators/Singleton.ts";


@Singleton
class MemberService {
    deleteMember(payload: AxiosRequestConfig<DeleteMemberPayload>): Promise<DeleteMemberResponse> {
        return axiosInstance.delete(`/member/verify/email/v1`, payload);
    }
}
export const MemberClient = new MemberService()

export default MemberClient
