import { CommonResponse } from "./@shared";

export interface Company extends CommonResponse {
	name: string;
	city: string;
	state?: string;
	location: string;
	logoUrl: string;
	businessArea: string;
}

export interface Location extends CommonResponse {
	location: string;
}

export interface Experience {
	id: number;
	company: Company;
	location: Location;
	position: string;
	startYear: string;
	endYear: string;
	isCurrent: boolean;
}

export interface AddExperiencePayload {
	companyId: number;
	locationId: number;
	position: string;
	startYear: string;
	endYear: string;
	isCurrent: boolean;
}

export interface EditExperiencePayload extends AddExperiencePayload {
	id: number;
}

export interface AddCompanyPayload
	extends Omit<Company, keyof CommonResponse | "logoUrl"> {}

export interface LocationResponse {
	locationList: Location[];
}
export interface CompanyResponse {
	companyList: Company[];
}

export interface ExperienceResponse {
	experience: Experience;
}

export interface AddCompanyResponse {
	company: Company;
}

export interface DeleteExperienceResponse {
	isDeleted: boolean;
}

export interface ExperienceClient {
	getCompaniesByName(companyName: string): Promise<CompanyResponse>;
	getLocationList(): Promise<LocationResponse>;
	addExperience(payload: AddExperiencePayload): Promise<ExperienceResponse>;
	addCompany(payload: AddCompanyPayload): Promise<AddCompanyResponse>;
	editExperience(payload: EditExperiencePayload): Promise<ExperienceResponse>;
	deleteExperience(id: number): Promise<DeleteExperienceResponse>;
}
