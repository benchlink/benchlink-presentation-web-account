import { CommonResponse } from "./@shared";
import { Experience, Location } from "./Experience";
import { Expertise, Industry, Seniority } from "./Expertise";

export interface Language extends CommonResponse {
	language: string;
}

export interface Member {
	id: number;
	firstName: string;
	lastName: string;
	callRate: number;
	credentials: {
		id: number;
		member?: string;
		email: string;
		role: string;
		pushToken: string;
	};
	device: {
		id: number;
		member?: string;
		appVersion: string;
		os: string;
	};
	location: {
		id: number;
		member?: string;
		location: Location;
		city: string;
		timezone: string;
		timezoneOffset?: number;
	};
	inviteCode: string;
	languages: Language[];
	experiences: Experience[];
	industries: Industry[];
	locations: Location[];
	seniorities: Seniority[];
	expertises: Expertise[];
	referredBy: number;
	isSchedulePushEnabled: boolean;
	isQueryPushEnabled: boolean;
	isRewardsAndNetworkPushEnabled: boolean;
	profiledUpdated: boolean;
	profiledCreated: boolean;
}

export interface ChangePasswordPayload {
	currentPassword: string;
	newPassword: string;
}

export interface UpdateFcmTokenPayload {
	fcmToken: string;
}

export interface UpdateMemberPayload
	extends Pick<Member, "firstName" | "lastName"> {
	locationId: number;
	city: string;
	timezone: string;
	languages: Language["id"][];
}

export type GetMemberResponse = Record<"member", Member>;
export type GetLanguageResponse = Record<"languageList", Language[]>;
export type PatchUpdateCallRateResponse = Record<"isUpdated", boolean>;
export type DeleteMemberResponse = Record<"isDeleted", boolean>;
export type ChangePasswordResponse = Record<"isUpdated", boolean>;
export type UpdateFcmTokenResponse = Record<"isUpdated", boolean>;

export type MemberClient = {
	getMember(): Promise<GetMemberResponse>;
	getLanguages(): Promise<GetLanguageResponse>;
	editMember(payload: UpdateMemberPayload): Promise<GetMemberResponse>;
	patchCallRate(callRate: number): Promise<PatchUpdateCallRateResponse>;
	deleteMember(): Promise<DeleteMemberResponse>;
	changePassword(
		payload: ChangePasswordPayload
	): Promise<ChangePasswordResponse>;
	updateFcmToken(
		payload: UpdateFcmTokenPayload
	): Promise<UpdateFcmTokenResponse>;
};
