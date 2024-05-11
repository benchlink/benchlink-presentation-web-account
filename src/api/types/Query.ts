import { Schedule, ScheduleStatus } from "./Calls";
import { Company } from "./Experience";
import { Industry, Seniority, Expertise } from "./Expertise";
import { Language } from "./Member";

type QuestionNumber =
	| "1"
	| "2"
	| "3"
	| "4"
	| "5"
	| "6"
	| "7"
	| "8"
	| "9"
	| "10";
export type Choice = `choice${QuestionNumber}`;
export type ComplianceQuestion = {
	id: string;
	question: string; // NOTE: 최대 20개까지
	choices: Partial<Record<Choice, string>> & { version?: number }; // NOTE: 최대 10개까지
};

export type Specification = {
	id: number;
	languages: Language[];
	company: Company;
	industries: Industry[];
	locations: Location[];
	seniorities: Seniority[];
	expertises: Expertise[];
	expiresAt: string;
};

export type Question = `question${QuestionNumber}`; // NOTE: 최대 10개까지
export type VettingQuestions = Partial<Record<Question, string>> & {
	version?: number;
};
export interface Query {
	id: string;
	title: string;
	interviewMinutes: number;
	requirements: string;
	brief: string;
	callUrl: string;
	specifications: Specification[];
	complianceQuestions: ComplianceQuestion[];
	vettingQuestions: VettingQuestions;
	expiresAt: string;
	status: ScheduleStatus;
	matchedBy: string[];
}

export type GetQueryDetailParams = { id: string };

export type MultipleChoiceAnswer = {
	id: string;
	choice: string;
	version?: number;
};

export type Answer = `answer${QuestionNumber}`;
export type VettingAnswers = Partial<Record<Answer, string | null>> & {
	version?: number;
};

export type CreateSchedulePayload = {
	queryId: string;
	multipleChoiceAnswers: MultipleChoiceAnswer[];
	vettingAnswers: VettingAnswers;
};

export type GetCallQueriesResponse = {
	queries: Query[];
};

export type GetQueryDetailResponse = {
	query: Query;
};

export type GetReferralQueriesReponse = GetCallQueriesResponse & {
	page: number;
	size: number;
};

export type CreateScheduleResponse = {
	schedule: Schedule & {
		multipleChoiceAnswers: MultipleChoiceAnswer[];
	};
};

export type QueryClient = {
	getQueryDetail(params: GetQueryDetailParams): Promise<GetQueryDetailResponse>;
};
