

import {DeleteMemberPayload, DeleteMemberResponse} from "@/api/types/Member.ts";
import {axiosInstance} from "@/api/client.ts";
import Singleton from "@/decorators/Singleton.ts";


@Singleton
class MemberService {
    deleteMember(payload: DeleteMemberPayload) {
        return axiosInstance.delete<DeleteMemberResponse>(`/member/verify/email/v1`, payload);
    }
}
export const MemberClient = new MemberService()

export default MemberClient
