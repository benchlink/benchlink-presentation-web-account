import { Query } from "./Query";

export type ScheduleTabType = "PENDING" | "HISTORY" | "ALL" | "FIXED";
export type ScheduleStatus =
	| "APPLICATION_ACCEPTED"
	| "APPLICATION_DECLINED"
	| "APPLIED"
	| "RESCHEDULE_BY_MEMBER"
	| "RESCHEDULE_BY_CLIENT"
	| "CALL_FIXED"
	| "CALL_COMPLETE"
	| "CANCELED";

export interface Schedule {
	id: string;
	status: ScheduleStatus;
	query: Query;
	scheduledAt: string;
}

export interface GetCallRulesResponse {
	rules: string[];
}

export interface GetSchedulesParams {
	status: ScheduleTabType;
}

export interface UpdateSchedulePayload {
	id: string;
	availableTimes: {
		startsAt: string;
		endsAt: string;
	}[];
}

export interface UpdateScheduleStatusPayload {
	id: string;
	status: ScheduleStatus;
}

export interface GetSchedulesResponse {
	schedules: Schedule[];
}
export interface GetScheduleDetailResponse {
	schedule: Schedule;
}

export interface DeleteScheduleResponse {
	isDeleted: boolean;
}
export interface CallsClient {
	getSchedules({ status }: GetSchedulesParams): Promise<GetSchedulesResponse>;
	getScheduleById({ id }: { id: string }): Promise<GetScheduleDetailResponse>;
	getCallRules(): Promise<GetCallRulesResponse>;
	updateSchedule(
		payload: UpdateSchedulePayload
	): Promise<GetScheduleDetailResponse>;
	updateScheduleStatus(
		payload: UpdateScheduleStatusPayload
	): Promise<GetScheduleDetailResponse>;
	deleteSchedule({ id }: { id: string }): Promise<DeleteScheduleResponse>;
}
