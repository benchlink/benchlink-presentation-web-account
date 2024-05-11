import { CommonResponse } from "./@shared";
import { GetMemberResponse } from "./Member";

export type Industry = {
	name: string;
} & CommonResponse;

export type Expertise = {
	imageUrl: string;

	name: string;
} & CommonResponse;

export type Seniority = {
	level: string;
	subtext?: string;
} & CommonResponse;

export type GetIndustriesResponse = Record<"industries", Industry[]>;
export type GetExpertisesResponse = Record<"expertises", Expertise[]>;
export type GetSeniorityListResponse = Record<"seniorityList", Seniority[]>;

export type UpdateExpertisePayload = {
	industries?: CommonResponse["id"][];
	expertises?: CommonResponse["id"][];
	seniorities?: CommonResponse["id"][];
};
export type UpdateExpertiseResponse = GetMemberResponse;

export type ExpertiseClient = {
	getIndustries(): Promise<GetIndustriesResponse>;
	getExpertises(): Promise<GetExpertisesResponse>;
	getSeniorityList(): Promise<GetSeniorityListResponse>;
	updateExpertise(
		payload: UpdateExpertisePayload
	): Promise<UpdateExpertiseResponse>;
};
